import { loadProfileContext } from '@/lib/profile';
import { getUpcomingForUser, type UpcomingRow } from '@/lib/queries';
import ProfileHeader from '@/components/shared/ProfileHeader';
import BlockedNotice from '@/components/shared/BlockedNotice';
import VolumeControl from '@/components/shared/VolumeControl';
import ArtistAvatar from '@/components/shared/ArtistAvatar';

function parseDate(s: string): Date | null {
  const [y, m, d] = s.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d));
}

function formatDayHeading(s: string): string {
  const date = parseDate(s);
  if (!date) return s;
  const today = new Date();
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const diffDays = Math.round((date.getTime() - todayUtc) / 86_400_000);
  if (diffDays === 0) return 'Heute';
  if (diffDays === 1) return 'Morgen';
  if (diffDays > 1 && diffDays <= 6) {
    return date.toLocaleDateString('de-DE', { weekday: 'long', timeZone: 'UTC' });
  }
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: date.getUTCFullYear() !== today.getUTCFullYear() ? 'numeric' : undefined,
    timeZone: 'UTC',
  });
}

function groupByDay(rows: UpcomingRow[]): Array<{ date: string; items: UpcomingRow[] }> {
  const map = new Map<string, UpcomingRow[]>();
  for (const r of rows) {
    const arr = map.get(r.event_date) || [];
    arr.push(r);
    map.set(r.event_date, arr);
  }
  return Array.from(map.entries()).map(([date, items]) => ({ date, items }));
}

export default async function UpcomingPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const ctx = await loadProfileContext(username);

  const rows = ctx.visible ? getUpcomingForUser(ctx.owner.id) : [];
  const byDay = groupByDay(rows);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <ProfileHeader
        user={ctx.owner}
        counts={ctx.counts}
        friendCount={ctx.friendCount}
        friendState={ctx.friendState}
        active="tour"
        isOwner={ctx.isOwner}
      />

      {!ctx.visible ? (
        <BlockedNotice visibility={ctx.owner.visibility} />
      ) : (
        <div className="space-y-5">
          <VolumeControl />

          <div className="rule-t-2 pt-4 flex items-baseline justify-between flex-wrap gap-2">
            <h2 className="text-xs uppercase tracking-widest font-bold">
              {ctx.isOwner ? 'DEINE' : `@${ctx.owner.username}`} TOUR · {rows.length}
            </h2>
            <span className="mono text-[0.7rem] opacity-65">
              angekündigte Konzerte deiner Bands
            </span>
          </div>

          {rows.length === 0 ? (
            <div className="block p-6 text-center stripe">
              <p className="inline-block mark font-bold px-2">NICHTS ANGEKÜNDIGT</p>
              <p className="mt-2 text-sm opacity-70">
                {ctx.isOwner
                  ? 'Keine deiner Bands hat gerade Tour-Daten. Wir schauen alle paar Stunden neu rein.'
                  : 'Die Bands haben gerade keine angekündigten Konzerte.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {byDay.map((day) => (
                <section key={day.date}>
                  <header className="flex items-baseline gap-3 pb-2 rule">
                    <h3 className="serif italic text-[1.35rem] leading-none tracking-tight">
                      {formatDayHeading(day.date)}
                    </h3>
                    <span className="mono-num text-[0.66rem] opacity-55">{day.date}</span>
                  </header>
                  <ul className="mt-2 divide-y divide-rule">
                    {day.items.map((e, i) => {
                      const loc = [e.city, e.country].filter(Boolean).join(', ');
                      const href = e.ticket_url || e.event_url;
                      const inner = (
                        <div className="flex items-center gap-3 py-2.5">
                          <ArtistAvatar
                            name={e.artist_name}
                            img={e.album_cover_url || e.artist_img}
                            size={40}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[0.92rem] truncate leading-tight">
                              {e.artist_name}
                            </div>
                            <div className="text-[0.78rem] opacity-75 truncate leading-snug">
                              {e.venue && <span>{e.venue}</span>}
                              {e.venue && loc && <span className="opacity-55"> · </span>}
                              {loc && <span className="opacity-75">{loc}</span>}
                            </div>
                          </div>
                          {href && (
                            <span className="mono text-[0.66rem] uppercase tracking-[0.18em] opacity-70 shrink-0">
                              Tickets →
                            </span>
                          )}
                        </div>
                      );
                      return (
                        <li key={`${e.event_date}-${i}`}>
                          {href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block hover:bg-mark-soft px-1 -mx-1 rounded-[3px]"
                            >
                              {inner}
                            </a>
                          ) : (
                            inner
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ArtistSummary } from '@/lib/queries';

/**
 * Single toggle chip. Shows the current state ("Will sehen" / "Gesehen")
 * and flips to the other one on click. Optimistic: the UI updates
 * immediately, server calls happen in the background, and props from the
 * next server refresh reconcile the state.
 */
export default function BandStatusToggles({ artist }: { artist: ArtistSummary }) {
  const router = useRouter();
  const serverSeen = artist.live_events.length > 0;
  const serverCount = artist.live_events.length;

  // Pending override: null means "trust the server", true/false means "we
  // just clicked and haven't seen fresh props yet".
  const [pendingSeen, setPendingSeen] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  // Drop the override as soon as the server-side data matches our intent.
  useEffect(() => {
    if (pendingSeen === null) return;
    if (serverSeen === pendingSeen) setPendingSeen(null);
  }, [serverSeen, pendingSeen]);

  const seen = pendingSeen !== null ? pendingSeen : serverSeen;
  const showCount = pendingSeen === null && seen && serverCount > 1;

  const payload = {
    artist_name: artist.artist_name,
    artist_img: artist.artist_img,
    album_cover_url: artist.album_cover_url,
    genre: artist.genre,
    track_title: artist.track_title,
    preview_url: artist.preview_url,
  };

  async function flip() {
    if (busy) return;
    const nextSeen = !seen;
    setPendingSeen(nextSeen); // optimistic
    setFailed(false);
    setBusy(true);

    try {
      if (nextSeen) {
        // want → seen
        const posts: Promise<Response>[] = [
          fetch('/api/live', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...payload,
              event_date: new Date().toISOString().slice(0, 10),
            }),
          }),
        ];
        if (artist.wishlist_id) {
          posts.push(
            fetch('/api/wishlist', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ artist_name: artist.artist_name }),
            })
          );
        }
        const results = await Promise.all(posts);
        if (results.some((r) => !r.ok)) throw new Error('server rejected');
      } else {
        // seen → want
        const posts: Promise<Response>[] = [
          fetch('/api/live', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ artist_name: artist.artist_name }),
          }),
        ];
        if (!artist.wishlist_id) {
          posts.push(
            fetch('/api/wishlist', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
          );
        }
        const results = await Promise.all(posts);
        // POST /api/wishlist 409s if the row already exists — treat as ok.
        if (results.some((r) => !r.ok && r.status !== 409)) throw new Error('server rejected');
      }
      router.refresh();
    } catch {
      setPendingSeen(null); // revert
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={flip}
      disabled={busy}
      aria-pressed={seen}
      title={seen ? 'Auf die Wunschliste zurücklegen' : 'Als live gesehen markieren'}
      className={`mt-2 mono text-[0.7rem] uppercase tracking-[0.05em] py-1 px-2.5 leading-none border rounded-[4px] transition-colors disabled:opacity-70 cursor-pointer ${
        seen
          ? 'bg-ink text-paper border-ink hover:bg-ink-soft'
          : 'bg-ember text-paper border-ember hover:bg-ember-soft'
      } ${failed ? 'outline outline-2 outline-ember' : ''}`}
    >
      {seen
        ? `✓ Gesehen${showCount ? ` ×${serverCount}` : ''}`
        : '◇ Will sehen'}
    </button>
  );
}

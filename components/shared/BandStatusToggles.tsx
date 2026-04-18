'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ArtistSummary } from '@/lib/queries';

export default function BandStatusToggles({ artist }: { artist: ArtistSummary }) {
  const router = useRouter();
  const [busy, setBusy] = useState<'want' | 'seen' | null>(null);

  const wants = artist.wishlist_id !== null;
  const seenCount = artist.live_events.length;
  const seen = seenCount > 0;

  const payload = {
    artist_name: artist.artist_name,
    artist_img: artist.artist_img,
    album_cover_url: artist.album_cover_url,
    genre: artist.genre,
    track_title: artist.track_title,
    preview_url: artist.preview_url,
  };

  async function toggleWant() {
    setBusy('want');
    await fetch('/api/wishlist', {
      method: wants ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wants ? { artist_name: artist.artist_name } : payload),
    });
    setBusy(null);
    router.refresh();
  }

  async function toggleSeen() {
    setBusy('seen');
    if (seen) {
      await fetch('/api/live', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artist_name: artist.artist_name }),
      });
    } else {
      await fetch('/api/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          event_date: new Date().toISOString().slice(0, 10),
        }),
      });
    }
    setBusy(null);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      <button
        type="button"
        onClick={toggleWant}
        disabled={busy !== null}
        className={`chip ${wants ? 'chip-ember' : ''} cursor-pointer disabled:opacity-50`}
        title={wants ? 'Von Wunschliste entfernen' : 'Auf Wunschliste'}
      >
        {busy === 'want' ? '…' : wants ? '✓ WILL SEHEN' : '+ WILL SEHEN'}
      </button>

      <button
        type="button"
        onClick={toggleSeen}
        disabled={busy !== null}
        className={`chip ${seen ? 'chip-solid' : ''} cursor-pointer disabled:opacity-50`}
        title={
          seen
            ? seenCount > 1
              ? `Alle ${seenCount} Konzerte entfernen`
              : 'Als nicht gesehen markieren'
            : 'Als gesehen markieren'
        }
      >
        {busy === 'seen'
          ? '…'
          : seen
            ? `✓ GESEHEN${seenCount > 1 ? ` ×${seenCount}` : ''}`
            : '+ GESEHEN'}
      </button>
    </div>
  );
}

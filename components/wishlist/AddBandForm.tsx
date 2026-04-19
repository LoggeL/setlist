'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SongSearch, { type SongPick } from '@/components/shared/SongSearch';

export default function AddBandForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function addFromSong(song: SongPick) {
    setError('');
    setSaving(true);

    let genre: string | null = null;
    if (song.album_id) {
      try {
        const r = await fetch(`/api/deezer/album/${song.album_id}`);
        if (r.ok) {
          const data = await r.json();
          genre = data.genre ?? null;
        }
      } catch {
        // non-fatal — genre stays null
      }
    }

    const res = await fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        artist_name: song.artist_name,
        artist_img: song.artist_img || null,
        album_cover_url: song.album_cover_url || null,
        genre,
        track_title: song.track_title || null,
        preview_url: song.preview_url || null,
      }),
    });
    setSaving(false);
    // 409 = already on wishlist → treat as success for "anlegen" UX
    if (res.ok || res.status === 409) {
      setOpen(false);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Anlegen fehlgeschlagen');
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-solid w-full justify-center"
      >
        + Band anlegen
      </button>
    );
  }

  return (
    <div className="block p-4 space-y-3">
      <div className="flex items-center justify-between rule pb-2.5">
        <span className="font-semibold text-sm">Band anlegen</span>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError('');
          }}
          className="mono text-[0.78rem] underline hover:bg-mark-soft px-0.5"
        >
          abbrechen
        </button>
      </div>

      <SongSearch
        onSelect={addFromSong}
        placeholder="Song suchen — legt Band + Track auf die Wunschliste"
      />

      <p className="mono text-[0.7rem] opacity-65">
        Such einen repräsentativen Song — Künstler, Cover und 30s-Preview kommen
        automatisch mit auf die Wunschliste. Per Toggle auf der Karte markierst
        du die Band später als gesehen.
      </p>

      {saving && <p className="text-xs opacity-70">speichere…</p>}
      {error && (
        <p className="text-xs">
          <span className="mark">! {error}</span>
        </p>
      )}
    </div>
  );
}

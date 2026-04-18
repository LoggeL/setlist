import { getDb } from '@/lib/db';
import { getSessionUserFromRequest } from '@/lib/auth';
import { cachePreview } from '@/lib/preview';
import { NextRequest, NextResponse } from 'next/server';

/**
 * DELETE /api/live — remove the most recent live_event for the given artist.
 * Body: { artist_name }. Used by the band-status toggle on the bands page.
 */
export async function DELETE(req: NextRequest) {
  const currentUser = getSessionUserFromRequest(req);
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { artist_name } = (await req.json()) as { artist_name?: string };
  if (!artist_name) {
    return NextResponse.json({ error: 'Missing artist_name' }, { status: 400 });
  }

  const db = getDb();
  const row = db
    .prepare(
      `SELECT id FROM live_events
       WHERE user_id = ? AND LOWER(artist_name) = LOWER(?)
       ORDER BY event_date DESC, created_at DESC
       LIMIT 1`
    )
    .get(currentUser.id, artist_name) as { id: number } | undefined;

  if (!row) return NextResponse.json({ ok: true, removed: null });

  db.prepare('DELETE FROM live_events WHERE id = ?').run(row.id);

  const remaining = (db
    .prepare(
      'SELECT COUNT(*) AS n FROM live_events WHERE user_id = ? AND LOWER(artist_name) = LOWER(?)'
    )
    .get(currentUser.id, artist_name) as { n: number }).n;

  return NextResponse.json({ ok: true, removed: row.id, remaining });
}

export async function POST(req: NextRequest) {
  const currentUser = getSessionUserFromRequest(req);
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const {
    artist_name,
    artist_img,
    album_cover_url,
    genre,
    venue,
    event_date,
    note,
    track_title,
    preview_url,
  } = body;

  if (!artist_name) {
    return NextResponse.json({ error: 'Missing artist_name' }, { status: 400 });
  }

  const cachedPreview = await cachePreview(preview_url);

  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO live_events (user_id, artist_name, artist_img, album_cover_url, genre, venue, event_date, note, track_title, preview_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      currentUser.id,
      artist_name,
      artist_img || null,
      album_cover_url || null,
      genre || null,
      venue || null,
      event_date || null,
      note || null,
      track_title || null,
      cachedPreview || null
    );

  const entry = db.prepare('SELECT * FROM live_events WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(entry, { status: 201 });
}

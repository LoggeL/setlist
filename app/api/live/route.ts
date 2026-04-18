import { getDb } from '@/lib/db';
import { getSessionUserFromRequest } from '@/lib/auth';
import { cachePreview } from '@/lib/preview';
import { NextRequest, NextResponse } from 'next/server';

/**
 * DELETE /api/live — remove *all* live_events for the given artist owned by
 * the current user. Drives the GESEHEN toggle on the bands page: one click
 * off flips the whole status, not just the latest concert.
 * Body: { artist_name }
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
  const result = db
    .prepare(
      'DELETE FROM live_events WHERE user_id = ? AND LOWER(artist_name) = LOWER(?)'
    )
    .run(currentUser.id, artist_name);

  return NextResponse.json({ ok: true, removed: result.changes });
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

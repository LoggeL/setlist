import { getDb } from '@/lib/db';
import { getSessionUserFromRequest } from '@/lib/auth';
import { cachePreview } from '@/lib/preview';
import { NextRequest, NextResponse } from 'next/server';

/** DELETE /api/wishlist — remove a wishlist row by artist_name (case-insensitive). */
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
  db.prepare(
    'DELETE FROM wishlist WHERE user_id = ? AND LOWER(artist_name) = LOWER(?)'
  ).run(currentUser.id, artist_name);

  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  const currentUser = getSessionUserFromRequest(req);
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { artist_name, artist_img, album_cover_url, genre, track_title, preview_url } = body;

  if (!artist_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const db = getDb();
  const existing = db.prepare(
    'SELECT id FROM wishlist WHERE user_id = ? AND artist_name = ?'
  ).get(currentUser.id, artist_name);

  if (existing) {
    return NextResponse.json({ error: 'Already in wishlist' }, { status: 409 });
  }

  const cachedPreview = await cachePreview(preview_url);

  const result = db.prepare(
    `INSERT INTO wishlist (user_id, artist_name, artist_img, album_cover_url, genre, track_title, preview_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    currentUser.id,
    artist_name,
    artist_img || null,
    album_cover_url || null,
    genre || null,
    track_title || null,
    cachedPreview || null
  );

  const item = db.prepare('SELECT * FROM wishlist WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(item, { status: 201 });
}

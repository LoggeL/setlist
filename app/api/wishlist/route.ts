import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, artist_name, artist_img, genre, track_title, preview_url } = body;

  if (!user_id || !artist_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(user_id);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const existing = db.prepare(
    'SELECT id FROM wishlist WHERE user_id = ? AND artist_name = ?'
  ).get(user_id, artist_name);
  if (existing) {
    return NextResponse.json({ error: 'Already in wishlist' }, { status: 409 });
  }

  const result = db.prepare(
    `INSERT INTO wishlist (user_id, artist_name, artist_img, genre, track_title, preview_url)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(user_id, artist_name, artist_img || null, genre || null, track_title || null, preview_url || null);

  const item = db.prepare('SELECT * FROM wishlist WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(item, { status: 201 });
}

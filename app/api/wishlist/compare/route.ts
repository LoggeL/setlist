import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import type { WishlistItem, User } from '@/lib/db';

export async function GET(req: NextRequest) {
  const userId = parseInt(req.nextUrl.searchParams.get('userId') || '', 10);
  const otherUserId = parseInt(req.nextUrl.searchParams.get('otherUserId') || '', 10);

  if (isNaN(userId) || isNaN(otherUserId)) {
    return NextResponse.json({ error: 'Missing userId or otherUserId' }, { status: 400 });
  }

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as User | undefined;
  const otherUser = db.prepare('SELECT * FROM users WHERE id = ?').get(otherUserId) as User | undefined;

  if (!user || !otherUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const myWishlist = db.prepare('SELECT * FROM wishlist WHERE user_id = ?').all(userId) as WishlistItem[];
  const otherWishlist = db.prepare('SELECT * FROM wishlist WHERE user_id = ?').all(otherUserId) as WishlistItem[];

  const otherArtists = new Set(otherWishlist.map((w) => w.artist_name.toLowerCase()));
  const matches = myWishlist.filter((w) => otherArtists.has(w.artist_name.toLowerCase()));

  return NextResponse.json({
    user: { id: user.id, username: user.username, display_name: user.display_name },
    otherUser: { id: otherUser.id, username: otherUser.username, display_name: otherUser.display_name },
    myWishlist,
    otherWishlist,
    matches,
  });
}

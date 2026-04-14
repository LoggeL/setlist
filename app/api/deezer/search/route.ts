import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  const type = req.nextUrl.searchParams.get('type') || 'artist';

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const url = type === 'track'
    ? `https://api.deezer.com/search/track?q=${encodeURIComponent(q)}&limit=8`
    : `https://api.deezer.com/search/artist?q=${encodeURIComponent(q)}&limit=8`;

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json([]);
  }

  const data = await res.json();
  return NextResponse.json(data.data || []);
}

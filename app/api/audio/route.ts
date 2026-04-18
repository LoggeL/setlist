import { NextRequest } from 'next/server';

// Deezer preview CDNs use a variable prefix (cdns-preview-a .. cdns-preview-f,
// cdnt-preview, etc.) but all sit under *.dzcdn.net.
function isAllowedHost(hostname: string): boolean {
  return (
    hostname === 'dzcdn.net' ||
    hostname.endsWith('.dzcdn.net')
  );
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new Response('missing url', { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new Response('invalid url', { status: 400 });
  }
  if (parsed.protocol !== 'https:' || !isAllowedHost(parsed.hostname)) {
    return new Response('forbidden', { status: 403 });
  }

  const range = req.headers.get('range') || undefined;
  const upstream = await fetch(parsed.toString(), {
    headers: {
      // Some CDNs require a browser-like Referer / UA to serve the preview.
      Referer: 'https://www.deezer.com/',
      'User-Agent':
        'Mozilla/5.0 (compatible; setlist/1.0; +https://setlist.logge.top)',
      ...(range ? { Range: range } : {}),
    },
    cache: 'force-cache',
  });

  if (!upstream.ok && upstream.status !== 206) {
    return new Response('upstream error', { status: 502 });
  }

  const headers = new Headers();
  headers.set(
    'Content-Type',
    upstream.headers.get('content-type') || 'audio/mpeg'
  );
  const len = upstream.headers.get('content-length');
  if (len) headers.set('Content-Length', len);
  const cr = upstream.headers.get('content-range');
  if (cr) headers.set('Content-Range', cr);
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}

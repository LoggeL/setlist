import { createHash } from 'crypto';
import { access, mkdir, writeFile } from 'fs/promises';
import path from 'path';

const PREVIEWS_DIR = path.join(process.cwd(), 'public', 'previews');

function isDeezerPreview(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && (u.hostname === 'dzcdn.net' || u.hostname.endsWith('.dzcdn.net'));
  } catch {
    return false;
  }
}

/**
 * Canonical key for a Deezer preview — drops the query string (which holds
 * the expiring HLS signature) so the same underlying track resolves to the
 * same local file across requests.
 */
function cacheKey(url: string): string {
  const u = new URL(url);
  return createHash('sha256').update(u.origin + u.pathname).digest('hex').slice(0, 32);
}

async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * If `url` points to Deezer's preview CDN, download the mp3 once to
 * public/previews/<hash>.mp3 and return the stable local path. Otherwise
 * returns the input unchanged. Failures fall back to the original url —
 * the audio proxy route is the safety net.
 */
export async function cachePreview(url: string | null | undefined): Promise<string | null> {
  if (!url) return null;
  if (!isDeezerPreview(url)) return url;

  const hash = cacheKey(url);
  const filename = `${hash}.mp3`;
  const fullPath = path.join(PREVIEWS_DIR, filename);
  const servePath = `/previews/${filename}`;

  if (await exists(fullPath)) return servePath;

  try {
    const res = await fetch(url, {
      headers: {
        Referer: 'https://www.deezer.com/',
        'User-Agent':
          'Mozilla/5.0 (compatible; setlist/1.0; +https://setlist.logge.top)',
      },
    });
    if (!res.ok) {
      console.warn('[preview] upstream', res.status, url);
      return url;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(PREVIEWS_DIR, { recursive: true });
    await writeFile(fullPath, buf);
    return servePath;
  } catch (err) {
    console.error('[preview] download failed', err);
    return url;
  }
}

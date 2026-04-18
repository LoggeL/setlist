import sharp from 'sharp';
import { encode as encodeBlurhash } from 'blurhash';
import { readFile } from 'fs/promises';
import path from 'path';
import { getDb } from './db';

export type ImageMetaValue = {
  dominant_color: string | null;
  blurhash: string | null;
};

function toHex(n: number): string {
  return Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
}

function rgbToHex(rgb: { r: number; g: number; b: number }): string {
  return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
}

async function loadImageBuffer(url: string): Promise<Buffer | null> {
  // Local public/ paths resolve on disk, which includes uploaded avatars and
  // cached mp3 previews' cover art if we ever add it. Anything else is fetched
  // over the network with a Deezer-friendly Referer.
  if (url.startsWith('/')) {
    try {
      const full = path.join(process.cwd(), 'public', url.replace(/^\/+/, ''));
      return await readFile(full);
    } catch {
      return null;
    }
  }
  try {
    const res = await fetch(url, {
      headers: {
        Referer: 'https://www.deezer.com/',
        'User-Agent':
          'Mozilla/5.0 (compatible; setlist/1.0; +https://setlist.logge.top)',
      },
    });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function computeImageMeta(url: string): Promise<ImageMetaValue | null> {
  const buf = await loadImageBuffer(url);
  if (!buf) return null;

  try {
    const image = sharp(buf, { failOn: 'none' });
    const stats = await image.stats();
    const dominant_color = stats.dominant ? rgbToHex(stats.dominant) : null;

    // Blurhash wants raw RGBA pixels of a small fixed size.
    const { data, info } = await image
      .resize(32, 32, { fit: 'inside', withoutEnlargement: false })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const blurhash = encodeBlurhash(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      4,
      3
    );

    return { dominant_color, blurhash };
  } catch (err) {
    console.warn('[image-meta] compute failed:', url, err);
    return null;
  }
}

/** Look up cached meta without computing. */
export function lookupImageMeta(url: string | null | undefined): ImageMetaValue | null {
  if (!url) return null;
  const db = getDb();
  const row = db
    .prepare('SELECT dominant_color, blurhash FROM image_meta WHERE url = ?')
    .get(url) as ImageMetaValue | undefined;
  return row ?? null;
}

/**
 * Compute + persist meta if missing. Safe to fire-and-forget from request
 * handlers. Never throws — failures are logged and skipped.
 */
export async function ensureImageMeta(
  url: string | null | undefined
): Promise<ImageMetaValue | null> {
  if (!url) return null;
  const db = getDb();
  const existing = db
    .prepare('SELECT dominant_color, blurhash FROM image_meta WHERE url = ?')
    .get(url) as ImageMetaValue | undefined;
  if (existing) return existing;

  const meta = await computeImageMeta(url);
  if (!meta) return null;

  db.prepare(
    'INSERT OR REPLACE INTO image_meta (url, dominant_color, blurhash) VALUES (?, ?, ?)'
  ).run(url, meta.dominant_color, meta.blurhash);
  return meta;
}

export function queueImageMeta(url: string | null | undefined): void {
  if (!url) return;
  void ensureImageMeta(url).catch(() => {});
}

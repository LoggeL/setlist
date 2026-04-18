// Walk every known cover URL across diary_entries, live_events, wishlist,
// users.avatar_url — compute + persist dominant_color + blurhash if not
// already in image_meta. Run once after deploy to seed the cache.
//
// Usage (inside the container):
//   docker exec -w /app <container> node scripts/backfill-image-meta.js
const Database = require('better-sqlite3');
const path = require('path');
const sharp = require('sharp');
const { encode: encodeBlurhash } = require('blurhash');
const { readFile } = require('fs/promises');

const DB_PATH =
  process.env.DB_PATH ||
  path.join(process.env.DATA_DIR || process.cwd(), 'data.db');
console.log('[backfill] DB =', DB_PATH);

const db = new Database(DB_PATH);

function toHex(n) {
  const v = Math.max(0, Math.min(255, Math.round(n)));
  return v.toString(16).padStart(2, '0');
}

async function loadImage(url) {
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
          'Mozilla/5.0 (compatible; setlist-backfill/1.0)',
      },
    });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function compute(url) {
  const buf = await loadImage(url);
  if (!buf) return null;
  try {
    const img = sharp(buf, { failOn: 'none' });
    const stats = await img.stats();
    const dominant = stats.dominant
      ? '#' + toHex(stats.dominant.r) + toHex(stats.dominant.g) + toHex(stats.dominant.b)
      : null;
    const { data, info } = await img
      .resize(32, 32, { fit: 'inside' })
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
    return { dominant_color: dominant, blurhash };
  } catch (err) {
    console.warn('[compute] failed for', url, err.message || err);
    return null;
  }
}

async function main() {
  const urls = new Set();
  for (const t of ['diary_entries', 'live_events', 'wishlist']) {
    const rows = db
      .prepare(
        `SELECT DISTINCT COALESCE(album_cover_url, artist_img) AS url FROM ${t} WHERE COALESCE(album_cover_url, artist_img) IS NOT NULL`
      )
      .all();
    for (const r of rows) if (r.url) urls.add(r.url);
  }
  const avatars = db
    .prepare("SELECT avatar_url AS url FROM users WHERE avatar_url IS NOT NULL")
    .all();
  for (const r of avatars) if (r.url) urls.add(r.url);

  console.log('[backfill] distinct urls:', urls.size);

  const has = db.prepare('SELECT 1 FROM image_meta WHERE url = ?');
  const insert = db.prepare(
    'INSERT OR REPLACE INTO image_meta (url, dominant_color, blurhash) VALUES (?, ?, ?)'
  );

  let done = 0, cached = 0, failed = 0;
  for (const url of urls) {
    if (has.get(url)) {
      cached++;
      continue;
    }
    const meta = await compute(url);
    if (!meta) {
      failed++;
      continue;
    }
    insert.run(url, meta.dominant_color, meta.blurhash);
    done++;
    if (done % 10 === 0) console.log(`[backfill] ${done} done, ${cached} cached, ${failed} failed`);
  }
  console.log(`[backfill] total ${done} computed · ${cached} already cached · ${failed} failed`);
  db.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

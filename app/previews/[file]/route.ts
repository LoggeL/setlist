import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import path from 'path';

// Runtime-written cached previews live in a Docker volume, which Next.js's
// standalone static server doesn't rescan after startup. Serve them through
// a route handler so newly cached files are reachable immediately.

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  if (!file || file.includes('/') || file.includes('..') || file.includes('\\')) {
    return new NextResponse('not found', { status: 404 });
  }

  const clean = file.split('?')[0];
  const filepath = path.join(process.cwd(), 'public', 'previews', clean);

  try {
    const info = await stat(filepath);
    if (!info.isFile()) throw new Error('not a file');

    const body = await readFile(filepath);
    return new NextResponse(body as unknown as BodyInit, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(info.size),
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch {
    return new NextResponse('not found', { status: 404 });
  }
}

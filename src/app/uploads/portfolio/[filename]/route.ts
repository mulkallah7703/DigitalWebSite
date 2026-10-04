export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { readFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

const TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
}

export async function GET(_req: Request, { params }: { params: { filename: string } }) {
  const filename = path.basename(params.filename)
  if (!filename || filename !== params.filename) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const data = await readFile(path.join(process.cwd(), 'public', 'uploads', 'portfolio', filename))
    const ext = filename.split('.').pop()?.toLowerCase() || ''
    return new NextResponse(data, {
      headers: {
        'Content-Type': TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}

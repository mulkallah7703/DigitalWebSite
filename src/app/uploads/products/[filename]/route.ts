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
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  ogg: 'video/ogg',
  ogv: 'video/ogg',
  m4v: 'video/mp4',
  avi: 'video/x-msvideo',
  mkv: 'video/x-matroska',
  pdf: 'application/pdf',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}

function contentDisposition(ext: string, filename: string) {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  if (ext === 'pdf') return `inline; filename="${safe}"`
  if (ext === 'ppt' || ext === 'pptx') return `attachment; filename="${safe}"`
  return null
}

export async function GET(_req: Request, { params }: { params: { filename: string } }) {
  const filename = path.basename(params.filename)
  if (!filename || filename !== params.filename) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const data = await readFile(path.join(process.cwd(), 'public', 'uploads', 'products', filename))
    const ext = filename.split('.').pop()?.toLowerCase() || ''
    const headers: Record<string, string> = {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    }
    const disposition = contentDisposition(ext, filename)
    if (disposition) {
      headers['Content-Disposition'] = disposition
      headers['X-Content-Type-Options'] = 'nosniff'
    }
    return new NextResponse(data, { headers })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}

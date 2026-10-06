export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

const MAX_BYTES = 50 * 1024 * 1024

async function compressImage(file: { name: string; type: string; buffer: Buffer }) {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file
  }
  try {
    const sharp = (await import('sharp')).default
    const image = sharp(file.buffer, { failOn: 'none' }).rotate()
    const meta = await image.metadata()
    const wide = (meta.width || 0) > 1600 || (meta.height || 0) > 1600
    if (!wide && file.buffer.length < 800_000) return file
    const buffer = await image
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()
    return {
      buffer,
      type: 'image/jpeg',
      name: file.name.replace(/\.[^.]+$/, '') + '.jpg',
    }
  } catch (error) {
    console.error('[upload] image compress skipped', error)
    return file
  }
}

export async function POST(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { saveUploadedFile } = await import('@/lib/storage')
    await requireAdmin()

    const formData = await req.formData()
    const file = formData.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and videos are allowed.' },
        { status: 400 },
      )
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File size exceeds 50MB limit' }, { status: 400 })
    }

    const raw = {
      name: file.name,
      type: file.type || 'application/octet-stream',
      buffer: Buffer.from(await file.arrayBuffer()),
    }
    const prepared = isImage ? await compressImage(raw) : raw
    const url = await saveUploadedFile(prepared, 'products')

    return NextResponse.json({
      success: true,
      url,
      type: isImage ? 'image' : 'video',
    })
  } catch (error) {
    console.error('Upload error:', error)
    const message = error instanceof Error ? error.message : 'Failed to upload file'
    const status = message === 'Unauthorized' ? 401 : message === 'Forbidden' ? 403 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

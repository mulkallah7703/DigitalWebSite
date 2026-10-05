export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

const MAX_BYTES = 15 * 1024 * 1024

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : 'Upload failed'
  const status = message === 'Unauthorized' ? 401 : message === 'Forbidden' ? 403 : 500
  return NextResponse.json({ error: message }, { status })
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

    const name = file.name.toLowerCase()
    const isPdf = file.type === 'application/pdf' || name.endsWith('.pdf')
    const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/.test(name)
    if (!isPdf && !isImage) {
      return NextResponse.json({ error: 'Only images and PDF files are allowed' }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File size exceeds 15MB limit' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await saveUploadedFile({
      name: file.name,
      type: file.type || (isPdf ? 'application/pdf' : 'application/octet-stream'),
      buffer,
    })

    return NextResponse.json({ url })
  } catch (error) {
    console.error('[portfolio] upload', error)
    return errorResponse(error)
  }
}

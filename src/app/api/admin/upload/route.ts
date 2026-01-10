export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(req: Request) {
  return handler(req)
}

async function handler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    await requireAdmin()

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and videos are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 50MB limit' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop() || ''
    const filename = `${timestamp}-${randomString}.${extension}`

    // Determine upload directory
    const uploadDir = isImage ? 'uploads/images' : 'uploads/videos'
    const uploadPath = join(process.cwd(), 'public', uploadDir)

    // Create directory if it doesn't exist
    if (!existsSync(uploadPath)) {
      await mkdir(uploadPath, { recursive: true })
    }

    // Save file
    const filePath = join(uploadPath, filename)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Return public URL (must start with / for Next.js public directory)
    const publicUrl = `/${uploadDir}/${filename}`

    // Verify file was written
    if (!existsSync(filePath)) {
      throw new Error('File was not saved successfully')
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      type: isImage ? 'image' : 'video',
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    )
  }
}

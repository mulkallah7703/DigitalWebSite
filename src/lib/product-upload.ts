import { classifyProductUpload, contentTypeForUpload, ensureUploadFilename } from '@/lib/product-media'
import { saveUploadedFile } from '@/lib/storage'

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

export async function persistAdminUpload(
  file: File,
  slot: string | null,
): Promise<{ url: string; type: string } | { error: string; status: number }> {
  const kind = classifyProductUpload({ name: file.name, type: file.type })
  if (!kind) {
    return {
      error: 'Invalid file type. Only images, videos, PDF, and PowerPoint files are allowed.',
      status: 400,
    }
  }
  if (slot === 'image' && kind !== 'image') {
    return { error: 'Invalid file type. Only images are allowed.', status: 400 }
  }
  if (slot === 'media' && kind !== 'video' && kind !== 'pdf' && kind !== 'presentation') {
    return {
      error: 'Invalid file type. Only video, PDF, and PowerPoint files are allowed.',
      status: 400,
    }
  }
  if (file.size > MAX_BYTES) {
    return { error: 'File size exceeds 50MB limit', status: 400 }
  }

  const name = ensureUploadFilename(file.name, kind, file.type)
  const type = contentTypeForUpload(kind, name, file.type)
  const raw = {
    name,
    type,
    buffer: Buffer.from(await file.arrayBuffer()),
  }
  const prepared = kind === 'image' ? await compressImage(raw) : raw
  const url = await saveUploadedFile(prepared, 'products')
  return { url, type: kind }
}

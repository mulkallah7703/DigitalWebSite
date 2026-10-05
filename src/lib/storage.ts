import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

export type StorageDriver = 'local' | 'blob' | 's3'

export function storageDriver(): StorageDriver {
  const value = (process.env.PORTFOLIO_STORAGE || 'local').toLowerCase()
  if (value === 'blob' || value === 's3') return value
  return 'local'
}

function safeFilename(name: string) {
  const base = name.split(/[/\\]/).pop() || 'file'
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, '')
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return `${stamp}-${cleaned || 'file'}`
}

async function saveLocal(filename: string, buffer: Buffer) {
  const dir = path.join(process.cwd(), 'public', 'uploads', 'portfolio')
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, filename), buffer)
  // Served by src/app/uploads/portfolio/[filename]/route.ts so a file saved
  // after `next start` is available immediately. Next snapshots public/ at boot.
  return `/uploads/portfolio/${filename}`
}

async function saveBlob(filename: string, buffer: Buffer, contentType: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required when PORTFOLIO_STORAGE=blob')
  }
  const { put } = await import('@vercel/blob')
  const blob = await put(`portfolio/${filename}`, buffer, {
    access: 'public',
    token,
    contentType,
  })
  return blob.url
}

async function saveS3(filename: string, buffer: Buffer, contentType: string) {
  const bucket = process.env.AWS_S3_BUCKET
  const region = process.env.AWS_REGION || 'us-east-1'
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  if (!bucket || !accessKeyId || !secretAccessKey) {
    throw new Error('AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY are required when PORTFOLIO_STORAGE=s3')
  }
  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3')
  const client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  })
  const key = `portfolio/${filename}`
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  )
  const publicBase = process.env.AWS_S3_PUBLIC_URL?.replace(/\/$/, '')
  if (publicBase) return `${publicBase}/${key}`
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}

export async function saveUploadedFile(file: { name: string; type: string; buffer: Buffer }) {
  const filename = safeFilename(file.name)
  const driver = storageDriver()
  if (driver === 'blob') return saveBlob(filename, file.buffer, file.type)
  if (driver === 's3') return saveS3(filename, file.buffer, file.type)
  return saveLocal(filename, file.buffer)
}

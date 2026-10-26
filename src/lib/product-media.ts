export type UploadKind = 'image' | 'video' | 'pdf' | 'presentation'
export type MediaKind = 'video' | 'pdf' | 'presentation' | 'file'

const GENERIC_TYPES = new Set(['', 'application/octet-stream', 'binary/octet-stream'])

const PRESENTATION_MIMES = new Set([
  'application/vnd.ms-powerpoint',
  'application/mspowerpoint',
  'application/powerpoint',
  'application/x-mspowerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
])

const VIDEO_EXTENSIONS = new Set(['mp4', 'webm', 'ogg', 'ogv', 'mov', 'm4v', 'avi', 'mkv'])
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif', 'bmp', 'ico'])

export const PRODUCT_MEDIA_ACCEPT = [
  'video/*',
  '.pdf',
  '.ppt',
  '.pptx',
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
].join(',')

export function fileExtension(name: string): string {
  const base = (name.split(/[?#]/)[0].split(/[/\\]/).pop() || '').trim()
  const dot = base.lastIndexOf('.')
  if (dot < 0 || dot === base.length - 1) return ''
  return base.slice(dot + 1).toLowerCase()
}

export function fileNameFromUrl(url: string): string {
  const base = url.split(/[?#]/)[0].split(/[/\\]/).pop() || 'file'
  try {
    return decodeURIComponent(base)
  } catch {
    return base
  }
}

function normalizedType(type: string): string {
  return (type || '').split(';')[0].trim().toLowerCase()
}

function isGeneric(type: string): boolean {
  return GENERIC_TYPES.has(type)
}

export function classifyProductUpload(file: { name: string; type: string }): UploadKind | null {
  const type = normalizedType(file.type)
  const ext = fileExtension(file.name)

  if (ext === 'pdf') {
    if (isGeneric(type) || type === 'application/pdf' || type === 'application/x-pdf') return 'pdf'
    return null
  }

  if (ext === 'ppt' || ext === 'pptx') {
    const zipLike = type === 'application/zip' || type === 'application/x-zip-compressed'
    if (isGeneric(type) || PRESENTATION_MIMES.has(type) || (ext === 'pptx' && zipLike)) {
      return 'presentation'
    }
    return null
  }

  if (type.startsWith('image/')) return 'image'
  if (type.startsWith('video/')) return 'video'
  if ((type === 'application/pdf' || type === 'application/x-pdf') && ext === '') return 'pdf'
  if (PRESENTATION_MIMES.has(type) && ext === '') return 'presentation'
  if (isGeneric(type) && VIDEO_EXTENSIONS.has(ext)) return 'video'
  if (isGeneric(type) && IMAGE_EXTENSIONS.has(ext)) return 'image'
  return null
}

export function isProductMediaFile(file: { name: string; type: string }): boolean {
  const kind = classifyProductUpload(file)
  return kind === 'video' || kind === 'pdf' || kind === 'presentation'
}

export function contentTypeForUpload(kind: UploadKind, name: string, type: string): string {
  const given = normalizedType(type)
  const ext = fileExtension(name)
  if (kind === 'pdf') return 'application/pdf'
  if (kind === 'presentation') {
    return ext === 'ppt'
      ? 'application/vnd.ms-powerpoint'
      : 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  }
  if (given && !isGeneric(given)) return given
  if (kind === 'video') {
    if (ext === 'webm') return 'video/webm'
    if (ext === 'ogg' || ext === 'ogv') return 'video/ogg'
    if (ext === 'mov') return 'video/quicktime'
    if (ext === 'avi') return 'video/x-msvideo'
    if (ext === 'mkv') return 'video/x-matroska'
    return 'video/mp4'
  }
  if (ext === 'png') return 'image/png'
  if (ext === 'gif') return 'image/gif'
  if (ext === 'webp') return 'image/webp'
  if (ext === 'svg') return 'image/svg+xml'
  if (ext === 'avif') return 'image/avif'
  if (ext === 'ico') return 'image/x-icon'
  if (ext === 'bmp') return 'image/bmp'
  return 'image/jpeg'
}

export function ensureUploadFilename(name: string, kind: UploadKind, type: string): string {
  if (fileExtension(name)) return name
  const given = normalizedType(type)
  let ext = 'bin'
  if (kind === 'pdf') ext = 'pdf'
  else if (kind === 'presentation') {
    ext = given.includes('ms-powerpoint') || given === 'application/mspowerpoint' ? 'ppt' : 'pptx'
  } else if (kind === 'video') {
    if (given === 'video/webm') ext = 'webm'
    else if (given === 'video/ogg') ext = 'ogg'
    else if (given === 'video/quicktime') ext = 'mov'
    else ext = 'mp4'
  } else if (given === 'image/png') ext = 'png'
  else if (given === 'image/gif') ext = 'gif'
  else if (given === 'image/webp') ext = 'webp'
  else if (given === 'image/svg+xml') ext = 'svg'
  else ext = 'jpg'

  const base = name.trim() || 'file'
  return `${base}.${ext}`
}

export function mediaKindFromUrl(url: string): MediaKind {
  const ext = fileExtension(url)
  if (ext === 'pdf') return 'pdf'
  if (ext === 'ppt' || ext === 'pptx') return 'presentation'
  if (ext === '' || VIDEO_EXTENSIONS.has(ext)) return 'video'
  return 'file'
}

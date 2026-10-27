import { fileExtension, mediaKindFromUrl } from './product-media'

/**
 * Products without a Payhip (external purchase) link that carry uploaded files
 * are delivered by email after checkout. Their files must never be exposed on
 * the storefront: no viewer, no links, no URLs in page props or public APIs.
 */

export type DeliverableKind = 'pdf' | 'video' | 'presentation' | 'file'

export type FileSummary = Record<DeliverableKind, number>

export type DeliverableFile = {
  /** ProductFile id, or 'main' for the product's uploaded attachment (videoUrl). */
  ref: string
  name: string
  url: string
  size: number | null
  kind: DeliverableKind
}

const VIDEO_EXTENSIONS = new Set(['mp4', 'webm', 'ogg', 'ogv', 'mov', 'm4v', 'avi', 'mkv'])

export function hasPayhipLink(product: { externalPurchaseLink?: string | null }) {
  return Boolean(product.externalPurchaseLink && product.externalPurchaseLink.trim())
}

/**
 * The product "video" field also stores uploaded PDFs and presentations. Only
 * an actual uploaded file counts as a deliverable; a page link such as a
 * YouTube URL (no file extension) stays a public preview.
 */
export function isUploadedAttachment(url: string | null | undefined): url is string {
  if (!url || !url.trim()) return false
  const ext = fileExtension(url.trim())
  return ext === 'pdf' || ext === 'ppt' || ext === 'pptx' || VIDEO_EXTENSIONS.has(ext)
}

export function kindOf(name: string, type?: string | null): DeliverableKind {
  const ext = fileExtension(name)
  const mime = (type || '').toLowerCase()
  if (ext === 'pdf' || mime.includes('pdf')) return 'pdf'
  if (ext === 'ppt' || ext === 'pptx' || mime.includes('powerpoint') || mime.includes('presentation')) return 'presentation'
  if (VIDEO_EXTENSIONS.has(ext) || mime.startsWith('video/')) return 'video'
  return 'file'
}

function nameFromUrl(url: string) {
  const base = url.split(/[?#]/)[0].split(/[/\\]/).pop() || 'file'
  try {
    return decodeURIComponent(base)
  } catch {
    return base
  }
}

export function deliverableFiles(product: {
  videoUrl?: string | null
  files?: { id: string; name: string; url?: string; size: number; type: string }[]
}): DeliverableFile[] {
  const out: DeliverableFile[] = []
  if (isUploadedAttachment(product.videoUrl)) {
    const url = product.videoUrl.trim()
    const kind = mediaKindFromUrl(url)
    out.push({ ref: 'main', name: nameFromUrl(url), url, size: null, kind: kind === 'file' ? 'file' : kind })
  }
  for (const file of product.files || []) {
    out.push({ ref: file.id, name: file.name, url: file.url || '', size: file.size, kind: kindOf(file.name, file.type) })
  }
  return out
}

export function summarize(files: { kind: DeliverableKind }[]): FileSummary {
  const summary: FileSummary = { pdf: 0, video: 0, presentation: 0, file: 0 }
  for (const file of files) summary[file.kind] += 1
  return summary
}

export function summaryTotal(summary: FileSummary) {
  return summary.pdf + summary.video + summary.presentation + summary.file
}

export function deliversByEmail(product: {
  externalPurchaseLink?: string | null
  videoUrl?: string | null
  files?: { id: string; name: string; size: number; type: string }[]
}) {
  return !hasPayhipLink(product) && deliverableFiles(product).length > 0
}

/**
 * Storefront view of a product. For email-delivered products the uploaded
 * attachment and the file list (including any URLs) are removed and replaced by
 * a count summary. Payhip products are returned unchanged apart from the summary.
 */
export function storefrontProduct<
  T extends {
    externalPurchaseLink?: string | null
    videoUrl?: string | null
    files?: { id: string; name: string; url?: string; size: number; type: string }[]
  },
>(product: T): T & { deliverByEmail: boolean; fileSummary: FileSummary } {
  const files = deliverableFiles(product)
  const fileSummary = summarize(files)
  if (hasPayhipLink(product) || files.length === 0) {
    return { ...product, deliverByEmail: false, fileSummary }
  }
  return {
    ...product,
    videoUrl: null,
    files: [] as unknown as T['files'],
    deliverByEmail: true,
    fileSummary,
  }
}

'use client'

import { Download, FileText } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { fileNameFromUrl, mediaKindFromUrl } from '@/lib/product-media'

export function ProductAttachment({
  url,
  variant = 'store',
}: {
  url: string
  variant?: 'store' | 'admin'
}) {
  const { t } = useLanguage()
  const kind = mediaKindFromUrl(url)
  const name = fileNameFromUrl(url)
  const frameClass = variant === 'admin'
    ? 'w-full max-w-md h-64 rounded-lg border bg-secondary'
    : 'w-full h-[420px] rounded-2xl border bg-secondary'
  const videoWrapClass = variant === 'admin'
    ? 'relative aspect-video w-full max-w-md overflow-hidden rounded-lg border bg-secondary'
    : 'relative aspect-video overflow-hidden rounded-2xl bg-secondary'

  if (kind === 'pdf') {
    return (
      <div className="space-y-3">
        <iframe src={url} title={name} className={frameClass} />
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            <FileText className="w-4 h-4" />
            {t('product.viewPdf')}
          </a>
          <a
            href={url}
            download={name}
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            <Download className="w-4 h-4" />
            {t('product.downloadPdf')}
          </a>
        </div>
      </div>
    )
  }

  if (kind === 'presentation' || kind === 'file') {
    return (
      <a
        href={url}
        download={name}
        className="flex items-center justify-between gap-4 rounded-2xl border bg-secondary/60 p-4 transition-colors hover:bg-secondary"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-medium">{name}</span>
            <span className="block text-xs uppercase text-muted-foreground">
              {kind === 'presentation' ? 'PowerPoint' : 'File'}
            </span>
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary">
          <Download className="h-4 w-4" />
          {kind === 'presentation' ? t('product.downloadPresentation') : t('product.openFile')}
        </span>
      </a>
    )
  }

  return (
    <div className={videoWrapClass}>
      <video
        src={url}
        controls
        className="h-full w-full object-contain"
        preload="metadata"
        playsInline
      >
        <source src={url} type="video/mp4" />
        <source src={url} type="video/webm" />
        <source src={url} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

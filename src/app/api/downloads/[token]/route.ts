export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

/** Streams one purchased file for a signed, expiring link sent by email. */
export async function GET(_req: Request, { params }: { params: { token: string } }) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return new NextResponse('Unavailable', { status: 503 })
  }

  const { verifyDownloadToken } = await import('@/lib/download-token')
  const claim = verifyDownloadToken(params.token)
  if (!claim) return new NextResponse('This download link is invalid or has expired.', { status: 410 })

  const { db } = await import('@/lib/db')
  const { deliverableFiles, hasPayhipLink } = await import('@/lib/product-delivery')
  const { openStoredFile } = await import('@/lib/order-delivery')

  const order = await db.order.findUnique({
    where: { id: claim.o },
    select: {
      status: true,
      paymentStatus: true,
      userId: true,
      items: {
        where: { productId: claim.p },
        select: {
          product: {
            select: {
              externalPurchaseLink: true,
              videoUrl: true,
              files: { select: { id: true, name: true, url: true, size: true, type: true } },
            },
          },
        },
      },
    },
  })
  const product = order?.items[0]?.product
  if (!order || order.status !== 'COMPLETED' || order.paymentStatus !== 'PAID' || !product || hasPayhipLink(product)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const file = deliverableFiles(product).find((entry) => entry.ref === claim.f)
  if (!file) return new NextResponse('Not found', { status: 404 })

  const upstream = await openStoredFile(file.url)
  if (!upstream || !upstream.body) return new NextResponse('File unavailable', { status: 502 })

  if (claim.f !== 'main') {
    db.download
      .create({ data: { userId: order.userId, fileId: claim.f } })
      .catch((error) => console.error('[downloads]', error))
  }

  const safeName = file.name.replace(/[^\w.\-]+/g, '_') || 'file'
  const headers = new Headers({
    'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(file.name)}`,
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex',
  })
  const length = upstream.headers.get('content-length')
  if (length) headers.set('Content-Length', length)
  return new NextResponse(upstream.body, { headers })
}

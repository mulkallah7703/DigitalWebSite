import path from 'path'
import { readFile, stat } from 'fs/promises'
import type { Prisma } from '@prisma/client'
import { db } from './db'
import { sendMail, type MailAttachment } from './mailer'
import { createDownloadToken, DOWNLOAD_LINK_TTL_SECONDS } from './download-token'
import { deliverableFiles, hasPayhipLink, type DeliverableFile } from './product-delivery'

/** Attach files when they add up to less than this; otherwise send signed links. */
export const MAX_ATTACHMENT_BYTES = 15 * 1024 * 1024

const STORE_NAME_EN = 'Alsadi Digital Store'
const STORE_NAME_AR = 'متجر السعدي الرقمي'
const OWNER_EN = 'Mulk Allah Al-Sadi'
const OWNER_AR = 'ملك الله السعدي'

export type DeliveryResult =
  | { ok: true; mode: 'attachments' | 'links'; alreadySent?: boolean }
  | { ok: false; reason: string }

function appUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || '').replace(/\/$/, '')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function htmlToText(html: string) {
  return html
    .replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, ' ')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/\s*(p|div|li|h[1-6])\s*>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim()
}

function localUploadPath(url: string) {
  if (!url.startsWith('/uploads/')) return null
  const rel = path.normalize(url.split(/[?#]/)[0]).replace(/^([/\\])+/, '')
  if (rel.includes('..')) return null
  return path.join(process.cwd(), 'public', rel)
}

export async function fileSize(file: DeliverableFile): Promise<number | null> {
  if (file.size != null && file.size > 0) return file.size
  const local = localUploadPath(file.url)
  if (local) return stat(local).then((s) => s.size).catch(() => null)
  if (!/^https?:\/\//i.test(file.url)) return null
  try {
    const res = await fetch(file.url, { method: 'HEAD', cache: 'no-store' })
    const length = Number(res.headers.get('content-length'))
    return res.ok && Number.isFinite(length) && length > 0 ? length : null
  } catch {
    return null
  }
}

/** Reads a stored product file (local upload or remote storage URL). */
export async function openStoredFile(url: string): Promise<Response | null> {
  const local = localUploadPath(url)
  if (local) {
    try {
      return new Response(await readFile(local))
    } catch {
      return null
    }
  }
  if (!/^https?:\/\//i.test(url)) return null
  const res = await fetch(url, { cache: 'no-store' })
  return res.ok ? res : null
}

function formatBytes(bytes: number | null) {
  if (!bytes) return ''
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

type ProductBlock = {
  productId: string
  title: string
  description: string
  files: (DeliverableFile & { bytes: number | null; link?: string })[]
}

function renderEmail(customerName: string, orderNumber: string, blocks: ProductBlock[], mode: 'attachments' | 'links') {
  const greetingName = customerName ? ` ${escapeHtml(customerName)}` : ''
  const days = Math.round(DOWNLOAD_LINK_TTL_SECONDS / 86400)

  const productHtml = blocks
    .map((block) => {
      const files = block.files
        .map((file) => {
          const label = `${escapeHtml(file.name)}${file.bytes ? ` <span style="color:#6b7280">(${formatBytes(file.bytes)})</span>` : ''}`
          return file.link
            ? `<li style="margin:4px 0"><a href="${escapeHtml(file.link)}" style="color:#7c3aed;font-weight:600">${label}</a></li>`
            : `<li style="margin:4px 0">📎 ${label}</li>`
        })
        .join('')
      return `
        <div style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:16px 0">
          <h2 style="margin:0 0 8px;font-size:18px;color:#111827" dir="auto">${escapeHtml(block.title)}</h2>
          <p style="margin:0 0 12px;color:#374151;white-space:pre-line;line-height:1.6" dir="auto">${escapeHtml(block.description)}</p>
          <ul style="margin:0;padding-inline-start:20px">${files}</ul>
        </div>`
    })
    .join('')

  const note = mode === 'attachments'
    ? `<p dir="rtl" style="margin:0">ستجد الملفات مرفقة بهذه الرسالة.</p><p dir="ltr" style="margin:4px 0 0">Your files are attached to this email.</p>`
    : `<p dir="rtl" style="margin:0">اضغط على اسم الملف لتنزيله. الروابط خاصة بك وصالحة لمدة ${days} أيام.</p><p dir="ltr" style="margin:4px 0 0">Click a file name to download it. These links are private to you and valid for ${days} days.</p>`

  const html = `<!doctype html>
<html><body style="margin:0;background:#f3f4f6;font-family:Tahoma,Arial,sans-serif">
  <div style="max-width:620px;margin:0 auto;padding:24px">
    <div style="background:#ffffff;border-radius:16px;padding:24px">
      <h1 style="margin:0 0 4px;font-size:22px;color:#7c3aed">${STORE_NAME_AR} · ${STORE_NAME_EN}</h1>
      <p style="margin:0 0 20px;color:#6b7280;font-size:13px">#${escapeHtml(orderNumber)}</p>
      <div dir="rtl" style="text-align:right;line-height:1.8;color:#111827">
        <p style="margin:0 0 8px">أهلًا وسهلًا${greetingName} 🌟</p>
        <p style="margin:0 0 8px">شكرًا من القلب لاختيارك ${STORE_NAME_AR}. يسعدني جدًا أن أكون جزءًا من رحلتك، وأتمنى أن تجد في هذه الملفات ما يفيدك ويضيف لك.</p>
        <p style="margin:0">إذا احتجت أي شيء، فقط رد على هذه الرسالة.</p>
        <p style="margin:8px 0 0">مع خالص التحية،<br/><strong>${OWNER_AR}</strong></p>
      </div>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
      <div dir="ltr" style="text-align:left;line-height:1.7;color:#111827">
        <p style="margin:0 0 8px">Welcome${greetingName}!</p>
        <p style="margin:0 0 8px">Thank you so much for choosing ${STORE_NAME_EN}. I'm truly glad to be part of your journey and I hope these files bring you real value.</p>
        <p style="margin:0">If you need anything at all, just reply to this email.</p>
        <p style="margin:8px 0 0">Warm regards,<br/><strong>${OWNER_EN}</strong></p>
      </div>
      ${productHtml}
      <div style="background:#f5f3ff;border-radius:12px;padding:12px 16px;color:#4c1d95;font-size:14px">${note}</div>
    </div>
  </div>
</body></html>`

  const text = [
    `${STORE_NAME_AR} · ${STORE_NAME_EN}`,
    `#${orderNumber}`,
    '',
    `أهلًا وسهلًا${customerName ? ` ${customerName}` : ''}! شكرًا من القلب لاختيارك ${STORE_NAME_AR}. أتمنى أن تجد في هذه الملفات ما يفيدك. — ${OWNER_AR}`,
    `Welcome${customerName ? ` ${customerName}` : ''}! Thank you for choosing ${STORE_NAME_EN}. I hope these files bring you real value. — ${OWNER_EN}`,
    '',
    ...blocks.flatMap((block) => [
      `== ${block.title} ==`,
      block.description,
      ...block.files.map((file) => `- ${file.name}${file.link ? `: ${file.link}` : ' (attached / مرفق)'}`),
      '',
    ]),
  ].join('\n')

  return { html, text }
}

/**
 * Emails the files of an order's email-delivered products to the customer.
 * Only runs for completed, paid orders created by the server; skips Payhip
 * products; sends at most once per order (tracked in order.metadata).
 */
export async function sendOrderFilesEmail(orderId: string): Promise<DeliveryResult> {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      user: { select: { email: true, name: true } },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              nameAr: true,
              description: true,
              descriptionAr: true,
              shortDescription: true,
              externalPurchaseLink: true,
              videoUrl: true,
              files: { select: { id: true, name: true, url: true, size: true, type: true } },
            },
          },
        },
      },
    },
  })

  if (!order) return { ok: false, reason: 'order-not-found' }
  if (order.status !== 'COMPLETED' || order.paymentStatus !== 'PAID') return { ok: false, reason: 'order-not-completed' }

  const metadata = (order.metadata && typeof order.metadata === 'object' && !Array.isArray(order.metadata)
    ? order.metadata
    : {}) as Record<string, unknown>
  const previous = metadata.filesEmail as { sentAt?: string; mode?: 'attachments' | 'links' } | undefined
  if (previous?.sentAt) return { ok: true, mode: previous.mode || 'links', alreadySent: true }

  const to = order.user?.email || order.customerEmail
  if (!to) return { ok: false, reason: 'no-recipient' }

  const seen = new Set<string>()
  const blocks: ProductBlock[] = []
  for (const item of order.items) {
    const product = item.product
    if (!product || seen.has(product.id) || hasPayhipLink(product)) continue
    seen.add(product.id)
    const files = deliverableFiles(product)
    if (files.length === 0) continue
    const sized = await Promise.all(files.map(async (file) => ({ ...file, bytes: await fileSize(file) })))
    const title = product.nameAr && product.nameAr.trim() && product.nameAr.trim() !== product.name.trim()
      ? `${product.name} — ${product.nameAr}`
      : product.name
    const description = htmlToText(product.description || product.shortDescription || '')
    const descriptionAr = product.descriptionAr ? htmlToText(product.descriptionAr) : ''
    blocks.push({
      productId: product.id,
      title,
      description: [description, descriptionAr].filter(Boolean).join('\n\n'),
      files: sized,
    })
  }

  if (blocks.length === 0) return { ok: false, reason: 'no-files' }

  const allFiles = blocks.flatMap((block) => block.files)
  const knownTotal = allFiles.every((file) => file.bytes != null)
    ? allFiles.reduce((sum, file) => sum + (file.bytes || 0), 0)
    : Infinity

  let mode: 'attachments' | 'links' = knownTotal <= MAX_ATTACHMENT_BYTES ? 'attachments' : 'links'
  let attachments: MailAttachment[] | undefined

  if (mode === 'attachments') {
    try {
      attachments = []
      for (const file of allFiles) {
        const res = await openStoredFile(file.url)
        if (!res) throw new Error(`missing file ${file.ref}`)
        attachments.push({
          filename: file.name,
          content: Buffer.from(await res.arrayBuffer()),
          contentType: res.headers.get('content-type') || undefined,
        })
      }
    } catch (error) {
      console.error('[order-delivery] attachment fallback to links', error)
      mode = 'links'
      attachments = undefined
    }
  }

  if (mode === 'links') {
    const base = appUrl()
    if (!base) return { ok: false, reason: 'app-url-missing' }
    for (const block of blocks) {
      for (const file of block.files) {
        file.link = `${base}/api/downloads/${createDownloadToken({ o: order.id, p: block.productId, f: file.ref })}`
      }
    }
  }

  const customerName = order.user?.name || order.customerName || ''
  const { html, text } = renderEmail(customerName, order.orderNumber, blocks, mode)
  const subject = blocks.length === 1
    ? `ملفاتك جاهزة: ${blocks[0].title} | Your files from ${STORE_NAME_EN}`
    : `ملفاتك جاهزة (${blocks.length} منتجات) | Your files from ${STORE_NAME_EN}`

  const sent = await sendMail({ to, subject, html, text, attachments })
  if (!sent.ok) return { ok: false, reason: sent.reason }

  await db.order.update({
    where: { id: order.id },
    data: {
      metadata: {
        ...metadata,
        filesEmail: { sentAt: new Date().toISOString(), mode, provider: sent.provider, to },
      } as Prisma.InputJsonValue,
    },
  })

  return { ok: true, mode }
}

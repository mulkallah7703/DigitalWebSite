/**
 * Outgoing mail. Uses SMTP (e.g. Gmail with an app password) when SMTP_HOST,
 * SMTP_USER and SMTP_PASS are set, otherwise Resend when RESEND_API_KEY is set.
 * Never throws: returns { ok: false } when nothing is configured or sending fails.
 */

export type MailAttachment = { filename: string; content: Buffer; contentType?: string }

export type MailMessage = {
  to: string
  subject: string
  html: string
  text: string
  attachments?: MailAttachment[]
}

export type MailResult = { ok: true; provider: 'smtp' | 'resend' } | { ok: false; reason: string }

const DEFAULT_FROM_NAME = 'Alsadi Digital Store | متجر السعدي الرقمي'

export function mailConfigured() {
  return Boolean(
    (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) || process.env.RESEND_API_KEY,
  )
}

function fromAddress(fallbackEmail?: string) {
  const configured = process.env.EMAIL_FROM?.trim()
  if (configured) return configured
  if (fallbackEmail) return `"${DEFAULT_FROM_NAME}" <${fallbackEmail}>`
  return process.env.RESEND_FROM?.trim() || `${DEFAULT_FROM_NAME} <onboarding@resend.dev>`
}

export async function sendMail(message: MailMessage): Promise<MailResult> {
  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = (await import('nodemailer')).default
      const port = Number(process.env.SMTP_PORT || 465)
      const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
      await transport.sendMail({
        from: fromAddress(process.env.SMTP_USER),
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        attachments: message.attachments,
      })
      return { ok: true, provider: 'smtp' }
    }

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error } = await resend.emails.send({
        from: fromAddress(),
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        attachments: message.attachments?.map((a) => ({ filename: a.filename, content: a.content })),
      })
      if (error) return { ok: false, reason: error.message || 'resend-error' }
      return { ok: true, provider: 'resend' }
    }

    return { ok: false, reason: 'not-configured' }
  } catch (error) {
    console.error('[mailer]', error)
    return { ok: false, reason: error instanceof Error ? error.message : 'send-failed' }
  }
}

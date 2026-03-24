import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(50).optional().nullable(),
  message: z.string().min(1, 'Message is required').max(5000),
})

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL
    const fromEmail = process.env.RESEND_FROM

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 503 }
      )
    }

    if (!contactEmail) {
      console.error('CONTACT_EMAIL is not configured')
      return NextResponse.json(
        { error: 'Contact email is not configured' },
        { status: 503 }
      )
    }

    if (!fromEmail) {
      console.error('RESEND_FROM is not configured')
      return NextResponse.json(
        { error: 'Email sender is not configured' },
        { status: 503 }
      )
    }

    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]
      return NextResponse.json(
        { error: firstError?.message || 'Invalid request' },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = parsed.data

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${phone?.trim() ? escapeHtml(phone) : 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit; background: #f5f5f5; padding: 12px; border-radius: 6px;">${escapeHtml(message)}</pre>
      `,
    })

    if (error) {
      console.error('RESEND ERROR:', error)
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}

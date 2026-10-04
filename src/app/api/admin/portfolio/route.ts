export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : 'Request failed'
  const status = message === 'Unauthorized' ? 401 : message === 'Forbidden' ? 403 : 500
  return NextResponse.json({ error: message }, { status })
}

export async function GET() {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { loadPortfolioBundle } = await import('@/lib/portfolio-db')
    await requireAdmin()
    const bundle = await loadPortfolioBundle()
    return NextResponse.json({ bundle })
  } catch (error) {
    return errorResponse(error)
  }
}

export async function PUT(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { isPortfolioSection, savePortfolioSection } = await import('@/lib/portfolio-db')
    await requireAdmin()

    const body = await req.json()
    const section = typeof body?.section === 'string' ? body.section : ''
    if (!isPortfolioSection(section)) {
      return NextResponse.json({ error: 'Unknown portfolio section' }, { status: 400 })
    }

    const bundle = await savePortfolioSection(section, body.data)
    return NextResponse.json({ bundle })
  } catch (error) {
    console.error('[portfolio] save', error)
    return errorResponse(error)
  }
}

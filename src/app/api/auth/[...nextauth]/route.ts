export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

// Prevent handler creation during build
let handler: ReturnType<typeof import('next-auth').default> | null = null

async function getHandler() {
  // Prevent execution during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return null
  }
  if (!handler) {
    const NextAuth = (await import('next-auth')).default
    const { authOptions } = await import('@/lib/auth')
    handler = NextAuth(authOptions)
  }
  return handler
}

export async function GET(req: Request) {
  // Prevent execution during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }
  
  const authHandler = await getHandler()
  if (!authHandler) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }
  return authHandler(req)
}

export async function POST(req: Request) {
  // Prevent execution during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }
  
  const authHandler = await getHandler()
  if (!authHandler) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }
  return authHandler(req)
}

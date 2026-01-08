export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  return handler(req, 'GET');
}

export async function POST(req: Request) {
  return handler(req, 'POST');
}

async function handler(req: Request, method: 'GET' | 'POST') {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  const NextAuth = (await import('next-auth')).default
  const { authOptions } = await import('@/lib/auth')
  const authHandler = NextAuth(authOptions)

  if (method === 'GET') {
    return authHandler(req)
  }
  return authHandler(req)
}

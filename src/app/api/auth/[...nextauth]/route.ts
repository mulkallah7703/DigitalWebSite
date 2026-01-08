export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

// Prevent handler creation during build
let handler: ReturnType<typeof NextAuth> | null = null

function getHandler() {
  // Prevent execution during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return null
  }
  if (!handler) {
    handler = NextAuth(authOptions)
  }
  return handler
}

export async function GET(req: Request) {
  // Prevent execution during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }
  
  const authHandler = getHandler()
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
  
  const authHandler = getHandler()
  if (!authHandler) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }
  return authHandler(req)
}

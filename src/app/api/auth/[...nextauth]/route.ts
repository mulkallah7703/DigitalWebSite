export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

let authHandler: ReturnType<typeof import('next-auth').default> | null = null

async function getAuthHandler() {
  if (authHandler) {
    return authHandler
  }

  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET is not set')
  }

  const NextAuth = (await import('next-auth')).default
  const { authOptions } = await import('@/lib/auth')
  const options = await authOptions()
  authHandler = NextAuth(options)
  return authHandler
}

export async function GET(req: Request) {
  return handler(req)
}

export async function POST(req: Request) {
  return handler(req)
}

async function handler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return new Response(JSON.stringify({ error: 'Service unavailable during build' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const authHandlerInstance = await getAuthHandler()
    return authHandlerInstance(req)
  } catch (error) {
    console.error('NextAuth handler error:', error)
    return new Response(JSON.stringify({ 
      error: 'Authentication error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

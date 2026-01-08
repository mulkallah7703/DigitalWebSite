import type { NextAuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'

// Lazy initialization to prevent build-time execution
let _authOptions: NextAuthOptions | null = null

async function getAuthOptions(): Promise<NextAuthOptions> {
  if (_authOptions) {
    return _authOptions
  }
  
  const { PrismaAdapter } = await import('@auth/prisma-adapter')
  const GoogleProvider = (await import('next-auth/providers/google')).default
  const GitHubProvider = (await import('next-auth/providers/github')).default
  const CredentialsProvider = (await import('next-auth/providers/credentials')).default
  const bcrypt = (await import('bcryptjs')).default
  const { db } = await import('./db')
  
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET environment variable is required')
  }

  _authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(db) as Adapter,
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/auth/login',
      error: '/auth/error',
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          try {
            const user = await db.user.findUnique({
              where: { email: credentials.email },
            })

            if (!user || !user.password) {
              return null
            }

            const isValid = await bcrypt.compare(credentials.password, user.password)

            if (!isValid) {
              return null
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              role: user.role,
            }
          } catch (error) {
            console.error('Auth error:', error)
            return null
          }
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        try {
          if (token && session.user) {
            session.user.id = token.id as string
            session.user.role = token.role as string
          }
          return session
        } catch (error) {
          console.error('Session callback error:', error)
          return session
        }
      },
      async jwt({ token, user }) {
        try {
          if (user) {
            token.id = user.id
            token.role = user.role
          }
          return token
        } catch (error) {
          console.error('JWT callback error:', error)
          return token
        }
      },
    },
    debug: process.env.NODE_ENV === 'development',
  }
  
  return _authOptions
}

export { getAuthOptions as authOptions }

export const getAuth = async () => {
  const { getServerSession } = await import('next-auth')
  const options = await getAuthOptions()
  return getServerSession(options)
}

export const requireAuth = async () => {
  const session = await getAuth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session
}

export const requireAdmin = async () => {
  const session = await requireAuth()
  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    throw new Error('Forbidden')
  }
  return session
}

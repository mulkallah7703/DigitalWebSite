import { NextAuthOptions, getServerSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db'
import type { Adapter } from 'next-auth/adapters'

// Lazy initialization to prevent build-time execution
let _authOptions: NextAuthOptions | null = null

function getAuthOptions(): NextAuthOptions {
  if (_authOptions) {
    return _authOptions
  }
  
  _authOptions = {
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
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Invalid credentials')
          }

          const user = await db.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user || !user.password) {
            throw new Error('Invalid credentials')
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)

          if (!isValid) {
            throw new Error('Invalid credentials')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          }
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id as string
          session.user.role = token.role as string
        }
        return session
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
          token.role = user.role
        }
        return token
      },
    },
  }
  
  return _authOptions
}

// Proxy to prevent build-time execution
export const authOptions: NextAuthOptions = new Proxy({} as NextAuthOptions, {
  get(_target, prop) {
    return (getAuthOptions() as any)[prop]
  },
})

export const getAuth = () => getServerSession(authOptions)

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

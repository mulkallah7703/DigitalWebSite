import type { NextAuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db'
import { isGoogleAuthEnabled } from './google-auth'

function googleEmailVerified(profile: unknown) {
  if (!profile || typeof profile !== 'object') return false
  const value = (profile as { email_verified?: unknown }).email_verified
  return value === true || value === 'true'
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    ...(isGoogleAuthEnabled()
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!.trim(),
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!.trim(),
            // Google marks the address verified. Linking is limited to that case in signIn.
            allowDangerousEmailAccountLinking: true,
            profile(profile) {
              return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
                // New Google accounts are customers. Linking an existing user keeps that user's role.
                role: 'USER',
              }
            },
          }),
        ]
      : []),
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
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== 'google') return true
      return googleEmailVerified(profile)
    },
    async session({ session, token }) {
      try {
        if (token && session.user) {
          session.user.id = token.id as string
          session.user.role = (token.role as string) || 'USER'
          // Map token data to session user
          if (token.email) {
            session.user.email = token.email as string
          }
          if (token.name) {
            session.user.name = token.name as string
          }
          if (token.image) {
            session.user.image = token.image as string
          }
        }
        return session
      } catch (error) {
        console.error('Session callback error:', error)
        return session
      }
    },
    async jwt({ token, user, account }) {
      try {
        // Initial sign in - user object is available
        if (user) {
          token.id = user.id
          token.email = user.email || null
          token.name = user.name || null
          token.image = user.image || null
          // Fetch role from database for all users
          try {
            const dbUser = await db.user.findUnique({
              where: { id: user.id },
              select: { role: true },
            })
            token.role = dbUser?.role || 'USER'
          } catch (error) {
            console.error('Error fetching user role:', error)
            token.role = 'USER'
          }
        }
        return token
      } catch (error) {
        console.error('JWT callback error:', error)
        return token
      }
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== 'google' || !user?.id || !googleEmailVerified(profile)) return
      const existing = await db.user.findUnique({
        where: { id: user.id },
        select: { image: true, name: true, emailVerified: true },
      })
      if (!existing) return
      const data: { image?: string; name?: string; emailVerified?: Date } = {}
      if (!existing.image && user.image) data.image = user.image
      if (!existing.name && user.name) data.name = user.name
      if (!existing.emailVerified) data.emailVerified = new Date()
      if (!Object.keys(data).length) return
      await db.user.update({ where: { id: user.id }, data })
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

export const getAuth = async () => {
  const { getServerSession } = await import('next-auth')
  return getServerSession(authOptions)
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

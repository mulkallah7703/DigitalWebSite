import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isAccountRoute = req.nextUrl.pathname.startsWith('/account')

    // Check admin access
    if (isAdminRoute) {
      if (!token || (token.role !== 'ADMIN' && token.role !== 'SUPER_ADMIN')) {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    // Check account access
    if (isAccountRoute && !token) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
        const isAccountRoute = req.nextUrl.pathname.startsWith('/account')
        const isCheckoutRoute = req.nextUrl.pathname.startsWith('/checkout')

        // Allow public routes
        if (!isAdminRoute && !isAccountRoute && !isCheckoutRoute) {
          return true
        }

        // Require auth for protected routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/checkout/:path*'],
}

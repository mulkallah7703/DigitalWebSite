import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SessionProvider } from '@/components/providers/session-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { Toaster } from '@/components/ui/toaster'
import { CartDrawer } from '@/components/layout/cart-drawer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nexus-digital-store.vercel.app'
// Default store name (English) - individual pages can override with generateMetadata
const defaultStoreName = 'Alsadi Digital Store'

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: `${defaultStoreName} - Premium Digital Products`,
    template: `%s | ${defaultStoreName}`,
  },
  description:
    'Discover premium digital products powered by AI. Software, templates, courses, and more. Fast delivery, secure downloads.',
  keywords: [
    'digital products',
    'software',
    'templates',
    'courses',
    'ebooks',
    'digital downloads',
    'AI powered',
  ],
  authors: [{ name: defaultStoreName }],
  creator: defaultStoreName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: appUrl,
    siteName: defaultStoreName,
    title: `${defaultStoreName} - Premium Digital Products`,
    description: 'Discover premium digital products powered by AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: defaultStoreName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${defaultStoreName} - Premium Digital Products`,
    description: 'Discover premium digital products powered by AI.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <QueryProvider>
            <LanguageProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <CartDrawer />
                <Toaster />
              </ThemeProvider>
            </LanguageProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

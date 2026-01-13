import type { Metadata } from 'next'

/**
 * Get store name based on language
 * This is a server-side helper for metadata generation
 * For client components, use useLanguage() hook instead
 */
export async function getStoreName(language: 'en' | 'ar' = 'en'): Promise<string> {
  const translations: Record<'en' | 'ar', string> = {
    en: 'Alsadi Digital Store',
    ar: 'متجر السعدي الرقمي',
  }
  return translations[language] || translations.en
}

/**
 * Generate base metadata with multilingual store name
 * Use this in generateMetadata functions for pages
 */
export async function generateBaseMetadata(language: 'en' | 'ar' = 'en'): Promise<Metadata> {
  const storeName = await getStoreName(language)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nexus-digital-store.vercel.app'

  return {
    metadataBase: new URL(appUrl),
    title: {
      default: `${storeName} - Premium Digital Products`,
      template: `%s | ${storeName}`,
    },
    description: 'Discover premium digital products powered by AI. Software, templates, courses, and more. Fast delivery, secure downloads.',
    authors: [{ name: storeName }],
    creator: storeName,
    openGraph: {
      type: 'website',
      locale: language === 'ar' ? 'ar_SA' : 'en_US',
      url: appUrl,
      siteName: storeName,
      title: `${storeName} - Premium Digital Products`,
      description: 'Discover premium digital products powered by AI.',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: storeName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${storeName} - Premium Digital Products`,
      description: 'Discover premium digital products powered by AI.',
      images: ['/og-image.png'],
    },
  }
}

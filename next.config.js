/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    unoptimized: true, // Keep optimization enabled for allowed domains
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Compression
  compress: true,

  // Production optimizations
  poweredByHeader: false,

  // Experimental features for performance
  experimental: {
    serverComponentsExternalPackages: ['@vercel/blob', '@aws-sdk/client-s3', 'sharp'],
    serverActions: {
      bodySizeLimit: '10mb',
    },
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'recharts',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      'date-fns',
    ],
  },

  // Permanent redirects for renamed or removed public URLs. Trailing slashes are
  // already normalized to the slashless form before these rules run.
  async redirects() {
    return [
      // Blog slugs renamed in the practical-prompts rewrite
      { source: '/blog/master-ai-tools-by-building', destination: '/blog/learn-claude-step-by-step', permanent: true },
      { source: '/blog/turn-free-certificates-into-proof', destination: '/blog/meta-courses-and-certificates-guide', permanent: true },
      { source: '/blog/linkedin-profile-checklist-for-tech-students', destination: '/blog/linkedin-profile-review-with-claude', permanent: true },
      { source: '/blog/ai-learning-path-for-developers', destination: '/blog/anthropic-academy-free-courses', permanent: true },
      { source: '/blog/your-first-week-with-ai', destination: '/blog/two-hours-to-learn-claude', permanent: true },
      // First blog slugs, before the original-content rewrite
      { source: '/blog/anthropic-free-ai-courses', destination: '/blog/anthropic-academy-free-courses', permanent: true },
      { source: '/blog/cisco-data-analytics-essentials', destination: '/blog/data-analytics-roadmap-for-beginners', permanent: true },
      { source: '/blog/claude-for-academic-research', destination: '/blog/ai-research-assistant-workflow', permanent: true },
      { source: '/blog/claude-for-excel-word-powerpoint', destination: '/blog/ai-for-everyday-office-work', permanent: true },
      { source: '/blog/learn-claude-the-right-way', destination: '/blog/learn-claude-step-by-step', permanent: true },
      { source: '/blog/make-ai-writing-sound-human', destination: '/blog/write-in-your-own-voice-with-ai', permanent: true },
      { source: '/blog/meta-free-courses-with-certificates', destination: '/blog/meta-courses-and-certificates-guide', permanent: true },
      { source: '/blog/notebooklm-personal-learning-system', destination: '/blog/active-study-with-notebooklm', permanent: true },
      { source: '/blog/two-hours-learning-claude', destination: '/blog/two-hours-to-learn-claude', permanent: true },
      // Static HTML paths from the previous site
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/blog/index.html', destination: '/blog', permanent: true },
      { source: '/about/index.html', destination: '/about', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/refund-policy.html', destination: '/refund-policy', permanent: true },
      { source: '/products/index.html', destination: '/products', permanent: true },
      { source: '/blog/ai-profit.html', destination: '/blog', permanent: true },
      { source: '/blog/digital-brand.html', destination: '/blog', permanent: true },
      { source: '/blog/ecommerce-client-tips.html', destination: '/blog', permanent: true },
      { source: '/blog/marketing-gulf.html', destination: '/blog', permanent: true },
      { source: '/blog/productivity-tools-designers.html', destination: '/blog', permanent: true },
      { source: '/blog/sample-article.html', destination: '/blog', permanent: true },
      { source: '/blog/template.html', destination: '/blog', permanent: true },
      // Footer and common aliases
      { source: '/deals', destination: '/store', permanent: true },
      { source: '/careers', destination: '/about', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/services', destination: '/about', permanent: true },
      { source: '/login', destination: '/auth/login', permanent: true },
      { source: '/register', destination: '/auth/register', permanent: true },
      { source: '/signup', destination: '/auth/register', permanent: true },
      { source: '/faq', destination: '/faqs', permanent: true },
      { source: '/cookie-policy', destination: '/cookies', permanent: true },
      { source: '/refunds', destination: '/refund-policy', permanent: true },
      { source: '/refund', destination: '/refund-policy', permanent: true },
      // Retired product slug (no current equivalent)
      { source: '/products/the-complete-guide-to-working-on-jamroad-platform', destination: '/store', permanent: true },
    ]
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

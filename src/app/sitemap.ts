import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { siteUrl } from '@/lib/site-url'
import { BLOG_POSTS } from '@/content/blog'

// Rebuilt at most once an hour so new products show up without a redeploy.
export const revalidate = 3600

const STATIC_PATHS = ['/', '/portfolio', '/store', '/blog', '/about', '/contact', '/products', '/categories', '/terms', '/privacy']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl()
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === '/' ? `${base}/` : `${base}${path}`,
  }))
  for (const post of BLOG_POSTS) {
    entries.push({ url: `${base}/blog/${post.slug}`, lastModified: new Date(`${post.date}T00:00:00Z`) })
  }

  if (!process.env.DATABASE_URL) return entries

  try {
    const [categories, products] = await Promise.all([
      db.category.findMany({
        where: { visible: true },
        select: { slug: true, updatedAt: true },
        orderBy: { name: 'asc' },
      }),
      db.product.findMany({
        where: { status: 'PUBLISHED', visibility: 'PUBLIC' },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      }),
    ])
    for (const category of categories) {
      entries.push({ url: `${base}/categories/${encodeURIComponent(category.slug)}`, lastModified: category.updatedAt })
    }
    for (const product of products) {
      entries.push({ url: `${base}/products/${encodeURIComponent(product.slug)}`, lastModified: product.updatedAt })
    }
  } catch (error) {
    console.error('[sitemap] database unavailable, returning static entries only', error)
  }

  return entries
}

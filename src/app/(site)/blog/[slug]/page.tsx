import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogArticle } from '@/components/blog/blog-pages'
import { BLOG_AUTHOR, BLOG_POSTS, blogOgImage, getBlogPost } from '@/content/blog'
import { siteUrl } from '@/lib/site-url'

export const dynamicParams = false

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) notFound()
  const url = `/blog/${post.slug}`
  return {
    title: { absolute: `${post.ar.title} | Alsadi` },
    description: post.ar.excerpt,
    keywords: post.tags,
    authors: [{ name: `${BLOG_AUTHOR.name.ar} (${BLOG_AUTHOR.name.en})`, url: BLOG_AUTHOR.url }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.ar.title,
      description: post.ar.excerpt,
      publishedTime: post.date,
      authors: [BLOG_AUTHOR.name.en],
      tags: post.tags,
      images: [{ url: blogOgImage(post), width: 1200, height: 630, alt: post.coverAlt.ar }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.ar.title,
      description: post.ar.excerpt,
      images: [blogOgImage(post)],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()
  const base = siteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.ar.title,
    alternativeHeadline: post.en.title,
    description: post.ar.excerpt,
    image: [`${base}${post.cover}`, `${base}${blogOgImage(post)}`],
    datePublished: post.date,
    inLanguage: ['ar', 'en'],
    mainEntityOfPage: `${base}/blog/${post.slug}`,
    publisher: { '@type': 'Organization', name: 'Alsadi', url: base },
    author: { '@type': 'Person', name: BLOG_AUTHOR.name.en, alternateName: BLOG_AUTHOR.name.ar, url: `${base}${BLOG_AUTHOR.url}`, image: `${base}${BLOG_AUTHOR.photo}` },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogArticle post={post} />
    </>
  )
}

import type { Metadata } from 'next'
import { BlogIndex } from '@/components/blog/blog-pages'

export const metadata: Metadata = {
  title: { absolute: 'المدونة | Blog — Alsadi' },
  description: 'مدونة ملك الله السعدي على منصة السعدي: مقالات عربية عملية عن أدوات الذكاء الاصطناعي مثل Claude وNotebookLM، والدورات المجانية، والإنتاجية.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'المدونة | Alsadi Blog',
    description: 'Practical articles about AI tools, free courses and productivity.',
    url: '/blog',
    images: [{ url: '/blog/og/learn-claude-step-by-step.jpg?v=5', width: 1200, height: 630 }],
  },
}

export default function BlogPage() {
  return <BlogIndex />
}

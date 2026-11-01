'use client'

import Link from 'next/link'
import { CalendarDays, Clock } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { BLOG_AUTHOR, readingMinutes, type BlogPost } from '@/content/blog'

export function formatBlogDate(date: string, language: 'ar' | 'en') {
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

export function readingLabel(minutes: number, language: 'ar' | 'en') {
  if (language === 'en') return `${minutes} min read`
  return `${minutes.toLocaleString('ar-EG')} دقائق قراءة`
}

export function BlogCard({ post }: { post: BlogPost }) {
  const { language } = useLanguage()
  const locale = post[language]
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-purple-500/10">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-[#0b0b14]" tabIndex={-1} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.cover}
          alt={post.coverAlt[language]}
          loading="lazy"
          width={1080}
          height={1350}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-2 text-lg font-bold leading-snug">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary">
            {locale.title}
          </Link>
        </h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{locale.excerpt}</p>
        <div className="mb-3 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BLOG_AUTHOR.photo} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover ring-2 ring-primary/30" />
          <span className="text-xs font-medium">{BLOG_AUTHOR.name[language]}</span>
        </div>
        <div className="flex items-center gap-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <time dateTime={post.date}>{formatBlogDate(post.date, language)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {readingLabel(readingMinutes(post, language), language)}
          </span>
        </div>
      </div>
    </article>
  )
}

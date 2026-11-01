'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'
import { BlogCard, formatBlogDate, readingLabel } from '@/components/blog/blog-card'
import { CopyPrompt } from '@/components/blog/copy-prompt'
import { BLOG_AUTHOR, BLOG_POSTS, readingMinutes, type BlogPost } from '@/content/blog'

export function BlogIndex() {
  const { language } = useLanguage()
  const c =
    language === 'ar'
      ? {
          title: 'المدونة',
          lead: 'أدلة عملية ببرومبتات جاهزة للنسخ عن أدوات الذكاء الاصطناعي، والدورات المجانية، والإنتاجية في الدراسة والعمل.',
        }
      : {
          title: 'Blog',
          lead: 'Practical guides with ready-to-copy prompts on AI tools, free courses, and productivity at study and work.',
        }
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="pointer-events-none absolute -top-24 start-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 end-10 -z-10 h-60 w-60 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl">
            <span className="gradient-text">{c.title}</span>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{c.lead}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}

export function BlogArticle({ post }: { post: BlogPost }) {
  const { language } = useLanguage()
  const locale = post[language]
  const ar = language === 'ar'
  const Back = ar ? ArrowRight : ArrowLeft
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)
  const promptOffsets = locale.sections.reduce<number[]>((acc, _section, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + (locale.sections[i - 1].prompts?.length || 0))
    return acc
  }, [])

  return (
    <article dir={ar ? 'rtl' : 'ltr'} lang={language}>
      <header className="relative overflow-hidden border-b border-border/50">
        <div className="pointer-events-none absolute -top-24 start-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
            <Back className="h-4 w-4" />
            {ar ? 'العودة إلى المدونة' : 'Back to the blog'}
          </Link>
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">{locale.title}</h1>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{locale.excerpt}</p>
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <Link href={BLOG_AUTHOR.url} className="inline-flex items-center gap-2 font-medium text-foreground hover:text-primary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BLOG_AUTHOR.photo} alt={BLOG_AUTHOR.name[language]} width={36} height={36} className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/30" />
              {BLOG_AUTHOR.name[language]}
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={post.date}>{formatBlogDate(post.date, language)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readingLabel(readingMinutes(post, language), language)}
            </span>
          </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.coverAlt[language]}
            width={1080}
            height={1350}
            className="mx-auto aspect-[4/5] w-full max-w-sm rounded-2xl border border-border/60 bg-[#0b0b14] object-contain shadow-xl shadow-purple-500/15"
          />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12">
        {locale.hook && (
          <div className="mb-10 flex gap-3 rounded-2xl border border-primary/25 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-5">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="mb-1 text-sm font-bold text-primary">{ar ? 'ماذا ستحصل عليه' : 'What you will get'}</p>
              <p className="leading-relaxed text-foreground/90">{locale.hook}</p>
            </div>
          </div>
        )}
        <div className={ar ? 'text-[1.125rem] leading-[2.1]' : 'text-[1.0625rem] leading-8'}>
          {locale.sections.map((section, i) => (
            <section key={i} className="mb-10">
              {section.heading && (
                <h2 className="mb-4 mt-2 border-s-4 border-purple-500 ps-3 text-2xl font-bold leading-snug text-foreground">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mb-5 text-foreground/85">
                  {p}
                </p>
              ))}
              {section.list && section.list.length > 0 && (
                <ul className="mb-5 space-y-3 ps-1">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex gap-3 text-foreground/85">
                      <span className="mt-[0.85em] h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.prompts?.map((prompt, j) => (
                <CopyPrompt key={j} prompt={prompt} index={promptOffsets[i] + j + 1} language={language} />
              ))}
            </section>
          ))}
        </div>

        <aside className="flex flex-col items-center gap-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 text-center sm:flex-row sm:text-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BLOG_AUTHOR.photo} alt={BLOG_AUTHOR.name[language]} width={80} height={80} className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-primary/30" />
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">{ar ? 'كاتب المقال' : 'Written by'}</p>
            <h2 className="mb-1 text-lg font-bold">{BLOG_AUTHOR.name[language]}</h2>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{BLOG_AUTHOR.role[language]}</p>
            <Link href={BLOG_AUTHOR.url} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {ar ? 'تعرّف عليّ أكثر في البورتفوليو' : 'More about me in my portfolio'}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border/50 bg-secondary/20 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold">{ar ? 'مقالات أخرى' : 'More articles'}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}

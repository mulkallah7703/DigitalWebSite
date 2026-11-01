import type { BlogLocale, BlogPost } from './types'
import { post as masterAiTools } from './posts/master-ai-tools'
import { post as researchWorkflow } from './posts/ai-research-workflow'
import { post as dataRoadmap } from './posts/data-analytics-roadmap'
import { post as ownVoice } from './posts/write-in-your-voice'
import { post as certificates } from './posts/certificates-to-portfolio'
import { post as linkedin } from './posts/linkedin-checklist'
import { post as officeWork } from './posts/ai-office-work'
import { post as notebookLm } from './posts/notebooklm-active-study'
import { post as developerPath } from './posts/ai-path-developers'
import { post as firstWeek } from './posts/first-week-with-ai'

export type { BlogPost, BlogLocale, BlogSection } from './types'

/** Every article is written by the site founder. */
export const BLOG_AUTHOR = {
  name: { ar: 'ملك الله السعدي', en: 'Mulk Allah Al-Sadi' },
  role: {
    ar: 'طالب هندسة برمجيات ومطوّر full-stack، مهتم بتقنيات الذكاء الاصطناعي في الرعاية الصحية والتعليم',
    en: 'Software engineering student and full-stack developer focused on AI for healthcare and education',
  },
  photo: '/blog/author.webp',
  url: '/portfolio',
}

/** Newest first. */
export const BLOG_POSTS: BlogPost[] = [
  masterAiTools,
  researchWorkflow,
  dataRoadmap,
  ownVoice,
  certificates,
  linkedin,
  officeWork,
  notebookLm,
  developerPath,
  firstWeek,
].sort((a, b) => (a.date < b.date ? 1 : -1))

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug) || null
}

function words(locale: BlogLocale) {
  const text = [locale.title, ...locale.sections.flatMap((s) => [s.heading || '', ...s.paragraphs, ...(s.list || [])])].join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

/** Reading time in minutes (Arabic ~180 wpm, English ~220 wpm). */
export function readingMinutes(post: BlogPost, language: 'ar' | 'en') {
  return Math.max(1, Math.round(words(post[language]) / (language === 'ar' ? 180 : 220)))
}

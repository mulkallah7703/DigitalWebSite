import type { BlogLocale, BlogPost } from './types'
import { post as learnClaude } from './posts/learn-claude'
import { post as researchWorkflow } from './posts/ai-research'
import { post as dataRoadmap } from './posts/data-analytics'
import { post as ownVoice } from './posts/own-voice'
import { post as metaCourses } from './posts/meta-courses'
import { post as linkedin } from './posts/linkedin-claude'
import { post as officeWork } from './posts/office-claude'
import { post as notebookLm } from './posts/notebooklm'
import { post as anthropicCourses } from './posts/anthropic-courses'
import { post as twoHours } from './posts/two-hours-claude'
import { post as agentsRoadmap } from './posts/ai-agents-roadmap'

export type { BlogPost, BlogLocale, BlogSection, BlogPrompt } from './types'

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
  learnClaude,
  researchWorkflow,
  dataRoadmap,
  ownVoice,
  metaCourses,
  linkedin,
  officeWork,
  notebookLm,
  anthropicCourses,
  twoHours,
  agentsRoadmap,
].sort((a, b) => (a.date < b.date ? 1 : -1))

/** 1200x630 social-share variant of the cover (portrait image centred on a blurred backdrop). */
export function blogOgImage(post: BlogPost) {
  return `/blog/og/${post.slug}.jpg?v=4`
}

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug) || null
}

function words(locale: BlogLocale) {
  const text = [
    locale.title,
    locale.hook,
    ...locale.sections.flatMap((s) => [
      s.heading || '',
      ...s.paragraphs,
      ...(s.list || []),
      ...(s.prompts || []).flatMap((p) => [p.title, p.when, p.expect, p.text]),
    ]),
  ].join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

/** Reading time in minutes (Arabic ~180 wpm, English ~220 wpm). */
export function readingMinutes(post: BlogPost, language: 'ar' | 'en') {
  return Math.max(1, Math.round(words(post[language]) / (language === 'ar' ? 180 : 220)))
}

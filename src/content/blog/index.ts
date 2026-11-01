import type { BlogLocale, BlogPost } from './types'
import { post as learnClaude } from './posts/learn-claude-roadmap'
import { post as claudeResearch } from './posts/claude-for-research'
import { post as ciscoData } from './posts/cisco-data-analytics'
import { post as humanWriting } from './posts/human-sounding-ai-writing'
import { post as metaCourses } from './posts/meta-free-courses'
import { post as linkedinProfile } from './posts/linkedin-profile-with-claude'
import { post as claudeOffice } from './posts/claude-excel-word-powerpoint'
import { post as notebookLm } from './posts/notebooklm-learning-system'
import { post as anthropicCourses } from './posts/anthropic-free-courses'
import { post as twoHours } from './posts/two-hours-with-claude'

export type { BlogPost, BlogLocale, BlogSection } from './types'

/** Newest first. */
export const BLOG_POSTS: BlogPost[] = [
  learnClaude,
  claudeResearch,
  ciscoData,
  humanWriting,
  metaCourses,
  linkedinProfile,
  claudeOffice,
  notebookLm,
  anthropicCourses,
  twoHours,
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

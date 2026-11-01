/** A ready-to-copy prompt with guidance on when to use it and what to expect. */
export type BlogPrompt = {
  title: string
  when: string
  expect: string
  text: string
}

export type BlogSection = {
  heading?: string
  paragraphs: string[]
  list?: string[]
  prompts?: BlogPrompt[]
}

export type BlogLocale = {
  title: string
  excerpt: string
  /** One or two sentences stating the concrete result the reader gets. */
  hook: string
  sections: BlogSection[]
}

export type BlogPost = {
  slug: string
  /** ISO publish date. */
  date: string
  /** Portrait 4:5 cover (1080x1350 webp) shown on cards and the article page. */
  cover: string
  coverAlt: { ar: string; en: string }
  tags: string[]
  ar: BlogLocale
  en: BlogLocale
}

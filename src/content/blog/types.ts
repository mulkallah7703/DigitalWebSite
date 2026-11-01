export type BlogSection = {
  heading?: string
  paragraphs: string[]
  list?: string[]
}

export type BlogLocale = {
  title: string
  excerpt: string
  sections: BlogSection[]
}

export type BlogPost = {
  slug: string
  /** ISO publish date. */
  date: string
  cover: string
  /** Two short lines baked into the generated cover image. */
  coverLines: [string, string]
  coverAlt: { ar: string; en: string }
  tags: string[]
  ar: BlogLocale
  en: BlogLocale
}

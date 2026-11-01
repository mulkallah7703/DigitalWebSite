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
  /** ISO date of the original LinkedIn post the article is based on. */
  date: string
  cover: string
  coverAlt: { ar: string; en: string }
  tags: string[]
  source: { url: string; author: string; authorAr: string }
  ar: BlogLocale
  en: BlogLocale
}

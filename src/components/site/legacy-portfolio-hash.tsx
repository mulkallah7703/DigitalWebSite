'use client'

import { useEffect } from 'react'

/** Section ids the portfolio used when it lived at "/". */
const PORTFOLIO_HASHES = new Set([
  'hero',
  'about',
  'skills',
  'experience',
  'innovation',
  'projects',
  'education',
  'certifications',
  'research',
  'languages',
  'contact',
])

/** Old links like "/#projects" now point to the portfolio at "/portfolio#projects". */
export function LegacyPortfolioHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ''))
    if (id && PORTFOLIO_HASHES.has(id)) {
      window.location.replace(`/portfolio#${encodeURIComponent(id)}`)
    }
  }, [])
  return null
}

/** Canonical public origin of the site (always the https www host). */
export const CANONICAL_SITE_URL = 'https://www.alsadidigital.com'

export function siteUrl() {
  const fromEnv = (process.env.NEXT_PUBLIC_APP_URL || '').trim().replace(/\/+$/, '')
  return fromEnv === CANONICAL_SITE_URL ? fromEnv : CANONICAL_SITE_URL
}

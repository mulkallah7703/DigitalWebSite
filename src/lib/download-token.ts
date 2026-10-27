import { createHmac, timingSafeEqual } from 'crypto'

/** Signed, expiring token for one file of one completed order. */
export type DownloadClaim = { o: string; p: string; f: string; e: number }

export const DOWNLOAD_LINK_TTL_SECONDS = 7 * 24 * 60 * 60

function secret() {
  const value = process.env.DOWNLOAD_TOKEN_SECRET || process.env.NEXTAUTH_SECRET
  if (!value) throw new Error('DOWNLOAD_TOKEN_SECRET or NEXTAUTH_SECRET is required for download links')
  return value
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function createDownloadToken(claim: Omit<DownloadClaim, 'e'>, ttlSeconds = DOWNLOAD_LINK_TTL_SECONDS) {
  const payload = Buffer.from(
    JSON.stringify({ ...claim, e: Math.floor(Date.now() / 1000) + ttlSeconds }),
  ).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifyDownloadToken(token: string): DownloadClaim | null {
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  let expected: string
  try {
    expected = sign(payload)
  } catch {
    return null
  }
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    const claim = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as DownloadClaim
    if (!claim.o || !claim.p || !claim.f || typeof claim.e !== 'number') return null
    if (claim.e < Math.floor(Date.now() / 1000)) return null
    return claim
  } catch {
    return null
  }
}

export function isGoogleAuthEnabled() {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim()
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()
  return Boolean(clientId && clientSecret)
}

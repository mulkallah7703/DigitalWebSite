import type { Metadata } from 'next'
import { CookiePolicyContent } from '@/components/store/policy-pages'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How the Alsadi website uses cookies and similar technologies.',
}

export default function Page() {
  return <CookiePolicyContent />
}

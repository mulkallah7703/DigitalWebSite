import type { Metadata } from 'next'
import { HelpContent } from '@/components/store/policy-pages'

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Help with your Alsadi store account, purchases, and digital downloads.',
}

export default function Page() {
  return <HelpContent />
}

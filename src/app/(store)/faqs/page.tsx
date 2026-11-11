import type { Metadata } from 'next'
import { FaqsContent } from '@/components/store/policy-pages'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about accounts, purchases, and downloads in the Alsadi store.',
}

export default function Page() {
  return <FaqsContent />
}

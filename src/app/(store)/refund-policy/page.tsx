import type { Metadata } from 'next'
import { RefundPolicyContent } from '@/components/store/policy-pages'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund policy for digital products sold in the Alsadi store.',
}

export default function Page() {
  return <RefundPolicyContent />
}

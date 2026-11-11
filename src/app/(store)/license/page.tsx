import type { Metadata } from 'next'
import { LicenseContent } from '@/components/store/policy-pages'

export const metadata: Metadata = {
  title: 'License',
  description: 'License terms for digital products purchased from the Alsadi store.',
}

export default function Page() {
  return <LicenseContent />
}

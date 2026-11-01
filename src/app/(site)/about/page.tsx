import type { Metadata } from 'next'
import { AboutContent } from '@/components/site/info-pages'

export const metadata: Metadata = {
  title: { absolute: 'من نحن | About — Alsadi' },
  description: 'تعرّف على منصة السعدي ومؤسسها ملك الله السعدي: متجر رقمي، وخدمات برمجية، ومدونة عربية عن الذكاء الاصطناعي.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return <AboutContent />
}

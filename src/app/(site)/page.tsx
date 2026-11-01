import type { Metadata } from 'next'
import { CompanyHome } from '@/components/site/company-home'

export const metadata: Metadata = {
  title: { absolute: 'Alsadi | منصة السعدي' },
  description:
    'منصة السعدي: متجر للمنتجات والدورات الرقمية، وخدمات برمجية وتقنية، ومدونة عربية عن الذكاء الاصطناعي والإنتاجية، وبورتفوليو المؤسس ملك الله السعدي.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Alsadi | منصة السعدي',
    description: 'Digital products and courses, software services, an AI & productivity blog, and the founder’s portfolio.',
    url: '/',
  },
}

export default function HomePage() {
  return <CompanyHome />
}

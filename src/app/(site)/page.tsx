import type { Metadata } from 'next'
import { CompanyHome } from '@/components/site/company-home'

export const metadata: Metadata = {
  title: { absolute: 'Alsadi Digital | منصة السعدي الرقمية' },
  description:
    'منصة السعدي الرقمية: متجر للمنتجات والدورات الرقمية، وخدمات برمجية وتقنية، ومدونة عربية عن الذكاء الاصطناعي والإنتاجية، وبورتفوليو المؤسس ملك الله السعدي.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Alsadi Digital | منصة السعدي الرقمية',
    description: 'Digital products and courses, software services, an AI & productivity blog, and the founder’s portfolio.',
    url: '/',
  },
}

export default function HomePage() {
  return <CompanyHome />
}

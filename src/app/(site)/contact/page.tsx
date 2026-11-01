import type { Metadata } from 'next'
import { ContactContent } from '@/components/site/info-pages'

export const metadata: Metadata = {
  title: { absolute: 'تواصل معنا | Contact — Alsadi' },
  description: 'تواصل مع منصة السعدي عبر البريد الإلكتروني mulkallah7@gmail.com بخصوص المنتجات أو الخدمات البرمجية أو المدونة.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <ContactContent />
}

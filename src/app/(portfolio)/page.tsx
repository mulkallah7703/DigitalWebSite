import type { Metadata } from 'next'
import { PortfolioPage } from '@/components/portfolio/portfolio-page'

export const metadata: Metadata = {
  title: { absolute: 'ملك الله السعدي — بورتفوليو' },
  description:
    'طالب هندسة برمجيات، ومطوّر full-stack، ومبتكر حائز على جائزة — شغوف ببناء تقنيات ذكاء اصطناعي تخدم الرعاية الصحية والتعليم وتُحدث أثرًا حقيقيًا في حياة الناس.',
}

export default function PortfolioHomePage() {
  return <PortfolioPage />
}

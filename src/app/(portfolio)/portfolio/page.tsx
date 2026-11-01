import type { Metadata } from 'next'
import { PortfolioPage } from '@/components/portfolio/portfolio-page'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const { loadPortfolioViews } = await import('@/lib/portfolio-db')
  const views = await loadPortfolioViews()
  return {
    title: { absolute: `${views.ar.name} — بورتفوليو` },
    description: views.ar.heroLead,
  }
}

export default async function PortfolioHomePage() {
  const { loadPortfolioViews } = await import('@/lib/portfolio-db')
  const contentByLang = await loadPortfolioViews()
  return <PortfolioPage contentByLang={contentByLang} />
}

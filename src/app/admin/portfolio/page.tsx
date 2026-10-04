import type { Metadata } from 'next'
import { PortfolioEditor } from '@/components/admin/portfolio-editor'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Portfolio Management',
  description: 'Edit the public portfolio',
}

export default async function AdminPortfolioPage() {
  const { seedPortfolioIfEmpty, loadPortfolioBundle } = await import('@/lib/portfolio-db')
  try {
    await seedPortfolioIfEmpty()
  } catch (error) {
    console.error('[portfolio] seed', error)
  }
  const bundle = await loadPortfolioBundle()
  return <PortfolioEditor initial={bundle} />
}

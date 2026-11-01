import { SiteNav } from '@/components/site/site-nav'
import { Footer } from '@/components/layout/footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  )
}

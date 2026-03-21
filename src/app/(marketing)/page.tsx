import { CompanyHero } from '@/components/home/company-hero'
import { CompanyAbout } from '@/components/home/company-about'
import { CompanyServices } from '@/components/home/company-services'
import { CompanyProduct } from '@/components/home/company-product'
import { CompanyCTA } from '@/components/home/company-cta'

export default function CompanyLandingPage() {
  return (
    <>
      <CompanyHero />
      <CompanyAbout />
      <CompanyServices />
      <CompanyProduct />
      <CompanyCTA />
    </>
  )
}

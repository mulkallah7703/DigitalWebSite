import { CompanyHero } from '@/components/home/company-hero'
import { CompanyAbout } from '@/components/home/company-about'
import { CompanyServices } from '@/components/home/company-services'
import { CompanyContact } from '@/components/home/company-contact'

export default function CompanyLandingPage() {
  return (
    <>
      <CompanyHero />
      <CompanyAbout />
      <CompanyServices />
      <CompanyContact />
    </>
  )
}

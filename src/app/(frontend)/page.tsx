import { HeroRotator } from '@/components/HeroRotator'
import { safeFind, safeFindGlobal } from '@/lib/safeFetch'
import { demoPortfolio, demoSiteSettings } from '@/lib/demoData'
import type { PortfolioCompany, SiteSettingsDoc } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const settings =
    (await safeFindGlobal<SiteSettingsDoc>('site-settings')) ?? demoSiteSettings

  const { docs: liveCompanies } = await safeFind<PortfolioCompany>({
    collection: 'portfolio-companies',
    sort: 'order',
    limit: 30,
  })

  const companies = liveCompanies.length ? liveCompanies : demoPortfolio
  const featured = companies.filter((c) => c.featured)
  const featuredOrFirst = featured.length ? featured : companies.slice(0, 4)

  return (
    <HeroRotator
      companies={featuredOrFirst}
      headline={settings.heroHeadline}
    />
  )
}

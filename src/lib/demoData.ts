// Used when the database is unreachable (dev without DATABASE_URI or before
// content is seeded). Lets the public site render with realistic placeholders.

import type {
  PortfolioCompany,
  TeamMember,
  SiteSettingsDoc,
  ManifestoDoc,
} from './types'

export const demoSiteSettings: SiteSettingsDoc = {
  siteName: 'Imkon Ventures',
  tagline: 'Funding the founders building what comes next',
  heroEyebrow: 'Imkon Ventures',
  heroHeadline: 'We back founders building the impossible.',
  heroCtaLabel: 'Read the manifesto',
  heroCtaHref: '/manifesto',
  footerTagline: 'Imkon Ventures',
  footerDisclaimer:
    'Past performance is not indicative of future results. Imkon Ventures and the Imkon logo are trademarks of Imkon Capital, LLC.',
  footerLinks: [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Team', href: '/team' },
    { label: 'Manifesto', href: '/manifesto' },
    { label: 'Contact', href: 'mailto:hello@imkon.capital' },
  ],
  email: 'hello@imkon.capital',
  twitter: 'https://twitter.com/imkonvc',
  linkedin: 'https://linkedin.com/company/imkonventures',
}

export const demoPortfolio: PortfolioCompany[] = [
  {
    id: 'demo-1',
    name: 'Aralash',
    slug: 'aralash',
    tagline: 'Autonomous compliance for fintechs.',
    ctaLabel: 'Aralash',
    description:
      'Aralash builds autonomous compliance agents for fintechs operating across emerging markets.',
    sector: 'ai',
    stage: 'seed',
    year: 2024,
    website: 'https://example.com',
    featured: true,
    order: 1,
  },
  {
    id: 'demo-2',
    name: 'Orbita',
    slug: 'orbita',
    tagline: 'Last-mile logistics, reimagined for Central Asia.',
    ctaLabel: 'Orbita',
    description:
      'Orbita coordinates same-day fulfillment across Tashkent, Almaty, and Bishkek with a unified driver network.',
    sector: 'logistics',
    stage: 'series-a',
    year: 2023,
    website: 'https://example.com',
    featured: true,
    order: 2,
  },
  {
    id: 'demo-3',
    name: 'Quvvat',
    slug: 'quvvat',
    tagline: 'Grid-scale storage, finally affordable.',
    ctaLabel: 'See how',
    description:
      'Quvvat is deploying utility-scale battery storage to stabilize renewables in the Caspian region.',
    sector: 'climate',
    stage: 'series-a',
    year: 2024,
    website: 'https://example.com',
    featured: true,
    order: 3,
  },
  {
    id: 'demo-4',
    name: 'Niyat',
    slug: 'niyat',
    tagline: 'Home financing for the next billion.',
    ctaLabel: 'Niyat',
    description:
      'Niyat offers digital-first home financing for the rising middle class.',
    sector: 'fintech',
    stage: 'seed',
    year: 2024,
    website: 'https://example.com',
    featured: true,
    order: 4,
  },
  {
    id: 'demo-5',
    name: 'Chiroq',
    slug: 'chiroq',
    tagline: 'Photonic compute substrate',
    description:
      'Chiroq is building room-temperature photonic chips for inference workloads.',
    sector: 'ai',
    stage: 'pre-seed',
    year: 2025,
    website: 'https://example.com',
    order: 5,
  },
  {
    id: 'demo-6',
    name: 'Saroy',
    slug: 'saroy',
    tagline: 'Vertical SaaS for hospitality',
    description:
      'Saroy is the operating system for boutique hotels in emerging tourism markets.',
    sector: 'saas',
    stage: 'seed',
    year: 2023,
    website: 'https://example.com',
    order: 6,
  },
  {
    id: 'demo-7',
    name: 'Kema',
    slug: 'kema',
    tagline: 'Cross-border payments rail',
    description:
      'Kema settles invoices in stablecoins for SMBs across the Silk Road corridor.',
    sector: 'crypto',
    stage: 'seed',
    year: 2024,
    website: 'https://example.com',
    order: 7,
  },
  {
    id: 'demo-8',
    name: 'Davo',
    slug: 'davo',
    tagline: 'Telehealth for chronic conditions',
    description:
      'Davo is a vertically integrated clinic for diabetes management.',
    sector: 'healthcare',
    stage: 'series-a',
    year: 2022,
    website: 'https://example.com',
    order: 8,
  },
  {
    id: 'demo-9',
    name: 'Bozor',
    slug: 'bozor',
    tagline: 'B2B marketplace for raw materials',
    description:
      'Bozor connects mills, processors, and buyers across Central Asia’s commodity chains.',
    sector: 'marketplace',
    stage: 'seed',
    year: 2023,
    website: 'https://example.com',
    order: 9,
  },
  {
    id: 'demo-10',
    name: 'Toshkent Aero',
    slug: 'toshkent-aero',
    tagline: 'Long-endurance autonomous aircraft',
    description:
      'Toshkent Aero builds solar-electric drones for surveying and infrastructure inspection.',
    sector: 'defense',
    stage: 'pre-seed',
    year: 2025,
    website: 'https://example.com',
    order: 10,
  },
  {
    id: 'demo-11',
    name: 'Yangi',
    slug: 'yangi',
    tagline: 'Consumer banking for Gen Z',
    description:
      'Yangi is the first mobile-only bank purpose-built for Uzbek and Kazakh teens.',
    sector: 'fintech',
    stage: 'series-b',
    year: 2021,
    website: 'https://example.com',
    order: 11,
  },
  {
    id: 'demo-12',
    name: 'Ipak',
    slug: 'ipak',
    tagline: 'Synthetic biology for textiles',
    description:
      'Ipak engineers next-generation silk proteins for performance apparel.',
    sector: 'climate',
    stage: 'pre-seed',
    year: 2025,
    website: 'https://example.com',
    order: 12,
  },
]

export const demoTeam: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Muhammad Imkon',
    slug: 'muhammad-imkon',
    title: 'General Partner',
    category: 'partner',
    bio: 'Founder of Imkon Ventures. Previously operator and angel across fintech and AI in Central Asia.',
    links: [
      { label: 'twitter', url: 'https://twitter.com/' },
      { label: 'linkedin', url: 'https://linkedin.com/' },
    ],
    order: 1,
  },
  {
    id: 'team-2',
    name: 'Aziza Karimova',
    slug: 'aziza-karimova',
    title: 'Partner',
    category: 'partner',
    bio: 'Leads investments in fintech and consumer. Former product lead at a regional super-app.',
    order: 2,
  },
  {
    id: 'team-3',
    name: 'Rustam Yusupov',
    slug: 'rustam-yusupov',
    title: 'Operating Partner',
    category: 'operating-partner',
    bio: 'Helps portfolio founders scale go-to-market across CIS markets. Two-time founder.',
    order: 3,
  },
  {
    id: 'team-4',
    name: 'Dilnoza Abdullayeva',
    slug: 'dilnoza-abdullayeva',
    title: 'Principal',
    category: 'team',
    bio: 'Sources and diligences seed-stage opportunities in AI, climate, and deep tech.',
    order: 4,
  },
]

export const demoManifesto: ManifestoDoc = {
  eyebrow: 'Manifesto',
  title: 'What we believe',
  subtitle:
    'Imkon means “opportunity” — the chance to attempt the difficult thing. Our work is to find the founders who will take it.',
  sections: [
    {
      heading: 'The future is built on the edge',
      body: null,
    },
    {
      heading: 'We invest in people, not patterns',
      body: null,
    },
    {
      heading: 'Concentration is conviction',
      body: null,
    },
    {
      heading: 'We bet early, and we stay',
      body: null,
    },
  ],
}

// Hand-rolled types for the public site. We intentionally don't depend on
// payload-types.ts here so the public components compile even before Payload
// has generated its types from a connected database.

export type MediaDoc = {
  id: string | number
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

export type PortfolioCompany = {
  id: string | number
  name: string
  slug: string
  tagline?: string | null
  description?: string | null
  logo?: MediaDoc | string | number | null
  heroImage?: MediaDoc | string | number | null
  heroVideo?: MediaDoc | string | number | null
  ctaLabel?: string | null
  sector?: string | null
  stage?: string | null
  year?: number | null
  website?: string | null
  featured?: boolean | null
  order?: number | null
}

export type TeamMember = {
  id: string | number
  name: string
  slug: string
  title: string
  category: 'partner' | 'operating-partner' | 'venture-partner' | 'team' | 'advisor'
  photo?: MediaDoc | string | number | null
  bio?: string | null
  links?: { label: string; url: string }[] | null
  order?: number | null
}

export type SiteSettingsDoc = {
  siteName?: string
  tagline?: string
  heroEyebrow?: string
  heroHeadline?: string
  heroCtaLabel?: string
  heroCtaHref?: string
  footerTagline?: string
  footerDisclaimer?: string
  footerLinks?: { label: string; href: string }[]
  email?: string
  twitter?: string
  linkedin?: string
}

// Lexical rich-text shape — kept loose because Payload generates concrete
// types separately and we don't want to depend on them here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LexicalRichText = any

export type ManifestoDoc = {
  eyebrow?: string
  title?: string
  subtitle?: string
  body?: LexicalRichText
  sections?: {
    heading: string
    body?: LexicalRichText
  }[]
}

export const SECTOR_LABELS: Record<string, string> = {
  fintech: 'Fintech',
  ai: 'AI / ML',
  saas: 'SaaS',
  marketplace: 'Marketplace',
  climate: 'Climate / Energy',
  healthcare: 'Healthcare',
  defense: 'Defense / Aerospace',
  consumer: 'Consumer',
  crypto: 'Crypto / Web3',
  logistics: 'Logistics',
  other: 'Other',
}

export const STAGE_LABELS: Record<string, string> = {
  'pre-seed': 'Pre-Seed',
  seed: 'Seed',
  'series-a': 'Series A',
  'series-b': 'Series B',
  growth: 'Growth',
  public: 'Public',
  acquired: 'Acquired',
}

export function mediaUrl(media: MediaDoc | string | number | null | undefined): string | null {
  if (!media || typeof media === 'string' || typeof media === 'number') return null
  return media.url ?? null
}

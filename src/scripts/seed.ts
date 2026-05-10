/**
 * Seed routine. Populates the database with demo content.
 *
 * Two ways to run it:
 *   1. (Recommended) HTTP: `curl -X POST http://localhost:3100/api/seed -H "Authorization: Bearer $SEED_TOKEN"`
 *      Requires `SEED_TOKEN` to be set in .env.
 *   2. CLI (requires Node >= 20.18): `npm run seed`
 *      Some Node versions have a tsx + file-type ESM resolution clash; if `npm run seed`
 *      errors with `ERR_PACKAGE_PATH_NOT_EXPORTED`, use the HTTP route instead.
 */

import type { Payload } from 'payload'
import {
  demoPortfolio,
  demoTeam,
  demoSiteSettings,
  demoManifesto,
} from '../lib/demoData'

export type SeedResult = {
  adminCreated: boolean
  adminEmail: string
  companiesCreated: number
  membersCreated: number
}

export async function runSeed(
  payload: Payload,
  opts: {
    adminEmail?: string
    adminPassword?: string
  } = {},
): Promise<SeedResult> {
  const adminEmail = opts.adminEmail || 'admin@imkon.capital'
  const adminPassword = opts.adminPassword || 'changeme-now'

  // 1. Ensure an admin user exists
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })
  let adminCreated = false
  if (existing.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
        name: 'Imkon Admin',
        role: 'admin',
      },
    })
    adminCreated = true
  }

  // 2. Site settings global
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: demoSiteSettings.siteName!,
      tagline: demoSiteSettings.tagline,
      heroEyebrow: demoSiteSettings.heroEyebrow,
      heroHeadline: demoSiteSettings.heroHeadline,
      heroCtaLabel: demoSiteSettings.heroCtaLabel,
      heroCtaHref: demoSiteSettings.heroCtaHref,
      footerTagline: demoSiteSettings.footerTagline,
      footerDisclaimer: demoSiteSettings.footerDisclaimer,
      footerLinks: demoSiteSettings.footerLinks,
      email: demoSiteSettings.email,
      twitter: demoSiteSettings.twitter,
      linkedin: demoSiteSettings.linkedin,
    },
  })

  // 3. Manifesto global
  await payload.updateGlobal({
    slug: 'manifesto',
    data: {
      eyebrow: demoManifesto.eyebrow,
      title: demoManifesto.title!,
      subtitle: demoManifesto.subtitle,
      sections: demoManifesto.sections?.map((s) => ({ heading: s.heading })),
    },
  })

  // 4. Portfolio companies
  let companiesCreated = 0
  for (const c of demoPortfolio) {
    const exists = await payload.find({
      collection: 'portfolio-companies',
      where: { slug: { equals: c.slug } },
      limit: 1,
    })
    if (exists.docs.length === 0) {
      await payload.create({
        collection: 'portfolio-companies',
        data: {
          name: c.name,
          slug: c.slug,
          tagline: c.tagline ?? undefined,
          ctaLabel: c.ctaLabel ?? undefined,
          description: c.description ?? undefined,
          sector: c.sector ?? undefined,
          stage: c.stage ?? undefined,
          year: c.year ?? undefined,
          website: c.website ?? undefined,
          featured: c.featured ?? false,
          order: c.order ?? 0,
        },
      })
      companiesCreated += 1
    }
  }

  // 5. Team members
  let membersCreated = 0
  for (const m of demoTeam) {
    const exists = await payload.find({
      collection: 'team-members',
      where: { slug: { equals: m.slug } },
      limit: 1,
    })
    if (exists.docs.length === 0) {
      await payload.create({
        collection: 'team-members',
        data: {
          name: m.name,
          slug: m.slug,
          title: m.title,
          category: m.category,
          bio: m.bio ?? undefined,
          links: m.links ?? undefined,
          order: m.order ?? 0,
        },
      })
      membersCreated += 1
    }
  }

  return { adminCreated, adminEmail, companiesCreated, membersCreated }
}

// CLI entry — only runs when this file is executed directly via tsx.
async function cliMain() {
  // Lazy import so that this file stays usable as an ESM module from
  // Next.js route handlers without requiring dotenv.
  const { default: dotenv } = await import('dotenv')
  dotenv.config()
  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  const result = await runSeed(payload, {
    adminEmail: process.env.SEED_ADMIN_EMAIL,
    adminPassword: process.env.SEED_ADMIN_PASSWORD,
  })
  console.log(result)
  process.exit(0)
}

const isCli =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  process.argv[1] &&
  process.argv[1].endsWith('seed.ts')

if (isCli) {
  cliMain().catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
}

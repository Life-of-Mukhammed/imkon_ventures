import type { Metadata } from 'next'
import Link from 'next/link'
import { safeFind } from '@/lib/safeFetch'
import { demoPortfolio } from '@/lib/demoData'
import { Reveal } from '@/components/Reveal'
import { mediaUrl, type PortfolioCompany } from '@/lib/types'

export const metadata: Metadata = { title: 'Portfolio' }
export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
  const { docs: live } = await safeFind<PortfolioCompany>({
    collection: 'portfolio-companies',
    sort: 'name',
    limit: 200,
  })

  const companies = (live.length ? live : demoPortfolio)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="bg-black text-white">
      {/* Hero — main */}
      <section className="px-6 pb-12 pt-40 md:px-12 md:pb-16 md:pt-48">
        <div className="mx-auto max-w-[1480px]">
          <div
            className="rise flex items-end justify-between text-[0.7rem] uppercase tracking-[0.28em] text-white/40"
            style={{ animationDelay: '60ms' }}
          >
            <span>Portfolio</span>
            <span>{String(companies.length).padStart(2, '0')} companies</span>
          </div>
        </div>
      </section>

      {/* 4-column grid of projects, directly under main */}
      <section className="border-t border-white/10 px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-[1480px]">
          <ul className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            {companies.map((c, i) => {
              const logo = mediaUrl(c.logo)
              return (
                <li key={c.id} id={c.slug} className="bg-black">
                  <Reveal delay={Math.min((i % 4) * 80, 240)}>
                    <Link
                      href={c.website ?? `#${c.slug}`}
                      target={c.website ? '_blank' : undefined}
                      rel={c.website ? 'noreferrer' : undefined}
                      className={`group relative flex aspect-square p-6 transition-colors hover:bg-white/[0.04] md:p-10 ${
                        logo ? 'items-center justify-center' : 'flex-col items-start justify-end'
                      }`}
                    >
                      {/* arrow indicator top-right */}
                      <span
                        aria-hidden
                        className="absolute right-5 top-5 text-[0.7rem] text-white/20 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white/70 md:right-6 md:top-6"
                      >
                        ↗
                      </span>

                      {logo ? (
                        <>
                          {/* circular frame, lifted toward the top */}
                          <div className="absolute left-1/2 top-[18%] flex aspect-square w-[48%] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] transition-[border-color,background-color,top] duration-500 group-hover:top-[16%] group-hover:border-white/25 group-hover:bg-white/[0.06] md:w-[44%]">

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={logo}
                              alt={c.name}
                              className="max-h-[60%] max-w-[60%] object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                            />
                          </div>
                          {/* large elegant name + year bottom */}
                          <div className="absolute inset-x-5 bottom-5 md:inset-x-6 md:bottom-6">
                            <div className="flex items-end justify-between gap-3">
                              <span className="font-serif font-light tracking-[-0.02em] text-[clamp(1.5rem,3vw,2.5rem)] leading-[0.95] transition-transform duration-500 group-hover:-translate-y-0.5">
                                {c.name}
                              </span>
                              <span className="pb-1 text-[0.65rem] uppercase tracking-[0.28em] text-white/25 transition-colors group-hover:text-white/70">
                                {c.year ?? ''}
                              </span>
                            </div>
                            {c.tagline && (
                              <p className="mt-2 line-clamp-1 text-[0.78rem] font-light text-white/45 md:text-sm">
                                {c.tagline}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        // No logo: elegant bottom-aligned wordmark + tagline + year
                        <>
                          <div className="w-full transition-transform duration-500 group-hover:-translate-y-0.5">
                            <div className="font-serif font-light tracking-[-0.02em] text-[clamp(1.75rem,4vw,3rem)] leading-[0.95]">
                              {c.name}
                            </div>
                            {c.tagline && (
                              <p className="mt-3 line-clamp-2 max-w-[24ch] text-[0.78rem] font-light leading-snug text-white/55 md:text-sm">
                                {c.tagline}
                              </p>
                            )}
                            <div className="mt-4 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.28em] text-white/35 transition-colors group-hover:text-white/70">
                              <span>{c.year ?? '—'}</span>
                              {c.sector && (
                                <>
                                  <span className="h-px w-4 bg-white/20" />
                                  <span>{c.sector}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </Link>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}

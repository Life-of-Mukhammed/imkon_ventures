import type { Metadata } from 'next'
import { safeFind } from '@/lib/safeFetch'
import { demoTeam } from '@/lib/demoData'
import { Reveal } from '@/components/Reveal'
import { mediaUrl, type TeamMember } from '@/lib/types'

export const metadata: Metadata = { title: 'Team' }
export const dynamic = 'force-dynamic'

const CATEGORY_ORDER: Record<TeamMember['category'], number> = {
  partner: 0,
  'venture-partner': 1,
  'operating-partner': 2,
  team: 3,
  advisor: 4,
}

export default async function TeamPage() {
  const { docs: live } = await safeFind<TeamMember>({
    collection: 'team-members',
    sort: 'order',
    limit: 200,
  })

  const team = (live.length ? live : demoTeam).slice().sort((a, b) => {
    const ca = CATEGORY_ORDER[a.category] ?? 99
    const cb = CATEGORY_ORDER[b.category] ?? 99
    if (ca !== cb) return ca - cb
    return (a.order ?? 0) - (b.order ?? 0)
  })

  return (
    <div className="bg-black text-white">
      <section className="px-6 pb-12 pt-40 md:px-12 md:pb-16 md:pt-48">
        <div className="mx-auto max-w-[1480px]">
          <div
            className="rise text-[0.7rem] uppercase tracking-[0.28em] text-white/40"
            style={{ animationDelay: '60ms' }}
          >
            Team
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-none">
          <ul className="grid grid-cols-2 gap-0 md:grid-cols-4">
            {team.map((m, i) => {
              const photo = mediaUrl(m.photo)
              return (
                <li key={m.id} className="group block">
                  <Reveal delay={Math.min((i % 4) * 80, 240)}>
                    <div className="relative -my-px -mx-px block aspect-square w-[calc(100%+2px)] overflow-hidden bg-black">
                      {photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photo}
                          alt={m.name}
                          className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-90"
                        />
                      ) : (
                        // Fallback: placeholder portrait built from initials — same bg as page so cells blend
                        <div className="absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-700 group-hover:opacity-70">
                          <span className="font-serif font-light tracking-[-0.02em] text-6xl text-white/15 md:text-8xl">
                            {m.name
                              .split(' ')
                              .map((p) => p[0])
                              .filter(Boolean)
                              .slice(0, 2)
                              .join('')}
                          </span>
                        </div>
                      )}

                      {/* Soft vignette so name reads cleanly when revealed */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                      {/* Name overlay — fades in on hover */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 px-5 pb-5 opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:px-6 md:pb-6">
                        <div className="font-serif font-light tracking-[-0.01em] text-xl leading-tight md:text-2xl">
                          {m.name}
                        </div>
                        <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-white/65">
                          {m.title}
                        </div>
                      </div>
                    </div>
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

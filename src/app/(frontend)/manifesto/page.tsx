import type { Metadata } from 'next'
import { safeFindGlobal } from '@/lib/safeFetch'
import { demoManifesto } from '@/lib/demoData'
import { RichText } from '@/components/RichText'
import type { ManifestoDoc } from '@/lib/types'

export const metadata: Metadata = { title: 'Manifesto' }
export const dynamic = 'force-dynamic'

export default async function ManifestoPage() {
  const data = (await safeFindGlobal<ManifestoDoc>('manifesto')) ?? demoManifesto

  return (
    <article className="bg-black text-white">
      <header className="px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-56">
        <div className="mx-auto max-w-[1100px]">
          {data.eyebrow && (
            <div className="rise mb-10 text-[0.7rem] uppercase tracking-[0.28em] text-white/40">
              {data.eyebrow}
            </div>
          )}
          {data.title && (
            <h1 className="rise font-serif font-light tracking-[-0.02em] text-[clamp(3rem,8vw,7.5rem)] leading-[0.95]">
              {data.title}
            </h1>
          )}
          {data.subtitle && (
            <p className="rise mt-12 max-w-3xl font-light text-xl leading-snug text-white/70 md:text-3xl">
              {data.subtitle}
            </p>
          )}
        </div>
      </header>

      {/* Top-level body (rich text) */}
      {data.body && (
        <section className="border-t border-white/10 px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[820px]">
            <RichText data={data.body} />
          </div>
        </section>
      )}

      {/* Numbered sections */}
      {data.sections && data.sections.length > 0 && (
        <div className="border-t border-white/10 px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[820px] space-y-24 md:space-y-32">
            {data.sections.map((section, i) => (
              <section key={i} className="space-y-8">
                <div className="text-[0.7rem] uppercase tracking-[0.28em] text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h2 className="font-serif font-light tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
                  {section.heading}
                </h2>
                {section.body && <RichText data={section.body} />}
              </section>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

import Link from 'next/link'
import type { SiteSettingsDoc } from '@/lib/types'

export function Footer({ settings }: { settings: SiteSettingsDoc }) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-black px-6 pb-10 pt-16 text-white md:px-12 md:pb-14 md:pt-24">
      <div className="mx-auto max-w-[1480px]">
        {/* Three-column meta */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="text-[0.7rem] uppercase tracking-[0.28em] text-white/40">
              Contact
            </div>
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="mt-5 block font-serif font-light text-2xl tracking-[-0.01em] hover:text-white/70 md:text-3xl"
              >
                {settings.email}
              </a>
            )}
          </div>

          <div className="md:col-span-4">
            <div className="text-[0.7rem] uppercase tracking-[0.28em] text-white/40">
              Site
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {(settings.footerLinks?.length
                ? settings.footerLinks
                : [
                    { label: 'Portfolio', href: '/portfolio' },
                    { label: 'Team', href: '/team' },
                    { label: 'Manifesto', href: '/manifesto' },
                  ]
              ).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-light text-white/70 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[0.7rem] uppercase tracking-[0.28em] text-white/40">
              Social
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {settings.twitter && (
                <li>
                  <a
                    href={settings.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="font-light text-white/70 hover:text-white"
                  >
                    Twitter / X
                  </a>
                </li>
              )}
              {settings.linkedin && (
                <li>
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="font-light text-white/70 hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom legal row */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.7rem] uppercase tracking-[0.22em] text-white/35 md:flex-row md:items-start md:justify-between md:gap-12">
          <p>© 2024–{year} {settings.footerTagline ?? 'Imkon Ventures'}.</p>
          <p className="max-w-3xl normal-case tracking-normal">
            {settings.footerDisclaimer ??
              'Past performance is not indicative of future results.'}
          </p>
        </div>
      </div>
    </footer>
  )
}

import type { Metadata } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import '../globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { safeFindGlobal } from '@/lib/safeFetch'
import { demoSiteSettings } from '@/lib/demoData'
import type { SiteSettingsDoc } from '@/lib/types'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Imkon Ventures',
    template: '%s — Imkon Ventures',
  },
  description: 'Funding the founders building what comes next.',
  openGraph: {
    siteName: 'Imkon Ventures',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings =
    (await safeFindGlobal<SiteSettingsDoc>('site-settings')) ?? demoSiteSettings

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full bg-black text-white antialiased">
        <Nav />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}

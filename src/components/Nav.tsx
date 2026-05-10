'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/team', label: 'Team' },
  { href: '/manifesto', label: 'Manifesto' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
        scrolled ? 'bg-black/70 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <Logo className="text-white" />
        <nav className="hidden items-center gap-12 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.7rem] uppercase tracking-[0.28em] transition-colors duration-300 ${
                pathname.startsWith(link.href)
                  ? 'text-white'
                  : 'text-white/55 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`block h-px w-7 bg-white transition-transform duration-300 ${
              open ? 'translate-y-[5px] rotate-45' : ''
            }`}
          />
          <span
            className={`mt-[10px] block h-px w-7 bg-white transition-transform duration-300 ${
              open ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>
      <div
        className={`overflow-hidden border-t border-white/10 bg-black md:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        } transition-[max-height] duration-500 ease-out`}
      >
        <nav className="flex flex-col px-6 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-white/5 py-4 text-sm uppercase tracking-[0.22em] text-white/80 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

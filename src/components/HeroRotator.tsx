'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { PortfolioCompany } from '@/lib/types'
import { mediaUrl } from '@/lib/types'

const ROTATE_MS = 6500

export function HeroRotator({
  companies,
  eyebrow,
  headline,
}: {
  companies: PortfolioCompany[]
  eyebrow?: string
  headline?: string
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    if (paused || companies.length <= 1) return
    const t = setInterval(
      () => setIndex((i) => (i + 1) % companies.length),
      ROTATE_MS,
    )
    return () => clearInterval(t)
  }, [companies.length, paused])

  // Pause off-screen videos to save resources
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === index) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [index])

  return (
    <section
      className="relative isolate h-screen min-h-[640px] w-full overflow-hidden bg-black text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stacked media slides */}
      {companies.map((c, i) => {
        const videoSrc = mediaUrl(c.heroVideo)
        const imageSrc = mediaUrl(c.heroImage)
        return (
          <div
            key={c.id}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== index}
          >
            {videoSrc ? (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el
                }}
                src={videoSrc}
                autoPlay={i === index}
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              />
            ) : imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at ${
                    20 + ((i * 20) % 60)
                  }% ${20 + ((i * 30) % 60)}%, rgba(255,255,255,0.10), transparent 60%), #000`,
                }}
              />
            )}
            {/* Cinematic vignette overlay so foreground text stays legible */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          </div>
        )
      })}

      {/* Foreground layout */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-10 pt-32 md:px-12 md:pb-12 md:pt-40">
        {/* Top: eyebrow */}
        <div className="rise" style={{ animationDelay: '60ms' }}>
          {eyebrow && (
            <div className="text-[0.7rem] uppercase tracking-[0.28em] text-white/70">
              {eyebrow}
            </div>
          )}
        </div>

        {/* Middle: rotating headlines */}
        <div className="relative flex-1">
          <div className="flex h-full items-center">
            <div className="relative w-full max-w-5xl">
              {companies.map((c, i) => (
                <h2
                  key={c.id}
                  className={`absolute inset-x-0 font-serif font-light tracking-[-0.02em] text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.02] transition-[opacity,transform] duration-[1400ms] ease-out ${
                    i === index
                      ? 'opacity-100 translate-y-0'
                      : 'pointer-events-none translate-y-3 opacity-0'
                  }`}
                  aria-hidden={i !== index}
                >
                  {c.tagline ?? headline ?? c.name}
                </h2>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: dot pagination only */}
        <div className="flex justify-end">
          <div className="flex items-center gap-3">
            {companies.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setIndex(i)}
                aria-label={`Show ${c.name}`}
                className="group relative h-3 w-3"
              >
                <span
                  className={`absolute inset-0 rounded-full border border-white transition-[background-color,transform] duration-500 ${
                    i === index
                      ? 'scale-100 bg-white'
                      : 'scale-90 bg-transparent group-hover:scale-100 group-hover:bg-white/30'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

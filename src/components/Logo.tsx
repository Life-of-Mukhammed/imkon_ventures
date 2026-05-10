import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Imkon Ventures home"
      className={`inline-flex items-baseline gap-1.5 font-serif font-light leading-none tracking-[-0.01em] ${className}`}
    >
      <span className="text-[1.05rem]">Imkon</span>
      <span className="text-[1.05rem] italic opacity-60">Ventures</span>
    </Link>
  )
}

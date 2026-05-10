import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { LexicalRichText } from '@/lib/types'

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
})

export function RichText({
  data,
  className = '',
}: {
  data: LexicalRichText
  className?: string
}) {
  if (!data || typeof data !== 'object' || !data.root) return null
  return (
    <div
      className={`prose-invert max-w-none [&_p]:font-light [&_p]:leading-[1.7] [&_p]:text-base [&_p]:text-white/70 md:[&_p]:text-lg [&_h2]:font-serif [&_h2]:font-light [&_h2]:tracking-[-0.01em] [&_h2]:text-3xl md:[&_h2]:text-4xl [&_h3]:font-serif [&_h3]:font-light [&_h3]:text-2xl md:[&_h3]:text-3xl [&_a]:text-white [&_a]:underline-offset-4 hover:[&_a]:underline [&_strong]:font-medium [&_em]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_blockquote]:border-l [&_blockquote]:border-white/20 [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:italic [&_blockquote]:text-white/80 ${className}`}
    >
      <PayloadRichText data={data} converters={converters} />
    </div>
  )
}

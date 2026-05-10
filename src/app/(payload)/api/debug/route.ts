import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

/**
 * Debug endpoint — surfaces the real error that's hidden by Next's
 * generic "server error" page in production. Remove or token-gate
 * after the deploy is healthy.
 */
export async function GET() {
  const env = {
    PAYLOAD_SECRET: Boolean(process.env.PAYLOAD_SECRET),
    DATABASE_URI: Boolean(process.env.DATABASE_URI),
    DATABASE_URI_protocol: process.env.DATABASE_URI?.split(':')[0] ?? null,
    DATABASE_URI_pooled: process.env.DATABASE_URI?.includes('pooler') ?? false,
    DATABASE_URI_ssl: process.env.DATABASE_URI?.includes('sslmode=require') ?? false,
    DATABASE_URI_channelBinding:
      process.env.DATABASE_URI?.includes('channel_binding') ?? false,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    SEED_TOKEN: Boolean(process.env.SEED_TOKEN),
    NODE_ENV: process.env.NODE_ENV ?? null,
    VERCEL: process.env.VERCEL ?? null,
    VERCEL_REGION: process.env.VERCEL_REGION ?? null,
  }

  let payloadInit: { ok: boolean; error?: string; collections?: string[] }
  try {
    const payload = await getPayload({ config })
    payloadInit = {
      ok: true,
      collections: Object.keys(payload.collections),
    }
  } catch (err) {
    payloadInit = {
      ok: false,
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    }
  }

  let dbProbe: { ok: boolean; error?: string; userCount?: number }
  try {
    const payload = await getPayload({ config })
    const result = await payload.count({ collection: 'users' })
    dbProbe = { ok: true, userCount: result.totalDocs }
  } catch (err) {
    dbProbe = {
      ok: false,
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    }
  }

  return NextResponse.json({ env, payloadInit, dbProbe }, { status: 200 })
}

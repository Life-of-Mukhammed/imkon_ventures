import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { pushDevSchema } from '@payloadcms/drizzle'
import config from '@payload-config'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

/**
 * One-time schema sync endpoint for production.
 *
 * Payload's postgres adapter only auto-pushes the schema in dev. In prod
 * it expects file-based migrations (which we don't ship). This endpoint
 * calls the same pushDevSchema utility that dev uses, on demand.
 *
 *   curl -X POST https://YOUR_URL/api/init-schema \
 *     -H "Authorization: Bearer $SEED_TOKEN"
 *
 * Token-gated with SEED_TOKEN. After the first successful run the
 * tables exist and admin will load. Re-running is safe (idempotent).
 */
export async function POST(req: Request) {
  const expected = process.env.SEED_TOKEN
  if (!expected) {
    return NextResponse.json(
      { error: 'SEED_TOKEN env var not set' },
      { status: 500 },
    )
  }

  const auth = req.headers.get('authorization') ?? ''
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  if (token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })
    // pushDevSchema accepts the drizzle adapter instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await pushDevSchema(payload.db as any)
    return NextResponse.json({
      ok: true,
      message:
        'Schema pushed. Tables exist now. You can log into /admin (or run /api/seed to populate demo content).',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    return NextResponse.json({ ok: false, error: message, stack }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { runSeed } from '@/scripts/seed'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

/**
 * Seed endpoint — protected by SEED_TOKEN env var.
 *
 *   curl -X POST http://localhost:3000/api/seed \
 *     -H "Authorization: Bearer $SEED_TOKEN"
 *
 * Optionally pass JSON body:
 *   { "adminEmail": "you@imkon.capital", "adminPassword": "<strong>" }
 */
export async function POST(req: Request) {
  const expected = process.env.SEED_TOKEN
  if (!expected) {
    return NextResponse.json(
      { error: 'SEED_TOKEN env var is not set; refusing to run seed.' },
      { status: 500 },
    )
  }

  const auth = req.headers.get('authorization') ?? ''
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  if (token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { adminEmail?: string; adminPassword?: string } = {}
  try {
    body = await req.json()
  } catch {
    // empty body is fine
  }

  try {
    const payload = await getPayload({ config })
    const result = await runSeed(payload, {
      adminEmail: body.adminEmail,
      adminPassword: body.adminPassword,
    })
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}

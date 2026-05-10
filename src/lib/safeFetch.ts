// Helpers that swallow database errors at build/preview time so pages can render
// with empty content while the operator is still wiring up the database.

import { getPayloadClient } from './payload'

type AnyDoc = Record<string, unknown>

export async function safeFindGlobal<T = AnyDoc>(slug: string): Promise<T | null> {
  try {
    const payload = await getPayloadClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.findGlobal({ slug: slug as any })
    return result as T
  } catch (err) {
    console.warn(`[payload] failed to load global "${slug}":`, (err as Error).message)
    return null
  }
}

export async function safeFind<T = AnyDoc>(args: {
  collection: string
  limit?: number
  sort?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where?: any
}): Promise<{ docs: T[]; totalDocs: number }> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: args.collection as any,
      limit: args.limit ?? 100,
      sort: args.sort,
      where: args.where,
    })
    return { docs: result.docs as T[], totalDocs: result.totalDocs }
  } catch (err) {
    console.warn(
      `[payload] failed to load collection "${args.collection}":`,
      (err as Error).message,
    )
    return { docs: [], totalDocs: 0 }
  }
}

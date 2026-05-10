import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Native / heavy packages must run in the Node runtime, not bundled.
  serverExternalPackages: [
    'sharp',
    'pg',
    'pg-native',
    'pino',
    'pino-pretty',
    '@libsql/client',
    'better-sqlite3',
    'drizzle-kit',
    'drizzle-orm',
  ],
  // Allow larger uploads (logos, hero videos) through the admin
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})

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
  // Force-include drizzle-kit in the serverless function bundle for the
  // routes that may call pushDevSchema. Without this, Vercel's nft tracer
  // doesn't follow the dynamic require('drizzle-kit/api') and leaves the
  // package out of /var/task/node_modules.
  outputFileTracingIncludes: {
    '/api/init-schema': ['./node_modules/drizzle-kit/**/*'],
    '/api/seed': ['./node_modules/drizzle-kit/**/*'],
    '/api/debug': ['./node_modules/drizzle-kit/**/*'],
    '/admin/[[...segments]]': ['./node_modules/drizzle-kit/**/*'],
    '/api/[...slug]': ['./node_modules/drizzle-kit/**/*'],
  },
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

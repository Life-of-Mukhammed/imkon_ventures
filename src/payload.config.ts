import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { PortfolioCompanies } from './collections/PortfolioCompanies'
import { TeamMembers } from './collections/TeamMembers'
import { SiteSettings } from './globals/SiteSettings'
import { Manifesto } from './globals/Manifesto'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dbUri = process.env.DATABASE_URI || ''
const isPostgres = /^postgres(ql)?:\/\//.test(dbUri)

const db = isPostgres
  ? postgresAdapter({ pool: { connectionString: dbUri } })
  : sqliteAdapter({
      client: {
        url: dbUri.startsWith('file:') ? dbUri : 'file:./payload-local.db',
      },
    })

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Imkon Ventures',
    },
  },
  editor: lexicalEditor({}),
  collections: [Users, Media, PortfolioCompanies, TeamMembers],
  globals: [SiteSettings, Manifesto],
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-replace-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  sharp,
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
})

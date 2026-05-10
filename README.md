# Imkon Ventures

Public site + CMS for Imkon Ventures. Built with Next.js 16, Payload CMS 3, Tailwind v4, and Postgres (Neon in production).

## Stack

- **Next.js 16** (App Router) + React 19
- **Tailwind CSS v4**
- **Payload CMS 3** — admin panel at `/admin`, content stored in Postgres
- **Neon Postgres** for production hosting
- **Vercel** for deploy

## Local development

Local dev uses **SQLite** (file: `./payload-local.db`) so you don't need to install or connect to Postgres just to try it. Production switches to Postgres automatically when you set `DATABASE_URI`.

### 1. Install and run

```bash
npm install
cp .env.example .env       # then edit .env if you want to change the seed token
npm run dev
```

- Public site → [http://localhost:3000](http://localhost:3000)
- Admin panel → [http://localhost:3000/admin](http://localhost:3000/admin)

### 2. Seed demo content

In another terminal, after the dev server is up:

```bash
curl -X POST http://localhost:3000/api/seed \
  -H "Authorization: Bearer dev-seed-token"
```

Response:

```json
{
  "ok": true,
  "adminCreated": true,
  "adminEmail": "admin@imkon.capital",
  "companiesCreated": 12,
  "membersCreated": 4
}
```

Default admin: **admin@imkon.capital** / **changeme-now**. Change it on first login.

To use different credentials, send a JSON body:

```bash
curl -X POST http://localhost:3000/api/seed \
  -H "Authorization: Bearer dev-seed-token" \
  -H "Content-Type: application/json" \
  -d '{"adminEmail":"you@imkon.capital","adminPassword":"<strong>"}'
```

> The `npm run seed` CLI script also exists, but it requires Node ≥ 20.18 (older Node versions hit an ESM resolution clash between `tsx` and `file-type`). The `/api/seed` route avoids that and works on any Node version Next.js itself supports.

## Content model

| Collection / Global   | Where it appears                  | Notes                                            |
| --------------------- | --------------------------------- | ------------------------------------------------ |
| `portfolio-companies` | `/portfolio`, hero rotation on `/` | Toggle `featured` to include in hero            |
| `team-members`        | `/team`                           | Grouped by `category`, sorted by `order`         |
| `media`               | All image fields                  | Local uploads to `./media` in dev; swap to S3 in prod |
| `users`               | `/admin` access                   | Role: `admin` (full) or `editor` (content only)  |
| `site-settings`       | Hero copy, footer, contact        | Edit in admin                                    |
| `manifesto`           | `/manifesto`                      | Rich text + per-section bodies                   |

## Adding admin users

In `/admin`, only existing admins can create new users. Create the first one via `npm run seed`, then invite teammates from the Users collection.

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add -A
git commit -m "Initial Imkon Ventures site"
git remote add origin git@github.com:YOUR_ORG/imkonventures.git
git push -u origin main
```

### 2. Create a Neon production database

- Sign in to [console.neon.tech](https://console.neon.tech).
- Create a project (e.g. `imkonventures-prod`).
- Copy the **pooled** connection string — you'll need it for serverless.

### 3. Import the project on Vercel

- [vercel.com/new](https://vercel.com/new), select the GitHub repo.
- Framework: **Next.js** (auto-detected).
- Add environment variables:
  - `PAYLOAD_SECRET` — long random string (e.g. `openssl rand -base64 48`)
  - `DATABASE_URI` — Neon pooled connection string
  - `NEXT_PUBLIC_SITE_URL` — `https://your-domain.com`
- Deploy.

### 4. Seed production once

After the first deploy, hit the seed endpoint on your production URL:

```bash
curl -X POST https://your-domain.com/api/seed \
  -H "Authorization: Bearer $PROD_SEED_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"adminEmail":"you@imkon.capital","adminPassword":"<strong>"}'
```

Once content is in place, you can rotate or remove `SEED_TOKEN` from Vercel env to disable the endpoint.

### 5. (Optional) Move media to S3

For production, configure the S3 storage adapter so uploads survive serverless deploys:

```bash
npm install @payloadcms/storage-s3
```

Then in `payload.config.ts`:

```ts
import { s3Storage } from '@payloadcms/storage-s3'

plugins: [
  s3Storage({
    collections: { media: true },
    bucket: process.env.S3_BUCKET!,
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
      region: process.env.S3_REGION,
    },
  }),
]
```

## Useful scripts

- `npm run dev` — Next.js + Payload dev server
- `npm run build` — production build
- `npm run start` — production server
- `npm run typecheck` — TypeScript checks
- `npm run seed` — load demo content into the database
- `npm run generate:types` — regenerate `src/payload-types.ts` from collections
- `npm run generate:importmap` — regenerate the Payload admin import map after adding custom components

## Project layout

```
src/
  app/
    (frontend)/         # public site (/, /portfolio, /team, /manifesto)
    (payload)/          # admin panel + REST/GraphQL API
  collections/          # Payload collection definitions
  globals/              # Payload global definitions (site-settings, manifesto)
  components/           # shared React components
  lib/
    payload.ts          # Payload client helper
    safeFetch.ts        # error-tolerant data fetchers (fall back to demo data)
    demoData.ts         # placeholder content for first-run / DB-down scenarios
    types.ts            # hand-rolled types used by the public site
  scripts/
    seed.ts             # populate the DB with demo content
  payload.config.ts     # Payload main config
```

## Notes

- The public pages render with **demo data** if the database is unreachable (e.g. before you set `DATABASE_URI`). Once Neon is connected and seeded, real content takes over.
- **Featured** companies appear in the homepage hero rotation. Toggle the checkbox in `/admin → Portfolio Companies`.
- **Order** field controls grid ordering — lower numbers come first.

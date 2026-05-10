# Deployment Checklist

Production target: **Vercel + Neon Postgres**.

## 1. Pre-flight (locally)

```bash
npm install
npm run build        # must succeed
npm run typecheck    # must be clean
```

## 2. Create the production database

1. Go to <https://console.neon.tech> and create a project (e.g. `imkonventures-prod`).
2. Copy the **pooled** connection string. It looks like:
   ```
   postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require
   ```
3. Save it — you'll paste it into Vercel.

## 3. Push the code to GitHub

```bash
git init
git add -A
git commit -m "Initial Imkon Ventures site"
git branch -M main
git remote add origin git@github.com:YOUR_ORG/imkonventures.git
git push -u origin main
```

## 4. Import the project on Vercel

- <https://vercel.com/new> → select the repo
- Framework: **Next.js** (auto-detected)
- Build & Output settings: leave as default
- Add **Environment Variables**:

  | Key | Value |
  | --- | --- |
  | `PAYLOAD_SECRET` | `openssl rand -base64 48` (long random string) |
  | `DATABASE_URI` | The Neon pooled connection string from step 2 |
  | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |
  | `SEED_TOKEN` | A long random string (used only for first-run seeding) |

- Click **Deploy**.

## 5. Seed production once

After the first successful deploy, populate the DB:

```bash
curl -X POST https://your-domain.com/api/seed \
  -H "Authorization: Bearer $SEED_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"adminEmail":"you@imkon.capital","adminPassword":"<choose-strong-password>"}'
```

Expected response:

```json
{"ok":true,"adminCreated":true,"adminEmail":"you@imkon.capital","companiesCreated":12,"membersCreated":4}
```

Then visit `https://your-domain.com/admin` and log in. **Change the admin password immediately** (top-right profile → Account → Change Password).

After seeding, you can rotate or remove `SEED_TOKEN` from Vercel env to disable the endpoint.

## 6. (Recommended) Move uploads to S3 / R2

By default, image/video uploads land in `./media` on the server filesystem, which doesn't survive serverless deploys on Vercel. For production, plug in S3-compatible storage:

```bash
npm install @payloadcms/storage-s3
```

Then in `src/payload.config.ts`:

```ts
import { s3Storage } from '@payloadcms/storage-s3'

// inside buildConfig():
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
      // For Cloudflare R2: also set `endpoint: process.env.S3_ENDPOINT`
    },
  }),
],
```

Add the matching env vars to Vercel and redeploy. Existing uploads will need to be re-uploaded once.

## 7. Custom domain

Vercel → Project → Domains → add your domain (e.g. `imkon.capital`). Update DNS records as instructed. Then update `NEXT_PUBLIC_SITE_URL` to match and redeploy.

## 8. Verify

- [ ] `https://your-domain.com/` — hero loads, featured companies rotate
- [ ] `https://your-domain.com/portfolio` — 4-column grid renders
- [ ] `https://your-domain.com/team` — grid with hover-reveal names
- [ ] `https://your-domain.com/manifesto` — sections render
- [ ] `https://your-domain.com/admin` — login works, content edit works
- [ ] `https://your-domain.com/sitemap.xml` — lists 4 pages
- [ ] `https://your-domain.com/robots.txt` — disallows `/admin/` and `/api/`
- [ ] OG/meta tags render with correct site URL

## 9. After-launch admin housekeeping

In `/admin`:

- Upload company logos (`Portfolio Companies` → each company → `Logo`)
- Upload hero videos for featured companies (`Hero Video`)
- Upload team photos (`Team Members` → each → `Photo`)
- Edit `Site Settings` → `Hero` (headline) and `Footer` (disclaimer, links)
- Edit `Manifesto` (rich text body + numbered sections)
- Mark companies `featured` to control hero rotator

## Troubleshooting

- **`/admin` 500 error**: `DATABASE_URI` is wrong or DB is unreachable. Check Vercel logs.
- **Uploads disappear after redeploy**: Switch to S3 (step 6).
- **`POST /api/seed` returns 500 "SEED_TOKEN env var is not set"**: Add `SEED_TOKEN` env var on Vercel and redeploy.
- **Build fails with font axes error**: This was fixed; if it returns, ensure `Fraunces({ weight: [...] })` does not also pass `axes` (Next.js 16 disallows both).
- **`/api/seed` returns 401**: Authorization header is missing or token doesn't match.

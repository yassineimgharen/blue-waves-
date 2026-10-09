# Next.js and Vercel

The website now uses Next.js 16 (Pages Router) for server-rendered public pages, individual room URLs, the admin dashboard and API routes. The existing React components, Tailwind theme, translations and galleries are preserved. Vite and the separate Express server are removed.

## Run locally

Use Node.js 24. Run `npm install`, then `npm run dev`. Open the URL printed in the terminal. If port 3000 is occupied, the launcher chooses another free port and adjusts the admin origin automatically. The existing `data/lodge.sqlite`, owner password and uploaded photos remain in use. `npm run admin:owner` creates or resets an owner account in the configured database.

`npm run build` prepares the local image assets and CMS seed, then creates a Next.js production build. `npm start` serves that build. Production admin authentication requires HTTPS and an exact `APP_ORIGIN`.

Photos remain in `src/images/`. The prepare script copies them into generated `public/media/` and generates the surf archive manifest. Run the prepare script or restart development after adding photos. Never add the generated copies, database, uploads, or `.env` files to Git. Existing hash bookmarks redirect to normal page URLs.

## Configure Vercel

1. Import this repository and choose **Next.js** as the framework preset. Use the repository root, `npm run build`, and the default Next.js output setting. Remove any old `dist` output override or Vite configuration.
2. Connect a Neon Postgres database and a **public** Vercel Blob store to the project. Set server-only `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` for the intended environment.
3. Set `APP_ORIGIN` to the exact public HTTPS origin, for example `https://your-project.vercel.app` (no path). Update this value and redeploy when switching to a custom domain. Admin mutations from other origins are rejected. A preview that needs editing requires its own correct origin and preferably separate storage.
4. Use Node.js 24 in Vercel project settings. Redeploy after changing variables.

SQLite and local uploaded files are used only for local development or a persistent Node host. On Vercel the application requires Postgres; it never silently falls back to a temporary SQLite database. Browser photo uploads go directly to Blob using short-lived, authenticated tokens, so a 5 MB photo does not pass through Vercel's function request-size limit. Only verified JPEG/PNG/WebP uploads are published to the CMS.

## Transfer the existing website and owner account

Back up the local `data/` directory. Put the target database and Blob credentials in your local `.env` (never in chat or Git), leave `DATA_DIR` pointing at the existing local data, then run:

```sh
npm run admin:migrate
```

Run this once against a fresh target, before editing the cloud website or provisioning a new cloud owner. It copies content, password hashes and uploaded photos, retains existing image URLs, and excludes sessions. It opens the local database read-only and refuses to overwrite a populated target. Existing passwords continue to work. Interrupted transfers can leave unused Blob objects; retry with the same target to reuse matching photos. After a successful import the command refuses further runs.

For a fresh installation with no existing data to transfer, set `DATABASE_URL` locally and run `npm run admin:owner` instead. There is no default password or public signup.

To keep using the local database afterward, remove/comment out the cloud variables in the local `.env`. Keep them configured in Vercel.

## Validation

Run `npm run lint`, `npm run build`, `npm run test:cms`, `node --import tsx --import ./tests/register-assets.mjs tests/i18n.test.tsx`, `node --import tsx tests/booking.test.ts`, and `node --import tsx tests/room-details.test.tsx`. Browser tests require Chromium and permission to listen on local ports: `node tests/cms.browser.mjs` , `node tests/surf-archive.browser.mjs` and `node tests/next.browser.mjs` (run sequentially). They create temporary databases and never send reservations.

After deployment, verify owner login, a photo upload, saving/publishing a draft, and the public room page. Hosted Neon/Blob integration requires real credentials and cannot be verified by local-only tests.

## Central environment settings

The local `.env` contains the application's settings, EmailJS public identifiers, contact defaults, owner provisioning fields, and placeholders for cloud credentials. It is ignored by Git and readable only by the local file owner. Copy the needed variables into Vercel's environment settings for deployment; the ignored local file is not uploaded.

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: used by the existing browser email integration. Restart development or rebuild after changing them. These are public identifiers; never put private credentials in `NEXT_PUBLIC_` variables.
- `RESERVATION_EMAIL`, `CONTACT_EMAIL`, `CONTACT_PHONE`, `CONTACT_SECOND_PHONE`: initialize a fresh database. Run `npm run config:sync` to apply changes to an existing site's contact settings. Admin contact edits remain authoritative until the next explicit sync.
- `OWNER_EMAIL` and `OWNER_PASSWORD`: optional CLI inputs only. Fill a new password and run `npm run admin:owner -- --from-env` to provision/reset that account and revoke its sessions. Simply editing `.env` does not change login. The interactive command without `--from-env` still works. An existing password cannot be reconstructed from its database hash.
- `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN`: server-only hosted storage credentials. Blank means local storage; Vercel requires real values.

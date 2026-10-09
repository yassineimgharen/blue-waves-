# Blue Wave Lodge owner dashboard

The owner dashboard is at `/admin`. It manages rooms, albums, categories, offers, contact details, website images and English/French/Arabic wording. The public site's existing layout and styles are retained. The API, not the browser bundle, is the source of published inventory.

## First-time setup

Use Node.js **24 or later**. From the project directory:

```sh
npm install
npm run build
npm run admin:owner
npm run dev
```

The owner command asks for an email and a hidden password (at least 14 characters). There is **no default password, public signup, or automatic administrator account**. Open `http://127.0.0.1:3000/admin` and sign in with that account. The same console command can reset an account's password if necessary; it invalidates that owner's sessions.

Development uses one Next.js server, preferring port 3000. If occupied, the launcher selects a free port and adjusts the authentication origin. Open the dashboard URL printed in the terminal. Use the exact `APP_ORIGIN`; state-changing requests from any other origin are rejected. Existing processes are left running.

## Publishing and editing

- New rooms and offers begin as drafts. Edit their fields, switch Published on when ready, then click **Save changes**. Saving applies all pending dashboard edits atomically.
- Room photographs accept JPEG, PNG and WebP up to 5 MB. The first photo becomes the public card cover. Upload several at once, replace individual photos, edit captions, reorder with the arrows, or remove a photo from an album. The media library can permanently delete unused uploads after changes have been saved.
- Categories can be renamed or added; renaming also updates assigned rooms. Move rooms out of a category before deleting it.
- Offers support a title, description, inclusions/conditions, duration, total advertised price, photograph and applicable rooms. Surf remains optional. A blank price means price on request. Published offers appear on the homepage and Offers page and carry through to booking requests.
- Website content provides a searchable wording editor for page text and dynamic room/offer fields in all three languages. Add translations after entering new room or offer text. Empty translations fall back to the English wording.
- Website images can replace existing image positions without changing the layout. Contact details also drive the displayed email/phone links and reservation recipients.
- Saved published changes are immediately returned by the API; open public pages refresh within ten seconds or when refocused. The same browser also receives a cross-tab refresh notification. Unpublished/deleted rooms disappear from public menus, cards, detail lookup and booking choices.
- If another editor saved since this dashboard loaded, saving is rejected with a conflict instead of silently overwriting their changes. Preserve your edits before choosing Reload.

## Production hosting

See [Next.js deployment](nextjs-deployment.md) for Vercel configuration, Neon Postgres, Vercel Blob and transferring the existing owner account. The Next.js server handles both pages and API routes. Local development retains SQLite and uploads in `DATA_DIR`; Vercel requires durable hosted storage. For a persistent Node host, use `npm run build` and `npm start`, retain `DATA_DIR`, and terminate HTTPS at your reverse proxy. Set the exact HTTPS `APP_ORIGIN`.
Back up the database **and uploads together**. For a simple consistent backup, stop the server, copy the complete `DATA_DIR`, then restart it. For online SQLite backups use SQLite's backup facilities; do not copy only the main database while WAL writes are active. Verify restores before relying on backups. Never commit this directory or its backups. Seed generation on build never overwrites an existing database.

## Security and verification

All management endpoints check an owner session on the server. Passwords use scrypt with N=2^17, r=8, p=1 and unique salts. Opaque sessions have an eight-hour expiry, are hashed at rest, and are revoked on logout or password change. Writes require an exact allowed Origin plus a session-bound CSRF token. Login and upload limits are persisted in the configured database. Uploads use server-generated filenames, raster signature checks, size limits and `nosniff`; SVG/HTML uploads are rejected. Next.js serves static files only from `public/`; private database files remain outside that directory. Server validation restricts editable fields, media paths and supported currencies. Content is rendered as plain React text, never executable HTML. An audit table records login, credential changes, uploads and saves.

The security design follows [OWASP session guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [CSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html), and [password storage guidance](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html). Runtime storage uses [Node's SQLite API](https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html).

```sh
npm run lint
npm run test:cms
node --import tsx --import ./tests/register-assets.mjs tests/i18n.test.tsx
node --import tsx tests/booking.test.ts
node --import tsx tests/room-details.test.tsx
npm run build
```

Run `node tests/cms.browser.mjs` for end-to-end coverage (requires Chromium and free ports 3011/9223). Browser coverage uses isolated temporary content and accounts, not real reservations or production data. Do not submit a live reservation during verification.

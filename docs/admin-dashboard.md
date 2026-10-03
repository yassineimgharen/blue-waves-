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

Development prefers port 3000 for Vite and 3002 for the API. If either is occupied, the launcher selects free ports and synchronizes the authentication origin and API proxy automatically. Open the owner dashboard URL printed in the terminal. Use the exact origin configured in `APP_ORIGIN`; state-changing requests from any other origin are rejected. Vite proxies `/api` and `/media` to the API. A standalone Vite preview does not provide the backend. Existing processes are left running.

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

This is a **Node server with persistent disk**, not a static-only deployment. No remote deployment or real owner credential is included in this change.

1. Deploy the repository, including `server/`, the built `dist/`, and `src/images/` plus `src/bluewave-white.png` (the original photographs used by the seeded catalog). Install dependencies and run `npm run build` during the build stage.
2. Mount a persistent writable directory and set `DATA_DIR` to its absolute path, for example `/var/lib/blue-wave-lodge`. SQLite and uploads must survive deployments. Do not put this directory under `dist/` or any public web directory.
3. Set `APP_ORIGIN=https://your-real-domain.example`, `API_PORT` as required, and `API_HOST` for your reverse proxy or container. Run `npm run admin:owner` on the production server with the same `DATA_DIR` to create the real owner account.
4. Run `npm start` under your hosting provider's process manager and terminate HTTPS at the reverse proxy. Forward the site's paths to this Node process. The production server serves both the website and API; cookies use Secure/HttpOnly/SameSite=Strict and a `__Host-` prefix.
5. Keep the backend private behind the proxy. Proxy trust is deliberately disabled, so clients cannot forge forwarded IPs to evade throttling; behind a proxy the IP limit is shared, alongside per-account limits. This implementation targets a single Node instance and persistent local volume, not horizontally scaled ephemeral instances.

Back up the database **and uploads together**. For a simple consistent backup, stop the server, copy the complete `DATA_DIR`, then restart it. For online SQLite backups use SQLite's backup facilities; do not copy only the main database while WAL writes are active. Verify restores before relying on backups. Never commit this directory or its backups. Seed generation on build never overwrites an existing database.

## Security and verification

All management endpoints check an owner session on the server. Passwords use scrypt with N=2^17, r=8, p=1 and unique salts. Opaque sessions have an eight-hour expiry, are hashed at rest, and are revoked on logout or password change. Writes require an exact allowed Origin plus a session-bound CSRF token. Login and upload limits are persisted in SQLite. Uploads use server-generated filenames, raster signature checks, size limits and `nosniff`; SVG/HTML uploads are rejected. Vite explicitly denies access to SQLite files and the private data directory during development. Server validation restricts editable fields, media paths and supported currencies. Content is rendered as plain React text, never executable HTML. An audit table records login, credential changes, uploads and saves.

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

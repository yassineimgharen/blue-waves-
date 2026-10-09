# Surf Archive

`SurfArchiveSection` sits immediately after `StayOffers` on the homepage and Offers page. It retains the site's colors, spacing, typography and dark mode. The lazy-loaded archive module discovers local JPG, JPEG, PNG, WebP and AVIF files under `src/images/surf/` through the generated Next.js asset manifest. It uses no remote images.

The initial collection contains 50 unique photographs (one byte-identical copy is omitted). The first 12 appear initially; visitors reveal further batches with Explore more moments. An asymmetric opening row leads into masonry. The fullscreen native dialog traps focus, restores focus and scrolling on close, and supports buttons, arrow keys, Escape and horizontal mobile swipes. No speculative category filters are used.

The supplied photographs have descriptive English/French/Arabic alt text and intrinsic dimensions in `src/data/surfArchiveMetadata.json`. Next.js Image serves responsive previews; prepared 384px/768px WebP files live in `src/images/surf-previews/`; the original image loads only when selected in the lightbox. New files are discovered on development startup or build and fall back to lazy-loaded originals and a generic localized description until metadata/previews are prepared.

To refresh previews after changing photographs (Python 3 and Pillow required):

```sh
python3 scripts/prepare-surf-previews.py
```

Update the new descriptions in the metadata file and their translations in `stayTranslations.ts`. Rebuild for deployment. For isolated browser verification, with Chromium installed:

```sh
node tests/surf-archive.browser.mjs
```

The test checks placement on both pages, all preview/original image loads, initial lazy loading, pagination, desktop/mobile overflow, light/dark views, fullscreen navigation, Escape, focus restoration, closing, swipe and Arabic copy. It does not use real owner credentials or modify live website content.

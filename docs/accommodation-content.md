# Accommodation content and owner inputs

The existing design is retained. Live accommodation screens use `src/data/accommodations.ts`, not the old demonstration room/package prices in `mockData.ts`.

## Official reference supplied by the owner

- [Lodge home](https://www.bluewavelodge.com/en/): standard double rooms, sea-view balcony rooms, pool-view rooms, equipped apartment.
- [Standard studios](https://www.bluewavelodge.com/en/studio-double-standard-room/): air conditioning, private kitchenette and bathroom.
- [Tawja](https://www.bluewavelodge.com/studio-double-standard-tawja/): identifies the standard studios Tawja, Azemmur, Ayour, Titrit and Adrar.
- [Tafukt](https://www.bluewavelodge.com/en/studio-with-sea-view-balcony-tafukt/): sea-view balcony, published amenities and related Aman room.
- [Amlal](https://www.bluewavelodge.com/en/appartement-2/): equipped apartment for 4–6 people, published amenities including sofa bed.

Public indexed page content was accessible; direct page requests returned 403/timed out. No published room rates or complete bed configurations were available in the retrieved content. These fields are explicitly pending, rather than reusing unrelated demo rates. The owner's catalog identifies the pool-view rooms as Islman and Ajdig.

## Room photo albums

All ten catalog entries use the owner-supplied room folders in `src/images/` through `src/data/roomImages.ts`. There are 78 distinct images across the albums; byte-identical copies are included only once. The first image is the card cover. All remaining photos appear in the thumbnail gallery and fullscreen viewer with keyboard and mobile swipe support.

Folder aliases preserve the owner's catalog names: `azemmur` → `azemmour`, `tafukt` → `tafoukt`, and `appartement` → `amlal`. Other folder names match the room IDs. The `azemmur` album retains the two bathroom images supplied inside that folder despite their older Ayour filenames. Unassigned root images and rooftop/restaurant photos are not added to room albums.

Cards link to `#rooms/<room-id>`; the dedicated page preserves the selected room when entering booking. Missing rates, capacities and bed details remain explicitly pending. Room size is shown only when supplied.

## Rates and offers

Set `pricePerNight` and `currency` in the shared catalog once confirmed. `null` means price on request; it never becomes a free stay or a fabricated total. Cards, details, summary and reservation emails share these fields.

The 3-, 4- and 7-night offer requests have no invented inclusions, discount, surf price or deposit. Selecting an offer sets the requested duration, but never selects a surf service. Surf starts at `none`; lesson/session/guiding/rental are optional requests with unconfirmed prices. Final price, availability, tax and payment terms require the lodge's confirmation.

The existing EmailJS service/template integration is retained. Tests must mock email delivery; never submit a live reservation during verification.

## Verification

- `npm run lint`
- `node --import tsx tests/room-details.test.tsx`
- `node --import tsx --import ./tests/register-assets.mjs tests/i18n.test.tsx`
- `node --import tsx tests/booking.test.ts`
- With Vite and headless Chromium on debugging port 9222: `I18N_BASE_URL=http://127.0.0.1:3001 node --import tsx tests/i18n.browser.mjs`

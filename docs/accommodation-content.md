# Accommodation content and owner inputs

The existing design is retained. Live accommodation screens use `src/data/accommodations.ts`, not the old demonstration room/package prices in `mockData.ts`.

## Official reference supplied by the owner

- [Lodge home](https://www.bluewavelodge.com/en/): standard double rooms, sea-view balcony rooms, pool-view rooms, equipped apartment.
- [Standard studios](https://www.bluewavelodge.com/en/studio-double-standard-room/): air conditioning, private kitchenette and bathroom.
- [Tawja](https://www.bluewavelodge.com/studio-double-standard-tawja/): identifies the standard studios Tawja, Azemmur, Ayour, Titrit and Adrar.
- [Tafukt](https://www.bluewavelodge.com/en/studio-with-sea-view-balcony-tafukt/): sea-view balcony, published amenities and related Aman room.
- [Amlal](https://www.bluewavelodge.com/en/appartement-2/): equipped apartment for 4–6 people, published amenities including sofa bed.

Public indexed page content was accessible; direct page requests returned 403/timed out. No published room rates or complete bed configurations were available in the retrieved content. These fields are explicitly pending, rather than reusing unrelated demo rates. Pool View Room is a category entry pending the owner's individual room names and details; do not treat it as verified inventory.

## Photos awaiting owner mapping

The 27 UUID-named JPEGs in `src/images/` have not been assigned to rooms. Do not infer room identity from appearance or filename order.

For each room, the owner needs to identify:

- the room ID/name;
- the main photo filename;
- the remaining gallery filenames in order.

Import confirmed photos into `src/data/roomImages.ts` and add an array under the matching room ID (`ayour`, `azemmur`, `adrar`, `tawja`, `titrit`, `tafukt`, `aman`, `pool-view-room`, `amlal`). The first photo becomes the card photo. All photos appear in the room's thumbnail gallery and fullscreen viewer, with keyboard and mobile swipe support.

For example (replace filenames with confirmed assignments):

```ts
import mainPhoto from '../images/confirmed-main.jpeg';
import secondPhoto from '../images/confirmed-second.jpeg';
export const roomImages = {
  tafukt: [
    { src: mainPhoto, caption: 'Tafukt' },
    { src: secondPhoto, caption: 'Tafukt' },
  ],
};
```

## Rates and offers

Set `pricePerNight` and `currency` in the shared catalog once confirmed. `null` means price on request; it never becomes a free stay or a fabricated total. Cards, details, summary and reservation emails share these fields.

The 3-, 4- and 7-night offer requests have no invented inclusions, discount, surf price or deposit. Selecting an offer sets the requested duration, but never selects a surf service. Surf starts at `none`; lesson/session/guiding/rental are optional requests with unconfirmed prices. Final price, availability, tax and payment terms require the lodge's confirmation.

The existing EmailJS service/template integration is retained. Tests must mock email delivery; never submit a live reservation during verification.

## Verification

- `npm run lint`
- `node --import tsx tests/i18n.test.tsx`
- `node --import tsx tests/booking.test.ts`
- With Vite and headless Chromium on debugging port 9222: `I18N_BASE_URL=http://127.0.0.1:3001 node --import tsx tests/i18n.browser.mjs`

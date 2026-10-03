import { GALLERY_ITEMS, AMENITIES_DATA, TESTIMONIALS_DATA } from '../src/data/mockData';
import { writeFileSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { relative } from 'node:path';
import { ACCOMMODATIONS, STAY_SURF_OFFERS, ROOM_GROUPS } from '../src/data/accommodations';
import { translations } from '../src/i18n/translations';
const asset = (src: string) => src.startsWith('file:') ? '/media/seed/' + relative(fileURLToPath(new URL('../src/images/', import.meta.url)), fileURLToPath(src)).split('/').map(encodeURIComponent).join('/') : src;
const seed = {
  revision: 1,
  rooms: ACCOMMODATIONS.map(room => ({ ...room, published: true, image: asset(room.image), gallery: room.gallery?.map(photo => ({ ...photo, src: asset(photo.src) })), view: room.id === 'amlal' || room.category.includes('sea-view') ? 'Sea View' : room.category.includes('pool-view') ? 'Pool view' : 'Standard', bathroom: room.features.includes('Private bathroom') ? 'Private bathroom' : 'Bathtub or shower' })),
  categories: ROOM_GROUPS.map((group, i) => ({ id: `category-${i + 1}`, label: group.label })),
  offers: STAY_SURF_OFFERS.map(offer => ({ ...offer, published: true, currency: 'EUR', image: '', roomIds: [], description: 'Room or apartment of your choice, subject to availability.', inclusions: 'Optional surf service — selection and schedule to be confirmed.' })),
  content: Object.fromEntries(Object.keys(translations.en).map(key => [key, { en: key, fr: translations.fr[key as keyof typeof translations.fr], ar: translations.ar[key as keyof typeof translations.ar] }])),
  images: {},
  contacts: { reservationEmail: 'reservation@bluewavelodge.com', contactEmail: 'contact@bluewavelodge.com', phone: '+212 696985757', secondPhone: '+212 696991149' },
};
// Include newly added page text, even if it has not entered the translation catalog yet.
function collect(directory: URL) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) { if (!['admin', 'cms'].includes(entry.name)) collect(url); continue; }
    if (!entry.name.endsWith('.tsx')) continue;
    const source = readFileSync(url, 'utf8');
    for (const match of source.matchAll(/\bt\(\s*(['"])((?:\\.|(?!\1)[^\\])*)\1\s*\)/g)) {
      const key = match[2].replace(/\\(['"\\])/g, '$1').replace(/\\n/g, '\n');
      if (!Object.hasOwn(seed.content, key)) seed.content[key] = { en: key, fr: key, ar: key };
    }
  }
}
collect(new URL('../src/', import.meta.url));
for (const entry of [...GALLERY_ITEMS, ...AMENITIES_DATA, ...TESTIMONIALS_DATA]) {
  for (const [field, value] of Object.entries(entry)) {
    if (['title','subtitle','description','quote','author','location','packageTaken'].includes(field) && typeof value === 'string' && !Object.hasOwn(seed.content, value)) seed.content[value] = { en: value, fr: value, ar: value };
  }
}
writeFileSync(new URL('../server/seed.json', import.meta.url), JSON.stringify(seed, null, 2) + '\n');
console.log(`Prepared CMS seed: ${seed.rooms.length} rooms. Existing databases are never overwritten.`);

writeFileSync(new URL('../server/assets.json', import.meta.url), JSON.stringify([...GALLERY_ITEMS, ...AMENITIES_DATA].map(item => ({ key: item.image, src: item.image, name: item.title })), null, 2) + '\n');

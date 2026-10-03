export class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
const fail = message => { throw new HttpError(400, message); };
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const string = (value, name, max = 200, required = true) => {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) fail(`Invalid ${name}.`);
  return value.trim();
};
const list = (value, name, max = 200) => { if (!Array.isArray(value) || value.length > max) fail(`Invalid ${name}.`); return value; };
const id = value => { if (typeof value !== 'string' || !/^[a-z0-9][a-z0-9-]{0,79}$/.test(value)) fail('Invalid ID.'); return value; };
const price = value => { if (value !== null && (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1000000)) fail('Invalid price.'); return value; };
const integer = (value, name, max = 100) => { if (!Number.isInteger(value) || value < 1 || value > max) fail(`Invalid ${name}.`); return value; };
const boolean = value => { if (typeof value !== 'boolean') fail('Invalid publication status.'); return value; };
const unique = (items, field = 'id') => { if (new Set(items.map(i => i[field])).size !== items.length) fail(`Duplicate ${field}.`); return items; };
const currency = value => { if (!['EUR', 'MAD', 'USD', 'GBP'].includes(value)) fail('Unsupported currency.'); return value; };
export function imageUrl(value) {
  string(value, 'image', 1000, false);
  if (value && !/^\/media\/(?:uploads\/[a-f0-9-]+\.(?:jpg|png|webp)|seed\/[a-zA-Z0-9_%(). /-]+\.(?:jpe?g|png|webp))$/.test(value)) fail('Choose an uploaded image.');
  if (value.includes('..')) fail('Invalid image path.');
  return value;
}
export function validateSite(value) {
  if (!object(value)) fail('Invalid site data.');
  const categories = unique(list(value.categories, 'categories', 50).map(c => { if (!object(c)) fail('Invalid category.'); return { id: id(c.id), label: string(c.label, 'category') }; })); unique(categories, 'label');
  const rooms = unique(list(value.rooms, 'rooms', 200).map(r => {
    if (!object(r)) fail('Invalid room.');
    const gallery = list(r.gallery, 'gallery', 60).map(p => { if (!object(p)) fail('Invalid photo.'); return { src: imageUrl(p.src), caption: string(p.caption, 'photo caption', 300, false) }; });
    if (gallery.some(p => !p.src)) fail('A photo needs an image.');
    const tag = string(r.tag, 'room category');
    if (!categories.some(c => c.label === tag)) fail('Choose an existing room category.');
    const category = list(r.category, 'room filters', 6).map(c => { if (!['rooms','apartments','sea-view','pool-view','couples','families'].includes(c)) fail('Invalid room filter.'); return c; });
    return { id: id(r.id), name: string(r.name, 'room name'), tag, category, description: string(r.description, 'description', 6000, false),
      pricePerNight: price(r.pricePerNight), currency: currency(r.currency), published: boolean(r.published),
      capacity: string(r.capacity, 'capacity', 200, false), ...(r.maxGuests == null ? {} : { maxGuests: integer(r.maxGuests, 'maximum guests') }),
      bedType: string(r.bedType, 'bed type', 300, false), bathroom: string(r.bathroom ?? '', 'bathroom', 300, false),
      size: string(r.size, 'room size', 100, false), view: string(r.view ?? '', 'view', 100, false),
      features: list(r.features, 'amenities', 60).map(f => string(f, 'amenity', 200)), gallery, image: gallery[0]?.src ?? '', rating: 0 };
  }));
  const offers = unique(list(value.offers, 'offers', 100).map(o => { if (!object(o)) fail('Invalid offer.'); return { id: id(o.id), title: string(o.title, 'offer title'), nights: integer(o.nights, 'nights', 365),
    description: string(o.description, 'offer description', 6000, false), inclusions: string(o.inclusions, 'offer inclusions', 6000, false),
    price: price(o.price), currency: currency(o.currency), published: boolean(o.published), image: imageUrl(o.image),
    roomIds: list(o.roomIds, 'offer rooms').map(roomId => { if (!rooms.some(r => r.id === roomId)) fail('An offer references a deleted room.'); return roomId; }) }; }));
  if (!object(value.content) || Object.keys(value.content).length > 2500) fail('Invalid website content.');
  const content = Object.fromEntries(Object.entries(value.content).map(([key, entry]) => {
    string(key, 'content key', 6000); if (!object(entry)) fail('Invalid translation.');
    return [key, Object.fromEntries(['en','fr','ar'].map(lang => [lang, string(entry[lang], 'website text', 12000, false)]))];
  }));
  if (!object(value.images) || Object.keys(value.images).length > 500) fail('Invalid website images.');
  const images = Object.fromEntries(Object.entries(value.images).map(([key, url]) => [string(key, 'image key', 1000), imageUrl(url)]));
  if (!object(value.contacts)) fail('Invalid contact details.');
  const contacts = Object.fromEntries(['reservationEmail','contactEmail','phone','secondPhone'].map(key => [key, string(value.contacts[key], key, 200)]));
  for (const key of ['reservationEmail','contactEmail']) if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacts[key])) fail('Enter a valid email address.');
  for (const key of ['phone','secondPhone']) if (!/^[+()\d .-]+$/.test(contacts[key])) fail('Enter a valid phone number.');
  return { rooms, categories, offers, content, images, contacts };
}

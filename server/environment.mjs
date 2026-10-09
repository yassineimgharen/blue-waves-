import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
// Only nonempty configured values override contact defaults when initializing/syncing.
export function environmentContacts(contacts) {
  const mapping = { reservationEmail: 'RESERVATION_EMAIL', contactEmail: 'CONTACT_EMAIL', phone: 'CONTACT_PHONE', secondPhone: 'CONTACT_SECOND_PHONE' };
  return Object.fromEntries(Object.entries(mapping).map(([field, variable]) => [field, process.env[variable]?.trim() || contacts[field]]));
}

export function seedBody() {
  const raw = readFileSync(resolve('server/seed.json'), 'utf8');
  const seed = JSON.parse(raw);
  const contacts = environmentContacts(seed.contacts);
  return JSON.stringify(contacts) === JSON.stringify(seed.contacts) ? raw : JSON.stringify({ ...seed, contacts });
}

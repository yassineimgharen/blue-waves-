import type { ManagedOffer } from '../cms/types';
import type { BookingDraft, RoomItem } from '../types';
import { SURF_ADDONS } from '../data/accommodations';
import { locales } from '../i18n/translations';
import type { Language } from '../types';

export const emptyBooking: BookingDraft = {
  roomId: '', checkIn: '', checkOut: '', adults: 2, children: 0,
  surfAddon: 'none', offerNights: null, firstName: '', lastName: '',
  email: '', phone: '', country: '', specialRequests: '', termsAccepted: false,
};

export function todayISO() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function dateValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : NaN;
}
export function stayNights(checkIn: string, checkOut: string) {
  const nights = (dateValue(checkOut) - dateValue(checkIn)) / 86400000;
  return Number.isInteger(nights) && nights > 0 ? nights : 0;
}
export function addNights(checkIn: string, nights: number) {
  const time = dateValue(checkIn);
  return Number.isFinite(time) ? new Date(time + nights * 86400000).toISOString().slice(0, 10) : '';
}
export function roomPrice(room: RoomItem, language: Language) {
  return room.pricePerNight === null ? null : new Intl.NumberFormat(locales[language], {
    style: 'currency', currency: room.currency, minimumFractionDigits: 0, maximumFractionDigits: 2,
  }).format(room.pricePerNight);
}
export function bookingQuote(draft: BookingDraft, room?: RoomItem, offer?: ManagedOffer) {
  const nights = stayNights(draft.checkIn, draft.checkOut);
  const accommodation = draft.offerNights && offer ? offer.price : room && room.pricePerNight !== null && nights ? room.pricePerNight * nights : null;
  const surf = SURF_ADDONS.find(addon => addon.id === draft.surfAddon)?.price ?? null;
  return { nights, accommodation, surf, total: (!draft.offerNights || !!offer) && accommodation !== null && surf !== null ? accommodation + surf : null };
}
export function bookingError(draft: BookingDraft, room?: RoomItem, today = todayISO(), offer?: ManagedOffer) {
  if (!stayNights(draft.checkIn, draft.checkOut) || draft.checkIn < today) return 'Choose valid future arrival and departure dates.';
  if (!Number.isInteger(draft.adults) || draft.adults < 1 || !Number.isInteger(draft.children) || draft.children < 0) return 'Please check the guest count.';
  if (!room) return 'Choose a room or apartment.';
  if (draft.offerId && (!offer || !offer.published || offer.nights !== draft.offerNights || (offer.roomIds.length > 0 && !offer.roomIds.includes(room.id)))) return 'This offer is no longer available for the selected room. Remove the offer or choose another room.';
  if (room.maxGuests && draft.adults + draft.children > room.maxGuests) return 'Your party exceeds this accommodation’s capacity. Please choose another room or contact us.';
  if (draft.offerNights && stayNights(draft.checkIn, draft.checkOut) !== draft.offerNights) return 'The dates must match the selected offer duration, or remove the offer.';
  return null;
}

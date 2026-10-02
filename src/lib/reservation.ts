import type { BookingDraft, RoomItem } from '../types';
import { SURF_ADDONS } from '../data/accommodations';
import { bookingQuote } from './booking';

export function reservationPayload(draft: BookingDraft, room: RoomItem) {
  const quote = bookingQuote(draft, room);
  const amount = (value: number | null) => value === null ? 'To be confirmed' : `${room.currency} ${value}`;
  const offer = draft.offerNights ? `${draft.offerNights} nights + optional surf — price and inclusions to be confirmed` : 'None';
  return {
    guest_name: `${draft.firstName} ${draft.lastName}`.trim(), guest_email: draft.email,
    guest_phone: draft.phone, country: draft.country, check_in: draft.checkIn, check_out: draft.checkOut,
    nights: quote.nights, adults: draft.adults, children: draft.children, rooms: 1,
    room_id: room.id, room_name: room.name, room_total: amount(quote.accommodation),
    surf_package: SURF_ADDONS.find(addon => addon.id === draft.surfAddon)!.label,
    surf_cost: amount(quote.surf), guest1_surf: 'Not assigned', guest2_surf: 'Not assigned',
    extras: 'None', extras_total: amount(0), grand_total: amount(quote.total),
    deposit: 'To be confirmed', flight_eta: 'Not provided', offer,
    special_requests: `${draft.specialRequests || 'None'}\nStay offer: ${offer}`,
  };
}

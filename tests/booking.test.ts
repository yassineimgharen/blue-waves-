import assert from 'node:assert/strict';
import test from 'node:test';
import { ACCOMMODATIONS, SURF_ADDONS } from '../src/data/accommodations';
import { emptyBooking, bookingQuote, bookingError, addNights, stayNights, roomPrice } from '../src/lib/booking';
import { reservationPayload } from '../src/lib/reservation';

const room = { ...ACCOMMODATIONS[0], pricePerNight: 120, maxGuests: 2 };
const draft = { ...emptyBooking, roomId: room.id, checkIn: '2027-03-27', checkOut: '2027-03-30' };

test('stay-only quote uses the shared room rate and adds no surf fee', () => {
  assert.deepEqual(bookingQuote(draft, room), { nights: 3, accommodation: 360, surf: 0, total: 360 });
  assert.equal(bookingError(draft, room, '2027-01-01'), null);
  assert.equal(roomPrice(room, 'fr'), '120 €');
});
test('unknown room, offer and surf prices stay unpriced rather than becoming zero', () => {
  assert.equal(bookingQuote(draft, { ...room, pricePerNight: null }).total, null);
  assert.equal(bookingQuote({ ...draft, offerNights: 3 }, room).total, null);
  for (const addon of SURF_ADDONS.filter(item => item.id !== 'none')) {
    const quote = bookingQuote({ ...draft, surfAddon: addon.id }, room);
    assert.equal(quote.surf, null);
    assert.equal(quote.total, null);
    assert.equal(quote.accommodation, 360);
  }
});
test('date math rejects invalid dates and remains correct across daylight-saving boundaries', () => {
  assert.equal(stayNights('2027-03-27', '2027-03-30'), 3);
  assert.equal(stayNights('2027-02-30', '2027-03-03'), 0);
  assert.equal(stayNights('2027-03-30', '2027-03-27'), 0);
  assert.equal(stayNights('', ''), 0);
  assert.equal(addNights('2027-12-30', 4), '2028-01-03');
});
test('guest capacity, room selection, past dates and offer duration are validated', () => {
  assert.ok(bookingError({ ...draft, adults: 3 }, room, '2027-01-01'));
  assert.ok(bookingError({ ...draft, adults: NaN }, room, '2027-01-01'));
  assert.ok(bookingError(draft, undefined, '2027-01-01'));
  assert.ok(bookingError(draft, room, '2027-04-01'));
  assert.ok(bookingError({ ...draft, offerNights: 7 }, room, '2027-01-01'));
});
test('reservation payload preserves selected room, guests, optional surf and unpriced offer', () => {
  const payload = reservationPayload({ ...draft, surfAddon: 'lesson', offerNights: 3, firstName: 'Guest' }, room);
  assert.equal(payload.room_id, room.id);
  assert.equal(payload.room_total, 'EUR 360');
  assert.equal(payload.surf_package, 'Surf Lesson');
  assert.equal(payload.grand_total, 'To be confirmed');
  assert.equal(payload.deposit, 'To be confirmed');
  assert.match(payload.special_requests, /3 nights/);
});

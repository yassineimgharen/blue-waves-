import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getTranslator, translations, formatDate } from '../src/i18n/translations';
import { ACCOMMODATIONS, SURF_ADDONS, STAY_SURF_OFFERS } from '../src/data/accommodations';
import { emptyBooking } from '../src/lib/booking';
import { HomeView } from '../src/views/HomeView';
import { StayView } from '../src/views/StayView';
import { OffersView } from '../src/views/OffersView';
import { RoomDetailView } from '../src/views/RoomDetailView';
import { BookingView } from '../src/views/BookingView';
import { Footer } from '../src/components/Footer';
import { ConciergeModal } from '../src/components/ConciergeModal';

const noop = () => {};
const escape = (text: string) => renderToStaticMarkup(<>{text}</>);
const props = { onNavigate: noop, onOpenConcierge: noop, onBook: noop, onSearch: noop, onOffer: noop };

test('all supported languages have complete, nonempty catalogs', () => {
  for (const language of ['en', 'fr', 'ar'] as const) {
    assert.deepEqual(Object.keys(translations[language]), Object.keys(translations.en));
    for (const value of Object.values(translations[language])) assert.ok(value.trim());
  }
});

test('all live accommodation data, offers and optional surf labels have translations', () => {
  const phrases = ACCOMMODATIONS.flatMap(room => [room.name, room.tag!, room.description, room.capacity, room.bedType, ...room.features]);
  phrases.push(...SURF_ADDONS.map(item => item.label), ...STAY_SURF_OFFERS.map(item => item.title));
  for (const phrase of phrases) assert.ok(Object.hasOwn(translations.en, phrase), `Missing: ${phrase}`);
});

for (const language of ['en', 'fr', 'ar'] as const) {
  test(`${language}: current views and dialogs display localized accommodation content`, () => {
    const t = getTranslator(language);
    const cases: [React.ReactNode, string[]][] = [
      [<HomeView {...props} language={language} />, ['Feel at Home.', 'Rooms & Apartments', 'Room + Surf Offers']],
      [<StayView language={language} onBook={noop} />, ['Rooms & Apartments', 'Can I book accommodation without surf?']],
      [<OffersView language={language} onChoose={noop} />, ['3 Nights + Surf', '4 Nights + Surf', '7 Nights + Surf', 'Price on request']],
      [<RoomDetailView room={ACCOMMODATIONS[0]} language={language} onBook={noop} />, ['Book Now', 'Bed details to be confirmed']],
      [<BookingView {...props} language={language} draft={emptyBooking} onChange={noop} />, ['Add Surf to Your Stay', 'Guest Details', 'Stay Only', 'To be confirmed']],
      [<Footer onNavigate={noop} language={language} />, ['Subscribe', 'Privacy Policy']],
      [<ConciergeModal isOpen onClose={noop} language={language} />, ['Lodge Concierge', 'Welcome to Blue Wave Lodge. How can we help with your room, apartment or stay?']],
    ];
    for (const [element, phrases] of cases) {
      const html = renderToStaticMarkup(element);
      for (const phrase of phrases) assert.ok(html.includes(escape(t(phrase))), `Missing ${language}: ${phrase}`);
    }
  });
  test(`${language}: booking has no preselected surf or fabricated prices`, () => {
    const html = renderToStaticMarkup(<BookingView {...props} language={language} draft={emptyBooking} onChange={noop} />);
    assert.ok(html.includes('value="none" selected=""'));
    assert.ok(!html.includes('€2035'));
    assert.ok(!html.includes('amara.svensson'));
    assert.ok(html.includes('name="checkIn"'));
    assert.ok(html.includes('name="roomId"'));
  });
}

test('date summaries use the selected locale without changing stored dates', () => {
  assert.equal(formatDate('2026-11-08', 'fr'), '08/11/2026');
  assert.equal(formatDate('', 'ar'), '');
});

import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getTranslator, translations, formatDate } from '../src/i18n/translations';
import { Language } from '../src/types';
import * as data from '../src/data/mockData';
import { HomeView } from '../src/views/HomeView';
import { StayView } from '../src/views/StayView';
import { PackagesView } from '../src/views/PackagesView';
import { BookingView } from '../src/views/BookingView';
import { Footer } from '../src/components/Footer';
import { PackageModal } from '../src/components/PackageModal';
import { ConciergeModal } from '../src/components/ConciergeModal';

const noop = () => {};
const escape = (text: string) => renderToStaticMarkup(<>{text}</>);
const props = { onNavigate: noop, onOpenPackage: noop, onOpenConcierge: noop };

test('all supported languages have complete, nonempty catalogs', () => {
  const keys = Object.keys(translations.en);
  for (const language of ['en', 'fr', 'ar'] as const) {
    assert.deepEqual(Object.keys(translations[language]), keys);
    for (const value of Object.values(translations[language])) assert.ok(value.trim());
    assert.equal(getTranslator(language)('Blue Wave Lodge'), 'Blue Wave Lodge');
  }
});

test('all guest-facing room, package, FAQ and editorial data has translations', () => {
  const fields = new Set([
    'name', 'title', 'badge', 'tag', 'description', 'features', 'capacity', 'size',
    'bedType', 'categoryTag', 'summary', 'highlights', 'detailedDescription',
    'headline', 'focus', 'spots', 'quiver', 'recommendedPackage', 'subtitle',
    'quote', 'location', 'packageTaken', 'desc', 'caption', 'question', 'answer', 'bullets',
  ]);
  function check(value: unknown, field = '') {
    if (Array.isArray(value)) return value.forEach(item => check(item, field));
    if (value && typeof value === 'object') {
      return Object.entries(value).forEach(([key, item]) => check(item, key));
    }
    if (typeof value === 'string' && fields.has(field)) {
      assert.ok(Object.hasOwn(translations.en, value), `Missing translation: ${value}`);
    }
  }
  check(data);
});

for (const language of ['en', 'fr', 'ar'] satisfies Language[]) {
  test(`${language}: all views, footer and modals render translated content`, () => {
    const t = getTranslator(language);
    const cases: [React.ReactNode, string[]][] = [
      [<HomeView {...props} language={language} />, [
        'Stay by the Ocean.', data.ROOMS_DATA[0].name,
        data.SURF_LEVELS_DATA['first-time'].description, data.TESTIMONIALS_DATA[0].quote,
      ]],
      [<StayView {...props} language={language} />, [
        'Stay Your Way.', data.ROOMS_DATA[0].description, data.FAQ_DATA[0].answer,
      ]],
      [<PackagesView {...props} language={language} />, [
        'Featured All-Inclusive Surf Packages', data.PACKAGES_DATA[0].title,
        data.PACKAGES_DATA[0].summary, data.FAQ_DATA[0].answer,
      ]],
      [<BookingView {...props} language={language} />, [
        'Reserve Your Ocean Stay', 'First Name *', 'Send Reservation Request', 'Sea View Balcony Suite',
        'Anchor Pt', 'Killers', 'Boilers', 'Imsouane', 'Tamri',
      ]],
      [<Footer onNavigate={noop} language={language} />, ['Subscribe', 'Privacy Policy', 'Your email address']],
      [<PackageModal pkg={data.PACKAGES_DATA[0]} onClose={noop} onBook={noop} language={language} />, [
        data.PACKAGES_DATA[0].title, data.PACKAGES_DATA[0].detailedDescription, 'Proceed to Booking',
      ]],
      [<ConciergeModal isOpen onClose={noop} language={language} />, [
        'Yassine • Surf Concierge', 'Type your question or request...',
        'Salam! Marhaban. I am Yassine, Head Surf Concierge at Blue Wave Lodge. How can I help customize your Taghazout Bay stay today?',
      ]],
    ];
    for (const [element, phrases] of cases) {
      const html = renderToStaticMarkup(element);
      for (const phrase of phrases) assert.ok(html.includes(escape(t(phrase))), `Missing ${language}: ${phrase}`);
    }
  });

  test(`${language}: booking values and pricing remain language-independent`, () => {
    const html = renderToStaticMarkup(<BookingView {...props} language={language} />);
    assert.ok(html.includes('value="Advanced Guiding" selected=""'));
    assert.ok(html.includes('value="SE" selected=""'));
    assert.ok(html.includes('value="2025-11-08"'));
    assert.ok(html.includes('€2035'));
    assert.ok(html.includes(escape(getTranslator(language)('Sea View Balcony Suite'))));
    const home = renderToStaticMarkup(<HomeView {...props} language={language} />);
    assert.ok(home.includes('value="Coaching" selected=""'));
  });
}

test('date summaries use the selected locale without changing the stored date', () => {
  assert.equal(formatDate('2025-11-08', 'fr'), '08/11/2025');
  assert.equal(formatDate('', 'ar'), '');
});

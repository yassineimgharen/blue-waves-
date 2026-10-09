import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SiteProvider, getSite, useSite } from '../src/cms/store';
import { useTranslator } from '../src/cms/useTranslator';
import { ManagedImage } from '../src/cms/ManagedImage';
function Probe() {
  const t = useTranslator('ar');
  return <div><h1>{t('Home')}</h1><p>{useSite().data.rooms[0]?.name}</p><ManagedImage src="/media/seed/example.jpg" alt="" /></div>;
}
test('server-rendered content, translation and image overrides are isolated per request', () => {
  const first = { ...getSite(), revision: 5, rooms: [], content: { Home: { en: 'First', fr: 'Premier', ar: 'الأول' } }, images: { 'example.jpg': '/media/seed/first.jpg' } };
  const second = { ...getSite(), revision: 6, rooms: [], content: { Home: { en: 'Second', fr: 'Deuxième', ar: 'الثاني' } }, images: { 'example.jpg': '/media/seed/second.jpg' } };
  const render = data => renderToStaticMarkup(<SiteProvider initialSite={data}><Probe /></SiteProvider>);
  const html1 = render(first), html2 = render(second), html3 = render(first);
  assert.ok(html1.includes('الأول') && html1.includes('/media/seed/first.jpg'));
  assert.ok(html2.includes('الثاني') && html2.includes('/media/seed/second.jpg'));
  assert.equal(html1, html3);
  assert.ok(!html1.includes('Azemmour'), 'SSR must not fall back to seeded inventory');
});

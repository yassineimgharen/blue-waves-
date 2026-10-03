import { useSyncExternalStore } from 'react';
import { ACCOMMODATIONS, ROOM_GROUPS, STAY_SURF_OFFERS } from '../data/accommodations';
import { setContentOverrides } from '../i18n/translations';
import type { SiteData } from './types';
const initial: SiteData = {
  revision: 0, rooms: ACCOMMODATIONS.map(r => ({ ...r, published: true })),
  categories: ROOM_GROUPS.map((g, i) => ({ id: `category-${i + 1}`, label: g.label })),
  offers: STAY_SURF_OFFERS.map(o => ({ ...o, published: true, description: 'Room or apartment of your choice, subject to availability.', inclusions: 'Optional surf service — selection and schedule to be confirmed.', currency: 'EUR', image: '', roomIds: [] })),
  content: {}, images: {}, contacts: { reservationEmail: 'reservation@bluewavelodge.com', contactEmail: 'contact@bluewavelodge.com', phone: '+212 696985757', secondPhone: '+212 696991149' },
};
let snapshot = { data: initial, loaded: false, error: '' };
const listeners = new Set<() => void>();
let pending: Promise<void> | null = null;
export const useSite = () => useSyncExternalStore(callback => { listeners.add(callback); return () => { listeners.delete(callback); }; }, () => snapshot, () => snapshot);
export const getSite = () => snapshot.data;
export function refreshSite() {
  if (pending) return pending;
  pending = (async () => {
    try {
      const response = await fetch('/api/site', { cache: 'no-store', headers: snapshot.loaded ? { 'If-None-Match': `"site-${snapshot.data.revision}"` } : {} });
      if (response.status === 304) return;
      if (!response.ok) throw new Error('Website content is temporarily unavailable. Please try again.');
      const data: SiteData = await response.json();
      setContentOverrides(data.content);
      snapshot = { data, loaded: true, error: '' };
    } catch (error) {
      // Never fall back to the bundled inventory after a CMS failure: it could reveal unpublished rooms.
      if (!snapshot.loaded) snapshot = { ...snapshot, error: error instanceof Error ? error.message : 'Unable to load the website.' };
    } finally { pending = null; listeners.forEach(listener => listener()); }
  })();
  return pending;
}
export function startSiteSync() {
  void refreshSite();
  const refresh = () => { if (document.visibilityState === 'visible') void refreshSite(); };
  const timer = window.setInterval(refresh, 10000);
  window.addEventListener('focus', refresh); document.addEventListener('visibilitychange', refresh);
  const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('lodge-content') : null;
  if (channel) channel.onmessage = refresh;
  return () => { clearInterval(timer); window.removeEventListener('focus', refresh); document.removeEventListener('visibilitychange', refresh); channel?.close(); };
}
export function announceSiteUpdate() {
  void refreshSite();
  if (typeof BroadcastChannel !== 'undefined') { const channel = new BroadcastChannel('lodge-content'); channel.postMessage('saved'); channel.close(); }
}
export function imageKey(src: string) {
  if (/^https?:/.test(src)) return src;
  return decodeURIComponent(src.split('/').pop()?.split('?')[0] ?? src).replace(/-[\w-]{8}(?=\.[^.]+$)/, '');
}
export function siteImage(src: string) { return snapshot.data.images[imageKey(src)] || src; }

import type { RoomItem } from '../types';
export interface ManagedRoom extends RoomItem { published: boolean; bathroom?: string; view?: string }
export interface ManagedOffer { id: string; title: string; nights: number; description: string; inclusions: string; price: number | null; currency: string; image: string; published: boolean; roomIds: string[] }
export interface SiteData {
  revision: number;
  rooms: ManagedRoom[];
  categories: { id: string; label: string }[];
  offers: ManagedOffer[];
  content: Record<string, { en: string; fr: string; ar: string }>;
  images: Record<string, string>;
  contacts: { reservationEmail: string; contactEmail: string; phone: string; secondPhone: string };
}

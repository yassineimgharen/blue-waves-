export type ScreenType = 'home' | 'stay' | 'offers' | 'booking' | 'room' | 'dining';

export type Language = 'en' | 'fr' | 'ar';

export interface RoomItem {
  id: string;
  name: string;
  pricePerNight: number | null;
  maxGuests?: number;
  currency: string;
  rating: number;
  reviewsCount?: number;
  category: ('rooms' | 'apartments' | 'sea-view' | 'pool-view' | 'couples' | 'families')[];
  image: string;
  badge?: string;
  tag?: string;
  description: string;
  features: string[];
  capacity: string;
  size: string;
  bedType: string;
  gallery?: { src: string; caption: string }[];
}

export interface PackageItem {
  id: string;
  title: string;
  categoryTag: string;
  isPopular?: boolean;
  price: number;
  currency: string;
  durationNights: number;
  durationDays: number;
  image: string;
  summary: string;
  highlights: string[];
  detailedDescription: string;
}

export interface StaySurfOffer {
  id: string;
  title: string;
  nights: number;
  image: string;
  roomIncluded: string;
  surfActivity: string;
  includes: string[];
  price: string;
  isPopular?: boolean;
}

export interface SurfLevel {
  levelNumber: string;
  title: string;
  headline: string;
  description: string;
  focus: string;
  spots: string;
  quiver: string;
  recommendedPackage: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'surf' | 'rooms' | 'pool' | 'lifestyle';
  image: string;
  span?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  packageTaken: string;
  initials: string;
  rating: number;
}

export type SurfAddon = 'none' | 'lesson' | 'session' | 'guiding' | 'rental';

export interface BookingDraft {
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  surfAddon: SurfAddon;
  offerNights: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
  termsAccepted: boolean;
}

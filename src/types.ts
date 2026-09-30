export type ScreenType = 'home' | 'stay' | 'packages' | 'booking';

export type Language = 'en' | 'fr' | 'ar';

export interface RoomItem {
  id: string;
  name: string;
  pricePerNight: number;
  rating: number;
  reviewsCount?: number;
  category: ('sea-view' | 'pool-view' | 'apartments' | 'couples' | 'families')[];
  image: string;
  badge?: string;
  tag?: string;
  description: string;
  features: string[];
  capacity: string;
  size: string;
  bedType: string;
}

export interface PackageItem {
  id: string;
  title: string;
  categoryTag: string;
  isPopular?: boolean;
  price: number;
  durationNights: number;
  durationDays: number;
  image: string;
  summary: string;
  highlights: string[];
  detailedDescription: string;
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

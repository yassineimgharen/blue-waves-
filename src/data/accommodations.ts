import type { RoomItem, SurfAddon } from '../types';
import { roomImages } from './roomImages';

// Verified names/categories and amenities: official bluewavelodge.com pages.
// See docs/accommodation-content.md for sources and outstanding owner details.
// No room prices or exact bed configurations were published in the pages available.
const standardNames = ['Ayour', 'Azemmur', 'Adrar', 'Titrit'];
const baseRooms: RoomItem[] = [
  ...standardNames.map((name): RoomItem => ({
    id: name.toLowerCase(), name, tag: 'Standard Double Studio',
    category: ['rooms'], pricePerNight: null, currency: 'EUR', rating: 0,
    image: '', description: 'An air-conditioned studio with a private kitchenette and bathroom for a comfortable stay in Imi Ouaddar.',
    capacity: 'Capacity to be confirmed', bedType: 'Bed details to be confirmed', size: 'Details to be confirmed',
    features: ['Air conditioning', 'Private kitchenette', 'Private bathroom'],
  })),
  ...['Tafukt', 'Aman'].map((name): RoomItem => ({
    id: name.toLowerCase(), name, tag: 'Sea View Balcony Room',
    category: ['rooms', 'sea-view'], pricePerNight: null, currency: 'EUR', rating: 0,
    image: '', description: 'A double room with a balcony overlooking the Atlantic Ocean.',
    capacity: 'Capacity to be confirmed', bedType: 'Bed details to be confirmed', size: 'Details to be confirmed',
    features: name === 'Tafukt' ? ['Sea View', 'Fridge', 'Microwave', 'Electric kettle', 'Kitchen utensils', 'Bathtub or shower', 'Towels', 'Toilet paper', 'Hair dryer', 'Dining table'] : ['Sea View'],
  })),
  {
    id: 'pool-view-room', name: 'Pool View Room', tag: 'Pool View Rooms',
    category: ['rooms', 'pool-view'], pricePerNight: null, currency: 'EUR', rating: 0,
    image: '', description: 'A comfortable room overlooking the lodge pool.',
    capacity: 'Capacity to be confirmed', bedType: 'Bed details to be confirmed', size: 'Details to be confirmed',
    features: ['Pool view'],
  },
  {
    id: 'amlal', name: 'Amlal', tag: 'Equipped Apartment',
    category: ['apartments', 'families'], pricePerNight: null, currency: 'EUR', rating: 0,
    image: '', description: 'An equipped ocean-view apartment for families or friends, accommodating four to six guests.',
    capacity: '4–6 Guests', maxGuests: 6, bedType: 'Sofa bed; other beds to be confirmed', size: 'Details to be confirmed',
    features: ['Fridge', 'Air conditioning', 'Oven', 'Kitchen utensils', 'Bathtub or shower', 'Coffee machine', 'Kitchenette', 'Electric kettle', 'Dining table', 'Outdoor dining area', 'Washing machine', 'Sofa bed', 'Dishwasher'],
  },
];

export const ACCOMMODATIONS: RoomItem[] = baseRooms.map(room => {
  const gallery = roomImages[room.id] ?? [];
  return { ...room, image: gallery[0]?.src ?? '', gallery };
});

export const SURF_ADDONS: { id: SurfAddon; label: string; price: number | null }[] = [
  { id: 'none', label: 'Stay Only', price: 0 },
  { id: 'lesson', label: 'Surf Lesson', price: null },
  { id: 'session', label: 'Surf Session', price: null },
  { id: 'guiding', label: 'Surf Guiding', price: null },
  { id: 'rental', label: 'Equipment Rental', price: null },
];

// Durations requested by the owner; inclusions and prices are deliberately unset.
export const STAY_SURF_OFFERS = [
  { id: 'stay-surf-3', nights: 3, title: '3 Nights + Surf', price: null },
  { id: 'stay-surf-4', nights: 4, title: '4 Nights + Surf', price: null },
  { id: 'stay-surf-7', nights: 7, title: '7 Nights + Surf', price: null },
] as const;

import type { RoomItem, SurfAddon } from '../types';
import { roomImages } from './roomImages';

const baseRooms: RoomItem[] = [
  // Double Standard
  ...['Azemmour', 'Titrit', 'Tawja', 'Adrar', 'Ayour'].map((name): RoomItem => ({
    id: name.toLowerCase(), name, tag: 'Double Standard',
    category: ['rooms'], pricePerNight: null, currency: 'EUR', rating: 0,
    image: '', description: 'An air-conditioned studio with a private kitchenette and bathroom for a comfortable stay in Imi Ouaddar.',
    capacity: 'Capacity to be confirmed', bedType: 'Bed details to be confirmed', size: 'Details to be confirmed',
    features: ['Air conditioning', 'Private kitchenette', 'Private bathroom'],
  })),
  // Vue Piscine
  ...['Islman', 'Ajdig'].map((name): RoomItem => ({
    id: name.toLowerCase(), name, tag: 'Pool-view room',
    category: ['rooms', 'pool-view'], pricePerNight: null, currency: 'EUR', rating: 0,
    image: '', description: 'A comfortable room with a view over the lodge pool.',
    capacity: 'Capacity to be confirmed', bedType: 'Bed details to be confirmed', size: 'Details to be confirmed',
    features: ['Pool view', 'Air conditioning', 'Private bathroom'],
  })),
  // Vue sur Mer
  {
    id: 'tafoukt', name: 'Tafoukt', tag: 'Sea-view room',
    category: ['rooms', 'sea-view'], pricePerNight: null, currency: 'EUR', rating: 0,
    image: '', description: 'A double room with a balcony overlooking the Atlantic Ocean.',
    capacity: 'Capacity to be confirmed', bedType: 'Bed details to be confirmed', size: 'Details to be confirmed',
    features: ['Sea View', 'Fridge', 'Microwave', 'Electric kettle', 'Kitchen utensils', 'Bathtub or shower', 'Towels', 'Toilet paper', 'Hair dryer', 'Dining table'],
  },
  {
    id: 'aman', name: 'Aman', tag: 'Sea-view room',
    category: ['rooms', 'sea-view'], pricePerNight: null, currency: 'EUR', rating: 0,
    image: '', description: 'A double room with a balcony overlooking the Atlantic Ocean.',
    capacity: 'Capacity to be confirmed', bedType: 'Bed details to be confirmed', size: 'Details to be confirmed',
    features: ['Sea View', 'Air conditioning', 'Private bathroom'],
  },
  // Appartement
  {
    id: 'amlal', name: 'Amlal', tag: 'Apartment',
    category: ['apartments', 'families'], pricePerNight: null, currency: 'EUR', rating: 0,
    image: '', description: 'An equipped ocean-view apartment for families or friends, accommodating four to six guests.',
    capacity: '4–6 Guests', bedType: 'Sofa bed; other beds to be confirmed', size: 'Details to be confirmed',
    features: ['Fridge', 'Air conditioning', 'Oven', 'Kitchen utensils', 'Bathtub or shower', 'Coffee machine', 'Kitchenette', 'Electric kettle', 'Dining table', 'Outdoor dining area', 'Washing machine', 'Sofa bed', 'Dishwasher'],
  },
];

export const ACCOMMODATIONS: RoomItem[] = baseRooms.map(room => {
  const gallery = roomImages[room.id] ?? [];
  return { ...room, image: gallery[0]?.src ?? '', gallery };
});

export const ROOM_GROUPS = [
  { label: 'Double Standard', ids: ['azemmour', 'titrit', 'tawja', 'adrar', 'ayour'] },
  { label: 'Pool-view room',     ids: ['islman', 'ajdig'] },
  { label: 'Sea-view room',     ids: ['tafoukt', 'aman'] },
  { label: 'Apartment',     ids: ['amlal'] },
] as const;

export const SURF_ADDONS: { id: SurfAddon; label: string; price: number | null }[] = [
  { id: 'none',    label: 'Stay Only',         price: 0    },
  { id: 'lesson',  label: 'Surf Lesson',        price: null },
  { id: 'session', label: 'Surf Session',       price: null },
  { id: 'guiding', label: 'Surf Guiding',       price: null },
  { id: 'rental',  label: 'Equipment Rental',   price: null },
];

export const STAY_SURF_OFFERS = [
  { id: 'stay-surf-3', nights: 3, title: '3 Nights + Surf', price: null },
  { id: 'stay-surf-4', nights: 4, title: '4 Nights + Surf', price: null },
  { id: 'stay-surf-7', nights: 7, title: '7 Nights + Surf', price: null },
] as const;

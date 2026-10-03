import React from 'react';
import { Bath, BedDouble, Check, Coffee, CookingPot, Expand, Eye, Refrigerator, Sofa, Users, Utensils, WashingMachine, Waves, Wind, type LucideIcon } from 'lucide-react';
import { Language, RoomItem } from '../types';
import { getTranslator } from '../i18n/translations';
import { roomPrice } from '../lib/booking';
import { ACCOMMODATIONS } from '../data/accommodations';
import { RoomGallery } from '../components/RoomGallery';
import { RoomCard, primaryButton } from '../components/RoomCard';

const amenityIcons: Record<string, LucideIcon> = {
  'Air conditioning': Wind, 'Private kitchenette': CookingPot, Kitchenette: CookingPot,
  'Private bathroom': Bath, 'Bathtub or shower': Bath, Fridge: Refrigerator,
  'Sea View': Waves, 'Pool view': Waves, 'Coffee machine': Coffee, 'Electric kettle': Coffee,
  'Kitchen utensils': Utensils, 'Dining table': Utensils, 'Outdoor dining area': Utensils,
  'Washing machine': WashingMachine, Dishwasher: WashingMachine, 'Sofa bed': Sofa,
  Microwave: CookingPot, Oven: CookingPot,
};

export function RoomDetailView({ room, language, onBook }: { room: RoomItem; language: Language; onBook: (room: RoomItem) => void }) {
  const t = getTranslator(language);
  const view = room.category.includes('sea-view') || room.id === 'amlal' ? 'Sea View' : room.category.includes('pool-view') ? 'Pool view' : 'Standard';
  const bathroom = room.features.includes('Private bathroom') ? 'Private bathroom' : room.features.includes('Bathtub or shower') ? 'Bathtub or shower' : 'Details to be confirmed';
  const facts = [
    { label: 'Capacity', value: room.capacity, Icon: Users },
    { label: 'Bed Configuration', value: room.bedType, Icon: BedDouble },
    { label: 'Bathroom', value: bathroom, Icon: Bath },
    { label: 'View', value: view, Icon: Eye },
    ...(room.size && room.size !== 'Details to be confirmed' ? [{ label: 'Room size', value: room.size, Icon: Expand }] : []),
  ];
  const related = ACCOMMODATIONS.filter(item => item.id !== room.id)
    .sort((a, b) => Number(b.tag === room.tag) - Number(a.tag === room.tag)).slice(0, 3);
  return <section className="max-w-[1360px] mx-auto px-4 md:px-12 py-8 md:py-12">
    <a href="#stay" className="text-[#006194] dark:text-[#93ccff] text-sm hover:underline">{t('Back to Rooms & Apartments')}</a>
    <header className="mt-8 mb-8 md:mb-10">
      <p className="text-xs font-semibold tracking-wider text-[#006194] dark:text-[#93ccff] mb-3">{t(room.tag ?? 'Rooms & Apartments')} · {t('Imi Ouaddar, Morocco')}</p>
      <h1 className="font-serif-display text-4xl sm:text-6xl">{t(room.name)}</h1>
    </header>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      <div className="lg:col-span-8 min-w-0">
        <RoomGallery key={room.id} name={room.name} photos={room.gallery ?? []} language={language} />
        <div className="mt-9">
          <h2 className="font-serif-display text-3xl mb-4">{t('Your stay at Blue Wave Lodge')}</h2>
          <p className="leading-relaxed text-[#3f4850] dark:text-[#cadced]">{t(room.description)}</p>
          <dl className="grid sm:grid-cols-2 gap-4 my-8">
            {facts.map(({ label, value, Icon }) => <div key={label} className="flex items-start gap-3 rounded-xl bg-[#ebf5ff]/60 dark:bg-white/5 p-4">
              <Icon aria-hidden="true" size={21} className="shrink-0 mt-1 text-[#006194] dark:text-[#93ccff]" />
              <div><dt className="text-xs text-[#3f4850] dark:text-[#cadced] mb-1">{t(label)}</dt><dd className="text-sm font-semibold">{t(value)}</dd></div>
            </div>)}
          </dl>
          <div className="border-t border-[#bfc7d2]/30 pt-8">
            <h2 className="font-serif-display text-3xl mb-6">{t('Included Room Amenities')}</h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-5">{room.features.map(feature => {
              const Icon = amenityIcons[feature] ?? Check;
              return <li key={feature} className="flex items-center gap-3 text-sm"><Icon aria-hidden="true" size={20} className="shrink-0 text-[#006194] dark:text-[#93ccff]" />{t(feature)}</li>;
            })}</ul>
            {!room.features.length && <p>{t('Amenities to be confirmed')}</p>}
          </div>
        </div>
      </div>
      <aside className="lg:col-span-4 min-w-0 bg-white dark:bg-[#0b1d29] rounded-2xl p-6 md:p-8 border border-[#bfc7d2]/30 shadow-sm lg:sticky lg:top-36 flex flex-col gap-5">
        <div><p className="text-sm text-[#3f4850] dark:text-[#cadced] mb-2">{t('Price per night')}</p><p className="text-3xl font-serif-display text-[#006194] dark:text-[#93ccff]">{roomPrice(room, language) ?? t('Price on request')}</p></div>
        <div className="border-y border-[#bfc7d2]/20 py-4 flex items-center gap-3 text-sm"><Users aria-hidden="true" size={20} className="shrink-0" />{t(room.capacity)}</div>
        <button className={`${primaryButton} w-full py-3.5`} onClick={() => onBook(room)}>{t('Book Now')}</button>
        <p className="text-xs leading-relaxed text-[#3f4850] dark:text-[#cadced]">{t('Choose your dates and guests in the next step. The lodge will confirm availability and your final rate.')}</p>
        <div className="pt-4 border-t border-[#bfc7d2]/20"><p className="text-sm font-semibold mb-2">{t('Add Surf to Your Stay')}</p><p className="text-xs leading-relaxed text-[#675d4d] dark:text-[#d3c4b1]">{t('Accommodation comes first. Surf is always optional.')}</p><a href="#offers" className="inline-block mt-3 text-sm text-[#006194] dark:text-[#93ccff] hover:underline">{t('Room + Surf Offers')}</a></div>
      </aside>
    </div>
    <section className="mt-16 md:mt-24 border-t border-[#bfc7d2]/30 pt-10" aria-labelledby="related-rooms-title">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-7"><h2 id="related-rooms-title" className="font-serif-display text-3xl">{t('Explore other rooms')}</h2><a href="#stay" className="text-sm text-[#006194] dark:text-[#93ccff] hover:underline">{t('Rooms & Apartments')}</a></div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">{related.map(item => <RoomCard key={item.id} room={item} language={language} onBook={onBook} />)}</div>
    </section>
  </section>;
}

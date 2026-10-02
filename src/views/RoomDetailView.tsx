import React from 'react';
import { Language, RoomItem } from '../types';
import { getTranslator } from '../i18n/translations';
import { roomPrice } from '../lib/booking';
import { RoomGallery } from '../components/RoomGallery';
import { primaryButton, secondaryButton } from '../components/RoomCard';

export function RoomDetailView({ room, language, onBook }: { room: RoomItem; language: Language; onBook: (room: RoomItem) => void }) {
  const t = getTranslator(language);
  return <section className="max-w-[1360px] mx-auto px-4 md:px-12 py-12">
    <a href="#stay" className="text-[#006194] dark:text-[#93ccff] text-sm hover:underline">{t('Back to Rooms & Apartments')}</a>
    <h1 className="font-serif-display text-4xl sm:text-6xl mt-6 mb-8">{t(room.name)}</h1>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8"><RoomGallery key={room.id} name={room.name} photos={room.gallery ?? []} language={language} /></div>
      <aside className="lg:col-span-4 bg-white dark:bg-[#0b1d29] rounded-2xl p-6 border border-[#bfc7d2]/20 shadow-sm lg:sticky lg:top-36 flex flex-col gap-6">
        <p className="text-2xl font-bold text-[#006194] dark:text-[#93ccff]">{roomPrice(room, language) ?? t('Price on request')}{room.pricePerNight !== null && <span className="text-sm font-normal"> {t('/ night')}</span>}</p>
        <p className="text-sm leading-relaxed text-[#3f4850] dark:text-[#cadced]">{t(room.description)}</p>
        <dl className="text-sm space-y-3"><div><dt className="font-bold">{t('Capacity')}</dt><dd>{t(room.capacity)}</dd></div><div><dt className="font-bold">{t('Bed Configuration')}</dt><dd>{t(room.bedType)}</dd></div></dl>
        <div><h2 className="font-serif-display text-2xl mb-3">{t('Included Room Amenities')}</h2><ul className="space-y-2 text-sm">{room.features.map(feature => <li key={feature}>{t(feature)}</li>)}</ul>{!room.features.length && <p>{t('Amenities to be confirmed')}</p>}</div>
        <button className={primaryButton} onClick={() => onBook(room)}>{t('Book Now')}</button>
        <a className={`${secondaryButton} text-center`} href="#offers">{t('Room + Surf Offers')}</a>
        <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1]">{t('Accommodation comes first. Surf is always optional.')}</p>
      </aside>
    </div>
  </section>;
}

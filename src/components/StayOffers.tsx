import React from 'react';
import type { Language } from '../types';
import { STAY_SURF_OFFERS } from '../data/accommodations';
import { getTranslator } from '../i18n/translations';
import { primaryButton } from './RoomCard';

export function StayOffers({ language, onChoose }: { language: Language; onChoose: (nights: number) => void }) {
  const t = getTranslator(language);
  return <section id="stay-offers" className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-20 scroll-mt-32">
    <div className="max-w-[1360px] mx-auto px-4 md:px-12">
      <div className="text-center max-w-2xl mx-auto mb-12"><h2 className="font-serif-display text-3xl sm:text-5xl mb-4">{t('Room + Surf Offers')}</h2><p className="text-sm text-[#3f4850] dark:text-[#cadced]">{t('Choose your accommodation, then add surf if you wish. Offer prices and inclusions will be confirmed by the lodge.')}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{STAY_SURF_OFFERS.map(offer => <article key={offer.id} className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 shadow-sm border border-[#bfc7d2]/20 flex flex-col gap-4">
        <h3 className="font-serif-display text-2xl">{t(offer.title)}</h3>
        <p className="text-sm">{t('Room or apartment of your choice, subject to availability.')}</p>
        <p className="text-sm">{t('Optional surf service — selection and schedule to be confirmed.')}</p>
        <p className="font-bold text-[#006194] dark:text-[#93ccff]">{t('Price on request')}</p>
        <button onClick={() => onChoose(offer.nights)} className={`${primaryButton} mt-auto`}>{t('Request this offer')}</button>
      </article>)}</div>
    </div>
  </section>;
}

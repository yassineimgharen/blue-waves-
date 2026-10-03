import React from 'react';
import type { Language } from '../types';
import { useSite } from '../cms/store';
import { ManagedImage } from '../cms/ManagedImage';
import { getTranslator } from '../i18n/translations';
import { primaryButton } from './RoomCard';

export function StayOffers({ language, onChoose }: { language: Language; onChoose: (nights: number, offerId?: string) => void }) {
  const { data: { offers: STAY_SURF_OFFERS } } = useSite();
  const t = getTranslator(language);
  if (!STAY_SURF_OFFERS.length) return null;
  return <section id="stay-offers" className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-20 scroll-mt-32">
    <div className="max-w-[1360px] mx-auto px-4 md:px-12">
      <div className="text-center max-w-2xl mx-auto mb-12"><h2 className="font-serif-display text-3xl sm:text-5xl mb-4">{t('Room + Surf Offers')}</h2><p className="text-sm text-[#3f4850] dark:text-[#cadced]">{t('Choose your accommodation, then add surf if you wish. Offer prices and inclusions will be confirmed by the lodge.')}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{STAY_SURF_OFFERS.map(offer => <article key={offer.id} className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 shadow-sm border border-[#bfc7d2]/20 flex flex-col gap-4">
        <>{offer.image && <ManagedImage src={offer.image} alt={t(offer.title)} className="w-full aspect-video object-cover rounded-xl" />}</><h3 className="font-serif-display text-2xl">{t(offer.title)}</h3>
        <p className="text-sm">{t(offer.description)}</p>
        <p className="text-sm">{t(offer.inclusions)}</p>
        <p className="font-bold text-[#006194] dark:text-[#93ccff]">{offer.price === null ? t('Price on request') : new Intl.NumberFormat(language, { style: 'currency', currency: offer.currency }).format(offer.price)}</p>
        <button onClick={() => onChoose(offer.nights, offer.id)} className={`${primaryButton} mt-auto`}>{t('Request this offer')}</button>
      </article>)}</div>
    </div>
  </section>;
}

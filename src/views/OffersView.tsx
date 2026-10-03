import React from 'react';
import { Language } from '../types';
import { StayOffers } from '../components/StayOffers';
import { getTranslator } from '../i18n/translations';

export function OffersView({ language, onChoose }: { language: Language; onChoose: (nights: number, offerId?: string) => void }) {
  const t = getTranslator(language);
  return <><section className="bg-gradient-to-b from-[#e0f0ff] to-[#f6faff] dark:from-[#0b1d29] dark:to-[#071a26] px-4 md:px-12 py-16"><div className="max-w-[1360px] mx-auto"><h1 className="font-serif-display text-4xl sm:text-6xl mb-4">{t('Stay a Little Longer')}</h1><p className="max-w-2xl text-[#3f4850] dark:text-[#cadced]">{t('Accommodation comes first. Surf is always optional.')}</p></div></section><StayOffers language={language} onChoose={onChoose} /></>;
}

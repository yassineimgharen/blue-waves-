import React, { useState } from 'react';
import type { Language, RoomItem } from '../types';
import { ACCOMMODATIONS } from '../data/accommodations';
import { getTranslator } from '../i18n/translations';
import { RoomCard } from '../components/RoomCard';
import stayHero from '../images/8b778a3d-bf18-436b-985e-2af2c8bde503.jpeg';

const stayQuestions = [
  { question: 'Can I book accommodation without surf?', answer: 'Yes. All rooms and apartments can be requested without any surf service.' },
  { question: 'How do I confirm a room rate?', answer: 'Send your dates and guest count. The lodge will confirm the room rate and availability before your booking is finalized.' },
  { question: 'Can I add surf later?', answer: 'Yes. You can request a lesson, session, guiding or equipment rental. Prices and schedules are confirmed separately.' },
];

export function StayView({ language, onBook }: { language: Language; onBook: (room: RoomItem) => void }) {
  const t = getTranslator(language);
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const rooms = ACCOMMODATIONS.filter(room => activeCategory === 'all' || room.category.some(category => category === activeCategory));
  return <div className="flex flex-col w-full">
    <section className="relative w-full overflow-hidden min-h-[620px] md:min-h-[700px] flex items-end pb-16 bg-[#0b1d29] text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${stayHero}')` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29] via-[#0b1d29]/40 to-[#0b1d29]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d29]/80 via-transparent to-transparent" />
      <div className="relative z-10 max-w-[1360px] w-full mx-auto px-4 md:px-12 pt-32">
        <span className="text-xs uppercase tracking-widest text-[#d3c4b1]">{t('The Sanctuary • Taghazout Bay')}</span>
        <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl mt-4 mb-6">{t('Rooms & Apartments')}</h1>
        <p className="max-w-2xl text-lg text-white/90">{t('Find your place to stay in Imi Ouaddar. Choose a room or apartment, then make the stay your own.')}</p>
      </div>
    </section>
    <section className="max-w-[1360px] w-full mx-auto px-4 md:px-12 py-16">
      <div className="flex flex-wrap gap-3 mb-10">{[['all', 'All Accommodations'], ['rooms', 'Rooms'], ['apartments', 'Apartments'], ['sea-view', 'Sea View'], ['pool-view', 'Pool View Rooms']].map(([id, label]) => <button key={id} onClick={() => setActiveCategory(id)} aria-pressed={activeCategory === id} className={`rounded-full px-5 py-2 text-sm ${activeCategory === id ? 'bg-[#006194] text-white' : 'bg-[#ebf5ff] dark:bg-white/10'}`}>{t(label)}</button>)}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{rooms.map(room => <RoomCard key={room.id} room={room} language={language} onBook={onBook} />)}</div>
    </section>
      {/* FAQ Accordion Section */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/70 py-20">
        <div className="max-w-[960px] mx-auto px-4 md:px-12">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#675d4d] dark:text-[#d3c4b1]">
              {t("Peace of Mind")}
            </span>
            <h3 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-1">
              {t("Frequently Asked Questions")}
            </h3>
            <p className="text-xs md:text-sm text-[#3f4850] dark:text-[#cadced] mt-2 max-w-lg mx-auto">
              {t("Plan your accommodation and choose optional experiences at your own pace.")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {stayQuestions.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0b1d29] rounded-xl overflow-hidden shadow-sm border border-[#bfc7d2]/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-start flex items-center justify-between gap-4 font-serif-display text-lg text-[#0b1d29] dark:text-white hover:text-[#006194] transition-colors"
                  >
                    <span>{t(faq.question)}</span>
                    <span
                      className={`material-symbols-outlined text-[#006194] dark:text-[#93ccff] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-[#3f4850] dark:text-[#cadced] text-xs md:text-sm leading-relaxed border-t border-[#bfc7d2]/10 pt-4">
                      {t(faq.answer)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
  </div>;
}

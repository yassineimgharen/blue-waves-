import { ManagedImage } from '../cms/ManagedImage';
import React, { useState } from 'react';
import type { Language } from '../types';
import { getTranslator } from '../i18n/translations';

import img1 from '../images/rooftop-restau/18307f9d-30e6-4e68-9689-f7f8d75fb128.jpeg';
import img2 from '../images/rooftop-restau/1f266451-d0e2-49c6-a827-ade18abe81f3.jpeg';
import img3 from '../images/rooftop-restau/3a2ab73b-a4b9-49de-b7c2-d45f144cb59f.jpeg';
import img4 from '../images/rooftop-restau/49465fe7-5a5d-44d2-b65f-d325b33833d1.jpeg';
import img5 from '../images/rooftop-restau/5df0eaff-edb2-4d42-a8e1-8c4c2be9fc26.jpeg';
import img6 from '../images/rooftop-restau/6ce0ce79-9543-44a4-abbc-7f3706c85b03.jpeg';
import img7 from '../images/rooftop-restau/7efbbe20-615d-478b-bd44-1e15957f94fa.jpeg';
import img8 from '../images/rooftop-restau/7fa1e9c0-3eed-4469-a977-48c50d46dce9.jpeg';
import img9 from '../images/rooftop-restau/90dfa9bf-5a79-4789-8dc3-504b8e23eb9a.jpeg';
import img10 from '../images/rooftop-restau/99338eb5-4990-4649-ad6d-765e737b3535.jpeg';
import img11 from '../images/rooftop-restau/a0a35b8c-cbd9-4cb3-aa28-b1bc0d232bff.jpeg';
import img12 from '../images/rooftop-restau/a3d2ca1f-6f0a-4ca3-b264-81e4c04ebf12.jpeg';
import img13 from '../images/rooftop-restau/bac2b65c-72cd-4f31-abee-d38f8ec07493.jpeg';
import img14 from '../images/rooftop-restau/bfcd4adc-2e66-478a-ab8b-73074f3fb61e.jpeg';
import img15 from '../images/rooftop-restau/c7e4db71-83de-4e4f-ab07-7c1ea9ff2016.jpeg';
import img16 from '../images/rooftop-restau/e7334eda-ee3c-475d-9729-48b65b64a85d.jpeg';
import img17 from '../images/rooftop-restau/ebd6429a-4c2c-45d6-a14e-fe11fd6d6eaa.jpeg';
import img18 from '../images/rooftop-restau/ee5a9d81-1484-43e3-82ad-3f5f70709628.jpeg';

const ALL_PHOTOS = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18];
const ROOFTOP_PHOTOS = ALL_PHOTOS.slice(0, 9);
const RESTAURANT_PHOTOS = ALL_PHOTOS.slice(9);

interface Props { language: Language; onNavigate: (screen: any) => void; }

export const DiningView: React.FC<Props> = ({ language, onNavigate }) => {
  const t = getTranslator(language);
  const [lightbox, setLightbox] = useState<{ photos: string[]; idx: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'rooftop' | 'restaurant'>('rooftop');

  const open = (photos: string[], idx: number) => setLightbox({ photos, idx });
  const close = () => setLightbox(null);
  const prev = () => setLightbox(l => l ? { ...l, idx: (l.idx - 1 + l.photos.length) % l.photos.length } : null);
  const next = () => setLightbox(l => l ? { ...l, idx: (l.idx + 1) % l.photos.length } : null);

  const currentPhotos = activeTab === 'rooftop' ? ROOFTOP_PHOTOS : RESTAURANT_PHOTOS;

  return (
    <div className="flex flex-col w-full">

      {/* HERO */}
      <section className="relative w-full min-h-[480px] md:min-h-[560px] flex items-end pb-16 bg-[#0b1d29] text-white overflow-hidden">
        <div className="absolute inset-0">
          <ManagedImage src={img1} alt="Rooftop & Restaurant" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29] via-[#0b1d29]/50 to-[#0b1d29]/20" />
        </div>
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-12 w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md mb-4 text-white text-xs tracking-[0.15em] font-semibold uppercase">
            <span className="material-symbols-outlined text-[16px] text-[#89ceff]">restaurant</span>
            {t('Blue Wave Lodge')}
          </div>
          <h1 className="text-4xl sm:text-6xl text-white font-bold tracking-tight leading-tight mb-4">
            {t('Rooftop & Restaurant')}
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
            {t('Savour fresh Moroccan cuisine with panoramic Atlantic views from our rooftop terrace and restaurant.')}
          </p>
        </div>
      </section>

      {/* TAB SWITCHER */}
      <div className="sticky top-[104px] md:top-[112px] z-30 bg-[#f6faff]/95 dark:bg-[#0b1d29]/95 backdrop-blur-xl border-b border-[#bfc7d2]/20 shadow-sm">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 py-3 flex gap-3">
          <button
            onClick={() => setActiveTab('rooftop')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'rooftop' ? 'bg-[#006194] text-white shadow-sm' : 'bg-[#ebf5ff] dark:bg-white/10 text-[#3f4850] dark:text-[#cadced] hover:bg-[#d8ebfc]'}`}
          >
            <span className="material-symbols-outlined text-[18px]">deck</span>
            {t('Rooftop Terrace')}
          </button>
          <button
            onClick={() => setActiveTab('restaurant')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'restaurant' ? 'bg-[#006194] text-white shadow-sm' : 'bg-[#ebf5ff] dark:bg-white/10 text-[#3f4850] dark:text-[#cadced] hover:bg-[#d8ebfc]'}`}
          >
            <span className="material-symbols-outlined text-[18px]">restaurant</span>
            {t('Restaurant')}
          </button>
        </div>
      </div>

      {/* ROOFTOP SECTION */}
      {activeTab === 'rooftop' && (
        <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-[#006194] dark:text-[#93ccff] text-xs font-bold uppercase tracking-[0.2em]">
                <span className="w-6 h-[1.5px] bg-[#006194] dark:bg-[#93ccff]"></span>
                {t('Panoramic Views')}
              </div>
              <h2 className="text-3xl sm:text-5xl text-[#0b1d29] dark:text-white font-bold tracking-tight leading-tight">
                {t('Rooftop Terrace')}
              </h2>
              <p className="text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                {t('Unwind on our panoramic rooftop terrace with 360° views over the Atlantic Ocean and the Imi Ouaddar coastline. The perfect spot for sunrise yoga, sunset cocktails, and starlit evenings.')}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: 'water', label: t('Ocean Views') },
                  { icon: 'wb_sunny', label: t('Sunrise Yoga') },
                  { icon: 'local_bar', label: t('Sunset Drinks') },
                  { icon: 'star', label: t('Starlit Evenings') },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#ebf5ff] dark:bg-white/5 border border-[#bfc7d2]/20">
                    <span className="material-symbols-outlined text-[20px] text-[#006194] dark:text-[#93ccff]">{item.icon}</span>
                    <span className="text-sm font-medium text-[#0b1d29] dark:text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] cursor-pointer group" onClick={() => open(ROOFTOP_PHOTOS, 0)}>
              <ManagedImage src={ROOFTOP_PHOTOS[0]} alt="Rooftop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[48px]">fullscreen</span>
              </div>
            </div>
          </div>

          {/* Rooftop Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ROOFTOP_PHOTOS.map((photo, i) => (
              <div key={i} onClick={() => open(ROOFTOP_PHOTOS, i)} className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm border border-[#bfc7d2]/20 ${i === 0 ? 'col-span-2 row-span-2 h-80' : 'h-44'}`}>
                <ManagedImage src={photo} alt={`Rooftop ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#0b1d29]/0 group-hover:bg-[#0b1d29]/30 transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[32px] opacity-0 group-hover:opacity-100 transition-opacity">zoom_in</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RESTAURANT SECTION */}
      {activeTab === 'restaurant' && (
        <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] cursor-pointer group order-2 lg:order-1" onClick={() => open(RESTAURANT_PHOTOS, 0)}>
              <ManagedImage src={RESTAURANT_PHOTOS[0]} alt="Restaurant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[48px]">fullscreen</span>
              </div>
            </div>
            <div className="space-y-5 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-[#006194] dark:text-[#93ccff] text-xs font-bold uppercase tracking-[0.2em]">
                <span className="w-6 h-[1.5px] bg-[#006194] dark:bg-[#93ccff]"></span>
                {t('Fresh & Local')}
              </div>
              <h2 className="text-3xl sm:text-5xl text-[#0b1d29] dark:text-white font-bold tracking-tight leading-tight">
                {t('Restaurant')}
              </h2>
              <p className="text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                {t('Our restaurant serves fresh Moroccan cuisine prepared daily with local ingredients. From hearty surfer breakfasts to traditional tagines and freshly caught Atlantic fish.')}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: 'breakfast_dining', label: t('Berber Breakfast') },
                  { icon: 'set_meal', label: t('Fresh Atlantic Fish') },
                  { icon: 'soup_kitchen', label: t('Moroccan Tagines') },
                  { icon: 'local_cafe', label: t('Mint Tea') },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#ebf5ff] dark:bg-white/5 border border-[#bfc7d2]/20">
                    <span className="material-symbols-outlined text-[20px] text-[#006194] dark:text-[#93ccff]">{item.icon}</span>
                    <span className="text-sm font-medium text-[#0b1d29] dark:text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Restaurant Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {RESTAURANT_PHOTOS.map((photo, i) => (
              <div key={i} onClick={() => open(RESTAURANT_PHOTOS, i)} className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm border border-[#bfc7d2]/20 ${i === 0 ? 'col-span-2 row-span-2 h-80' : 'h-44'}`}>
                <ManagedImage src={photo} alt={`Restaurant ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#0b1d29]/0 group-hover:bg-[#0b1d29]/30 transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[32px] opacity-0 group-hover:opacity-100 transition-opacity">zoom_in</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="w-full bg-gradient-to-br from-[#006194] via-[#00628d] to-[#0b1d29] text-white py-20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">{t('Ready to Stay with Us?')}</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            {t('Book your room and enjoy our rooftop terrace and restaurant during your stay.')}
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="px-8 py-4 rounded-lg bg-white text-[#006194] font-bold text-sm hover:bg-[#f6faff] transition-all shadow-xl"
          >
            {t('Book Your Stay')}
          </button>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center" onClick={close}>
          <button onClick={close} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10">
            <span className="material-symbols-outlined">close</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <ManagedImage
            src={lightbox.photos[lightbox.idx]}
            alt=""
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs">{lightbox.idx + 1} / {lightbox.photos.length}</p>
        </div>
      )}
    </div>
  );
};

import { ManagedImage } from '../cms/ManagedImage';
import React, { useState, useEffect } from 'react';
import { Language, RoomItem } from '../types';
import { getTranslator } from '../i18n/translations';
import { roomPrice } from '../lib/booking';
import { primaryButton } from './RoomCard';

const AMENITY_ICONS: Record<string, string> = {
  'Sea View': 'water',
  'Air conditioning': 'ac_unit',
  'Private kitchenette': 'kitchen',
  'Kitchenette': 'kitchen',
  'Private bathroom': 'bathtub',
  'Bathtub or shower': 'bathtub',
  'Fridge': 'kitchen',
  'Microwave': 'microwave',
  'Electric kettle': 'coffee_maker',
  'Kitchen utensils': 'restaurant',
  'Towels': 'dry_cleaning',
  'Toilet paper': 'wc',
  'Hair dryer': 'air',
  'Dining table': 'table_restaurant',
  'Outdoor dining area': 'deck',
  'Pool view': 'pool',
  'Oven': 'oven_gen',
  'Coffee machine': 'coffee_maker',
  'Washing machine': 'local_laundry_service',
  'Sofa bed': 'weekend',
  'Dishwasher': 'dishwasher',
  'WiFi': 'wifi',
};

function getIcon(feature: string) {
  return AMENITY_ICONS[feature] ?? 'check_circle';
}

export function RoomDetailModal({ room, language, onClose, onBook }: {
  room: RoomItem;
  language: Language;
  onClose: () => void;
  onBook: (room: RoomItem) => void;
}) {
  const t = getTranslator(language);
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const gallery = room.gallery ?? [];
  const hasGallery = gallery.length > 0;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (lightbox) setLightbox(false); else onClose(); }
      if (e.key === 'ArrowRight') setImgIdx(i => (i + 1) % Math.max(gallery.length, 1));
      if (e.key === 'ArrowLeft') setImgIdx(i => (i - 1 + Math.max(gallery.length, 1)) % Math.max(gallery.length, 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, gallery.length, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const prev = () => setImgIdx(i => (i - 1 + Math.max(gallery.length, 1)) % Math.max(gallery.length, 1));
  const next = () => setImgIdx(i => (i + 1) % Math.max(gallery.length, 1));

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-[#0b1d29]/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        <div className="pointer-events-auto w-full sm:max-w-3xl max-h-[95dvh] sm:max-h-[90vh] bg-white dark:bg-[#0b1d29] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#bfc7d2]/20">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#bfc7d2]/20 shrink-0">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#675d4d] dark:text-[#d3c4b1] font-bold">{t(room.tag ?? 'Room')}</p>
              <h2 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold">{t(room.name)}</h2>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#ebf5ff] dark:bg-white/10 flex items-center justify-center text-[#3f4850] dark:text-[#cadced] hover:bg-[#d8ebfc] transition-colors">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1">

            {/* Gallery */}
            <div className="relative bg-[#ebf5ff] dark:bg-white/5">
              {hasGallery ? (
                <>
                  <div className="relative h-64 sm:h-80 overflow-hidden cursor-zoom-in" onClick={() => setLightbox(true)}>
                    <ManagedImage
                      src={gallery[imgIdx].src}
                      alt={gallery[imgIdx].caption ?? t(room.name)}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29]/50 to-transparent" />
                    {gallery[imgIdx].caption && (
                      <p className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">{gallery[imgIdx].caption}</p>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); setLightbox(true); }} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                    </button>
                    {gallery.length > 1 && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                      </>
                    )}
                  </div>
                  {gallery.length > 1 && (
                    <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none">
                      {gallery.map((img, i) => (
                        <button key={i} onClick={() => setImgIdx(i)} className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === imgIdx ? 'border-[#006194]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                          <ManagedImage src={img.src} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center gap-2 text-[#675d4d] dark:text-[#d3c4b1]">
                  <span className="material-symbols-outlined text-[40px] opacity-40">photo_camera</span>
                  <p className="text-sm">{t('Room photos coming soon')}</p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="px-6 py-6 flex flex-col gap-6">

              {/* Price + quick facts */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#ebf5ff] dark:bg-white/5 border border-[#bfc7d2]/20">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">{t('Price')}</p>
                  <p className="font-serif-display text-2xl font-bold text-[#006194] dark:text-[#93ccff]">
                    {roomPrice(room, language) ?? t('Price on request')}
                    {room.pricePerNight !== null && <span className="text-sm font-normal text-[#3f4850] dark:text-[#cadced]"> / {t('night')}</span>}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-[#3f4850] dark:text-[#cadced]">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#006194] dark:text-[#93ccff]">person</span>
                    {t(room.capacity)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#006194] dark:text-[#93ccff]">king_bed</span>
                    {t(room.bedType)}
                  </span>
                  {room.size && room.size !== 'Details to be confirmed' && (
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-[#006194] dark:text-[#93ccff]">straighten</span>
                      {room.size}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-serif-display text-lg text-[#0b1d29] dark:text-white font-semibold mb-2">{t('About this room')}</h3>
                <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">{t(room.description)}</p>
              </div>

              {/* Amenities grid */}
              {room.features.length > 0 && (
                <div>
                  <h3 className="font-serif-display text-lg text-[#0b1d29] dark:text-white font-semibold mb-3">{t('Amenities')}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {room.features.map(feature => (
                      <div key={feature} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#ebf5ff] dark:bg-white/5 border border-[#bfc7d2]/15">
                        <span className="material-symbols-outlined text-[20px] text-[#006194] dark:text-[#93ccff] shrink-0">{getIcon(feature)}</span>
                        <span className="text-xs font-medium text-[#0b1d29] dark:text-white">{t(feature)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky footer CTA */}
          <div className="shrink-0 px-6 py-4 border-t border-[#bfc7d2]/20 bg-white dark:bg-[#0b1d29] flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#ebf5ff] dark:bg-white/10 text-[#0b1d29] dark:text-white text-sm font-semibold hover:bg-[#d8ebfc] transition-colors">
              {t('Close')}
            </button>
            <button onClick={() => { onBook(room); onClose(); }} className={`flex-1 py-3 rounded-xl text-sm font-semibold ${primaryButton}`}>
              {t('Book Now')}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && hasGallery && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
            <span className="material-symbols-outlined">close</span>
          </button>
          {gallery.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          )}
          <ManagedImage
            src={gallery[imgIdx].src}
            alt={gallery[imgIdx].caption ?? ''}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          {gallery[imgIdx].caption && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center px-4">{gallery[imgIdx].caption}</p>
          )}
          <p className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-xs">{imgIdx + 1} / {gallery.length}</p>
        </div>
      )}
    </>
  );
}

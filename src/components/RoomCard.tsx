import React, { useState } from 'react';
import { Language, RoomItem } from '../types';
import { getTranslator } from '../i18n/translations';
import { roomPrice } from '../lib/booking';
import { RoomDetailModal } from './RoomDetailModal';

export const primaryButton = 'px-5 py-2.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-semibold transition-all shadow-sm';
export const secondaryButton = 'px-5 py-2.5 rounded-lg bg-[#ebf5ff] dark:bg-white/10 text-[#006194] dark:text-[#93ccff] hover:bg-[#d8ebfc] dark:hover:bg-white/20 text-sm font-semibold transition-all';

export function RoomCard({ room, language, onBook }: { room: RoomItem; language: Language; onBook: (room: RoomItem) => void }) {
  const t = getTranslator(language);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <article className="group bg-white dark:bg-[#0b1d29] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#bfc7d2]/20 flex flex-col">
        {/* Image */}
        <button onClick={() => setShowDetail(true)} className="relative block h-64 overflow-hidden bg-[#ebf5ff] dark:bg-white/5 w-full text-left">
          {room.image
            ? <img src={room.image} alt={t(room.name)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            : (
              <span className="h-full w-full flex flex-col items-center justify-center gap-2 text-[#675d4d] dark:text-[#d3c4b1]">
                <span className="material-symbols-outlined text-[40px] opacity-30">photo_camera</span>
                <span className="text-xs">{t('Room photos coming soon')}</span>
              </span>
            )
          }
          {room.tag && <span className="absolute top-4 start-4 px-3 py-1 rounded-full bg-white/90 dark:bg-[#0b1d29]/90 text-xs font-semibold text-[#0b1d29] dark:text-white">{t(room.tag)}</span>}
          {room.gallery && room.gallery.length > 1 && (
            <span className="absolute bottom-3 end-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-white text-[10px] font-semibold backdrop-blur-sm">
              <span className="material-symbols-outlined text-[14px]">photo_library</span>
              {room.gallery.length}
            </span>
          )}
        </button>

        {/* Body */}
        <div className="p-6 flex flex-col gap-3 flex-1">
          <h3 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold leading-tight">
            <button onClick={() => setShowDetail(true)} className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors text-left">
              {t(room.name)}
            </button>
          </h3>

          <p className="font-bold text-[#006194] dark:text-[#93ccff] text-base">
            {roomPrice(room, language) ?? t('Price on request')}
            {room.pricePerNight !== null && <span className="text-xs font-normal text-[#3f4850] dark:text-[#cadced]"> {t('/ night')}</span>}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#3f4850] dark:text-[#cadced]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#006194] dark:text-[#93ccff]">person</span>
              {t(room.capacity)}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#006194] dark:text-[#93ccff]">king_bed</span>
              {t(room.bedType)}
            </span>
          </div>

          <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed line-clamp-2">{t(room.description)}</p>

          {/* Top 3 amenities preview */}
          <ul className="flex flex-wrap gap-1.5 text-xs">
            {(room.features.length ? room.features.slice(0, 3) : []).map(feature => (
              <li key={feature} className="bg-[#ebf5ff] dark:bg-white/5 px-2.5 py-1 rounded-full text-[#3f4850] dark:text-[#cadced]">{t(feature)}</li>
            ))}
            {room.features.length > 3 && (
              <li className="bg-[#ebf5ff] dark:bg-white/5 px-2.5 py-1 rounded-full text-[#006194] dark:text-[#93ccff] font-semibold cursor-pointer" onClick={() => setShowDetail(true)}>
                +{room.features.length - 3} {t('more')}
              </li>
            )}
          </ul>

          <div className="flex gap-2 mt-auto pt-3 border-t border-[#bfc7d2]/20">
            <button className={`flex-1 ${secondaryButton}`} onClick={() => setShowDetail(true)}>{t('View Details')}</button>
            <button className={`flex-1 ${primaryButton}`} onClick={() => onBook(room)}>{t('Book Now')}</button>
          </div>
        </div>
      </article>

      {showDetail && (
        <RoomDetailModal room={room} language={language} onClose={() => setShowDetail(false)} onBook={onBook} />
      )}
    </>
  );
}

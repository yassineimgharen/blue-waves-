import { ManagedImage } from '../cms/ManagedImage';
import React, { useEffect, useRef, useState } from 'react';
import type { Language, RoomItem } from '../types';
import { getTranslator } from '../i18n/translations';
import { secondaryButton } from './RoomCard';

export function RoomGallery({ photos, language, name }: { photos: NonNullable<RoomItem['gallery']>; language: Language; name: string }) {
  const t = getTranslator(language);
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const move = (direction: number) => setIndex(current => (current + direction + photos.length) % photos.length);
  useEffect(() => { setIndex(0); }, [photos]);
  useEffect(() => {
    if (!fullscreen) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog.current?.close(); document.body.style.overflow = previousOverflow; };
  }, [fullscreen]);
  if (!photos.length) return <div className="aspect-[4/3] rounded-2xl bg-[#ebf5ff] dark:bg-white/5 flex items-center justify-center">{t('Room photos coming soon')}</div>;
  const photo = photos[index] ?? photos[0];
  const swipeHandlers = {
    onPointerDown: (event: React.PointerEvent) => {
      if ((event.target as Element).closest('button')) return;
      start.current = { x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerUp: (event: React.PointerEvent) => {
      if (!start.current) return;
      const dx = event.clientX - start.current.x, dy = event.clientY - start.current.y;
      if (photos.length > 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move((dx < 0 ? 1 : -1) * (language === 'ar' ? -1 : 1));
      start.current = null;
    },
    onPointerCancel: () => { start.current = null; },
  };
  const controls = <div className="flex items-center justify-center gap-4 py-3" dir="ltr">
    <button type="button" className={secondaryButton} disabled={photos.length < 2} aria-label={t('Previous photo')} onClick={() => move(-1)}>‹</button>
    <span aria-live="polite" className="text-sm">{index + 1} / {photos.length}</span>
    <button type="button" className={secondaryButton} disabled={photos.length < 2} aria-label={t('Next photo')} onClick={() => move(1)}>›</button>
  </div>;
  const thumbnails = <div className="flex gap-3 overflow-x-auto py-2" aria-label={t('Room photos')}>
    {photos.map((item, i) => <button type="button" key={item.src} aria-label={`${t('View photo')} ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)} className={`w-24 h-20 shrink-0 rounded-lg overflow-hidden ${index === i ? 'ring-2 ring-[#006194]' : 'opacity-70 hover:opacity-100'}`}><ManagedImage src={item.src} alt={t(item.caption)} loading="lazy" className="w-full h-full object-cover" /></button>)}
  </div>;
  return <div>
    <div {...swipeHandlers} className="relative touch-pan-y rounded-2xl overflow-hidden bg-[#ebf5ff] dark:bg-white/5">
      <ManagedImage src={photo.src} alt={t(photo.caption)} draggable={false} className="w-full aspect-[4/3] object-cover" />
      <button type="button" onClick={() => setFullscreen(true)} className="absolute bottom-4 end-4 rounded-lg px-4 py-2 bg-[#0b1d29]/90 text-white text-sm">{t('Fullscreen')}</button>
    </div>
    {controls}{thumbnails}
    <dialog ref={dialog} aria-label={`${t(name)} — ${t('Room photos')}`} onClose={() => setFullscreen(false)} onCancel={() => setFullscreen(false)} onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); setFullscreen(false); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    }} className="m-auto w-[96vw] max-w-6xl max-h-[96dvh] overflow-y-auto p-4 rounded-2xl bg-[#0b1d29] text-white backdrop:bg-black/85">
      <div className="flex items-center justify-between gap-3 mb-3"><span>{t(name)}</span><button type="button" autoFocus onClick={() => setFullscreen(false)} className={secondaryButton}>{t('Close gallery')}</button></div>
      <div {...swipeHandlers} className="touch-pan-y"><ManagedImage src={photo.src} alt={t(photo.caption)} draggable={false} className="w-full max-h-[65dvh] object-contain" /></div>
      {controls}{thumbnails}
    </dialog>
  </div>;
}

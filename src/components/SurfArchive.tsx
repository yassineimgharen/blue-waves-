import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import type { Language } from '../types';
import { useTranslator } from '../cms/useTranslator';
import { secondaryButton } from './RoomCard';
import metadata from '../data/surfArchiveMetadata.json';

import Image from 'next/image';
import assets from '../data/surfArchiveAssets.json';
const { originals, previews } = assets;
const descriptions = metadata as Record<string, { alt: string; width: number; height: number; duplicateOf?: string }>;
const priority = ['coversurf.jpg', '33K7457-768x512.jpg', 'surf-lesson-lineup.jpg', 'IMG_2720-768x1024 (1).jpg', 'SP1_0072-768x510.jpg'];
const photos = Object.entries(originals).sort(([a], [b]) => {
  const rank = (path: string) => { const index = priority.indexOf(path.split('/').pop()!); return index < 0 ? priority.length : index; };
  return rank(a) - rank(b) || a.localeCompare(b);
}).filter(([path]) => !descriptions[path.split('/').pop()!]?.duplicateOf).map(([path, src]) => {
  const name = path.split('/').pop()!;
  return { src, name, ...descriptions[name], preview: previews[`../images/surf-previews/${name}.768.webp`] ?? src, small: previews[`../images/surf-previews/${name}.384.webp`] };
});

export default function SurfArchive({ language }: { language: Language }) {
  const t = useTranslator(language);
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const open = selected !== null;
  const move = (direction: number) => setSelected(index => index === null ? null : (index + direction + photos.length) % photos.length);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    dialog.current?.showModal(); document.body.style.overflow = 'hidden';
    return () => { dialog.current?.close(); document.body.style.overflow = previous; trigger.current?.focus({ preventScroll: true }); };
  }, [open]);
  if (!photos.length) return null;
  const photo = selected === null ? null : photos[selected];
  const caption = (index: number) => `${t(photos[index].alt || 'Surf archive photograph')} — ${index + 1}`;
  const tile = (index: number, featured = false, fillDesktop = false) => {
    const item = photos[index];
    return <button key={item.src} type="button" onClick={event => { trigger.current = event.currentTarget; setSelected(index); }} aria-label={`${t('View photo')} ${index + 1}: ${t(item.alt || 'Surf archive photograph')}`} className={`group relative block w-full overflow-hidden rounded-2xl bg-[#ebf5ff] dark:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006194] ${featured ? 'h-full' : fillDesktop ? 'lg:h-full' : ''}`}>
      <Image src={item.preview} sizes={featured ? '(min-width: 1024px) 65vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw'} width={item.width || 768} height={item.height || 512} alt={t(item.alt || 'Surf archive photograph')} loading="lazy" decoding="async" className={`w-full ${featured ? 'h-full object-cover' : fillDesktop ? 'h-auto lg:h-full lg:object-cover' : 'h-auto'} motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]`} />
      <span className="absolute inset-0 bg-gradient-to-t from-[#071a26]/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
      <span aria-hidden="true" className="absolute bottom-3 start-3 rounded-full bg-[#071a26]/60 px-3 py-1 text-xs text-white tabular-nums">{String(index + 1).padStart(2, '0')}</span>
      <Expand aria-hidden="true" size={18} className="absolute bottom-4 end-4 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
    </button>;
  };
  return <section id="surf-archive" aria-labelledby="surf-archive-title" className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-20 scroll-mt-32">
    <header className="text-center max-w-2xl mx-auto mb-12"><h2 id="surf-archive-title" className="font-serif-display text-3xl sm:text-5xl mb-4">{t('Surf Archive')}</h2><p className="text-sm text-[#3f4850] dark:text-[#cadced]">{t('Moments from the water, the coast and our surf experiences.')}</p></header>
    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 items-stretch">
      <div className="min-[480px]:col-span-2 lg:row-span-2">{tile(0, true)}</div>
      {photos.slice(1, 3).map((_, index) => <div key={index}>{tile(index + 1, false, true)}</div>)}
    </div>
    <div className="columns-1 min-[480px]:columns-2 lg:columns-3 gap-4">{photos.slice(3, visible).map((item, index) => <div key={item.src} className="break-inside-avoid mb-4">{tile(index + 3)}</div>)}</div>
    <div className="mt-8 flex flex-col items-center gap-4"><p className="text-xs text-[#3f4850] dark:text-[#cadced] tabular-nums" aria-live="polite">{Math.min(visible, photos.length)} / {photos.length}</p>{visible < photos.length && <button type="button" className={secondaryButton} onClick={() => setVisible(count => count + 12)}>{t('Explore more moments')}</button>}</div>
    <dialog ref={dialog} aria-label={t('Surf Archive')} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); setSelected(null); }
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
    }} className="fixed inset-0 m-0 h-[100dvh] w-screen max-w-none max-h-none bg-[#071a26] text-white p-4 sm:p-6 backdrop:bg-[#071a26]/95">
      {photo && <div className="flex h-full min-h-0 flex-col gap-4">
        <div className="flex items-center justify-between gap-4"><span className="font-serif-display text-xl">{t('Surf Archive')}</span><button type="button" autoFocus onClick={() => setSelected(null)} aria-label={t('Close gallery')} className="rounded-full p-3 bg-white/10 hover:bg-white/20"><X aria-hidden="true" size={22} /></button></div>
        <div className="flex-1 min-h-0 flex items-center justify-center touch-pan-y" onPointerDown={event => { touch.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerCancel={() => { touch.current = null; }} onPointerUp={event => { if (!touch.current) return; const dx = event.clientX - touch.current.x, dy = event.clientY - touch.current.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1); touch.current = null; }}>
          <Image unoptimized width={photo.width || 1600} height={photo.height || 1067} key={photo.src} src={photo.src} alt={t(photo.alt || 'Surf archive photograph')} draggable={false} className="max-w-full max-h-full object-contain select-none" />
        </div>
        <div className="flex items-center justify-between gap-3 pb-[env(safe-area-inset-bottom)]"><button type="button" aria-label={t('Previous photo')} onClick={() => move(-1)} className="shrink-0 rounded-full p-3 bg-white/10 hover:bg-white/20"><ArrowLeft aria-hidden="true" size={22} /></button><div className="text-center min-w-0"><p className="text-xs sm:text-sm text-white/80" aria-live="polite">{caption(selected!)}</p><p className="text-xs mt-1 text-white/60 tabular-nums">{selected! + 1} / {photos.length}</p></div><button type="button" aria-label={t('Next photo')} onClick={() => move(1)} className="shrink-0 rounded-full p-3 bg-white/10 hover:bg-white/20"><ArrowRight aria-hidden="true" size={22} /></button></div>
      </div>}
    </dialog>
  </section>;
}

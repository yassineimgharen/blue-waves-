import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { getTranslator, formatDate, locales } from '../i18n/translations';
import type { BookingDraft, Language, ScreenType, SurfAddon } from '../types';
import { ACCOMMODATIONS, SURF_ADDONS } from '../data/accommodations';
import { addNights, bookingError, bookingQuote, roomPrice, todayISO } from '../lib/booking';
import { reservationPayload } from '../lib/reservation';
import { primaryButton, secondaryButton } from '../components/RoomCard';

interface BookingViewProps {
  language: Language;
  draft: BookingDraft;
  onChange: React.Dispatch<React.SetStateAction<BookingDraft>>;
  onNavigate: (screen: ScreenType) => void;
  onOpenConcierge: () => void;
}
const fieldClass = 'w-full rounded-lg border border-[#bfc7d2]/30 bg-[#ebf5ff] dark:bg-white/5 text-[#0b1d29] dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]';
const panelClass = 'bg-white dark:bg-[#0b1d29] rounded-2xl p-6 md:p-8 shadow-sm border border-[#bfc7d2]/20 scroll-mt-36';

export function BookingView({ language, draft, onChange, onOpenConcierge }: BookingViewProps) {
  const t = getTranslator(language);
  const room = ACCOMMODATIONS.find(item => item.id === draft.roomId);
  const quote = bookingQuote(draft, room);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const confirmation = useRef<HTMLDialogElement>(null);
  const delivered = useRef({ payload: '', recipients: new Set<string>() });
  useEffect(() => { if (success) confirmation.current?.showModal(); }, [success]);
  const update = <K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) => onChange(current => ({ ...current, [key]: value }));
  const money = (value: number | null) => value === null ? t('To be confirmed') : new Intl.NumberFormat(locales[language], { style: 'currency', currency: room?.currency ?? 'EUR' }).format(value);
  const steps = ['Travel Dates', 'Guests', 'Rooms & Apartments', 'Add Surf to Your Stay', 'Guest Details'];

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const invalid = bookingError(draft, room);
    if (invalid) { setError(invalid); return; }
    if (!draft.termsAccepted) { setError('Please confirm that this is a reservation request.'); return; }
    const payload = reservationPayload(draft, room!);
    const signature = JSON.stringify(payload);
    if (delivered.current.payload !== signature) delivered.current = { payload: signature, recipients: new Set() };
    setSending(true); setError(null);
    try {
      for (const recipient of ['reservation@bluewavelodge.com', 'contact@bluewavelodge.com']) {
        if (delivered.current.recipients.has(recipient)) continue;
        await emailjs.send('service_ah6rbtp', 'template_4e7gprj', { ...payload, to_email: recipient }, 'yplWBRaPT0ZimeCpR');
        delivered.current.recipients.add(recipient);
      }
      setSuccess(true);
    } catch {
      setError(delivered.current.recipients.size ? 'Your request reached reservations, but the contact copy failed. Retry to send the remaining copy.' : 'Failed to send reservation. Please try again or contact us directly.');
    } finally { setSending(false); }
  };

  return <div className="flex flex-col w-full">
    <section className="bg-gradient-to-b from-[#e0f0ff] via-[#ebf5ff] to-[#f6faff] dark:from-[#0b1d29] dark:via-[#071a26] dark:to-[#06121a] py-12 px-4 md:px-12 border-b border-[#bfc7d2]/20">
      <div className="max-w-[1360px] mx-auto"><h1 className="font-serif-display text-4xl sm:text-6xl mb-4">{t('Book Your Stay')}</h1><p className="text-[#3f4850] dark:text-[#cadced]">{t('Choose your dates, guests and accommodation. Add surf only if you wish.')}</p>
        <div className="mt-10 flex gap-3 overflow-x-auto bg-white/80 dark:bg-[#0b1d29]/80 p-3 rounded-2xl border border-[#bfc7d2]/20">{steps.map((label, i) => <button key={label} type="button" className="flex items-center gap-2 shrink-0 px-3 py-2 text-sm font-semibold text-[#006194] dark:text-[#93ccff]" onClick={() => document.getElementById(`booking-step-${i}`)?.scrollIntoView({ behavior: 'smooth' })}><span className="w-6 h-6 rounded-full bg-[#006194] text-white flex items-center justify-center">{i + 1}</span>{t(label)}</button>)}</div>
      </div>
    </section>
    <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form id="stay-booking" onSubmit={submit} className="lg:col-span-8 space-y-8">
          <fieldset disabled={sending} className="space-y-8 min-w-0">
            <section id="booking-step-0" className={panelClass}><h2 className="font-serif-display text-2xl mb-6">1. {t('Travel Dates')}</h2>
              {draft.offerNights && <div className="mb-5 rounded-xl p-4 bg-[#ebf5ff] dark:bg-white/5"><p>{t(`${draft.offerNights} Nights + Surf`)}</p><p className="text-xs mt-1">{t('Price and inclusions to be confirmed. Surf remains optional.')}</p><button type="button" className="text-sm text-[#006194] dark:text-[#93ccff] underline mt-2" onClick={() => update('offerNights', null)}>{t('Remove offer')}</button></div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-sm space-y-2 block"><span>{t('Check-In')}</span><input name="checkIn" type="date" required min={todayISO()} value={draft.checkIn} className={fieldClass} onChange={e => onChange(current => ({ ...current, checkIn: e.target.value, checkOut: current.offerNights ? addNights(e.target.value, current.offerNights) : current.checkOut }))} /></label>
                <label className="text-sm space-y-2 block"><span>{t('Check-Out')}</span><input name="checkOut" type="date" required min={addNights(draft.checkIn, 1) || todayISO()} value={draft.checkOut} className={fieldClass} onChange={e => update('checkOut', e.target.value)} /></label>
              </div>
              <p className="text-sm mt-4">{t('Nights:')} {quote.nights || '—'}</p>
            </section>
            <section id="booking-step-1" className={panelClass}><h2 className="font-serif-display text-2xl mb-6">2. {t('Guests')}</h2><div className="grid grid-cols-2 gap-4">
              <label className="text-sm space-y-2 block"><span>{t('Adults')}</span><input name="adults" type="number" min="1" step="1" required value={draft.adults} className={fieldClass} onChange={e => update('adults', e.target.valueAsNumber)} /></label>
              <label className="text-sm space-y-2 block"><span>{t('Children')}</span><input name="children" type="number" min="0" step="1" required value={draft.children} className={fieldClass} onChange={e => update('children', e.target.valueAsNumber)} /></label>
            </div></section>
            <section id="booking-step-2" className={panelClass}><h2 className="font-serif-display text-2xl mb-6">3. {t('Rooms & Apartments')}</h2><div className="space-y-4">
              {ACCOMMODATIONS.map(item => <label key={item.id} className={`flex gap-4 items-start rounded-xl p-4 border cursor-pointer ${draft.roomId === item.id ? 'border-[#006194] bg-[#ebf5ff] dark:bg-white/10 ring-1 ring-[#006194]' : 'border-[#bfc7d2]/30'}`}>
                <input type="radio" name="roomId" value={item.id} required checked={draft.roomId === item.id} onChange={() => update('roomId', item.id)} className="mt-2 accent-[#006194]" />
                {item.image && <img src={item.image} alt={t(item.name)} className="w-20 h-20 rounded-lg object-cover hidden sm:block" />}
                <span className="flex-1 min-w-0"><span className="block font-serif-display text-xl">{t(item.name)}</span><span className="block text-xs mt-1">{t(item.capacity)} • {t(item.bedType)}</span><span className="block text-sm font-bold text-[#006194] dark:text-[#93ccff] mt-2">{roomPrice(item, language) ?? t('Price on request')}{item.pricePerNight !== null && ` ${t('/ night')}`}</span><a href={`#rooms/${item.id}`} className="inline-block text-xs underline mt-2">{t('View Details')}</a></span>
              </label>)}
            </div></section>
            <section id="booking-step-3" className={panelClass}><h2 className="font-serif-display text-2xl mb-3">{t('Add Surf to Your Stay')}</h2><p className="text-sm text-[#3f4850] dark:text-[#cadced] mb-5">{t('Accommodation comes first. Surf is always optional.')}</p>
              <label className="text-sm space-y-2 block"><span>{t('Optional surf service')}</span><select name="surfAddon" className={fieldClass} value={draft.surfAddon} onChange={e => update('surfAddon', e.target.value as SurfAddon)}>{SURF_ADDONS.map(addon => <option key={addon.id} value={addon.id}>{t(addon.label)}{addon.price === null ? ` — ${t('Price on request')}` : ''}</option>)}</select></label>
              {draft.surfAddon !== 'none' && <p className="text-xs mt-3">{t('Surf pricing, duration and availability will be confirmed separately. No surf charge has been added.')}</p>}
            </section>
            <section id="booking-step-4" className={panelClass}><h2 className="font-serif-display text-2xl mb-6">4. {t('Guest Details')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{([
                ['firstName', 'First Name *', 'text', 'given-name'], ['lastName', 'Last Name *', 'text', 'family-name'],
                ['email', 'Email Address *', 'email', 'email'], ['phone', 'WhatsApp / Phone Number *', 'tel', 'tel'],
                ['country', 'Country of Residence *', 'text', 'country-name'],
              ] as const).map(([key, label, type, autoComplete]) => <label key={key} className="text-sm space-y-2 block"><span>{t(label)}</span><input name={key} autoComplete={autoComplete} type={type} required value={draft[key]} className={fieldClass} onChange={e => update(key, e.target.value)} /></label>)}</div>
              <label className="text-sm space-y-2 block mt-4"><span>{t('Special requests')}</span><textarea name="specialRequests" className={fieldClass} rows={4} value={draft.specialRequests} onChange={e => update('specialRequests', e.target.value)} /></label>
              <label className="flex gap-3 items-start mt-6 text-sm"><input type="checkbox" name="termsAccepted" required checked={draft.termsAccepted} onChange={e => update('termsAccepted', e.target.checked)} className="mt-1 accent-[#006194]" /><span>{t('I understand this is a reservation request. The lodge will confirm availability, pricing and terms before any payment.')}</span></label>
              <button type="submit" className={`${primaryButton} mt-6`}>{t(sending ? 'Sending…' : 'Send Reservation Request')}</button>
            </section>
          </fieldset>
          {error && <p role="alert" className="text-red-600 dark:text-red-400 text-sm">{t(error)}</p>}
        </form>
        <aside className="lg:col-span-4 lg:sticky lg:top-36 space-y-6"><div className={panelClass}>
          <h2 className="font-serif-display text-2xl mb-6">{t('Your Stay Overview')}</h2>
          <dl className="text-sm space-y-4">
            <div><dt className="font-semibold">{t('Room / Apartment')}</dt><dd>{room ? t(room.name) : t('Choose a room or apartment.')}</dd></div>
            <div><dt className="font-semibold">{t('Dates:')}</dt><dd>{draft.checkIn ? formatDate(draft.checkIn, language) : '—'} – {draft.checkOut ? formatDate(draft.checkOut, language) : '—'}</dd></div>
            <div><dt className="font-semibold">{t('Nights:')}</dt><dd>{quote.nights || '—'}</dd></div>
            <div><dt className="font-semibold">{t('Guests')}</dt><dd>{draft.adults || 0} {t('Adults')} • {draft.children || 0} {t('Children')}</dd></div>
            <div><dt className="font-semibold">{t('Accommodation subtotal')}</dt><dd>{money(quote.accommodation)}</dd></div>
            <div><dt className="font-semibold">{t('Optional surf service')}</dt><dd>{t(SURF_ADDONS.find(addon => addon.id === draft.surfAddon)!.label)}</dd></div>
            {draft.offerNights && <div><dt className="font-semibold">{t('Offer request')}</dt><dd>{t(`${draft.offerNights} Nights + Surf`)}</dd></div>}
          </dl>
          <div className="mt-6 border-t border-[#bfc7d2]/20 pt-5"><p className="font-bold">{t('Estimated total')}</p><p className="text-2xl text-[#006194] dark:text-[#93ccff] font-bold mt-2">{money(quote.total)}</p><p className="text-xs mt-3">{t('Final price, any taxes and payment terms will be confirmed by the lodge.')}</p></div>
          <button type="submit" form="stay-booking" disabled={sending} className={`${primaryButton} w-full mt-6 disabled:opacity-60`}>{t(sending ? 'Sending…' : 'Send Reservation Request')}</button>
        </div><button onClick={onOpenConcierge} className={`${secondaryButton} w-full`}>{t('Contact the Lodge')}</button></aside>
      </div>
    </section>
    <dialog ref={confirmation} onClose={() => setSuccess(false)} className="m-auto max-w-xl w-[94vw] rounded-3xl p-8 bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white backdrop:bg-[#0b1d29]/70" aria-label={t('Reservation Request Received')}>
      <h2 className="font-serif-display text-3xl mb-4">{t('Reservation Request Received')}</h2><p className="text-sm leading-relaxed">{t('Thank you. The lodge will contact you to confirm your accommodation, availability and final price.')}</p><p className="font-bold my-4">{room && t(room.name)}</p><button type="button" autoFocus onClick={() => { confirmation.current?.close(); setSuccess(false); }} className={primaryButton}>{t('Return to Booking Overview')}</button>
    </dialog>
  </div>;
}

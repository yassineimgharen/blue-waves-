import { getTranslator, formatDate } from '../i18n/translations';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ScreenType, Language } from '../types';

// ─── EmailJS config ───────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free)
// 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create an Email Template → copy the Template ID
//    Template variables used: {{guest_name}}, {{guest_email}}, {{guest_phone}},
//    {{country}}, {{check_in}}, {{check_out}}, {{nights}}, {{adults}},
//    {{children}}, {{rooms}}, {{room_name}}, {{surf_package}},
//    {{guest1_surf}}, {{guest2_surf}}, {{extras}}, {{grand_total}},
//    {{deposit}}, {{flight_eta}}, {{special_requests}}, {{to_email}}
// 4. Go to Account → API Keys → copy the Public Key
// 5. Replace the three placeholders below:
const EMAILJS_SERVICE_ID  = 'service_ah6rbtp';
const EMAILJS_TEMPLATE_ID = 'template_4e7gprj';
const EMAILJS_PUBLIC_KEY  = 'yplWBRaPT0ZimeCpR';

interface BookingViewProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  onOpenConcierge: () => void;
}

export const BookingView: React.FC<BookingViewProps> = ({ language, onNavigate, onOpenConcierge }) => {
  const t = getTranslator(language);
  // Stepper state
  const [activeStep, setActiveStep] = useState<string>('step-trip');

  // Form states
  const [checkIn, setCheckIn] = useState('2025-11-08');
  const [checkOut, setCheckOut] = useState('2025-11-15');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  // Room selection
  const [selectedRoom, setSelectedRoom] = useState<'sea-view' | 'pool' | 'penthouse'>('sea-view');

  // Surf program
  const [surfCategory, setSurfCategory] = useState<string>('Surf Guiding');
  const [guest1Surf, setGuest1Surf] = useState<string>('Advanced Guiding');
  const [guest2Surf, setGuest2Surf] = useState<string>('Beginner Lessons');

  // Extras
  const [transferExtra, setTransferExtra] = useState(true);
  const [yogaExtra, setYogaExtra] = useState(true);
  const [halfboardExtra, setHalfboardExtra] = useState(false);
  const [quiverExtra, setQuiverExtra] = useState(false);

  // Guest fields
  const [firstName, setFirstName] = useState('Amara');
  const [lastName, setLastName] = useState('Svensson');
  const [email, setEmail] = useState('amara.svensson@nordicwave.com');
  const [phone, setPhone] = useState('+46 70 812 3456');
  const [country, setCountry] = useState('SE');
  const [flightEta, setFlightEta] = useState('Royal Air Maroc AT802 @ 16:30');
  const [specialRequests, setSpecialRequests] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Calculate nights
  const calculateNights = () => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 7;
    } catch {
      return 7;
    }
  };

  const nights = calculateNights();

  // Pricing calculations
  const roomRates = {
    'sea-view': { name: 'Sea View Balcony Suite', ratePerNight: 180, total: 180 * nights },
    pool: { name: 'Pool & Garden Terrace Room', ratePerNight: 150, total: 150 * nights },
    penthouse: { name: 'Penthouse Ocean Residence', ratePerNight: 320, total: 320 * nights }
  };

  const activeRoomData = roomRates[selectedRoom];

  // Surf tier cost
  const surfCosts: Record<string, number> = {
    'No Surf': 0,
    'Surf Lessons': 560,
    'Surf Guiding': 600,
    'Surf & Stay': 790,
    'Surf + Yoga': 750,
    'Equipment Rental': 240
  };

  const surfCost = surfCosts[surfCategory] || 600;
  const transferCost = transferExtra ? 70 : 0;
  const yogaCost = yogaExtra ? 105 : 0;
  const halfboardCost = halfboardExtra ? 175 : 0;
  const quiverCost = quiverExtra ? 60 : 0;
  const extrasTotal = transferCost + yogaCost + halfboardCost + quiverCost;

  const grandTotal = activeRoomData.total + surfCost + extrasTotal;
  const depositAmount = 400;

  const jumpTo = (stepId: string) => {
    setActiveStep(stepId);
    const el = document.getElementById(stepId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert(t("Please accept the Sanctuary Terms & Booking Policy to proceed."));
      return;
    }

    const extrasSelected = [
      transferExtra  ? `Airport Transfer (€70)`           : null,
      yogaExtra      ? `Sunset Shala Yoga (€105)`          : null,
      halfboardExtra ? `Organic Half-Board Dining (€175)`  : null,
      quiverExtra    ? `Premium Fiber Quiver Pass (€60)`   : null,
    ].filter(Boolean).join(', ') || 'None';

    const templateParams = {
      guest_name:       `${firstName} ${lastName}`,
      guest_email:      email,
      guest_phone:      phone,
      country,
      check_in:         checkIn,
      check_out:        checkOut,
      nights,
      adults,
      children,
      rooms,
      room_name:        activeRoomData.name,
      room_total:       `€${activeRoomData.total}`,
      surf_package:     surfCategory,
      surf_cost:        `€${surfCost}`,
      guest1_surf:      guest1Surf,
      guest2_surf:      guest2Surf,
      extras:           extrasSelected,
      extras_total:     `€${extrasTotal}`,
      grand_total:      `€${grandTotal}`,
      deposit:          `€${depositAmount}`,
      flight_eta:       flightEta || 'Not provided',
      special_requests: specialRequests || 'None',
    };

    setIsSending(true);
    setSendError(null);

    try {
      // Send to both addresses sequentially
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { ...templateParams, to_email: 'reservation@bluewavelodge.com' },
        EMAILJS_PUBLIC_KEY
      );
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { ...templateParams, to_email: 'contact@bluewavelodge.com' },
        EMAILJS_PUBLIC_KEY
      );
      setShowSuccessModal(true);
    } catch (err) {
      setSendError('Failed to send reservation. Please try again or contact us directly.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Swell & Atlantic Tide Banner */}
      <div className="w-full bg-[#ebf5ff] dark:bg-[#071a26] text-[#3f4850] dark:text-[#cadced] py-2.5 px-4 md:px-12 border-b border-[#bfc7d2]/20">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-[#0b1d29] text-[#006194] dark:text-[#93ccff] shadow-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t("Imi Ouaddar • Clean Offshore")}
            </span>
            <span className="hidden sm:inline">
              {t("Atlantic Swell: 4.5ft @ 14s NW | Water: 19°C | Next High Tide: 16:42")}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                verified_user
              </span>{' '}
              {t("Best Rate Direct Guarantee")}
            </span>
            <span className="hidden md:inline text-[#bfc7d2]">•</span>
            <span className="hidden md:inline">{t("2h Response Time for Custom Requests")}</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="relative w-full bg-gradient-to-b from-[#e0f0ff] via-[#ebf5ff] to-[#f6faff] dark:from-[#0b1d29] dark:via-[#071a26] dark:to-[#06121a] py-12 px-4 md:px-12 border-b border-[#bfc7d2]/20">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-[#006194] dark:text-[#93ccff] uppercase tracking-widest block mb-2">
                {t("Bespoke Sanctuary Booking")}
              </span>
              <h1 className="font-serif-display text-4xl sm:text-6xl text-[#0b1d29] dark:text-white tracking-tight">
                {t("Reserve Your Ocean Stay")}
              </h1>
              <p className="text-base text-[#3f4850] dark:text-[#cadced] mt-3">
                {t("Seamless booking for artisanal lodge rooms, private ocean point break coaching, and Berber coastal nourishment.")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSuccessModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-white/10 hover:bg-[#ebf5ff] text-[#0b1d29] dark:text-white text-xs md:text-sm font-semibold transition-all shadow-sm border border-[#bfc7d2]/20"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                {t("Preview Confirmation State")}
              </button>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="mt-10 overflow-x-auto pb-2 scrollbar-none">
            <div className="min-w-[760px] flex items-center justify-between gap-2 bg-white/80 dark:bg-[#0b1d29]/80 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-[#bfc7d2]/20">
              {[
                { id: 'step-trip', num: '1', label: 'Dates' },
                { id: 'step-guests', num: '2', label: 'Guests' },
                { id: 'step-room', num: '3', label: 'Room' },
                { id: 'step-surf', num: '4', label: 'Surf Coaching' },
                { id: 'step-extras', num: '5', label: 'Experiences' },
                { id: 'step-details', num: '6', label: 'Details & Request' }
              ].map((step, idx, arr) => (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(step.id)}
                    className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs md:text-sm transition-all whitespace-nowrap ${
                      activeStep === step.id
                        ? 'text-[#006194] dark:text-[#93ccff] bg-[#cce5ff]/50 dark:bg-[#006194]/30 font-bold'
                        : 'text-[#3f4850] dark:text-[#cadced] hover:text-[#0b1d29]'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs ${
                        activeStep === step.id
                          ? 'bg-[#006194] text-white'
                          : 'bg-[#d2e5f6] dark:bg-white/10 text-[#0b1d29] dark:text-white'
                      }`}
                    >
                      {step.num}
                    </span>
                    <span>{t(step.label)}</span>
                  </button>
                  {idx < arr.length - 1 && <span className="w-6 h-[1px] bg-[#bfc7d2]/40"></span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Booking Flow: 2-Column Split Layout */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Step Panels Form */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* STEP 1: TRIP DATES */}
            <div
              className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6 border border-[#bfc7d2]/20"
              id="step-trip"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#006194] font-bold text-sm flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h2 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold">
                      {t("Select Travel Dates")}
                    </h2>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced]">
                      {t("Recommended: 7-night Atlantic swell cycle (Saturday to Saturday)")}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#f0e0cc] text-[#221a0e] text-xs font-semibold">
                  {t("Peak Winter Swell")}
                </span>
              </div>

              {/* Date Selector Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#ebf5ff] dark:bg-white/5 p-4 rounded-xl flex flex-col gap-1 border border-[#bfc7d2]/20">
                  <label className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                    {t("Check-In")}
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[20px]">
                      calendar_today
                    </span>
                    <input
                      className="bg-transparent text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white focus:outline-none w-full cursor-pointer"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <span className="text-[11px] text-[#3f4850] dark:text-[#cadced]">
                    {t("Saturday • Sunset Arrival")}
                  </span>
                </div>

                <div className="bg-[#ebf5ff] dark:bg-white/5 p-4 rounded-xl flex flex-col gap-1 border border-[#bfc7d2]/20">
                  <label className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                    {t("Check-Out")}
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[20px]">
                      event_available
                    </span>
                    <input
                      className="bg-transparent text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white focus:outline-none w-full cursor-pointer"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                  <span className="text-[11px] text-[#3f4850] dark:text-[#cadced]">
                    {t("Saturday • Late Ocean Dip")}
                  </span>
                </div>

                <div className="bg-[#006194]/10 dark:bg-white/10 p-4 rounded-xl flex flex-col justify-center items-center text-center border border-[#bfc7d2]/20">
                  <span className="text-[10px] uppercase font-bold text-[#006194] dark:text-[#93ccff]">
                    {t("Duration")}
                  </span>
                  <span className="font-serif-display text-2xl text-[#006194] dark:text-[#93ccff] font-bold">
                    {nights} {t("Nights")}
                  </span>
                  <span className="text-[11px] text-[#3f4850] dark:text-[#cadced]">
                    {t("Optimal Ocean Alignment")}
                  </span>
                </div>
              </div>

              {/* Interactive Visual Calendar Strip */}
              <div className="bg-[#ebf5ff]/60 dark:bg-white/5 p-4 rounded-xl border border-[#bfc7d2]/20">
                <div className="flex items-center justify-between mb-3 text-xs md:text-sm font-semibold text-[#0b1d29] dark:text-white">
                  <span>{t("November 2025 — Swell Season")}</span>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                    {t("High offshore probability")}
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-[#3f4850] dark:text-[#cadced]">
                  <span>{t("Sa (08)")}</span>
                  <span>{t("Su (09)")}</span>
                  <span>{t("Mo (10)")}</span>
                  <span>{t("Tu (11)")}</span>
                  <span>{t("We (12)")}</span>
                  <span>{t("Th (13)")}</span>
                  <span>{t("Fr (14)")}</span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 mt-2">
                  <div className="bg-[#006194] text-white rounded-lg py-2.5 flex flex-col items-center shadow-sm">
                    <span className="font-bold text-xs">08</span>
                    <span className="text-[9px] opacity-80">{t("Arrival")}</span>
                  </div>
                  <div className="bg-[#cce5ff] dark:bg-white/10 text-[#001d31] dark:text-white rounded-lg py-2.5 flex flex-col items-center">
                    <span className="font-bold text-xs">09</span>
                    <span className="text-[9px] text-[#00628d] dark:text-[#89ceff]">{t('Anchor Pt')}</span>
                  </div>
                  <div className="bg-[#cce5ff] dark:bg-white/10 text-[#001d31] dark:text-white rounded-lg py-2.5 flex flex-col items-center">
                    <span className="font-bold text-xs">10</span>
                    <span className="text-[9px] text-[#00628d] dark:text-[#89ceff]">{t('Killers')}</span>
                  </div>
                  <div className="bg-[#cce5ff] dark:bg-white/10 text-[#001d31] dark:text-white rounded-lg py-2.5 flex flex-col items-center">
                    <span className="font-bold text-xs">11</span>
                    <span className="text-[9px] text-[#00628d] dark:text-[#89ceff]">{t('Boilers')}</span>
                  </div>
                  <div className="bg-[#cce5ff] dark:bg-white/10 text-[#001d31] dark:text-white rounded-lg py-2.5 flex flex-col items-center">
                    <span className="font-bold text-xs">12</span>
                    <span className="text-[9px] text-[#00628d] dark:text-[#89ceff]">{t('Imsouane')}</span>
                  </div>
                  <div className="bg-[#cce5ff] dark:bg-white/10 text-[#001d31] dark:text-white rounded-lg py-2.5 flex flex-col items-center">
                    <span className="font-bold text-xs">13</span>
                    <span className="text-[9px] text-[#00628d] dark:text-[#89ceff]">{t('Tamri')}</span>
                  </div>
                  <div className="bg-[#cce5ff] dark:bg-white/10 text-[#001d31] dark:text-white rounded-lg py-2.5 flex flex-col items-center">
                    <span className="font-bold text-xs">14</span>
                    <span className="text-[9px] text-[#00628d] dark:text-[#89ceff]">{t("Sunset")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: GUEST CONFIGURATION */}
            <div
              className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6 border border-[#bfc7d2]/20"
              id="step-guests"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#006194] font-bold text-sm flex items-center justify-center">
                  2
                </span>
                <div>
                  <h2 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold">
                    {t("Guests & Accommodations")}
                  </h2>
                  <p className="text-xs text-[#3f4850] dark:text-[#cadced]">
                    {t("Lodge accommodates adults and young ocean explorers")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Adults Counter */}
                <div className="p-4 bg-[#ebf5ff] dark:bg-white/5 rounded-xl flex items-center justify-between border border-[#bfc7d2]/20">
                  <div>
                    <span className="text-sm font-bold text-[#0b1d29] dark:text-white block">{t("Adults")}</span>
                    <span className="text-xs text-[#3f4850] dark:text-[#cadced]">{t("Age 13+")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      className="w-8 h-8 rounded-full bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white flex items-center justify-center hover:bg-[#e0f0ff] shadow-sm font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold text-base w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((a) => Math.min(8, a + 1))}
                      className="w-8 h-8 rounded-full bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white flex items-center justify-center hover:bg-[#e0f0ff] shadow-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children Counter */}
                <div className="p-4 bg-[#ebf5ff] dark:bg-white/5 rounded-xl flex items-center justify-between border border-[#bfc7d2]/20">
                  <div>
                    <span className="text-sm font-bold text-[#0b1d29] dark:text-white block">{t("Children")}</span>
                    <span className="text-xs text-[#3f4850] dark:text-[#cadced]">{t("Ages 4-12")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      className="w-8 h-8 rounded-full bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white flex items-center justify-center hover:bg-[#e0f0ff] shadow-sm font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold text-base w-4 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren((c) => Math.min(6, c + 1))}
                      className="w-8 h-8 rounded-full bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white flex items-center justify-center hover:bg-[#e0f0ff] shadow-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms Counter */}
                <div className="p-4 bg-[#ebf5ff] dark:bg-white/5 rounded-xl flex items-center justify-between border border-[#bfc7d2]/20">
                  <div>
                    <span className="text-sm font-bold text-[#0b1d29] dark:text-white block">
                      {t("Suites / Rooms")}
                    </span>
                    <span className="text-xs text-[#3f4850] dark:text-[#cadced]">{t("Max 4 suites")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setRooms((r) => Math.max(1, r - 1))}
                      className="w-8 h-8 rounded-full bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white flex items-center justify-center hover:bg-[#e0f0ff] shadow-sm font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold text-base w-4 text-center">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => setRooms((r) => Math.min(4, r + 1))}
                      className="w-8 h-8 rounded-full bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white flex items-center justify-center hover:bg-[#e0f0ff] shadow-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: ACCOMMODATION SELECTION */}
            <div
              className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6 border border-[#bfc7d2]/20"
              id="step-room"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#006194] font-bold text-sm flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h2 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold">
                      {t("Select Sanctuary Room")}
                    </h2>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced]">
                      {t("Handcrafted Moroccan finishes with organic linens and unhindered ocean horizons")}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase text-[#675d4d] dark:text-[#d3c4b1] bg-[#f0e0cc] px-3 py-1 rounded-full">
                  {t("All Include Berber Breakfast")}
                </span>
              </div>

              {/* Room 1 */}
              <div
                onClick={() => setSelectedRoom('sea-view')}
                className={`group relative block cursor-pointer rounded-2xl p-4 sm:p-5 transition-all border ${
                  selectedRoom === 'sea-view'
                    ? 'bg-[#ebf5ff] dark:bg-white/10 ring-2 ring-[#006194]'
                    : 'bg-white dark:bg-[#0b1d29] hover:bg-[#f6faff] border-[#bfc7d2]/20'
                }`}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden relative shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={t("Sea View Suite")}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjPhEshKOCdBbP6dinv9Djp264kPh7CMjZsCWBxw2GZDlGtP5qRtU4It3Ln5lBbzOyZOV9zWQxNArwRl-cm3KfPb6_bkY18pImb9ZqQMVI99ClyRWS0gsTkJZ38qnW4K_h9mgJvgrNIC2YNhuFPnaonzF6e6rFYpNRmRhzBEA34ysdinmCB7i-i558pZVcEsilRgnyjcTG0cyCF8_hvCMuGQuaIO-TXyRPtPhYQXWwS1Nbsw2glVNt"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-white/90 dark:bg-[#0b1d29]/90 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase text-[#006194] dark:text-[#93ccff]">
                      {t("Ocean Front")}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold">
                            {t("Sea View Balcony Suite")}
                          </h3>
                          <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-1 leading-relaxed">
                            {t("Private shaded terrace facing the Atlantic breakers, handcrafted cedar furniture, king bed, and artisanal tadelakt bathroom with organic argan amenities.")}
                          </p>
                        </div>
                        <div className="text-end shrink-0">
                          <span className="font-serif-display text-xl font-bold text-[#006194] dark:text-[#93ccff]">
                            €180
                          </span>
                          <span className="text-[10px] text-[#3f4850] dark:text-[#cadced] block">{t("/ night")}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-[#3f4850] dark:text-[#cadced]">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            king_bed
                          </span>{' '}
                          {t("King Size")}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            balcony
                          </span>{' '}
                          {t("Ocean Vista")}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            bathtub
                          </span>{' '}
                          {t("Ensuite Plaster Bath")}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            surfing
                          </span>{' '}
                          {t("Board Storage")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#bfc7d2]/15">
                      <span className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        {t("Only 2 left for your dates")}
                      </span>
                      <span className="text-xs font-bold text-[#006194] dark:text-[#93ccff] flex items-center gap-1">
                        {selectedRoom === 'sea-view' ? t("Selected Room") : t("Select")}
                        <span className="material-symbols-outlined text-[18px]">
                          {selectedRoom === 'sea-view' ? 'radio_button_checked' : 'radio_button_unchecked'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room 2 */}
              <div
                onClick={() => setSelectedRoom('pool')}
                className={`group relative block cursor-pointer rounded-2xl p-4 sm:p-5 transition-all border ${
                  selectedRoom === 'pool'
                    ? 'bg-[#ebf5ff] dark:bg-white/10 ring-2 ring-[#006194]'
                    : 'bg-white dark:bg-[#0b1d29] hover:bg-[#f6faff] border-[#bfc7d2]/20'
                }`}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden relative shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={t("Pool & Garden Terrace Room")}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHWsLKmyr9a7XzvoA3BL-aGbHIqUEQksWKe2DFsU995yn4lEPs7Ikc7OAJKhMrDuFpdGUABa2ryt1PZF2LMBg6FGvshgHrv16_OgEPCrAIHRFysu4SVlANhiXvItdGtm2RXT7j5y2hpa_cbF0xTJ38KYAl12ME-wYQv16SSgEHoWbb4Chl2_AgpDkOzRRDii8EkqSk1ObIW6QhSTMT95Y9llT3cz-FebBqxZagaSuBFzslbG9x1P3p"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-white/90 dark:bg-[#0b1d29]/90 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase text-[#675d4d] dark:text-[#d3c4b1]">
                      {t("Pool Access")}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold">
                            {t("Pool & Garden Terrace")}
                          </h3>
                          <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-1 leading-relaxed">
                            {t("Direct garden step-out to the heated stone saltwater infinity pool. Ambient morning shadow and calm courtyard seclusion.")}
                          </p>
                        </div>
                        <div className="text-end shrink-0">
                          <span className="font-serif-display text-xl font-bold text-[#006194] dark:text-[#93ccff]">
                            €150
                          </span>
                          <span className="text-[10px] text-[#3f4850] dark:text-[#cadced] block">{t("/ night")}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-[#3f4850] dark:text-[#cadced]">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            pool
                          </span>{' '}
                          {t("Step to Water")}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            bed
                          </span>{' '}
                          {t("Queen or Twin")}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            spa
                          </span>{' '}
                          {t("Courtyard Calm")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#bfc7d2]/15">
                      <span className="text-[#3f4850] dark:text-[#cadced] text-xs">{t("Available")}</span>
                      <span className="text-xs font-bold text-[#006194] dark:text-[#93ccff] flex items-center gap-1">
                        {selectedRoom === 'pool' ? t("Selected Room") : t("Select")}
                        <span className="material-symbols-outlined text-[18px]">
                          {selectedRoom === 'pool' ? 'radio_button_checked' : 'radio_button_unchecked'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room 3 */}
              <div
                onClick={() => setSelectedRoom('penthouse')}
                className={`group relative block cursor-pointer rounded-2xl p-4 sm:p-5 transition-all border ${
                  selectedRoom === 'penthouse'
                    ? 'bg-[#ebf5ff] dark:bg-white/10 ring-2 ring-[#006194]'
                    : 'bg-white dark:bg-[#0b1d29] hover:bg-[#f6faff] border-[#bfc7d2]/20'
                }`}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden relative shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={t("Penthouse Ocean Residence")}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj438Su7SxNp5WG-h9_S5JNyYDL1uRYtEBLgZh5yhOl-yBcSeINcXYECeG5LbucTrQNNRHv63ptiha7-E8er758e-ENrVWfwoBtrYxRCrAnWEnjSSYC5FallNCIKfpelXcYmdJeNKUedzlbtRdyh68MVxoAbk2a6oG2jjulww982RhIqbw5ztfiExfs-AJ_y99FEZs-BUA7t-hvDpPPX5v930DUiOljq2u46Qn4rDVPyhUE25mfMGs"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#006194] text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">
                      {t("Signature Penthouse")}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold">
                            {t("Penthouse Ocean Residence")}
                          </h3>
                          <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-1 leading-relaxed">
                            {t("Entire upper-level panoramic lodge flat with dual wrap-around sunset decks, private outdoor shower, fireplace, and lounge for wave observation.")}
                          </p>
                        </div>
                        <div className="text-end shrink-0">
                          <span className="font-serif-display text-xl font-bold text-[#006194] dark:text-[#93ccff]">
                            €320
                          </span>
                          <span className="text-[10px] text-[#3f4850] dark:text-[#cadced] block">{t("/ night")}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-[#3f4850] dark:text-[#cadced]">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            qr_code_2
                          </span>{' '}
                          {t("270° Vista")}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            fireplace
                          </span>{' '}
                          {t("Fire Hearth")}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0f0ff] dark:bg-white/5">
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            groups
                          </span>{' '}
                          {t("Up to 4 Guests")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#bfc7d2]/15">
                      <span className="text-[#3f4850] dark:text-[#cadced] text-xs">{t("1 Residence remaining")}</span>
                      <span className="text-xs font-bold text-[#006194] dark:text-[#93ccff] flex items-center gap-1">
                        {selectedRoom === 'penthouse' ? t("Selected Room") : t("Select")}
                        <span className="material-symbols-outlined text-[18px]">
                          {selectedRoom === 'penthouse' ? 'radio_button_checked' : 'radio_button_unchecked'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4: SURF & COACHING ADD-ON */}
            <div
              className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6 border border-[#bfc7d2]/20"
              id="step-surf"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#006194] font-bold text-sm flex items-center justify-center">
                    4
                  </span>
                  <div>
                    <h2 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold">
                      {t("Surf & Coaching Program")}
                    </h2>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced]">
                      {t("Would you like to add ocean sessions to your stay?")}
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline text-xs text-[#00628d] dark:text-[#89ceff] bg-[#c9e6ff]/40 dark:bg-white/10 px-3 py-1 rounded-full font-semibold">
                  {t("ISA Certified Coaches")}
                </span>
              </div>

              {/* Surf Tier Switcher Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {[
                  { id: 'No Surf', title: 'No Surf', sub: 'Relax Only', icon: 'chair' },
                  { id: 'Surf Lessons', title: 'Surf Lessons', sub: 'Beginner Focus', icon: 'school' },
                  { id: 'Surf Guiding', title: 'Point Guiding', sub: 'Intermediate+', icon: 'explore' },
                  { id: 'Surf & Stay', title: 'Surf & Stay', sub: 'Full Immersion', icon: 'surfing' },
                  { id: 'Surf + Yoga', title: 'Surf + Yoga', sub: 'Holistic Flow', icon: 'self_improvement' },
                  { id: 'Equipment Rental', title: 'Rental Only', sub: 'Quiver Access', icon: 'skateboarding' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSurfCategory(tier.id)}
                    className={`p-3 rounded-xl text-center flex flex-col items-center justify-center gap-1 transition-all border ${
                      surfCategory === tier.id
                        ? 'bg-[#006194] text-white shadow-md border-[#006194]'
                        : 'bg-[#ebf5ff] dark:bg-white/5 hover:bg-[#e0f0ff] dark:hover:bg-white/10 text-[#0b1d29] dark:text-white border-[#bfc7d2]/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{tier.icon}</span>
                    <span className="text-xs font-bold leading-tight">{t(tier.title)}</span>
                    <span className="text-[10px] opacity-80">{t(tier.sub)}</span>
                  </button>
                ))}
              </div>

              {/* Multi-Guest Allocation Module */}
              <div className="bg-[#ebf5ff] dark:bg-white/5 p-5 rounded-xl flex flex-col gap-4 border border-[#bfc7d2]/20">
                <span className="text-sm font-bold text-[#0b1d29] dark:text-white">
                  {t("Custom Guest Surf Assignments")}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Guest 1 */}
                  <div className="bg-white dark:bg-[#0b1d29] p-4 rounded-xl shadow-sm flex flex-col gap-2 border border-[#bfc7d2]/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1d29] dark:text-white">
                        {t("Guest 1 (Lead Traveler)")}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#cce5ff] text-[#001d31] text-[10px] font-semibold">
                        {t("Point Guiding")}
                      </span>
                    </div>
                    <select
                      value={guest1Surf}
                      onChange={(e) => setGuest1Surf(e.target.value)}
                      className="w-full bg-[#ebf5ff] dark:bg-white/10 rounded-lg p-2.5 text-xs text-[#0b1d29] dark:text-white focus:outline-none"
                    >
                      <option value="Advanced Guiding">{t("Level 3: Intermediate/Advanced Point Break Guiding (+€320)")}</option>
                      <option value="Beginner Coaching">{t("Level 1: Daily Sandbank Surf Lessons (+€280)")}</option>
                      <option value="Equipment Rental Only">{t("Quiver Rental Only (Torq / Firewire) (+€120)")}</option>
                      <option value="No Coaching">{t("No Coaching")}</option>
                    </select>
                    <div className="flex items-center gap-2 text-[#3f4850] dark:text-[#cadced] text-[11px] pt-1">
                      <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                        check
                      </span>
                      <span>{t("4x4 Beach Transfer & Video Analysis Included")}</span>
                    </div>
                  </div>

                  {/* Guest 2 */}
                  <div className="bg-white dark:bg-[#0b1d29] p-4 rounded-xl shadow-sm flex flex-col gap-2 border border-[#bfc7d2]/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1d29] dark:text-white">{t("Guest 2")}</span>
                      <span className="px-2 py-0.5 rounded bg-[#f0e0cc] text-[#221a0e] text-[10px] font-semibold">
                        {t("Lessons")}
                      </span>
                    </div>
                    <select
                      value={guest2Surf}
                      onChange={(e) => setGuest2Surf(e.target.value)}
                      className="w-full bg-[#ebf5ff] dark:bg-white/10 rounded-lg p-2.5 text-xs text-[#0b1d29] dark:text-white focus:outline-none"
                    >
                      <option value="Beginner Lessons">{t("Level 1: Daily Sandbank Surf Lessons (+€280)")}</option>
                      <option value="Improver Guiding">{t("Level 2: Reef & Point Transition (+€320)")}</option>
                      <option value="Equipment Rental Only">{t("Quiver Rental Only (+€120)")}</option>
                      <option value="No Surf">{t("No Surf Coaching")}</option>
                    </select>
                    <div className="flex items-center gap-2 text-[#3f4850] dark:text-[#cadced] text-[11px] pt-1">
                      <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                        check
                      </span>
                      <span>{t("1:4 Coach Ratio + Soft-top & 3/2mm Wetsuit")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 5: EXTRAS & EXPERIENCES */}
            <div
              className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6 border border-[#bfc7d2]/20"
              id="step-extras"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#006194] font-bold text-sm flex items-center justify-center">
                    5
                  </span>
                  <div>
                    <h2 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold">
                      {t("Retreat Extras & Coastal Flow")}
                    </h2>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced]">
                      {t("Elevate your stay with handpicked Berber wellness and seamless arrivals")}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#3f4850] dark:text-[#cadced]">{t("Flexible Additions")}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Extra 1: Transfer */}
                <label className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5 hover:bg-[#e0f0ff] dark:hover:bg-white/10 cursor-pointer transition-all flex items-start gap-4 border border-[#bfc7d2]/20">
                  <input
                    checked={transferExtra}
                    onChange={(e) => setTransferExtra(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded text-[#006194] focus:ring-[#006194] accent-[#006194]"
                    type="checkbox"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0b1d29] dark:text-white">
                        {t("Agadir Airport Transfer")}
                      </span>
                      <span className="text-sm font-bold text-[#006194] dark:text-[#93ccff]">€70</span>
                    </div>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-1 leading-relaxed">
                      {t("Round-trip private air-conditioned van from Agadir Al-Massira (AGA) right to our lodge gates.")}
                    </p>
                    <span className="inline-block mt-2 text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                      {t("Private Driver • Surfboard Roof Rack")}
                    </span>
                  </div>
                </label>

                {/* Extra 2: Yoga */}
                <label className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5 hover:bg-[#e0f0ff] dark:hover:bg-white/10 cursor-pointer transition-all flex items-start gap-4 border border-[#bfc7d2]/20">
                  <input
                    checked={yogaExtra}
                    onChange={(e) => setYogaExtra(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded text-[#006194] focus:ring-[#006194] accent-[#006194]"
                    type="checkbox"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0b1d29] dark:text-white">
                        {t("Daily Sunset Shala Yoga")}
                      </span>
                      <span className="text-sm font-bold text-[#006194] dark:text-[#93ccff]">€105</span>
                    </div>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-1 leading-relaxed">
                      {t("7 evenings of restorative ocean-terrace Vinyasa & Yin sessions tailored for paddle recovery.")}
                    </p>
                    <span className="inline-block mt-2 text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                      {t("Mats, Bolsters & Herbal Mint Tea")}
                    </span>
                  </div>
                </label>

                {/* Extra 3: Half-Board */}
                <label className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5 hover:bg-[#e0f0ff] dark:hover:bg-white/10 cursor-pointer transition-all flex items-start gap-4 border border-[#bfc7d2]/20">
                  <input
                    checked={halfboardExtra}
                    onChange={(e) => setHalfboardExtra(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded text-[#006194] focus:ring-[#006194] accent-[#006194]"
                    type="checkbox"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0b1d29] dark:text-white">
                        {t("Organic Half-Board Dining")}
                      </span>
                      <span className="text-sm font-bold text-[#006194] dark:text-[#93ccff]">€175</span>
                    </div>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-1 leading-relaxed">
                      {t("Nightly family-style 3-course Moroccan tagines, ocean-fresh line fish, couscous, and fresh pastries.")}
                    </p>
                    <span className="inline-block mt-2 text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                      {t("Local Souss Valley Produce")}
                    </span>
                  </div>
                </label>

                {/* Extra 4: Premium Quiver */}
                <label className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5 hover:bg-[#e0f0ff] dark:hover:bg-white/10 cursor-pointer transition-all flex items-start gap-4 border border-[#bfc7d2]/20">
                  <input
                    checked={quiverExtra}
                    onChange={(e) => setQuiverExtra(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded text-[#006194] focus:ring-[#006194] accent-[#006194]"
                    type="checkbox"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0b1d29] dark:text-white">
                        {t("Premium Fiber Quiver Pass")}
                      </span>
                      <span className="text-sm font-bold text-[#006194] dark:text-[#93ccff]">€60</span>
                    </div>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-1 leading-relaxed">
                      {t("Unlimited board swapping from our test center: custom PU twin fins, fishes, and performance shortboards.")}
                    </p>
                    <span className="inline-block mt-2 text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                      {t("Swap Anytime Based on Tide")}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* STEP 6: GUEST DETAILS & ARRIVAL */}
            <div
              className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6 border border-[#bfc7d2]/20"
              id="step-details"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#006194] font-bold text-sm flex items-center justify-center">
                    6
                  </span>
                  <div>
                    <h2 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold">
                      {t("Guest Details & Arrival")}
                    </h2>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced]">
                      {t("We tailor your room temperature and arrival tagine before landing")}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#006194] dark:text-[#93ccff] flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">lock</span> {t("Encrypted")}
                </span>
              </div>

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3f4850] dark:text-[#cadced]">
                    {t("First Name *")}
                  </label>
                  <input
                    className="h-[50px] px-4 rounded-lg bg-[#ebf5ff] dark:bg-white/10 text-[#0b1d29] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#bfc7d2]/20"
                    required
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3f4850] dark:text-[#cadced]">
                    {t("Last Name *")}
                  </label>
                  <input
                    className="h-[50px] px-4 rounded-lg bg-[#ebf5ff] dark:bg-white/10 text-[#0b1d29] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#bfc7d2]/20"
                    required
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3f4850] dark:text-[#cadced]">
                    {t("Email Address *")}
                  </label>
                  <input
                    className="h-[50px] px-4 rounded-lg bg-[#ebf5ff] dark:bg-white/10 text-[#0b1d29] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#bfc7d2]/20"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3f4850] dark:text-[#cadced]">
                    {t("WhatsApp / Phone Number *")}
                  </label>
                  <input
                    className="h-[50px] px-4 rounded-lg bg-[#ebf5ff] dark:bg-white/10 text-[#0b1d29] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#bfc7d2]/20"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3f4850] dark:text-[#cadced]">
                    {t("Country of Residence *")}
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="h-[50px] px-4 rounded-lg bg-[#ebf5ff] dark:bg-white/10 text-[#0b1d29] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#bfc7d2]/20"
                  >
                    <option value="SE">{t("Sweden")}</option>
                    <option value="FR">{t("France")}</option>
                    <option value="DE">{t("Germany")}</option>
                    <option value="UK">{t("United Kingdom")}</option>
                    <option value="MA">{t("Morocco")}</option>
                    <option value="US">{t("United States")}</option>
                    <option value="ES">{t("Spain")}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3f4850] dark:text-[#cadced]">
                    {t("Flight Arrival Info / ETA (Optional)")}
                  </label>
                  <input
                    className="h-[50px] px-4 rounded-lg bg-[#ebf5ff] dark:bg-white/10 text-[#0b1d29] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#bfc7d2]/20"
                    placeholder={t("e.g. Royal Air Maroc AT802 @ 16:30")}
                    type="text"
                    value={flightEta}
                    onChange={(e) => setFlightEta(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3f4850] dark:text-[#cadced]">
                    {t("Dietary Preferences or Surf Board Dimensions")}
                  </label>
                  <textarea
                    className="p-4 rounded-lg bg-[#ebf5ff] dark:bg-white/10 text-[#0b1d29] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#bfc7d2]/20"
                    placeholder={t("Let our chef know about vegetarian/vegan desires, or tell our guides your favorite board dimensions...")}
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  ></textarea>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#006194] focus:ring-[#006194] accent-[#006194]"
                      type="checkbox"
                      required
                    />
                    <span className="text-xs text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                      {t("I agree to the Blue Wave Lodge")}{' '}
                      <span className="text-[#006194] dark:text-[#93ccff] underline">
                        {t("Sanctuary Terms & Booking Policy")}
                      </span>
                      {t(". I understand no payment is charged now; availability is personally reviewed by the host within 2 hours.")}
                    </span>
                  </label>
                </div>

                <div className="sm:col-span-2 mt-4 flex flex-col sm:flex-row gap-4">
                  {sendError && (
                    <p className="sm:col-span-2 text-red-500 text-xs text-center">{t(sendError)}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="flex-1 py-4 px-6 rounded-xl bg-[#006194] hover:bg-[#007bb9] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <><span>{t("Sending…")}</span><span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span></>
                    ) : (
                      <><span>{t("Send Reservation Request")}</span><span className="material-symbols-outlined text-[20px]">arrow_forward</span></>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onOpenConcierge}
                    className="py-4 px-6 rounded-xl bg-[#e0f0ff] dark:bg-white/10 text-[#006194] dark:text-[#93ccff] hover:bg-[#d8ebfc] text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 border border-[#bfc7d2]/20"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>{t("Fast-Track via WhatsApp")}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Booking Summary Panel */}
          <aside className="lg:col-span-4 sticky top-24 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 shadow-md flex flex-col gap-5 border border-[#bfc7d2]/20 text-[#0b1d29] dark:text-white">
              <div className="flex items-center justify-between pb-4 border-b border-[#bfc7d2]/20">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#006194] dark:text-[#93ccff]">
                    {t("Summary")}
                  </span>
                  <h3 className="font-serif-display text-2xl font-semibold">{t("Your Stay Overview")}</h3>
                </div>
                <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[28px]">
                  beach_access
                </span>
              </div>

              {/* Dynamic Details List */}
              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex justify-between items-center py-2 bg-[#ebf5ff] dark:bg-white/5 px-3 rounded-lg border border-[#bfc7d2]/20">
                  <span className="text-[#3f4850] dark:text-[#cadced]">{t("Dates:")}</span>
                  <span className="font-bold text-[#0b1d29] dark:text-white">
                    {formatDate(checkIn, language)} – {formatDate(checkOut, language)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-[#3f4850] dark:text-[#cadced]">{t("Nights:")}</span>
                  <span className="font-semibold text-[#0b1d29] dark:text-white">{nights} {t("Nights")}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-[#3f4850] dark:text-[#cadced]">{t("Party Size:")}</span>
                  <span className="font-semibold text-[#0b1d29] dark:text-white">
                    {adults} {t("Adults")}{children > 0 ? `, ${children} ${t('Children')}` : ''} • {rooms} {t(rooms === 1 ? 'Suite' : 'Suites')}
                  </span>
                </div>

                <div className="flex justify-between items-start py-1">
                  <span className="text-[#3f4850] dark:text-[#cadced]">{t("Room:")}</span>
                  <div className="text-end">
                    <span className="font-semibold block text-[#0b1d29] dark:text-white">
                      {t(activeRoomData.name)}
                    </span>
                    <span className="text-xs text-[#006194] dark:text-[#93ccff] font-bold">
                      €{activeRoomData.total} {t("total")}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-start py-1">
                  <span className="text-[#3f4850] dark:text-[#cadced]">{t("Surf Package:")}</span>
                  <div className="text-end">
                    <span className="font-semibold block text-[#0b1d29] dark:text-white">{t(surfCategory)}</span>
                    <span className="text-xs text-[#3f4850] dark:text-[#cadced]">
                      €{surfCost} {t("total (")}{adults} {t("guests)")}
                    </span>
                  </div>
                </div>

                {/* Extras itemized */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#bfc7d2]/20 text-xs text-[#3f4850] dark:text-[#cadced]">
                  <div className="flex justify-between">
                    <span>{t("Airport Transfer:")}</span>
                    <span>{transferExtra ? '€70' : t("Not selected")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("Sunset Shala Yoga:")}</span>
                    <span>{yogaExtra ? '€105' : t("Not selected")}</span>
                  </div>
                  {halfboardExtra && (
                    <div className="flex justify-between">
                      <span>{t("Half-Board Feast:")}</span>
                      <span>€175</span>
                    </div>
                  )}
                  {quiverExtra && (
                    <div className="flex justify-between">
                      <span>{t("Fiber Quiver Pass:")}</span>
                      <span>€60</span>
                    </div>
                  )}
                </div>

                {/* Total Price Calculation */}
                <div className="pt-4 mt-2 border-t border-[#bfc7d2]/20 flex items-baseline justify-between">
                  <div>
                    <span className="font-serif-display text-xl text-[#0b1d29] dark:text-white block leading-tight font-bold">
                      {t("Total Stay")}
                    </span>
                    <span className="text-[10px] text-[#3f4850] dark:text-[#cadced]">
                      {t("Includes tourist tax & VAT")}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="font-serif-display text-2xl font-bold text-[#006194] dark:text-[#93ccff]">
                      €{grandTotal}
                    </span>
                    <span className="block text-[10px] text-[#675d4d] dark:text-[#d3c4b1] font-semibold">
                      {t("Deposit due on review: €")}{depositAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-[#ebf5ff] dark:bg-white/5 p-4 rounded-xl flex flex-col gap-2.5 border border-[#bfc7d2]/20 text-xs">
                <div className="flex items-center gap-2 text-[#0b1d29] dark:text-white">
                  <span className="material-symbols-outlined text-[18px] text-[#00628d] dark:text-[#89ceff]">
                    schedule
                  </span>
                  <span>{t("Host Review within 2 hours")}</span>
                </div>
                <div className="flex items-center gap-2 text-[#0b1d29] dark:text-white">
                  <span className="material-symbols-outlined text-[18px] text-[#00628d] dark:text-[#89ceff]">
                    event_busy
                  </span>
                  <span>{t("Free cancellation up to 14 days prior")}</span>
                </div>
                <div className="flex items-center gap-2 text-[#0b1d29] dark:text-white">
                  <span className="material-symbols-outlined text-[18px] text-[#00628d] dark:text-[#89ceff]">
                    water_drop
                  </span>
                  <span>{t("Complimentary surf check briefing daily")}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => jumpTo('step-details')}
                className="w-full py-3 px-4 rounded-xl bg-[#006194] text-white text-xs md:text-sm font-semibold hover:bg-[#007bb9] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>{t("Proceed to Confirmation")}</span>
                <span className="material-symbols-outlined text-[18px]">south</span>
              </button>
            </div>

            {/* Assistance Card */}
            <div className="bg-[#ebf5ff] dark:bg-white/5 rounded-2xl p-5 flex items-center gap-4 border border-[#bfc7d2]/20">
              <div className="w-12 h-12 rounded-full bg-[#f0e0cc] text-[#675d4d] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div>
                <h4 className="font-serif-display text-base font-bold text-[#0b1d29] dark:text-white">
                  {t("Need a custom date?")}
                </h4>
                <p className="text-xs text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                  {t("Our Imi Ouaddar lodge concierge can accommodate split stays or private surf camp buyouts.")}
                </p>
                <a
                  className="text-[#006194] dark:text-[#93ccff] text-xs font-bold underline inline-block mt-1"
                  href="tel:+212528000000"
                >
                  +212 (0) 528 000 000
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* SUCCESS STATE MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1d29]/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0b1d29] rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative flex flex-col gap-6 border border-[#bfc7d2]/20 text-[#0b1d29] dark:text-white">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#ebf5ff] dark:bg-white/10 flex items-center justify-center text-[#3f4850] dark:text-[#cadced] hover:text-[#0b1d29]"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="w-16 h-16 rounded-2xl bg-[#cce5ff] text-[#006194] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[36px]">mark_email_read</span>
            </div>

            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-[#675d4d] dark:text-[#d3c4b1] font-bold block mb-1">
                {t("Reservation Request Received")}
              </span>
              <h2 className="font-serif-display text-2xl md:text-3xl font-semibold">
                {t("Marhaban! Your Atlantic Haven Awaits")}
              </h2>
              <p className="text-xs md:text-sm text-[#3f4850] dark:text-[#cadced] mt-2">
                {t("Thank you,")} <strong>{firstName || t('Valued Guest')}</strong>{t(". We have logged your reservation request for")}{' '}
                <span className="text-[#006194] dark:text-[#93ccff] font-semibold">
                  {t(activeRoomData.name)}
                </span>{' '}
                {t("for")}{' '}
                <strong>
                  {formatDate(checkIn, language)} - {formatDate(checkOut, language)} ({nights} {t("nights)")}
                </strong>
                .
              </p>u
            </div>

            <div className="bg-[#ebf5ff] dark:bg-white/5 p-4 rounded-2xl flex flex-col gap-2.5 text-xs text-[#3f4850] dark:text-[#cadced] border border-[#bfc7d2]/20">
              <div className="flex items-center justify-between">
                <span className="text-[#0b1d29] dark:text-white font-semibold">{t("Status:")}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f0e0cc] text-[#221a0e] text-[10px] font-bold">
                  {t("Under Concierge Review")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#0b1d29] dark:text-white font-semibold">{t("Response Window:")}</span>
                <span className="text-[#006194] dark:text-[#93ccff] font-bold">{t("Within 2 hours")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#0b1d29] dark:text-white font-semibold">{t("Total Estimated:")}</span>
                <span className="font-bold text-[#0b1d29] dark:text-white">€{grandTotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#0b1d29] dark:text-white font-semibold">{t("Selected Add-ons:")}</span>
                <span>
                  {transferExtra ? t("Transfer •") + ' ' : ''}
                  {yogaExtra ? t("Sunset Yoga •") + ' ' : ''}
                  {t(surfCategory)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={onOpenConcierge}
                className="w-full py-3.5 px-5 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>{t("Open WhatsApp for Instant VIP Verification")}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 px-5 rounded-xl bg-[#ebf5ff] dark:bg-white/10 hover:bg-[#d8ebfc] text-[#0b1d29] dark:text-white text-xs md:text-sm font-semibold transition-all"
              >
                {t("Return to Booking Overview")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { ACCOMMODATIONS } from '../data/accommodations';
import { RoomCard } from '../components/RoomCard';
import { StayOffers } from '../components/StayOffers';
import { todayISO, addNights } from '../lib/booking';
import { getTranslator } from '../i18n/translations';
import React, { useState } from 'react';
import heroBg from '../images/68c49e7e-6fd8-4fe8-a539-23852e4c8983.jpeg';
import { ScreenType, RoomItem, Language, BookingDraft } from '../types';
import {
  GALLERY_ITEMS,
  TESTIMONIALS_DATA,
  AMENITIES_DATA
} from '../data/mockData';

interface HomeViewProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  onBook: (room: RoomItem) => void;
  onSearch: (draft: Partial<BookingDraft>) => void;
  onOffer: (nights: number) => void;
  onOpenConcierge: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  onNavigate,
  onBook,
  onSearch,
  onOffer,
  onOpenConcierge
}) => {
  const t = getTranslator(language);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'surf' | 'rooms' | 'pool' | 'lifestyle'>('all');

  // Booking widget form state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Adults');
  const [roomId, setRoomId] = useState('');

  const handleSearchRates = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, roomId, adults: guests === '1 Adult' ? 1 : guests === '3+ Group' ? 3 : 2, children: guests === '2 Adults, 1 Child' ? 1 : 0 });
  };

  const filteredGallery =
    galleryFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === galleryFilter);


  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <section className="relative w-full overflow-hidden bg-[#0b1d29] text-white">
        <div className="absolute inset-0 z-0">
          <img
            alt={t("Blue Wave Lodge oceanfront infinity pool and sunset over Imi Ouaddar Atlantic coast")}
            className="w-full h-full object-cover scale-105 transform motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-out"
            src={heroBg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29] via-[#0b1d29]/40 to-[#0b1d29]/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d29]/80 via-[#0b1d29]/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-12 pt-28 pb-28 md:pb-36 min-h-[85vh] flex flex-col justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-6 text-white text-xs tracking-[0.2em] font-semibold uppercase">
              <span className="material-symbols-outlined text-[#89ceff] text-[18px]">waves</span>
              <span>{t("Atlantic Coastline • Morocco")}</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.08] mb-6 font-normal">
              {t("Stay by the Ocean.")} <br />
              <span className="italic font-normal text-[#cce5ff]">{t("Feel at Home.")}</span>
            </h1>

            <p className="text-base sm:text-lg text-white/90 max-w-xl mb-8 leading-relaxed font-sans">
              {t("Comfortable rooms and apartments, Moroccan hospitality, and time to unwind by the ocean. Surf is an optional extra.")}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="px-7 py-3.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-semibold shadow-xl hover:shadow-2xl transition-all transform active:scale-95 flex items-center gap-2"
              >
                <span>{t("Book Your Stay")}</span>
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </button>

              <button
                onClick={() => onNavigate('stay')}
                className="px-7 py-3.5 rounded-lg bg-white/15 hover:bg-white/25 text-white backdrop-blur-md text-sm font-semibold transition-all flex items-center gap-2"
              >
                <span>{t("Explore Rooms & Apartments")}</span>
                <span className="material-symbols-outlined text-[18px]">surfing</span>
              </button>
            </div>
          </div>

          {/* Trust Line Strip */}
          <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/90 text-xs md:text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">king_bed</span> {t("Curated Rooms")}
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">surfing</span> {t("Equipped Apartments")}
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">pool</span> {t("Oceanfront Infinity Pool")}
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">deck</span> {t("Sunset Rooftop Lounge")}
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">restaurant</span> {t("Ocean Gastronomy")}
            </span>
          </div>
        </div>
      </section>

      {/* INTEGRATED BOOKING WIDGET */}
      <div
        className="w-full max-w-[1360px] mx-auto px-4 md:px-12 -mt-16 md:-mt-14 relative z-30 mb-16"
        id="booking-engine"
      >
        <div className="bg-white dark:bg-[#0b1d29] rounded-2xl shadow-2xl p-4 md:p-6 backdrop-blur-xl border border-[#bfc7d2]/20">
          <form
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 items-center"
            onSubmit={handleSearchRates}
          >
            {/* Check In */}
            <div className="lg:col-span-3 flex flex-col gap-1 p-3 rounded-xl bg-[#f6faff] dark:bg-white/5 hover:bg-[#ebf5ff] dark:hover:bg-white/10 transition-colors">
              <label className="text-[11px] uppercase tracking-wider text-[#675d4d] dark:text-[#d3c4b1] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#006194] dark:text-[#93ccff]">
                  calendar_today
                </span>{' '}
                {t("Check-In")}
              </label>
              <input
                className="bg-transparent text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer"
                type="date"
                min={todayISO()}
                required
                aria-label={t("Check-In")}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            {/* Check Out */}
            <div className="lg:col-span-3 flex flex-col gap-1 p-3 rounded-xl bg-[#f6faff] dark:bg-white/5 hover:bg-[#ebf5ff] dark:hover:bg-white/10 transition-colors">
              <label className="text-[11px] uppercase tracking-wider text-[#675d4d] dark:text-[#d3c4b1] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#006194] dark:text-[#93ccff]">
                  event
                </span>{' '}
                {t("Check-Out")}
              </label>
              <input
                className="bg-transparent text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer"
                type="date"
                min={addNights(checkIn, 1) || todayISO()}
                required
                aria-label={t("Check-Out")}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            {/* Guests Selector */}
            <div className="lg:col-span-2 flex flex-col gap-1 p-3 rounded-xl bg-[#f6faff] dark:bg-white/5 hover:bg-[#ebf5ff] dark:hover:bg-white/10 transition-colors">
              <label className="text-[11px] uppercase tracking-wider text-[#675d4d] dark:text-[#d3c4b1] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#006194] dark:text-[#93ccff]">
                  group
                </span>{' '}
                {t("Guests")}
              </label>
              <select
                className="bg-transparent text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer"
                aria-label={t("Guests")}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="2 Adults">{t("2 Adults, 0 Child")}</option>
                <option value="1 Adult">{t("1 Adult (Solo)")}</option>
                <option value="2 Adults, 1 Child">{t("2 Adults, 1 Child")}</option>
                <option value="3+ Group">{t("3+ Group Retreat")}</option>
              </select>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-1 p-3 rounded-xl bg-[#f6faff] dark:bg-white/5">
              <label htmlFor="home-room" className="text-[11px] uppercase tracking-wider text-[#675d4d] dark:text-[#d3c4b1] font-bold">{t('Room / Apartment')}</label>
              <select id="home-room" className="bg-transparent text-sm font-semibold focus:outline-none w-full" value={roomId} onChange={event => setRoomId(event.target.value)}>
                <option value="">{t('Choose on next step')}</option>
                {ACCOMMODATIONS.map(room => <option key={room.id} value={room.id}>{t(room.name)}</option>)}
              </select>
            </div>

            {/* Action Button */}
            <div className="lg:col-span-2 h-full flex items-end">
              <button
                type="submit"
                className="w-full h-14 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>{t("Check Rates")}</span>
                <span className="material-symbols-outlined text-[20px]">east</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* SECTION 4: FEATURED ACCOMMODATIONS */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-20" id="rooms">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
              {t("Coastal Sanctuaries")}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2">
              {t("Rooms & Apartments")}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('stay')}
            className="inline-flex items-center gap-2 text-[#006194] dark:text-[#93ccff] font-semibold hover:underline"
          >
            {t("Explore All Accommodations")} <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACCOMMODATIONS.map(room => <RoomCard key={room.id} room={room} language={language} onBook={onBook} />)}
        </div>
      </section>

      {/* SECTION 3: WHY BLUE WAVE LODGE */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
              {t("The Sanctuary Experience")}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2 mb-4">
              {t("Why Blue Wave Lodge")}
            </h2>
            <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced]">
              {t("A comfortable place to stay, with spaces to relax and enjoy the Moroccan coast.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">water</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">{t("Oceanfront Location")}</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                {t("Step directly from your room to Imi Ouaddar’s golden sands with unbroken views across the Atlantic swell window.")}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#f0e0cc] text-[#675d4d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">bed</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">{t("Comfortable Rooms")}</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                {t("Handcrafted Moroccan craftsmanship, organic linen bedding, quiet private terraces, and modern acoustic tranquility.")}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">pool</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">{t("Infinity Swimming Pool")}</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                {t("Perched right above the surfline, our turquoise infinity pool offers calm post-session dips with horizon sunsets.")}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#f0e0cc] text-[#675d4d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">deck</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">{t("Sunset Rooftop Lounge")}</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                {t("Unwind under woven pergolas with 360-degree ocean views, sunrise yoga classes, acoustic music, and golden hour mint tea.")}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">restaurant_menu</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">{t("Fresh Moroccan Cuisine")}</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                {t("Nutritious farm-to-table coastal dishes, freshly caught fish from local boats, spiced tagines, and hearty surfer breakfasts.")}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#f0e0cc] text-[#675d4d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">{t("Personalized Stays")}</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                {t("Choose your accommodation and ask our team about the experiences you would like to add.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <StayOffers language={language} onChoose={onOffer} />

      {/* SECTION 6: LODGE EXPERIENCES & AMENITIES */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-20" id="experiences">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
            {t("Resort Living")}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2 mb-4">
            {t("Lodge Amenities & Spaces")}
          </h2>
          <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced]">
            {t("Thoughtful coastal facilities designed to restore the body and foster community between sessions.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES_DATA.map((amenity, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-white dark:bg-[#0b1d29] group shadow-sm border border-[#bfc7d2]/20"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={t(amenity.title)}
                  src={amenity.image}
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold mb-2">
                  {t(amenity.title)}
                </h3>
                <p className="text-xs text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                  {t(amenity.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: EDITORIAL MASONRY GALLERY */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-20" id="gallery">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
                {t("Visual Diary")}
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2">
                {t("Moments at Blue Wave Lodge")}
              </h2>
            </div>

            {/* Gallery Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'surf', 'rooms', 'pool', 'lifestyle'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                    galleryFilter === cat
                      ? 'bg-[#006194] text-white shadow-sm'
                      : 'bg-white dark:bg-[#0b1d29] text-[#3f4850] dark:text-[#cadced] hover:text-[#006194]'
                  }`}
                >
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl overflow-hidden relative group ${
                  item.span || 'h-64'
                } border border-[#bfc7d2]/20 shadow-sm`}
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={t(item.title)}
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#93ccff] font-bold">
                    {t(item.subtitle)}
                  </span>
                  <h4 className="font-serif-display text-lg font-semibold">{t(item.title)}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRO EDITORIAL */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-12 md:py-20" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#006194] dark:text-[#93ccff] text-xs font-bold uppercase tracking-[0.2em]">
              <span className="w-6 h-[1.5px] bg-[#006194] dark:bg-[#93ccff]"></span>
              {t("Sanctuary in Taghazout Bay")}
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white tracking-tight leading-tight">
              {t("Where Berber soul meets the Atlantic crest.")}
            </h2>
            <p className="text-base sm:text-lg text-[#3f4850] dark:text-[#cadced] leading-relaxed">
              {t("Blue Wave Lodge welcomes couples, families and friends to comfortable accommodation in Imi Ouaddar, on Morocco’s Atlantic coast.")}
            </p>
            <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
              {t("Wake to morning offshore breezes, recharge by our freshwater cliffside pool, share mint tea and freshly caught Atlantic sea bream, and catch sunset glow over the point from our panoramic rooftop shala.")}
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5">
                <span className="font-serif-display text-2xl sm:text-3xl text-[#006194] dark:text-[#93ccff] font-semibold">
                  300+
                </span>
                <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1] mt-1">{t("Days of sunshine annually")}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5">
                <span className="font-serif-display text-2xl sm:text-3xl text-[#006194] dark:text-[#93ccff] font-semibold">
                  12
                </span>
                <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1] mt-1">{t("World-class reef & beach breaks")}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5">
                <span className="font-serif-display text-2xl sm:text-3xl text-[#006194] dark:text-[#93ccff] font-semibold">
                  100%
                </span>
                <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1] mt-1">{t("Ocean-facing lodge living")}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-[460px] md:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
                alt={t("Warm sunlight illuminating the bohemian Moroccan tadelakt architecture of Blue Wave Lodge")}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-2W5TuuT8jqI8E1UIR-rJw_UPbCBjA0eq3Kf1cPAe_bfEccH5ua4zG_S5wiwMDJ_dTdwg8xBYkvH4tgJ_xoPO9rgFFH8s8t9z8OtdHNlklQf7PhzPfOdrt_nRJIruTf89I261lN8KdUUQxVP_tTB5xsf2Stwy9fo5Xm-QU3o5sBAoDpak2oD3KEuJdIYCe6PxUQxwiIpJsWf9brY1Fd5XfMpR6Vdgqx26T1iCJ9t_dLknvfdIc3Zv"
              />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-white/95 dark:bg-[#0b1d29]/95 backdrop-blur-md shadow-lg border border-[#bfc7d2]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#675d4d] dark:text-[#d3c4b1]">
                      {t("Location Marker")}
                    </span>
                    <h4 className="font-serif-display text-lg text-[#0b1d29] dark:text-white font-semibold">
                      {t("Imi Ouaddar, Taghazout Bay")}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#cce5ff] text-[#001d31] text-xs font-semibold">
                    {t("25 min from Agadir")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: GUEST TESTIMONIALS */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
              {t("Guest Reflections")}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2">
              {t("Memories From Our Travelers")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="font-bold text-base text-[#0b1d29] dark:text-white">4.96 / 5.0</span>
            <span className="text-xs text-[#675d4d] dark:text-[#d3c4b1]">{t("(280+ Verified Reviews)")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm flex flex-col justify-between border border-[#bfc7d2]/20"
            >
              <div>
                <div className="flex text-amber-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-sm md:text-base text-[#0b1d29] dark:text-white mb-6 italic leading-relaxed font-serif-display">
                  &ldquo;{t(testimonial.quote)}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#bfc7d2]/20">
                <div className="w-10 h-10 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center font-bold text-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#0b1d29] dark:text-white">{testimonial.author}</p>
                  <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1]">
                    {t(testimonial.location)} • {t(testimonial.packageTaken)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: LOCATION & REACH US */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-20" id="location">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Address & Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
                {t("Taghazout Bay Coast")}
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white">
                {t("Find Blue Wave Lodge")}
              </h2>
              <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                {t("Situated peacefully on the beachfront of Imi Ouaddar within Commune Tamri, away from the heavy crowds but only 10 minutes from central Taghazout and 45 minutes from Agadir Al Massira Airport (AGA).")}
              </p>

              <div className="space-y-4 pt-2 text-sm text-[#3f4850] dark:text-[#cadced]">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[24px]">
                    pin_drop
                  </span>
                  <div>
                    <p className="font-bold text-[#0b1d29] dark:text-white">{t("Physical Address")}</p>
                    <p>{t("Lot 150, Plage Imi Ouaddar, Commune Tamri, 80000 Agadir-Ida Ou Tanane, Morocco")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[24px]">
                    schedule
                  </span>
                  <div>
                    <p className="font-bold text-[#0b1d29] dark:text-white">{t("Check-in & Check-out")}</p>
                    <p>{t("Check-in: 15:00 • Check-out: 11:30 • 24/7 Front Gate Concierge")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[24px]">
                    airport_shuttle
                  </span>
                  <div>
                    <p className="font-bold text-[#0b1d29] dark:text-white">{t("Airport Transfers")}</p>
                    <p>{t("Airport transfers can be requested. Availability and pricing are confirmed by the lodge.")}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => alert(t("Opening navigation coordinates: 30.6032° N, 9.8241° W (Plage Imi Ouaddar)"))}
                  className="px-6 py-3 rounded-lg bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white hover:bg-[#d8ebfc] text-xs md:text-sm font-semibold transition-colors inline-flex items-center gap-2 border border-[#bfc7d2]/20"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  {t("Open in Google Maps")}
                </button>
                <button
                  onClick={onOpenConcierge}
                  className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-semibold transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  {t("Direct WhatsApp Concierge")}
                </button>
              </div>
            </div>

            {/* Interactive Map View */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-[400px] md:h-[460px] rounded-2xl overflow-hidden shadow-xl border border-[#bfc7d2]/20">
                <img
                  className="w-full h-full object-cover"
                  alt={t("Coastal map view of Imi Ouaddar and Taghazout Bay")}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUzmuZV40xInbKX0WKWKhEuT039Rt-W3bRVWin-I7OQWtq-QAy0Xifn1VvNBvgK4jIII3H9R-m8jDdrsABzBaTKTo7zXewjd3cqazPgQqRiqI6T2PmW9AA0dMeT7M0OMQYohB1SuH5oS_2GxkRkM8MmgcMr4BI8_wUFfREPueFKCsNIDCDrri7HUg5HqJwyh2gMeZu89ZD9-z5jNU5ewQfRwxBCjYN67k5P0drpOW9VgR3zVv9JQFt"
                />
                <div className="absolute top-6 left-6 p-4 rounded-xl bg-white/95 dark:bg-[#0b1d29]/95 backdrop-blur-md shadow-md border border-[#bfc7d2]/20">
                  <p className="font-serif-display text-base text-[#0b1d29] dark:text-white font-bold flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#006194] animate-ping"></span>
                    {t("Blue Wave Lodge Location")}
                  </p>
                  <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1] mt-0.5">
                    {t("30.6032° N, 9.8241° W • Taghazout Bay")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="w-full bg-gradient-to-br from-[#006194] via-[#00628d] to-[#0b1d29] text-white py-24 relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#cce5ff] mb-6 text-xs uppercase tracking-[0.2em] font-semibold">
            {t("Begin Your Atlantic Journey")}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl max-w-3xl mx-auto tracking-tight mb-6 font-normal">
            {t("Ready for Your Moroccan Ocean Escape?")}
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            {t("Request your room or apartment directly with the lodge. Our team will confirm the details of your stay.")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-4 rounded-lg bg-white text-[#006194] hover:bg-[#f6faff] text-sm font-bold shadow-2xl transition-all transform active:scale-95 flex items-center gap-2"
            >
              <span>{t("Request Availability")}</span>
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </button>
            <button
              onClick={onOpenConcierge}
              className="px-8 py-4 rounded-lg bg-white/15 hover:bg-white/25 text-white backdrop-blur-md text-sm font-semibold transition-all flex items-center gap-2"
            >
              <span>{t("Contact the Lodge")}</span>
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

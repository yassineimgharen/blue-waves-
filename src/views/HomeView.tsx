import React, { useState } from 'react';
import { ScreenType, PackageItem } from '../types';
import {
  ROOMS_DATA,
  SURF_LEVELS_DATA,
  GALLERY_ITEMS,
  TESTIMONIALS_DATA,
  AMENITIES_DATA
} from '../data/mockData';

interface HomeViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenPackage: (pkg: PackageItem) => void;
  onOpenConcierge: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenPackage,
  onOpenConcierge
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('first-time');
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'surf' | 'rooms' | 'pool' | 'lifestyle'>('all');

  // Booking widget form state
  const [checkIn, setCheckIn] = useState('2025-11-08');
  const [checkOut, setCheckOut] = useState('2025-11-15');
  const [guests, setGuests] = useState('2 Adults');
  const [surfPackage, setSurfPackage] = useState('Surf Coaching (All Levels)');

  const handleSearchRates = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('booking');
  };

  const filteredGallery =
    galleryFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === galleryFilter);

  const activeLevelData = SURF_LEVELS_DATA[selectedLevel];

  return (
    <div className="flex flex-col w-full">
      {/* SWELL & WEATHER TICKER */}
      <aside
        aria-label="Real-time Surf Conditions"
        className="w-full bg-[#d8ebfc] dark:bg-[#071a26] py-2.5 px-4 md:px-12 border-b border-[#bfc7d2]/20"
      >
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3 text-[#3f4850] dark:text-[#cadced] text-xs md:text-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-[#0b1d29] text-[#006194] dark:text-[#93ccff] shadow-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Clean Offshore
            </span>
            <span className="hidden sm:inline">
              Atlantic Swell: <strong className="text-[#0b1d29] dark:text-white">1.8m @ 13s NW</strong>
            </span>
            <span className="text-[#bfc7d2]">•</span>
            <span>
              Water: <strong className="text-[#0b1d29] dark:text-white">19°C</strong>
            </span>
            <span className="text-[#bfc7d2]">•</span>
            <span>
              Tide: <strong className="text-[#0b1d29] dark:text-white">High 16:42 (+2.1m)</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#675d4d] dark:text-[#d3c4b1] hidden md:inline">
              Imi Ouaddar • Point Breaks &amp; Sanctuary
            </span>
            <button
              onClick={() => onNavigate('packages')}
              className="text-[#006194] dark:text-[#93ccff] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              Daily Surf Report <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </aside>

      {/* SECTION 1: HERO */}
      <section className="relative w-full overflow-hidden bg-[#0b1d29] text-white">
        <div className="absolute inset-0 z-0">
          <img
            alt="Blue Wave Lodge oceanfront infinity pool and sunset over Imi Ouaddar Atlantic coast"
            className="w-full h-full object-cover scale-105 transform motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-out"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjErvv9n5pVEZorD7ouFsRmOJtpzgrvX-CqJBCLp5G09aOBgea56UDFYthItvi__FB4AXMq0KDP_iAM4asisvTSDqrZVU24pqKAi9AyZ9DjBnhoCE0jiWVIEFiqb9mDe03RhZEuaekDaEtpoqLNHfXwfNflWn8_ypZYW6YzjZWQv9atY4945tA66gbp6jh8YL9xWYub376JY_GkQtIYgVw8q2br30QKtvzN1WfU3WJH7ilWU19Kcr4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29] via-[#0b1d29]/40 to-[#0b1d29]/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d29]/80 via-[#0b1d29]/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-12 pt-28 pb-28 md:pb-36 min-h-[85vh] flex flex-col justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-6 text-white text-xs tracking-[0.2em] font-semibold uppercase">
              <span className="material-symbols-outlined text-[#89ceff] text-[18px]">waves</span>
              <span>Atlantic Coastline • Morocco</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.08] mb-6 font-normal">
              Stay by the Ocean. <br />
              <span className="italic font-normal text-[#cce5ff]">Surf Morocco.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/90 max-w-xl mb-8 leading-relaxed font-sans">
              A relaxing ocean escape in Imi Ouaddar combining comfortable accommodation, authentic
              Moroccan hospitality, and unforgettable surf experiences.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="px-7 py-3.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-semibold shadow-xl hover:shadow-2xl transition-all transform active:scale-95 flex items-center gap-2"
              >
                <span>Book Your Stay</span>
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </button>

              <button
                onClick={() => onNavigate('packages')}
                className="px-7 py-3.5 rounded-lg bg-white/15 hover:bg-white/25 text-white backdrop-blur-md text-sm font-semibold transition-all flex items-center gap-2"
              >
                <span>Explore Surf Packages</span>
                <span className="material-symbols-outlined text-[18px]">surfing</span>
              </button>
            </div>
          </div>

          {/* Trust Line Strip */}
          <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/90 text-xs md:text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">king_bed</span> Curated Rooms
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">surfing</span> ISA Coaching
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">pool</span> Oceanfront Infinity Pool
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">deck</span> Sunset Rooftop Lounge
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#89ceff]">restaurant</span> Ocean Gastronomy
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
                Check-In
              </label>
              <input
                className="bg-transparent text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer"
                type="date"
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
                Check-Out
              </label>
              <input
                className="bg-transparent text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer"
                type="date"
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
                Guests
              </label>
              <select
                className="bg-transparent text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="2 Adults">2 Adults, 0 Child</option>
                <option value="1 Adult">1 Adult (Solo)</option>
                <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                <option value="3+ Group">3+ Group Retreat</option>
              </select>
            </div>

            {/* Surf Experience Option */}
            <div className="lg:col-span-2 flex flex-col gap-1 p-3 rounded-xl bg-[#f6faff] dark:bg-white/5 hover:bg-[#ebf5ff] dark:hover:bg-white/10 transition-colors">
              <label className="text-[11px] uppercase tracking-wider text-[#675d4d] dark:text-[#d3c4b1] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#006194] dark:text-[#93ccff]">
                  skateboarding
                </span>{' '}
                Surf Package
              </label>
              <select
                className="bg-transparent text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer truncate"
                value={surfPackage}
                onChange={(e) => setSurfPackage(e.target.value)}
              >
                <option value="Coaching">Surf Coaching (All Levels)</option>
                <option value="Surf & Stay">Surf &amp; Stay Standard</option>
                <option value="Yoga">Surf + Yoga Retreat</option>
                <option value="Guiding">Advanced Spot Guiding</option>
                <option value="None">None (Room Only)</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="lg:col-span-2 h-full flex items-end">
              <button
                type="submit"
                className="w-full h-14 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Check Rates</span>
                <span className="material-symbols-outlined text-[20px]">east</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* SECTION 2: INTRO EDITORIAL */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-12 md:py-20" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#006194] dark:text-[#93ccff] text-xs font-bold uppercase tracking-[0.2em]">
              <span className="w-6 h-[1.5px] bg-[#006194] dark:bg-[#93ccff]"></span>
              Sanctuary in Taghazout Bay
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white tracking-tight leading-tight">
              Where Berber soul meets the Atlantic crest.
            </h2>
            <p className="text-base sm:text-lg text-[#3f4850] dark:text-[#cadced] leading-relaxed">
              Tucked away in the tranquil fishing enclave of Imi Ouaddar—just north of Taghazout and
              minutes from Tamri&apos;s secret dunes—Blue Wave Lodge is an unhurried beachfront haven
              designed for surfers, creators, and coastal seekers.
            </p>
            <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
              Wake to morning offshore breezes, recharge by our freshwater cliffside pool, share
              mint tea and freshly caught Atlantic sea bream, and catch sunset glow over the point
              from our panoramic rooftop shala.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5">
                <span className="font-serif-display text-2xl sm:text-3xl text-[#006194] dark:text-[#93ccff] font-semibold">
                  300+
                </span>
                <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1] mt-1">Days of sunshine annually</p>
              </div>
              <div className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5">
                <span className="font-serif-display text-2xl sm:text-3xl text-[#006194] dark:text-[#93ccff] font-semibold">
                  12
                </span>
                <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1] mt-1">World-class reef &amp; beach breaks</p>
              </div>
              <div className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5">
                <span className="font-serif-display text-2xl sm:text-3xl text-[#006194] dark:text-[#93ccff] font-semibold">
                  100%
                </span>
                <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1] mt-1">Ocean-facing lodge living</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-[460px] md:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
                alt="Warm sunlight illuminating the bohemian Moroccan tadelakt architecture of Blue Wave Lodge"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-2W5TuuT8jqI8E1UIR-rJw_UPbCBjA0eq3Kf1cPAe_bfEccH5ua4zG_S5wiwMDJ_dTdwg8xBYkvH4tgJ_xoPO9rgFFH8s8t9z8OtdHNlklQf7PhzPfOdrt_nRJIruTf89I261lN8KdUUQxVP_tTB5xsf2Stwy9fo5Xm-QU3o5sBAoDpak2oD3KEuJdIYCe6PxUQxwiIpJsWf9brY1Fd5XfMpR6Vdgqx26T1iCJ9t_dLknvfdIc3Zv"
              />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-white/95 dark:bg-[#0b1d29]/95 backdrop-blur-md shadow-lg border border-[#bfc7d2]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#675d4d] dark:text-[#d3c4b1]">
                      Location Marker
                    </span>
                    <h4 className="font-serif-display text-lg text-[#0b1d29] dark:text-white font-semibold">
                      Imi Ouaddar, Taghazout Bay
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#cce5ff] text-[#001d31] text-xs font-semibold">
                    25 min from Agadir
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY BLUE WAVE LODGE */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
              The Sanctuary Experience
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2 mb-4">
              Why Blue Wave Lodge
            </h2>
            <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced]">
              Carefully balanced between surf performance house and serene Moroccan boutique haven.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">water</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">Oceanfront Location</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                Step directly from your room to Imi Ouaddar’s golden sands with unbroken views across
                the Atlantic swell window.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#f0e0cc] text-[#675d4d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">bed</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">Comfortable Rooms</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                Handcrafted Moroccan craftsmanship, organic linen bedding, quiet private terraces, and
                modern acoustic tranquility.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">pool</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">Infinity Swimming Pool</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                Perched right above the surfline, our turquoise infinity pool offers calm post-session
                dips with horizon sunsets.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#f0e0cc] text-[#675d4d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">deck</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">Sunset Rooftop Lounge</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                Unwind under woven pergolas with 360-degree ocean views, sunrise yoga classes, acoustic
                music, and golden hour mint tea.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">restaurant_menu</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">Fresh Moroccan Cuisine</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                Nutritious farm-to-table coastal dishes, freshly caught fish from local boats, spiced
                tagines, and hearty surfer breakfasts.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20">
              <div className="w-14 h-14 rounded-xl bg-[#f0e0cc] text-[#675d4d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1d29] dark:text-white mb-2">Certified Surf Guiding</h3>
              <p className="text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                Local Moroccan surf masters with ISA credentials guiding you to the best daily conditions
                from Anchor Point to Tamri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED ACCOMMODATIONS */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-20" id="rooms">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
              Coastal Sanctuaries
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2">
              Boutique Accommodations
            </h2>
          </div>
          <button
            onClick={() => onNavigate('stay')}
            className="inline-flex items-center gap-2 text-[#006194] dark:text-[#93ccff] font-semibold hover:underline"
          >
            Explore All Accommodations <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOMS_DATA.map((room) => (
            <div
              key={room.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-[#0b1d29] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-[#bfc7d2]/20"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={room.name}
                  src={room.image}
                />
                {room.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-[#0b1d29]/90 backdrop-blur-md text-[#0b1d29] dark:text-white text-xs font-bold">
                    {room.badge}
                  </span>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#675d4d] dark:text-[#d3c4b1] mb-2">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">king_bed</span> {room.bedType}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">person</span> {room.capacity}
                    </span>
                  </div>
                  <h3 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold mb-2">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#3f4850] dark:text-[#cadced] line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#bfc7d2]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#675d4d] dark:text-[#d3c4b1] uppercase font-bold">From</span>
                    <p className="text-lg font-bold text-[#006194] dark:text-[#93ccff]">
                      €{room.pricePerNight}{' '}
                      <span className="text-xs font-normal text-[#3f4850] dark:text-[#cadced]">/ night</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('stay')}
                    className="px-4 py-2 rounded-lg bg-[#ebf5ff] dark:bg-white/10 hover:bg-[#006194] hover:text-white text-[#006194] dark:text-[#93ccff] text-xs font-semibold transition-colors"
                  >
                    Select Room
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: SURF ACADEMY & INTERACTIVE SKILL MATCHER */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-20" id="surf-guide">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
              Wave Mastery
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2 mb-4">
              Surf Academy &amp; Guiding
            </h2>
            <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced]">
              From first white-water pop-ups to peeling right-hand points, our seasoned guides match
              Atlantic swells to your skill level.
            </p>
          </div>

          {/* Interactive Surf Skill Level Breakdown */}
          <div className="bg-white dark:bg-[#0b1d29] rounded-2xl p-6 md:p-8 shadow-sm border border-[#bfc7d2]/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold">
                  Find Your Surfing Level
                </h3>
                <p className="text-sm text-[#3f4850] dark:text-[#cadced] mt-1">
                  Select your current stage to see our recommended Moroccan spots and training strategy.
                </p>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-[#ebf5ff] dark:bg-white/10 text-[#006194] dark:text-[#93ccff] text-xs font-semibold self-start md:self-auto">
                Interactive Skill Matcher
              </span>
            </div>

            {/* Level Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
              {Object.keys(SURF_LEVELS_DATA).map((key) => {
                const lvl = SURF_LEVELS_DATA[key];
                const isActive = selectedLevel === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedLevel(key)}
                    className={`py-3 px-4 rounded-xl text-center text-xs md:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#006194] text-white shadow-md'
                        : 'bg-[#f6faff] dark:bg-white/5 hover:bg-[#ebf5ff] dark:hover:bg-white/10 text-[#0b1d29] dark:text-white'
                    }`}
                  >
                    {lvl.levelNumber}. {lvl.title}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 rounded-xl bg-[#f6faff] dark:bg-white/5 border border-[#bfc7d2]/20">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-[#006194] dark:text-[#93ccff] text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#006194] dark:bg-[#93ccff]"></span>
                  Level Profile • Bracket {activeLevelData.levelNumber}
                </div>
                <h4 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold">
                  {activeLevelData.headline}
                </h4>
                <p className="text-sm md:text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                  {activeLevelData.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs md:text-sm">
                  <div className="flex items-center gap-2 text-[#0b1d29] dark:text-white">
                    <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[18px]">
                      place
                    </span>
                    <span>
                      <strong>Spots:</strong> {activeLevelData.spots}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0b1d29] dark:text-white">
                    <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[18px]">
                      surfing
                    </span>
                    <span>
                      <strong>Quiver:</strong> {activeLevelData.quiver}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-[#ebf5ff] dark:bg-white/10 text-center">
                <span className="text-[11px] uppercase tracking-wider text-[#675d4d] dark:text-[#d3c4b1] font-bold">
                  Recommended Package
                </span>
                <span className="font-serif-display text-xl text-[#006194] dark:text-[#93ccff] mt-1 mb-4 font-bold">
                  {activeLevelData.recommendedPackage}
                </span>
                <button
                  onClick={() => onNavigate('packages')}
                  className="px-5 py-2.5 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] transition-colors"
                >
                  View Package Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LODGE EXPERIENCES & AMENITIES */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-20" id="experiences">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
            Resort Living
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2 mb-4">
            Lodge Amenities &amp; Spaces
          </h2>
          <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced]">
            Thoughtful coastal facilities designed to restore the body and foster community between sessions.
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
                  alt={amenity.title}
                  src={amenity.image}
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold mb-2">
                  {amenity.title}
                </h3>
                <p className="text-xs text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                  {amenity.desc}
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
                Visual Diary
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2">
                Moments at Blue Wave Lodge
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
                  {cat}
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
                  alt={item.title}
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#93ccff] font-bold">
                    {item.subtitle}
                  </span>
                  <h4 className="font-serif-display text-lg font-semibold">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: GUEST TESTIMONIALS */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#006194] dark:text-[#93ccff]">
              Guest Reflections
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2">
              Memories From Our Travelers
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
            <span className="text-xs text-[#675d4d] dark:text-[#d3c4b1]">(280+ Verified Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white dark:bg-[#0b1d29] shadow-sm flex flex-col justify-between border border-[#bfc7d2]/20"
            >
              <div>
                <div className="flex text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
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
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#bfc7d2]/20">
                <div className="w-10 h-10 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#0b1d29] dark:text-white">{t.author}</p>
                  <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1]">
                    {t.location} • {t.packageTaken}
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
                Taghazout Bay Coast
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white">
                Find Blue Wave Lodge
              </h2>
              <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                Situated peacefully on the beachfront of Imi Ouaddar within Commune Tamri, away from
                the heavy crowds but only 10 minutes from central Taghazout and 45 minutes from
                Agadir Al Massira Airport (AGA).
              </p>

              <div className="space-y-4 pt-2 text-sm text-[#3f4850] dark:text-[#cadced]">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[24px]">
                    pin_drop
                  </span>
                  <div>
                    <p className="font-bold text-[#0b1d29] dark:text-white">Physical Address</p>
                    <p>Lot 150, Plage Imi Ouaddar, Commune Tamri, 80000 Agadir-Ida Ou Tanane, Morocco</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[24px]">
                    schedule
                  </span>
                  <div>
                    <p className="font-bold text-[#0b1d29] dark:text-white">Check-in &amp; Check-out</p>
                    <p>Check-in: 15:00 • Check-out: 11:30 • 24/7 Front Gate Concierge</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[24px]">
                    airport_shuttle
                  </span>
                  <div>
                    <p className="font-bold text-[#0b1d29] dark:text-white">Complimentary Transfers</p>
                    <p>Included for 7+ night stays from Agadir Airport (AGA) or Agadir CTM Station.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => alert('Opening navigation coordinates: 30.6032° N, 9.8241° W (Plage Imi Ouaddar)')}
                  className="px-6 py-3 rounded-lg bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white hover:bg-[#d8ebfc] text-xs md:text-sm font-semibold transition-colors inline-flex items-center gap-2 border border-[#bfc7d2]/20"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  Open in Google Maps
                </button>
                <button
                  onClick={onOpenConcierge}
                  className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-semibold transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Direct WhatsApp Concierge
                </button>
              </div>
            </div>

            {/* Interactive Map View */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-[400px] md:h-[460px] rounded-2xl overflow-hidden shadow-xl border border-[#bfc7d2]/20">
                <img
                  className="w-full h-full object-cover"
                  alt="Coastal map view of Imi Ouaddar and Taghazout Bay"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUzmuZV40xInbKX0WKWKhEuT039Rt-W3bRVWin-I7OQWtq-QAy0Xifn1VvNBvgK4jIII3H9R-m8jDdrsABzBaTKTo7zXewjd3cqazPgQqRiqI6T2PmW9AA0dMeT7M0OMQYohB1SuH5oS_2GxkRkM8MmgcMr4BI8_wUFfREPueFKCsNIDCDrri7HUg5HqJwyh2gMeZu89ZD9-z5jNU5ewQfRwxBCjYN67k5P0drpOW9VgR3zVv9JQFt"
                />
                <div className="absolute top-6 left-6 p-4 rounded-xl bg-white/95 dark:bg-[#0b1d29]/95 backdrop-blur-md shadow-md border border-[#bfc7d2]/20">
                  <p className="font-serif-display text-base text-[#0b1d29] dark:text-white font-bold flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#006194] animate-ping"></span>
                    Blue Wave Lodge Location
                  </p>
                  <p className="text-xs text-[#675d4d] dark:text-[#d3c4b1] mt-0.5">
                    30.6032° N, 9.8241° W • Taghazout Bay
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
            Begin Your Atlantic Journey
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl max-w-3xl mx-auto tracking-tight mb-6 font-normal">
            Ready for Your Moroccan Ocean Escape?
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Reserve your room or package directly with us for guaranteed lowest rates, flexible
            rescheduling, and complimentary surfboard lockers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-4 rounded-lg bg-white text-[#006194] hover:bg-[#f6faff] text-sm font-bold shadow-2xl transition-all transform active:scale-95 flex items-center gap-2"
            >
              <span>Check Live Availability</span>
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </button>
            <button
              onClick={onOpenConcierge}
              className="px-8 py-4 rounded-lg bg-white/15 hover:bg-white/25 text-white backdrop-blur-md text-sm font-semibold transition-all flex items-center gap-2"
            >
              <span>Chat With Surf Guide</span>
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

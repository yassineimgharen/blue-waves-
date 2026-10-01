import { getTranslator } from '../i18n/translations';
import React, { useState } from 'react';
import { ScreenType, Language } from '../types';
import { ROOMS_DATA, RELATED_ROOMS, ROOM_SHOWCASE_IMAGES, FAQ_DATA } from '../data/mockData';

interface StayViewProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  onOpenConcierge: () => void;
}

export const StayView: React.FC<StayViewProps> = ({ language, onNavigate, onOpenConcierge }) => {
  const t = getTranslator(language);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sea view room booking calculator state
  const [checkInDate, setCheckInDate] = useState('2025-11-08');
  const [checkOutDate, setCheckOutDate] = useState('2025-11-15');
  const [guestChoice, setGuestChoice] = useState('2');
  const [quiverAddon, setQuiverAddon] = useState(true);
  const [transferAddon, setTransferAddon] = useState(false);

  // Filter rooms based on active category
  const filteredRooms =
    activeCategory === 'all'
      ? ROOMS_DATA
      : ROOMS_DATA.filter((r) => r.category.includes(activeCategory as any));

  // Dynamic stay calculations
  const calculateDays = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 7;
    } catch {
      return 7;
    }
  };

  const nights = calculateDays();
  const baseRoomTotal = 145 * nights;
  const quiverTotal = quiverAddon ? 20 * nights : 0;
  const transferTotal = transferAddon ? 35 : 0;
  const touristTax = 4 * nights;
  const grandTotal = baseRoomTotal + quiverTotal + transferTotal + touristTax;

  return (
    <div className="flex flex-col w-full">
      {/* Bleed Hero Section with Atlantic Sunset Backdrop */}
      <section className="relative w-full overflow-hidden min-h-[620px] md:min-h-[700px] flex items-end pb-16 bg-[#0b1d29] text-white">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNGl0J36wwr3HAMbxFbQx-r8Sl2uPuvUQKRTy-9MT8lrH4IktlaOZ0-I8_R7Ks0nczrc3xkoD6Pz2d4iEm3zEdSEV8IpfOBiA8XypearMUILFpEvrPwfUcYjvgD8fqL1MYizrMdOrBYReo4nI7mDMZ0C8w9lxvinVFlpykZSp4-CQMUw_b9wFih6wcEMOMVAvbROsZRpKR6S2wlgCpkhDfpDX3Yq7uhZTjO9lWMjwGbXEflMtf1exZ')`
          }}
        ></div>
        {/* Editorial Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29] via-[#0b1d29]/40 to-[#0b1d29]/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d29]/80 via-transparent to-transparent"></div>

        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 md:px-12 pt-32">
          {/* Tide & Swell Micro-Ribbon */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 dark:bg-[#0b1d29]/90 backdrop-blur-md shadow-sm mb-6 text-[#0b1d29] dark:text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006194] animate-pulse"></span>
            <span className="text-[11px] uppercase font-bold text-[#006194] dark:text-[#93ccff] tracking-widest">
              {t("Swell Status")}
            </span>
            <span className="text-xs md:text-sm font-medium text-[#3f4850] dark:text-[#d2e5f6]">
              {t("Imi Ouaddar Point: 1.8m @ 13s • Glassy Offshore • 21°C Sea Temp")}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#d3c4b1]">
                <span className="text-xs tracking-widest uppercase font-semibold">
                  {t("The Sanctuary • Taghazout Bay")}
                </span>
              </div>
              <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white leading-none tracking-tight">
                {t("Stay Your Way.")}
              </h1>
              <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
                {t("Where sculpted Moroccan tadelakt meets the rhythmic cadence of the Atlantic. From panoramic cliff-top suites overlooking point breaks to secluded courtyard retreats, find your personal sanctuary.")}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <div className="bg-white/90 dark:bg-[#0b1d29]/90 backdrop-blur-md p-5 rounded-xl shadow-lg w-full max-w-sm border border-white/20 text-[#0b1d29] dark:text-white">
                <div className="flex items-center justify-between pb-3">
                  <span className="text-[11px] font-bold text-[#675d4d] dark:text-[#d3c4b1] uppercase">
                    {t("Availability Rate")}
                  </span>
                  <span className="text-xs font-bold text-[#006194] dark:text-[#93ccff]">
                    {t("94% Booked This Week")}
                  </span>
                </div>
                {/* Live Progress Bar */}
                <div className="w-full bg-[#d8ebfc] dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006194] dark:bg-[#93ccff] h-full rounded-full w-[94%] transition-all duration-700"></div>
                </div>
                <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-2">
                  {t("Autumn swells active. Early reservations advised for sea-facing balconies.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Interactive Category Bar */}
      <section className="sticky top-20 z-30 bg-[#f6faff]/95 dark:bg-[#0b1d29]/95 backdrop-blur-xl py-4 shadow-sm border-b border-[#bfc7d2]/20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Accommodations (9)' },
                { id: 'sea-view', label: 'Sea View' },
                { id: 'pool-view', label: 'Pool & Garden' },
                { id: 'apartments', label: 'Apartments' },
                { id: 'couples', label: 'Couples' },
                { id: 'families', label: 'Groups & Families' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  type="button"
                  className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === tab.id
                      ? 'bg-[#006194] text-white shadow-sm'
                      : 'bg-[#ebf5ff] dark:bg-white/10 text-[#3f4850] dark:text-[#cadced] hover:bg-[#e0f0ff] hover:text-[#0b1d29]'
                  }`}
                >
                  {t(tab.label)}
                </button>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-2 text-[#3f4850] dark:text-[#cadced] text-xs font-semibold whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px] text-[#00628d] dark:text-[#89ceff]">
                tune
              </span>
              <span>{t("Currency:")} <strong>{t("EUR (€)")}</strong> {t("• Free Board Storage Included")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations Bento Grid Section */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#675d4d] dark:text-[#d3c4b1]">
              {t("Architectural Living")}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-1">
              {t("Curated Sanctuaries")}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#3f4850] dark:text-[#cadced] max-w-md leading-relaxed">
            {t("Every residence pairs authentic Moroccan craftsmanship with surf-inspired comfort: custom cedar woodwork, limestone rain showers, and organic linens.")}
          </p>
        </div>

        {/* Core Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {filteredRooms.map((room) => {
            const isFeatured = room.id === 'sea-view-balcony';
            return (
              <article
                key={room.id}
                className={`${
                  isFeatured
                    ? 'lg:col-span-7'
                    : room.id === 'pool-view-suite'
                    ? 'lg:col-span-5'
                    : 'lg:col-span-6'
                } bg-white dark:bg-[#0b1d29] rounded-2xl overflow-hidden shadow-md flex flex-col group transition-all duration-300 hover:shadow-xl border border-[#bfc7d2]/20`}
              >
                <div className="relative w-full h-72 sm:h-80 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={t(room.name)}
                    src={room.image}
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {room.badge && (
                      <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-[#0b1d29]/95 backdrop-blur-md text-[11px] font-bold uppercase text-[#006194] dark:text-[#93ccff]">
                        {t(room.badge)}
                      </span>
                    )}
                    {room.tag && (
                      <span className="px-3 py-1 rounded-full bg-[#f0e0cc] text-[#221a0e] text-[11px] font-semibold uppercase">
                        {t(room.tag)}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#0b1d29]/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold">
                    {t("From €")}{room.pricePerNight} {t("/ night")}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold group-hover:text-[#006194] dark:group-hover:text-[#93ccff] transition-colors">
                        {t(room.name)}
                      </h3>
                      <div className="flex items-center gap-1 text-[#006194] dark:text-[#93ccff]">
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="text-xs md:text-sm font-bold">{room.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-[#3f4850] dark:text-[#cadced] mb-6 leading-relaxed">
                      {t(room.description)}
                    </p>

                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {room.features.map((f, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ebf5ff] dark:bg-white/5 text-[#3f4850] dark:text-[#cadced] text-xs font-medium"
                        >
                          <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                            check
                          </span>{' '}
                          {t(f)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#bfc7d2]/20 flex items-center justify-between gap-4">
                    {isFeatured ? (
                      <a
                        href="#room-detailed-showcase"
                        className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[#006194] dark:text-[#93ccff] hover:underline"
                      >
                        {t("Inspect Floorplan & Details")}{' '}
                        <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                      </a>
                    ) : (
                      <span className="text-xs text-[#3f4850] dark:text-[#cadced]">
                        {t(room.capacity)} • {t(room.size)}
                      </span>
                    )}

                    <button
                      onClick={() => onNavigate('booking')}
                      className="px-5 py-2.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-xs md:text-sm font-semibold transition-all shadow-sm"
                    >
                      {t("Reserve Room")}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Featured Detailed Showcase Section (Sea View Balcony Room) */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/70 py-20" id="room-detailed-showcase">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col gap-3 mb-10">
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#006194] dark:bg-[#93ccff]"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#006194] dark:text-[#93ccff]">
                {t("In-Depth Room Showcase")}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white">
                {t("The Sea View Balcony Room")}
              </h2>
              <div className="flex items-center gap-4 text-[#3f4850] dark:text-[#cadced] text-sm">
                <span>{t("Room 204 • Second Tier Cliffside")}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#707881]"></span>
                <span className="text-[#006194] dark:text-[#93ccff] font-semibold">
                  {t("Immediate Spot Check View")}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Facts Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 bg-white dark:bg-[#0b1d29] p-6 rounded-2xl shadow-sm mb-12 border border-[#bfc7d2]/20">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">{t("Capacity")}</span>
              <span className="text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#00628d] dark:text-[#89ceff]">person</span> {t("2 Guests")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">{t("Bed Configuration")}</span>
              <span className="text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#00628d] dark:text-[#89ceff]">king_bed</span> {t("1 Royal King")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">{t("Ocean Aspect")}</span>
              <span className="text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#00628d] dark:text-[#89ceff]">visibility</span> {t("Atlantic Point")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">{t("Total Living Area")}</span>
              <span className="text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#00628d] dark:text-[#89ceff]">straighten</span> {t("34 m² + 12 m² Balcony")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">{t("Climate")}</span>
              <span className="text-sm md:text-base font-semibold text-[#0b1d29] dark:text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#00628d] dark:text-[#89ceff]">ac_unit</span> {t("Silent Inverter A/C")}
              </span>
            </div>
          </div>

          {/* Split Layout: Multi-Image Gallery + Sticky Booking Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Gallery & Narrative */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* Image Switcher Showcase */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-[#e0f0ff] dark:bg-white/5 border border-[#bfc7d2]/20">
                  <img
                    className="w-full h-full object-cover transition-opacity duration-300"
                    alt={t("Main room showcase")}
                    src={ROOM_SHOWCASE_IMAGES[selectedGalleryIndex].src}
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0b1d29]/80 backdrop-blur-md text-white text-xs md:text-sm px-4 py-2.5 rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#89ceff]">photo_camera</span>
                    <span>{t(ROOM_SHOWCASE_IMAGES[selectedGalleryIndex].caption)}</span>
                  </div>
                </div>

                {/* Thumbnail Switcher Strip */}
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  {ROOM_SHOWCASE_IMAGES.slice(1).map((thumb, idx) => {
                    const actualIdx = idx + 1;
                    const isSelected = selectedGalleryIndex === actualIdx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedGalleryIndex(actualIdx)}
                        className={`relative h-20 md:h-24 rounded-xl overflow-hidden shadow-sm transition-all border ${
                          isSelected
                            ? 'ring-2 ring-[#006194] opacity-100'
                            : 'opacity-70 hover:opacity-100 border-[#bfc7d2]/30'
                        }`}
                      >
                        <img className="w-full h-full object-cover" alt={t(thumb.caption)} src={thumb.src} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Narrative Experience */}
              <div className="bg-white dark:bg-[#0b1d29] p-8 md:p-10 rounded-2xl shadow-sm flex flex-col gap-6 border border-[#bfc7d2]/20">
                <h3 className="font-serif-display text-2xl md:text-3xl text-[#0b1d29] dark:text-white font-semibold">
                  {t("The Ocean Sanctuary Experience")}
                </h3>
                <p className="text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                  {t("Positioned on the highest seaward terrace of the lodge, the Sea View Balcony Room was conceived for travelers who live by the tides. Awaken without an alarm clock to the roar of waves peeling across the bay; step bare-foot onto the smooth tadelakt balcony to check the wind direction and swell angle with your first sip of fresh spiced mint tea.")}
                </p>
                <p className="text-sm md:text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                  {t("Every detail honors regional authenticity: polished lime-plaster surfaces regulate coastal humidity naturally, while hand-carved cedar furniture infuses the room with a rich, grounding scent. After an afternoon surf session, replenish under the high-pressure rain shower scented with local organic argan and rosemary botanicals.")}
                </p>

                {/* Amenities Badges Grid */}
                <div className="pt-4 border-t border-[#bfc7d2]/20">
                  <h4 className="font-sans font-bold text-base text-[#0b1d29] dark:text-white mb-4">
                    {t("Included Room Amenities")}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { icon: 'wifi', name: '300 Mbps Fiber WiFi' },
                      { icon: 'bathtub', name: 'Organic Argan Toiletries' },
                      { icon: 'skateboarding', name: 'Private Board Storage' },
                      { icon: 'coffee_maker', name: 'Espresso & Berber Tea Bar' },
                      { icon: 'cleaning_services', name: 'Daily Eco Housekeeping' },
                      { icon: 'lock', name: 'Laptop Security Safe' }
                    ].map((amenity, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-3 rounded-lg bg-[#ebf5ff] dark:bg-white/5 text-[#0b1d29] dark:text-white text-xs font-semibold"
                      >
                        <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[20px]">
                          {amenity.icon}
                        </span>
                        <span>{t(amenity.name)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spot Radar Visual Section (Chart / Conditions) */}
              <div className="bg-white dark:bg-[#0b1d29] p-8 rounded-2xl shadow-sm flex flex-col gap-6 border border-[#bfc7d2]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1] tracking-wider">
                      {t("Direct Balcony Viewpoint")}
                    </span>
                    <h4 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white font-semibold mt-1">
                      {t("Taghazout Bay Swell Forecast")}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#ebf5ff] dark:bg-white/10 text-[#006194] dark:text-[#93ccff] text-xs font-bold">
                    {t("Live Sensor: Ouaddar Point")}
                  </span>
                </div>

                {/* Swell Forecast Chart */}
                <div className="w-full bg-[#ebf5ff] dark:bg-white/5 p-6 rounded-xl border border-[#bfc7d2]/20">
                  <div className="flex items-center justify-between text-[#3f4850] dark:text-[#cadced] text-xs font-semibold mb-2">
                    <span>{t("Morning Tide (06:45)")}</span>
                    <span>{t("Midday Swell Peak (13:30)")}</span>
                    <span>{t("Sunset Glass-Off (18:15)")}</span>
                  </div>
                  <svg className="w-full h-24 overflow-visible text-[#006194] dark:text-[#93ccff]" viewBox="0 0 700 120">
                    <defs>
                      <linearGradient id="swellGrad2" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.35"></stop>
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,90 Q 90,30 180,60 T 360,25 T 540,75 T 700,40 L 700,120 L 0,120 Z"
                      fill="url(#swellGrad2)"
                    ></path>
                    <path
                      d="M 0,90 Q 90,30 180,60 T 360,25 T 540,75 T 700,40"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></path>
                    <circle cx="180" cy="60" fill="currentColor" r="5"></circle>
                    <circle cx="360" cy="25" fill="#006194" r="6" stroke="#ffffff" strokeWidth="2"></circle>
                    <circle cx="540" cy="75" fill="currentColor" r="5"></circle>
                    <text
                      fill="currentColor"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      x="360"
                      y="14"
                    >
                      {t("2.2m @ 14s (Optimal)")}
                    </text>
                  </svg>
                  <div className="flex items-center justify-between text-[#3f4850] dark:text-[#cadced] text-xs mt-3 pt-3 border-t border-[#bfc7d2]/20">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#006194]"></span> {t("1.4m Low Tide Shorebreak")}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-[#0b1d29] dark:text-white">
                      <span className="w-2 h-2 rounded-full bg-[#006194]"></span> {t("Peak Point Session: 2.2m Offshore")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#006194]"></span> {t("1.7m Sunset Peeler")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sticky Booking & Concierge Module */}
            <aside className="lg:col-span-4 sticky top-28 flex flex-col gap-6">
              <div className="bg-white dark:bg-[#0b1d29] p-8 rounded-2xl shadow-xl border border-[#bfc7d2]/20 text-[#0b1d29] dark:text-white">
                <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-[#bfc7d2]/20">
                  <div>
                    <span className="font-serif-display text-3xl font-bold">€145</span>
                    <span className="text-xs text-[#3f4850] dark:text-[#cadced]"> {t("/ night")}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#006194] dark:text-[#93ccff]">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-sm font-bold">4.98</span>
                    <span className="text-xs text-[#3f4850] dark:text-[#cadced]">{t("(42 reviews)")}</span>
                  </div>
                </div>

                {/* Booking Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onNavigate('booking');
                  }}
                  className="flex flex-col gap-4"
                >
                  {/* Dates Range */}
                  <div className="grid grid-cols-2 gap-2 bg-[#ebf5ff] dark:bg-white/5 p-2 rounded-xl border border-[#bfc7d2]/20">
                    <div className="flex flex-col p-2">
                      <label className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                        {t("Check-In")}
                      </label>
                      <input
                        className="bg-transparent text-xs md:text-sm font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer mt-1"
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col p-2">
                      <label className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                        {t("Check-Out")}
                      </label>
                      <input
                        className="bg-transparent text-xs md:text-sm font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer mt-1"
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Guests Selector */}
                  <div className="bg-[#ebf5ff] dark:bg-white/5 p-4 rounded-xl flex flex-col gap-1 border border-[#bfc7d2]/20">
                    <label className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                      {t("Guests & Surfers")}
                    </label>
                    <select
                      value={guestChoice}
                      onChange={(e) => setGuestChoice(e.target.value)}
                      className="bg-transparent text-xs md:text-sm font-semibold text-[#0b1d29] dark:text-white focus:outline-none cursor-pointer"
                    >
                      <option value="2">{t("2 Adults (1 King Bed)")}</option>
                      <option value="1">{t("1 Adult (Solo Traveler)")}</option>
                    </select>
                  </div>

                  {/* Add-On Extras Pills */}
                  <div className="flex flex-col gap-2 pt-2">
                    <span className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                      {t("Enhance Your Stay")}
                    </span>
                    <label className="flex items-center justify-between p-3 rounded-xl bg-[#ebf5ff] dark:bg-white/5 cursor-pointer hover:bg-[#e0f0ff] dark:hover:bg-white/10 transition-colors border border-[#bfc7d2]/20">
                      <div className="flex items-center gap-3">
                        <input
                          checked
                          readOnly
                          className="w-4 h-4 accent-[#006194] rounded"
                          type="checkbox"
                        />
                        <span className="text-xs font-medium text-[#0b1d29] dark:text-white">
                          {t("Daily Organic Berber Breakfast")}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#006194] dark:text-[#93ccff]">
                        {t("Included")}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-[#ebf5ff] dark:bg-white/5 cursor-pointer hover:bg-[#e0f0ff] dark:hover:bg-white/10 transition-colors border border-[#bfc7d2]/20">
                      <div className="flex items-center gap-3">
                        <input
                          checked={quiverAddon}
                          onChange={(e) => setQuiverAddon(e.target.checked)}
                          className="w-4 h-4 accent-[#006194] rounded"
                          type="checkbox"
                        />
                        <span className="text-xs font-medium text-[#0b1d29] dark:text-white">
                          {t("Unlimited Surfboard Quiver")}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#0b1d29] dark:text-white">
                        {t("+€20 / day")}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-[#ebf5ff] dark:bg-white/5 cursor-pointer hover:bg-[#e0f0ff] dark:hover:bg-white/10 transition-colors border border-[#bfc7d2]/20">
                      <div className="flex items-center gap-3">
                        <input
                          checked={transferAddon}
                          onChange={(e) => setTransferAddon(e.target.checked)}
                          className="w-4 h-4 accent-[#006194] rounded"
                          type="checkbox"
                        />
                        <span className="text-xs font-medium text-[#0b1d29] dark:text-white">
                          {t("Agadir Airport (AGA) Private Transfer")}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#0b1d29] dark:text-white">
                        +€35
                      </span>
                    </label>
                  </div>

                  {/* Dynamic Price Breakdown */}
                  <div className="flex flex-col gap-2 pt-4 pb-2 text-xs md:text-sm text-[#3f4850] dark:text-[#cadced] border-t border-[#bfc7d2]/20">
                    <div className="flex justify-between">
                      <span>€145 × {nights} {t("nights")}</span>
                      <span>€{baseRoomTotal}</span>
                    </div>
                    {quiverAddon && (
                      <div className="flex justify-between">
                        <span>{t("Quiver Pass (")}{nights} {t("days)")}</span>
                        <span>€{quiverTotal}</span>
                      </div>
                    )}
                    {transferAddon && (
                      <div className="flex justify-between">
                        <span>{t("Airport Transfer (Round trip)")}</span>
                        <span>€35</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>{t("Tourist & Eco Tax")}</span>
                      <span>€{touristTax}</span>
                    </div>
                    <div className="flex justify-between pt-3 text-base font-bold text-[#0b1d29] dark:text-white border-t border-[#bfc7d2]/20">
                      <span>{t("Total Amount")}</span>
                      <span className="text-[#006194] dark:text-[#93ccff]">€{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-semibold shadow-lg hover:shadow-[#006194]/30 transition-all active:scale-[0.98]"
                  >
                    {t("Instant Book Sea View Room")}
                  </button>

                  <button
                    type="button"
                    onClick={onOpenConcierge}
                    className="w-full py-3.5 rounded-xl bg-[#d8ebfc] dark:bg-white/10 hover:bg-[#cce5ff] text-[#0b1d29] dark:text-white text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[20px]">
                      chat
                    </span>
                    {t("Enquire via WhatsApp Concierge")}
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-4 text-[#3f4850] dark:text-[#cadced] text-[11px] font-medium border-t border-[#bfc7d2]/20 pt-4">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                      check_circle
                    </span>{' '}
                    {t("Free cancellation (14d)")}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#00628d] dark:text-[#89ceff]">
                      lock
                    </span>{' '}
                    {t("Best rate guarantee")}
                  </span>
                </div>
              </div>

              {/* Host / Surf Director Callout Card */}
              <div className="bg-[#e0f0ff] dark:bg-white/5 p-6 rounded-2xl flex items-center gap-4 border border-[#bfc7d2]/20">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[#006194]/20 border border-white">
                  <img
                    className="w-full h-full object-cover"
                    alt={t("Portrait of Yassine")}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5FzS1saCrXyp8O2ZAvTjDMZyy6k8C4KiC11VwWUiOyyJmFTi4axzioq1e-Jns5Bo9uAoE72Qgybw77tiNKZPASm_5fSbQY57l5NTSVpuGj2ls3pYyuxHAM2SkG1xHTzf9vjGtoCVqYfomNyZsBxbm8ZXJE49_pb0JY0n4GtS4inFoHg4MFGymCwpOl5XAMRdO4y58Z0ME8BPqemv7qqj0qoEwLlfTj4OygtC2fo4DRsknoFakual-"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif-display text-lg text-[#0b1d29] dark:text-white font-semibold">
                    {t("Yassine • Head Guide")}
                  </span>
                  <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-0.5 leading-relaxed">
                    {t("“Room 204 gets the first morning offshore breeze. Ask me anytime for the daily secret spot forecast.”")}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Accommodations Row */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#675d4d] dark:text-[#d3c4b1] font-bold">
              {t("Discover Alternatives")}
            </span>
            <h3 className="font-serif-display text-2xl md:text-4xl text-[#0b1d29] dark:text-white mt-1">
              {t("Other Available Rooms & Suites")}
            </h3>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
            className="hidden sm:inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[#006194] dark:text-[#93ccff] hover:underline"
          >
            {t("View All 9 Accommodations")} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RELATED_ROOMS.map((rel, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1d29] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-[#bfc7d2]/20"
            >
              <div className="h-60 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={t(rel.name)}
                  src={rel.image}
                />
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-[#0b1d29]/90 px-3 py-1 rounded-full text-xs font-bold text-[#675d4d] dark:text-[#d3c4b1] uppercase">
                  {t(rel.badge)}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold group-hover:text-[#006194] dark:group-hover:text-[#93ccff] transition-colors">
                    {t(rel.name)}
                  </h4>
                  <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-1 leading-relaxed">
                    {t(rel.desc)}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#bfc7d2]/20 flex items-center justify-between">
                  <span className="font-serif-display text-xl font-bold text-[#006194] dark:text-[#93ccff]">
                    €{rel.price}
                    <span className="text-xs font-normal text-[#3f4850] dark:text-[#cadced]">{t("/nt")}</span>
                  </span>
                  <button
                    onClick={() => onNavigate('booking')}
                    className="text-xs font-bold text-[#0b1d29] dark:text-white hover:text-[#006194] dark:hover:text-[#93ccff]"
                  >
                    {t("Reserve Now →")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
              {t("Everything you need to know about reserving your stay, surf equipment, check-in, and life at Blue Wave Lodge.")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FAQ_DATA.slice(0, 4).map((faq, idx) => {
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
    </div>
  );
};

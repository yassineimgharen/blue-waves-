import React, { useState } from 'react';
import { ScreenType, PackageItem } from '../types';
import { PACKAGES_DATA, DISCIPLINES_DATA, SURF_SPOTS_DATA, FAQ_DATA } from '../data/mockData';

interface PackagesViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenPackage: (pkg: PackageItem) => void;
  onOpenConcierge: () => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  onNavigate,
  onOpenPackage,
  onOpenConcierge
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col w-full">
      {/* Real-time Swell & Tide Ticker */}
      <aside
        aria-label="Atlantic Swell Report"
        className="w-full bg-[#d8ebfc] dark:bg-[#071a26] py-2.5 px-4 md:px-12 border-b border-[#bfc7d2]/20"
      >
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm text-[#3f4850] dark:text-[#cadced]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-[#0b1d29] text-[#006194] dark:text-[#93ccff] shadow-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006194] dark:bg-[#93ccff] animate-pulse"></span>
              Live Taghazout Bay Swell
            </span>
            <span className="hidden sm:inline text-[#675d4d] dark:text-[#d3c4b1]">•</span>
            <span className="text-[#0b1d29] dark:text-white font-medium">
              Anchor Point: <strong className="text-[#006194] dark:text-[#93ccff] font-semibold">1.8m @ 14s NW</strong>
            </span>
            <span className="hidden md:inline text-[#675d4d] dark:text-[#d3c4b1]">•</span>
            <span className="hidden md:inline">
              Tide: <strong className="text-[#0b1d29] dark:text-white font-medium">Low 09:42 (+0.4m) | High 16:15</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#00628d] dark:text-[#89ceff]">water</span> Water 19°C
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#00628d] dark:text-[#89ceff]">air</span> Offshore 7 kts NE
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[#006194] dark:text-[#93ccff] font-medium">
              <span className="material-symbols-outlined text-[15px]">verified</span> Conditions: Clean Glass
            </span>
          </div>
        </div>
      </aside>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#0b1d29] py-12 md:py-20 border-b border-[#bfc7d2]/20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Narrative */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#f0e0cc] text-[#221a0e] text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-[#675d4d]">surfing</span>
                <span>Bespoke Atlantic Sessions</span>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-serif-display text-4xl sm:text-6xl text-[#0b1d29] dark:text-white leading-tight tracking-tight">
                  Surf Morocco with <span className="italic font-normal text-[#006194] dark:text-[#93ccff]">Blue Wave.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#3f4850] dark:text-[#cadced] max-w-xl leading-relaxed">
                  From protected sandbars right outside our Imi Ouaddar gate to legendary Atlantic
                  right-hand points in Taghazout and raw dunes in Tamri. Coached by ISA specialists,
                  nourished by coastal Berber cuisine.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#packages-section"
                  className="px-7 py-3.5 rounded-lg bg-[#006194] text-white text-xs md:text-sm font-semibold shadow-md hover:bg-[#007bb9] transition-all active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>Explore Packages</span>
                  <span className="material-symbols-outlined text-[18px]">south</span>
                </a>
                <a
                  href="#skill-matrix"
                  className="px-6 py-3.5 rounded-lg bg-[#e0f0ff] dark:bg-white/10 text-[#006194] dark:text-[#93ccff] hover:bg-[#d8ebfc] text-xs md:text-sm font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">equalizer</span>
                  <span>Find Your Level</span>
                </a>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg bg-[#ebf5ff] dark:bg-white/5 p-4 rounded-xl border border-[#bfc7d2]/20">
                <div className="flex flex-col">
                  <span className="font-serif-display text-2xl sm:text-3xl text-[#006194] dark:text-[#93ccff] font-bold leading-none">
                    330+
                  </span>
                  <span className="text-[10px] text-[#675d4d] dark:text-[#d3c4b1] uppercase font-bold mt-1">Days of Sun</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif-display text-2xl sm:text-3xl text-[#006194] dark:text-[#93ccff] font-bold leading-none">
                    1:4
                  </span>
                  <span className="text-[10px] text-[#675d4d] dark:text-[#d3c4b1] uppercase font-bold mt-1">Coach Ratio</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif-display text-2xl sm:text-3xl text-[#006194] dark:text-[#93ccff] font-bold leading-none">
                    18
                  </span>
                  <span className="text-[10px] text-[#675d4d] dark:text-[#d3c4b1] uppercase font-bold mt-1">Local Breaks</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-[#e0f0ff] border border-[#bfc7d2]/20">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  alt="Taghazout bay sunset with wooden surfboards"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwOxoTfjGIgXTL1yWMy9a2Na3rVxvS0mYFvJMdcz2_nq4u2AULlC0Jak4am7xwl3_hPyHIsZDogEnUCkVUg_0iqDCJIPiqtNdhbxhvxqeT9I5YOcwyuopx7B5l4y2m6tGrRJ-iJZAV2sU5MJo2ONBHBktPv3PY2B6YPzIgnTHrN1gIakwPXwV7oCpTImq7XUQqcJcErlmBXSPH3h674lQVoM2F2Fp1M_IatGrEIAmukWf8l97HZ9AY"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d29]/80 via-[#0b1d29]/20 to-transparent"></div>
                {/* Float Badges */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <span className="material-symbols-outlined">waves</span>
                    </span>
                    <div className="flex flex-col">
                      <span className="font-serif-display text-lg text-white font-semibold leading-snug">
                        Imi Ouaddar Bay &amp; Coast
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#d2e5f6]">Taghazout Surf Corridor</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#006194]/90 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                    ISA Certified
                  </span>
                </div>
              </div>

              {/* Decorative Floating Card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 p-4 rounded-xl bg-white dark:bg-[#0b1d29] shadow-xl items-center gap-3 max-w-xs border border-[#bfc7d2]/20">
                <span className="w-11 h-11 rounded-lg bg-[#e0f0ff] dark:bg-white/10 flex items-center justify-center text-[#006194] dark:text-[#93ccff]">
                  <span className="material-symbols-outlined">videocam</span>
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1d29] dark:text-white">Daily Video Reviews</span>
                  <span className="text-[11px] text-[#3f4850] dark:text-[#cadced]">HD drone &amp; beach angle debriefs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Surf Experience Cards Grid (6 Disciplines) */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                Curated Disciplines
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white">
                Ocean Programs Built Around Swell &amp; Form
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#3f4850] dark:text-[#cadced] max-w-md leading-relaxed">
              Whether stepping onto fiberglass for the first time or chasing reeling six-foot walls,
              each session is timed to local tides and individual biomechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCIPLINES_DATA.map((disc, idx) => (
              <article
                key={idx}
                className="flex flex-col bg-white dark:bg-[#0b1d29] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-[#bfc7d2]/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e0f0ff] dark:bg-white/5">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={disc.title}
                    src={disc.image}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-[#0b1d29]/95 backdrop-blur-md text-[11px] font-bold text-[#006194] dark:text-[#93ccff] uppercase">
                      {disc.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#006194] dark:text-[#93ccff]">
                      <span className="material-symbols-outlined text-[20px]">{disc.icon}</span>
                      <span className="text-[11px] uppercase tracking-wider font-bold">{disc.category}</span>
                    </div>
                    <h3 className="font-serif-display text-2xl text-[#0b1d29] dark:text-white group-hover:text-[#006194] dark:group-hover:text-[#93ccff] transition-colors font-semibold">
                      {disc.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                      {disc.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2 text-xs md:text-sm text-[#3f4850] dark:text-[#cadced] bg-[#ebf5ff] dark:bg-white/5 p-3.5 rounded-lg border border-[#bfc7d2]/15">
                    {disc.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#006194] dark:text-[#93ccff]">
                          check
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Surf Skill Level Matrix Section */}
      <section className="w-full bg-white dark:bg-[#0b1d29] py-16 md:py-24 border-b border-[#bfc7d2]/20" id="skill-matrix">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#675d4d] dark:text-[#d3c4b1]">
              Progression Architecture
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2">
              Find Your Exact Skill Bracket
            </h2>
            <p className="text-sm md:text-base text-[#3f4850] dark:text-[#cadced] mt-3">
              We match every guest with the ideal coach, board length, and wave break profile so you never
              feel out of your depth or held back.
            </p>
          </div>

          {/* 5-Level Bento Progression */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                num: '01',
                lvl: 'Level 1',
                title: 'First Time',
                desc: 'You have never surfed or have tried once or twice with assistance.',
                focus: 'Ocean safety, board handling, prone balance & basic push-pop-up.'
              },
              {
                num: '02',
                lvl: 'Level 2',
                title: 'Beginner',
                desc: 'Comfortable in the whitewash, can stand reliably on small rolling foam.',
                focus: 'Whitewater trimming, paddling stamina, catching rolling swell alone.'
              },
              {
                num: '03',
                lvl: 'Level 3',
                title: 'Improver',
                desc: 'Paddling outside the break to catch unbroken waist-high green waves.',
                focus: 'Angled take-offs, bottom turns, trimming across the wave face.'
              },
              {
                num: '04',
                lvl: 'Level 4',
                title: 'Intermediate',
                desc: 'Confident on chest-to-overhead walls, navigates line-ups safely.',
                focus: 'Generating speed, cutbacks, duck diving, reading point speed lines.'
              },
              {
                num: '05',
                lvl: 'Level 5',
                title: 'Advanced',
                desc: 'Charging heavy reef points like Anchor, Killer Point, or Boilers.',
                focus: 'Deep barrel positioning, high-line speed generation, critical lip turns.'
              }
            ].map((bracket, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#ebf5ff] dark:bg-white/5 shadow-sm hover:shadow-md transition-shadow border border-[#bfc7d2]/20"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-white dark:bg-[#0b1d29] flex items-center justify-center font-bold text-[#006194] dark:text-[#93ccff] text-xs shadow-sm">
                      {bracket.num}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                      {bracket.lvl}
                    </span>
                  </div>
                  <h3 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold">
                    {bracket.title}
                  </h3>
                  <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-2 leading-relaxed">
                    {bracket.desc}
                  </p>
                </div>
                <div className="pt-4 mt-6 bg-white dark:bg-[#0b1d29] -mx-6 -mb-6 p-4 rounded-b-2xl flex flex-col gap-1.5 text-xs text-[#3f4850] dark:text-[#cadced] border-t border-[#bfc7d2]/20">
                  <span className="text-[#006194] dark:text-[#93ccff] font-bold">Focus:</span>
                  <span>{bracket.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured All-Inclusive Surf Packages */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-16 md:py-24" id="packages-section">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                Retreat Curations
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white">
                Featured All-Inclusive Surf Packages
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#3f4850] dark:text-[#cadced] max-w-md leading-relaxed">
              Designed for total ease. Accommodations, coaching, transfers, and coastal cuisine grouped
              into seamless seasonal itineraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_DATA.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col bg-white dark:bg-[#0b1d29] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${
                  pkg.isPopular ? 'ring-2 ring-[#006194] shadow-xl' : 'border-[#bfc7d2]/20'
                }`}
              >
                <div className="relative h-48 bg-[#e0f0ff] overflow-hidden">
                  <img className="w-full h-full object-cover" alt={pkg.title} src={pkg.image} />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-[#0b1d29]/90 backdrop-blur-sm text-[10px] font-bold uppercase text-[#0b1d29] dark:text-white">
                      {pkg.categoryTag}
                    </span>
                  </div>
                  {pkg.isPopular && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-[#006194] text-white text-[10px] font-bold uppercase shadow-sm">
                        Guest Favorite
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[11px] text-[#675d4d] dark:text-[#d3c4b1] uppercase font-bold">
                        {pkg.durationNights} Nights / {pkg.durationDays} Days
                      </span>
                      <span className="font-serif-display text-xl text-[#006194] dark:text-[#93ccff] font-bold">
                        €{pkg.price}{' '}
                        <span className="text-xs font-normal text-[#3f4850] dark:text-[#cadced]">/ person</span>
                      </span>
                    </div>

                    <h3 className="font-serif-display text-xl text-[#0b1d29] dark:text-white font-semibold">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-2 leading-relaxed">
                      {pkg.summary}
                    </p>

                    <div className="flex flex-col gap-2 mt-5 pt-4 bg-[#ebf5ff] dark:bg-white/5 p-3 rounded-lg text-xs text-[#3f4850] dark:text-[#cadced] border border-[#bfc7d2]/15">
                      {pkg.highlights.map((h, i) => (
                        <span key={i} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-[#006194] dark:text-[#93ccff]">
                            check_circle
                          </span>
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenPackage(pkg)}
                    className={`w-full py-3 rounded-lg text-xs md:text-sm font-semibold transition-colors text-center ${
                      pkg.isPopular
                        ? 'bg-[#006194] hover:bg-[#007bb9] text-white shadow-md'
                        : 'bg-[#ebf5ff] dark:bg-white/10 hover:bg-[#006194] hover:text-white text-[#006194] dark:text-[#93ccff]'
                    }`}
                  >
                    View Package Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spot Radar / Local Geography */}
      <section className="w-full bg-white dark:bg-[#0b1d29] py-16 md:py-24 border-b border-[#bfc7d2]/20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Spot Selection */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#675d4d] dark:text-[#d3c4b1]">
                  Local Geography
                </span>
                <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white">
                  The Taghazout Surf Corridor
                </h2>
                <p className="text-sm md:text-base text-[#3f4850] dark:text-[#cadced] leading-relaxed">
                  Within a 15-minute radius of Blue Wave Lodge lie over a dozen distinct breaks catering to
                  every wave period and wind direction.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {SURF_SPOTS_DATA.map((spot, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#ebf5ff] dark:bg-white/5 shadow-sm flex items-start gap-4 border border-[#bfc7d2]/20"
                  >
                    <span className="w-10 h-10 rounded-lg bg-white dark:bg-[#0b1d29] flex items-center justify-center text-[#006194] dark:text-[#93ccff] shrink-0 shadow-sm">
                      <span className="material-symbols-outlined">{spot.icon}</span>
                    </span>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif-display text-lg text-[#0b1d29] dark:text-white font-semibold">
                          {spot.name}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#006194] dark:text-[#93ccff]">
                          {spot.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#3f4850] dark:text-[#cadced] mt-1 leading-relaxed">
                        {spot.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Static Location View Map Component */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-[#e0f0ff] border border-[#bfc7d2]/20">
                <img
                  className="w-full h-full object-cover"
                  alt="Taghazout bay map"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc0lvHiO3OaW_jK7o14-y_o4bTYh8yz2inb9h8_uVtCff4ktVXU5rLhDZ6__pns1LhGH0XlE-mwXtdGMUXapir607ZnYVsEJTLIIPZqIS3sj7gh7THaMv00yazLtQ8hIAgdEL830Y15cXq9f9B1F7YhCpmfMCLCs5R1zjrPVlISW4-MT3zLF02vIlDN6w_gkyrRpzSqRRpqn-2Whz0Hl0UeqMn89Hq5aQLyhiYPwVfnAl33OYfQlpa"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 dark:bg-[#0b1d29]/95 backdrop-blur-md shadow-lg flex items-center justify-between border border-[#bfc7d2]/20">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#006194] animate-ping"></span>
                    <div className="flex flex-col">
                      <span className="font-serif-display text-base font-bold text-[#0b1d29] dark:text-white">
                        Blue Wave Lodge HQ
                      </span>
                      <span className="text-xs text-[#3f4850] dark:text-[#cadced]">Imi Ouaddar Coastal Headland</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Opening Google Maps navigation to Blue Wave Lodge HQ, Imi Ouaddar')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] transition-colors"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Surf FAQ Section */}
      <section className="w-full bg-[#ebf5ff] dark:bg-[#071a26]/60 py-16 md:py-24">
        <div className="max-w-[860px] mx-auto px-4 md:px-12">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#675d4d] dark:text-[#d3c4b1]">
              Guest Inquiries
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white mt-2">
              Frequently Asked Surf Questions
            </h2>
            <p className="text-xs md:text-sm text-[#3f4850] dark:text-[#cadced] mt-2">
              Everything you need to know before packing your sunscreen and arriving on the Moroccan coast.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FAQ_DATA.slice(0, 4).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white dark:bg-[#0b1d29] shadow-sm overflow-hidden border border-[#bfc7d2]/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif-display text-lg text-[#0b1d29] dark:text-white hover:text-[#006194] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`material-symbols-outlined text-[20px] text-[#006194] dark:text-[#93ccff] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-xs md:text-sm text-[#3f4850] dark:text-[#cadced] leading-relaxed border-t border-[#bfc7d2]/10 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="w-full bg-[#d8ebfc] dark:bg-white/5 py-16 md:py-20 border-t border-[#bfc7d2]/20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 text-center flex flex-col items-center gap-6">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#675d4d] dark:text-[#d3c4b1]">
            Sanctuary Awaits
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#0b1d29] dark:text-white max-w-2xl leading-tight">
            Ready to Ride the Atlantic Swell of Morocco?
          </h2>
          <p className="text-base text-[#3f4850] dark:text-[#cadced] max-w-xl leading-relaxed">
            Book your package directly with our resident surf concierge for custom dates, private
            coaching requests, and suite upgrades.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-4 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-xs md:text-sm font-semibold shadow-lg transition-all active:scale-[0.98]"
            >
              Book Your Surf Package
            </button>
            <button
              onClick={onOpenConcierge}
              className="px-8 py-4 rounded-lg bg-white dark:bg-[#0b1d29] text-[#006194] dark:text-[#93ccff] hover:bg-[#ebf5ff] text-xs md:text-sm font-semibold transition-colors flex items-center gap-2 border border-[#bfc7d2]/20"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Speak with Head Coach</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

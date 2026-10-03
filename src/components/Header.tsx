import { ManagedImage } from '../cms/ManagedImage';
import { getTranslator } from '../i18n/translations';
import React, { useState, useRef, useEffect } from 'react';
import { ScreenType, Language } from '../types';
import { useSite } from '../cms/store';
import logoWhite from '../bluewave-white.png';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType, section?: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenConcierge: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  language,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  onOpenConcierge
}) => {
  const { data: site } = useSite();
  const ACCOMMODATIONS = site.rooms;
  const ROOM_GROUPS = site.categories.map(category => ({ label: category.label, ids: site.rooms.filter(room => room.tag === category.label).map(room => room.id) }));
  const t = getTranslator(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roomsDropdownOpen, setRoomsDropdownOpen] = useState(false);
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoomsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const otherLinks: { label: string; screen: ScreenType; section?: string }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Offers', screen: 'offers' },
    { label: 'Rooftop & Restaurant', screen: 'dining' },
    { label: 'Experiences', screen: 'home', section: 'experiences' },
    { label: 'Contact', screen: 'home', section: 'location' },
  ];

  const navigateToRoom = (id: string) => {
    window.location.hash = `#rooms/${id}`;
    setRoomsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#f6faff]/90 dark:bg-[#0b1d29]/95 backdrop-blur-xl border-b border-[#071a26]/5 dark:border-white/10 shadow-[0_1px_8px_rgba(7,26,38,0.04)]">
        {/* Screen Switcher Banner (for reviewer/user to seamlessly switch between all 4 screens) */}
        <div className="bg-[#006194] text-white text-xs px-4 py-1.5 hidden lg:flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="font-semibold text-white/80 uppercase tracking-widest hidden sm:inline">
              {t("Screens:")}
            </span>
            <button
              onClick={() => onNavigate('home')}
              className={`px-2.5 py-0.5 rounded-full transition-all text-xs ${
                currentScreen === 'home'
                  ? 'bg-white text-[#006194] font-bold shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {t("Home")}
            </button>
            <button
              onClick={() => onNavigate('stay')}
              className={`px-2.5 py-0.5 rounded-full transition-all text-xs ${
                currentScreen === 'stay'
                  ? 'bg-white text-[#006194] font-bold shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {t("Rooms & Apartments")}
            </button>
            <button
              onClick={() => onNavigate('offers')}
              className={`px-2.5 py-0.5 rounded-full transition-all text-xs ${
                currentScreen === 'offers'
                  ? 'bg-white text-[#006194] font-bold shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {t("Offers")}
            </button>
            <button
              onClick={() => onNavigate('booking')}
              className={`px-2.5 py-0.5 rounded-full transition-all text-xs ${
                currentScreen === 'booking'
                  ? 'bg-white text-[#006194] font-bold shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {t("Book Now")}
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t("Taghazout Bay Swell: 1.8m @ 14s NW")}</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="h-20 max-w-[1360px] mx-auto px-4 md:px-12 flex items-center justify-between gap-4">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group text-start"
            >
              <ManagedImage
                src={logoWhite}
                alt={t("Blue Wave Lodge Logo")}
                className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 invert dark:invert-0"
              />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label={t('Main navigation')} className="hidden xl:flex items-center gap-4 text-xs 2xl:text-sm font-semibold text-[#3f4850] dark:text-[#e0f0ff]">
            {/* Home */}
            <button onClick={() => onNavigate('home')} className={`py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff] ${currentScreen === 'home' ? 'text-[#006194] dark:text-[#93ccff]' : ''}`}>{t('Home')}</button>

            {/* Rooms & Apartments dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setRoomsDropdownOpen(o => !o)}
                className={`flex items-center gap-1 py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff] ${currentScreen === 'stay' || currentScreen === 'room' ? 'text-[#006194] dark:text-[#93ccff]' : ''}`}
              >
                {t('Rooms & Apartments')}
                <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${roomsDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>

              {roomsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-[#0b1d29] rounded-2xl shadow-2xl border border-[#bfc7d2]/20 py-3 z-50 animate-in fade-in">
                  {/* View all link */}
                  <button onClick={() => { onNavigate('stay'); setRoomsDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-xs font-bold text-[#006194] dark:text-[#93ccff] hover:bg-[#ebf5ff] dark:hover:bg-white/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[15px]">grid_view</span>
                    {t('All Rooms & Apartments')}
                  </button>
                  <div className="my-2 border-t border-[#bfc7d2]/20" />
                  {ROOM_GROUPS.map(group => {
                    const rooms = ACCOMMODATIONS.filter(r => (group.ids as readonly string[]).includes(r.id));
                    return (
                      <div key={group.label} className="px-2 mb-1">
                        <p className="px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-[#675d4d] dark:text-[#d3c4b1]">{t(group.label)}</p>
                        {rooms.map(room => (
                          <button
                            key={room.id}
                            onClick={() => navigateToRoom(room.id)}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#3f4850] dark:text-[#cadced] hover:bg-[#ebf5ff] dark:hover:bg-white/10 hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[15px] text-[#006194] dark:text-[#93ccff]">
                              {group.label === 'Apartment' ? 'apartment' : group.label === 'Sea-view room' ? 'water' : group.label === 'Pool-view room' ? 'pool' : 'king_bed'}
                            </span>
                            {t(room.name)}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other links */}
            {otherLinks.filter(l => l.label !== 'Home').map(link => (
              <button key={link.label} onClick={() => onNavigate(link.screen, link.section)} className={`py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff] ${currentScreen === link.screen && !link.section ? 'text-[#006194] dark:text-[#93ccff]' : ''}`}>{t(link.label)}</button>
            ))}
          </nav>

          {/* Right Controls: Language, Dark Mode, CTA, Profile */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center bg-[#ebf5ff] dark:bg-white/10 p-1 rounded-full text-xs font-semibold">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-white dark:bg-[#006194] text-[#006194] dark:text-white shadow-sm'
                    : 'text-[#3f4850] dark:text-white/70 hover:text-black'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'fr'
                    ? 'bg-white dark:bg-[#006194] text-[#006194] dark:text-white shadow-sm'
                    : 'text-[#3f4850] dark:text-white/70 hover:text-black'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ar')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'ar'
                    ? 'bg-white dark:bg-[#006194] text-[#006194] dark:text-white shadow-sm'
                    : 'text-[#3f4850] dark:text-white/70 hover:text-black'
                }`}
              >
                AR
              </button>
            </div>

            {/* Dark Mode Button */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              title={t("Toggle Dark / Light Mode")}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#3f4850] dark:text-[#d2e5f6] hover:bg-[#e0f0ff] dark:hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Book Your Stay CTA */}
            <button
              type="button"
              onClick={() => onNavigate('booking')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-xs md:text-sm font-semibold shadow-[0_4px_20px_-2px_rgba(0,97,148,0.25)] transition-all active:scale-[0.98] whitespace-nowrap"
            >
              {t("Book Now")}
            </button>

            {/* Profile Avatar with Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-white dark:bg-[#0b1d29] rounded-2xl shadow-2xl border border-[#bfc7d2]/20 text-[#0b1d29] dark:text-white z-50 animate-in fade-in">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#bfc7d2]/20">
                    <div className="w-10 h-10 rounded-full bg-[#cce5ff] text-[#006194] font-bold flex items-center justify-center">
                      BW
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t("Guest Sanctuary")}</p>
                      <p className="text-xs text-[#3f4850] dark:text-white/60">{t("Imi Ouaddar Member")}</p>
                    </div>
                  </div>
                  <div className="py-2 flex flex-col gap-1 text-xs">
                    <button
                      onClick={() => {
                        onNavigate('booking');
                        setProfileOpen(false);
                      }}
                      className="text-start py-2 hover:text-[#006194] flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">book_online</span>
                      <span>{t("Manage Reservations")}</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenConcierge();
                        setProfileOpen(false);
                      }}
                      className="text-start py-2 hover:text-[#006194] flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      <span>{t("Contact the Lodge")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#3f4850] dark:text-white hover:bg-[#e0f0ff] dark:hover:bg-white/10"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white dark:bg-[#0b1d29] border-t border-[#bfc7d2]/20 px-6 py-5 flex flex-col gap-1 text-sm font-semibold">
            <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-start py-2 hover:text-[#006194]">{t('Home')}</button>

            {/* Rooms accordion */}
            <button onClick={() => setMobileRoomsOpen(o => !o)} className="text-start py-2 hover:text-[#006194] flex items-center justify-between">
              <span>{t('Rooms & Apartments')}</span>
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${mobileRoomsOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {mobileRoomsOpen && (
              <div className="pl-3 flex flex-col gap-1 mb-1">
                <button onClick={() => { onNavigate('stay'); setMobileMenuOpen(false); }} className="text-start py-1.5 text-xs font-bold text-[#006194] dark:text-[#93ccff]">{t('All Rooms & Apartments')}</button>
                {ROOM_GROUPS.map(group => (
                  <div key={group.label}>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#675d4d] dark:text-[#d3c4b1] py-1">{t(group.label)}</p>
                    {ACCOMMODATIONS.filter(r => (group.ids as readonly string[]).includes(r.id)).map(room => (
                      <button key={room.id} onClick={() => navigateToRoom(room.id)} className="w-full text-start py-1.5 pl-2 text-sm text-[#3f4850] dark:text-[#cadced] hover:text-[#006194]">{t(room.name)}</button>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {otherLinks.filter(l => l.label !== 'Home').map(link => (
              <button key={link.label} onClick={() => { onNavigate(link.screen, link.section); setMobileMenuOpen(false); }} className="text-start py-2 hover:text-[#006194]">{t(link.label)}</button>
            ))}
            <button onClick={() => { onNavigate('booking'); setMobileMenuOpen(false); }} className="text-start py-2 text-[#006194] font-bold">{t('Book Now')}</button>

            <div className="pt-3 border-t border-[#bfc7d2]/20 flex items-center justify-between">
              <span className="text-xs text-[#675d4d] dark:text-[#d3c4b1]">{t('Language:')}</span>
              <div className="flex gap-2 text-xs">
                {(['en','fr','ar'] as const).map(lang => (
                  <button key={lang} onClick={() => onLanguageChange(lang)} className={`px-2 py-1 rounded uppercase ${language === lang ? 'bg-[#006194] text-white' : ''}`}>{lang}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

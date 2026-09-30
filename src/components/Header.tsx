import React, { useState } from 'react';
import { ScreenType, Language } from '../types';
import { LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
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
  const [stayDropdown, setStayDropdown] = useState(false);
  const [surfDropdown, setSurfDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#f6faff]/90 dark:bg-[#0b1d29]/95 backdrop-blur-xl border-b border-[#071a26]/5 dark:border-white/10 shadow-[0_1px_8px_rgba(7,26,38,0.04)]">
        {/* Screen Switcher Banner (for reviewer/user to seamlessly switch between all 4 screens) */}
        <div className="bg-[#006194] text-white text-xs px-4 py-1.5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="font-semibold text-white/80 uppercase tracking-widest hidden sm:inline">
              Screens:
            </span>
            <button
              onClick={() => onNavigate('home')}
              className={`px-2.5 py-0.5 rounded-full transition-all text-xs ${
                currentScreen === 'home'
                  ? 'bg-white text-[#006194] font-bold shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              1. Home Overview
            </button>
            <button
              onClick={() => onNavigate('stay')}
              className={`px-2.5 py-0.5 rounded-full transition-all text-xs ${
                currentScreen === 'stay'
                  ? 'bg-white text-[#006194] font-bold shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              2. Stay / Sanctuaries
            </button>
            <button
              onClick={() => onNavigate('packages')}
              className={`px-2.5 py-0.5 rounded-full transition-all text-xs ${
                currentScreen === 'packages'
                  ? 'bg-white text-[#006194] font-bold shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              3. Surf &amp; Packages
            </button>
            <button
              onClick={() => onNavigate('booking')}
              className={`px-2.5 py-0.5 rounded-full transition-all text-xs ${
                currentScreen === 'booking'
                  ? 'bg-white text-[#006194] font-bold shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              4. Reserve / Booking Flow
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Taghazout Bay Swell: 1.8m @ 14s NW</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="h-20 max-w-[1360px] mx-auto px-4 md:px-12 flex items-center justify-between gap-4">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group text-left"
            >
              <img
                src={LOGO_URL}
                alt="Blue Wave Lodge Logo"
                className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-sans font-bold text-lg md:text-xl text-[#006194] dark:text-[#93ccff] tracking-tight leading-none">
                  Blue Wave
                </span>
                <span className="text-[10px] md:text-xs text-[#675d4d] dark:text-[#d3c4b1] uppercase tracking-[0.2em] font-semibold leading-tight">
                  Lodge • Morocco
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-[#3f4850] dark:text-[#e0f0ff]">
            <button
              onClick={() => onNavigate('home')}
              className={`py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff] ${
                currentScreen === 'home'
                  ? 'text-[#006194] dark:text-[#93ccff] font-bold border-b-2 border-[#006194]'
                  : ''
              }`}
            >
              {language === 'ar' ? 'الرئيسية' : language === 'fr' ? 'Accueil' : 'Home'}
            </button>

            {/* Stay Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setStayDropdown(true)}
              onMouseLeave={() => setStayDropdown(false)}
            >
              <button
                onClick={() => onNavigate('stay')}
                className={`flex items-center gap-1 py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff] ${
                  currentScreen === 'stay'
                    ? 'text-[#006194] dark:text-[#93ccff] font-bold border-b-2 border-[#006194]'
                    : ''
                }`}
              >
                <span>{language === 'ar' ? 'الإقامة' : language === 'fr' ? 'Séjour' : 'Stay'}</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              {stayDropdown && (
                <div className="absolute top-full left-0 flex flex-col w-56 py-2 bg-white dark:bg-[#0b1d29] rounded-xl shadow-xl border border-[#bfc7d2]/20 text-[#3f4850] dark:text-[#d2e5f6] text-sm animate-in fade-in">
                  <button
                    onClick={() => {
                      onNavigate('stay');
                      setStayDropdown(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-[#e0f0ff] dark:hover:bg-white/10 hover:text-[#006194]"
                  >
                    Lodge Rooms
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('stay');
                      setStayDropdown(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-[#e0f0ff] dark:hover:bg-white/10 hover:text-[#006194]"
                  >
                    Sea View Suites
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('stay');
                      setStayDropdown(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-[#e0f0ff] dark:hover:bg-white/10 hover:text-[#006194]"
                  >
                    Pool View Rooms
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('stay');
                      setStayDropdown(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-[#e0f0ff] dark:hover:bg-white/10 hover:text-[#006194]"
                  >
                    Ocean Apartments
                  </button>
                </div>
              )}
            </div>

            {/* Surf Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSurfDropdown(true)}
              onMouseLeave={() => setSurfDropdown(false)}
            >
              <button
                onClick={() => onNavigate('packages')}
                className={`flex items-center gap-1 py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff] ${
                  currentScreen === 'packages'
                    ? 'text-[#006194] dark:text-[#93ccff] font-bold border-b-2 border-[#006194]'
                    : ''
                }`}
              >
                <span>{language === 'ar' ? 'ركوب الأمواج' : language === 'fr' ? 'Surf' : 'Surf'}</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              {surfDropdown && (
                <div className="absolute top-full left-0 flex flex-col w-60 py-2 bg-white dark:bg-[#0b1d29] rounded-xl shadow-xl border border-[#bfc7d2]/20 text-[#3f4850] dark:text-[#d2e5f6] text-sm animate-in fade-in">
                  <button
                    onClick={() => {
                      onNavigate('packages');
                      setSurfDropdown(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-[#e0f0ff] dark:hover:bg-white/10 hover:text-[#006194]"
                  >
                    Surf Lessons
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('packages');
                      setSurfDropdown(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-[#e0f0ff] dark:hover:bg-white/10 hover:text-[#006194]"
                  >
                    Surf Guiding
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('packages');
                      setSurfDropdown(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-[#e0f0ff] dark:hover:bg-white/10 hover:text-[#006194]"
                  >
                    Surf &amp; Stay
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('packages');
                      setSurfDropdown(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-[#e0f0ff] dark:hover:bg-white/10 hover:text-[#006194]"
                  >
                    Surf + Yoga
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('packages');
                      setSurfDropdown(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-[#e0f0ff] dark:hover:bg-white/10 hover:text-[#006194]"
                  >
                    Equipment Rental
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('packages')}
              className={`py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff] ${
                currentScreen === 'packages' ? 'text-[#006194] dark:text-[#93ccff] font-bold' : ''
              }`}
            >
              {language === 'ar' ? 'الباقات' : language === 'fr' ? 'Forfaits' : 'Packages'}
            </button>

            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff]"
            >
              {language === 'ar' ? 'التجارب' : language === 'fr' ? 'Expériences' : 'Experiences'}
            </button>

            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff]"
            >
              {language === 'ar' ? 'الصور' : language === 'fr' ? 'Galerie' : 'Gallery'}
            </button>

            <button
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="py-2 transition-colors hover:text-[#006194] dark:hover:text-[#93ccff]"
            >
              {language === 'ar' ? 'الموقع' : language === 'fr' ? 'Localisation' : 'Location'}
            </button>
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
              title="Toggle Dark / Light Mode"
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
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-xs md:text-sm font-semibold shadow-[0_4px_20px_-2px_rgba(0,97,148,0.25)] transition-all active:scale-[0.98]"
            >
              {language === 'ar'
                ? 'احجز إقامتك'
                : language === 'fr'
                ? 'Réserver un séjour'
                : 'Book Your Stay'}
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
                      <p className="font-bold text-sm">Guest Sanctuary</p>
                      <p className="text-xs text-[#3f4850] dark:text-white/60">Imi Ouaddar Member</p>
                    </div>
                  </div>
                  <div className="py-2 flex flex-col gap-1 text-xs">
                    <button
                      onClick={() => {
                        onNavigate('booking');
                        setProfileOpen(false);
                      }}
                      className="text-left py-2 hover:text-[#006194] flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">book_online</span>
                      <span>Manage Reservations</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenConcierge();
                        setProfileOpen(false);
                      }}
                      className="text-left py-2 hover:text-[#006194] flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      <span>Message Surf Concierge</span>
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
          <div className="xl:hidden bg-white dark:bg-[#0b1d29] border-t border-[#bfc7d2]/20 px-6 py-5 flex flex-col gap-3 text-sm font-semibold">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#006194] dark:text-[#93ccff]"
            >
              Home Overview
            </button>
            <button
              onClick={() => {
                onNavigate('stay');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#006194]"
            >
              Accommodations &amp; Suites
            </button>
            <button
              onClick={() => {
                onNavigate('packages');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#006194]"
            >
              Surf &amp; Packages
            </button>
            <button
              onClick={() => {
                onNavigate('booking');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#006194]"
            >
              Reserve Sanctuary
            </button>
            <div className="pt-3 border-t border-[#bfc7d2]/20 flex items-center justify-between">
              <span className="text-xs text-[#675d4d] dark:text-[#d3c4b1]">Language:</span>
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-1 rounded ${language === 'en' ? 'bg-[#006194] text-white' : ''}`}
                >
                  EN
                </button>
                <button
                  onClick={() => onLanguageChange('fr')}
                  className={`px-2 py-1 rounded ${language === 'fr' ? 'bg-[#006194] text-white' : ''}`}
                >
                  FR
                </button>
                <button
                  onClick={() => onLanguageChange('ar')}
                  className={`px-2 py-1 rounded ${language === 'ar' ? 'bg-[#006194] text-white' : ''}`}
                >
                  AR
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

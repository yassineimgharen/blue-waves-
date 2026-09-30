import React, { useState, useEffect } from 'react';
import { ScreenType, Language, PackageItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PackageModal } from './components/PackageModal';
import { ConciergeModal } from './components/ConciergeModal';
import { HomeView } from './views/HomeView';
import { StayView } from './views/StayView';
import { PackagesView } from './views/PackagesView';
import { BookingView } from './views/BookingView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle RTL for Arabic
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  // Scroll to top on screen change
  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPackage = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
  };

  const handleClosePackage = () => {
    setSelectedPackage(null);
  };

  const handleBookPackage = (screen: ScreenType) => {
    setSelectedPackage(null);
    navigateTo(screen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6faff] dark:bg-[#071a26] text-[#071a26] dark:text-[#f6faff] font-sans antialiased transition-colors duration-200">
      {/* Primary Header & Top Navigation */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        language={language}
        onLanguageChange={setLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Main View Area with Top Spacing for Fixed Header */}
      <main className="flex-1 pt-[104px] md:pt-[112px]">
        {currentScreen === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onOpenPackage={handleOpenPackage}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        )}

        {currentScreen === 'stay' && (
          <StayView
            onNavigate={navigateTo}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        )}

        {currentScreen === 'packages' && (
          <PackagesView
            onNavigate={navigateTo}
            onOpenPackage={handleOpenPackage}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        )}

        {currentScreen === 'booking' && (
          <BookingView
            onNavigate={navigateTo}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        )}
      </main>

      {/* Persistent Global Floating Quick Navigator Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#071a26]/90 dark:bg-black/90 backdrop-blur-md px-3 py-2 rounded-full shadow-2xl border border-white/15 flex items-center gap-1.5 max-w-[95vw] overflow-x-auto">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#93ccff] px-2 hidden sm:inline">
          Screens:
        </span>
        <button
          onClick={() => navigateTo('home')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentScreen === 'home'
              ? 'bg-[#006194] text-white shadow-md font-semibold'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title="Home Screen"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Home
        </button>
        <button
          onClick={() => navigateTo('stay')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentScreen === 'stay'
              ? 'bg-[#006194] text-white shadow-md font-semibold'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title="Stay / Sanctuaries Screen"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
          Stay & Rooms
        </button>
        <button
          onClick={() => navigateTo('packages')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentScreen === 'packages'
              ? 'bg-[#006194] text-white shadow-md font-semibold'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title="Surf & Packages Screen"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
          Surf Packages
        </button>
        <button
          onClick={() => navigateTo('booking')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentScreen === 'booking'
              ? 'bg-[#bd5e00] text-white shadow-md font-semibold'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title="Reserve Screen"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
          Reserve
        </button>
      </div>

      {/* Shared Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Package Detail Modal Drawer */}
      <PackageModal
        pkg={selectedPackage}
        onClose={handleClosePackage}
        onBook={handleBookPackage}
      />

      {/* Floating Concierge Chat Widget */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
}

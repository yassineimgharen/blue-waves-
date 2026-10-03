import { getTranslator } from './i18n/translations';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ScreenType, Language, RoomItem, BookingDraft } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConciergeModal } from './components/ConciergeModal';
import { HomeView } from './views/HomeView';
import { StayView } from './views/StayView';
import { OffersView } from './views/OffersView';
import { RoomDetailView } from './views/RoomDetailView';
import { useSite, startSiteSync, refreshSite } from './cms/store';
const AdminDashboard = lazy(() => import('./admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
import { emptyBooking, addNights } from './lib/booking';
import { DiningView } from './views/DiningView';
import { BookingView } from './views/BookingView';

function readRoute() {
  const [screen, detail] = window.location.hash.slice(1).split('/');
  if (screen === 'rooms') return { screen: 'room' as ScreenType, detail };
  if (['home', 'stay', 'offers', 'booking', 'dining'].includes(screen)) return { screen: screen as ScreenType, detail };
  return { screen: 'home' as ScreenType, detail: undefined };
}

export default function App() {
  const cms = useSite();
  useEffect(startSiteSync, []);
  const ACCOMMODATIONS = cms.data.rooms;
  const [route, setRoute] = useState(readRoute);
  const currentScreen = route.screen;
  const [booking, setBooking] = useState<BookingDraft>({ ...emptyBooking });
  const activeRoom = ACCOMMODATIONS.find(room => room.id === route.detail);
  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  useEffect(() => {
    if (route.screen === 'home' && route.detail) document.getElementById(route.detail)?.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const t = getTranslator(language);
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

  const navigateTo = (screen: ScreenType, section?: string) => {
    const hash = `#${screen}${section ? `/${section}` : ''}`;
    if (window.location.hash === hash) setRoute(readRoute());
    else window.location.hash = hash;
  };
  const bookRoom = (room: RoomItem) => {
    setBooking(current => ({ ...current, roomId: room.id }));
    navigateTo('booking');
  };
  const chooseOffer = (nights: number, offerId?: string) => {
    const offer = cms.data.offers.find(item => item.id === offerId);
    setBooking(current => ({ ...current, roomId: offer?.roomIds.length && !offer.roomIds.includes(current.roomId) ? '' : current.roomId, offerNights: nights, offerId, checkOut: addNights(current.checkIn, nights) }));
    navigateTo('booking');
  };

  if (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')) return <Suspense fallback={<div className="min-h-screen grid place-items-center">Opening owner dashboard…</div>}><AdminDashboard /></Suspense>;
  if (!cms.loaded) return <div className="min-h-screen grid place-items-center bg-[#f6faff] text-[#006194] p-6"><div role="status">{cms.error || 'Loading Blue Wave Lodge…'}{cms.error && <button className="block mt-4 underline" onClick={() => void refreshSite()}>Try again</button>}</div></div>;
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
            onBook={bookRoom}
            onOffer={chooseOffer}
            onSearch={draft => { setBooking(current => ({ ...current, ...draft })); navigateTo('booking'); }}
            onOpenConcierge={() => setIsConciergeOpen(true)}
            language={language}
          />
        )}

        {currentScreen === 'stay' && (
          <StayView language={language} onBook={bookRoom} />
        )}

        {currentScreen === 'offers' && <OffersView language={language} onChoose={chooseOffer} />}
        {currentScreen === 'dining' && <DiningView language={language} onNavigate={navigateTo} />}
        {currentScreen === 'room' && (activeRoom
          ? <RoomDetailView key={activeRoom.id} room={activeRoom} language={language} onBook={bookRoom} />
          : <div className="max-w-[1360px] mx-auto p-12"><h1>{t('Accommodation not found')}</h1><a href="#stay">{t('Back to Rooms & Apartments')}</a></div>)}

        {currentScreen === 'booking' && (
          <BookingView
            draft={booking}
            onChange={setBooking}
            onNavigate={navigateTo}
            onOpenConcierge={() => setIsConciergeOpen(true)}
            language={language}
          />
        )}
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/212696985757"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl flex items-center justify-center transition-transform hover:scale-110"
        title={t("Chat on WhatsApp")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.027 7.8L0 32l8.418-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.785-1.858l-.486-.29-5.002 1.191 1.215-4.87-.317-.5A13.226 13.226 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.862c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.265.398-1.03 1.294-1.262 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.62-3.202-1.976-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.232.266-.398.398-.664.133-.265.067-.497-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.685l-.764-.013c-.265 0-.697.1-1.063.497-.365.398-1.394 1.362-1.394 3.325s1.427 3.856 1.626 4.122c.199.265 2.808 4.287 6.804 6.014.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.765-.114 2.354-.962 2.686-1.891.332-.93.332-1.727.232-1.892-.1-.164-.365-.265-.763-.464z"/>
        </svg>
      </a>

      {/* Persistent Global Floating Quick Navigator Bar */}
      <div className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#071a26]/90 dark:bg-black/90 backdrop-blur-md px-3 py-2 rounded-full shadow-2xl border border-white/15 items-center gap-1.5 max-w-[95vw] overflow-x-auto">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#93ccff] px-2 hidden sm:inline">
          {t("Screens:")}
        </span>
        <button
          onClick={() => navigateTo('home')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentScreen === 'home'
              ? 'bg-[#006194] text-white shadow-md font-semibold'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title={t("Home Screen")}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          {t("Home")}
        </button>
        <button
          onClick={() => navigateTo('stay')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentScreen === 'stay'
              ? 'bg-[#006194] text-white shadow-md font-semibold'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title={t("Stay / Sanctuaries Screen")}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
          {t("Rooms & Apartments")}
        </button>
        <button
          onClick={() => navigateTo('offers')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentScreen === 'offers'
              ? 'bg-[#006194] text-white shadow-md font-semibold'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title={t("Offers")}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
          {t("Offers")}
        </button>
        <button
          onClick={() => navigateTo('booking')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            currentScreen === 'booking'
              ? 'bg-[#bd5e00] text-white shadow-md font-semibold'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title={t("Reserve Screen")}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
          {t("Reserve")}
        </button>
      </div>

      {/* Shared Footer */}
      <Footer onNavigate={navigateTo} language={language} />

      {/* Floating Concierge Chat Widget */}
      <ConciergeModal
        language={language}
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
}

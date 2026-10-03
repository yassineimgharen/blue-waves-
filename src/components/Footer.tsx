import { useSite } from '../cms/store';
import { getTranslator } from '../i18n/translations';
import React, { useState } from 'react';
import { ScreenType, Language } from '../types';
import logoWhite from '../bluewave-white.png';

interface FooterProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const { data: { contacts } } = useSite();
  const t = getTranslator(language);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#ebf5ff] dark:bg-[#06121a] text-[#3f4850] dark:text-[#cadced] pt-16 pb-12 transition-colors border-t border-[#bfc7d2]/20">
      <div className="max-w-[1360px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt={t("Blue Wave Lodge Logo")}
                className="hidden sm:block h-8 w-auto object-contain invert dark:invert-0"
                src={logoWhite}
              />
              <span className="font-serif-display text-2xl text-[#006194] dark:text-[#93ccff] font-semibold">
                Blue Wave Lodge
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-[#3f4850] dark:text-[#cadced]">
              {t("A curated boutique ocean sanctuary in Imi Ouaddar, Morocco. Where Atlantic point breaks meet refined Berber warmth and unhurried coastal living.")}
            </p>
            <div className="flex items-center gap-2 pt-2 text-sm text-[#3f4850] dark:text-[#cadced]">
              <span className="material-symbols-outlined text-[18px] text-[#00628d] dark:text-[#89ceff]">
                location_on
              </span>
              <span>{t("Lot 150 Imi Ouaddar Commune Tamri, Imi Ouaddar 80502, Morocco")}</span>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-1">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/bluewavelodge.imiouaddar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group w-10 h-10 rounded-xl bg-white dark:bg-white/10 border border-[#bfc7d2]/30 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all"
              >
                <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-grad)" strokeWidth="1.8" fill="none" />
                  <circle cx="12" cy="12" r="4.2" stroke="url(#ig-grad)" strokeWidth="1.8" fill="none" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="url(#ig-grad)" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/bluewavelodge.imiouaddar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group w-10 h-10 rounded-xl bg-white dark:bg-white/10 border border-[#bfc7d2]/30 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#1877F2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/212696985757"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group w-10 h-10 rounded-xl bg-white dark:bg-white/10 border border-[#bfc7d2]/30 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm0 0a5 5 0 0 0 5 5" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Accommodations */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-sans font-bold text-base text-[#0b1d29] dark:text-white">
              {t("Accommodations")}
            </span>
            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => onNavigate('stay')}
                className="text-start hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                {t("Lodge Rooms")}
              </button>
              <button
                onClick={() => onNavigate('stay')}
                className="text-start hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                {t("Sea View Suites")}
              </button>
              <button
                onClick={() => onNavigate('stay')}
                className="text-start hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                {t("Pool Terrace")}
              </button>
              <button
                onClick={() => onNavigate('stay')}
                className="text-start hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                {t("Ocean Apartments")}
              </button>
            </div>
          </div>

          {/* Surf & Life */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-sans font-bold text-base text-[#0b1d29] dark:text-white">
              {t("Optional Experiences")}
            </span>
            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => onNavigate('offers')}
                className="text-start hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                {t("Surf Lesson")}
              </button>
              <button
                onClick={() => onNavigate('offers')}
                className="text-start hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                {t("Surf Guiding")}
              </button>
              <button
                onClick={() => onNavigate('offers')}
                className="text-start hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                {t("Yoga Shala")}
              </button>
              <button
                onClick={() => onNavigate('offers')}
                className="text-start hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                {t("Room + Surf Offers")}
              </button>
            </div>
          </div>

          {/* Direct Contacts & Swell Letter */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-sans font-bold text-base text-[#0b1d29] dark:text-white">
              {t("Direct Contacts & Swell Letter")}
            </span>
            <div className="flex flex-col gap-1 text-sm">
              <a
                className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
                href={`mailto:${contacts.reservationEmail}`}
              >
                {contacts.reservationEmail}
              </a>
              <a
                className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
                href={`mailto:${contacts.contactEmail}`}
              >
                {contacts.contactEmail}
              </a>
              <a
                className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
                href={`tel:${contacts.phone}`}
              >
                {contacts.phone}
              </a>
              <a
                className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
                href={`tel:${contacts.secondPhone}`}
              >
                {contacts.secondPhone}
              </a>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                className="px-4 py-2.5 rounded-lg bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#bfc7d2]/30 flex-1"
                placeholder={t("Your email address")}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="px-5 py-2.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-semibold transition-colors"
                type="submit"
              >
                {subscribed ? t("Subscribed!") : t("Subscribe")}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-in fade-in">
                {t("Thank you! You will receive our monthly Atlantic swell chart and secret tide guide.")}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#bfc7d2]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm">
          <p className="text-[#3f4850] dark:text-[#cadced]">
            {t("© 2025 Blue Wave Lodge Imi Ouaddar. All rights reserved.")}
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => alert(t("Privacy policy: Blue Wave Lodge protects all guest contact and passport details."))}
              className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
            >
              {t("Privacy Policy")}
            </button>
            <button
              onClick={() => alert(t("Terms of stay: 100% refund up to 14 days before check-in. Clean surf guaranteed."))}
              className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
            >
              {t("Terms of Stay")}
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
            >
              {t("Find Us")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

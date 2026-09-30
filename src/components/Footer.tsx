import React, { useState } from 'react';
import { ScreenType } from '../types';
import { LOGO_URL } from '../data/mockData';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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
                alt="Blue Wave Lodge Logo"
                className="h-8 w-auto object-contain"
                src={LOGO_URL}
              />
              <span className="font-serif-display text-2xl text-[#006194] dark:text-[#93ccff] font-semibold">
                Blue Wave Lodge
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-[#3f4850] dark:text-[#cadced]">
              A curated boutique ocean sanctuary in Imi Ouaddar, Morocco. Where Atlantic point
              breaks meet refined Berber warmth and unhurried coastal living.
            </p>
            <div className="flex items-center gap-2 pt-2 text-sm text-[#3f4850] dark:text-[#cadced]">
              <span className="material-symbols-outlined text-[18px] text-[#00628d] dark:text-[#89ceff]">
                location_on
              </span>
              <span>Route d&apos;Essaouira, Plage Imi Ouaddar, Taghazout Bay, Morocco</span>
            </div>
          </div>

          {/* Accommodations */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-sans font-bold text-base text-[#0b1d29] dark:text-white">
              Accommodations
            </span>
            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => onNavigate('stay')}
                className="text-left hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                Lodge Rooms
              </button>
              <button
                onClick={() => onNavigate('stay')}
                className="text-left hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                Sea View Suites
              </button>
              <button
                onClick={() => onNavigate('stay')}
                className="text-left hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                Pool Terrace
              </button>
              <button
                onClick={() => onNavigate('stay')}
                className="text-left hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                Ocean Apartments
              </button>
            </div>
          </div>

          {/* Surf & Life */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-sans font-bold text-base text-[#0b1d29] dark:text-white">
              Surf &amp; Life
            </span>
            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => onNavigate('packages')}
                className="text-left hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                Surf Academy
              </button>
              <button
                onClick={() => onNavigate('packages')}
                className="text-left hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                Point Break Guiding
              </button>
              <button
                onClick={() => onNavigate('packages')}
                className="text-left hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                Yoga Shala
              </button>
              <button
                onClick={() => onNavigate('packages')}
                className="text-left hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
              >
                All-Inclusive Retreats
              </button>
            </div>
          </div>

          {/* Direct Contacts & Swell Letter */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-sans font-bold text-base text-[#0b1d29] dark:text-white">
              Direct Contacts &amp; Swell Letter
            </span>
            <div className="flex flex-col gap-1 text-sm">
              <a
                className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
                href="mailto:reservation@bluewavelodge.com"
              >
                reservation@bluewavelodge.com
              </a>
              <a
                className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
                href="mailto:contact@bluewavelodge.com"
              >
                contact@bluewavelodge.com
              </a>
              <a
                className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
                href="tel:+212528000000"
              >
                +212 (0) 528 000 000 (Front Desk)
              </a>
              <a
                className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
                href="tel:+212661000000"
              >
                +212 (0) 661 000 000 (Surf House)
              </a>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                className="px-4 py-2.5 rounded-lg bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#bfc7d2]/30 flex-1"
                placeholder="Your email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="px-5 py-2.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-semibold transition-colors"
                type="submit"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-in fade-in">
                Thank you! You will receive our monthly Atlantic swell chart and secret tide guide.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#bfc7d2]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm">
          <p className="text-[#3f4850] dark:text-[#cadced]">
            &copy; 2025 Blue Wave Lodge Imi Ouaddar. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => alert('Privacy policy: Blue Wave Lodge protects all guest contact and passport details.')}
              className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => alert('Terms of stay: 100% refund up to 14 days before check-in. Clean surf guaranteed.')}
              className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
            >
              Terms of Stay
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#006194] dark:hover:text-[#93ccff] transition-colors"
            >
              Find Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

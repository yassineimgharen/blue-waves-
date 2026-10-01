import { getTranslator } from '../i18n/translations';
import React from 'react';
import { PackageItem, ScreenType, Language } from '../types';

interface PackageModalProps {
  language: Language;
  pkg: PackageItem | null;
  onClose: () => void;
  onBook: (screen: ScreenType) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({ language, pkg, onClose, onBook }) => {
  const t = getTranslator(language);
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1d29]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white max-w-lg w-full rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col gap-6 relative border border-[#bfc7d2]/20">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#e0f0ff] dark:bg-white/10 flex items-center justify-center text-[#3f4850] dark:text-[#d2e5f6] hover:text-[#0b1d29] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-[#675d4d] dark:text-[#d3c4b1] font-bold">
            {t(pkg.categoryTag)} {t("• Package Specification")}
          </span>
          <h3 className="font-serif-display text-2xl md:text-3xl font-semibold leading-tight">
            {t(pkg.title)}
          </h3>
          <span className="text-lg md:text-xl font-bold text-[#006194] dark:text-[#93ccff]">
            €{pkg.price} <span className="text-xs font-normal text-[#3f4850] dark:text-[#d2e5f6]">{t("/ person")}</span>
          </span>
        </div>

        <p className="text-sm md:text-base text-[#3f4850] dark:text-[#d2e5f6] leading-relaxed">
          {t(pkg.detailedDescription)}
        </p>

        <div className="bg-[#ebf5ff] dark:bg-white/5 p-4 rounded-xl flex flex-col gap-2.5 text-xs md:text-sm text-[#0b1d29] dark:text-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[18px]">
              verified
            </span>
            <span>{t("Free cancellation up to 14 days before arrival")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[18px]">
              lock
            </span>
            <span>{t("Secure reservation request reviewed within 2 hours")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006194] dark:text-[#93ccff] text-[18px]">
              waves
            </span>
            <span>{t("Includes 1:4 ISA instructor ratio & video debriefs")}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              onClose();
              onBook('booking');
            }}
            className="flex-1 py-3.5 rounded-lg bg-[#006194] text-white font-semibold text-sm text-center hover:bg-[#007bb9] transition-colors shadow-md"
          >
            {t("Proceed to Booking")}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3.5 rounded-lg bg-[#e0f0ff] dark:bg-white/10 text-[#0b1d29] dark:text-white text-sm font-semibold hover:bg-[#d8ebfc] transition-colors"
          >
            {t("Dismiss")}
          </button>
        </div>
      </div>
    </div>
  );
};

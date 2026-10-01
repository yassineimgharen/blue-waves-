import { Language } from '../types';
import { getTranslator } from '../i18n/translations';
import React, { useState } from 'react';

interface ConciergeModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ language, isOpen, onClose }) => {
  const t = getTranslator(language);
  const [messages, setMessages] = useState([
    {
      sender: 'concierge',
      text: 'Salam! Marhaban. I am Yassine, Head Surf Concierge at Blue Wave Lodge. How can I help customize your Taghazout Bay stay today?'
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let reply =
        'Thank you! Anchor Point is peeling with a clean 1.8m swell this morning. I will note your request and you can also reach us directly via WhatsApp at +212 661 000 000.';
      const query = userMsg.toLocaleLowerCase();
      if (['room', 'stay', 'chambre', 'séjour', 'غرف', 'إقام'].some(word => query.includes(word))) {
        reply =
          'Our Sea View Balcony Rooms are 94% booked for this week, but we have availability for next week! You can book directly with 14-day free cancellation.';
      } else if (['beginner', 'lesson', 'débutant', 'cours', 'مبتدئ', 'دروس'].some(word => query.includes(word))) {
        reply =
          'Our beginner surf lessons take place directly at Imi Ouaddar sandy beach break right in front of the lodge gates with a 1:4 instructor ratio!';
      }
      setMessages((prev) => [...prev, { sender: 'concierge', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1d29]/60 backdrop-blur-sm flex items-end sm:items-center justify-end sm:justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white dark:bg-[#0b1d29] text-[#0b1d29] dark:text-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-[#bfc7d2]/20 flex flex-col h-[520px]">
        {/* Header */}
        <div className="bg-[#006194] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">surfing</span>
            </div>
            <div>
              <p className="font-bold text-sm">{t("Yassine • Surf Concierge")}</p>
              <p className="text-xs text-white/80">{t("Online • Blue Wave Lodge HQ")}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f6faff] dark:bg-[#071a26]/40 text-xs md:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-[#006194] text-white rounded-br-none'
                    : 'bg-white dark:bg-[#0b1d29] border border-[#bfc7d2]/20 text-[#0b1d29] dark:text-white rounded-bl-none shadow-sm'
                }`}
              >
                {m.sender === 'concierge' ? t(m.text) : m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Question Chips */}
        <div className="px-3 py-2 bg-white dark:bg-[#0b1d29] border-t border-[#bfc7d2]/20 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs">
          <button
            onClick={() => setInput(t("What is the swell forecast today?"))}
            className="px-2.5 py-1 rounded-full bg-[#ebf5ff] dark:bg-white/10 hover:bg-[#e0f0ff] text-[#006194] dark:text-[#93ccff]"
          >
            {t("Swell Forecast?")}
          </button>
          <button
            onClick={() => setInput(t("Can I arrange airport transfer?"))}
            className="px-2.5 py-1 rounded-full bg-[#ebf5ff] dark:bg-white/10 hover:bg-[#e0f0ff] text-[#006194] dark:text-[#93ccff]"
          >
            {t("Airport Transfer?")}
          </button>
          <button
            onClick={() => setInput(t("Do you have boards for beginners?"))}
            className="px-2.5 py-1 rounded-full bg-[#ebf5ff] dark:bg-white/10 hover:bg-[#e0f0ff] text-[#006194] dark:text-[#93ccff]"
          >
            {t("Beginner Boards?")}
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#0b1d29] border-t border-[#bfc7d2]/20 flex gap-2">
          <input
            type="text"
            className="flex-1 bg-[#ebf5ff] dark:bg-[#071a26] text-[#0b1d29] dark:text-white px-3 py-2 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]"
            placeholder={t("Type your question or request...")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-sm font-semibold flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

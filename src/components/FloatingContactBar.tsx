import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';
import {
  Mail,
  Phone,
  Send,
  Instagram,
  Settings,
} from 'lucide-react';

export const FloatingContactBar: React.FC = () => {
  const { language, theme, openLeadModalWithProperty, setIsAdminOpen } = useApp();
  const t = translations[language];
  const isDark = theme === 'dark';

  return (
    <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col rounded-l-xl border-l border-y shadow-2xl backdrop-blur-md overflow-hidden transition-colors ${
      isDark
        ? 'bg-[#071322]/95 border-[#C49A45]/30'
        : 'bg-[#FFFFFF]/95 border-[#C49A45]/40 shadow-xl'
    }`}>
      {/* 1. Enquire / Mail icon */}
      <button
        onClick={() => openLeadModalWithProperty(null)}
        title={t.contactBar.enquireTooltip}
        className={`p-3.5 transition-all flex items-center justify-center border-b border-[#C49A45]/20 group relative ${
          isDark ? 'text-[#EDE7DE] hover:bg-[#C49A45] hover:text-[#060D17]' : 'text-[#0A1628] hover:bg-[#C49A45] hover:text-white'
        }`}
      >
        <Mail className="w-5 h-5 transition-transform group-hover:scale-105" />
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#0A1628] text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#C49A45]/40 shadow-xl">
          {t.contactBar.enquireTooltip}
        </span>
      </button>

      {/* 2. Direct Phone Call */}
      <a
        href="tel:+998508767722"
        title={t.contactBar.callTooltip}
        className={`p-3.5 transition-all flex items-center justify-center border-b border-[#C49A45]/20 group relative ${
          isDark ? 'text-[#EDE7DE] hover:bg-[#C49A45] hover:text-[#060D17]' : 'text-[#0A1628] hover:bg-[#C49A45] hover:text-white'
        }`}
      >
        <Phone className="w-5 h-5 transition-transform group-hover:scale-105" />
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#0A1628] text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#C49A45]/40 shadow-xl">
          +998 50 876 77 22
        </span>
      </a>

      {/* 3. Telegram Link -> @YasinTime_Group */}
      <a
        href="https://t.me/YasinTime_Group"
        target="_blank"
        rel="noopener noreferrer"
        title={t.contactBar.telegramTooltip}
        className="p-3.5 text-[#38BDF8] hover:text-white hover:bg-[#0284C7] transition-all flex items-center justify-center border-b border-[#C49A45]/20 group relative"
      >
        <Send className="w-5 h-5 transition-transform group-hover:scale-105" />
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#0A1628] text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#C49A45]/40 shadow-xl">
          Telegram: @YasinTime_Group
        </span>
      </a>

      {/* 4. Instagram Link */}
      <a
        href="https://www.instagram.com/yasintime.official/?utm_source=ig_web_button_share_sheet"
        target="_blank"
        rel="noopener noreferrer"
        title={t.contactBar.instagramTooltip}
        className="p-3.5 text-[#F43F5E] hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-500 transition-all flex items-center justify-center border-b border-[#C49A45]/20 group relative"
      >
        <Instagram className="w-5 h-5 transition-transform group-hover:scale-105" />
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#0A1628] text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#C49A45]/40 shadow-xl">
          Instagram: @yasintime.official
        </span>
      </a>

      {/* 5. Separate Admin Portal access */}
      <button
        onClick={() => setIsAdminOpen(true)}
        title={t.contactBar.adminTooltip}
        className={`p-3.5 transition-all flex items-center justify-center group relative ${
          isDark ? 'text-[#A0AEC0] hover:text-[#DFBA6B] hover:bg-white/5' : 'text-[#718096] hover:text-[#9A7426] hover:bg-[#F7F4EE]'
        }`}
      >
        <Settings className="w-4 h-4 transition-transform group-hover:rotate-45" />
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#0A1628] text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#C49A45]/40 shadow-xl">
          {t.contactBar.adminTooltip} (/admin)
        </span>
      </button>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Phone,
  Send,
  Instagram,
} from 'lucide-react';

export const FloatingContactBar: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col rounded-l-xl border-l border-y shadow-2xl backdrop-blur-md overflow-hidden transition-colors ${
      isDark
        ? 'bg-[#071322]/95 border-[#C49A45]/30'
        : 'bg-[#FFFFFF]/95 border-[#C49A45]/40 shadow-xl'
    }`}>
      {/* 1. Official Email -> ooo.yasintime@gmail.com */}
      <a
        href="mailto:ooo.yasintime@gmail.com"
        title="Email: ooo.yasintime@gmail.com"
        className={`p-3.5 transition-all flex items-center justify-center border-b border-[#C49A45]/20 group relative ${
          isDark ? 'text-[#EDE7DE] hover:bg-[#C49A45] hover:text-[#060D17]' : 'text-[#0A1628] hover:bg-[#C49A45] hover:text-white'
        }`}
      >
        <Mail className="w-5 h-5 transition-transform group-hover:scale-105" />
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#0A1628] text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#C49A45]/40 shadow-xl">
          ooo.yasintime@gmail.com
        </span>
      </a>

      {/* 2. Direct Phone Call */}
      <a
        href="tel:+998508767722"
        title="+998 50 876 77 22"
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
        title="Telegram: @YasinTime_Group"
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
        title="Instagram: @yasintime.official"
        className="p-3.5 text-[#F43F5E] hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-500 transition-all flex items-center justify-center group relative"
      >
        <Instagram className="w-5 h-5 transition-transform group-hover:scale-105" />
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#0A1628] text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#C49A45]/40 shadow-xl">
          Instagram: @yasintime.official
        </span>
      </a>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';
import { Language } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  Phone,
  Globe,
  ChevronDown,
  Sun,
  Moon,
  Send,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme, openLeadModalWithProperty } = useApp();
  const t = translations[language];
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbekcha", flag: "🇺🇿" },
    { code: 'ru', label: "Русский", flag: "🇷🇺" },
    { code: 'en', label: "English", flag: "🇬🇧" },
    { code: 'tg', label: "Тоҷикӣ", flag: "🇹🇯" },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 ${
      isDark
        ? 'bg-[#060D17]/95 border-b border-[#C49A45]/20 backdrop-blur-md'
        : 'bg-[#FFFFFF]/95 border-b border-[#D4AF37]/30 backdrop-blur-md shadow-sm'
    }`}>
      {/* Top corporate micro-bar */}
      <div className={`px-4 sm:px-8 py-2 text-xs flex justify-between items-center transition-colors ${
        isDark
          ? 'bg-[#030810] border-b border-[#C49A45]/10 text-[#94A3B8]'
          : 'bg-[#F7F4EE] border-b border-[#E8DFC8] text-[#4A5568]'
      }`}>
        <div className="flex items-center gap-3">
          <span className="text-[#C49A45] font-semibold tracking-wider uppercase text-[11px]">
            AZIZI DEVELOPMENTS RASMIY STRATEGIK HAMKORI
          </span>
          <span className="hidden lg:inline opacity-30">|</span>
          <span className="hidden lg:inline text-[11px]">
            Тошкент шаҳар, Шайхонтоҳур тумани, кв. Жангох, дом 2аб, кв. 185
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+998508767722"
            className={`flex items-center gap-1.5 font-semibold transition-colors text-[11px] ${
              isDark ? 'text-white hover:text-[#DFBA6B]' : 'text-[#0A1628] hover:text-[#9A7426]'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#C49A45]" />
            <span>+998 50 876 77 22</span>
          </a>
        </div>
      </div>

      {/* Main Luxury Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo Lockup using exact user uploaded assets */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group"
        >
          <BrandLogo isDark={isDark} size="md" showPartnerBadge={false} />
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-[0.14em] uppercase">
          <button
            onClick={() => scrollTo('signature-section')}
            className={`transition-colors py-1 ${
              isDark ? 'text-[#CBD5E1] hover:text-[#DFBA6B]' : 'text-[#334155] hover:text-[#9A7426]'
            }`}
          >
            {t.nav.projects}
          </button>
          <button
            onClick={() => scrollTo('azizi-section')}
            className={`transition-colors py-1 ${
              isDark ? 'text-[#CBD5E1] hover:text-[#DFBA6B]' : 'text-[#334155] hover:text-[#9A7426]'
            }`}
          >
            {t.nav.aziziPartner}
          </button>
          <button
            onClick={() => scrollTo('catalog-section')}
            className={`transition-colors py-1 ${
              isDark ? 'text-[#CBD5E1] hover:text-[#DFBA6B]' : 'text-[#334155] hover:text-[#9A7426]'
            }`}
          >
            {t.nav.catalog}
          </button>
          <button
            onClick={() => scrollTo('footer-section')}
            className={`transition-colors py-1 ${
              isDark ? 'text-[#CBD5E1] hover:text-[#DFBA6B]' : 'text-[#334155] hover:text-[#9A7426]'
            }`}
          >
            {t.nav.about}
          </button>
        </nav>

        {/* Right Controls: Theme Toggle + Language Menu + CTA */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all ${
              isDark
                ? 'bg-[#0A1628] border-[#C49A45]/30 text-[#DFBA6B] hover:border-[#C49A45]'
                : 'bg-[#F7F4EE] border-[#C49A45]/50 text-[#8C6D23] hover:border-[#C49A45] shadow-sm'
            }`}
            title={isDark ? t.nav.themeLight : t.nav.themeDark}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Premium Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                isDark
                  ? 'bg-[#0A1628] border-[#C49A45]/30 text-[#EDE7DE] hover:border-[#C49A45]'
                  : 'bg-[#F7F4EE] border-[#C49A45]/50 text-[#0A1628] hover:border-[#C49A45] shadow-sm'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#C49A45]" />
              <span>{currentLangObj.flag}</span>
              <span className="uppercase tracking-wider text-[11px]">{currentLangObj.code}</span>
              <ChevronDown className="w-3 h-3 text-[#A0AEC0]" />
            </button>

            {isLangOpen && (
              <div className={`absolute right-0 mt-2 w-40 rounded-xl border shadow-2xl py-1 z-50 animate-in fade-in ${
                isDark
                  ? 'bg-[#091322] border-[#C49A45]/40 text-white'
                  : 'bg-white border-[#C49A45]/40 text-[#0A1628]'
              }`}>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      language === l.code
                        ? 'text-[#C49A45] font-bold bg-[#C49A45]/15'
                        : isDark
                        ? 'hover:bg-white/5'
                        : 'hover:bg-[#F7F4EE]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    {language === l.code && <span className="text-[#C49A45] font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enquire CTA Button */}
          <button
            onClick={() => openLeadModalWithProperty(null)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-[0.14em] uppercase transition-all bg-gradient-to-r from-[#C49A45] via-[#DFBA6B] to-[#C49A45] text-[#060D17] shadow-lg shadow-[#C49A45]/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.nav.enquire}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

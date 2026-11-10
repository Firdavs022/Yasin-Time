import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';
import { Language } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  ArrowRight,
  Instagram,
  Send,
  Phone,
  Globe,
  MapPin,
  Check,
  Shield,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setLanguage, theme, setIsAdminOpen } = useApp();
  const t = translations[language];

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbekcha", flag: "🇺🇿" },
    { code: 'ru', label: "Русский", flag: "🇷🇺" },
    { code: 'en', label: "English", flag: "🇬🇧" },
    { code: 'tg', label: "Тоҷикӣ", flag: "🇹🇯" },
  ];

  const isDark = theme === 'dark';

  return (
    <footer id="footer-section" className={`pt-16 pb-12 border-t-2 border-[#C49A45] transition-colors duration-300 ${
      isDark ? 'bg-[#040A14] text-[#E2E8F0]' : 'bg-[#EFEAE1] text-[#1E293B]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Logo & Newsletter + Links */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b ${
          isDark ? 'border-white/10' : 'border-[#D1C7BA]'
        }`}>
          {/* Col 1: Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <BrandLogo isDark={isDark} size="md" showPartnerBadge={true} />

            <p className={`text-xs leading-relaxed max-w-md ${
              isDark ? 'text-[#94A3B8]' : 'text-[#475569]'
            }`}>
              Yasin Time Group — Dubay va Markaziy Osiyo bo'ylab xalqaro premium ko'chmas mulk, off-plan investitsiyalar va to'liq boshqaruv xizmatlarini ko'rsatuvchi yetakchi konsalting xoldingi.
            </p>

            {/* Newsletter input */}
            <div className="space-y-2 pt-2">
              <div className={`text-xs font-bold tracking-wider uppercase ${
                isDark ? 'text-white' : 'text-[#0A1628]'
              }`}>
                {t.footer.newsletterTitle}
              </div>
              <div className={`text-[11px] ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                {t.footer.newsletterSubtitle}
              </div>

              {isSubscribed ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Rahmat! Siz eksklyuziv takliflar ro'yxatiga muvaffaqiyatli qo'shildingiz.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="relative max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t.footer.emailPlaceholder}
                    className={`w-full py-3 pl-3 pr-12 rounded-none border-b-2 bg-transparent text-xs focus:outline-none focus:border-[#C49A45] transition-colors ${
                      isDark
                        ? 'border-white/30 text-white placeholder-[#64748B]'
                        : 'border-[#0A1628] text-[#0A1628] placeholder-[#64748B]'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-[#C49A45] transition-colors ${
                      isDark ? 'text-white' : 'text-[#0A1628]'
                    }`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/yasintime.official/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0A1628] text-white hover:bg-[#C49A45] hover:text-[#060D17] flex items-center justify-center transition-all shadow-md"
                title="Instagram @yasintime.official"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://t.me/YasinTime_Group"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0A1628] text-white hover:bg-[#0284C7] flex items-center justify-center transition-all shadow-md"
                title="Telegram @YasinTime_Group"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href="tel:+998508767722"
                className="w-9 h-9 rounded-full bg-[#0A1628] text-white hover:bg-emerald-600 flex items-center justify-center transition-all shadow-md"
                title="+998 50 876 77 22"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: About Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-[0.2em] ${
              isDark ? 'text-white' : 'text-[#0A1628]'
            }`}>
              {t.footer.aboutUs}
            </h4>
            <ul className={`space-y-2.5 text-xs ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
              <li className="hover:text-[#C49A45] cursor-pointer transition-colors">{t.footer.ourLegacy}</li>
              <li className="hover:text-[#C49A45] cursor-pointer transition-colors">{t.footer.corporateTeam}</li>
              <li className="hover:text-[#C49A45] cursor-pointer transition-colors">{t.footer.contactUs}</li>
              <li className="hover:text-[#C49A45] cursor-pointer transition-colors">{t.footer.careers}</li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-[#C49A45] hover:underline font-semibold flex items-center gap-1.5 pt-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{t.footer.adminLogin}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portfolio Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-[0.2em] ${
              isDark ? 'text-white' : 'text-[#0A1628]'
            }`}>
              {t.footer.ourPortfolio}
            </h4>
            <ul className={`space-y-2.5 text-xs ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
              <li className="hover:text-[#C49A45] cursor-pointer transition-colors">Azizi Venice Laguna</li>
              <li className="hover:text-[#C49A45] cursor-pointer transition-colors">Burj Azizi - SZR</li>
              <li className="hover:text-[#C49A45] cursor-pointer transition-colors">Palm View Pentxaus</li>
              <li className="hover:text-[#C49A45] cursor-pointer transition-colors">Riviera Majmuasi</li>
              <li className="hover:text-[#C49A45] cursor-pointer transition-colors">The Royal Sanctuary Villa</li>
            </ul>
          </div>

          {/* Col 4: Digital Services & Offices */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-[0.2em] ${
              isDark ? 'text-white' : 'text-[#0A1628]'
            }`}>
              {t.footer.services}
            </h4>
            <div className={`space-y-3 text-xs ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#C49A45] flex-shrink-0 mt-0.5" />
                <div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>+998 50 876 77 22</div>
                  <div className="text-[10px] text-[#A0AEC0]">Telegram / Qo'ng'iroq 24/7</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49A45] flex-shrink-0 mt-0.5" />
                <div>
                  <div className={`text-[10px] uppercase font-bold tracking-wider text-[#C49A45]`}>
                    Bosh ofis (Toshkent):
                  </div>
                  <div className={`font-semibold leading-relaxed ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                    {t.footer.officeTashkent}
                  </div>
                  <div className="text-[11px] text-[#A0AEC0] mt-1">
                    <span className="text-[#C49A45] font-semibold">Dubay:</span> {t.footer.officeDubai}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with Language selector & Copyright */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'
        }`}>
          <div>
            © {new Date().getFullYear()} Yasin Time Group & Azizi Developments. {t.footer.rights}
          </div>

          {/* Footer Language Buttons */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C49A45]" />
            <span className={`text-[11px] font-semibold mr-1 ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
              {t.footer.language}:
            </span>
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                  language === l.code
                    ? 'bg-[#C49A45] text-[#060D17] font-bold'
                    : isDark
                    ? 'text-[#94A3B8] hover:text-white'
                    : 'text-[#475569] hover:text-[#0A1628]'
                }`}
              >
                {l.flag} {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

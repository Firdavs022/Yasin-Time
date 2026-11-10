import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';
import {
  Award,
  Globe2,
  Building,
  Users,
  ShieldCheck,
  CheckCircle,
  FileCheck2,
} from 'lucide-react';

export const AziziPartnershipSection: React.FC = () => {
  const { language, theme, openLeadModalWithProperty } = useApp();
  const t = translations[language];
  const isDark = theme === 'dark';

  return (
    <section id="azizi-section" className={`py-24 border-y transition-colors duration-300 relative overflow-hidden ${
      isDark
        ? 'bg-[#071322] border-[#C49A45]/20'
        : 'bg-[#F2ECE1] border-[#D4AF37]/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Partnership description & value props */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-md text-xs font-bold tracking-[0.16em] uppercase ${
              isDark ? 'bg-[#0F1E33] border border-[#C49A45]/40 text-[#DFBA6B]' : 'bg-white border border-[#C49A45]/50 text-[#8C6D23]'
            }`}>
              <Award className="w-4 h-4 text-[#C49A45]" />
              {t.aziziSection.badge}
            </div>

            <h2 className={`text-3xl sm:text-5xl font-bold font-cinzel leading-tight ${
              isDark ? 'text-white' : 'text-[#0A1628]'
            }`}>
              {t.aziziSection.title}
            </h2>

            <p className={`text-base leading-relaxed font-light ${
              isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'
            }`}>
              {t.aziziSection.description}
            </p>

            {/* 3 Key Pillars */}
            <div className="space-y-3.5 pt-2">
              <div className={`flex items-start gap-4 p-4 rounded-xl border ${
                isDark ? 'bg-[#091526]/80 border-[#C49A45]/20' : 'bg-white border-[#E2D8C3]'
              }`}>
                <div className="p-2.5 rounded-lg bg-[#C49A45]/15 text-[#C49A45] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                    {t.aziziSection.features1Title}
                  </h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    {t.aziziSection.features1Desc}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-4 p-4 rounded-xl border ${
                isDark ? 'bg-[#091526]/80 border-[#C49A45]/20' : 'bg-white border-[#E2D8C3]'
              }`}>
                <div className="p-2.5 rounded-lg bg-[#C49A45]/15 text-[#C49A45] flex-shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                    {t.aziziSection.features2Title}
                  </h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    {t.aziziSection.features2Desc}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-4 p-4 rounded-xl border ${
                isDark ? 'bg-[#091526]/80 border-[#C49A45]/20' : 'bg-white border-[#E2D8C3]'
              }`}>
                <div className="p-2.5 rounded-lg bg-[#C49A45]/15 text-[#C49A45] flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                    {t.aziziSection.features3Title}
                  </h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    {t.aziziSection.features3Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openLeadModalWithProperty(null)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C49A45] via-[#DFBA6B] to-[#C49A45] text-[#060D17] font-bold text-xs uppercase tracking-[0.16em] shadow-lg shadow-[#C49A45]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t.hero.registerInterest}
              </button>
            </div>
          </div>

          {/* Right Column: Numbers and Credibility Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-8 rounded-3xl border text-center space-y-6 shadow-2xl ${
              isDark
                ? 'bg-gradient-to-b from-[#0E1E34] to-[#071322] border-[#C49A45]/30'
                : 'bg-white border-[#D4AF37]/40'
            }`}>
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <div className={`p-3 rounded-2xl border ${isDark ? 'bg-[#071322] border-[#C49A45]/40' : 'bg-[#FAF8F5] border-[#C49A45]/50'}`}>
                  <img
                    src="/assets/aistudio/Group_1-Photoroom_b2b5b4b2.png"
                    alt="Yasin Time Group"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <span className="text-xl text-[#C49A45] font-light">×</span>
                <div className={`p-2 sm:p-2.5 rounded-2xl border overflow-hidden flex items-center justify-center ${
                  isDark ? 'bg-[#071322] border-[#C49A45]/40' : 'bg-[#FAF8F5] border-[#C49A45]/50'
                }`}>
                  <img
                    src="/assets/aistudio/image_f7142773.png"
                    alt="Azizi Developments"
                    className="h-14 sm:h-16 object-contain rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className={`text-base font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                  Rasmiy Strategik Hamkorlik
                </h3>
                <p className={`text-xs ${isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}`}>
                  Dubay va O'zbekiston bo'yicha rasmiy bosh brokerlik vakili
                </p>
              </div>

              {/* 4 Numbers Grid */}
              <div className={`grid grid-cols-2 gap-3.5 text-left pt-4 border-t ${isDark ? 'border-[#C49A45]/20' : 'border-[#EAE1D0]'}`}>
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#07111E] border-white/5' : 'bg-[#FAF8F5] border-[#E8DFC8]'}`}>
                  <Building className="w-5 h-5 text-[#C49A45] mb-1" />
                  <div className={`text-2xl font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>50+</div>
                  <div className="text-[10px] text-[#A0AEC0] uppercase tracking-wider">
                    {t.aziziSection.statsProjects}
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#07111E] border-white/5' : 'bg-[#FAF8F5] border-[#E8DFC8]'}`}>
                  <Award className="w-5 h-5 text-[#C49A45] mb-1" />
                  <div className="text-2xl font-bold font-cinzel text-[#C49A45]">$4.2B+</div>
                  <div className="text-[10px] text-[#A0AEC0] uppercase tracking-wider">
                    {t.aziziSection.statsPortfolio}
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#07111E] border-white/5' : 'bg-[#FAF8F5] border-[#E8DFC8]'}`}>
                  <Users className="w-5 h-5 text-emerald-500 mb-1" />
                  <div className={`text-2xl font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>10,000+</div>
                  <div className="text-[10px] text-[#A0AEC0] uppercase tracking-wider">
                    {t.aziziSection.statsDelivered}
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-[#07111E] border-white/5' : 'bg-[#FAF8F5] border-[#E8DFC8]'}`}>
                  <Globe2 className="w-5 h-5 text-blue-500 mb-1" />
                  <div className={`text-2xl font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>120+</div>
                  <div className="text-[10px] text-[#A0AEC0] uppercase tracking-wider">
                    {t.aziziSection.statsNationalities}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

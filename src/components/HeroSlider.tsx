import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  Calendar,
  Building,
  ShieldCheck,
} from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { language, theme, properties, setSelectedPropertyForModal, openLeadModalWithProperty } = useApp();
  const t = translations[language];

  const signatureProjects = properties.filter((p) => p.signatureProject);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (signatureProjects.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % signatureProjects.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [signatureProjects.length]);

  if (signatureProjects.length === 0) return null;

  const currentProject = signatureProjects[currentIndex] || signatureProjects[0];

  const getTitle = (p: typeof currentProject) => {
    if (language === 'ru') return p.titleRu;
    if (language === 'en') return p.titleEn;
    if (language === 'tg') return p.titleTg;
    return p.title;
  };

  const getDescription = (p: typeof currentProject) => {
    return p.description[language] || p.description.uz;
  };

  const isDark = theme === 'dark';

  return (
    <div className={`relative w-full min-h-[620px] lg:min-h-[720px] flex items-center overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-[#060D17] border-[#C49A45]/20' : 'bg-[#1A2536] border-[#D4AF37]/30'
    }`}>
      {/* Background imagery with crossfade */}
      {signatureProjects.map((proj, idx) => (
        <div
          key={proj.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={proj.images[0]}
            alt={proj.title}
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.05]"
          />
          {/* Architectural gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060D17] via-[#060D17]/85 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D17] via-transparent to-black/50" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Project presentation & CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#0F1E33]/90 border border-[#C49A45]/50 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#DFBA6B]">
                {t.hero.exclusiveOffer} • AZIZI DEVELOPMENTS
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-cinzel text-white leading-[1.14]">
                {getTitle(currentProject)}
              </h1>
              <p className="text-sm sm:text-base text-[#CBD5E1] line-clamp-3 font-light leading-relaxed max-w-2xl">
                {getDescription(currentProject)}
              </p>
            </div>

            {/* Azizi-style boxed highlight card */}
            <div className="p-5 rounded-2xl bg-[#091526]/90 border border-[#C49A45]/30 backdrop-blur-md max-w-xl space-y-3 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C49A45]/20 pb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">
                    {t.hero.startingFrom}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#DFBA6B] font-cinzel">
                    {currentProject.dealType === 'rent'
                      ? `$${currentProject.price.toLocaleString()} / oy`
                      : `$${currentProject.price.toLocaleString()}`}
                  </div>
                </div>

                {currentProject.roiExpected && (
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-emerald-400 font-semibold">
                      {t.hero.roiLabel}
                    </div>
                    <div className="text-xl font-bold text-emerald-300">
                      {currentProject.roiExpected}
                    </div>
                  </div>
                )}
              </div>

              {/* Milestones / specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="flex items-center gap-2 text-[#CBD5E1]">
                  <Calendar className="w-4 h-4 text-[#C49A45]" />
                  <span>{currentProject.handoverDate || '2026-yil'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#CBD5E1]">
                  <Building className="w-4 h-4 text-[#C49A45]" />
                  <span>{currentProject.areaSqM} m² • {currentProject.bedrooms} xona</span>
                </div>
                <div className="flex items-center gap-2 text-[#CBD5E1] col-span-2 sm:col-span-1">
                  <ShieldCheck className="w-4 h-4 text-[#C49A45]" />
                  <span>Rasmiy Kafolat</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => openLeadModalWithProperty(currentProject)}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#C49A45] via-[#DFBA6B] to-[#C49A45] text-[#060D17] font-bold tracking-[0.14em] uppercase text-xs sm:text-sm shadow-xl shadow-[#C49A45]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5"
              >
                <span>{t.hero.registerInterest}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedPropertyForModal(currentProject)}
                className="px-6 py-3.5 rounded-xl border border-[#C49A45]/60 hover:border-[#DFBA6B] bg-[#0A1628]/80 hover:bg-[#0E2038] text-[#EDE7DE] font-semibold tracking-[0.14em] uppercase text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span>{t.hero.discover}</span>
                <ChevronRight className="w-4 h-4 text-[#C49A45]" />
              </button>
            </div>
          </div>

          {/* Right Column: Azizi-style Project Switcher Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#081220]/95 border border-[#C49A45]/30 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#C49A45]/20">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C49A45] font-bold">
                  Eksklyuziv Kolleksiya
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentIndex(
                        (prev) => (prev - 1 + signatureProjects.length) % signatureProjects.length
                      )
                    }
                    className="p-1.5 rounded-lg border border-[#C49A45]/30 hover:bg-[#C49A45]/20 text-[#DFBA6B] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) => (prev + 1) % signatureProjects.length)
                    }
                    className="p-1.5 rounded-lg border border-[#C49A45]/30 hover:bg-[#C49A45]/20 text-[#DFBA6B] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* List of signature projects */}
              <div className="space-y-3 mt-4">
                {signatureProjects.map((p, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center gap-3.5 ${
                        isActive
                          ? 'bg-[#12253E] border-[#C49A45] shadow-lg'
                          : 'bg-[#091526]/50 border-white/5 hover:border-[#C49A45]/40 hover:bg-[#0C1B30]'
                      }`}
                    >
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-16 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-[#C49A45]">
                            {p.projectType === 'offplan'
                              ? 'Off-Plan'
                              : p.projectType === 'flipping'
                              ? 'Qayta Sotuv'
                              : p.projectType === 'rental'
                              ? 'Ijara'
                              : 'Villa'}
                          </span>
                          <span className="text-xs font-bold text-[#EDE7DE] font-cinzel">
                            ${p.price.toLocaleString()}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-white truncate mt-0.5">
                          {getTitle(p)}
                        </h4>
                        <div className="text-[10px] text-[#A0AEC0] truncate">
                          {p.location}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Showroom timing notice */}
              <div className="mt-4 pt-3 border-t border-[#C49A45]/20 text-center">
                <div className="text-[11px] text-[#CBD5E1]">
                  {t.hero.visitShowroom}
                </div>
                <div className="text-[10px] font-medium text-[#C49A45] tracking-wider mt-0.5">
                  {t.hero.showroomTime}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {signatureProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 transition-all rounded-full ${
                i === currentIndex ? 'w-8 bg-[#C49A45]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

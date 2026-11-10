import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';
import { Property } from '../types';
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  Key,
  Home,
} from 'lucide-react';

export const SignatureProjects: React.FC = () => {
  const { language, theme, properties, setSelectedPropertyForModal, openLeadModalWithProperty } = useApp();
  const t = translations[language];

  const sigs = properties.filter((p) => p.signatureProject);

  const getTitle = (p: Property) => {
    if (language === 'ru') return p.titleRu;
    if (language === 'en') return p.titleEn;
    if (language === 'tg') return p.titleTg;
    return p.title;
  };

  const getDesc = (p: Property) => {
    return p.description[language] || p.description.uz;
  };

  const isDark = theme === 'dark';

  const getPillarBadge = (type?: string) => {
    switch (type) {
      case 'offplan':
        return { label: t.signature.offplanTitle, icon: Building, color: 'text-amber-500 border-amber-500/40 bg-amber-500/10' };
      case 'flipping':
        return { label: t.signature.flippingTitle, icon: TrendingUp, color: 'text-indigo-400 border-indigo-400/40 bg-indigo-400/10' };
      case 'rental':
        return { label: t.signature.rentalTitle, icon: Key, color: 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10' };
      case 'villa':
      default:
        return { label: t.signature.villaTitle, icon: Home, color: 'text-blue-500 border-blue-500/40 bg-blue-500/10' };
    }
  };

  return (
    <section id="signature-section" className={`py-24 transition-colors duration-300 relative ${
      isDark ? 'bg-[#050B14]' : 'bg-[#FAF8F5]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-md text-xs font-bold tracking-[0.16em] uppercase ${
            isDark ? 'bg-[#0F1E33] border border-[#C49A45]/40 text-[#DFBA6B]' : 'bg-[#F2ECE1] border border-[#C49A45]/50 text-[#8C6D23]'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
            {t.signature.badge}
          </div>
          <h2 className={`text-3xl sm:text-5xl font-bold font-cinzel tracking-wide ${
            isDark ? 'text-white' : 'text-[#0A1628]'
          }`}>
            {t.signature.title}
          </h2>
          <p className={`text-sm sm:text-base font-light max-w-2xl mx-auto ${
            isDark ? 'text-[#94A3B8]' : 'text-[#4A5568]'
          }`}>
            {t.signature.subtitle}
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sigs.map((project) => {
            const badge = getPillarBadge(project.projectType);
            const Icon = badge.icon;

            return (
              <div
                key={project.id}
                className={`group rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#091526] border-[#C49A45]/25 hover:border-[#C49A45] shadow-xl'
                    : 'bg-white border-[#E2D8C3] hover:border-[#C49A45] shadow-md'
                }`}
              >
                {/* Image showcase */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Top tags */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${badge.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {badge.label}
                    </span>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-black/70 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                      <TrendingUp className="w-3 h-3" />
                      {project.roiExpected || 'Barqaror o\'sish'}
                    </span>
                  </div>

                  {/* Bottom price tag on image */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#CBD5E1]">
                        {t.hero.startingFrom}
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-cinzel text-[#DFBA6B] drop-shadow-md">
                        {project.dealType === 'rent'
                          ? `$${project.price.toLocaleString()} / oy`
                          : `$${project.price.toLocaleString()}`}
                      </div>
                    </div>
                    <div className="text-right text-xs text-white font-medium bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10">
                      {project.location.split(',')[0]}
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className={`text-xl sm:text-2xl font-bold font-cinzel transition-colors ${
                      isDark ? 'text-white group-hover:text-[#DFBA6B]' : 'text-[#0A1628] group-hover:text-[#9A7426]'
                    }`}>
                      {getTitle(project)}
                    </h3>
                    <p className={`text-sm leading-relaxed line-clamp-2 ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#4A5568]'
                    }`}>
                      {getDesc(project)}
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {project.features.slice(0, 4).map((feat, fidx) => (
                        <div key={fidx} className={`flex items-center gap-2 text-xs ${
                          isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A45] flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Details & Action Buttons */}
                  <div className={`pt-5 border-t flex flex-wrap items-center justify-between gap-3 ${
                    isDark ? 'border-[#C49A45]/20' : 'border-[#EAE1D0]'
                  }`}>
                    <div className={`flex items-center gap-3 text-xs ${
                      isDark ? 'text-[#A0AEC0]' : 'text-[#718096]'
                    }`}>
                      <span>{project.areaSqM} m²</span>
                      <span>•</span>
                      <span>{project.bedrooms} xona</span>
                      <span>•</span>
                      <span className="text-[#C49A45] flex items-center gap-1 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Azizi Partner
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => setSelectedPropertyForModal(project)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                          isDark
                            ? 'border-[#C49A45]/50 text-[#DFBA6B] hover:bg-[#C49A45]/15'
                            : 'border-[#C49A45]/70 text-[#8C6D23] hover:bg-[#F9F5EC]'
                        }`}
                      >
                        <span>{t.signature.discoverBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => openLeadModalWithProperty(project)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#DFBA6B] text-[#060D17] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                      >
                        {t.catalog.inquireNow}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

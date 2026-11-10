import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Send,
  Phone,
} from 'lucide-react';

export const PropertyDiscoverModal: React.FC = () => {
  const {
    language,
    theme,
    selectedPropertyForModal,
    setSelectedPropertyForModal,
    openLeadModalWithProperty,
  } = useApp();
  const t = translations[language];
  const isDark = theme === 'dark';

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedPropertyForModal) return null;
  const p = selectedPropertyForModal;

  const getTitle = () => {
    if (language === 'ru') return p.titleRu;
    if (language === 'en') return p.titleEn;
    if (language === 'tg') return p.titleTg;
    return p.title;
  };

  const getDesc = () => {
    return p.description[language] || p.description.uz;
  };

  const handleOpenLead = () => {
    const propToPass = p;
    setSelectedPropertyForModal(null);
    setTimeout(() => {
      openLeadModalWithProperty(propToPass);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden my-8 ${
        isDark ? 'bg-[#091526] border-[#C49A45]/40 text-white' : 'bg-white border-[#C49A45]/50 text-[#0A1628]'
      }`}>
        {/* Close Button */}
        <button
          onClick={() => setSelectedPropertyForModal(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#C49A45] hover:text-[#060D17] transition-all border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Section */}
        <div className="relative h-80 sm:h-96 w-full bg-black">
          <img
            src={p.images[activeImageIndex] || p.images[0]}
            alt={p.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-black/70 text-[#DFBA6B] border border-[#C49A45]/40 backdrop-blur-md">
              {p.categoryName}
            </span>
            {p.aziziPartner && (
              <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#C49A45] text-[#060D17] flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-4 h-4" />
                Azizi Developments Hamkorligi
              </span>
            )}
          </div>

          {/* Thumbnails if multiple images */}
          {p.images.length > 1 && (
            <div className="absolute bottom-4 left-6 flex items-center gap-2 z-10">
              {p.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === i ? 'border-[#C49A45] scale-105 shadow-lg' : 'border-white/30 opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-4 right-6 text-right">
            <div className="text-xs uppercase tracking-wider text-[#CBD5E1]">
              {p.dealType === 'rent' ? 'Oylik Ijara' : 'Xarid Narxi'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-[#DFBA6B] drop-shadow-lg">
              {p.dealType === 'rent'
                ? `$${p.price.toLocaleString()} / oy`
                : `$${p.price.toLocaleString()}`}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className={`text-2xl sm:text-3xl font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
              {getTitle()}
            </h2>
            <div className="flex items-center gap-2 text-sm text-[#A0AEC0]">
              <MapPin className="w-4 h-4 text-[#C49A45]" />
              <span>{p.location}, {p.city}, {p.country}</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border ${
            isDark ? 'bg-[#060E1A] border-[#C49A45]/20' : 'bg-[#FAF8F5] border-[#E8DFC8]'
          }`}>
            <div className="space-y-1">
              <div className="text-[10px] uppercase text-[#A0AEC0] tracking-wider">Maydoni</div>
              <div className={`text-base font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                <Maximize2 className="w-4 h-4 text-[#C49A45]" />
                {p.areaSqM} m²
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase text-[#A0AEC0] tracking-wider">Xonalar</div>
              <div className={`text-base font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                <Bed className="w-4 h-4 text-[#C49A45]" />
                {p.bedrooms} xona / {p.bathrooms} vannaxonasi
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase text-[#A0AEC0] tracking-wider">Topshirish Muddati</div>
              <div className={`text-base font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                <Calendar className="w-4 h-4 text-[#C49A45]" />
                {p.handoverDate || 'Tayyor'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase text-[#A0AEC0] tracking-wider">Kutilayotgan ROI</div>
              <div className="text-base font-bold text-emerald-500 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                {p.roiExpected || '12% - 24%'}
              </div>
            </div>
          </div>

          {/* Payment Plan */}
          {p.paymentPlan && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isDark ? 'bg-[#0C1B30] border-[#C49A45]/30' : 'bg-[#FAF8F5] border-[#E8DFC8]'
            }`}>
              <CreditCard className="w-5 h-5 text-[#C49A45] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs uppercase font-bold text-[#C49A45] tracking-wider">
                  To'lov Grafigi va Shartlari
                </div>
                <div className={`text-sm mt-0.5 ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                  {p.paymentPlan} • 0% Foizsiz bo'lib to'lash • Bank eskrоu hisobi orqali himoyalangan
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C49A45]">
              Obyekt Haqida
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-[#CBD5E1]' : 'text-[#475569]'}`}>
              {getDesc()}
            </p>
          </div>

          {/* Amenities & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C49A45]">
              Afzalliklar va Qulayliklar
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {p.features.map((feat, idx) => (
                <div key={idx} className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs ${
                  isDark ? 'bg-[#07111D] border-white/5 text-[#E2E8F0]' : 'bg-[#FAF8F5] border-[#E8DFC8] text-[#334155]'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-[#C49A45] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-4 ${
            isDark ? 'border-[#C49A45]/20' : 'border-[#EAE1D0]'
          }`}>
            <a
              href="tel:+998508767722"
              className="flex items-center gap-2 text-xs font-semibold text-[#C49A45] hover:underline"
            >
              <Phone className="w-4 h-4" />
              <span>Tezkor qo'ng'iroq: +998 50 876 77 22</span>
            </a>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedPropertyForModal(null)}
                className={`px-5 py-2.5 rounded-xl border text-xs transition-colors ${
                  isDark ? 'border-white/10 text-[#A0AEC0] hover:text-white' : 'border-[#D1C7BA] text-[#64748B] hover:text-[#0A1628]'
                }`}
              >
                {t.leadModal.close}
              </button>

              <button
                onClick={handleOpenLead}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A45] via-[#DFBA6B] to-[#C49A45] text-[#060D17] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#C49A45]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ariza Qoldirish</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

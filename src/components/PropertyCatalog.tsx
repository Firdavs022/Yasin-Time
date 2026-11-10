import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';
import { Property } from '../types';
import {
  Search,
  Building2,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const PropertyCatalog: React.FC = () => {
  const {
    language,
    theme,
    properties,
    categories,
    setSelectedPropertyForModal,
    openLeadModalWithProperty,
  } = useApp();
  const t = translations[language];
  const isDark = theme === 'dark';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDealType, setSelectedDealType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');
  const [bedroomsFilter, setBedroomsFilter] = useState<string>('all');

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      if (selectedCategory !== 'all' && prop.categoryId !== selectedCategory) {
        return false;
      }
      if (selectedDealType !== 'all' && prop.dealType !== selectedDealType) {
        return false;
      }
      if (bedroomsFilter !== 'all') {
        const beds = parseInt(bedroomsFilter, 10);
        if (beds === 4 ? prop.bedrooms < 4 : prop.bedrooms !== beds) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle =
          prop.title.toLowerCase().includes(q) ||
          prop.titleRu.toLowerCase().includes(q) ||
          prop.titleEn.toLowerCase().includes(q) ||
          prop.titleTg.toLowerCase().includes(q);
        const matchesLocation =
          prop.location.toLowerCase().includes(q) ||
          prop.city.toLowerCase().includes(q);
        const matchesFeatures = prop.features.some((f) =>
          f.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesLocation && !matchesFeatures) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (priceSort === 'asc') return a.price - b.price;
      if (priceSort === 'desc') return b.price - a.price;
      return 0;
    });
  }, [properties, selectedCategory, selectedDealType, bedroomsFilter, searchQuery, priceSort]);

  const getTitle = (p: Property) => {
    if (language === 'ru') return p.titleRu;
    if (language === 'en') return p.titleEn;
    if (language === 'tg') return p.titleTg;
    return p.title;
  };

  const getCategoryLabel = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    if (!cat) return catId;
    return cat.name[language] || cat.name.uz;
  };

  return (
    <section id="catalog-section" className={`py-24 transition-colors duration-300 relative ${
      isDark ? 'bg-[#060D17]' : 'bg-[#FFFFFF]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-md text-xs font-bold tracking-[0.16em] uppercase ${
            isDark ? 'bg-[#0F1E33] border border-[#C49A45]/40 text-[#DFBA6B]' : 'bg-[#FAF8F5] border border-[#C49A45]/50 text-[#8C6D23]'
          }`}>
            <Building2 className="w-4 h-4 text-[#C49A45]" />
            {t.catalog.badge}
          </div>
          <h2 className={`text-3xl sm:text-5xl font-bold font-cinzel ${
            isDark ? 'text-white' : 'text-[#0A1628]'
          }`}>
            {t.catalog.title}
          </h2>
          <p className={`text-sm sm:text-base font-light ${
            isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'
          }`}>
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Filter controls bar */}
        <div className={`p-4 sm:p-6 rounded-2xl border shadow-xl mb-12 space-y-4 ${
          isDark
            ? 'bg-[#091526]/95 border-[#C49A45]/30 backdrop-blur-md'
            : 'bg-[#FAF8F5] border-[#E2D8C3]'
        }`}>
          {/* Top row: Search input + Deal Type Selector + Dropdowns */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C49A45]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.catalog.searchPlaceholder}
                className={`w-full h-11 pl-11 pr-4 rounded-xl border text-xs font-medium focus:outline-none focus:border-[#C49A45] transition-colors ${
                  isDark
                    ? 'bg-[#060E1A] border-white/10 text-white placeholder-[#64748B]'
                    : 'bg-white border-[#D1C7BA] text-[#0A1628] placeholder-[#94A3B8]'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Deal Type Segmented Controls (Fixed height, perfectly symmetrical) */}
            <div className={`flex items-center p-1 rounded-xl border h-11 ${
              isDark ? 'bg-[#060E1A] border-white/10' : 'bg-white border-[#D1C7BA]'
            }`}>
              {[
                { id: 'all', label: t.catalog.allDeals },
                { id: 'sale', label: t.catalog.forSale },
                { id: 'rent', label: t.catalog.forRent },
                { id: 'offplan', label: t.catalog.offPlan },
              ].map((dt) => (
                <button
                  key={dt.id}
                  onClick={() => setSelectedDealType(dt.id)}
                  className={`px-3 sm:px-4 h-full text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center justify-center ${
                    selectedDealType === dt.id
                      ? 'bg-[#C49A45] text-[#060D17] font-bold shadow-sm'
                      : isDark
                      ? 'text-[#94A3B8] hover:text-white'
                      : 'text-[#64748B] hover:text-[#0A1628]'
                  }`}
                >
                  {dt.label}
                </button>
              ))}
            </div>

            {/* Price & Bedroom Dropdowns */}
            <div className="flex items-center gap-2">
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as 'default' | 'asc' | 'desc')}
                className={`h-11 px-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#C49A45] cursor-pointer ${
                  isDark ? 'bg-[#060E1A] border-white/10 text-white' : 'bg-white border-[#D1C7BA] text-[#0A1628]'
                }`}
              >
                <option value="default">{t.catalog.priceFilter}</option>
                <option value="asc">↑ Arzonroq</option>
                <option value="desc">↓ Qimmatroq</option>
              </select>

              <select
                value={bedroomsFilter}
                onChange={(e) => setBedroomsFilter(e.target.value)}
                className={`h-11 px-3.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#C49A45] cursor-pointer ${
                  isDark ? 'bg-[#060E1A] border-white/10 text-white' : 'bg-white border-[#D1C7BA] text-[#0A1628]'
                }`}
              >
                <option value="all">{t.catalog.anyRooms}</option>
                <option value="1">1 xona</option>
                <option value="2">2 xona</option>
                <option value="3">3 xona</option>
                <option value="4">4+ xona</option>
              </select>

              {/* Reset button if active filter */}
              {(searchQuery || selectedCategory !== 'all' || selectedDealType !== 'all' || bedroomsFilter !== 'all' || priceSort !== 'default') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDealType('all');
                    setBedroomsFilter('all');
                    setPriceSort('default');
                  }}
                  className="h-11 px-3 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-semibold whitespace-nowrap transition-all"
                  title="Barcha filtrlarni tozalash"
                >
                  Tozalash
                </button>
              )}
            </div>
          </div>

          {/* Bottom row: Category filter pills */}
          <div className={`pt-3 border-t flex items-center gap-2 overflow-x-auto no-scrollbar ${
            isDark ? 'border-white/10' : 'border-[#E2D8C3]'
          }`}>
            <span className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap mr-1 ${
              isDark ? 'text-[#C49A45]' : 'text-[#8C6D23]'
            }`}>
              Toifalar:
            </span>

            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-[#C49A45] text-[#060D17] border-[#C49A45] font-bold shadow-sm'
                  : isDark
                  ? 'bg-[#060E1A] text-[#94A3B8] border-white/5 hover:border-[#C49A45]/40'
                  : 'bg-white text-[#64748B] border-[#D1C7BA] hover:border-[#C49A45]/60'
              }`}
            >
              {t.catalog.allCategories} ({properties.length})
            </button>

            {categories.map((cat) => {
              const count = properties.filter((p) => p.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-[#C49A45] text-[#060D17] border-[#C49A45] font-bold shadow-sm'
                      : isDark
                      ? 'bg-[#060E1A] text-[#94A3B8] border-white/5 hover:border-[#C49A45]/40'
                      : 'bg-white text-[#64748B] border-[#D1C7BA] hover:border-[#C49A45]/60'
                  }`}
                >
                  {cat.name[language] || cat.name.uz} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Property cards grid */}
        {filteredProperties.length === 0 ? (
          <div className={`text-center py-20 rounded-3xl border border-dashed p-8 space-y-4 ${
            isDark ? 'bg-[#091526]/50 border-[#C49A45]/30' : 'bg-[#FAF8F5] border-[#D1C7BA]'
          }`}>
            <Building2 className="w-12 h-12 text-[#C49A45] mx-auto opacity-60" />
            <h3 className={`text-lg font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
              {t.catalog.noPropertiesFound}
            </h3>
            <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Filtr parametrlarini o'zgartirib ko'ring yoki to'g'ridan-to'g'ri maslahatchimiz bilan bog'laning.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className={`group rounded-2xl border transition-all duration-300 shadow-lg overflow-hidden flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#091526] border-[#C49A45]/20 hover:border-[#C49A45]'
                    : 'bg-white border-[#E2D8C3] hover:border-[#C49A45]'
                }`}
              >
                {/* Image & tags */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#DFBA6B] border border-[#C49A45]/40">
                      {getCategoryLabel(property.categoryId)}
                    </span>

                    {property.aziziPartner && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#C49A45] text-[#060D17] flex items-center gap-1 shadow-md">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Azizi Partner
                      </span>
                    )}
                  </div>

                  {/* Bottom Price inside Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#CBD5E1]">
                        {property.dealType === 'rent' ? 'Oylik Ijara' : 'Narxi'}
                      </div>
                      <div className="text-xl sm:text-2xl font-bold font-cinzel text-[#DFBA6B]">
                        {property.dealType === 'rent'
                          ? `$${property.price.toLocaleString()} / oy`
                          : `$${property.price.toLocaleString()}`}
                      </div>
                    </div>

                    {property.roiExpected && (
                      <div className="text-[10px] font-bold text-emerald-300 bg-black/70 px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {property.roiExpected}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className={`text-base font-bold font-cinzel line-clamp-1 transition-colors ${
                      isDark ? 'text-white group-hover:text-[#DFBA6B]' : 'text-[#0A1628] group-hover:text-[#9A7426]'
                    }`}>
                      {getTitle(property)}
                    </h3>
                    <div className={`flex items-center gap-1.5 text-xs ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}>
                      <MapPin className="w-3.5 h-3.5 text-[#C49A45] flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    {/* Specs */}
                    <div className={`grid grid-cols-3 gap-2 pt-3 border-t text-xs ${
                      isDark ? 'border-[#C49A45]/15 text-[#CBD5E1]' : 'border-[#EAE1D0] text-[#475569]'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#C49A45]" />
                        <span>{property.bedrooms} {t.catalog.beds}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-[#C49A45]" />
                        <span>{property.bathrooms} {t.catalog.baths}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#C49A45]" />
                        <span>{property.areaSqM} {t.catalog.sqm}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className={`pt-4 border-t flex items-center gap-2 ${
                    isDark ? 'border-white/5' : 'border-[#EAE1D0]'
                  }`}>
                    <button
                      onClick={() => setSelectedPropertyForModal(property)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                        isDark
                          ? 'border-[#C49A45]/40 hover:border-[#C49A45] bg-[#0A1628] text-white hover:bg-[#0E2038]'
                          : 'border-[#C49A45]/60 hover:border-[#C49A45] bg-[#FAF8F5] text-[#0A1628] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <span>{t.catalog.discoverDetails}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#C49A45]" />
                    </button>

                    <button
                      onClick={() => openLeadModalWithProperty(property)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#DFBA6B] text-[#060D17] text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95"
                    >
                      {t.catalog.inquireNow}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

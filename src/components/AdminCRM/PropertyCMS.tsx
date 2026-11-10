import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { Property, DealType } from '../../types';
import {
  Plus,
  FolderPlus,
  Building,
  Edit,
  Trash2,
  Image as ImageIcon,
  Check,
  X,
  Search,
  Sparkles,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const PropertyCMS: React.FC = () => {
  const {
    language,
    properties,
    categories,
    addProperty,
    updateProperty,
    deleteProperty,
    addCategory,
    deleteCategory,
    setSelectedPropertyForModal,
  } = useApp();
  const t = translations[language];

  const [isAddPropOpen, setIsAddPropOpen] = useState(false);
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [editingPropId, setEditingPropId] = useState<string | null>(null);

  // Category form states
  const [catNameUz, setCatNameUz] = useState('');
  const [catNameRu, setCatNameRu] = useState('');
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameTg, setCatNameTg] = useState('');

  // Property form states
  const [title, setTitle] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'apartments');
  const [dealType, setDealType] = useState<DealType>('sale');
  const [price, setPrice] = useState(350000);
  const [areaSqM, setAreaSqM] = useState(120);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [location, setLocation] = useState('Dubai South, Meydan');
  const [city, setCity] = useState('Dubai');
  const [country, setCountry] = useState('UAE');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80');
  const [handoverDate, setHandoverDate] = useState('Q4 2026');
  const [paymentPlan, setPaymentPlan] = useState('50/50 Bo\'lib to\'lash');
  const [roiExpected, setRoiExpected] = useState('18% ROI');
  const [descriptionUz, setDescriptionUz] = useState('');
  const [featuresStr, setFeaturesStr] = useState('Private Pool, Smart Home, Concierge 24/7, Beach Access');
  const [aziziPartner, setAziziPartner] = useState(true);

  // Search in table
  const [tableSearch, setTableSearch] = useState('');

  const curatedImages = [
    { label: 'Azizi Venice Lagoon', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Luxury Palm Villa', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'High-Rise Penthouse', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Executive Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Waterfront Townhouse', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
  ];

  const handleOpenAddProperty = () => {
    setEditingPropId(null);
    setTitle('');
    setTitleRu('');
    setTitleEn('');
    setPrice(280000);
    setAreaSqM(110);
    setBedrooms(2);
    setBathrooms(2);
    setLocation('Dubai Hills, UAE');
    setDescriptionUz('Dubaydagi eng so\'nggi talablar asosida barpo etilgan yangi premium bino.');
    setIsAddPropOpen(true);
  };

  const handleOpenEditProperty = (p: Property) => {
    setEditingPropId(p.id);
    setTitle(p.title);
    setTitleRu(p.titleRu);
    setTitleEn(p.titleEn);
    setCategoryId(p.categoryId);
    setDealType(p.dealType);
    setPrice(p.price);
    setAreaSqM(p.areaSqM);
    setBedrooms(p.bedrooms);
    setBathrooms(p.bathrooms);
    setLocation(p.location);
    setCity(p.city);
    setCountry(p.country);
    setImageUrl(p.images[0] || '');
    setHandoverDate(p.handoverDate || '');
    setPaymentPlan(p.paymentPlan || '');
    setRoiExpected(p.roiExpected || '');
    setDescriptionUz(p.description.uz);
    setFeaturesStr(p.features.join(', '));
    setAziziPartner(p.aziziPartner);
    setIsAddPropOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedCat = categories.find((c) => c.id === categoryId);
    const catName = selectedCat ? selectedCat.name.en : 'Apartments';
    const feats = featuresStr.split(',').map((f) => f.trim()).filter(Boolean);

    const propPayload = {
      title,
      titleRu: titleRu || title,
      titleEn: titleEn || title,
      titleTg: title,
      categoryId,
      categoryName: catName,
      dealType: dealType as 'sale' | 'rent' | 'offplan',
      price: Number(price),
      currency: '$',
      pricePerMonth: dealType === 'rent' ? Number(price) : undefined,
      areaSqM: Number(areaSqM),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      location,
      city,
      country,
      images: [imageUrl],
      featured: false,
      handoverDate,
      paymentPlan,
      roiExpected,
      description: {
        uz: descriptionUz,
        ru: descriptionUz,
        en: descriptionUz,
        tg: descriptionUz,
      },
      features: feats.length ? feats : ['24/7 Security', 'Smart Home', 'Parking'],
      aziziPartner,
      status: 'available' as const,
    };

    if (editingPropId) {
      updateProperty(editingPropId, propPayload);
    } else {
      addProperty(propPayload);
    }

    setIsAddPropOpen(false);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catNameUz.trim()) return;

    addCategory({
      uz: catNameUz,
      ru: catNameRu || catNameUz,
      en: catNameEn || catNameUz,
      tg: catNameTg || catNameUz,
    });

    setCatNameUz('');
    setCatNameRu('');
    setCatNameEn('');
    setCatNameTg('');
    setIsAddCatOpen(false);
  };

  const filtered = properties.filter((p) => {
    if (!tableSearch.trim()) return true;
    const q = tableSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="p-4 rounded-2xl bg-[#091526] border border-[#C49A45]/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-cinzel text-white">
            Mulklar & Kategoriyalar CMS Boshqaruvi
          </h3>
          <p className="text-xs text-[#94A3B8]">
            Yangi kvartira, villa, hovli yoki tijorat binosi ma'lumotlarini qo'shing va boshqaring
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddCatOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F1E33] border border-[#C49A45]/40 text-[#DFBA6B] hover:bg-[#C49A45] hover:text-[#060D17] text-xs font-bold transition-all shadow-md"
          >
            <FolderPlus className="w-4 h-4" />
            <span>{t.admin.addCategoryBtn}</span>
          </button>

          <button
            onClick={handleOpenAddProperty}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#DFBA6B] text-[#060D17] text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#C49A45]/20 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>{t.admin.addPropertyBtn}</span>
          </button>
        </div>
      </div>

      {/* Active categories bar */}
      <div className="p-4 rounded-xl bg-[#071322] border border-white/10 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-[#A0AEC0] mr-2">
          Mavjud Kategoriyalar:
        </span>
        {categories.map((c) => (
          <div
            key={c.id}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0E1E34] border border-[#C49A45]/30 text-xs text-[#DFBA6B]"
          >
            <span>{c.name[language] || c.name.uz}</span>
            <span className="text-[10px] text-white/50">
              ({properties.filter((p) => p.categoryId === c.id).length})
            </span>
            {categories.length > 2 && (
              <button
                onClick={() => deleteCategory(c.id)}
                className="text-white/40 hover:text-red-400 ml-1"
                title="Kategoriyani o'chirish"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Search in CMS table */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AEC0]" />
        <input
          type="text"
          value={tableSearch}
          onChange={(e) => setTableSearch(e.target.value)}
          placeholder="Obyekt nomi, joylashuvi yoki toifasi bo'yicha qidiruv..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#060E1A] border border-white/10 text-white placeholder-[#64748B] text-xs focus:outline-none focus:border-[#C49A45]"
        />
      </div>

      {/* Properties Table */}
      <div className="rounded-2xl bg-[#091526] border border-[#C49A45]/30 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#CBD5E1]">
            <thead className="bg-[#060E1A] text-[#A0AEC0] uppercase tracking-wider text-[10px] border-b border-[#C49A45]/20">
              <tr>
                <th className="py-3 px-4">Rasm & Nomi</th>
                <th className="py-3 px-4">Kategoriya</th>
                <th className="py-3 px-4">Shartnoma</th>
                <th className="py-3 px-4">Narxi ($)</th>
                <th className="py-3 px-4">Parametrlar</th>
                <th className="py-3 px-4">Joylashuv</th>
                <th className="py-3 px-4">Azizi Hamkor</th>
                <th className="py-3 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((prop) => (
                <tr key={prop.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-12 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate max-w-[200px]">
                          {prop.title}
                        </div>
                        <div className="text-[10px] text-[#DFBA6B]">
                          {prop.roiExpected || prop.handoverDate}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-white">
                    {prop.categoryName}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        prop.dealType === 'offplan'
                          ? 'bg-amber-500/20 text-amber-300'
                          : prop.dealType === 'rent'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {prop.dealType}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold font-cinzel text-[#DFBA6B]">
                    ${prop.price.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-[#A0AEC0]">
                    {prop.areaSqM} m² • {prop.bedrooms} xona
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-[#A0AEC0] max-w-[160px] truncate">
                    {prop.location}
                  </td>

                  <td className="py-3.5 px-4">
                    {prop.aziziPartner ? (
                      <span className="text-emerald-400 font-bold text-[11px]">✓ Ha</span>
                    ) : (
                      <span className="text-white/40 text-[11px]">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedPropertyForModal(prop)}
                        className="p-1.5 rounded-lg bg-white/5 text-[#A0AEC0] hover:text-white"
                        title="Saytda ko'rish"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEditProperty(prop)}
                        className="p-1.5 rounded-lg bg-[#C49A45]/20 text-[#DFBA6B] hover:bg-[#C49A45] hover:text-[#060D17]"
                        title="Tahrirlash"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProperty(prop.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: ADD / EDIT PROPERTY */}
      {isAddPropOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#091526] border border-[#C49A45]/40 rounded-3xl shadow-2xl overflow-hidden my-6">
            <div className="bg-[#0E1E34] px-6 py-4 border-b border-[#C49A45]/20 flex items-center justify-between">
              <h3 className="text-base font-bold font-cinzel text-white">
                {editingPropId ? 'Obyektni Tahrirlash' : 'Yangi Obyekt Qo\'shish (Kvartira, Villa, Bino)'}
              </h3>
              <button
                onClick={() => setIsAddPropOpen(false)}
                className="text-[#A0AEC0] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Obyekt Nomi (Uzbek) *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masalan: Azizi Riviera Tower 12"
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C49A45]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Nomi (Ruscha/English)</label>
                  <input
                    type="text"
                    value={titleRu}
                    onChange={(e) => setTitleRu(e.target.value)}
                    placeholder="Башня Azizi Riviera 12"
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C49A45]"
                  />
                </div>
              </div>

              {/* Category & Deal type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Kategoriya</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C49A45]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name.uz}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Shartnoma Turi</label>
                  <select
                    value={dealType}
                    onChange={(e) => setDealType(e.target.value as DealType)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C49A45]"
                  >
                    <option value="sale">Sotuv (For Sale)</option>
                    <option value="rent">Arenda / Ijara (Rent)</option>
                    <option value="offplan">Off-Plan (Qurilish)</option>
                  </select>
                </div>
              </div>

              {/* Price, Area, Bedrooms, Bathrooms */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Narxi ($)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Maydoni (m²)</label>
                  <input
                    type="number"
                    required
                    value={areaSqM}
                    onChange={(e) => setAreaSqM(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Xonalar</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Hammomlar</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              {/* Location & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">Joylashuv / Manzil</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Dubai South, Meydan"
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white">To'lov Grafigi / ROI</label>
                  <input
                    type="text"
                    value={paymentPlan}
                    onChange={(e) => setPaymentPlan(e.target.value)}
                    placeholder="50/50 yoki 18% ROI"
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              {/* Image URL & Quick Picker */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white flex items-center justify-between">
                  <span>Rasm URL manzili</span>
                  <span className="text-[10px] text-[#DFBA6B]">Tayyor shablonlardan birini tanlang:</span>
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                />

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {curatedImages.map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImageUrl(img.url)}
                      className={`text-[10px] px-2 py-1 rounded bg-[#0A1628] border transition-all whitespace-nowrap ${
                        imageUrl === img.url ? 'border-[#C49A45] text-[#DFBA6B]' : 'border-white/10 text-[#94A3B8]'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white">Tavsif (Uzbek)</label>
                <textarea
                  rows={2}
                  value={descriptionUz}
                  onChange={(e) => setDescriptionUz(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                />
              </div>

              {/* Features */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white">
                  Qulayliklar (vergul bilan ajratilgan)
                </label>
                <input
                  type="text"
                  value={featuresStr}
                  onChange={(e) => setFeaturesStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                />
              </div>

              {/* Azizi partner toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="aziziCheck"
                  checked={aziziPartner}
                  onChange={(e) => setAziziPartner(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C49A45]"
                />
                <label htmlFor="aziziCheck" className="text-xs text-white cursor-pointer font-medium">
                  Azizi Developments Rasmiy Hamkorlik belgisi bilan tasdiqlash
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddPropOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs text-[#A0AEC0]"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#DFBA6B] text-[#060D17] text-xs font-bold uppercase tracking-wider"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD CATEGORY */}
      {isAddCatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#091526] border border-[#C49A45]/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold font-cinzel text-white">
                Yangi Kategoriya Qo'shish
              </h3>
              <button
                onClick={() => setIsAddCatOpen(false)}
                className="text-[#A0AEC0] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-white font-semibold">Nomi (O'zbekcha) *</label>
                <input
                  type="text"
                  required
                  value={catNameUz}
                  onChange={(e) => setCatNameUz(e.target.value)}
                  placeholder="Masalan: Pentxauslar yoki Tijorat"
                  className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white font-semibold">Nomi (Русский)</label>
                <input
                  type="text"
                  value={catNameRu}
                  onChange={(e) => setCatNameRu(e.target.value)}
                  placeholder="Пентхаусы"
                  className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white font-semibold">Nomi (English)</label>
                <input
                  type="text"
                  value={catNameEn}
                  onChange={(e) => setCatNameEn(e.target.value)}
                  placeholder="Penthouses"
                  className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white font-semibold">Nomi (Тоҷикӣ)</label>
                <input
                  type="text"
                  value={catNameTg}
                  onChange={(e) => setCatNameTg(e.target.value)}
                  placeholder="Пентҳаусҳо"
                  className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCatOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs text-[#A0AEC0]"
                >
                  Bekor
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C49A45] text-[#060D17] text-xs font-bold"
                >
                  Kategoriyani Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

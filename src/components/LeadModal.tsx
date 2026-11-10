import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';
import { DealType } from '../types';
import {
  X,
  Send,
  Phone,
  User,
  Mail,
  DollarSign,
  CheckCircle2,
  Clock,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

export const LeadModal: React.FC = () => {
  const {
    language,
    theme,
    isLeadModalOpen,
    setIsLeadModalOpen,
    leadModalPropertyInterest,
    addLead,
    properties,
  } = useApp();
  const t = translations[language];
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [email, setEmail] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [budget, setBudget] = useState('$150,000 - $300,000');
  const [dealType, setDealType] = useState<DealType>('offplan');
  const [preferredTime, setPreferredTime] = useState('15 daqiqada bog\'lanish');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (leadModalPropertyInterest) {
      setSelectedPropertyId(leadModalPropertyInterest.id);
      if (leadModalPropertyInterest.dealType === 'rent') {
        setDealType('rent');
        setBudget('$3,000 - $6,000 / oy');
      } else if (leadModalPropertyInterest.dealType === 'offplan') {
        setDealType('offplan');
        setBudget('$200,000 - $400,000');
      } else {
        setDealType('sale');
        setBudget('$500,000 - $1,000,000');
      }
    } else {
      setSelectedPropertyId('');
    }
    setIsSuccess(false);
  }, [leadModalPropertyInterest, isLeadModalOpen]);

  if (!isLeadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || phone.trim() === '+998') return;

    setIsSubmitting(true);

    const selectedProp = properties.find((p) => p.id === selectedPropertyId);
    const propTitle = selectedProp ? selectedProp.title : 'Umumiy Portfel (Dubay / BAA)';

    setTimeout(() => {
      addLead({
        name,
        phone,
        email: email || undefined,
        propertyInterestId: selectedPropertyId || undefined,
        propertyTitle: propTitle,
        budget,
        dealType,
        preferredTime,
        message: message || 'Mijoz to\'liq taqdimot va to\'lov rejasini so\'radi.',
        source: selectedProp ? `Obyekt: ${selectedProp.title}` : 'Veb-sayt arizasi',
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 300);
  };

  const handleClose = () => {
    setIsLeadModalOpen(false);
    setIsSuccess(false);
    setName('');
    setPhone('+998 ');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className={`relative w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-6 border ${
        isDark ? 'bg-[#091526] border-[#C49A45]/40 text-white' : 'bg-white border-[#C49A45]/50 text-[#0A1628]'
      }`}>
        {/* Header Ribbon */}
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          isDark
            ? 'bg-gradient-to-r from-[#0E1E34] to-[#0A1628] border-[#C49A45]/20'
            : 'bg-[#FAF8F5] border-[#E8DFC8]'
        }`}>
          <div>
            <h3 className={`text-base sm:text-lg font-bold font-cinzel ${
              isDark ? 'text-white' : 'text-[#0A1628]'
            }`}>
              {t.leadModal.title}
            </h3>
            <p className={`text-[11px] ${isDark ? 'text-[#A0AEC0]' : 'text-[#64748B]'}`}>
              {t.leadModal.subtitle}
            </p>
          </div>

          <button
            onClick={handleClose}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'text-[#A0AEC0] hover:text-white hover:bg-white/10' : 'text-[#718096] hover:text-black hover:bg-black/5'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className={`text-xl font-bold font-cinzel ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                  {t.leadModal.successTitle}
                </h4>
                <p className={`text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-[#CBD5E1]' : 'text-[#475569]'}`}>
                  {t.leadModal.successDesc}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#DFBA6B] text-[#060D17] font-bold text-xs uppercase tracking-widest shadow-md hover:scale-[1.01] transition-all"
                >
                  {t.leadModal.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* If pre-selected property */}
              {leadModalPropertyInterest && (
                <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                  isDark ? 'bg-[#0F1E33] border-[#C49A45]/30' : 'bg-[#FAF8F5] border-[#E8DFC8]'
                }`}>
                  <img
                    src={leadModalPropertyInterest.images[0]}
                    alt="Property"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-[#C49A45] uppercase tracking-wider font-bold">
                      Tanlangan Obyekt
                    </div>
                    <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                      {leadModalPropertyInterest.title}
                    </div>
                    <div className="text-[10px] text-[#64748B]">
                      ${leadModalPropertyInterest.price.toLocaleString()} • {leadModalPropertyInterest.location.split(',')[0]}
                    </div>
                  </div>
                </div>
              )}

              {/* Name field */}
              <div className="space-y-1">
                <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'}`}>
                  <User className="w-3.5 h-3.5 text-[#C49A45]" />
                  <span>{t.leadModal.fullName} *</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.leadModal.fullNamePlaceholder}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#C49A45] transition-colors ${
                    isDark ? 'bg-[#060E1A] border-white/10 text-white placeholder-[#64748B]' : 'bg-[#FAF8F5] border-[#D1C7BA] text-[#0A1628] placeholder-[#94A3B8]'
                  }`}
                />
              </div>

              {/* Phone & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'}`}>
                    <Phone className="w-3.5 h-3.5 text-[#C49A45]" />
                    <span>{t.leadModal.phone} *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#C49A45] transition-colors ${
                      isDark ? 'bg-[#060E1A] border-white/10 text-white placeholder-[#64748B]' : 'bg-[#FAF8F5] border-[#D1C7BA] text-[#0A1628] placeholder-[#94A3B8]'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'}`}>
                    <Mail className="w-3.5 h-3.5 text-[#C49A45]" />
                    <span>{t.leadModal.email}</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alisher@mail.uz"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#C49A45] transition-colors ${
                      isDark ? 'bg-[#060E1A] border-white/10 text-white placeholder-[#64748B]' : 'bg-[#FAF8F5] border-[#D1C7BA] text-[#0A1628] placeholder-[#94A3B8]'
                    }`}
                  />
                </div>
              </div>

              {/* Budget & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'}`}>
                    <DollarSign className="w-3.5 h-3.5 text-[#C49A45]" />
                    <span>{t.leadModal.budget}</span>
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#C49A45] ${
                      isDark ? 'bg-[#060E1A] border-white/10 text-white' : 'bg-[#FAF8F5] border-[#D1C7BA] text-[#0A1628]'
                    }`}
                  >
                    <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                    <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                    <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                    <option value="$1,000,000+ (VIP Mulk)">$1,000,000+ (VIP Mulk)</option>
                    <option value="$2,000 - $5,000 / oy (Ijara)">$2,000 - $5,000 / oy (Ijara)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'}`}>
                    <Clock className="w-3.5 h-3.5 text-[#C49A45]" />
                    <span>Aloqa vaqti</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#C49A45] ${
                      isDark ? 'bg-[#060E1A] border-white/10 text-white' : 'bg-[#FAF8F5] border-[#D1C7BA] text-[#0A1628]'
                    }`}
                  >
                    <option value="15 daqiqada bog'lanish">15 daqiqada bog'lanish</option>
                    <option value="Bugun tushdan keyin">Bugun tushdan keyin (14:00 - 18:00)</option>
                    <option value="Kechqurun">Kechqurun (18:00 - 21:00)</option>
                    <option value="Ertaga ertalab">Ertaga ertalab</option>
                    <option value="Telegram orqali yozing">Telegram orqali yozing</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'}`}>
                  <MessageSquare className="w-3.5 h-3.5 text-[#C49A45]" />
                  <span>{t.leadModal.message}</span>
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.leadModal.messagePlaceholder}
                  className={`w-full px-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#C49A45] transition-colors resize-none ${
                    isDark ? 'bg-[#060E1A] border-white/10 text-white placeholder-[#64748B]' : 'bg-[#FAF8F5] border-[#D1C7BA] text-[#0A1628] placeholder-[#94A3B8]'
                  }`}
                />
              </div>

              {/* Privacy note */}
              <div className="flex items-center gap-2 text-[11px] text-[#A0AEC0] pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t.leadModal.privacyNote}</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C49A45] via-[#DFBA6B] to-[#C49A45] text-[#060D17] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C49A45]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.leadModal.submitting : t.leadModal.submit}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

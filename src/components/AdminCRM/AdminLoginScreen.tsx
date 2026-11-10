import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../BrandLogo';
import { Lock, User, KeyRound, Eye, EyeOff, ArrowLeft, ShieldAlert } from 'lucide-react';

export const AdminLoginScreen: React.FC = () => {
  const { adminLogin, setIsAdminOpen } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = adminLogin(username, password);
      if (!success) {
        setError("Login yoki parol xato! Iltimos, qayta urinib ko'ring.");
        setIsLoading(false);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#040A14] flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Background ambient luxury lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C49A45]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#0E2038]/40 rounded-full blur-[90px] pointer-events-none" />

      {/* Top back button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => setIsAdminOpen(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-[#0A1628]/80 hover:bg-[#C49A45] hover:text-[#060D17] text-xs font-semibold text-[#DFBA6B] transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Saytga qaytish</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#091526]/90 border border-[#C49A45]/30 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Header & Logo */}
          <div className="text-center space-y-4">
            <div className="inline-block">
              <BrandLogo isDark={true} size="md" showPartnerBadge={false} />
            </div>

            <div className="space-y-1 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C49A45]/15 border border-[#C49A45]/30 text-[#DFBA6B] text-[10px] font-bold tracking-widest uppercase">
                <Lock className="w-3 h-3 text-[#C49A45]" />
                <span>Boshqaruv Tizimi</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
                Admin Portaliga Kirish
              </h2>
              <p className="text-xs text-[#94A3B8]">
                CRM tizimiga kirish uchun xizmat hisobingiz ma'lumotlarini kiriting
              </p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Login */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C49A45]" />
                <span>Foydalanuvchi Logini</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full h-11 px-4 rounded-xl border border-white/10 bg-[#060E1A] text-white text-xs font-medium focus:outline-none focus:border-[#C49A45] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#C49A45]" />
                <span>Parol</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-4 pr-11 rounded-xl border border-white/10 bg-[#060E1A] text-white text-xs font-medium focus:outline-none focus:border-[#C49A45] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#DFBA6B] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#C49A45] via-[#DFBA6B] to-[#C49A45] text-[#060D17] font-bold text-xs uppercase tracking-[0.16em] shadow-xl shadow-[#C49A45]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <span>Tekshirilmoqda...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Tizimga Kirish</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer note */}
          <div className="text-center pt-2 border-t border-white/10">
            <span className="text-[11px] text-[#64748B]">
              Yasin Time Group CRM & Real Estate Management System
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

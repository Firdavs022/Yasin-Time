import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { UserRole } from '../../types';
import { BrandLogo } from '../BrandLogo';
import {
  ArrowLeft,
  UserCheck,
  Download,
  LogOut,
} from 'lucide-react';

interface AdminHeaderProps {
  activeTab: 'leads' | 'properties' | 'finance' | 'audit';
  setActiveTab: (tab: 'leads' | 'properties' | 'finance' | 'audit') => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, setActiveTab }) => {
  const {
    language,
    role,
    setRole,
    setIsAdminOpen,
    exportLeadsCSV,
    exportFinanceCSV,
    leads,
    adminLogout,
  } = useApp();
  const t = translations[language];

  const newCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="bg-[#071322] border-b border-[#C49A45]/30 sticky top-0 z-30 shadow-xl backdrop-blur-md">
      {/* Top action strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C49A45]/40 bg-[#0A1628] hover:bg-[#C49A45] hover:text-[#060D17] text-xs font-semibold text-[#DFBA6B] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.admin.backToSite}</span>
          </button>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-3">
            <BrandLogo isDark={true} size="sm" showPartnerBadge={false} />
            <span className="text-xs text-[#DFBA6B] font-semibold border-l border-white/20 pl-2.5 hidden sm:inline">
              Boshqaruv Paneli
            </span>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex flex-wrap items-center gap-2.5">

          {/* Role-based Access Control Switcher */}
          <div className="flex items-center gap-1.5 bg-[#091526] px-2.5 py-1 rounded-lg border border-[#C49A45]/30">
            <UserCheck className="w-3.5 h-3.5 text-[#C49A45]" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-transparent text-xs text-[#DFBA6B] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="admin" className="bg-[#091526] text-white">{t.admin.roleAdmin}</option>
              <option value="manager" className="bg-[#091526] text-white">{t.admin.roleManager}</option>
              <option value="accountant" className="bg-[#091526] text-white">{t.admin.roleAccountant}</option>
            </select>
          </div>

          {/* Logout button */}
          <button
            onClick={adminLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500 text-red-300 hover:text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
            title="Admin tizimidan chiqish"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 sm:space-x-4 py-2">
          {/* Tab 1: Leads */}
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'leads'
                ? 'bg-[#C49A45] text-[#060D17] font-bold shadow-md'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{t.admin.tabLeads}</span>
            {newCount > 0 && (
              <span
                className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'leads'
                    ? 'bg-[#060D17] text-[#DFBA6B]'
                    : 'bg-red-500 text-white'
                }`}
              >
                {newCount}
              </span>
            )}
          </button>

          {/* Tab 2: Properties CMS */}
          <button
            onClick={() => setActiveTab('properties')}
            disabled={role === 'accountant'}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              role === 'accountant'
                ? 'opacity-40 cursor-not-allowed text-white/30'
                : activeTab === 'properties'
                ? 'bg-[#C49A45] text-[#060D17] font-bold shadow-md'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{t.admin.tabProperties}</span>
          </button>

          {/* Tab 3: Financial Analytics */}
          <button
            onClick={() => setActiveTab('finance')}
            disabled={role === 'manager'}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              role === 'manager'
                ? 'opacity-40 cursor-not-allowed text-white/30'
                : activeTab === 'finance'
                ? 'bg-[#C49A45] text-[#060D17] font-bold shadow-md'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{t.admin.tabFinance}</span>
          </button>

          {/* Tab 4: Audit Log */}
          <button
            onClick={() => setActiveTab('audit')}
            disabled={role !== 'admin'}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              role !== 'admin'
                ? 'opacity-40 cursor-not-allowed text-white/30'
                : activeTab === 'audit'
                ? 'bg-[#C49A45] text-[#060D17] font-bold shadow-md'
                : 'text-[#A0AEC0] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{t.admin.tabAudit}</span>
          </button>
        </div>

        {/* Quick export buttons on header */}
        <div className="hidden lg:flex items-center gap-2">
          {activeTab === 'leads' && (
            <button
              onClick={exportLeadsCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C49A45]/40 text-xs text-[#DFBA6B] hover:bg-[#C49A45] hover:text-[#060D17] font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.admin.exportExcel}</span>
            </button>
          )}

          {activeTab === 'finance' && (
            <button
              onClick={exportFinanceCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 text-xs text-emerald-400 hover:bg-emerald-600 hover:text-white font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.admin.exportFinance}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

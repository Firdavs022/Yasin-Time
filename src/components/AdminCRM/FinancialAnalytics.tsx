import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { Expense, ExpenseCategory } from '../../types';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Download,
  Plus,
  Trash2,
  Target,
} from 'lucide-react';

export const FinancialAnalytics: React.FC = () => {
  const {
    language,
    expenses,
    addExpense,
    deleteExpense,
    leads,
    exportFinanceCSV,
  } = useApp();
  const t = translations[language];

  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  // New expense form state
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('marketing');
  const [expAmount, setExpAmount] = useState<number>(1000);
  const [expDate, setExpDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [expNotes, setExpNotes] = useState('');
  const [expPaidBy, setExpPaidBy] = useState('Buxgalteriya');

  // Calculations
  const wonLeadsCount = leads.filter((l) => l.status === 'won').length;
  const totalLeadsCount = leads.length;
  const conversionRate = totalLeadsCount > 0 ? ((wonLeadsCount / totalLeadsCount) * 100).toFixed(1) : '0';

  // Total Expenses calculated purely from real expenses list
  const totalRawExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Estimated gross sales based on closed won leads
  const closedVolume = wonLeadsCount * 450000;
  const estimatedCommission = Math.round(closedVolume * 0.05); // 5% developer commission
  const netProfit = estimatedCommission - totalRawExpenses;

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || expAmount <= 0) return;

    addExpense({
      title: expTitle,
      category: expCategory,
      amount: Number(expAmount),
      date: expDate,
      notes: expNotes,
      paidBy: expPaidBy,
    });

    setExpTitle('');
    setExpAmount(1000);
    setExpNotes('');
    setIsAddExpenseOpen(false);
  };

  const categoriesConfig: Record<ExpenseCategory, { label: string; color: string; bg: string }> = {
    marketing: { label: 'Marketing va Target', color: 'text-amber-400', bg: 'bg-amber-400/20' },
    office: { label: 'Ofis Ijarasi', color: 'text-blue-400', bg: 'bg-blue-400/20' },
    payroll: { label: 'Xodimlar va Bonuslar', color: 'text-emerald-400', bg: 'bg-emerald-400/20' },
    legal: { label: 'Yuridik va Notarius', color: 'text-purple-400', bg: 'bg-purple-400/20' },
    transport: { label: 'Transport va Logistika', color: 'text-cyan-400', bg: 'bg-cyan-400/20' },
    other: { label: 'Boshqa Xarajatlar', color: 'text-gray-400', bg: 'bg-gray-400/20' },
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Actions */}
      <div className="p-4 rounded-2xl bg-[#091526] border border-[#C49A45]/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-cinzel text-white">
            {t.admin.financeTitle}
          </h3>
          <p className="text-xs text-[#94A3B8]">
            Daromadlar, operatsion xarajatlar va konversiya analitikasi
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Period selector */}
          <div className="flex items-center bg-[#060E1A] p-1 rounded-xl border border-white/10">
            {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((p) => {
              const label =
                p === 'daily'
                  ? t.admin.filterDaily
                  : p === 'weekly'
                  ? t.admin.filterWeekly
                  : p === 'monthly'
                  ? t.admin.filterMonthly
                  : t.admin.filterYearly;
              return (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    period === p
                      ? 'bg-[#C49A45] text-[#060D17] font-bold shadow-md'
                      : 'text-[#A0AEC0] hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#DFBA6B] text-[#060D17] text-xs font-bold shadow-md hover:scale-[1.02] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.admin.addExpenseBtn}</span>
          </button>

          <button
            onClick={exportFinanceCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F1E33] border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.admin.exportFinance}</span>
          </button>
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales Volume */}
        <div className="p-5 rounded-2xl bg-[#091526] border border-[#C49A45]/30 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#A0AEC0]">
              {t.admin.totalRevenue}
            </span>
            <div className="p-2 rounded-xl bg-[#C49A45]/20 text-[#DFBA6B]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
            ${closedVolume.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Kutilayotgan tushum: ${estimatedCommission.toLocaleString()}</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="p-5 rounded-2xl bg-[#091526] border border-rose-500/30 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400">
              {t.admin.totalExpenses}
            </span>
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-cinzel text-rose-300">
            ${totalRawExpenses.toLocaleString()}
          </div>
          <div className="text-xs text-[#A0AEC0]">
            {expenses.length} ta qayd etilgan xarajat
          </div>
        </div>

        {/* Net Profit */}
        <div className="p-5 rounded-2xl bg-[#091526] border border-emerald-500/30 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
              {t.admin.netProfit}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-cinzel text-emerald-300">
            ${netProfit.toLocaleString()}
          </div>
          <div className="text-xs text-[#A0AEC0]">
            Xarajatlar ayirilgandan keyin
          </div>
        </div>

        {/* Lead Conversion */}
        <div className="p-5 rounded-2xl bg-[#091526] border border-blue-500/30 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
              {t.admin.conversionRate}
            </span>
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-cinzel text-blue-300">
            {conversionRate}%
          </div>
          <div className="text-xs text-[#A0AEC0]">
            {wonLeadsCount} muvaffaqiyatli / {totalLeadsCount} jami
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="rounded-2xl bg-[#091526] border border-[#C49A45]/30 shadow-xl overflow-hidden">
        <div className="p-4 bg-[#071322] border-b border-[#C49A45]/20 flex items-center justify-between">
          <h4 className="text-sm font-bold font-cinzel text-white">
            Qayd Etilgan Xarajatlar ({expenses.length})
          </h4>
          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="text-xs text-[#DFBA6B] hover:underline font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yangi Xarajat Kiritish</span>
          </button>
        </div>

        {expenses.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <p className="text-xs text-[#94A3B8]">
              Hozircha xarajatlar kiritilmagan ($0). Yangi xarajatni qayd etish uchun yuqoridagi tugmadan foydalaning.
            </p>
            <button
              onClick={() => setIsAddExpenseOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#C49A45] text-[#060D17] text-xs font-bold"
            >
              + Xarajat Kiritish
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#CBD5E1]">
              <thead className="bg-[#060E1A] text-[#A0AEC0] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Xarajat Nomi</th>
                  <th className="py-3 px-4">Toifa</th>
                  <th className="py-3 px-4">Miqdor ($)</th>
                  <th className="py-3 px-4">Sana</th>
                  <th className="py-3 px-4">To'lovchi</th>
                  <th className="py-3 px-4">Izoh</th>
                  <th className="py-3 px-4 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {expenses.map((exp) => {
                  const conf = categoriesConfig[exp.category] || categoriesConfig.other;
                  return (
                    <tr key={exp.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">
                        {exp.title}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${conf.color} ${conf.bg}`}>
                          {conf.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-rose-400 font-cinzel">
                        -${exp.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-[#A0AEC0]">
                        {exp.date}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-white">
                        {exp.paidBy || 'Buxgalteriya'}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-[#94A3B8] max-w-[200px] truncate">
                        {exp.notes || '—'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteExpense(exp.id)}
                          className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD EXPENSE MODAL */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#091526] border border-[#C49A45]/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold font-cinzel text-white">
                Yangi Xarajat Kiritish
              </h3>
              <button
                onClick={() => setIsAddExpenseOpen(false)}
                className="text-[#A0AEC0] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-white font-semibold">Xarajat Nomi *</label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="Masalan: Instagram reklama kampaniyasi"
                  className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white font-semibold">Kategoriya</label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value as ExpenseCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  >
                    <option value="marketing">Marketing va Target</option>
                    <option value="office">Ofis Ijarasi</option>
                    <option value="payroll">Xodimlar va Bonuslar</option>
                    <option value="legal">Yuridik va Notarius</option>
                    <option value="transport">Transport va Sayohat</option>
                    <option value="other">Boshqa</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white font-semibold">Summa ($) *</label>
                  <input
                    type="number"
                    required
                    value={expAmount}
                    onChange={(e) => setExpAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white font-semibold">Sana</label>
                  <input
                    type="date"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white font-semibold">To'lovchi Bo'lim</label>
                  <input
                    type="text"
                    value={expPaidBy}
                    onChange={(e) => setExpPaidBy(e.target.value)}
                    placeholder="Buxgalteriya"
                    className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white font-semibold">Izoh</label>
                <textarea
                  rows={2}
                  value={expNotes}
                  onChange={(e) => setExpNotes(e.target.value)}
                  placeholder="Xarajat bo'yicha ma'lumot..."
                  className="w-full px-3 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs text-[#A0AEC0]"
                >
                  Bekor
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C49A45] text-[#060D17] text-xs font-bold"
                >
                  Kiritish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

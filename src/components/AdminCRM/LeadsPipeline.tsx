import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import { Lead, LeadStatus } from '../../types';
import {
  Kanban,
  Table as TableIcon,
  Phone,
  Send,
  User,
  DollarSign,
  Building,
  Edit3,
  Trash2,
  Download,
  Search,
} from 'lucide-react';

export const LeadsPipeline: React.FC = () => {
  const {
    language,
    leads,
    updateLeadStatus,
    assignLeadManager,
    updateLeadNotes,
    deleteLead,
    exportLeadsCSV,
    role,
  } = useApp();
  const t = translations[language];

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const managersList = [
    'Firdavs (Katta maslahatchi)',
    'Yasin (Direktor)',
    'Sardor (Ijara bo\'limi)',
    'Nilufar (VIP maslahatchi)',
  ];

  const statuses: { key: LeadStatus; label: string; color: string; bg: string; border: string }[] = [
    { key: 'new', label: t.admin.statusNew, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { key: 'contacted', label: t.admin.statusContacted, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { key: 'meeting', label: t.admin.statusMeeting, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    { key: 'negotiation', label: t.admin.statusNegotiation, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { key: 'won', label: t.admin.statusWon, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { key: 'lost', label: t.admin.statusLost, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  ];

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name.toLowerCase().includes(q);
      const matchPhone = lead.phone.toLowerCase().includes(q);
      const matchProp = (lead.propertyTitle || '').toLowerCase().includes(q);
      const matchManager = (lead.managerAssigned || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchProp && !matchManager) return false;
    }
    return true;
  });

  const getStatusObj = (status: LeadStatus) => {
    return statuses.find((s) => s.key === status) || statuses[0];
  };

  const handleStartEditNote = (lead: Lead) => {
    setEditingNoteId(lead.id);
    setTempNote(lead.notes || '');
  };

  const handleSaveNote = (id: string) => {
    updateLeadNotes(id, tempNote);
    setEditingNoteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#091526] border border-[#C49A45]/30 shadow-lg">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#A0AEC0]">
            {t.admin.totalLeads}
          </div>
          <div className="text-2xl font-bold font-cinzel text-white mt-1">
            {leads.length}
          </div>
          <div className="text-[10px] text-[#DFBA6B] mt-0.5">
            Barcha kelib tushgan arizalar
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#091526] border border-amber-500/30 shadow-lg">
          <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
            {t.admin.newLeads}
          </div>
          <div className="text-2xl font-bold font-cinzel text-amber-300 mt-1">
            {leads.filter((l) => l.status === 'new').length}
          </div>
          <div className="text-[10px] text-[#A0AEC0] mt-0.5">
            Aloqa kutayotgan mijozlar
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#091526] border border-blue-500/30 shadow-lg">
          <div className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
            {t.admin.inProgress}
          </div>
          <div className="text-2xl font-bold font-cinzel text-blue-300 mt-1">
            {leads.filter((l) => ['contacted', 'meeting', 'negotiation'].includes(l.status)).length}
          </div>
          <div className="text-[10px] text-[#A0AEC0] mt-0.5">
            Muzokara va uchrashuvda
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#091526] border border-emerald-500/30 shadow-lg">
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
            {t.admin.closedDeals}
          </div>
          <div className="text-2xl font-bold font-cinzel text-emerald-300 mt-1">
            {leads.filter((l) => l.status === 'won').length}
          </div>
          <div className="text-[10px] text-[#A0AEC0] mt-0.5">
            Muvaffaqiyatli bitimlar
          </div>
        </div>
      </div>

      {/* Control bar: search, status filter, view switcher & export */}
      <div className="p-4 rounded-2xl bg-[#091526] border border-[#C49A45]/20 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative min-w-[240px] flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AEC0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mijoz ismi, telefon, obyekt yoki menejer bo'yicha qidiruv..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#060E1A] border border-white/10 text-white placeholder-[#64748B] text-xs focus:outline-none focus:border-[#C49A45]"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-xl bg-[#060E1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C49A45]"
          >
            <option value="all">Barcha Statuslar</option>
            {statuses.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label} ({leads.filter((l) => l.status === s.key).length})
              </option>
            ))}
          </select>

          {/* View mode buttons */}
          <div className="flex items-center bg-[#060E1A] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'kanban'
                  ? 'bg-[#C49A45] text-[#060D17]'
                  : 'text-[#A0AEC0] hover:text-white'
              }`}
              title="Kanban Doskasi"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'table'
                  ? 'bg-[#C49A45] text-[#060D17]'
                  : 'text-[#A0AEC0] hover:text-white'
              }`}
              title="Jadval Ko'rinishi"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={exportLeadsCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F1E33] border border-[#C49A45]/40 text-[#DFBA6B] hover:bg-[#C49A45] hover:text-[#060D17] text-xs font-bold transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel / CSV</span>
          </button>
        </div>
      </div>

      {/* When leads are 0 */}
      {leads.length === 0 && (
        <div className="p-8 rounded-2xl bg-[#091526]/50 border border-dashed border-[#C49A45]/30 text-center space-y-2">
          <div className="text-sm font-semibold text-white">
            Hozircha arizalar mavjud emas (0 ta ariza)
          </div>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
            Mijozlar asosiy veb-sayt orqali anketani to'ldirgan zahoti barcha arizalar real vaqt rejimida ushbu CRM tizimida avtomatik paydo bo'ladi.
          </p>
        </div>
      )}

      {/* VIEW 1: KANBAN BOARD */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {statuses.map((statusCol) => {
            const columnLeads = filteredLeads.filter((l) => l.status === statusCol.key);
            return (
              <div
                key={statusCol.key}
                className="rounded-2xl bg-[#071322] border border-white/10 flex flex-col min-h-[480px]"
              >
                {/* Column header */}
                <div
                  className={`p-3 border-b border-white/5 flex items-center justify-between rounded-t-2xl ${statusCol.bg}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusCol.color.replace('text', 'bg')}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${statusCol.color}`}>
                      {statusCol.label}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-black/40 text-xs font-bold text-white">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Column items */}
                <div className="p-2.5 space-y-2.5 flex-1 overflow-y-auto">
                  {columnLeads.length === 0 ? (
                    <div className="h-28 flex items-center justify-center text-xs text-[#64748B] border border-dashed border-white/5 rounded-xl">
                      Arizalar yo'q
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3 rounded-xl bg-[#0B1A2C] border border-[#C49A45]/20 hover:border-[#C49A45] transition-all space-y-2.5 shadow-md"
                      >
                        {/* Header: Name & Time */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-[#C49A45]" />
                              <span>{lead.name}</span>
                            </div>
                            <a
                              href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                              className="text-[11px] text-[#DFBA6B] hover:underline flex items-center gap-1 mt-0.5 font-medium"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{lead.phone}</span>
                            </a>
                          </div>

                          <span className="text-[10px] text-[#64748B] whitespace-nowrap">
                            {lead.createdAt.split(' ')[0]}
                          </span>
                        </div>

                        {/* Property interest & budget */}
                        <div className="p-2 rounded-lg bg-[#07111D] border border-white/5 space-y-1 text-[11px]">
                          <div className="text-[#A0AEC0] truncate flex items-center gap-1">
                            <Building className="w-3 h-3 text-[#C49A45] flex-shrink-0" />
                            <span className="truncate">{lead.propertyTitle || 'Umumiy'}</span>
                          </div>
                          <div className="text-emerald-400 font-semibold flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{lead.budget}</span>
                          </div>
                        </div>

                        {/* Message preview */}
                        {lead.message && (
                          <div className="text-[10px] text-[#CBD5E1] bg-black/30 p-2 rounded-lg italic line-clamp-2">
                            "{lead.message}"
                          </div>
                        )}

                        {/* Manager Assign & Notes */}
                        <div className="space-y-1.5 pt-1 border-t border-white/5">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-[#A0AEC0]">Menejer:</span>
                            <select
                              value={lead.managerAssigned || ''}
                              onChange={(e) => assignLeadManager(lead.id, e.target.value)}
                              className="bg-[#07111D] border border-white/10 rounded px-1.5 py-0.5 text-white text-[10px] focus:outline-none"
                            >
                              <option value="">Biriktirilmagan</option>
                              {managersList.map((m) => (
                                <option key={m} value={m}>
                                  {m}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Notes */}
                          {editingNoteId === lead.id ? (
                            <div className="space-y-1">
                              <textarea
                                value={tempNote}
                                onChange={(e) => setTempNote(e.target.value)}
                                className="w-full p-1.5 rounded bg-[#060E1A] border border-[#C49A45] text-white text-[10px]"
                                rows={2}
                              />
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => setEditingNoteId(null)}
                                  className="px-2 py-0.5 text-[9px] text-[#A0AEC0]"
                                >
                                  Bekor
                                </button>
                                <button
                                  onClick={() => handleSaveNote(lead.id)}
                                  className="px-2 py-0.5 text-[9px] bg-[#C49A45] text-[#060D17] rounded font-bold"
                                >
                                  Saqlash
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => handleStartEditNote(lead)}
                              className="text-[10px] text-[#94A3B8] hover:text-white cursor-pointer flex items-center justify-between p-1 rounded hover:bg-white/5"
                            >
                              <span className="truncate">
                                {lead.notes ? `📝 ${lead.notes}` : '+ Izoh qo\'shish'}
                              </span>
                              <Edit3 className="w-2.5 h-2.5 text-[#C49A45]" />
                            </div>
                          )}
                        </div>

                        {/* Status Change Selector & Actions */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-1">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className="bg-[#07111D] border border-[#C49A45]/40 rounded-lg px-2 py-1 text-[10px] text-[#DFBA6B] font-semibold focus:outline-none flex-1"
                          >
                            {statuses.map((s) => (
                              <option key={s.key} value={s.key}>
                                {s.label}
                              </option>
                            ))}
                          </select>

                          {/* Telegram link */}
                          <a
                            href="https://t.me/YasinTime_Group"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#060D17] transition-colors"
                            title="Telegramda yozish"
                          >
                            <Send className="w-3 h-3" />
                          </a>

                          {/* Phone call */}
                          <a
                            href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                            title="Qo'ng'iroq qilish"
                          >
                            <Phone className="w-3 h-3" />
                          </a>

                          {role === 'admin' && (
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                              title="O'chirish"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW 2: FULL DATA TABLE */
        <div className="rounded-2xl bg-[#091526] border border-[#C49A45]/30 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#CBD5E1]">
              <thead className="bg-[#060E1A] text-[#A0AEC0] uppercase tracking-wider text-[10px] border-b border-[#C49A45]/20">
                <tr>
                  <th className="py-3 px-4">Mijoz Ismi</th>
                  <th className="py-3 px-4">Telefon</th>
                  <th className="py-3 px-4">Qiziqqan Obyekt</th>
                  <th className="py-3 px-4">Byudjet</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Menejer</th>
                  <th className="py-3 px-4">Izoh</th>
                  <th className="py-3 px-4">Sana</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => {
                  const st = getStatusObj(lead.status);
                  return (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#C49A45]/20 text-[#DFBA6B] flex items-center justify-center font-bold">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <div>{lead.name}</div>
                            {lead.email && (
                              <div className="text-[10px] text-[#64748B]">{lead.email}</div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <a
                          href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                          className="text-[#DFBA6B] hover:underline font-medium"
                        >
                          {lead.phone}
                        </a>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-white">
                          {lead.propertyTitle || 'Umumiy Portfel'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-emerald-400 font-semibold">
                        {lead.budget}
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold border ${st.border} ${st.bg} ${st.color} focus:outline-none`}
                        >
                          {statuses.map((s) => (
                            <option key={s.key} value={s.key} className="bg-[#091526] text-white">
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={lead.managerAssigned || ''}
                          onChange={(e) => assignLeadManager(lead.id, e.target.value)}
                          className="bg-[#060E1A] border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                        >
                          <option value="">Biriktirilmagan</option>
                          {managersList.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3 px-4">
                        {editingNoteId === lead.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={tempNote}
                              onChange={(e) => setTempNote(e.target.value)}
                              className="px-2 py-1 rounded bg-[#060E1A] border border-[#C49A45] text-xs text-white"
                            />
                            <button
                              onClick={() => handleSaveNote(lead.id)}
                              className="px-2 py-1 bg-[#C49A45] text-[#060D17] rounded text-xs font-bold"
                            >
                              OK
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() => handleStartEditNote(lead)}
                            className="cursor-pointer hover:text-white flex items-center gap-1 text-[#94A3B8]"
                          >
                            <span>{lead.notes || '— Izoh qo\'shish'}</span>
                            <Edit3 className="w-3 h-3 text-[#C49A45]" />
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-[11px] text-[#A0AEC0]">
                        {lead.createdAt}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href="https://t.me/YasinTime_Group"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#060D17] transition-colors"
                            title="Telegram"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                            className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                            title="Qo'ng'iroq"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          {role === 'admin' && (
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                              title="O'chirish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

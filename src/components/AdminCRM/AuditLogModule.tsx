import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../translations';
import {
  Shield,
  Clock,
  User,
  Activity,
} from 'lucide-react';

export const AuditLogModule: React.FC = () => {
  const { language, auditLogs } = useApp();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#091526] border border-[#C49A45]/30 shadow-xl space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#C49A45]/20 text-[#DFBA6B]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-cinzel text-white">
              {t.admin.auditLogTitle}
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Xodimlar, menejerlar va admin tomonidan amalga oshirilgan barcha harakatlar tarixi
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#091526] border border-white/10 shadow-xl overflow-hidden">
        {auditLogs.length === 0 ? (
          <div className="p-10 text-center space-y-2">
            <p className="text-sm font-semibold text-white">
              Hozircha tizim harakatlari mavjud emas (0 ta qayd)
            </p>
            <p className="text-xs text-[#94A3B8]">
              Yangi arizalar, xarajatlar yoki obyektlar kiritilganda barcha o'zgarishlar shu yerda avtomatik qayd etiladi.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#CBD5E1]">
              <thead className="bg-[#060E1A] text-[#A0AEC0] uppercase tracking-wider text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">{t.admin.time}</th>
                  <th className="py-3.5 px-4">{t.admin.user}</th>
                  <th className="py-3.5 px-4">Rol</th>
                  <th className="py-3.5 px-4">{t.admin.action}</th>
                  <th className="py-3.5 px-4">{t.admin.details}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#A0AEC0] whitespace-nowrap">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C49A45]" />
                        {log.timestamp}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#A0AEC0]" />
                        {log.user}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C49A45]/20 text-[#DFBA6B] border border-[#C49A45]/30">
                        {log.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        {log.action}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-white">
                      {log.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

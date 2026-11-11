import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Language,
  Theme,
  Property,
  Category,
  Lead,
  LeadStatus,
  Expense,
  AuditLog,
  UserRole,
} from '../types';
import {
  initialProperties,
  initialCategories,
  initialLeads,
  initialExpenses,
  initialAuditLogs,
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  categories: Category[];
  addCategory: (name: { uz: string; ru: string; en: string; tg: string }, iconName?: string) => void;
  deleteCategory: (id: string) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  assignLeadManager: (id: string, manager: string) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  auditLogs: AuditLog[];
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  adminLogin: (login: string, pass: string) => boolean;
  adminLogout: () => void;
  selectedPropertyForModal: Property | null;
  setSelectedPropertyForModal: (property: Property | null) => void;
  isLeadModalOpen: boolean;
  setIsLeadModalOpen: (open: boolean) => void;
  leadModalPropertyInterest: Property | null;
  openLeadModalWithProperty: (property: Property | null) => void;
  exportLeadsCSV: () => void;
  exportFinanceCSV: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Multilingual state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('yasintime_lang');
    return (saved as Language) || 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('yasintime_lang', lang);
  };

  // Light / Dark Theme state
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('yasintime_theme');
    return (saved as Theme) || 'dark';
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('yasintime_theme', t);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = "bg-[#060D17] text-[#EDE7DE] selection:bg-[#C49A45] selection:text-[#060D17] antialiased overflow-x-hidden transition-colors duration-300";
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = "bg-[#F7F4EE] text-[#1A202C] selection:bg-[#C49A45] selection:text-[#FFFFFF] antialiased overflow-x-hidden transition-colors duration-300";
    }
  }, [theme]);

  // Route handling for separate Admin URL (/admin or #/admin)
  const checkIsAdminRoute = () => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    return hash.includes('admin') || path.includes('admin') || path === '/admin';
  };

  const [isAdminOpen, setIsAdminOpenState] = useState<boolean>(() => checkIsAdminRoute());

  // Admin authentication (login: admin, password: yasin4545)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('yasintime_admin_auth') === 'true' ||
      localStorage.getItem('yasintime_admin_auth') === 'true'
    );
  });

  const adminLogin = (login: string, pass: string): boolean => {
    if (login.trim() === 'admin' && pass.trim() === 'yasin4545') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('yasintime_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('yasintime_admin_auth');
    localStorage.removeItem('yasintime_admin_auth');
    setIsAdminOpen(false);
  };

  const setIsAdminOpen = (open: boolean) => {
    setIsAdminOpenState(open);
    if (open) {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
    } else {
      if (window.location.pathname === '/admin' || window.location.hash.includes('admin')) {
        window.history.pushState(null, '', '/');
      }
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminOpenState(checkIsAdminRoute());
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Properties state
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('yasintime_properties');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse properties', e);
      }
    }
    return initialProperties;
  });

  useEffect(() => {
    localStorage.setItem('yasintime_properties', JSON.stringify(properties));
  }, [properties]);

  // Categories state
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('yasintime_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse categories', e);
      }
    }
    return initialCategories;
  });

  useEffect(() => {
    localStorage.setItem('yasintime_categories', JSON.stringify(categories));
  }, [categories]);

  // Leads state (Starts at ZERO - strictly real leads from website form submissions only)
  const [leads, setLeads] = useState<Lead[]>(() => {
    const mockNames = ['Alisher Usmonov', 'Farhod Rahimov', 'Jamshid Karimov', 'Shahnoza Alimova'];
    const saved = localStorage.getItem('yasintime_leads_v3') || localStorage.getItem('yasintime_leads_v2');
    if (saved) {
      try {
        const parsed: Lead[] = JSON.parse(saved);
        return parsed.filter((l) => !mockNames.includes(l.name));
      } catch (e) {
        console.error('Failed to parse leads', e);
      }
    }
    return initialLeads;
  });

  useEffect(() => {
    localStorage.setItem('yasintime_leads_v3', JSON.stringify(leads));
  }, [leads]);

  // Expenses state (Starts at ZERO as requested!)
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('yasintime_expenses_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse expenses', e);
      }
    }
    return initialExpenses;
  });

  useEffect(() => {
    localStorage.setItem('yasintime_expenses_v2', JSON.stringify(expenses));
  }, [expenses]);

  // Audit Logs state (Starts at ZERO as requested!)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('yasintime_audit_logs_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse audit logs', e);
      }
    }
    return initialAuditLogs;
  });

  useEffect(() => {
    localStorage.setItem('yasintime_audit_logs_v2', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Initial PostgreSQL database sync on mount
  useEffect(() => {
    fetch('/api/leads')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLeads(data);
        }
      })
      .catch(() => {});

    fetch('/api/expenses')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setExpenses(data);
        }
      })
      .catch(() => {});

    fetch('/api/audit-logs')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAuditLogs(data);
        }
      })
      .catch(() => {});
  }, []);

  // Role state
  const [role, setRole] = useState<UserRole>('admin');

  // Modals state
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState<Property | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalPropertyInterest, setLeadModalPropertyInterest] = useState<Property | null>(null);

  const openLeadModalWithProperty = (property: Property | null) => {
    setLeadModalPropertyInterest(property);
    setIsLeadModalOpen(true);
  };

  const logAction = (action: string, target: string) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: role === 'admin' ? 'Boshqaruvchi' : role === 'manager' ? 'Menejer' : 'Buxgalter',
      role: role.toUpperCase(),
      action,
      target,
      timestamp: timeStr,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Property actions
  const addProperty = (newPropData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProp: Property = {
      ...newPropData,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProperties((prev) => [newProp, ...prev]);
    logAction("Yangi obyekt kiritildi", `${newProp.title} ($${newProp.price.toLocaleString()})`);
  };

  const updateProperty = (id: string, updatedFields: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    logAction("Obyekt ma'lumotlari tahrirlandi", `ID: ${id}`);
  };

  const deleteProperty = (id: string) => {
    const target = properties.find((p) => p.id === id);
    setProperties((prev) => prev.filter((item) => item.id !== id));
    logAction("Obyekt o'chirildi", target ? target.title : `ID: ${id}`);
  };

  // Category actions
  const addCategory = (name: { uz: string; ru: string; en: string; tg: string }, iconName = 'Folder') => {
    const id = `cat-${Date.now()}`;
    const newCategory: Category = {
      id,
      name,
      iconName,
    };
    setCategories((prev) => [...prev, newCategory]);
    logAction("Yangi toifa qo'shildi", name.uz);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    logAction("Toifa o'chirildi", `ID: ${id}`);
  };

  // Lead actions
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'new',
      createdAt: timeStr,
    };
    setLeads((prev) => [newLead, ...prev]);
    logAction("Yangi ariza kelib tushdi", `${newLead.name} (${newLead.phone})`);

    // Real-time synchronization to Cloud SQL PostgreSQL database
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead),
    }).catch((err) => console.warn('Cloud SQL API sync notice:', err));

    // Real-time synchronization to Supabase if configured by user
    if (isSupabaseConfigured && supabase) {
      void (async () => {
        try {
          const { error } = await supabase.from('leads').insert([
            {
              id: newLead.id,
              name: newLead.name,
              phone: newLead.phone,
              email: newLead.email || null,
              property_title: newLead.propertyTitle || null,
              budget: newLead.budget,
              deal_type: newLead.dealType,
              preferred_time: newLead.preferredTime,
              message: newLead.message,
              status: newLead.status,
              source: newLead.source,
              created_at: new Date().toISOString(),
            },
          ]);
          if (error) console.warn('Supabase lead insert notice:', error.message);
        } catch (err) {
          console.warn('Supabase sync notice:', err);
        }
      })();
    }
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
    const target = leads.find((l) => l.id === id);
    logAction("Lid holati o'zgartirildi", `${target?.name || id}: -> ${status.toUpperCase()}`);

    fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  };

  const assignLeadManager = (id: string, manager: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, managerAssigned: manager } : lead))
    );
    const target = leads.find((l) => l.id === id);
    logAction("Menejer biriktirildi", `${target?.name || id}: ${manager}`);

    fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ managerAssigned: manager }),
    }).catch(() => {});
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, notes } : lead))
    );

    fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    }).catch(() => {});
  };

  const deleteLead = (id: string) => {
    const target = leads.find((l) => l.id === id);
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
    logAction("Ariza o'chirildi", target?.name || id);

    fetch(`/api/leads/${id}`, {
      method: 'DELETE',
    }).catch(() => {});
  };

  // Expense actions
  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    logAction("Yangi xarajat kiritildi", `${newExpense.title} ($${newExpense.amount})`);

    fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    }).catch(() => {});
  };

  const deleteExpense = (id: string) => {
    const target = expenses.find((e) => e.id === id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    logAction("Xarajat o'chirildi", target ? target.title : id);

    fetch(`/api/expenses/${id}`, {
      method: 'DELETE',
    }).catch(() => {});
  };

  // Export functions with UTF-8 BOM
  const exportLeadsCSV = () => {
    const headers = ['ID', 'Mijoz Ismi', 'Telefon', 'Email', 'Qiziqqan Obyekt', 'Byudjet', 'Mulk Turi', 'Status', 'Menejer', 'Izoh', 'Sana'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${(l.propertyTitle || '').replace(/"/g, '""')}"`,
      `"${l.budget}"`,
      l.dealType,
      l.status,
      `"${(l.managerAssigned || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      l.createdAt,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Yasin_Time_Mijozlar_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFinanceCSV = () => {
    const headers = ['ID', 'Xarajat Nomi', 'Toifa', 'Miqdor ($)', 'Sana', 'To\'lagan Shaxs', 'Izoh'];
    const rows = expenses.map((e) => [
      e.id,
      `"${e.title.replace(/"/g, '""')}"`,
      e.category,
      e.amount,
      e.date,
      `"${(e.paidBy || '').replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Yasin_Time_Xarajatlar_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        categories,
        addCategory,
        deleteCategory,
        leads,
        addLead,
        updateLeadStatus,
        assignLeadManager,
        updateLeadNotes,
        deleteLead,
        expenses,
        addExpense,
        deleteExpense,
        auditLogs,
        role,
        setRole,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        selectedPropertyForModal,
        setSelectedPropertyForModal,
        isLeadModalOpen,
        setIsLeadModalOpen,
        leadModalPropertyInterest,
        openLeadModalWithProperty,
        exportLeadsCSV,
        exportFinanceCSV,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminHeader } from './AdminHeader';
import { LeadsPipeline } from './LeadsPipeline';
import { PropertyCMS } from './PropertyCMS';
import { FinancialAnalytics } from './FinancialAnalytics';
import { AuditLogModule } from './AuditLogModule';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'properties' | 'finance' | 'audit'>('leads');

  return (
    <div className="min-h-screen bg-[#050C16] text-[#EDE7DE] pb-24">
      {/* Admin Navigation & Controls */}
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'leads' && <LeadsPipeline />}
        {activeTab === 'properties' && <PropertyCMS />}
        {activeTab === 'finance' && <FinancialAnalytics />}
        {activeTab === 'audit' && <AuditLogModule />}
      </main>
    </div>
  );
};

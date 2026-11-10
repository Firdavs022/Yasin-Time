/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { FloatingContactBar } from './components/FloatingContactBar';
import { SignatureProjects } from './components/SignatureProjects';
import { AziziPartnershipSection } from './components/AziziPartnershipSection';
import { PropertyCatalog } from './components/PropertyCatalog';
import { Footer } from './components/Footer';
import { PropertyDiscoverModal } from './components/PropertyDiscoverModal';
import { LeadModal } from './components/LeadModal';
import { AdminDashboard } from './components/AdminCRM/AdminDashboard';
import { AdminLoginScreen } from './components/AdminCRM/AdminLoginScreen';

const MainContent: React.FC = () => {
  const { isAdminOpen, isAdminAuthenticated, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-[#C49A45] selection:text-[#060D17] transition-colors duration-300 ${
      isDark ? 'bg-[#060D17] text-[#EDE7DE]' : 'bg-[#FAF8F5] text-[#0A1628]'
    }`}>
      {isAdminOpen ? (
        isAdminAuthenticated ? (
          <AdminDashboard />
        ) : (
          <AdminLoginScreen />
        )
      ) : (
        <>
          <Header />
          <main>
            <HeroSlider />
            <SignatureProjects />
            <AziziPartnershipSection />
            <PropertyCatalog />
          </main>
          <Footer />
          <FloatingContactBar />
        </>
      )}

      {/* Global Modals */}
      <PropertyDiscoverModal />
      <LeadModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

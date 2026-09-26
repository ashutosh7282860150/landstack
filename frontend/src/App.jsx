import React from 'react';
import { useLandStack } from './context/LandStackContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchLandSection } from './components/SearchLandSection';
import { MapView } from './components/MapView';
import { ParcelDossier } from './components/ParcelDossier';
import { LandDocumentsSection } from './components/LandDocumentsSection';
import { CitizenServices } from './components/CitizenServices';
import { ApplicationTracker } from './components/ApplicationTracker';
import { OfficerDashboard } from './components/OfficerDashboard';
import { AdminAnalytics } from './components/AdminAnalytics';
import { BhuAadhaarCard } from './components/BhuAadhaarCard';
import { QRVerifyModal } from './components/QRVerifyModal';
import { CompareParcelsModal } from './components/CompareParcelsModal';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import { AiChatbot } from './components/AiChatbot';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info, ShieldAlert, Lock, ArrowLeft } from 'lucide-react';

export function App() {
  const { activeTab, setActiveTab, currentUser, isOfficerOrAdmin, toast } = useLandStack();

  // Access Guard for Officer & Admin views and Citizen views
  const renderViewContent = () => {
    // 1. Home View (Citizens see HeroSection; Officers/Admins see Officer Dashboard)
    if (activeTab === 'home') {
      if (currentUser && isOfficerOrAdmin) {
        return <OfficerDashboard />;
      }
      return <HeroSection />;
    }

    // 2. Citizen Services (Restricted to Public Citizens)
    if (['search_land', 'map', 'dossier', 'documents', 'services', 'tracker'].includes(activeTab)) {
      if (!currentUser) {
        return <UnauthorizedGuard reason="Authentication Required: Please sign in to access Citizen Services." />;
      }
      if (isOfficerOrAdmin) {
        return <UnauthorizedGuard reason="Access Restricted: Government Officers and Administrators operate exclusively within Officer Portal and Audit. Citizen sections are reserved for public landowners." />;
      }
      if (activeTab === 'search_land') return <SearchLandSection />;
      if (activeTab === 'map') return <MapView />;
      if (activeTab === 'dossier') return <ParcelDossier />;
      if (activeTab === 'documents') return <LandDocumentsSection />;
      if (activeTab === 'services') return <CitizenServices />;
      if (activeTab === 'tracker') return <ApplicationTracker />;
    }

    // 3. Officer / Admin Portals (Restricted to Officer/Admin Roles)
    if (activeTab === 'officer_workflow') {
      if (!currentUser) {
        return <UnauthorizedGuard reason="Authentication Required: Please sign in with your Official SSO ID to access the Officer Workflow Portal." />;
      }
      if (!isOfficerOrAdmin) {
        return <UnauthorizedGuard reason="Access Restricted: Public Citizens are not permitted to access Government Officer Portals. Please use Citizen Services or switch to an Officer Persona." />;
      }
      return <OfficerDashboard />;
    }

    if (activeTab === 'admin') {
      if (!currentUser) {
        return <UnauthorizedGuard reason="Authentication Required: Please sign in with System Administrator / Governance credentials." />;
      }
      if (!isOfficerOrAdmin) {
        return <UnauthorizedGuard reason="Access Restricted: System Administration & DPI Governance Analytics require Administrator privileges." />;
      }
      return <AdminAnalytics />;
    }

    return <HeroSection />;
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden text-[#1f2937] flex flex-col font-sans">
      
      {/* Universal Moving Aerial Land Background Picture Across All Pages */}
      <div 
        className="absolute inset-0 min-h-full w-full z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/images/land-hero-scenic.jpg')` }}
      >
        {/* Universal Adaptive Translucent Overlay for Superb Readability & Visual Depth */}
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60"></div>
      </div>

      {/* Top Fixed Government Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Dynamic View Content */}
      <main className="relative z-10 flex-1 w-full max-w-full overflow-x-hidden">
        {renderViewContent()}
      </main>

      {/* Official Government Footer */}
      <div className="relative z-20">
        <Footer />
      </div>

      {/* Global Interactive Modals & Floating AI Chatbot */}
      <AuthModal />
      <BhuAadhaarCard />
      <QRVerifyModal />
      <CompareParcelsModal />
      <SettingsModal />
      <AiChatbot />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-[calc(100vw-2rem)] z-[3000] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className={`px-4 py-3 rounded shadow-xl border flex items-center space-x-3 text-xs font-semibold ${
            toast.type === 'error'
              ? 'bg-red-50 border-red-300 text-red-900'
              : toast.type === 'info'
                ? 'bg-blue-50 border-blue-300 text-[#103b66]'
                : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-700 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Access Guard Screen Component
function UnauthorizedGuard({ reason }) {
  const { setActiveTab } = useLandStack();
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 bg-transparent">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md border-2 border-red-200 rounded-2xl shadow-2xl p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-700 flex items-center justify-center mx-auto border border-red-200">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">अनाधिकृत प्रवेश / Access Restricted</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {reason}
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={() => setActiveTab('home')}
            className="gov-btn-primary text-xs py-2 px-4 justify-center"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Citizen Home</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className="gov-btn-secondary text-xs py-2 px-4 justify-center"
          >
            <span>Open GIS Land Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

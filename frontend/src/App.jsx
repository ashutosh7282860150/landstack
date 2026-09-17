import React from 'react';
import { useLandStack } from './context/LandStackContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { MapView } from './components/MapView';
import { ParcelDossier } from './components/ParcelDossier';
import { CitizenServices } from './components/CitizenServices';
import { ApplicationTracker } from './components/ApplicationTracker';
import { OfficerDashboard } from './components/OfficerDashboard';
import { AdminAnalytics } from './components/AdminAnalytics';
import { BhuAadhaarCard } from './components/BhuAadhaarCard';
import { QRVerifyModal } from './components/QRVerifyModal';
import { CompareParcelsModal } from './components/CompareParcelsModal';
import { AuthModal } from './components/AuthModal';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function App() {
  const { activeTab, toast } = useLandStack();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Fixed Navbar */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HeroSection />
            <FeaturesSection />
          </div>
        )}

        {activeTab === 'map' && <MapView />}
        {activeTab === 'dossier' && <ParcelDossier />}
        {activeTab === 'services' && <CitizenServices />}
        {activeTab === 'tracker' && <ApplicationTracker />}
        {activeTab === 'officer_workflow' && <OfficerDashboard />}
        {activeTab === 'admin' && <AdminAnalytics />}
      </main>

      {/* Footer */}
      {activeTab !== 'map' && <Footer />}

      {/* Global Interactive Modals */}
      <AuthModal />
      <BhuAadhaarCard />
      <QRVerifyModal />
      <CompareParcelsModal />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[3000] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center space-x-3 text-xs font-semibold backdrop-blur-md ${
            toast.type === 'error'
              ? 'bg-red-950/90 border-red-500/50 text-red-200'
              : toast.type === 'info'
                ? 'bg-blue-950/90 border-blue-500/50 text-blue-200'
                : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

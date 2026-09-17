import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Building, 
  Landmark, 
  Scale, 
  Zap,
  Globe2,
  TrendingUp,
  Fingerprint,
  Smartphone,
  User,
  Lock
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

export const HeroSection = () => {
  const { 
    setActiveTab, 
    parcels, 
    selectParcel, 
    selectParcelByUlpin,
    stats,
    currentUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    logoutUser,
    showToast
  } = useLandStack();

  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setActiveTab('map');
      return;
    }
    selectParcelByUlpin(searchInput.trim());
  };

  const sampleUlpinPills = [
    { label: 'Pune Agri (Survey 142/2A)', ulpin: 'IN-MH-PUN-2024-009871', badge: 'Agricultural' },
    { label: 'Bengaluru Tech Hub (Survey 88/1)', ulpin: 'IN-KA-BLR-2024-084912', badge: 'Commercial' },
    { label: 'Jaipur Mansarovar Plot 72', ulpin: 'IN-RJ-JAI-2024-031204', badge: 'Residential' },
    { label: 'Varanasi Stay Order Gata 512', ulpin: 'IN-UP-VAR-2024-019482', badge: 'Stayed / Red' },
    { label: 'Sanand Industrial GIDC 210/P', ulpin: 'IN-GJ-AHM-2024-055819', badge: 'Industrial' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 pt-8 pb-16 border-b border-slate-800">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Integrated GIS-based Digital Public Infrastructure (DPI)</span>
            <span className="bg-emerald-500/20 px-1.5 py-0.5 rounded text-[10px] text-emerald-300 font-mono">
              GovTech Prototype
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            One Parcel. One Digital Identity. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
              One Unified Land Platform.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            An Integrated GIS-based Digital Public Infrastructure for Land Governance connecting Revenue Records, Deed Registration, Town Planning Zoning, Municipal NOCs, and Banking Liens.
          </p>
        </div>

        {/* User Authentication & Quick Sign-In Gateway Card on Home Page */}
        <div className="max-w-3xl mx-auto bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-750 shadow-2xl mb-8">
          {currentUser ? (
            /* Logged in Citizen / Admin Banner */
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{currentUser.name}</span>
                    <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[10px]">
                      {currentUser.role === 'revenue_officer' ? 'Revenue Officer' : 'Citizen Landowner'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Phone: <strong className="text-slate-300 font-mono">{currentUser.phone || '+91 98230 91823'}</strong> • Aadhaar: <strong className="text-slate-300 font-mono">{currentUser.aadhaar || 'XXXXXXXX9284'}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => selectParcelByUlpin('IN-MH-PUN-2024-009871')}
                  className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center space-x-1 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>My Land Parcel</span>
                </button>
                <button
                  onClick={logoutUser}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 font-medium transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            /* Quick Login with Phone / Aadhaar */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    Citizen & Official Login / Registration Gateway
                  </h3>
                  <p className="text-slate-400 text-[11px]">
                    Sign in with Mobile Number or Aadhaar Number for instant OTP verification.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setAuthModalMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-[11px] font-semibold transition-all self-start sm:self-auto"
                >
                  + New Citizen Registration
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-white text-xs block group-hover:text-emerald-400 transition-colors">
                      📱 Phone Number Login
                    </span>
                    <span className="text-slate-500 text-[10px]">10-Digit Mobile + OTP</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </button>

                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-white text-xs block group-hover:text-blue-400 transition-colors">
                      🆔 Aadhaar / VID Login
                    </span>
                    <span className="text-slate-500 text-[10px]">12-Digit UIDAI + OTP</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </button>

                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-white text-xs block group-hover:text-amber-400 transition-colors">
                      🏛️ Official / Admin Login
                    </span>
                    <span className="text-slate-500 text-[10px]">Parichay / Employee SSO</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Core Search & Discovery Engine Box */}
        <div className="max-w-3xl mx-auto bg-slate-800/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-700 shadow-2xl mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter 14-digit ULPIN, Survey No, Khasra, Owner Name, or Village..."
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Search Parcel</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className="px-4 py-3 bg-slate-700/70 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-600 flex items-center space-x-2 transition-all"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">GIS Map</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Parcel Links */}
          <div className="mt-3 pt-3 border-t border-slate-700/60 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
              <Fingerprint className="w-3.5 h-3.5 text-emerald-400" /> Quick Samples:
            </span>
            {sampleUlpinPills.map((pill) => (
              <button
                key={pill.ulpin}
                onClick={() => selectParcelByUlpin(pill.ulpin)}
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition-all flex items-center space-x-1.5 text-[11px]"
              >
                <span>{pill.label}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-emerald-400 font-mono">
                  {pill.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Counter Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/60 rounded-xl p-3 text-center">
            <div className="text-slate-400 text-xs font-medium mb-1">Digitized Cadastre</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {stats?.totalParcels || 8} <span className="text-xs font-normal text-emerald-400">Parcels</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Across 6 States</div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/60 rounded-xl p-3 text-center">
            <div className="text-slate-400 text-xs font-medium mb-1">Total Geo-Area</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {stats?.totalAreaHectares || '20.33'} <span className="text-xs font-normal text-teal-400">Ha</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">DGPS High Precision</div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/60 rounded-xl p-3 text-center">
            <div className="text-slate-400 text-xs font-medium mb-1">Integrated Registries</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono text-emerald-400">
              8-in-1 <span className="text-xs font-normal text-slate-400">Stack</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Revenue to e-Courts</div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/60 rounded-xl p-3 text-center">
            <div className="text-slate-400 text-xs font-medium mb-1">Title Health Index</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono text-blue-400">
              {stats?.clearTitlePercentage || 88}% <span className="text-xs font-normal text-slate-400">Clear</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Automated Risk Engine</div>
          </div>
        </div>

        {/* 3 Value Proposition Quick Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-8">
          <div 
            onClick={() => setActiveTab('map')}
            className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/70 cursor-pointer transition-all hover:scale-[1.02] group"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-white text-sm">Interactive GIS Cadastre</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore real-time GeoJSON cadastral boundaries, land-use zoning layers, and spatial measurements across urban and rural zones.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('dossier')}
            className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/70 cursor-pointer transition-all hover:scale-[1.02] group"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Layers className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-white text-sm">8-in-1 Unified Dossier</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              View synchronized 7/12 RoR, registered sale deeds, Master Plan FAR, municipal NOCs, property taxes, and active court disputes.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('services')}
            className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/70 cursor-pointer transition-all hover:scale-[1.02] group"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-white text-sm">Citizen & Officer Workflows</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Apply for online mutation, generate official Bhu-Aadhaar passbooks with QR verification, and review officer approvals.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

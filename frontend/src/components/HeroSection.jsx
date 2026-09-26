import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  FileText, 
  Landmark, 
  Scale, 
  Smartphone, 
  User, 
  CheckCircle2, 
  Clock,
  Shield,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  AlertCircle,
  QrCode,
  Activity,
  Globe,
  Check,
  Compass
} from 'lucide-react';
import { useLandStack, ROLES } from '../context/LandStackContext';

export const HeroSection = () => {
  const { 
    setActiveTab, 
    selectParcelByUlpin,
    stats,
    currentUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    logoutUser,
    setIsBhuAadhaarModalOpen,
    setIsQRVerifyModalOpen,
    t
  } = useLandStack();

  // Citizen Dashboard Search State
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
    { label: 'Pune Agri (Survey 142/2A)', ulpin: 'IN-MH-PUN-2024-009871', state: 'Maharashtra' },
    { label: 'Pune Commercial (Survey 819/12B)', ulpin: 'IN-MH-PUN-2024-015523', state: 'Maharashtra' },
    { label: 'Bengaluru Tech Park (Survey 88/1)', ulpin: 'IN-KA-BLR-2024-084912', state: 'Karnataka' },
    { label: 'Bengaluru Whitefield (Survey 402/5C)', ulpin: 'IN-KA-BLR-2024-099418', state: 'Karnataka' },
    { label: 'Varanasi Stay Order Gata 512', ulpin: 'IN-UP-VAR-2024-019482', state: 'Uttar Pradesh' },
    { label: 'Noida Institutional (KP-III)', ulpin: 'IN-UP-GBN-2024-041890', state: 'Uttar Pradesh' },
    { label: 'Sanand GIDC 210/P', ulpin: 'IN-GJ-AHM-2024-055819', state: 'Gujarat' },
    { label: 'Jaipur Mansarovar Plot 72', ulpin: 'IN-RJ-JAI-2024-031204', state: 'Rajasthan' },
    { label: 'Indore Super Corridor (Khasra 118)', ulpin: 'IN-MP-IND-2024-061298', state: 'Madhya Pradesh' },
    { label: 'Hyderabad ORR Commercial (Sy 155)', ulpin: 'IN-TG-HYD-2024-071190', state: 'Telangana' }
  ];

  /* =========================================================================
     1. UNAUTHENTICATED HOME VIEW: FULL SCENIC LAND BACKGROUND & LOGIN TRIGGER
     ========================================================================= */
  if (!currentUser) {
    return (
      <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden font-sans text-white">
        
        {/* Universal Background Accent Tint */}
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none z-0"></div>

        {/* National Announcement Banner */}
        <div className="relative z-10 bg-amber-500/90 backdrop-blur-md border-b border-amber-400 text-slate-950 px-4 py-2 text-xs font-semibold">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="bg-[#103b66] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0">
                NOTICE / सूचना
              </span>
              <span className="truncate">
                📢 <strong>BHOO BHUMI Portal:</strong> Single Sign-On Gateway active across all States. Click Login to access GIS Cadastre, 8-in-1 Dossiers & e-Mutation.
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 font-mono text-[11px] shrink-0 font-bold text-slate-900">
              <span>NIC-CERTIFIED</span>
              <span>•</span>
              <span>256-BIT ENCRYPTION</span>
            </div>
          </div>
        </div>

        {/* Grand Hero Landing Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center my-auto">
          
          {/* Emblem Pill */}
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 mb-6 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>भारत सरकार | डिजिटल पब्लिक इन्फ्रास्ट्रक्चर • Digital Public Infrastructure</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white drop-shadow-md">
            भू भूमि <span className="text-amber-400 font-extrabold ml-2">BHOO BHUMI</span>
          </h1>

          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 mt-3 drop-shadow">
            राष्ट्रीय एकीकृत भूमि अभिलेख एवं जीआईएस पोर्टल
          </h2>

          <p className="text-sm sm:text-base text-slate-200 mt-4 max-w-2xl mx-auto leading-relaxed drop-shadow">
            National Integrated Geospatial Land Administration Gateway connecting DGPS Cadastre, Record of Rights (RoR 7/12 & Khatauni), Sub-Registrar Deeds, and Citizen e-Services.
          </p>

          {/* Core Action Call to Action Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-sm shadow-2xl flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>नागरिक एवं अधिकारी लॉगिन / Login</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => {
                setAuthModalMode('register');
                setIsAuthModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>+ नया पंजीकरण / Register</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/15 p-3.5 rounded-xl">
              <span className="text-[10px] text-amber-300 font-bold uppercase block">14-Digit ULPIN</span>
              <span className="text-base sm:text-lg font-black text-white font-mono">Bhu-Aadhaar</span>
              <span className="text-[11px] text-slate-300 block mt-0.5">Unique Land Parcel ID</span>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/15 p-3.5 rounded-xl">
              <span className="text-[10px] text-emerald-300 font-bold uppercase block">Cadastral GIS</span>
              <span className="text-base sm:text-lg font-black text-white font-mono">DGPS Drone</span>
              <span className="text-[11px] text-slate-300 block mt-0.5">High-precision Survey</span>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/15 p-3.5 rounded-xl">
              <span className="text-[10px] text-blue-300 font-bold uppercase block">8-in-1 Report</span>
              <span className="text-base sm:text-lg font-black text-white font-mono">Land Dossier</span>
              <span className="text-[11px] text-slate-300 block mt-0.5">Verified Title & RoR</span>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/15 p-3.5 rounded-xl">
              <span className="text-[10px] text-purple-300 font-bold uppercase block">e-Governance</span>
              <span className="text-base sm:text-lg font-black text-white font-mono">Fast Mutation</span>
              <span className="text-[11px] text-slate-300 block mt-0.5">Paperless Khata Update</span>
            </div>
          </div>

        </div>

        {/* Footer Government Motif */}
        <div className="relative z-10 bg-slate-950/80 backdrop-blur-md text-slate-400 py-3 px-4 text-xs text-center border-t border-white/10">
          <p className="text-[11px]">
            © {new Date().getFullYear()} Ministry of Rural Development & Department of Land Resources, Government of India.
          </p>
        </div>

      </div>
    );
  }

  /* =========================================================================
     2. AUTHENTICATED CITIZEN DASHBOARD HOME VIEW (AFTER USER / ADMIN LOGIN)
     ========================================================================= */
  return (
    <div className="bg-transparent text-[#1f2937] min-h-screen">
      
      {/* Official Government Announcement Banner */}
      <div className="bg-amber-50/90 backdrop-blur-md border-b border-amber-200 px-4 py-2 text-xs text-amber-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0">
              NOTICE / सूचना
            </span>
            <span className="truncate font-medium">
              📢 <strong>Citizen Services Active:</strong> Search all-India GIS land maps, view certified 8-in-1 dossiers, pay property tax & track live mutation applications.
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-slate-600 text-[11px]">
            <span>Citizen Portal Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Citizen Welcome Card */}
        <div className="gov-card p-6 bg-white border-l-4 border-l-[#103b66]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-[11px] border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  Authenticated Session
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-mono">Bhoo-Aadhaar Gateway</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#103b66]">
                Welcome, {currentUser.name}
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Citizen Portal — Access Land Records, Certified Dossiers, Digital Bhu-Aadhaar & Online Mutation Requests.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsBhuAadhaarModalOpen(true)}
                className="gov-btn-orange text-xs font-bold"
              >
                <Award className="w-3.5 h-3.5 text-white" />
                <span>My Bhu-Aadhaar Card</span>
              </button>
              <button
                onClick={logoutUser}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-red-700 border border-slate-300 rounded text-xs font-bold transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Core DPI Services / Core Portal Blocks Header */}
        <div className="gov-card p-5 bg-white/95 backdrop-blur-md border-l-4 border-l-[#103b66] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block font-mono">
                डिजिटल भू-सेवाएं एवं पोर्टल ब्लॉक (Core Portal Blocks)
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#103b66] mt-0.5">
                6 Unified Modules Active
              </h2>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <span className="px-3.5 py-1.5 rounded-lg bg-[#103b66] text-white text-xs font-mono font-bold shadow-md">
                28 States DB Active
              </span>
            </div>
          </div>
        </div>

        {/* 6 Core Service Navigation Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* 1. Select & Search Land */}
          <div className="gov-card p-5 bg-white/95 backdrop-blur-md border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-[#103b66] px-2.5 py-1 rounded text-xs font-mono font-bold border border-blue-200">
                  मॉड्यूल १ / Block 1
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  DGPS Drone GIS Live
                </span>
              </div>
              
              <div>
                <h3 className="text-base font-extrabold text-[#103b66] group-hover:text-blue-800 transition-colors">
                  भू-खोज एवं चयन / Select &amp; Search Land
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Instant lookup by 14-Digit ULPIN, Survey/Khasra No, Plot, or Owner Name with cascading State, District &amp; Tehsil filters.
                </p>
              </div>

              {/* Input Box */}
              <form onSubmit={handleSearchSubmit} className="relative pt-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Type ULPIN or Khasra No..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-[#103b66] focus:bg-white"
                />
                <Search className="absolute left-2.5 top-3 w-4 h-4 text-slate-400" />
              </form>

              {/* Quick Search Samples */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Quick Search Samples:</span>
                <div className="flex flex-wrap gap-1 text-[11px]">
                  <button onClick={() => selectParcelByUlpin('IN-MH-PUN-2024-009871')} className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded border border-amber-200 font-mono font-bold">
                    ⚡ Pune (009871)
                  </button>
                  <button onClick={() => selectParcelByUlpin('IN-KA-BLR-2024-084912')} className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded border border-amber-200 font-mono font-bold">
                    ⚡ Bengaluru (084912)
                  </button>
                  <button onClick={() => selectParcelByUlpin('IN-UP-VAR-2024-019482')} className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded border border-amber-200 font-mono font-bold">
                    ⚡ Varanasi (019482)
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('search_land')}
              className="mt-4 w-full py-2.5 bg-[#103b66] hover:bg-[#0a2540] text-white rounded-xl font-bold text-xs shadow flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>भू-खोज प्रारंभ करें / Open Land Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. GIS Land Map */}
          <div className="gov-card p-5 bg-white/95 backdrop-blur-md border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded text-xs font-mono font-bold border border-emerald-200">
                  मॉड्यूल २ / Block 2
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  8 Official Reports
                </span>
              </div>
              
              <div>
                <h3 className="text-base font-extrabold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                  जीआईएस भू-मानचित्र / GIS Map
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  High-precision cadastral map with satellite imagery layers, DGPS drone survey polygon boundaries &amp; area measurement.
                </p>
              </div>

              {/* Active GIS Layers */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Active GIS Layers:</span>
                <div className="flex flex-wrap gap-1 text-[11px]">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200 font-medium">🛰️ High-Res Satellite</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200 font-medium">📐 DGPS Cadastre</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200 font-medium">🏛️ Village Vectors</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 font-mono font-semibold pt-1">
                Quick Zoom: MH, KA, UP, GJ, RJ, MP, TG
              </div>
            </div>

            <button
              onClick={() => setActiveTab('map')}
              className="mt-4 w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>जीआईएस मानचित्र खोलें / Launch GIS Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. 8-in-1 Dossier */}
          <div className="gov-card p-5 bg-white/95 backdrop-blur-md border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded text-xs font-mono font-bold border border-amber-200">
                  मॉड्यूल ३ / Block 3
                </span>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  NIC Certified PDF
                </span>
              </div>
              
              <div>
                <h3 className="text-base font-extrabold text-amber-900 group-hover:text-amber-700 transition-colors">
                  8-इन-1 डोजियर / 8-in-1 Dossier
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Unified single-page report merging RoR 7/12, SRO Sale Deeds, Bank Liens, Ready-Reckoner Valuation &amp; Litigation check.
                </p>
              </div>

              {/* Included Reports List */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Included Reports:</span>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-700 font-medium">
                  <span>• 1. RoR 7/12 Extract</span>
                  <span>• 2. SRO Sale Deed</span>
                  <span>• 3. Bank Lien Status</span>
                  <span>• 4. Reckoner Valuation</span>
                  <span>• 5. e-Mutation History</span>
                  <span>• 6. Court Stay Check</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('dossier')}
              className="mt-4 w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>8-इन-1 डोजियर देखें / View Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4. Land Related All Documents */}
          <div className="gov-card p-5 bg-white/95 backdrop-blur-md border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-indigo-100 text-indigo-900 px-2.5 py-1 rounded text-xs font-mono font-bold border border-indigo-200">
                  मॉड्यूल ४ / Block 4
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Paperless Portal
                </span>
              </div>
              
              <div>
                <h3 className="text-base font-extrabold text-indigo-900 group-hover:text-indigo-700 transition-colors">
                  भू-दस्तावेज / All Documents
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Access certified copies of registered sale deeds, encumbrance certificates (EC), mutation extracts &amp; revenue orders.
                </p>
              </div>

              {/* Document Types Available */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Document Types Available:</span>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-900 rounded border border-indigo-200 font-semibold">📄 Sale Deeds (Index II)</span>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-900 rounded border border-indigo-200 font-semibold">📋 Mutation Extracts</span>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-900 rounded border border-indigo-200 font-semibold">📜 Encumbrance (EC)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('documents')}
              className="mt-4 w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl font-bold text-xs shadow flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>भू-दस्तावेज़ प्राप्त करें / Open All Documents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5. Citizen e-Services */}
          <div className="gov-card p-5 bg-white/95 backdrop-blur-md border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-teal-100 text-teal-900 px-2.5 py-1 rounded text-xs font-mono font-bold border border-teal-200">
                  मॉड्यूल ५ / Block 5
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Live Workflow Status
                </span>
              </div>
              
              <div>
                <h3 className="text-base font-extrabold text-teal-900 group-hover:text-teal-700 transition-colors">
                  नागरिक सेवाएं / Citizen e-Services
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Apply online for e-Mutation &amp; Khata Transfer, NA conversion clearance, property tax payment &amp; demarcation NOCs.
                </p>
              </div>

              {/* Available Online Forms */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Available Online Forms:</span>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-1 bg-teal-50 text-teal-900 rounded border border-teal-200 font-semibold">✍️ e-Mutation Wizard</span>
                  <span className="px-2 py-1 bg-teal-50 text-teal-900 rounded border border-teal-200 font-semibold">🏢 NA Land Clearance</span>
                  <span className="px-2 py-1 bg-teal-50 text-teal-900 rounded border border-teal-200 font-semibold">💳 Online Property Tax</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="mt-4 w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs shadow flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>नागरिक सेवाएं प्राप्त करें / Access e-Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6. Application Tracker */}
          <div className="gov-card p-5 bg-white/95 backdrop-blur-md border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-purple-100 text-purple-900 px-2.5 py-1 rounded text-xs font-mono font-bold border border-purple-200">
                  मॉड्यूल ६ / Block 6
                </span>
              </div>
              
              <div>
                <h3 className="text-base font-extrabold text-purple-900 group-hover:text-purple-700 transition-colors">
                  आवेदन स्थिति / Tracker
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Track real-time progress of revenue mutation files across Patwari inspection, SRO verification &amp; Tehsildar approval.
                </p>
              </div>

              {/* Ack Search Input */}
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Enter Application Ack No (e.g. MUT-2026-90812)..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-purple-600 focus:bg-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setActiveTab('tracker');
                    }
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => setActiveTab('tracker')}
              className="mt-4 w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs shadow flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>आवेदन स्थिति ट्रैक करें / Track Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Layers, 
  Shield, 
  User, 
  FileText, 
  Building2, 
  ShieldCheck, 
  QrCode, 
  Scale, 
  CheckCircle2, 
  ChevronDown,
  Sparkles,
  ExternalLink,
  Activity,
  Award
} from 'lucide-react';
import { useLandStack, ROLES } from '../context/LandStackContext';

export const Navbar = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    activeTab, 
    setActiveTab, 
    setIsQRVerifyModalOpen,
    setIsCompareModalOpen,
    compareList,
    currentUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    logoutUser,
    showToast
  } = useLandStack();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'map', label: 'GIS Land Map', icon: MapPin },
    { id: 'dossier', label: '8-in-1 Dossier', icon: Layers },
    { id: 'services', label: 'Citizen Services', icon: FileText },
    { id: 'tracker', label: 'Track Application', icon: Activity },
    { id: 'officer_workflow', label: 'Officer Portal', icon: ShieldCheck, highlight: true },
    { id: 'admin', label: 'Admin & Audit', icon: Shield }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Gov Tech Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-1 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 font-semibold text-emerald-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>NATIONAL LAND GOVERNANCE PORTAL</span>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-300">Digital Public Infrastructure for Land Governance (DPI-LG)</span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Demo Data Tag */}
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Demo Data Only (Prototype)
          </span>

          {/* Quick Tools */}
          <button 
            onClick={() => setIsQRVerifyModalOpen(true)}
            className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors"
            title="Scan & Verify ULPIN Record QR"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Verify QR</span>
          </button>

          <button 
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors relative"
            title="Compare Parcels"
          >
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Compare</span>
            {compareList.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-500 text-[10px] text-white flex items-center justify-center font-bold">
                {compareList.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg group-hover:shadow-emerald-500/25 transition-all">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-wider text-white font-sans">
                  LAND<span className="text-emerald-400">STACK</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  DPI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-tight">
                One Parcel • One ULPIN • Unified Land Services
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm' 
                      : item.highlight
                        ? 'text-amber-300 hover:bg-amber-500/10 border border-amber-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Login & Role Switcher */}
          <div className="flex items-center space-x-2">
            
            {/* Citizen Auth Button / Profile Pill */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-slate-800/90 border border-emerald-500/40 px-2.5 py-1.5 rounded-lg text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[11px]">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-[10px] text-slate-400 block leading-tight">Signed in as</span>
                  <span className="font-bold text-white text-xs truncate max-w-[120px] block">{currentUser.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={logoutUser}
                  className="text-[10px] text-slate-400 hover:text-red-400 font-medium px-1.5 py-0.5 rounded hover:bg-slate-700 transition-colors"
                  title="Sign Out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Register</span>
              </button>
            )}

            {/* Role Persona Switcher (Live Demo Feature) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 shadow-md transition-all group"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Role</span>
                  <span className="font-semibold text-emerald-300 flex items-center gap-1">
                    {currentRole.name.split('(')[0]}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

            {/* Dropdown Menu */}
            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 p-2 text-xs">
                <div className="px-2 py-1.5 border-b border-slate-800 mb-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Stakeholder Persona (Live Demo)
                  </span>
                </div>
                <div className="space-y-1">
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setCurrentRole(role);
                        setRoleDropdownOpen(false);
                        showToast(`Switched to persona: ${role.name}`, 'info');
                        if (role.id === 'revenue_officer' || role.id === 'sub_registrar' || role.id === 'municipal_officer') {
                          setActiveTab('officer_workflow');
                        } else if (role.id === 'admin') {
                          setActiveTab('admin');
                        }
                      }}
                      className={`w-full text-left p-2 rounded-lg flex items-start space-x-2.5 transition-colors ${
                        currentRole.id === role.id 
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-white' 
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="mt-0.5 p-1 rounded bg-slate-800 border border-slate-700 text-emerald-400">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${currentRole.id === role.id ? 'text-emerald-400 opacity-100' : 'opacity-20'}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          {role.name}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {role.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/80 px-2 py-1.5 flex items-center justify-around overflow-x-auto text-[11px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded font-medium whitespace-nowrap ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

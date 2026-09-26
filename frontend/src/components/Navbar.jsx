import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Layers, 
  Shield, 
  User, 
  FileText, 
  ShieldCheck, 
  QrCode, 
  Scale, 
  CheckCircle2, 
  ChevronDown,
  Settings,
  Globe,
  Home,
  Activity,
  Award,
  Lock,
  LogOut,
  FolderOpen,
  Compass
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
    setIsSettingsModalOpen,
    compareList,
    currentUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    logoutUser,
    showToast,
    language,
    setLanguage,
    t
  } = useLandStack();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // All Headings / Navigation Items requested by User
  const allNavItems = [
    { id: 'home', label: 'मुख्य पृष्ठ / Home', icon: Home, roles: ['citizen'] },
    { id: 'search_land', label: 'भू-खोज एवं चयन / Select & Search Land', icon: Search, roles: ['citizen'] },
    { id: 'map', label: 'जीआईएस भू-मानचित्र / GIS Map', icon: MapPin, roles: ['citizen'] },
    { id: 'dossier', label: '8-इन-1 डोजियर / Dossier', icon: Layers, roles: ['citizen'] },
    { id: 'documents', label: 'भू-दस्तावेज / Land Related All Documents', icon: FolderOpen, roles: ['citizen'] },
    { id: 'services', label: 'नागरिक सेवाएं / e-Services', icon: FileText, roles: ['citizen'] },
    { id: 'tracker', label: 'आवेदन स्थिति / Tracker', icon: Activity, roles: ['citizen'] },
    { id: 'officer_workflow', label: 'अधिकारी पोर्टल / Officer Portal', icon: ShieldCheck, roles: ['revenue_officer', 'sub_registrar', 'municipal_officer', 'admin'] },
    { id: 'admin', label: 'ऑडिट एवं प्रशासन / Audit', icon: Shield, roles: ['admin', 'revenue_officer', 'sub_registrar', 'municipal_officer'] }
  ];

  // Services are only visible AFTER user / admin login
  const visibleNavItems = currentUser ? allNavItems.filter((item) => {
    const userRole = currentUser.role || 'citizen';
    return item.roles.includes(userRole);
  }) : [];

  const isOfficer = currentUser && currentUser.role !== 'citizen';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-300 shadow-sm">
      
      {/* 1. Top Government Official Bar (Tri-Color Stripe + Govt Banner) */}
      <div className="bg-[#0a2540] text-white px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b-2 border-amber-600">
        <div className="flex items-center space-x-2">
          {/* Emblem representation / India flag motif */}
          <div className="flex items-center space-x-1.5 font-semibold text-slate-100">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            <span>भारत सरकार | राजस्व एवं भूमि संसाधन विभाग</span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">Government of India • Land Records & GIS Portal</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-slate-200">
          {/* Language Switcher */}
          <div className="flex items-center space-x-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#103b66] text-white border border-slate-600 text-xs rounded px-1.5 py-0.5 focus:outline-none focus:border-amber-400"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>

          {/* Quick Tools */}
          <button 
            onClick={() => setIsQRVerifyModalOpen(true)}
            className="flex items-center space-x-1 hover:text-amber-300 transition-colors"
            title="Scan & Verify ULPIN Record QR"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Verify QR</span>
          </button>

          {currentUser && (
            <button 
              onClick={() => setIsCompareModalOpen(true)}
              className="flex items-center space-x-1 hover:text-amber-300 transition-colors relative"
              title="Compare Parcels"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Compare</span>
              {compareList.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-600 text-[10px] text-white flex items-center justify-center font-bold">
                  {compareList.length}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-1 hover:text-amber-300 transition-colors"
            title="Accessibility & Settings"
          >
            <Settings className="w-3.5 h-3.5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* 2. Main Portal Branding Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Portal Name & National Identity */}
        <div 
          onClick={() => setActiveTab(isOfficer ? 'officer_workflow' : 'home')}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          {/* Government Badge Icon */}
          <div className="w-11 h-11 rounded bg-[#103b66] border border-[#0a2540] flex items-center justify-center text-white shadow-sm shrink-0">
            <div className="text-center leading-tight">
              <span className="text-lg font-black tracking-widest block text-amber-400">भू</span>
              <span className="text-[8px] font-bold text-slate-200 block -mt-1">BHU</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-extrabold text-2xl tracking-tight text-[#103b66] font-sans">
                भू भूमि <span className="text-amber-700 text-xl font-bold ml-1">BHOO BHUMI</span>
              </span>
              <span className="hidden sm:inline text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-[#103b66] border border-blue-200">
                राष्ट्रीय पोर्टल (Govt DPI)
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              राष्ट्रीय एकीकृत भूमि अभिलेख एवं जीआईएस पोर्टल • Integrated GIS Land Records System
            </p>
          </div>
        </div>

        {/* User SSO & Role Switcher */}
        <div className="flex items-center space-x-3">
          
          {/* User Sign In State */}
          {currentUser ? (
            <div className="flex items-center space-x-2 bg-slate-100 border border-slate-300 px-3 py-1.5 rounded text-xs">
              <div className={`w-7 h-7 rounded-full text-white font-bold flex items-center justify-center text-xs ${
                isOfficer ? 'bg-amber-600' : 'bg-[#103b66]'
              }`}>
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-[10px] text-slate-500 block leading-tight font-semibold">
                  {isOfficer ? 'Officer SSO Session' : 'Citizen Landowner'}
                </span>
                <span className="font-bold text-slate-800 text-xs truncate max-w-[130px] block">
                  {currentUser.name.split(' ')[0]}
                </span>
              </div>
              <button
                onClick={logoutUser}
                className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-bold ml-2 py-1 px-1.5 rounded hover:bg-red-50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="gov-btn-primary text-xs flex items-center space-x-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>नागरिक एवं अधिकारी लॉगिन / Login</span>
            </button>
          )}

          {/* Officer Persona Switcher (Only visible to authenticated Officers) */}
          {isOfficer && (
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded text-xs font-semibold text-amber-900 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-amber-700 uppercase font-mono leading-none">Officer Role</span>
                  <span className="font-bold text-amber-900 text-xs">
                    {currentRole.name.split('(')[0]}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-amber-700 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Role Switcher Menu */}
              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-300 rounded shadow-xl z-50 p-2 text-xs">
                  <div className="px-2 py-1.5 border-b border-slate-200 mb-1 bg-slate-50">
                    <span className="text-[11px] font-bold text-slate-700 uppercase">
                      Select Officer Authority Persona
                    </span>
                  </div>
                  <div className="space-y-1">
                    {ROLES.filter(r => r.id !== 'citizen').map((role) => (
                      <button
                        key={role.id}
                        onClick={() => {
                          setCurrentRole(role);
                          setRoleDropdownOpen(false);
                          showToast(`Switched officer persona to: ${role.name}`, 'info');
                          if (role.id === 'revenue_officer' || role.id === 'sub_registrar' || role.id === 'municipal_officer') {
                            setActiveTab('officer_workflow');
                          } else if (role.id === 'admin') {
                            setActiveTab('admin');
                          }
                        }}
                        className={`w-full text-left p-2 rounded flex items-start space-x-2 transition-colors ${
                          currentRole.id === role.id 
                            ? 'bg-blue-50 border border-blue-300 text-[#103b66]' 
                            : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${currentRole.id === role.id ? 'text-[#103b66]' : 'text-slate-300'}`} />
                        <div>
                          <div className="font-bold text-slate-900">{role.name}</div>
                          <p className="text-[11px] text-slate-600 mt-0.5">{role.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* 3. Deep Blue Main Navigation Bar (Rendered with all requested headings after user / admin login) */}
      {currentUser && visibleNavItems.length > 0 && (
        <>
          <div className="bg-[#103b66] border-t border-b border-[#0a2540] animate-in fade-in duration-200">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
              <nav className="hidden lg:flex items-center space-x-0.5 overflow-x-auto scrollbar-none">
                {visibleNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center space-x-1.5 px-3 py-2.5 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
                        isActive 
                          ? 'bg-[#0a2540] text-amber-400 border-amber-400' 
                          : 'text-white hover:bg-[#1e56a0] border-transparent'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-300'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Mobile Nav Menu */}
          <div className="lg:hidden bg-[#103b66] px-2 py-1 flex items-center justify-start overflow-x-auto scrollbar-none gap-1 border-t border-[#0a2540] animate-in fade-in duration-200">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 py-1.5 px-2.5 rounded text-xs font-semibold whitespace-nowrap shrink-0 ${
                    isActive ? 'bg-[#0a2540] text-amber-400' : 'text-white hover:bg-[#1e56a0]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label.split('/')[0]}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </header>
  );
};

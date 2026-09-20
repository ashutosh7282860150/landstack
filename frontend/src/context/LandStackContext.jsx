import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { TRANSLATIONS } from '../utils/translations';

const LandStackContext = createContext(null);

export const ROLES = [
  { id: 'citizen', name: 'Citizen / Landowner', badge: 'Public Citizen', icon: 'User', desc: 'Search records, apply for mutation & NOCs, pay property taxes' },
  { id: 'revenue_officer', name: 'Revenue Officer (Patwari / Tehsildar)', badge: 'Revenue Dept', icon: 'ShieldCheck', desc: 'Inspect DGPS cadastre, verify field survey, sanction RoR mutations' },
  { id: 'sub_registrar', name: 'Registration Officer (Sub-Registrar)', badge: 'Stamps & Registration', icon: 'FileText', desc: 'ULPIN validation, encumbrance / stay check before deed execution' },
  { id: 'municipal_officer', name: 'Municipality Officer (Town Planner)', badge: 'Urban Local Body', icon: 'Building2', desc: 'Check Master Plan FAR, setback buffers & issue building NOCs' },
  { id: 'admin', name: 'Admin / Governance Lead', badge: 'System Administrator', icon: 'Layers', desc: 'DPI analytics, GIS heatmaps, tamper-evident audit trails' }
];

export const LandStackProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(ROLES[0]);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'map' | 'dossier' | 'services' | 'tracker' | 'officer_workflow' | 'admin' | 'compare'
  const [dossierSubTab, setDossierSubTab] = useState('overview');
  
  // Theme & Language State
  const [theme, setTheme] = useState(() => localStorage.getItem('landstack_theme') || 'dark'); // 'dark' | 'light' | 'night'
  const [language, setLanguage] = useState(() => localStorage.getItem('landstack_lang') || 'en'); // 'en' | 'hi' | 'mr' | 'gu' | 'ta'

  // Apply theme to HTML root element
  useEffect(() => {
    localStorage.setItem('landstack_theme', theme);
    document.documentElement.classList.remove('theme-dark', 'theme-light', 'theme-night');
    document.documentElement.classList.add(`theme-${theme}`);
    if (theme === 'light') {
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    } else if (theme === 'night') {
      document.body.style.backgroundColor = '#030712';
      document.body.style.color = '#f9fafb';
    } else {
      document.body.style.backgroundColor = '#020617';
      document.body.style.color = '#f8fafc';
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('landstack_lang', language);
  }, [language]);

  // Translation Helper
  const t = (pathStr) => {
    const keys = pathStr.split('.');
    let res = TRANSLATIONS[language] || TRANSLATIONS['en'];
    for (const k of keys) {
      if (res && res[k]) {
        res = res[k];
      } else {
        // Fallback to English
        let fallback = TRANSLATIONS['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk]) fallback = fallback[fk];
          else return pathStr;
        }
        return typeof fallback === 'string' ? fallback : pathStr;
      }
    }
    return typeof res === 'string' ? res : pathStr;
  };

  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    landUse: '',
    status: ''
  });

  const [applications, setApplications] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [compareList, setCompareList] = useState([]);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('landstack_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  // Modals & Chatbot State
  const [isBhuAadhaarModalOpen, setIsBhuAadhaarModalOpen] = useState(false);
  const [isQRVerifyModalOpen, setIsQRVerifyModalOpen] = useState(false);
  const [isMutationModalOpen, setIsMutationModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const loginUser = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('landstack_user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
    showToast(`Welcome, ${userData.name}! Successfully authenticated.`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('landstack_user');
    showToast('You have been logged out.', 'info');
  };

  // Load Data
  const refreshData = async () => {
    setLoading(true);
    try {
      const [parcelsData, appsData, statsData, logsData] = await Promise.all([
        api.getParcels(filters),
        api.getApplications(),
        api.getStats(),
        api.getAuditLogs()
      ]);
      setParcels(parcelsData);
      setApplications(appsData);
      setStats(statsData);
      setAuditLogs(logsData);
      
      // Keep selected parcel in sync if one is active
      if (selectedParcel) {
        const updated = parcelsData.find(p => p.ulpin === selectedParcel.ulpin);
        if (updated) setSelectedParcel(updated);
      }
    } catch (err) {
      console.error('Error loading Land Stack data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const selectParcel = (parcel, targetDossierTab = 'overview') => {
    setSelectedParcel(parcel);
    setDossierSubTab(targetDossierTab);
    setActiveTab('dossier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectParcelByUlpin = async (ulpin, targetDossierTab = 'overview') => {
    const found = parcels.find(p => p.ulpin.toLowerCase() === ulpin.toLowerCase() || p.bhuAadhaar.toLowerCase() === ulpin.toLowerCase());
    if (found) {
      selectParcel(found, targetDossierTab);
      return true;
    }
    const fromApi = await api.getParcelByUlpin(ulpin);
    if (fromApi) {
      selectParcel(fromApi, targetDossierTab);
      return true;
    }
    showToast('No parcel found for ULPIN: ' + ulpin, 'error');
    return false;
  };

  const handlePayTax = async (ulpin, amount) => {
    try {
      const res = await api.payTax({ ulpin, amountPaid: amount });
      if (res.success) {
        showToast(`Tax payment of ₹${amount} successful! Receipt: ${res.receiptNo}`, 'success');
        await refreshData();
      }
    } catch {
      showToast('Tax payment failed', 'error');
    }
  };

  const handleApplyMutation = async (formData) => {
    try {
      const res = await api.submitMutation(formData);
      if (res.trackingId) {
        showToast(`Mutation Application ${res.trackingId} submitted successfully!`, 'success');
        setIsMutationModalOpen(false);
        await refreshData();
        setActiveTab('tracker');
        return res;
      }
    } catch {
      showToast('Failed to submit application', 'error');
    }
  };

  const handleAdvanceWorkflow = async (applicationId, roleName, action = 'approve', remarks = '') => {
    try {
      const res = await api.advanceWorkflow({
        applicationId,
        officerRole: currentRole.name,
        officerName: roleName || currentRole.name,
        remarks,
        action
      });
      showToast(res.message || 'Workflow updated successfully', 'success');
      await refreshData();
    } catch {
      showToast('Failed to update workflow', 'error');
    }
  };

  const toggleCompareParcel = (parcel) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.ulpin === parcel.ulpin);
      if (exists) {
        showToast(`Removed ${parcel.ulpin} from comparison`, 'info');
        return prev.filter(p => p.ulpin !== parcel.ulpin);
      }
      if (prev.length >= 2) {
        showToast('Comparison is limited to 2 parcels. Replaced oldest.', 'info');
        return [prev[1], parcel];
      }
      showToast(`Added ${parcel.ulpin} to comparison`, 'success');
      return [...prev, parcel];
    });
  };

  return (
    <LandStackContext.Provider value={{
      currentRole,
      setCurrentRole,
      activeTab,
      setActiveTab,
      dossierSubTab,
      setDossierSubTab,
      parcels,
      selectedParcel,
      setSelectedParcel,
      selectParcel,
      selectParcelByUlpin,
      loading,
      stats,
      searchQuery,
      setSearchQuery,
      filters,
      setFilters,
      applications,
      auditLogs,
      compareList,
      setCompareList,
      toggleCompareParcel,
      handlePayTax,
      handleApplyMutation,
      handleAdvanceWorkflow,
      refreshData,
      isBhuAadhaarModalOpen,
      setIsBhuAadhaarModalOpen,
      isQRVerifyModalOpen,
      setIsQRVerifyModalOpen,
      isMutationModalOpen,
      setIsMutationModalOpen,
      isCompareModalOpen,
      setIsCompareModalOpen,
      isSettingsModalOpen,
      setIsSettingsModalOpen,
      isChatbotOpen,
      setIsChatbotOpen,
      theme,
      setTheme,
      language,
      setLanguage,
      t,
      currentUser,
      setCurrentUser,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      loginUser,
      logoutUser,
      toast,
      showToast
    }}>
      {children}
    </LandStackContext.Provider>
  );
};

export const useLandStack = () => useContext(LandStackContext);

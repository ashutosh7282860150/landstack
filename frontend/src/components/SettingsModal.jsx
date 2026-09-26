import React from 'react';
import { 
  X, 
  Settings, 
  Sun, 
  Moon, 
  Sparkles, 
  Globe, 
  CheckCircle2,
  Shield,
  Palette,
  Check
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

export const SettingsModal = () => {
  const { 
    isSettingsModalOpen, 
    setIsSettingsModalOpen, 
    theme, 
    setTheme, 
    language, 
    setLanguage,
    t,
    showToast
  } = useLandStack();

  if (!isSettingsModalOpen) return null;

  const themes = [
    { 
      id: 'light', 
      name: 'Government Light (Default)', 
      icon: Sun, 
      badge: 'Official Day Mode',
      bgPreview: 'bg-slate-100 border-slate-300 text-slate-900',
      desc: 'Clean, high-contrast white & navy theme suitable for public portals'
    },
    { 
      id: 'dark', 
      name: 'Government Dark Slate', 
      icon: Moon, 
      badge: 'Night Mode',
      bgPreview: 'bg-slate-900 border-slate-700 text-slate-100',
      desc: 'Dark blue slate theme for extended screen use'
    },
    { 
      id: 'night', 
      name: 'Midnight OLED Black', 
      icon: Sparkles, 
      badge: 'OLED Saver',
      bgPreview: 'bg-black border-cyan-500/40 text-cyan-200',
      desc: 'Pure OLED black background with crisp contrast'
    }
  ];

  const languages = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧 / 🇮🇳' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🚩' },
    { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', flag: '🦁' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🛕' }
  ];

  return (
    <div className="fixed inset-0 z-[3000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto text-xs text-[#1f2937]">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white border border-slate-300 rounded shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="bg-[#103b66] px-6 py-3.5 text-white flex items-center justify-between border-b-2 border-amber-600 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-amber-600 flex items-center justify-center font-bold text-white">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">पोर्टल सेटिंग्स / Portal Settings & Language</h2>
              <p className="text-[10px] text-slate-200">Theme Aesthetics & Regional Language Translation</p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="p-1 rounded text-slate-200 hover:text-white hover:bg-[#0a2540]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* SECTION 1: BACKGROUND THEME OPTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-[#103b66]" />
                <h3 className="font-bold text-[#103b66] text-xs uppercase">1. Select Visual Theme</h3>
              </div>
              <span className="text-[10px] text-[#103b66] font-mono font-bold uppercase">
                Active: {theme.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {themes.map((item) => {
                const Icon = item.icon;
                const isSelected = theme === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTheme(item.id);
                      showToast(`Applied ${item.name}`, 'info');
                    }}
                    className={`p-3 rounded text-left border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#103b66] bg-blue-50/50'
                        : 'border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${
                        isSelected ? 'bg-[#103b66] text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 text-xs">{item.name}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 text-[#103b66] font-mono font-bold">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-600 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="ml-2">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-[#103b66] border-[#103b66] text-white' : 'border-slate-400 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: LANGUAGE SELECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-amber-700" />
                <h3 className="font-bold text-[#103b66] text-xs uppercase">2. Select Portal Jurisdiction Language</h3>
              </div>
              <span className="text-[10px] text-amber-800 font-mono font-bold">
                {language.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      showToast(`Language translated to ${lang.label} (${lang.native})`, 'success');
                    }}
                    className={`p-3 rounded border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#103b66] bg-blue-50 text-[#103b66]'
                        : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-base">{lang.flag}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#103b66]" />}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{lang.label}</span>
                      <span className="text-[10px] text-slate-600 font-semibold">{lang.native}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-600 shrink-0">
          <span className="flex items-center space-x-1 font-bold text-[#103b66]">
            <Shield className="w-3.5 h-3.5" />
            <span>BHOO BHUMI Framework v1.0</span>
          </span>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="gov-btn-primary text-xs py-1.5 px-4"
          >
            {t('settings.close') || 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};

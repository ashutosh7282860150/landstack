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
      id: 'dark', 
      name: 'Dark Emerald (Default)', 
      icon: Moon, 
      badge: 'Recommended',
      bgPreview: 'bg-slate-950 border-emerald-500/40 text-slate-100',
      desc: 'High contrast GovTech dark mode with emerald GIS highlights'
    },
    { 
      id: 'light', 
      name: 'Light Slate', 
      icon: Sun, 
      badge: 'Day Mode',
      bgPreview: 'bg-slate-100 border-slate-300 text-slate-900',
      desc: 'Clean, bright theme ideal for daytime office environments'
    },
    { 
      id: 'night', 
      name: 'Night View (Midnight)', 
      icon: Sparkles, 
      badge: 'OLED Black',
      bgPreview: 'bg-black border-cyan-500/40 text-cyan-200',
      desc: 'Pure OLED black background with vibrant cyan GIS accents'
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
    <div className="fixed inset-0 z-[3000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto text-xs text-slate-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Settings className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm">{t('settings.title')}</h2>
              <p className="text-[10px] text-slate-400">Theme Aesthetics & Regional Language Customization</p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* SECTION 1: BACKGROUND THEME OPTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-emerald-400" />
                <h3 className="font-extrabold text-white text-xs">{t('settings.themeLabel')}</h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold uppercase">
                Active: {theme.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
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
                    className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-xs">{item.name}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-mono">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="ml-2">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700 bg-slate-900'
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
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <h3 className="font-extrabold text-white text-xs">{t('settings.langLabel')}</h3>
              </div>
              <span className="text-[10px] text-blue-400 font-mono font-semibold">
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
                      showToast(`Language set to ${lang.label} (${lang.native})`, 'success');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-base">{lang.flag}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block">{lang.label}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{lang.native}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400 shrink-0">
          <span className="flex items-center space-x-1 text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>LAND STACK DPI Framework v1.0</span>
          </span>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer"
          >
            {t('settings.close')}
          </button>
        </div>

      </div>
    </div>
  );
};

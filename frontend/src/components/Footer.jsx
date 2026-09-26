import React from 'react';
import { Shield, ExternalLink, Globe } from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

export const Footer = () => {
  const { setActiveTab, t } = useLandStack();

  return (
    <footer className="bg-[#0a2540] text-slate-300 text-xs border-t-4 border-amber-600">
      
      {/* Top Disclaimer Banner */}
      <div className="bg-[#071a2e] border-b border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Government of India | BHOO BHUMI - National Integrated Land Records Portal</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            *Official Disclaimer: All parcel geometries, ULPIN codes, and land records rendered on this portal are synthetic demonstration data.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: About Platform */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-amber-600 flex items-center justify-center text-white font-bold">
                भू
              </div>
              <span className="font-extrabold text-white text-lg tracking-wide">
                भू भूमि <span className="text-amber-400 font-bold">BHOO BHUMI</span>
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {t('features.description') || 'Integrated GIS-based Digital Public Infrastructure (DPI) for Land Governance linking Revenue Records (7/12), Sub-Registrar Deeds, Town Planning Zoning, Municipal NOCs, and Banking Liens to a 14-digit ULPIN / Bhu-Aadhaar.'}
            </p>
            <div className="text-[11px] text-amber-400 font-semibold">
              Helpline Toll-Free: 1800-180-2024 (9:30 AM to 6:00 PM IST)
            </div>
          </div>

          {/* Col 2: Integrated Registries */}
          <div>
            <h4 className="text-amber-400 font-bold mb-3 text-xs uppercase tracking-wider">
              {t('features.registriesTitle') || '8 Synchronized Departmental Registries'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Department of Revenue (RoR 7/12 & 8A)</li>
              <li>• Department of Stamps & Registration (SRO)</li>
              <li>• Town Planning & Urban Development (Zoning)</li>
              <li>• Municipal Corporation (OBPS & NOCs)</li>
              <li>• Municipal Property Tax Authority</li>
              <li>• Banking & CERSAI Hypothecation Registry</li>
              <li>• e-Courts National Judicial Data Grid</li>
              <li>• State Electricity DISCOM & Water Board</li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-amber-400 font-bold mb-3 text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-300">
                  {t('nav.home') || 'Portal Home'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-amber-300">
                  {t('nav.map') || 'GIS Cadastre Map'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dossier')} className="hover:text-amber-300">
                  {t('nav.dossier') || '7/12 Record Dossier'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-amber-300">
                  {t('nav.services') || 'Online Land Mutation'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} className="hover:text-amber-300">
                  {t('nav.tracker') || 'Track Application'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('officer_workflow')} className="hover:text-amber-300">
                  {t('nav.officer') || 'Officer Portal'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Government Links */}
          <div>
            <h4 className="text-amber-400 font-bold mb-3 text-xs uppercase tracking-wider">
              महत्वपूर्ण सरकारी पोर्टल (Govt Portals)
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="https://dolr.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-amber-300">
                  <span>Department of Land Resources (MoRD)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-amber-300">
                  <span>Digital India Corporation</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://nic.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-amber-300">
                  <span>National Informatics Centre (NIC)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://uidai.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-amber-300">
                  <span>UIDAI (Aadhaar Portal)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://cersai.org.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-amber-300">
                  <span>CERSAI India</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} BHOO BHUMI (भू भूमि) • National Integrated Land Records & GIS Portal. Designed for Government Digital Public Infrastructure.</p>
          <div className="flex items-center space-x-4">
            <span>Website Policies</span>
            <span>|</span>
            <span>Terms of Use</span>
            <span>|</span>
            <span>Helpdesk Support</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

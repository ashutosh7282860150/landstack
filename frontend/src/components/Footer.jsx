import React from 'react';
import { Layers, Shield, ExternalLink, Globe, FileCode2, Cpu, CheckCircle } from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

export const Footer = () => {
  const { setActiveTab } = useLandStack();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      {/* Top Banner */}
      <div className="bg-emerald-950/40 border-b border-emerald-900/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Integrated Digital Public Infrastructure for Land Governance</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            *Disclaimer: All parcel geometries, ownership names, and litigation records in this portal are synthetic Demo Data designed for evaluation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: About Platform */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-wide">
                LAND<span className="text-emerald-400">STACK</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Integrated GIS-based Digital Public Infrastructure (DPI) anchoring multi-departmental land records to a single 14-digit ULPIN / Bhu-Aadhaar cadastre.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400/90 font-mono">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>OGC GeoJSON & SVAMITVA Standard</span>
            </div>
          </div>

          {/* Col 2: Integrated Stack */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              8-in-1 Linked Registry Stack
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Revenue RoR (7/12 & Khatauni)</li>
              <li>• SRO Registration & Deeds</li>
              <li>• Town Planning & Master Plan Zoning</li>
              <li>• Municipal Building Permissions & NOCs</li>
              <li>• Property Tax Assessment & Dues</li>
              <li>• CERSAI / Banking Mortgage Liens</li>
              <li>• e-Courts Litigations & Injunctions</li>
              <li>• Power, Water & Utility GIS Hooks</li>
            </ul>
          </div>

          {/* Col 3: Direct Portal Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              System Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-emerald-400 transition-colors">
                  Interactive Cadastral GIS Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dossier')} className="hover:text-emerald-400 transition-colors">
                  Unified Parcel Dossier Engine
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-emerald-400 transition-colors">
                  Online Citizen Mutation Wizard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} className="hover:text-emerald-400 transition-colors">
                  Real-time Application Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('officer_workflow')} className="hover:text-emerald-400 transition-colors">
                  Revenue Officer & Town Planner Portals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-emerald-400 transition-colors">
                  Tamper-Evident Governance Audit Trail
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tech & Standards */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Architecture Standards
            </h4>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Cadastre ID:</span>
                <span className="font-mono text-emerald-400 font-semibold">14-Digit ULPIN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">GIS Coordinate:</span>
                <span className="font-mono text-slate-300">WGS 84 / EPSG:4326</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Survey Precision:</span>
                <span className="text-slate-300">DGPS / Class-A (5cm)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification:</span>
                <span className="text-blue-400 font-semibold">Encrypted QR & Audit Hash</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <p>© {new Date().getFullYear()} LAND STACK • Digital Public Infrastructure for Land Governance.</p>
          <div className="flex items-center space-x-4">
            <span>GovTech Standards Compliant</span>
            <span>•</span>
            <span>Open Geospatial Consortium (OGC)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { 
  Layers, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  FileText, 
  Landmark, 
  Scale, 
  Zap, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  TrendingUp,
  Clock,
  Eye,
  Lock,
  Cpu,
  Fingerprint,
  Activity,
  Users,
  Briefcase
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

export const FeaturesSection = () => {
  const { setActiveTab } = useLandStack();

  const registries = [
    { name: 'Revenue Dept (RoR 7/12 & 8A)', icon: FileText, desc: 'Ownership, Khata details, co-owners %, agricultural crop pattern & mutation history.' },
    { name: 'Sub-Registrar (SRO Deeds)', icon: ShieldCheck, desc: 'Registered Sale Deeds, Conveyance, Stamp duty, SRO Index-II extracts & digital signatures.' },
    { name: 'Town Planning & Zoning', icon: Building2, desc: 'Master Plan 2031 land-use zoning, permissible FAR, height restrictions & buffer zones.' },
    { name: 'Municipal Building Permissions', icon: Layers, desc: 'Sanctioned building plans, Occupancy Certificates (OC), Fire & Environmental NOCs.' },
    { name: 'Property Tax & Assessment', icon: Landmark, desc: 'Unique Property Tax ID, annual assessment, pending dues & instant 1-click tax payment.' },
    { name: 'CERSAI / Bank Mortgages', icon: Landmark, desc: 'Financial hypothecations, active bank loans, lien status & Non-Encumbrance certificates.' },
    { name: 'e-Courts & Legal Injunctions', icon: Scale, desc: 'Civil court cases, Stay orders, caveats, and automated Title Risk Index scoring (0-100).' },
    { name: 'Utilities & Infrastructure', icon: Zap, desc: 'Power substation feeder load, piped water connections, sewerage lines & gas pipeline hooks.' }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'DGPS & Drone Cadastre Mapping',
      desc: 'High-precision spatial boundary survey creates an unambiguous closed GeoJSON polygon anchored in global WGS-84 coordinates.'
    },
    {
      step: '02',
      title: '14-Digit ULPIN Generation',
      desc: 'System assigns a unique Bhu-Aadhaar number based on state, district, and polygon centroid coordinates.'
    },
    {
      step: '03',
      title: 'Interoperable Data Synchronization',
      desc: 'Automated REST APIs link Revenue RoR, Registration deeds, Master Plan zoning, and CERSAI mortgage registries into one record.'
    },
    {
      step: '04',
      title: 'Transparent Citizen & Officer Access',
      desc: 'Citizens inspect title health, apply for mutations & download digital passbooks with QR codes; officers verify and e-sign workflows.'
    }
  ];

  return (
    <div className="py-16 bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section 1: What is Land Stack? */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Digital Public Infrastructure (DPI)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              What is <span className="text-emerald-400">LAND STACK</span>?
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              LAND STACK is a unified, parcel-centric Digital Public Infrastructure designed to eliminate fragmented land administration. Instead of maintaining disconnected records across revenue departments, registration offices, municipal town planning bodies, banks, and courts, LAND STACK anchors all land-related data directly to the physical land parcel via a 14-digit Unique Land Parcel Identification Number (ULPIN / Bhu-Aadhaar).
            </p>
            <div className="mt-6 space-y-3 text-xs sm:text-sm">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300"><strong className="text-white">Parcel-Centric Architecture:</strong> The land polygon on the GIS map serves as the single source of truth.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300"><strong className="text-white">Interoperable Registries:</strong> Real-time cross-departmental data synchronization preventing fraudulent double-sales and undisclosed liens.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300"><strong className="text-white">Automated Risk Scoring:</strong> Instant Title Health Index (0-100) flagging stays, encumbrances, or zoning violations.</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual Graphic */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="text-xs font-mono text-emerald-400 mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
              <span>// LAND_STACK_CORE_PARADIGM</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">ULPIN Interoperability</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-xs">
                    GIS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Geo-Referenced Land Parcel</div>
                    <div className="text-[11px] text-slate-400 font-mono">DGPS Polygon Boundary • EPSG:4326</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">14-Digit ULPIN</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Revenue Department</span>
                  <span className="text-emerald-300 font-semibold text-xs">RoR 7/12 & Khatauni</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Registration (SRO)</span>
                  <span className="text-blue-300 font-semibold text-xs">Deeds & Index-II</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Town Planning</span>
                  <span className="text-purple-300 font-semibold text-xs">Master Plan Zoning</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Financial / CERSAI</span>
                  <span className="text-amber-300 font-semibold text-xs">Mortgage & Liens</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-center">
                <span className="text-xs text-emerald-300 font-semibold">
                  Unified Citizen Services & Paperless Mutation Engine
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Why Land Stack? (Problem vs Solution) */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Transformation Impact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why <span className="text-emerald-400">LAND STACK</span> is Essential
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Comparison between traditional siloed land administration and the unified Land Stack DPI model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Silos */}
            <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-sm">
                <XCircle className="w-5 h-5 text-red-400" />
                <span>Current Siloed Land Governance</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Disjointed Records:</strong> Revenue RoR, Registration deeds, and Municipal tax data stored in separate incompatible databases.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Undisclosed Encumbrances:</strong> High risk of buying mortgaged or litigated land due to lack of bank/court data integration.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Lengthy Manual Mutations:</strong> Khata transfer takes 45-90 days with physical visits to Patwari and Tehsil offices.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Zoning Encroachments:</strong> Unauthorized construction on green belts or flood zones because municipal zoning is disconnected from deeds.</span>
                </li>
              </ul>
            </div>

            {/* Land Stack DPI */}
            <div className="bg-emerald-950/15 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Unified LAND STACK Digital Public Infrastructure</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Single Source of Truth:</strong> One 14-digit ULPIN links all 8 department records with live bidirectional sync.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Real-time Stay & Lien Locks:</strong> Automated freeze on deed registration if CERSAI lien or Civil Court stay is active.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Rapid Digital Mutation:</strong> Paperless online workflow with GIS field verification and digital e-Sign within 7 days.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>GIS Zoning Safeguards:</strong> Automated setback and buffer checking against Master Plan boundaries before NOC sanction.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: 8-in-1 Linked Registry Stack */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">8-in-1 Linked Registry</span> Stack
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Every parcel in LAND STACK integrates data points across eight critical governmental and financial institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {registries.map((reg, idx) => {
              const Icon = reg.icon;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveTab('dossier')}
                  className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-white text-xs mb-1.5">{reg.name}</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{reg.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Citizen vs Government Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Citizen Benefits */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Citizen & Landowner Benefits</h3>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="font-semibold text-white block">Instant Title Verification & Bhu-Aadhaar Passbook</span>
                <span className="text-slate-400">Download digitally signed, QR-verifiable land title certificate from anywhere.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="font-semibold text-white block">Transparent Online Mutation Tracking</span>
                <span className="text-slate-400">Track application stages in real-time from Patwari survey to Tehsildar approval.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="font-semibold text-white block">Fraud Prevention in Land Transactions</span>
                <span className="text-slate-400">Check active bank mortgages, court litigations, and municipal dues before buying.</span>
              </div>
            </div>
          </div>

          {/* Government Benefits */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Government & Institutional Benefits</h3>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="font-semibold text-white block">Drastic Reduction in Land Litigation</span>
                <span className="text-slate-400">Automated cross-departmental locks prevent illegal sales of stayed or government land.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="font-semibold text-white block">Higher Property Tax Revenue Recovery</span>
                <span className="text-slate-400">Seamless linkage between GIS building footprints and municipal tax registers.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="font-semibold text-white block">Accelerated Credit Delivery (FinTech / Agri Loans)</span>
                <span className="text-slate-400">Banks verify land collateral instantly via DPI APIs without 30-day physical searches.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: How It Works */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              How <span className="text-emerald-400">LAND STACK</span> Works
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              4-Step End-to-End Cadastral & Digital Integration Lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((ws, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-900 border border-slate-800 relative">
                <span className="text-3xl font-extrabold font-mono text-slate-700 block mb-2">{ws.step}</span>
                <h3 className="font-bold text-white text-xs mb-1.5">{ws.title}</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-900/60 via-slate-900 to-blue-900/60 border border-emerald-500/30 text-center relative overflow-hidden">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">
            Experience the Future of Land Governance Today
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mt-2">
            Explore interactive GIS cadastre boundaries or test end-to-end mutation and officer approval workflows.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('map')}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              Open Interactive GIS Map
            </button>
            <button
              onClick={() => setActiveTab('dossier')}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
            >
              View 8-in-1 Parcel Dossier
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

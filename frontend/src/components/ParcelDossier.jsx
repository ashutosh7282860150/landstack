import React, { useState } from 'react';
import { 
  Layers, 
  FileText, 
  ShieldCheck, 
  Building2, 
  Building, 
  CreditCard, 
  Landmark, 
  Scale, 
  Zap, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronRight, 
  Download, 
  DollarSign, 
  Printer, 
  ExternalLink,
  MapPin,
  Calendar,
  Share2,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLandStack } from '../context/LandStackContext';
import { formatCurrency, formatArea, formatDate, getRiskBadgeColor, getLandUseBadge } from '../utils/formatters';

export const ParcelDossier = () => {
  const { 
    parcels, 
    selectedParcel, 
    setSelectedParcel, 
    selectParcelByUlpin,
    dossierSubTab, 
    setDossierSubTab,
    setIsBhuAadhaarModalOpen,
    setIsMutationModalOpen,
    handlePayTax,
    showToast,
    setActiveTab
  } = useLandStack();

  const parcel = selectedParcel || parcels[0];
  const [isPayingTax, setIsPayingTax] = useState(false);

  if (!parcel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        <Layers className="w-12 h-12 mx-auto text-slate-600 mb-3" />
        <h3 className="text-lg font-bold text-white">No Parcel Selected</h3>
        <p className="text-sm mt-1">Please select a parcel from the GIS map or use the search bar.</p>
        <button
          onClick={() => setActiveTab('map')}
          className="mt-4 px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Open GIS Land Map
        </button>
      </div>
    );
  }

  const riskBadge = getRiskBadgeColor(parcel.riskScore);
  const landUseBadge = getLandUseBadge(parcel.landUseCategory);
  const areaInfo = formatArea(parcel.spatialAttributes?.areaHectares);

  const tabs = [
    { id: 'overview', label: '1. Cadastral Spatial', icon: MapPin },
    { id: 'revenue', label: '2. Revenue RoR (7/12)', icon: FileText },
    { id: 'registration', label: '3. Registration Deeds', icon: ShieldCheck },
    { id: 'zoning', label: '4. Master Plan Zoning', icon: Building2 },
    { id: 'building', label: '5. Municipal NOCs', icon: Building },
    { id: 'tax', label: '6. Property Tax', icon: Landmark, badge: parcel.propertyTax?.duesPending > 0 ? 'DUE' : null },
    { id: 'encumbrance', label: '7. Bank Mortgage / CERSAI', icon: CreditCard },
    { id: 'litigation', label: '8. e-Courts & Risk Index', icon: Scale, badge: parcel.litigation?.hasLitigation ? 'STAY' : null },
    { id: 'utilities', label: 'Utilities & Hooks', icon: Zap }
  ];

  const handleTaxPaymentClick = async () => {
    setIsPayingTax(true);
    try {
      await handlePayTax(parcel.ulpin, parcel.propertyTax.duesPending || parcel.propertyTax.annualTax);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } finally {
      setIsPayingTax(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner / Breadcrumb & Parcel Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Unified Land Record Dossier
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${landUseBadge.bg} ${landUseBadge.text} ${landUseBadge.border}`}>
              {parcel.landUseCategory}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${riskBadge.bg} ${riskBadge.text} ${riskBadge.border}`}>
              Title Health: {parcel.riskScore}/100 ({riskBadge.label})
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight flex items-center gap-2">
            {parcel.ulpin}
          </h1>
          <p className="text-xs text-slate-400">
            Bhu-Aadhaar: <strong className="text-slate-200 font-mono">{parcel.bhuAadhaar}</strong> • Survey No: <strong className="text-slate-200">{parcel.surveyNo}</strong> • {parcel.location.village}, {parcel.location.district}, {parcel.location.state}
          </p>
        </div>

        {/* Parcel Switcher Dropdown & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={parcel.ulpin}
            onChange={(e) => selectParcelByUlpin(e.target.value, dossierSubTab)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
          >
            {parcels.map(p => (
              <option key={p.ulpin} value={p.ulpin}>
                {p.ulpin} - {p.location.village} ({p.landUseCategory})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsBhuAadhaarModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital Passbook (QR)</span>
          </button>

          <button
            onClick={() => setIsMutationModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs border border-slate-700 flex items-center space-x-1.5 transition-all"
          >
            <FileCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Apply Mutation</span>
          </button>
        </div>
      </div>

      {/* 8-in-1 Navigation Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-1.5 flex items-center gap-1 overflow-x-auto shadow-inner">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = dossierSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setDossierSubTab(tab.id)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                  tab.badge === 'STAY' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-amber-400 text-slate-950'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-xs text-slate-200">
        
        {/* ========================================================
            TAB 1: OVERVIEW & SPATIAL CADASTRE
        ======================================================== */}
        {dossierSubTab === 'overview' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Cadastral Boundary & Spatial GIS Profile
                </h2>
                <p className="text-slate-400 text-[11px]">
                  Survey of India SVAMITVA / DGPS precision geospatial coordinates
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-semibold">
                Accuracy: {parcel.spatialAttributes?.accuracyLevel}
              </span>
            </div>

            {/* Spatial Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Cadastral Area</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono block mt-0.5">
                  {areaInfo.acres}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {areaInfo.hectares} • {areaInfo.sqMeters}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Perimeter</span>
                <span className="text-base font-extrabold text-white font-mono block mt-0.5">
                  {parcel.spatialAttributes?.perimeterMeters} m
                </span>
                <span className="text-[10px] text-slate-500">Polygon boundary fence</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Elevation (MSL)</span>
                <span className="text-base font-extrabold text-blue-400 font-mono block mt-0.5">
                  {parcel.spatialAttributes?.elevationMeters} m
                </span>
                <span className="text-[10px] text-slate-500">Above Mean Sea Level</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Survey Method</span>
                <span className="text-xs font-bold text-slate-200 block mt-0.5 truncate">
                  {parcel.spatialAttributes?.surveyMethod?.split('(')[0]}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Date: {parcel.spatialAttributes?.surveyDate}
                </span>
              </div>
            </div>

            {/* Location & Administrative Hierarchy */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">
                Administrative Hierarchy & Jurisdictions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">State:</span>
                  <span className="font-semibold text-white">{parcel.location.state}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">District:</span>
                  <span className="font-semibold text-white">{parcel.location.district}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Taluka / Tehsil:</span>
                  <span className="font-semibold text-white">{parcel.location.taluka}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Village / Ward:</span>
                  <span className="font-semibold text-white">{parcel.location.village}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Pincode:</span>
                  <span className="font-mono text-white">{parcel.location.pincode}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Sub-Registrar (SRO):</span>
                  <span className="font-semibold text-white">{parcel.location.sroOffice}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block text-[10px]">Planning & Municipal Authority:</span>
                  <span className="font-semibold text-white">{parcel.location.municipalBody}</span>
                </div>
              </div>
            </div>

            {/* Polygon Coordinates Preview */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[11px] text-slate-400">GeoJSON Polygon Boundary Vertices (EPSG:4326)</span>
                <span className="text-[10px] text-emerald-400 font-mono">DGPS Closed Ring</span>
              </div>
              <pre className="p-2.5 rounded bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-slate-800/80">
                {JSON.stringify(parcel.geometry, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: REVENUE RECORDS (RoR 7/12 & 8A / KHATAUNI)
        ======================================================== */}
        {dossierSubTab === 'revenue' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Department of Revenue — Record of Rights (RoR)
                </h2>
                <p className="text-slate-400 text-[11px]">
                  Extract from State Land Records Registry ({parcel.revenueRecords?.rorType})
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-mono">
                Khata No: {parcel.revenueRecords?.khataNumber}
              </span>
            </div>

            {/* Ownership Share Matrix */}
            <div>
              <h3 className="font-bold text-white text-xs mb-2">Registered Landowners (Khatedars)</h3>
              <div className="space-y-2">
                {parcel.revenueRecords?.owners?.map((owner, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{owner.name}</span>
                        <span className="text-slate-400 text-[11px]">({owner.relation})</span>
                        {owner.aadhaarSeeded ? (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3 h-3" /> Aadhaar Seeded
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/30 font-semibold">
                            Unseeded
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{owner.address}</p>
                    </div>

                    <div className="flex items-center space-x-4 font-mono text-xs text-right">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Aadhaar Masked</span>
                        <span className="text-slate-300">{owner.aadhaarMasked}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Ownership Share</span>
                        <span className="text-emerald-400 font-bold text-sm">{owner.share}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crop & Revenue Assessment */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Soil Classification</span>
                <span className="font-semibold text-slate-200">{parcel.revenueRecords?.soilClass}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Irrigation Source</span>
                <span className="font-semibold text-slate-200">{parcel.revenueRecords?.irrigationSource}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Crop Pattern</span>
                <span className="font-semibold text-slate-200">{parcel.revenueRecords?.cropPattern}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Annual Land Revenue</span>
                <span className="font-semibold text-emerald-400 font-mono">{parcel.revenueRecords?.landRevenueAssessment}</span>
              </div>
            </div>

            {/* Mutation History Timeline */}
            <div>
              <h3 className="font-bold text-white text-xs mb-2">Historical Mutation Orders (Namantaran Timeline)</h3>
              <div className="space-y-2">
                {parcel.revenueRecords?.mutationHistory?.map((mut, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-emerald-400 font-mono text-xs">{mut.mutationNo}</span>
                        <span className="text-slate-400 text-[10px]">({formatDate(mut.date)})</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/10 text-blue-300 font-mono">{mut.type}</span>
                      </div>
                      <p className="text-slate-300 text-xs mt-1">Sanction Order: <strong className="text-white">{mut.orderNo}</strong> by {mut.officer}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                      {mut.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: REGISTRATION & SRO DEEDS
        ======================================================== */}
        {dossierSubTab === 'registration' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Department of Stamps & Registration (Sub-Registrar Deeds)
                </h2>
                <p className="text-slate-400 text-[11px]">
                  Registered Conveyeance / Lease Deeds, Stamp Duty & SRO Index-II Extract
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[11px] font-mono">
                Deed No: {parcel.registration?.deedNo}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Deed Instrument Type</span>
                <span className="font-bold text-white text-xs">{parcel.registration?.deedType}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Registration SRO</span>
                <span className="font-semibold text-slate-200 text-xs">{parcel.registration?.sroOffice}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Stamp Duty Paid</span>
                <span className="font-mono font-bold text-emerald-400 text-xs">{parcel.registration?.stampDutyPaid}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Market Ready Reckoner Valuation</span>
                <span className="font-mono font-bold text-white text-xs">{parcel.registration?.marketValuationGuideline}</span>
              </div>
            </div>

            {/* Index-II Security Extract */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-xs">SRO Index-II Digital Integrity Certificate</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Encrypted Public Key Verified
                </span>
              </div>
              <p className="text-slate-400 text-[11px]">
                The registered deed is cryptographically chained to the ULPIN spatial boundary, guaranteeing zero title overlap or double sale.
              </p>
              <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-slate-400 flex items-center justify-between border border-slate-800">
                <span>Digital Signature: <strong className="text-blue-400">{parcel.registration?.digitalSignature}</strong></span>
                <span>Date: {formatDate(parcel.registration?.registrationDate)}</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: MASTER PLAN & LAND USE ZONING
        ======================================================== */}
        {dossierSubTab === 'zoning' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  Town Planning & Urban Development Authority (Master Plan 2031)
                </h2>
                <p className="text-slate-400 text-[11px]">
                  Permissible Land Use, Floor Area Ratio (FAR), Ground Coverage & Buffer Restrictions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Master Plan Authority</span>
                <span className="font-bold text-white text-xs">{parcel.townPlanning?.masterPlanName}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Zoning Designation</span>
                <span className="font-semibold text-purple-400 text-xs">{parcel.townPlanning?.zoningClassification}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Permissible FAR / FSI</span>
                <span className="font-mono font-bold text-white text-sm">{parcel.townPlanning?.permissibleFAR}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Max Permissible Height</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{parcel.townPlanning?.maxHeightMeters} Meters</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div>
                <span className="text-slate-500 block text-[10px]">Buffer & Environmental Restrictions:</span>
                <p className="font-semibold text-amber-300 text-xs mt-0.5">{parcel.townPlanning?.bufferRestrictions}</p>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Non-Agricultural (NA) Conversion Eligibility:</span>
                <p className="font-semibold text-slate-200 text-xs mt-0.5">{parcel.townPlanning?.naConversionEligibility}</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: MUNICIPAL BUILDING PERMISSIONS & NOCS
        ======================================================== */}
        {dossierSubTab === 'building' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-teal-400" />
                  Municipal Corporation — Building Sanction & NOCs
                </h2>
                <p className="text-slate-400 text-[11px]">
                  Online Building Permission System (OBPS) Sanction File & Statutory Approvals
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 text-[11px] font-mono">
                File: {parcel.buildingPermissions?.fileNo}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[10px]">Building Permit Status</span>
                <span className="font-bold text-white text-sm">{parcel.buildingPermissions?.sanctionStatus}</span>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                parcel.buildingPermissions?.sanctionStatus?.includes('Approved') || parcel.buildingPermissions?.sanctionStatus?.includes('Granted')
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : parcel.buildingPermissions?.sanctionStatus?.includes('REJECTED') || parcel.buildingPermissions?.sanctionStatus?.includes('PROHIBITED')
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {parcel.buildingPermissions?.sanctionStatus?.split(' ')[0]}
              </span>
            </div>

            {/* NOC Checklist */}
            <div>
              <h3 className="font-bold text-white text-xs mb-2">Statutory NOC Clearances</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Fire & Emergency Services NOC</span>
                  <span className="font-semibold text-slate-200 text-xs">{parcel.buildingPermissions?.nocChecklist?.fireNoc}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">State Pollution Control / Environmental NOC</span>
                  <span className="font-semibold text-slate-200 text-xs">{parcel.buildingPermissions?.nocChecklist?.environmentalNoc}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Airport Authority of India (AAI) Safe Height</span>
                  <span className="font-semibold text-slate-200 text-xs">{parcel.buildingPermissions?.nocChecklist?.aviationNoc}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Tree Authority / Green Buffer Compliance</span>
                  <span className="font-semibold text-slate-200 text-xs">{parcel.buildingPermissions?.nocChecklist?.treeAuthority}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: PROPERTY TAX ASSESSMENT & PAYMENT GATEWAY
        ======================================================== */}
        {dossierSubTab === 'tax' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  Municipal Property Tax & Assessment Registry
                </h2>
                <p className="text-slate-400 text-[11px]">
                  Self-Assessment Scheme (SAS) Property Tax Ledger & Instant Settlement
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 text-[11px] font-mono">
                Tax ID: {parcel.propertyTax?.taxAssessmentId}
              </span>
            </div>

            {/* Tax Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Assessment Year</span>
                <span className="font-mono font-bold text-white text-xs">{parcel.propertyTax?.currentAssessmentYear}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Annual Property Tax</span>
                <span className="font-mono font-bold text-slate-200 text-sm">{formatCurrency(parcel.propertyTax?.annualTax)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Outstanding Dues Pending</span>
                <span className={`font-mono font-extrabold text-sm ${parcel.propertyTax?.duesPending > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {formatCurrency(parcel.propertyTax?.duesPending)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Tax Payment Status</span>
                <span className={`font-bold text-xs ${parcel.propertyTax?.duesPending > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {parcel.propertyTax?.paymentStatus}
                </span>
              </div>
            </div>

            {/* Payment Gateway Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white text-sm">Online Property Tax Settlement</h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {parcel.propertyTax?.duesPending > 0
                      ? `Outstanding bill amount of ${formatCurrency(parcel.propertyTax?.duesPending)} is due for FY ${parcel.propertyTax?.currentAssessmentYear}.`
                      : `All property taxes are clear for FY ${parcel.propertyTax?.currentAssessmentYear}. Last receipt: ${parcel.propertyTax?.receiptNo}.`
                    }
                  </p>
                </div>

                {parcel.propertyTax?.duesPending > 0 ? (
                  <button
                    onClick={handleTaxPaymentClick}
                    disabled={isPayingTax}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>{isPayingTax ? 'Processing Payment...' : `Pay ${formatCurrency(parcel.propertyTax.duesPending)} Online`}</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Payment Up To Date</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 7: ENCUMBRANCE & BANK LIENS (CERSAI)
        ======================================================== */}
        {dossierSubTab === 'encumbrance' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  Banking Liens & CERSAI Hypothecation Registry
                </h2>
                <p className="text-slate-400 text-[11px]">
                  Central Registry of Securitisation Asset Reconstruction and Security Interest of India
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 text-[11px] font-mono">
                CERSAI: {parcel.encumbrance?.cersaiId}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Financial Charge Status</span>
                <span className="font-bold text-white text-xs">{parcel.encumbrance?.status}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Lien Holding Institution</span>
                <span className="font-semibold text-slate-200 text-xs">{parcel.encumbrance?.bankName}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Loan Facility Type</span>
                <span className="font-semibold text-slate-200 text-xs">{parcel.encumbrance?.loanType}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Sanctioned Lien Amount</span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {parcel.encumbrance?.sanctionedAmount > 0 ? formatCurrency(parcel.encumbrance?.sanctionedAmount) : 'Nil / Debt Free'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-xs">Non-Encumbrance Certificate (NEC) Eligibility</h3>
              <p className="text-slate-400 text-xs">{parcel.encumbrance?.necEligibility}</p>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 8: e-COURTS & LEGAL INJUNCTIONS
        ======================================================== */}
        {dossierSubTab === 'litigation' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-red-400" />
                  e-Courts Integration & Title Risk Index
                </h2>
                <p className="text-slate-400 text-[11px]">
                  Real-time Cross-Query across High Courts, District Courts, and Revenue Tribunals
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded text-[11px] font-bold border ${riskBadge.bg} ${riskBadge.text} ${riskBadge.border}`}>
                Risk Score: {parcel.riskScore}/100
              </span>
            </div>

            {/* Litigations List */}
            {parcel.litigation?.hasLitigation ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/40 text-red-300">
                  <div className="flex items-center space-x-2 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>JUDICIAL RESTRAINING STAY ORDER ACTIVE</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Sub-Registrar transactions and revenue mutation orders are locked by automated court injunction order.
                  </p>
                </div>

                {parcel.litigation?.courtCases?.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-white text-sm font-mono">{c.caseNumber}</span>
                        <span className="text-slate-400 text-xs block">{c.court}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20">
                        Stay Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Petitioner:</span>
                        <span className="text-slate-200">{c.petitioner}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Respondent:</span>
                        <span className="text-slate-200">{c.respondent}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500 block text-[10px]">Subject Matter:</span>
                        <span className="text-slate-300">{c.matter}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500 block text-[10px]">Status:</span>
                        <span className="text-red-400 font-semibold">{c.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-white text-sm">Clean Title / Zero Active Injunctions</h3>
                <p className="text-slate-400 text-xs max-w-lg mx-auto">
                  Queried e-Courts National Judicial Data Grid (NJDG) v2.4 API. No active civil suits, stay orders, or caveats recorded against this 14-digit ULPIN.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 9: UTILITIES & PUBLIC INFRASTRUCTURE
        ======================================================== */}
        {dossierSubTab === 'utilities' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Utilities & Infrastructure Geospatial Hooks
                </h2>
                <p className="text-slate-400 text-[11px]">
                  State Electricity DISCOM, Water Supply Board & Gas Network Linkage
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-yellow-400 font-bold text-xs flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> Electricity DISCOM
                </span>
                <div>
                  <span className="text-slate-500 block text-[10px]">Provider:</span>
                  <span className="text-white font-semibold">{parcel.utilities?.electricity?.provider}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Consumer Number:</span>
                  <span className="font-mono text-emerald-400">{parcel.utilities?.electricity?.consumerNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Sanctioned Load:</span>
                  <span className="text-slate-300 font-mono">{parcel.utilities?.electricity?.sanctionedLoad}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-blue-400 font-bold text-xs flex items-center gap-1.5">
                  <Building className="w-4 h-4" /> Piped Water Works
                </span>
                <div>
                  <span className="text-slate-500 block text-[10px]">Provider:</span>
                  <span className="text-white font-semibold">{parcel.utilities?.water?.provider}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Connection Status:</span>
                  <span className="text-emerald-400 font-semibold">{parcel.utilities?.water?.status}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-teal-400 font-bold text-xs flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-teal-400" /> Piped Natural Gas
                </span>
                <div>
                  <span className="text-slate-500 block text-[10px]">Provider:</span>
                  <span className="text-white font-semibold">{parcel.utilities?.gas?.provider}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Status:</span>
                  <span className="text-slate-300">{parcel.utilities?.gas?.status}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

function Flame({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
}

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
  DollarSign, 
  MapPin, 
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
    setActiveTab,
    t
  } = useLandStack();

  const parcel = selectedParcel || parcels[0];
  const [isPayingTax, setIsPayingTax] = useState(false);

  if (!parcel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-600">
        <Layers className="w-12 h-12 mx-auto text-[#103b66] mb-3" />
        <h3 className="text-lg font-bold text-[#103b66]">No Land Parcel Selected</h3>
        <p className="text-sm mt-1">Please select a parcel from the GIS map or use the search bar.</p>
        <button
          onClick={() => setActiveTab('map')}
          className="mt-4 gov-btn-primary text-xs"
        >
          {t('hero.gisMapBtn') || 'Open GIS Land Map'}
        </button>
      </div>
    );
  }

  const riskBadge = getRiskBadgeColor(parcel.riskScore);
  const landUseBadge = getLandUseBadge(parcel.landUseCategory);
  const areaInfo = formatArea(parcel.spatialAttributes?.areaHectares);

  const tabs = [
    { id: 'overview', label: t('dossier.tab1') || '1. Spatial Cadastre', icon: MapPin },
    { id: 'revenue', label: t('dossier.tab2') || '2. Revenue RoR (7/12)', icon: FileText },
    { id: 'registration', label: t('dossier.tab3') || '3. Registration Deeds', icon: ShieldCheck },
    { id: 'zoning', label: t('dossier.tab4') || '4. Master Plan Zoning', icon: Building2 },
    { id: 'building', label: t('dossier.tab5') || '5. Municipal NOCs', icon: Building },
    { id: 'tax', label: t('dossier.tab6') || '6. Property Tax', icon: Landmark, badge: parcel.propertyTax?.duesPending > 0 ? 'DUE' : null },
    { id: 'encumbrance', label: t('dossier.tab7') || '7. Bank Mortgage / CERSAI', icon: CreditCard },
    { id: 'litigation', label: t('dossier.tab8') || '8. e-Courts & Risk Index', icon: Scale, badge: parcel.litigation?.hasLitigation ? 'STAY' : null },
    { id: 'utilities', label: t('dossier.tab9') || 'Utilities & Hooks', icon: Zap }
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
    <div className="bg-transparent py-6 text-[#1f2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Official Header Banner & Parcel Switcher */}
        <div className="gov-card p-5 bg-white/90 backdrop-blur-md border-l-4 border-l-[#103b66] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#103b66] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {t('dossier.title') || 'OFFICIAL 8-IN-1 ROR & DOSSIER'}
                </span>
                <span className="gov-badge bg-blue-50 text-[#103b66] border border-blue-200">
                  {parcel.landUseCategory}
                </span>
                <span className={`gov-badge ${parcel.riskScore >= 80 ? 'gov-badge-success' : 'gov-badge-danger'}`}>
                  Title Health: {parcel.riskScore}/100 ({riskBadge.label})
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#103b66] font-mono tracking-tight flex items-center gap-2">
                ULPIN: {parcel.ulpin}
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Bhu-Aadhaar: <strong className="text-[#103b66] font-mono">{parcel.bhuAadhaar}</strong> • Survey No: <strong className="text-slate-800">{parcel.surveyNo}</strong> • {parcel.location.village}, {parcel.location.district}, {parcel.location.state}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={parcel.ulpin}
                onChange={(e) => selectParcelByUlpin(e.target.value, dossierSubTab)}
                className="gov-select text-xs font-mono py-2 w-auto"
              >
                {parcels.map(p => (
                  <option key={p.ulpin} value={p.ulpin}>
                    {p.ulpin} - {p.location.village} ({p.landUseCategory})
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsBhuAadhaarModalOpen(true)}
                className="gov-btn-orange text-xs"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{t('dossier.digitalPassbook') || 'Bhu-Aadhaar Passbook (QR)'}</span>
              </button>

              <button
                onClick={() => setIsMutationModalOpen(true)}
                className="gov-btn-primary text-xs"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{t('dossier.applyMutation') || 'Apply Mutation'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 8-in-1 Navigation Tabs */}
        <div className="bg-[#103b66] p-1 rounded shadow-sm flex items-center gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = dossierSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setDossierSubTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isActive 
                    ? 'bg-white text-[#103b66] rounded font-bold' 
                    : 'text-white hover:bg-[#1e56a0] rounded'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#103b66]' : 'text-slate-300'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                    tab.badge === 'STAY' ? 'bg-red-600 text-white' : 'bg-amber-500 text-slate-900'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="gov-card p-6 bg-white text-xs">
          
          {/* TAB 1: SPATIAL CADASTRE */}
          {dossierSubTab === 'overview' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-bold text-[#103b66] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    1. Cadastral Boundary & Spatial GIS Profile
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Survey of India SVAMITVA / DGPS High-Precision Geospatial Coordinates
                  </p>
                </div>
                <span className="gov-badge gov-badge-info">
                  Survey Accuracy: {parcel.spatialAttributes?.accuracyLevel}
                </span>
              </div>

              {/* Spatial Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Cadastral Area</span>
                  <span className="text-base font-bold text-[#103b66] font-mono block mt-0.5">
                    {areaInfo.acres}
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">
                    {areaInfo.hectares} • {areaInfo.sqMeters}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Boundary Perimeter</span>
                  <span className="text-base font-bold text-slate-800 font-mono block mt-0.5">
                    {parcel.spatialAttributes?.perimeterMeters} m
                  </span>
                  <span className="text-[10px] text-slate-500">Geofenced Polygon</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Elevation (MSL)</span>
                  <span className="text-base font-bold text-blue-800 font-mono block mt-0.5">
                    {parcel.spatialAttributes?.elevationMeters} m
                  </span>
                  <span className="text-[10px] text-slate-500">Above Mean Sea Level</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Survey Instrument</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5 truncate">
                    {parcel.spatialAttributes?.surveyMethod?.split('(')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Date: {parcel.spatialAttributes?.surveyDate}
                  </span>
                </div>
              </div>

              {/* Administrative Hierarchy Table */}
              <div className="border border-slate-200 rounded p-4 bg-slate-50 space-y-2">
                <h3 className="font-bold text-[#103b66] text-xs uppercase tracking-wider">
                  Administrative Hierarchy & Jurisdictions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">State:</span>
                    <span className="font-bold text-slate-800">{parcel.location.state}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">District:</span>
                    <span className="font-bold text-slate-800">{parcel.location.district}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Taluka / Tehsil:</span>
                    <span className="font-bold text-slate-800">{parcel.location.taluka}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Village / Ward:</span>
                    <span className="font-bold text-slate-800">{parcel.location.village}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Pincode:</span>
                    <span className="font-mono font-bold text-slate-800">{parcel.location.pincode}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Sub-Registrar (SRO):</span>
                    <span className="font-bold text-slate-800">{parcel.location.sroOffice}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block text-[10px]">Planning Body:</span>
                    <span className="font-bold text-slate-800">{parcel.location.municipalBody}</span>
                  </div>
                </div>
              </div>

              {/* Polygon GeoJSON */}
              <div className="border border-slate-200 rounded p-3 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[11px] font-bold text-[#103b66]">GeoJSON Polygon Vertices (EPSG:4326)</span>
                  <span className="text-[10px] text-emerald-800 font-mono font-bold">DGPS Ring Verified</span>
                </div>
                <pre className="p-2 rounded bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                  {JSON.stringify(parcel.geometry, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: REVENUE RoR 7/12 */}
          {dossierSubTab === 'revenue' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#103b66] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-600" />
                    2. Department of Revenue — Record of Rights (RoR 7/12)
                  </h2>
                  <p className="text-slate-600 text-xs">
                    State Land Record Registry ({parcel.revenueRecords?.rorType})
                  </p>
                </div>
                <span className="gov-badge gov-badge-info">
                  Khata No: {parcel.revenueRecords?.khataNumber}
                </span>
              </div>

              {/* Ownership Share Table */}
              <div>
                <h3 className="font-bold text-[#103b66] text-xs mb-2 uppercase">Registered Owners (Khatedars)</h3>
                <div className="table-responsive">
                  <table className="gov-table">
                    <thead>
                      <tr>
                        <th>Khatedar Name</th>
                        <th>Relation</th>
                        <th>Address</th>
                        <th>Aadhaar Status</th>
                        <th>Share (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parcel.revenueRecords?.owners?.map((owner, idx) => (
                        <tr key={idx}>
                          <td className="font-bold text-slate-800">{owner.name}</td>
                          <td>{owner.relation}</td>
                          <td>{owner.address}</td>
                          <td>
                            {owner.aadhaarSeeded ? (
                              <span className="gov-badge gov-badge-success">Seeded ({owner.aadhaarMasked})</span>
                            ) : (
                              <span className="gov-badge gov-badge-danger">Not Seeded</span>
                            )}
                          </td>
                          <td className="font-bold text-[#103b66] font-mono">{owner.share}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Crop & Assessment */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Soil Classification</span>
                  <span className="font-bold text-slate-800">{parcel.revenueRecords?.soilClass}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Irrigation Source</span>
                  <span className="font-bold text-slate-800">{parcel.revenueRecords?.irrigationSource}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Crop Pattern</span>
                  <span className="font-bold text-slate-800">{parcel.revenueRecords?.cropPattern}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Annual Land Revenue</span>
                  <span className="font-bold text-emerald-800 font-mono">{parcel.revenueRecords?.landRevenueAssessment}</span>
                </div>
              </div>

              {/* Mutation History */}
              <div>
                <h3 className="font-bold text-[#103b66] text-xs mb-2 uppercase">Historical Mutation Orders (Namantaran)</h3>
                <div className="table-responsive">
                  <table className="gov-table">
                    <thead>
                      <tr>
                        <th>Mutation No</th>
                        <th>Order Date</th>
                        <th>Transfer Type</th>
                        <th>Order No & Officer</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parcel.revenueRecords?.mutationHistory?.map((mut, idx) => (
                        <tr key={idx}>
                          <td className="font-bold font-mono text-[#103b66]">{mut.mutationNo}</td>
                          <td>{formatDate(mut.date)}</td>
                          <td className="font-semibold">{mut.type}</td>
                          <td>Order: {mut.orderNo} ({mut.officer})</td>
                          <td><span className="gov-badge gov-badge-success">{mut.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SRO REGISTRATION DEEDS */}
          {dossierSubTab === 'registration' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#103b66] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    3. Sub-Registrar Office (SRO) — Registered Deeds & Index-II
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Registered Sale / Conveyance Deeds & Stamp Duty Records
                  </p>
                </div>
                <span className="gov-badge gov-badge-info">
                  Deed No: {parcel.registration?.deedNo}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Instrument Type</span>
                  <span className="font-bold text-slate-800">{parcel.registration?.deedType}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Registration SRO</span>
                  <span className="font-bold text-slate-800">{parcel.registration?.sroOffice}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Stamp Duty Paid</span>
                  <span className="font-bold text-emerald-800 font-mono">{parcel.registration?.stampDutyPaid}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Market Ready Reckoner</span>
                  <span className="font-bold text-slate-800 font-mono">{parcel.registration?.marketValuationGuideline}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[#103b66] text-xs uppercase">SRO Index-II Digital Integrity Certificate</h3>
                  <span className="gov-badge gov-badge-success">Encrypted Signature Verified</span>
                </div>
                <p className="text-slate-700 text-xs">
                  This registered deed is cryptographically bound to ULPIN {parcel.ulpin}, preventing double sales or illegal title transfers.
                </p>
                <div className="p-2 bg-white rounded border border-slate-300 font-mono text-xs flex items-center justify-between">
                  <span>Digital Signature: <strong className="text-[#103b66]">{parcel.registration?.digitalSignature}</strong></span>
                  <span>Date: {formatDate(parcel.registration?.registrationDate)}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MASTER PLAN ZONING */}
          {dossierSubTab === 'zoning' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#103b66] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-700" />
                    4. Town Planning Authority (Master Plan 2031)
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Permissible Land Use, Floor Area Ratio (FAR) & Building Height Limits
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Master Plan Name</span>
                  <span className="font-bold text-slate-800">{parcel.townPlanning?.masterPlanName}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Zoning Designation</span>
                  <span className="font-bold text-purple-800">{parcel.townPlanning?.zoningClassification}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Permissible FAR / FSI</span>
                  <span className="font-bold text-slate-800 font-mono">{parcel.townPlanning?.permissibleFAR}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Max Permissible Height</span>
                  <span className="font-bold text-emerald-800 font-mono">{parcel.townPlanning?.maxHeightMeters} Meters</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 font-bold block uppercase">Buffer & Environmental Restrictions:</span>
                  <p className="font-semibold text-amber-900 mt-0.5">{parcel.townPlanning?.bufferRestrictions}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block uppercase">NA Conversion Eligibility:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{parcel.townPlanning?.naConversionEligibility}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MUNICIPAL NOCs */}
          {dossierSubTab === 'building' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#103b66] flex items-center gap-2">
                    <Building className="w-4 h-4 text-teal-700" />
                    5. Municipal Corporation — Building Approvals & NOCs
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Online Building Permission System (OBPS) File & Clearances
                  </p>
                </div>
                <span className="gov-badge gov-badge-info">
                  File: {parcel.buildingPermissions?.fileNo}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Building Permit Status</span>
                  <span className="font-bold text-slate-900 text-sm">{parcel.buildingPermissions?.sanctionStatus}</span>
                </div>
                <span className={`gov-badge ${parcel.buildingPermissions?.sanctionStatus?.includes('Approved') || parcel.buildingPermissions?.sanctionStatus?.includes('Granted') ? 'gov-badge-success' : 'gov-badge-danger'}`}>
                  {parcel.buildingPermissions?.sanctionStatus?.split(' ')[0]}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-[#103b66] text-xs mb-2 uppercase">Statutory NOC Clearances</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Fire Services NOC</span>
                    <span className="font-bold text-slate-800">{parcel.buildingPermissions?.nocChecklist?.fireNoc}</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Pollution Control NOC</span>
                    <span className="font-bold text-slate-800">{parcel.buildingPermissions?.nocChecklist?.environmentalNoc}</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Aviation Height NOC</span>
                    <span className="font-bold text-slate-800">{parcel.buildingPermissions?.nocChecklist?.aviationNoc}</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Tree Authority NOC</span>
                    <span className="font-bold text-slate-800">{parcel.buildingPermissions?.nocChecklist?.treeAuthority}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PROPERTY TAX */}
          {dossierSubTab === 'tax' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#103b66] flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-amber-700" />
                    6. Municipal Property Tax & Assessment Ledger
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Property Tax Identification & Instant Settlement Gateway
                  </p>
                </div>
                <span className="gov-badge gov-badge-info">
                  Tax ID: {parcel.propertyTax?.taxAssessmentId}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Assessment Year</span>
                  <span className="font-bold text-slate-800 font-mono">{parcel.propertyTax?.currentAssessmentYear}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Annual Property Tax</span>
                  <span className="font-bold text-slate-800 font-mono">{formatCurrency(parcel.propertyTax?.annualTax)}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Outstanding Dues</span>
                  <span className={`font-bold font-mono ${parcel.propertyTax?.duesPending > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
                    {formatCurrency(parcel.propertyTax?.duesPending)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Status</span>
                  <span className={`font-bold ${parcel.propertyTax?.duesPending > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
                    {parcel.propertyTax?.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-blue-50 border border-blue-200 rounded">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-[#103b66] text-sm">Online Tax Payment Gateway</h3>
                    <p className="text-slate-700 text-xs mt-0.5">
                      {parcel.propertyTax?.duesPending > 0
                        ? `Pending tax dues of ${formatCurrency(parcel.propertyTax?.duesPending)} for FY ${parcel.propertyTax?.currentAssessmentYear}.`
                        : `Property tax cleared for FY ${parcel.propertyTax?.currentAssessmentYear}. Receipt No: ${parcel.propertyTax?.receiptNo}.`
                      }
                    </p>
                  </div>

                  {parcel.propertyTax?.duesPending > 0 ? (
                    <button
                      onClick={handleTaxPaymentClick}
                      disabled={isPayingTax}
                      className="gov-btn-orange text-xs py-2.5 px-6 shrink-0"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>{isPayingTax ? 'Processing...' : `Pay ${formatCurrency(parcel.propertyTax.duesPending)} Online`}</span>
                    </button>
                  ) : (
                    <span className="gov-badge gov-badge-success text-xs py-1.5 px-3">
                      ✓ Tax Paid Up To Date
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CERSAI BANK MORTGAGES */}
          {dossierSubTab === 'encumbrance' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#103b66] flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-700" />
                    7. Bank Mortgage & CERSAI Lien Registry
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Central Registry of Securitisation Asset Reconstruction & Security Interest
                  </p>
                </div>
                <span className="gov-badge gov-badge-info">
                  CERSAI: {parcel.encumbrance?.cersaiId}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Financial Charge Status</span>
                  <span className="font-bold text-slate-800">{parcel.encumbrance?.status}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Bank / Financial Inst.</span>
                  <span className="font-bold text-slate-800">{parcel.encumbrance?.bankName}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Loan Facility</span>
                  <span className="font-bold text-slate-800">{parcel.encumbrance?.loanType}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Sanctioned Lien Amount</span>
                  <span className="font-bold text-amber-800 font-mono">
                    {parcel.encumbrance?.sanctionedAmount > 0 ? formatCurrency(parcel.encumbrance?.sanctionedAmount) : 'Nil (Debt Free)'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <h3 className="font-bold text-[#103b66] text-xs uppercase">Non-Encumbrance Certificate (NEC) Status</h3>
                <p className="text-slate-700 text-xs mt-1">{parcel.encumbrance?.necEligibility}</p>
              </div>
            </div>
          )}

          {/* TAB 8: e-COURTS LITIGATION */}
          {dossierSubTab === 'litigation' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#103b66] flex items-center gap-2">
                    <Scale className="w-4 h-4 text-red-700" />
                    8. e-Courts & Title Injunction Risk Engine
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Cross-Query with National Judicial Data Grid (NJDG) & Revenue Tribunals
                  </p>
                </div>
                <span className={`gov-badge ${parcel.riskScore >= 80 ? 'gov-badge-success' : 'gov-badge-danger'}`}>
                  Title Score: {parcel.riskScore}/100
                </span>
              </div>

              {parcel.litigation?.hasLitigation ? (
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 border border-red-300 rounded text-red-900">
                    <div className="flex items-center space-x-2 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-red-700" />
                      <span>JUDICIAL RESTRAINING STAY ORDER ACTIVE</span>
                    </div>
                    <p className="text-xs text-red-800 mt-1">
                      SRO transaction and revenue mutation locks are active due to judicial injunction.
                    </p>
                  </div>

                  {parcel.litigation?.courtCases?.map((c, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-300 rounded space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-900 text-sm font-mono">{c.caseNumber}</span>
                          <span className="text-slate-600 text-xs block">{c.court}</span>
                        </div>
                        <span className="gov-badge gov-badge-danger">Stay Order Active</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200">
                        <div>
                          <span className="text-slate-500 block text-[10px]">Petitioner:</span>
                          <span className="font-bold text-slate-800">{c.petitioner}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Respondent:</span>
                          <span className="font-bold text-slate-800">{c.respondent}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500 block text-[10px]">Subject Matter:</span>
                          <span className="text-slate-800">{c.matter}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500 block text-[10px]">Injunction Status:</span>
                          <span className="text-red-700 font-bold">{c.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-emerald-50 border border-emerald-300 rounded text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <h3 className="font-bold text-slate-900 text-sm">Clean Title / Zero Active Court Stays</h3>
                  <p className="text-slate-700 text-xs max-w-lg mx-auto">
                    NJDG API Query verified. No civil stay orders or revenue caveats found against ULPIN {parcel.ulpin}.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 9: UTILITIES */}
          {dossierSubTab === 'utilities' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#103b66] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    Public Infrastructure & Utility Connections
                  </h2>
                  <p className="text-slate-600 text-xs">
                    State Electricity DISCOM, Water Board & Gas Network Sync
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
                  <span className="font-bold text-[#103b66] text-xs flex items-center gap-1">
                    <Zap className="w-4 h-4 text-amber-600" /> Electricity DISCOM
                  </span>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Provider:</span>
                    <span className="font-bold text-slate-800">{parcel.utilities?.electricity?.provider}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Consumer Number:</span>
                    <span className="font-mono font-bold text-[#103b66]">{parcel.utilities?.electricity?.consumerNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Sanctioned Load:</span>
                    <span className="font-mono text-slate-800">{parcel.utilities?.electricity?.sanctionedLoad}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
                  <span className="font-bold text-[#103b66] text-xs flex items-center gap-1">
                    <Building className="w-4 h-4 text-blue-700" /> Piped Water Works
                  </span>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Provider:</span>
                    <span className="font-bold text-slate-800">{parcel.utilities?.water?.provider}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Status:</span>
                    <span className="font-bold text-emerald-800">{parcel.utilities?.water?.status}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
                  <span className="font-bold text-[#103b66] text-xs flex items-center gap-1">
                    🔥 Natural Gas Network
                  </span>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Provider:</span>
                    <span className="font-bold text-slate-800">{parcel.utilities?.gas?.provider}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Status:</span>
                    <span className="text-slate-800">{parcel.utilities?.gas?.status}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

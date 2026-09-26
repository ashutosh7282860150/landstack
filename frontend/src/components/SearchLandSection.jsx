import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Layers, 
  FileText, 
  Building2, 
  CreditCard, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  ArrowRight,
  Filter,
  Globe,
  SlidersHorizontal,
  Compass,
  Award
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatCurrency, formatArea, getRiskBadgeColor, getLandUseBadge } from '../utils/formatters';

export const SearchLandSection = () => {
  const { 
    parcels, 
    selectedParcel, 
    setSelectedParcel, 
    selectParcel, 
    setActiveTab, 
    setIsBhuAadhaarModalOpen,
    toggleCompareParcel,
    compareList
  } = useLandStack();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluka, setSelectedTaluka] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedLandUse, setSelectedLandUse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // 1. Cascading States List
  const states = useMemo(() => {
    const s = new Set(parcels.map(p => p.location?.state).filter(Boolean));
    return Array.from(s).sort();
  }, [parcels]);

  // 2. Cascading Districts List
  const districts = useMemo(() => {
    let filtered = parcels;
    if (selectedState) {
      filtered = parcels.filter(p => p.location?.state === selectedState);
    }
    const d = new Set(filtered.map(p => p.location?.district).filter(Boolean));
    return Array.from(d).sort();
  }, [parcels, selectedState]);

  // 3. Cascading Blocks / Talukas List
  const talukas = useMemo(() => {
    let filtered = parcels;
    if (selectedState) {
      filtered = filtered.filter(p => p.location?.state === selectedState);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(p => p.location?.district === selectedDistrict);
    }
    const t = new Set(filtered.map(p => p.location?.taluka).filter(Boolean));
    return Array.from(t).sort();
  }, [parcels, selectedState, selectedDistrict]);

  // 4. Cascading Villages List
  const villages = useMemo(() => {
    let filtered = parcels;
    if (selectedState) {
      filtered = filtered.filter(p => p.location?.state === selectedState);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(p => p.location?.district === selectedDistrict);
    }
    if (selectedTaluka) {
      filtered = filtered.filter(p => p.location?.taluka === selectedTaluka);
    }
    const v = new Set(filtered.map(p => p.location?.village).filter(Boolean));
    return Array.from(v).sort();
  }, [parcels, selectedState, selectedDistrict, selectedTaluka]);

  // Filtered parcels
  const filteredParcels = useMemo(() => {
    return parcels.filter((parcel) => {
      const loc = parcel.location || {};

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesUlpin = parcel.ulpin?.toLowerCase().includes(q);
        const matchesBhuAadhaar = parcel.bhuAadhaar?.toLowerCase().includes(q);
        const matchesSurvey = parcel.surveyNo?.toLowerCase().includes(q);
        const matchesKhasra = parcel.khasraNo?.toLowerCase().includes(q);
        const matchesPlot = parcel.plotNo?.toLowerCase().includes(q);
        const matchesOwner = parcel.revenueRecords?.owners?.some(o => o.name.toLowerCase().includes(q));
        const matchesState = loc.state?.toLowerCase().includes(q);
        const matchesDistrict = loc.district?.toLowerCase().includes(q);
        const matchesTaluka = loc.taluka?.toLowerCase().includes(q);
        const matchesVillage = loc.village?.toLowerCase().includes(q);

        if (!matchesUlpin && !matchesBhuAadhaar && !matchesSurvey && !matchesKhasra && !matchesPlot && !matchesOwner && !matchesState && !matchesDistrict && !matchesTaluka && !matchesVillage) {
          return false;
        }
      }

      if (selectedState && loc.state !== selectedState) return false;
      if (selectedDistrict && loc.district !== selectedDistrict) return false;
      if (selectedTaluka && loc.taluka !== selectedTaluka) return false;
      if (selectedVillage && loc.village !== selectedVillage) return false;
      if (selectedLandUse !== 'All' && parcel.landUseCategory !== selectedLandUse) return false;
      if (selectedStatus === 'Clear' && parcel.litigation?.hasLitigation) return false;
      if (selectedStatus === 'Stayed' && !parcel.litigation?.hasLitigation) return false;

      return true;
    });
  }, [parcels, searchTerm, selectedState, selectedDistrict, selectedTaluka, selectedVillage, selectedLandUse, selectedStatus]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTaluka('');
    setSelectedVillage('');
    setSelectedLandUse('All');
    setSelectedStatus('All');
  };

  return (
    <div className="bg-transparent text-[#1f2937] min-h-screen py-6 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Ribbon */}
        <div className="gov-card p-6 bg-white/90 backdrop-blur-md border-l-4 border-l-[#103b66] shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold mb-1">
                <Compass className="w-4 h-4 text-[#103b66]" />
                <span>भू-अभिलेख खोज एवं चयन प्रणाली • National Land Search & Selection Gateway</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#103b66]">
                Select / Search Land Parcel (भू-चयन एवं खोज)
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Filter and select across all States, Districts, Blocks/Tehsils, and Villages or search by 14-Digit ULPIN, Survey Number, Khasra, or Landowner Name.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono font-bold text-slate-700 bg-white/70 backdrop-blur-sm px-3.5 py-2 rounded border border-slate-300">
              <span>Total Available: </span>
              <span className="text-[#103b66] text-sm">{filteredParcels.length} Parcels</span>
            </div>
          </div>
        </div>

        {/* Search & Location Filter Control Center */}
        <div className="gov-card p-6 bg-white/90 backdrop-blur-md border-t-2 border-t-[#103b66] space-y-4 shadow-xl">
          
          {/* Universal Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by 14-Digit ULPIN (e.g., IN-MH-PUN-2024-009871), Survey No, Khasra, Owner Name, Village..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-300 rounded text-xs font-mono text-slate-900 focus:outline-none focus:border-[#103b66] focus:bg-white transition-colors"
            />
          </div>

          {/* Cascading State -> District -> Block -> Village Hierarchy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">State / राज्य</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('');
                  setSelectedTaluka('');
                  setSelectedVillage('');
                }}
                className="w-full px-2.5 py-2 bg-white/90 border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:border-[#103b66] focus:outline-none"
              >
                <option value="">All States ({states.length})</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">District / जिला</label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedTaluka('');
                  setSelectedVillage('');
                }}
                className="w-full px-2.5 py-2 bg-white/90 border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:border-[#103b66] focus:outline-none"
              >
                <option value="">All Districts ({districts.length})</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Block / Tehsil / तहसील</label>
              <select
                value={selectedTaluka}
                onChange={(e) => {
                  setSelectedTaluka(e.target.value);
                  setSelectedVillage('');
                }}
                className="w-full px-2.5 py-2 bg-white/90 border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:border-[#103b66] focus:outline-none"
              >
                <option value="">All Blocks / Tehsils ({talukas.length})</option>
                {talukas.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Village / गांव</label>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full px-2.5 py-2 bg-white/90 border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:border-[#103b66] focus:outline-none"
              >
                <option value="">All Villages ({villages.length})</option>
                {villages.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

          </div>

          {/* Categorical Filters & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600">Filters:</span>
              
              <select
                value={selectedLandUse}
                onChange={(e) => setSelectedLandUse(e.target.value)}
                className="px-2.5 py-1 bg-slate-100 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none"
              >
                <option value="All">All Land Uses</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Industrial">Industrial</option>
                <option value="Institutional">Institutional</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2.5 py-1 bg-slate-100 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none"
              >
                <option value="All">All Title Statuses</option>
                <option value="Clear">Clear Title Only</option>
                <option value="Stayed">Court Stay Flagged</option>
              </select>
            </div>

            {(searchTerm || selectedState || selectedDistrict || selectedTaluka || selectedVillage || selectedLandUse !== 'All' || selectedStatus !== 'All') && (
              <button
                onClick={handleReset}
                className="text-amber-800 hover:text-amber-900 font-bold underline text-xs"
              >
                Reset All Filters
              </button>
            )}
          </div>

        </div>

        {/* Parcels Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParcels.map((p) => {
            const isSelected = selectedParcel?.ulpin === p.ulpin;
            const isCompared = compareList.some(item => item.ulpin === p.ulpin);
            const isStayed = p.litigation?.hasLitigation;

            return (
              <div 
                key={p.ulpin}
                className={`gov-card p-5 bg-white/90 backdrop-blur-md transition-all flex flex-col justify-between border-2 hover:shadow-2xl hover:-translate-y-0.5 ${
                  isSelected ? 'border-[#103b66] ring-2 ring-blue-200 shadow-xl' : 'border-white/60 hover:border-[#103b66] shadow-lg'
                }`}
              >
                <div>
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-blue-100 text-[#103b66] border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {p.landUseCategory}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isStayed 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {isStayed ? 'Court Stay' : 'Clear Title'}
                    </span>
                  </div>

                  {/* ULPIN & Location */}
                  <h3 className="font-mono font-bold text-sm text-slate-900 truncate">
                    {p.ulpin}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">
                    {p.location.village}, {p.location.taluka}, {p.location.district}, {p.location.state}
                  </p>

                  {/* Metadata Matrix */}
                  <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-slate-100/80 border border-slate-200 rounded text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Survey / Khasra:</span>
                      <span className="font-mono font-bold text-slate-800">{p.surveyNo}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Land Area:</span>
                      <span className="font-mono font-bold text-emerald-700">{p.spatialAttributes?.areaAcres} Acres</span>
                    </div>
                    <div className="col-span-2 border-t border-slate-200 pt-1.5 mt-0.5">
                      <span className="text-[10px] text-slate-500 block">Primary Owner:</span>
                      <span className="font-bold text-slate-800 truncate block">
                        {p.revenueRecords?.owners?.[0]?.name || 'N/A'}
                      </span>
                    </div>
                    {p.valuation && (
                      <div className="col-span-2">
                        <span className="text-[10px] text-slate-500 block">Ready Reckoner Valuation:</span>
                        <span className="font-bold text-[#103b66] font-mono">
                          ₹ {(p.valuation.readyReckonerValue / 10000000).toFixed(2)} Cr
                        </span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        selectParcel(p, 'overview');
                      }}
                      className="gov-btn-primary text-xs py-1.5 justify-center font-bold"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>8-in-1 Dossier</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedParcel(p);
                        setActiveTab('map');
                      }}
                      className="gov-btn-secondary text-xs py-1.5 justify-center font-bold"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#103b66]" />
                      <span>View on Map</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedParcel(p);
                        setActiveTab('documents');
                      }}
                      className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-300 text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>All Documents</span>
                    </button>
                    <button
                      onClick={() => toggleCompareParcel(p)}
                      className={`py-1.5 rounded border text-xs font-semibold flex items-center justify-center space-x-1 transition-colors ${
                        isCompared 
                          ? 'bg-blue-100 text-[#103b66] border-blue-300 font-bold' 
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5 text-amber-700" />
                      <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { 
  X, 
  Layers, 
  FileText, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  Scale, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Building,
  CreditCard,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatCurrency, formatArea, getRiskBadgeColor, getLandUseBadge } from '../utils/formatters';

export const MapParcelModal = ({ parcel, onClose }) => {
  const { 
    selectParcel, 
    setIsBhuAadhaarModalOpen, 
    toggleCompareParcel, 
    compareList,
    setSelectedParcel
  } = useLandStack();

  if (!parcel) return null;

  const riskBadge = getRiskBadgeColor(parcel.riskScore);
  const landUseBadge = getLandUseBadge(parcel.landUseCategory);
  const isCompared = compareList.some(p => p.ulpin === parcel.ulpin);
  const areaInfo = formatArea(parcel.spatialAttributes?.areaHectares);

  const handleOpenDossier = () => {
    selectParcel(parcel, 'overview');
  };

  const handleOpenPassbook = () => {
    setSelectedParcel(parcel);
    setIsBhuAadhaarModalOpen(true);
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-2xl shadow-2xl z-[1000] p-4 text-xs text-slate-200 animate-in fade-in slide-in-from-bottom duration-300">
      
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-3">
        <div>
          <div className="flex items-center space-x-1.5 mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${landUseBadge.bg} ${landUseBadge.text} ${landUseBadge.border}`}>
              {parcel.landUseCategory}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${riskBadge.bg} ${riskBadge.text} ${riskBadge.border}`}>
              Score: {parcel.riskScore}/100
            </span>
          </div>
          <h3 className="text-sm font-extrabold text-white font-mono tracking-tight">
            {parcel.ulpin}
          </h3>
          <p className="text-[11px] text-slate-400">
            {parcel.location.village}, {parcel.location.district}, {parcel.location.state}
          </p>
        </div>

        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Spatial & Owner Quick Matrix */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
          <span className="text-[10px] text-slate-400 block">Survey / Khasra No:</span>
          <span className="font-bold text-white text-xs font-mono">{parcel.surveyNo}</span>
        </div>

        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
          <span className="text-[10px] text-slate-400 block">Cadastral Area:</span>
          <span className="font-bold text-emerald-400 text-xs font-mono">{areaInfo.acres} ({areaInfo.hectares})</span>
        </div>

        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 col-span-2">
          <span className="text-[10px] text-slate-400 block">Primary Registered Owner:</span>
          <span className="font-semibold text-slate-200 text-xs truncate block">
            {parcel.revenueRecords?.owners?.[0]?.name || 'N/A'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Share: {parcel.revenueRecords?.owners?.[0]?.share}% • Aadhaar: {parcel.revenueRecords?.owners?.[0]?.aadhaarMasked}
          </span>
        </div>
      </div>

      {/* Linked Status Snapshot */}
      <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/60 mb-3 space-y-1.5 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <Building className="w-3 h-3 text-blue-400" /> Zoning:
          </span>
          <span className="text-slate-200 font-medium truncate max-w-[170px] text-right">
            {parcel.townPlanning?.zoningClassification?.split('(')[0]}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <CreditCard className="w-3 h-3 text-amber-400" /> Encumbrance:
          </span>
          <span className="text-slate-200 font-medium truncate max-w-[170px] text-right">
            {parcel.encumbrance?.status?.split('(')[0]}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <Scale className="w-3 h-3 text-red-400" /> Court Stay:
          </span>
          <span className={`font-bold ${parcel.litigation?.hasLitigation ? 'text-red-400' : 'text-emerald-400'}`}>
            {parcel.litigation?.hasLitigation ? 'ACTIVE STAY' : 'None (Clear)'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={handleOpenDossier}
          className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>View 8-in-1 Unified Dossier</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleOpenPassbook}
            className="py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white rounded-lg border border-slate-700 flex items-center justify-center space-x-1 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>Bhu-Aadhaar QR</span>
          </button>

          <button
            onClick={() => toggleCompareParcel(parcel)}
            className={`py-1.5 rounded-lg border flex items-center justify-center space-x-1 transition-colors ${
              isCompared 
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' 
                : 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border-slate-700'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>{isCompared ? 'Comparing' : 'Compare'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};

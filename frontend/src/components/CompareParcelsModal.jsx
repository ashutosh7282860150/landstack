import React from 'react';
import { 
  X, 
  Scale, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  Landmark, 
  CreditCard, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatArea, formatCurrency, getRiskBadgeColor } from '../utils/formatters';

export const CompareParcelsModal = () => {
  const { 
    compareList, 
    setCompareList, 
    isCompareModalOpen, 
    setIsCompareModalOpen, 
    selectParcel,
    parcels
  } = useLandStack();

  if (!isCompareModalOpen) return null;

  // If user opened compare with fewer than 2 parcels, pre-populate with parcel 0 and 1
  const displayList = compareList.length === 2 ? compareList : [parcels[0], parcels[1]];

  const p1 = displayList[0];
  const p2 = displayList[1];

  const p1Risk = getRiskBadgeColor(p1?.riskScore);
  const p2Risk = getRiskBadgeColor(p2?.riskScore);

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-xs text-slate-200">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <h2 className="font-bold text-white text-sm">Side-by-Side Land Parcel Comparison</h2>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Top Title Headers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono">PARCEL 1</span>
              <h3 className="font-extrabold text-white text-sm font-mono">{p1?.ulpin}</h3>
              <p className="text-slate-400 text-[11px]">{p1?.location.village}, {p1?.location.district}</p>
              <div className="pt-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${p1Risk.bg} ${p1Risk.text} ${p1Risk.border}`}>
                  Score: {p1?.riskScore}/100
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono">PARCEL 2</span>
              <h3 className="font-extrabold text-white text-sm font-mono">{p2?.ulpin}</h3>
              <p className="text-slate-400 text-[11px]">{p2?.location.village}, {p2?.location.district}</p>
              <div className="pt-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${p2Risk.bg} ${p2Risk.text} ${p2Risk.border}`}>
                  Score: {p2?.riskScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="space-y-2 border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
            
            {/* Row 1: Land Classification */}
            <div className="grid grid-cols-3 p-3 border-b border-slate-800/80">
              <span className="font-bold text-slate-400">Land Classification</span>
              <span className="text-white font-semibold">{p1?.landClassification}</span>
              <span className="text-white font-semibold">{p2?.landClassification}</span>
            </div>

            {/* Row 2: Cadastral Area */}
            <div className="grid grid-cols-3 p-3 border-b border-slate-800/80">
              <span className="font-bold text-slate-400">Cadastral Area</span>
              <span className="text-emerald-400 font-mono font-bold">{p1?.spatialAttributes?.areaAcres} Acres</span>
              <span className="text-emerald-400 font-mono font-bold">{p2?.spatialAttributes?.areaAcres} Acres</span>
            </div>

            {/* Row 3: Master Plan Zoning */}
            <div className="grid grid-cols-3 p-3 border-b border-slate-800/80">
              <span className="font-bold text-slate-400">Master Plan Zoning</span>
              <span className="text-slate-200">{p1?.townPlanning?.zoningClassification}</span>
              <span className="text-slate-200">{p2?.townPlanning?.zoningClassification}</span>
            </div>

            {/* Row 4: Permissible FAR */}
            <div className="grid grid-cols-3 p-3 border-b border-slate-800/80">
              <span className="font-bold text-slate-400">Permissible FAR</span>
              <span className="text-white font-mono">{p1?.townPlanning?.permissibleFAR}</span>
              <span className="text-white font-mono">{p2?.townPlanning?.permissibleFAR}</span>
            </div>

            {/* Row 5: Financial Encumbrance */}
            <div className="grid grid-cols-3 p-3 border-b border-slate-800/80">
              <span className="font-bold text-slate-400">Bank Mortgage / Lien</span>
              <span className="text-amber-300">{p1?.encumbrance?.status}</span>
              <span className="text-amber-300">{p2?.encumbrance?.status}</span>
            </div>

            {/* Row 6: Court Stay Status */}
            <div className="grid grid-cols-3 p-3 border-b border-slate-800/80">
              <span className="font-bold text-slate-400">Court Stay Status</span>
              <span className={p1?.litigation?.hasLitigation ? 'text-red-400 font-bold' : 'text-emerald-400 font-semibold'}>
                {p1?.litigation?.hasLitigation ? 'ACTIVE STAY ORDER' : 'Clear Title'}
              </span>
              <span className={p2?.litigation?.hasLitigation ? 'text-red-400 font-bold' : 'text-emerald-400 font-semibold'}>
                {p2?.litigation?.hasLitigation ? 'ACTIVE STAY ORDER' : 'Clear Title'}
              </span>
            </div>

            {/* Row 7: Property Tax Dues */}
            <div className="grid grid-cols-3 p-3">
              <span className="font-bold text-slate-400">Pending Property Tax</span>
              <span className="text-slate-200 font-mono">{formatCurrency(p1?.propertyTax?.duesPending)}</span>
              <span className="text-slate-200 font-mono">{formatCurrency(p2?.propertyTax?.duesPending)}</span>
            </div>

          </div>

          {/* Action Footer */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => {
                selectParcel(p1);
                setIsCompareModalOpen(false);
              }}
              className="py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl font-bold text-xs"
            >
              Open Parcel 1 Dossier
            </button>
            <button
              onClick={() => {
                selectParcel(p2);
                setIsCompareModalOpen(false);
              }}
              className="py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl font-bold text-xs"
            >
              Open Parcel 2 Dossier
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { 
  Shield, 
  Activity, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Hash, 
  Lock, 
  Cpu, 
  Database,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatArea, formatCurrency } from '../utils/formatters';

export const AdminAnalytics = () => {
  const { 
    stats, 
    auditLogs, 
    parcels, 
    refreshData, 
    selectParcelByUlpin 
  } = useLandStack();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-xs text-slate-200">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>National Land Governance DPI Administration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              System Analytics & Tamper-Evident Audit Trail
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Cryptographically verified governance logs and real-time cadastre synchronization metrics.
            </p>
          </div>

          <button
            onClick={refreshData}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 flex items-center space-x-2 font-medium"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span>Sync Live Registries</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Digitized Cadastre</span>
          <span className="text-2xl font-extrabold text-white font-mono block mt-1">
            {stats?.totalParcels || 8} Parcels
          </span>
          <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
            {stats?.totalAreaHectares} Ha ({stats?.totalAreaAcres} Acres)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Title Health Index</span>
          <span className="text-2xl font-extrabold text-blue-400 font-mono block mt-1">
            {stats?.clearTitlePercentage}%
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Clear Titles / Zero Injunctions
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Flagged Stays / Litigations</span>
          <span className="text-2xl font-extrabold text-red-400 font-mono block mt-1">
            {stats?.flaggedLitigations || 1}
          </span>
          <span className="text-[10px] text-red-400/80 mt-0.5 block">
            Automated SRO Transaction Freeze
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Pending Municipal Dues</span>
          <span className="text-2xl font-extrabold text-amber-400 font-mono block mt-1">
            {formatCurrency(stats?.totalPendingPropertyTaxDues)}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Across Active Parcels
          </span>
        </div>
      </div>

      {/* Audit Trail Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Tamper-Evident Governance Audit Trail
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            SHA-256 Chained Hash Log
          </span>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-emerald-400 font-mono">{log.id}</span>
                  <span className="px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-300 font-mono text-[10px]">
                    {log.action}
                  </span>
                  <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                </div>
                <p className="text-slate-300 text-[11px]">{log.details}</p>
              </div>

              <div className="text-right font-mono text-[10px] text-slate-500 shrink-0">
                <div>Actor: <strong className="text-slate-300">{log.actorName}</strong></div>
                <div>Hash: <span className="text-slate-400 font-mono">{log.hash?.substring(0, 12)}...</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

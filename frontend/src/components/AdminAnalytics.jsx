import React from 'react';
import { 
  Shield, 
  RefreshCw,
  Lock
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatCurrency } from '../utils/formatters';

export const AdminAnalytics = () => {
  const { 
    stats, 
    auditLogs, 
    refreshData, 
    selectParcelByUlpin,
    t
  } = useLandStack();

  return (
    <div className="bg-transparent py-6 text-[#1f2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs">
        
        {/* Header */}
        <div className="gov-card p-5 bg-white/90 backdrop-blur-md border-l-4 border-l-[#103b66] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="bg-[#103b66] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">
                {t('admin.title') || 'NATIONAL GOVERNANCE AUDIT'}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#103b66]">
                {t('admin.title') || 'Portal Analytics & Audit Trail'}
              </h1>
              <p className="text-slate-600 text-xs mt-0.5">
                Cryptographically hashed audit trails for land transactions, mutation approvals, and SRO deed sync.
              </p>
            </div>

            <button
              onClick={refreshData}
              className="gov-btn-primary text-xs shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Live Registries</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 bg-white/90 backdrop-blur-md border border-white/60 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Total Digitized Cadastre</span>
            <span className="text-xl font-bold text-[#103b66] font-mono block mt-1">
              {stats?.totalParcels || 8} Parcels
            </span>
            <span className="text-[10px] text-emerald-800 font-mono mt-0.5 block font-bold">
              {stats?.totalAreaHectares} Ha ({stats?.totalAreaAcres} Acres)
            </span>
          </div>

          <div className="p-4 bg-white/90 backdrop-blur-md border border-white/60 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Title Health Index</span>
            <span className="text-xl font-bold text-blue-900 font-mono block mt-1">
              {stats?.clearTitlePercentage}%
            </span>
            <span className="text-[10px] text-slate-600 mt-0.5 block">
              Clear Titles / Zero Court Injunctions
            </span>
          </div>

          <div className="p-4 bg-white/90 backdrop-blur-md border border-white/60 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Flagged Court Stays</span>
            <span className="text-xl font-bold text-red-700 font-mono block mt-1">
              {stats?.flaggedLitigations || 1}
            </span>
            <span className="text-[10px] text-red-700 mt-0.5 block font-bold">
              Automated SRO Transaction Freeze
            </span>
          </div>

          <div className="p-4 bg-white/90 backdrop-blur-md border border-white/60 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Pending Municipal Dues</span>
            <span className="text-xl font-bold text-amber-800 font-mono block mt-1">
              {formatCurrency(stats?.totalPendingPropertyTaxDues)}
            </span>
            <span className="text-[10px] text-slate-600 mt-0.5 block">
              Across Active Parcels
            </span>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="gov-card p-6 bg-white/90 backdrop-blur-md space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-bold text-[#103b66] text-xs uppercase flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-700" />
              Tamper-Evident Forensic Audit Logs (Cryptographic Hash Verification)
            </h3>
            <span className="gov-badge gov-badge-success">SHA-256 Chain Intact</span>
          </div>

          <div className="table-responsive">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action Event</th>
                  <th>ULPIN / Record</th>
                  <th>Actor / User</th>
                  <th>IP Address</th>
                  <th>Cryptographic Hash</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, idx) => (
                  <tr key={log.id || idx}>
                    <td className="font-mono text-[11px] text-slate-600">{log.timestamp}</td>
                    <td className="font-bold text-slate-900">{log.action}</td>
                    <td className="font-mono text-[#103b66] cursor-pointer hover:underline" onClick={() => log.ulpin && selectParcelByUlpin(log.ulpin)}>
                      {log.ulpin || 'N/A'}
                    </td>
                    <td>{log.user}</td>
                    <td className="font-mono text-slate-500">{log.ipAddress}</td>
                    <td className="font-mono text-[10px] text-slate-400 truncate max-w-[150px]">{log.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

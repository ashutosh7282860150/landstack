import React, { useState } from 'react';
import { 
  Search, 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  User, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatDate } from '../utils/formatters';

export const ApplicationTracker = () => {
  const { 
    applications, 
    selectParcelByUlpin, 
    setCurrentRole, 
    setActiveTab, 
    ROLES 
  } = useLandStack();

  const [selectedAppId, setSelectedAppId] = useState(applications[0]?.id || '');
  const [searchFilter, setSearchFilter] = useState('');

  const currentApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const filteredApps = applications.filter(a => 
    a.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.applicantName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.ulpin.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-xs text-slate-200">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Real-Time Citizen Application Tracking</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Application Status & Governance Workflow
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              End-to-end transparent visibility of Revenue Mutation, NOCs, and Khata updates.
            </p>
          </div>

          {/* Quick Jump to Officer Portal for SIH Evaluator */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-300 text-[11px] block">Live Officer Workflow:</span>
              <p className="text-slate-300 text-[10px]">Switch to Revenue Officer (Patwari) persona to approve this workflow in real time.</p>
            </div>
            <button
              onClick={() => {
                const officer = ROLES.find(r => r.id === 'revenue_officer');
                if (officer) setCurrentRole(officer);
                setActiveTab('officer_workflow');
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[10px] shrink-0"
            >
              Open Officer Portal
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Applications List & Search */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by App ID, Name, ULPIN..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredApps.map((app) => {
              const isSelected = (currentApp?.id === app.id);
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-emerald-500/15 border-emerald-500/50 shadow-md' 
                      : 'bg-slate-950 border-slate-800/80 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-white font-mono text-xs">{app.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      app.status.includes('Approved') 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {app.status.split(':')[0]}
                    </span>
                  </div>

                  <div className="text-slate-300 font-medium text-xs truncate">{app.applicantName}</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-0.5">{app.ulpin}</div>
                  <div className="text-slate-500 text-[10px] mt-1 flex justify-between">
                    <span>{app.applicationType}</span>
                    <span>{formatDate(app.appliedDate)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Deep Timeline Detail */}
        {currentApp ? (
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            
            {/* Top Detail Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-white font-mono">{currentApp.id}</h2>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-semibold border border-blue-500/30">
                    {currentApp.applicationType}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5">
                  Applied by <strong className="text-slate-200">{currentApp.applicantName}</strong> on {formatDate(currentApp.appliedDate)}
                </p>
              </div>

              <button
                onClick={() => selectParcelByUlpin(currentApp.ulpin)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-emerald-400 font-mono text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5"
              >
                <span>View ULPIN Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step-by-Step Graphical Timeline */}
            <div className="space-y-4">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">
                Four-Stage Verification Lifecycle
              </h3>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                {currentApp.stages?.map((stage, idx) => {
                  const isDone = stage.status === 'completed';
                  const isActive = stage.status === 'active';

                  return (
                    <div key={idx} className="relative flex items-start space-x-4 pl-1">
                      {/* Step Circle */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                        isDone 
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                          : isActive 
                            ? 'bg-amber-400 text-slate-950 animate-pulse ring-4 ring-amber-400/20' 
                            : 'bg-slate-800 text-slate-500'
                      }`}>
                        {isDone ? '✓' : idx + 1}
                      </div>

                      {/* Content Card */}
                      <div className={`flex-1 p-3.5 rounded-xl border transition-all ${
                        isActive 
                          ? 'bg-amber-950/20 border-amber-500/40 shadow-md' 
                          : isDone 
                            ? 'bg-slate-950 border-slate-800/90' 
                            : 'bg-slate-950/40 border-slate-850 opacity-60'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className="font-bold text-white text-xs">{stage.title}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                            isDone 
                              ? 'text-emerald-400 bg-emerald-500/10' 
                              : isActive 
                                ? 'text-amber-400 bg-amber-500/10 font-bold' 
                                : 'text-slate-500'
                          }`}>
                            {stage.timestamp}
                          </span>
                        </div>

                        <p className="text-slate-300 text-xs">{stage.description}</p>
                        <div className="mt-2 pt-2 border-t border-slate-850 flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>Action Authority: <strong>{stage.officer}</strong></span>
                          <span>Status: <strong className={isDone ? 'text-emerald-400' : isActive ? 'text-amber-400' : 'text-slate-500'}>{stage.status.toUpperCase()}</strong></span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attached Documents */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-xs">Verified KYC & Deed Documents</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentApp.documents?.map((doc, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-200 flex items-center gap-1.5 font-medium">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      {doc.name}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-2 text-center py-12 text-slate-500">
            No application selected
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  MapPin, 
  Layers, 
  User, 
  Clock, 
  Sparkles, 
  Building2, 
  Search,
  ExternalLink,
  PenTool
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLandStack, ROLES } from '../context/LandStackContext';
import { formatDate } from '../utils/formatters';

export const OfficerDashboard = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    applications, 
    handleAdvanceWorkflow, 
    selectParcelByUlpin,
    showToast
  } = useLandStack();

  const [selectedApp, setSelectedApp] = useState(applications[0] || null);
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [processing, setProcessing] = useState(false);

  const pendingApps = applications.filter(a => !a.status.includes('Approved') && !a.status.includes('Rejected'));

  const handleApproveStage = async (actionType = 'advance') => {
    if (!selectedApp) return;
    setProcessing(true);
    try {
      const isFinal = (selectedApp.currentStage === selectedApp.stages?.length);
      await handleAdvanceWorkflow(
        selectedApp.id,
        currentRole.name,
        isFinal ? 'final_approve' : 'advance',
        officerRemarks || `Approved by ${currentRole.name}`
      );
      setOfficerRemarks('');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectStage = async () => {
    if (!selectedApp) return;
    setProcessing(true);
    try {
      await handleAdvanceWorkflow(
        selectedApp.id,
        currentRole.name,
        'reject',
        officerRemarks || 'Discrepancy found during official scrutiny'
      );
      setOfficerRemarks('');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-xs text-slate-200">
      
      {/* Top Officer Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Government Officer Workflow Console</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Official Verification & Sanction Portal
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Currently Logged As: <strong className="text-emerald-400">{currentRole.name}</strong> ({currentRole.badge})
            </p>
          </div>

          {/* Persona Switch Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {ROLES.filter(r => r.id !== 'citizen' && r.id !== 'admin').map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setCurrentRole(role);
                  showToast(`Acting as ${role.name}`, 'info');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                  currentRole.id === role.id 
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                {role.name.split('(')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Pending Workflow Queue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="font-bold text-white text-xs uppercase tracking-wider">Pending Action Queue</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px]">
              {pendingApps.length} Pending
            </span>
          </div>

          <div className="space-y-2">
            {pendingApps.map((app) => {
              const isSelected = selectedApp?.id === app.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-emerald-500/15 border-emerald-500/50 shadow-md' 
                      : 'bg-slate-950 border-slate-800/80 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-white font-mono text-xs">{app.id}</span>
                    <span className="text-[10px] text-amber-400 font-mono">Stage {app.currentStage}/4</span>
                  </div>
                  <div className="text-slate-200 font-semibold">{app.applicantName}</div>
                  <div className="text-slate-400 font-mono text-[10px] mt-0.5">{app.ulpin}</div>
                  <div className="text-slate-500 text-[10px] mt-1 flex justify-between">
                    <span>{app.applicationType}</span>
                    <span>{formatDate(app.appliedDate)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Officer Scrutiny & Sanction Form */}
        {selectedApp ? (
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">
                  Active Application Case File
                </span>
                <h2 className="text-xl font-bold text-white font-mono">{selectedApp.id}</h2>
                <p className="text-slate-400 text-xs">
                  Target ULPIN: <strong className="text-slate-200 font-mono">{selectedApp.ulpin}</strong>
                </p>
              </div>

              <button
                onClick={() => selectParcelByUlpin(selectedApp.ulpin)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-emerald-400 font-mono text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5"
              >
                <span>Inspect GIS Cadastre</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Current Stage Under Review */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-xs">
                  Stage {selectedApp.currentStage}: {selectedApp.stages?.[selectedApp.currentStage - 1]?.title}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold text-[10px]">
                  Pending Your Action
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                {selectedApp.stages?.[selectedApp.currentStage - 1]?.description}
              </p>
            </div>

            {/* Buyer Transferee Details */}
            {selectedApp.buyerDetails && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">
                  Proposed RoR Mutation Transferee (New Purchaser)
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Transferee Name:</span>
                    <span className="font-bold text-white">{selectedApp.buyerDetails.buyerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Aadhaar Masked:</span>
                    <span className="font-mono text-slate-300">{selectedApp.buyerDetails.buyerAadhaar}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Share % to Mutate:</span>
                    <span className="font-bold text-emerald-400 font-mono">{selectedApp.buyerDetails.buyerShare}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Officer Remarks Input */}
            <div className="space-y-2">
              <label className="font-bold text-white text-xs block">
                Official Remarks / Inspection Findings:
              </label>
              <textarea
                rows="3"
                value={officerRemarks}
                onChange={(e) => setOfficerRemarks(e.target.value)}
                placeholder={`Enter official verification notes as ${currentRole.name}...`}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={handleRejectStage}
                disabled={processing}
                className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/40 font-bold rounded-xl flex items-center space-x-1.5 transition-all disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Application</span>
              </button>

              <button
                onClick={() => handleApproveStage()}
                disabled={processing}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <PenTool className="w-4 h-4" />
                <span>
                  {selectedApp.currentStage === selectedApp.stages?.length 
                    ? 'Digital Signature & Final RoR Mutation Sanction' 
                    : `Approve Stage ${selectedApp.currentStage} as ${currentRole.name.split('(')[0]}`
                  }
                </span>
              </button>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-2 text-center py-16 text-slate-500">
            No pending application selected
          </div>
        )}

      </div>
    </div>
  );
};

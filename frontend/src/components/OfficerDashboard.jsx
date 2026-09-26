import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
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
    showToast,
    t
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
    <div className="bg-transparent py-6 text-[#1f2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs">
        
        {/* Header */}
        <div className="gov-card p-5 bg-white/90 backdrop-blur-md border-l-4 border-l-[#103b66] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="bg-[#103b66] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">
                {t('officer.title') || 'OFFICER SANCTION WORKFLOW'}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#103b66]">
                {t('officer.title') || 'Official Verification & Sanction Portal'}
              </h1>
              <p className="text-slate-600 text-xs mt-0.5">
                {t('officer.currentlyLogged') || 'Currently Logged As:'} <strong className="text-[#103b66] font-bold">{currentRole.name}</strong> ({currentRole.badge})
              </p>
            </div>

            {/* Officer Persona Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white/70 backdrop-blur-sm p-1.5 rounded border border-slate-300">
              <span className="text-[10px] text-slate-600 font-bold uppercase mr-1">Switch Officer Role:</span>
              {ROLES.filter(r => r.id !== 'citizen' && r.id !== 'admin').map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setCurrentRole(role);
                    showToast(`Switched officer role to: ${role.name}`, 'info');
                  }}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                    currentRole.id === role.id ? 'bg-[#103b66] text-white' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {role.name.split('(')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Applications Queue */}
          <div className="gov-card p-4 bg-white/90 backdrop-blur-md space-y-3 shadow-lg">
            <h3 className="font-bold text-[#103b66] text-xs uppercase border-b border-slate-200 pb-2">
              लंबित नामांतरण फाइलें (Pending Verification Queue: {pendingApps.length})
            </h3>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {pendingApps.map((app) => {
                const isSelected = (selectedApp?.id === app.id);
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-3 rounded border cursor-pointer transition-all hover:-translate-y-0.5 ${isSelected ? 'border-2 border-[#103b66] bg-blue-50/70 shadow-md' : 'border-white/60 bg-white/60 hover:bg-white/80 hover:shadow-md'}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono font-bold text-[#103b66] text-xs">{app.id}</span>
                      <span className="gov-badge gov-badge-warning">{app.status}</span>
                    </div>
                    <div className="font-bold text-slate-900 mt-1">{app.applicantName}</div>
                    <div className="text-slate-600 text-[11px] font-mono mt-0.5">ULPIN: {app.ulpin}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Officer Scrutiny Panel */}
          {selectedApp && (
            <div className="lg:col-span-2 gov-card p-6 bg-white/90 backdrop-blur-md space-y-6 shadow-xl">
              
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-[#103b66] text-xs">File Ack: {selectedApp.id}</span>
                  <h2 className="text-base font-bold text-slate-900">
                    Applicant: {selectedApp.applicantName} ({selectedApp.applicantPhone})
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Target ULPIN: <strong className="font-mono text-[#103b66]">{selectedApp.ulpin}</strong>
                  </p>
                </div>

                <button
                  onClick={() => selectParcelByUlpin(selectedApp.ulpin, 'revenue')}
                  className="gov-btn-secondary text-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#103b66]" />
                  <span>Inspect Cadastre 7/12</span>
                </button>
              </div>

              {/* Verified Checklist */}
              <div className="p-4 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 rounded space-y-2">
                <h3 className="font-bold text-[#103b66] uppercase text-xs">Automated Pre-Scrutiny System Checks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-2 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>ULPIN Spatial Cadastre Match: 100% Valid</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>SRO Index-II Deed Digital Signature: Verified</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>CERSAI Bank Mortgage Lien: Clear (Debt Free)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>e-Courts NJDG Injunction Search: 0 Active Stays</span>
                  </div>
                </div>
              </div>

              {/* Official Action Form */}
              <div className="p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded space-y-3">
                <h3 className="font-bold text-[#103b66] uppercase text-xs flex items-center gap-1.5">
                  <PenTool className="w-4 h-4 text-amber-700" />
                  Official Sanction & e-Sign Decision
                </h3>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">Official Remarks / Field Verification Note *</label>
                  <textarea
                    rows="2"
                    value={officerRemarks}
                    onChange={(e) => setOfficerRemarks(e.target.value)}
                    placeholder={`Enter officer scrutiny note for ${currentRole.name}...`}
                    className="gov-input"
                  ></textarea>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <button
                    onClick={handleRejectStage}
                    disabled={processing}
                    className="gov-btn-secondary text-xs text-red-700 border-red-400 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 text-red-700" />
                    <span>Reject Application</span>
                  </button>

                  <button
                    onClick={() => handleApproveStage('advance')}
                    disabled={processing}
                    className="gov-btn-primary text-xs py-2 px-5"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{processing ? 'Processing e-Sign...' : `Sanction & Approve as ${currentRole.name}`}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Search, 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatDate } from '../utils/formatters';

export const ApplicationTracker = () => {
  const { 
    applications, 
    selectParcelByUlpin, 
    setCurrentRole, 
    setActiveTab, 
    ROLES,
    t
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
    <div className="bg-transparent py-6 text-[#1f2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs">
        
        {/* Header */}
        <div className="gov-card p-5 bg-white/90 backdrop-blur-md border-l-4 border-l-[#103b66] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="bg-[#103b66] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">
                {t('tracker.title') || 'APPLICATION STATUS TRACKER'}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#103b66]">
                {t('tracker.title') || 'Application Status & Workflow'}
              </h1>
              <p className="text-slate-600 text-xs mt-0.5">
                {t('tracker.subtitle') || 'End-to-end transparent visibility of Revenue Mutation, NOCs, and Khata updates.'}
              </p>
            </div>

            {/* Officer Action Jump */}
            <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-300 p-3 rounded flex items-center space-x-3 shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <span className="font-bold text-amber-900 text-xs block">Official Sanction Workflow:</span>
                <p className="text-amber-800 text-[10px]">Switch to Revenue Officer (Tehsildar) persona to process and sanction this application.</p>
              </div>
              <button
                onClick={() => {
                  const officer = ROLES.find(r => r.id === 'revenue_officer');
                  if (officer) setCurrentRole(officer);
                  setActiveTab('officer_workflow');
                }}
                className="gov-btn-orange text-xs py-1.5 shrink-0"
              >
                {t('tracker.officerPortalJump') || 'Open Officer Portal'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Applications List */}
          <div className="gov-card p-4 bg-white/90 backdrop-blur-md space-y-3 shadow-lg">
            <h3 className="font-bold text-[#103b66] text-xs uppercase border-b border-slate-200 pb-2">
              सभी दाखिल आवेदन (Submitted Applications)
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search Ack No, Name, ULPIN..."
                className="gov-input pl-9 text-xs"
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredApps.map((app) => {
                const isSelected = (currentApp?.id === app.id);
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`p-3 rounded border cursor-pointer transition-all hover:-translate-y-0.5 ${isSelected ? 'border-2 border-[#103b66] bg-blue-50/70 shadow-md' : 'border-white/60 bg-white/60 hover:bg-white/80 hover:shadow-md'}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono font-bold text-[#103b66] text-xs">{app.id}</span>
                      <span className={`gov-badge ${app.status === 'Approved' ? 'gov-badge-success' : app.status === 'In Review' ? 'gov-badge-warning' : 'gov-badge-info'}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 mt-1">{app.applicantName}</div>
                    <div className="text-slate-600 text-[11px] font-mono mt-0.5">ULPIN: {app.ulpin}</div>
                    <div className="text-slate-500 text-[10px] mt-1">Filed Date: {formatDate(app.createdAt)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Detail Timeline */}
          {currentApp && (
            <div className="lg:col-span-2 gov-card p-6 bg-white/90 backdrop-blur-md space-y-6 shadow-xl">
              
              <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-[#103b66] text-sm">{currentApp.id}</span>
                    <span className="gov-badge gov-badge-info">{currentApp.applicationType}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">
                    Applicant: {currentApp.applicantName} ({currentApp.applicantPhone})
                  </h2>
                  <p className="text-slate-600 text-xs">
                    Target ULPIN: <strong className="font-mono text-[#103b66]">{currentApp.ulpin}</strong>
                  </p>
                </div>

                <button
                  onClick={() => selectParcelByUlpin(currentApp.ulpin, 'revenue')}
                  className="gov-btn-primary text-xs shrink-0"
                >
                  <span>View Parcel 7/12 RoR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div>
                <h3 className="font-bold text-[#103b66] text-xs uppercase mb-3">
                  Workflow Execution Progress ({currentApp.currentStep} of {currentApp.workflowSteps?.length})
                </h3>
                
                <div className="space-y-4">
                  {currentApp.workflowSteps?.map((stepItem, idx) => {
                    const isCompleted = idx < currentApp.currentStep;
                    const isCurrent = idx === currentApp.currentStep - 1;

                    return (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isCompleted 
                            ? 'bg-emerald-700 text-white' 
                            : isCurrent 
                              ? 'bg-amber-600 text-white font-extrabold ring-2 ring-amber-300' 
                              : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isCompleted ? '✓' : idx + 1}
                        </div>

                        <div className="flex-1 p-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-900 text-xs">{stepItem.name}</h4>
                            <span className="text-[10px] text-slate-500">{stepItem.timestamp ? formatDate(stepItem.timestamp) : 'Pending'}</span>
                          </div>
                          <p className="text-slate-600 text-xs mt-0.5">{stepItem.description}</p>
                          <span className="text-[10px] text-[#103b66] font-semibold mt-1 block">Assigned Official: {stepItem.assignedRole}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

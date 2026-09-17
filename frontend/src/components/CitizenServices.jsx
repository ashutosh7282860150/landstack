import React, { useState } from 'react';
import { 
  FileText, 
  Building2, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  ArrowRight, 
  QrCode, 
  CreditCard, 
  Sparkles,
  User,
  Phone,
  Mail,
  FileCheck,
  Building,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatCurrency } from '../utils/formatters';

export const CitizenServices = () => {
  const { 
    parcels, 
    selectedParcel, 
    handleApplyMutation, 
    setActiveTab, 
    setIsBhuAadhaarModalOpen,
    setSelectedParcel
  } = useLandStack();

  const [activeService, setActiveService] = useState('mutation'); // 'mutation' | 'na_conversion' | 'building_noc' | 'dispute'

  // Mutation Wizard State
  const [step, setStep] = useState(1);
  const [selectedUlpin, setSelectedUlpin] = useState(selectedParcel?.ulpin || parcels[0]?.ulpin || '');
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantPhone: '',
    applicantEmail: '',
    buyerName: '',
    buyerAadhaar: '',
    buyerShare: '100',
    deedNumber: 'DOC-2026-MOCK-9912',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const currentParcel = parcels.find(p => p.ulpin === selectedUlpin) || parcels[0];

  const handleMutationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await handleApplyMutation({
        ulpin: selectedUlpin,
        applicationType: 'Mutation / Khata Transfer',
        applicantName: formData.applicantName,
        applicantPhone: formData.applicantPhone,
        applicantEmail: formData.applicantEmail,
        buyerName: formData.buyerName,
        buyerAadhaar: formData.buyerAadhaar,
        buyerShare: formData.buyerShare,
        notes: formData.notes
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-xs text-slate-200">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unified Citizen Self-Service Portal</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Land Administration e-Services
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Apply for paperless digital mutation, building permissions, NA conversions, or track application status online.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('tracker')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 font-bold border border-emerald-500/30 flex items-center space-x-2 transition-all"
            >
              <Clock className="w-4 h-4" />
              <span>Track Existing Application</span>
            </button>
          </div>
        </div>
      </div>

      {/* Service Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveService('mutation')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeService === 'mutation' 
              ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-lg' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
            <FileText className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-xs">Online Mutation (Namantaran)</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Khata transfer following registered sale deed</p>
        </button>

        <button
          onClick={() => setActiveService('building_noc')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeService === 'building_noc' 
              ? 'bg-blue-500/15 border-blue-500/50 text-white shadow-lg' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
            <Building2 className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-xs">Building Permission NOC</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Scrutiny against Master Plan FAR & setbacks</p>
        </button>

        <button
          onClick={() => setActiveService('na_conversion')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeService === 'na_conversion' 
              ? 'bg-purple-500/15 border-purple-500/50 text-white shadow-lg' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-xs">NA Land Conversion</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Agricultural to Commercial / Residential use</p>
        </button>

        <button
          onClick={() => setActiveService('dispute')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeService === 'dispute' 
              ? 'bg-red-500/15 border-red-500/50 text-white shadow-lg' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mb-2">
            <AlertCircle className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-xs">Boundary Dispute Grievance</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Report encroachment or DGPS mismatch</p>
        </button>
      </div>

      {/* Service View 1: Online Mutation Wizard */}
      {activeService === 'mutation' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>1</span>
              <span className="font-semibold text-white">Select Parcel</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>2</span>
              <span className="font-semibold text-white">Buyer / Seller KYC</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>3</span>
              <span className="font-semibold text-white">Review & e-Sign</span>
            </div>
          </div>

          <form onSubmit={handleMutationSubmit} className="space-y-6">
            
            {/* Step 1: Select Parcel */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-sm">Step 1: Choose Target Land Parcel (ULPIN)</h3>
                <div className="space-y-2">
                  <label className="text-slate-400 block">Select Land Parcel:</label>
                  <select
                    value={selectedUlpin}
                    onChange={(e) => setSelectedUlpin(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                  >
                    {parcels.map(p => (
                      <option key={p.ulpin} value={p.ulpin}>
                        {p.ulpin} — Survey {p.surveyNo}, {p.location.village}, {p.location.district} ({p.landUseCategory})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Parcel Summary Card */}
                {currentParcel && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-emerald-400 font-bold">{currentParcel.ulpin}</span>
                      <span className="text-slate-400 font-mono">Area: {currentParcel.spatialAttributes?.areaAcres} Acres</span>
                    </div>
                    <div className="text-slate-300">
                      Current Registered Owner: <strong>{currentParcel.revenueRecords?.owners?.[0]?.name}</strong> ({currentParcel.revenueRecords?.owners?.[0]?.share}%)
                    </div>
                    {currentParcel.litigation?.hasLitigation && (
                      <div className="p-2 rounded bg-red-950/40 border border-red-500/40 text-red-400 font-semibold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        <span>Warning: This parcel has an active court stay. Mutation will require Judicial clearance.</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center space-x-2"
                  >
                    <span>Proceed to KYC</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: KYC & Buyer Details */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-sm">Step 2: Enter Purchaser & Applicant Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1">Applicant Name (Present Khatedar / Seller):</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rameshwar D. Patil"
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Applicant Phone Number:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={formData.applicantPhone}
                      onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">New Purchaser / Transferee Name (Buyer):</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sanjay Mahadev Deshmukh"
                      value={formData.buyerName}
                      onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Purchaser Aadhaar Number (Masked in RoR):</label>
                    <input
                      type="text"
                      required
                      placeholder="XXXX XXXX 7812"
                      value={formData.buyerAadhaar}
                      onChange={(e) => setFormData({ ...formData, buyerAadhaar: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Transferred Ownership Share (%):</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={formData.buyerShare}
                      onChange={(e) => setFormData({ ...formData, buyerShare: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Registered Deed Number:</label>
                    <input
                      type="text"
                      value={formData.deedNumber}
                      onChange={(e) => setFormData({ ...formData, deedNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!formData.applicantName || !formData.buyerName}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center space-x-2 disabled:opacity-50"
                  >
                    <span>Proceed to Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-sm">Step 3: Document Verification & Automated Fee Calculation</h3>
                
                {/* Upload Simulator */}
                <div className="p-4 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-center space-y-2">
                  <UploadCloud className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="font-semibold text-white">Registered Sale Deed & KYC Proofs Attached</div>
                  <p className="text-[11px] text-slate-500">Auto-extracted from SRO Deed Repository (Demo Mode Simulated)</p>
                </div>

                {/* Fee Matrix */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Statutory Mutation Fee:</span>
                    <span className="text-white font-mono">₹ 150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">DGPS GIS Boundary Update Fee:</span>
                    <span className="text-white font-mono">₹ 250.00</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 font-bold">
                    <span className="text-emerald-400">Total Online Application Fee:</span>
                    <span className="text-emerald-400 font-mono text-sm">₹ 400.00 (Exempt in Demo)</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm rounded-xl shadow-xl flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>{submitting ? 'Submitting Application...' : 'Submit Digital Mutation Request'}</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      )}

      {/* Service View 2: NA Conversion Info */}
      {activeService === 'na_conversion' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <h2 className="text-base font-bold text-white">Non-Agricultural (NA) Land Conversion Workflow</h2>
          <p className="text-slate-300 text-xs leading-relaxed">
            Under Section 44 of the Land Revenue Code, agricultural lands falling inside Master Plan development zones can be converted to Non-Agricultural (IT, Commercial, or Residential) status upon scrutiny by the District Collector and Town Planning authority.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-white">Automated Master Plan GIS Checking</span>
            <p className="text-slate-400">
              LAND STACK automatically validates whether the target ULPIN falls within the permissible Development Zone before allowing application submission.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('map')}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl"
          >
            Check Land Zoning on GIS Map
          </button>
        </div>
      )}

      {/* Service View 3: Building Permission NOC */}
      {activeService === 'building_noc' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <h2 className="text-base font-bold text-white">Municipal Building Permission NOC Application</h2>
          <p className="text-slate-300 text-xs leading-relaxed">
            Automated architectural scrutiny against permissible FAR, ground coverage, road access width, and flood-line buffer zones.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-white block">Fire Safety NOC</span>
              <span className="text-slate-400">Automatic height checking against State Fire Brigade standard</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-white block">Aviation OLS Clearance</span>
              <span className="text-slate-400">Airport Authority of India obstacle limitation surface integration</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('dossier')}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-xl"
          >
            Inspect Active Building Sanctions in Dossier
          </button>
        </div>
      )}

      {/* Service View 4: Dispute Report */}
      {activeService === 'dispute' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <h2 className="text-base font-bold text-white">Report Boundary Dispute or Encroachment</h2>
          <p className="text-slate-300 text-xs leading-relaxed">
            Citizen grievance module for cadastral boundary discrepancies, missing survey stones, or illegal construction within prohibited buffer zones.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div>
              <label className="text-slate-400 block mb-1">Grievance Description:</label>
              <textarea
                rows="3"
                placeholder="Describe boundary stone mismatch or encroachment detail..."
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              ></textarea>
            </div>
            <button
              onClick={() => showToast('Grievance logged with Sub-Divisional Officer (SDO)', 'success')}
              className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl"
            >
              Submit Grievance to Tehsildar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

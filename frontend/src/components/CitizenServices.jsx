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
  User, 
  Phone, 
  Clock
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

export const CitizenServices = () => {
  const { 
    parcels, 
    selectedParcel, 
    handleApplyMutation, 
    setActiveTab, 
    setIsBhuAadhaarModalOpen,
    t
  } = useLandStack();

  const [activeService, setActiveService] = useState('mutation');

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
    <div className="bg-transparent py-6 text-[#1f2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs">
        
        {/* Official Header */}
        <div className="gov-card p-5 bg-white/90 backdrop-blur-md border-l-4 border-l-[#103b66] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="bg-[#103b66] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1 inline-block">
                {t('services.title') || 'ONLINE CITIZEN e-SERVICES'}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#103b66]">
                {t('services.title') || 'Citizen Land Services Portal'}
              </h1>
              <p className="text-slate-600 text-xs mt-0.5">
                {t('services.subtitle') || 'Paperless online land mutation application, NA conversion eligibility check, and building permission tracking.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('tracker')}
                className="gov-btn-orange text-xs"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{t('services.trackBtn') || 'Track Mutation Application'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Service Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveService('mutation')}
            className={`p-3 rounded gov-card text-left transition-all backdrop-blur-md ${activeService === 'mutation' ? 'border-2 border-[#103b66] bg-blue-50/80 shadow-lg' : 'bg-white/80 hover:bg-white/95 hover:shadow-md border border-white/60'}`}
          >
            <div className="font-bold text-sm text-[#103b66] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>{t('services.mutationTitle') || '1. Digital Mutation Wizard'}</span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1">Apply for online Khata & RoR transfer upon sale deed registration.</p>
          </button>

          <button
            onClick={() => setActiveService('na_conversion')}
            className={`p-3 rounded gov-card text-left transition-all backdrop-blur-md ${activeService === 'na_conversion' ? 'border-2 border-[#103b66] bg-blue-50/80 shadow-lg' : 'bg-white/80 hover:bg-white/95 hover:shadow-md border border-white/60'}`}
          >
            <div className="font-bold text-sm text-[#103b66] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>2. NA Conversion Clearance</span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1">Non-Agricultural land use conversion eligibility & master plan zoning check.</p>
          </button>

          <button
            onClick={() => setActiveService('building_noc')}
            className={`p-3 rounded gov-card text-left transition-all backdrop-blur-md ${activeService === 'building_noc' ? 'border-2 border-[#103b66] bg-blue-50/80 shadow-lg' : 'bg-white/80 hover:bg-white/95 hover:shadow-md border border-white/60'}`}
          >
            <div className="font-bold text-sm text-[#103b66] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>3. Building Sanction & NOC</span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1">Submit OBPS building plan approval & statutory NOC clearance request.</p>
          </button>

          <button
            onClick={() => setIsBhuAadhaarModalOpen(true)}
            className="p-3 rounded gov-card text-left hover:bg-amber-50/80 transition-all border border-amber-300 bg-amber-50/70 backdrop-blur-md hover:shadow-md"
          >
            <div className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>4. Download Bhu-Aadhaar</span>
            </div>
            <p className="text-amber-800 text-[11px] mt-1">Generate official digital land passbook with instant QR verification code.</p>
          </button>
        </div>

        {/* SERVICE 1: ONLINE DIGITAL MUTATION WIZARD */}
        {activeService === 'mutation' && (
          <div className="gov-card p-6 bg-white/90 backdrop-blur-md space-y-6 shadow-xl">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-[#103b66] uppercase">
                  📝 ऑनलाइन भू-नामांतरण आवेदन (Online Land Mutation Application Wizard)
                </h2>
                <p className="text-slate-600 text-xs">
                  Fill in applicant details, buyer info, and upload registered sale deed for paperless revenue mutation.
                </p>
              </div>

              {/* Wizard Steps */}
              <div className="flex items-center space-x-2 text-xs font-bold">
                <span className={`px-2.5 py-1 rounded ${step === 1 ? 'bg-[#103b66] text-white' : 'bg-slate-200 text-slate-700'}`}>Step 1</span>
                <span>→</span>
                <span className={`px-2.5 py-1 rounded ${step === 2 ? 'bg-[#103b66] text-white' : 'bg-slate-200 text-slate-700'}`}>Step 2</span>
                <span>→</span>
                <span className={`px-2.5 py-1 rounded ${step === 3 ? 'bg-[#103b66] text-white' : 'bg-slate-200 text-slate-700'}`}>Step 3</span>
              </div>
            </div>

            <form onSubmit={handleMutationSubmit} className="space-y-6">
              
              {/* Step 1: Select Parcel */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-[#103b66] text-xs uppercase">Step 1: Select Target Land Parcel (ULPIN)</h3>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Select Parcel ULPIN *</label>
                    <select
                      value={selectedUlpin}
                      onChange={(e) => setSelectedUlpin(e.target.value)}
                      className="gov-select font-mono"
                    >
                      {parcels.map(p => (
                        <option key={p.ulpin} value={p.ulpin}>
                          {p.ulpin} - Survey: {p.surveyNo}, Village: {p.location.village}, State: {p.location.state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Parcel Summary Box */}
                  <div className="p-4 bg-slate-100/80 backdrop-blur-sm border border-slate-200 rounded space-y-2">
                    <h4 className="font-bold text-[#103b66]">Selected Parcel Metadata</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Survey No:</span>
                        <span className="font-bold text-slate-800">{currentParcel.surveyNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Current Owner:</span>
                        <span className="font-bold text-slate-800">{currentParcel.revenueRecords?.owners?.[0]?.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Area (Acres):</span>
                        <span className="font-bold text-emerald-800 font-mono">{currentParcel.spatialAttributes?.areaAcres}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Title Status:</span>
                        <span className={`gov-badge ${currentParcel.litigation?.hasLitigation ? 'gov-badge-danger' : 'gov-badge-success'}`}>
                          {currentParcel.litigation?.hasLitigation ? 'Court Stay' : 'Clear Title'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="gov-btn-primary text-xs"
                    >
                      <span>Proceed to Applicant & Buyer Info</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Applicant & Buyer Info */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-[#103b66] text-xs uppercase">Step 2: Applicant & Buyer Ownership Details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Applicant Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.applicantName}
                        onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                        placeholder="Full Name as per Aadhaar"
                        className="gov-input"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Mobile Phone (OTP Verified) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.applicantPhone}
                        onChange={(e) => setFormData({...formData, applicantPhone: e.target.value})}
                        placeholder="10-Digit Mobile Number"
                        className="gov-input font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.applicantEmail}
                        onChange={(e) => setFormData({...formData, applicantEmail: e.target.value})}
                        placeholder="citizen@gov.in"
                        className="gov-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Buyer / Transferee Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.buyerName}
                        onChange={(e) => setFormData({...formData, buyerName: e.target.value})}
                        placeholder="New Buyer Name"
                        className="gov-input"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Buyer Aadhaar (12-Digit) *</label>
                      <input
                        type="text"
                        required
                        value={formData.buyerAadhaar}
                        onChange={(e) => setFormData({...formData, buyerAadhaar: e.target.value})}
                        placeholder="XXXX-XXXX-9812"
                        className="gov-input font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Transferred Share (%) *</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        required
                        value={formData.buyerShare}
                        onChange={(e) => setFormData({...formData, buyerShare: e.target.value})}
                        className="gov-input font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="gov-btn-secondary text-xs"
                    >
                      Back to Parcel Selection
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="gov-btn-primary text-xs"
                    >
                      <span>Proceed to Document Upload</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Deed Upload & Submit */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-[#103b66] text-xs uppercase">Step 3: Registered Sale Deed Verification & Final Submission</h3>
                  
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">SRO Deed Index-II Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.deedNumber}
                      onChange={(e) => setFormData({...formData, deedNumber: e.target.value})}
                      className="gov-input font-mono"
                    />
                  </div>

                  <div className="p-6 border-2 border-dashed border-slate-300 rounded bg-slate-50 text-center space-y-2">
                    <UploadCloud className="w-8 h-8 text-[#103b66] mx-auto" />
                    <p className="font-bold text-slate-800 text-xs">Click or drag registered SRO Deed PDF to upload</p>
                    <p className="text-[10px] text-slate-500">Supported formats: PDF, JPG (Max 10 MB) • e-Sign verified</p>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Additional Notes for Revenue Tehsildar</label>
                    <textarea
                      rows="2"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Specify mutation reason e.g., Purchase via registered sale deed..."
                      className="gov-input"
                    ></textarea>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="gov-btn-secondary text-xs"
                    >
                      Back to Buyer Info
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="gov-btn-orange text-xs py-2.5 px-6"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{submitting ? 'Submitting Application...' : 'Submit Digital Mutation Application'}</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

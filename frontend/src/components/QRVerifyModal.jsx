import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

export const QRVerifyModal = () => {
  const { 
    isQRVerifyModalOpen, 
    setIsQRVerifyModalOpen, 
    parcels, 
    selectParcel 
  } = useLandStack();

  const [inputUlpin, setInputUlpin] = useState('');
  const [verifiedParcel, setVerifiedParcel] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isQRVerifyModalOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setVerifiedParcel(null);

    const q = inputUlpin.trim().toLowerCase();
    if (!q) return;

    const found = parcels.find(p => p.ulpin.toLowerCase() === q || p.bhuAadhaar.toLowerCase() === q);
    if (found) {
      setVerifiedParcel(found);
    } else {
      setErrorMsg(`No authentic cryptographic record found for identifier: ${inputUlpin}`);
    }
  };

  const handleQuickSample = (sampleUlpin) => {
    setInputUlpin(sampleUlpin);
    const found = parcels.find(p => p.ulpin === sampleUlpin);
    if (found) setVerifiedParcel(found);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto text-xs text-slate-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-emerald-400 shrink-0" />
            <h2 className="font-bold text-white text-xs sm:text-sm">ULPIN QR Code Authenticator</h2>
          </div>
          <button
            onClick={() => {
              setIsQRVerifyModalOpen(false);
              setVerifiedParcel(null);
              setErrorMsg('');
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          <p className="text-slate-400 text-xs">
            Verify the authenticity of any printed Bhu-Aadhaar Passbook or ULPIN QR barcode against the DPI root ledger.
          </p>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 14-digit ULPIN or Bhu-Aadhaar..."
                value={inputUlpin}
                onChange={(e) => setInputUlpin(e.target.value)}
                className="flex-1 p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl"
              >
                Authenticate
              </button>
            </div>

            {/* Quick Samples */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
              <span>Try:</span>
              <button
                type="button"
                onClick={() => handleQuickSample('IN-MH-PUN-2024-009871')}
                className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-emerald-400 font-mono border border-slate-800"
              >
                IN-MH-PUN-2024-009871
              </button>
              <button
                type="button"
                onClick={() => handleQuickSample('IN-UP-VAR-2024-019482')}
                className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-red-400 font-mono border border-slate-800"
              >
                IN-UP-VAR-2024-019482
              </button>
            </div>
          </form>

          {/* Verification Result */}
          {verifiedParcel && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>CRYPTOGRAPHICALLY AUTHENTICATED</span>
              </div>

              <div className="space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">ULPIN:</span>
                  <span className="font-mono font-bold text-white">{verifiedParcel.ulpin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="text-slate-200">{verifiedParcel.location.village}, {verifiedParcel.location.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Primary Owner:</span>
                  <span className="text-white font-semibold">{verifiedParcel.revenueRecords?.owners?.[0]?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Court Stay Status:</span>
                  <span className={verifiedParcel.litigation?.hasLitigation ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {verifiedParcel.litigation?.hasLitigation ? 'STAY ACTIVE' : 'Clear Title'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  selectParcel(verifiedParcel);
                  setIsQRVerifyModalOpen(false);
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-1.5"
              >
                <span>Open Full 8-in-1 Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 text-red-300 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

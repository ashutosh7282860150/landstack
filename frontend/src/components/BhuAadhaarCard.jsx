import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  MapPin, 
  QrCode, 
  Layers, 
  CheckCircle2, 
  Building,
  FileText,
  Lock
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatArea, formatDate } from '../utils/formatters';

export const BhuAadhaarCard = () => {
  const { 
    selectedParcel, 
    parcels, 
    isBhuAadhaarModalOpen, 
    setIsBhuAadhaarModalOpen 
  } = useLandStack();

  const parcel = selectedParcel || parcels[0];

  if (!isBhuAadhaarModalOpen || !parcel) return null;

  const areaInfo = formatArea(parcel.spatialAttributes?.areaHectares);
  const verifyPayload = JSON.stringify({
    ulpin: parcel.ulpin,
    bhuAadhaar: parcel.bhuAadhaar,
    surveyNo: parcel.surveyNo,
    village: parcel.location.village,
    district: parcel.location.district,
    owner: parcel.revenueRecords?.owners?.[0]?.name,
    verifiedAt: new Date().toISOString(),
    issuer: 'LAND_STACK_DPI_ROOT_AUTHORITY'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Action Header (Not printed) */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between print:hidden shrink-0">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-bold text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">Bhu-Aadhaar Digital Land Passbook</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-2.5 sm:px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
              <span className="sm:hidden">Print</span>
            </button>
            <button
              onClick={() => setIsBhuAadhaarModalOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Body */}
        <div id="printable-bhu-aadhaar" className="p-4 sm:p-8 space-y-4 sm:space-y-6 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] overflow-y-auto flex-1">
          
          {/* Official Emblem & Header */}
          <div className="text-center border-b-2 border-emerald-800/60 pb-3 sm:pb-4">
            <div className="flex justify-center mb-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center font-serif text-lg sm:text-xl font-bold shadow-md">
                🏛️
              </div>
            </div>
            <h2 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-emerald-900">
              Government Digital Public Infrastructure for Land
            </h2>
            <h1 className="text-base sm:text-xl font-black text-slate-900 uppercase tracking-tight mt-0.5">
              BHU-AADHAAR • DIGITAL LAND PARCEL CERTIFICATE
            </h1>
            <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium">
              Issued under the National Land Governance DPI Framework (Demo Standard)
            </p>
          </div>

          {/* Top Identifier Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 bg-emerald-50/80 border border-emerald-200 rounded-xl p-3">
            <div>
              <span className="text-[10px] text-emerald-800 font-bold uppercase block">14-Digit ULPIN</span>
              <span className="text-sm sm:text-base font-black font-mono text-emerald-950 break-all">{parcel.ulpin}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] text-emerald-800 font-bold uppercase block">Bhu-Aadhaar Number</span>
              <span className="text-sm sm:text-base font-black font-mono text-emerald-950 break-all">{parcel.bhuAadhaar}</span>
            </div>
          </div>

          {/* Main Grid: Details + QR Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-start">
            
            {/* Left 2 Cols: Cadastral & Ownership Info */}
            <div className="col-span-1 sm:col-span-2 space-y-3 sm:space-y-4 text-xs">
              
              {/* Spatial Cadastre */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                <span className="font-bold text-slate-700 block text-[10px] uppercase">Cadastral Location</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><strong className="text-slate-500">Survey No:</strong> {parcel.surveyNo}</div>
                  <div><strong className="text-slate-500">Khasra / Plot:</strong> {parcel.khasraNo}</div>
                  <div><strong className="text-slate-500">Village:</strong> {parcel.location.village}</div>
                  <div><strong className="text-slate-500">District:</strong> {parcel.location.district}</div>
                  <div><strong className="text-slate-500">State:</strong> {parcel.location.state}</div>
                  <div><strong className="text-slate-500">Area:</strong> {areaInfo.acres} ({areaInfo.hectares})</div>
                </div>
              </div>

              {/* Ownership */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                <span className="font-bold text-slate-700 block text-[10px] uppercase">Registered Khatedar (Owners)</span>
                {parcel.revenueRecords?.owners?.map((o, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] border-b border-slate-200/60 pb-1 last:border-none">
                    <span className="font-bold text-slate-900">{o.name} <span className="font-normal text-slate-500">({o.share}%)</span></span>
                    <span className="font-mono text-slate-600">{o.aadhaarMasked}</span>
                  </div>
                ))}
              </div>

              {/* Status Checklist */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[9px] uppercase">Zoning:</span>
                  <span className="font-semibold text-slate-800">{parcel.townPlanning?.zoningClassification?.split('(')[0]}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[9px] uppercase">Tax Clearance:</span>
                  <span className="font-semibold text-emerald-700">{parcel.propertyTax?.paymentStatus}</span>
                </div>
              </div>

            </div>

            {/* Right 1 Col: Real QR Code & Digital Seal */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
                <QRCodeSVG
                  value={verifyPayload}
                  size={128}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-900 uppercase block tracking-wider">
                  Scan to Authenticate
                </span>
                <span className="text-[9px] font-mono text-slate-500 block">
                  SHA256: {parcel.ulpin.substring(0, 10)}...OK
                </span>
              </div>

              <div className="w-full pt-2 border-t border-slate-200 flex items-center justify-center space-x-1 text-emerald-700 text-[10px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Digitally Certified</span>
              </div>
            </div>

          </div>

          {/* Footer Security Disclaimer */}
          <div className="border-t border-slate-300 pt-3 flex items-center justify-between text-[10px] text-slate-500">
            <span>Generated: {new Date().toLocaleString()}</span>
            <span>Security Hash: 8f39a01bce29408e01824a7bc91024</span>
            <span className="font-semibold text-emerald-800">LAND STACK DPI Prototype</span>
          </div>

        </div>

      </div>
    </div>
  );
};

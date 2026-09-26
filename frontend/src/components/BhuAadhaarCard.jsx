import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  QrCode
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { formatArea } from '../utils/formatters';

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
    issuer: 'BHOO_BHUMI_DPI_ROOT_AUTHORITY'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white text-slate-900 rounded shadow-2xl overflow-hidden border border-slate-300 font-sans">
        
        {/* Action Header */}
        <div className="bg-[#103b66] text-white px-4 sm:px-6 py-3 flex items-center justify-between print:hidden shrink-0 border-b-2 border-amber-600">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="font-bold text-xs sm:text-sm">भू-आधार डिजिटल पासबुक (Bhu-Aadhaar Digital Passbook)</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="gov-btn-orange text-xs py-1 px-3"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF Certificate</span>
            </button>
            <button
              onClick={() => setIsBhuAadhaarModalOpen(false)}
              className="p-1 rounded text-slate-200 hover:text-white hover:bg-[#0a2540]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Body */}
        <div id="printable-bhu-aadhaar" className="p-6 space-y-5 relative bg-white overflow-y-auto flex-1">
          
          {/* Header Seal */}
          <div className="text-center border-b-2 border-[#103b66] pb-3">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#103b66]">
              भारत सरकार | राजस्व एवं भूमि संसाधन विभाग • Government of India
            </h2>
            <h1 className="text-lg sm:text-xl font-black text-[#103b66] uppercase tracking-tight mt-0.5">
              भू भूमि • BHU-AADHAAR DIGITAL LAND PARCEL CERTIFICATE
            </h1>
            <p className="text-[11px] text-slate-600 font-medium">
              National Unique Land Parcel Identification System (ULPIN Standard)
            </p>
          </div>

          {/* Identifier Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-blue-50 border border-blue-200 rounded p-3">
            <div>
              <span className="text-[10px] text-[#103b66] font-bold uppercase block">14-Digit ULPIN</span>
              <span className="text-base font-black font-mono text-[#103b66]">{parcel.ulpin}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] text-[#103b66] font-bold uppercase block">Bhu-Aadhaar ID</span>
              <span className="text-base font-black font-mono text-[#103b66]">{parcel.bhuAadhaar}</span>
            </div>
          </div>

          {/* Details + QR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            
            <div className="col-span-1 sm:col-span-2 space-y-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-1">
                <span className="font-bold text-[#103b66] block text-[10px] uppercase">Cadastral Location</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><strong className="text-slate-600">Survey No:</strong> {parcel.surveyNo}</div>
                  <div><strong className="text-slate-600">Khasra / Plot:</strong> {parcel.khasraNo}</div>
                  <div><strong className="text-slate-600">Village:</strong> {parcel.location.village}</div>
                  <div><strong className="text-slate-600">District:</strong> {parcel.location.district}</div>
                  <div><strong className="text-slate-600">State:</strong> {parcel.location.state}</div>
                  <div><strong className="text-slate-600">Area:</strong> {areaInfo.acres} ({areaInfo.hectares})</div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-1">
                <span className="font-bold text-[#103b66] block text-[10px] uppercase">Registered Khatedar (Owners)</span>
                {parcel.revenueRecords?.owners?.map((o, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] border-b border-slate-200 pb-1 last:border-none">
                    <span className="font-bold text-slate-900">{o.name} <span className="font-normal text-slate-500">({o.share}%)</span></span>
                    <span className="font-mono text-slate-600">{o.aadhaarMasked}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded text-center space-y-3">
              <div className="p-2 bg-white rounded shadow-sm border border-slate-300">
                <QRCodeSVG
                  value={verifyPayload}
                  size={120}
                  level="H"
                />
              </div>
              <span className="text-[10px] font-bold text-[#103b66] uppercase block">
                Scan to Verify Authenticity
              </span>
              <div className="w-full pt-2 border-t border-slate-200 flex items-center justify-center space-x-1 text-emerald-800 text-[10px] font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Digitally Certified</span>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-300 pt-3 flex items-center justify-between text-[10px] text-slate-500">
            <span>Generated: {new Date().toLocaleString()}</span>
            <span className="font-bold text-[#103b66]">BHOO BHUMI Government Portal</span>
          </div>

        </div>

      </div>
    </div>
  );
};

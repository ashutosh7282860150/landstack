import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Download, 
  Eye, 
  CheckCircle2, 
  QrCode, 
  Building, 
  Landmark, 
  CreditCard, 
  MapPin, 
  Layers, 
  Search,
  Printer,
  X,
  Award,
  AlertCircle,
  FileCheck,
  Compass,
  FileBadge,
  Stamp,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

export const LandDocumentsSection = () => {
  const { 
    parcels, 
    selectedParcel, 
    setSelectedParcel, 
    showToast 
  } = useLandStack();

  const parcel = selectedParcel || parcels[0];
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  if (!parcel) return null;

  const documentsList = [
    // 1. Original Land Cadastral Map (भू-नक्शा)
    {
      id: 'bhu_naksha_map',
      name: 'भू-नक्शा / Land Original Cadastral Map (Village Sheet)',
      category: 'भू-नक्शा एवं मानचित्र (Maps)',
      type: 'photo_pdf',
      docNumber: `NAKSHA-${parcel.location.state.slice(0, 2).toUpperCase()}-${parcel.surveyNo.replace('/', '_')}`,
      issueDate: parcel.spatialAttributes?.surveyDate || '15 Feb 2024',
      issuingAuthority: 'Directorate of Land Records & Survey (DLRS)',
      status: 'High-Precision DGPS Cadastre Certified',
      fileSize: '3.2 MB',
      thumbnail: 'map_preview',
      description: 'Official Village Cadastral Sheet (भू-नक्शा) with boundary stone benchmarks, geo-coordinates, plot adjoining boundaries, and scale metrics.'
    },

    // 2. Land Registration / Sale Deed (बैनामा / रजिस्ट्री)
    {
      id: 'registered_deed',
      name: 'भूमि रजिस्ट्री / Land Registration Sale Deed (बैनामा / Index-II)',
      category: 'निबंधन एवं बैनामा (Registration)',
      type: 'pdf',
      docNumber: parcel.registration?.deedNo || `DEED-${parcel.location.district.slice(0, 3).toUpperCase()}-2021-9912`,
      issueDate: parcel.registration?.registrationDate || '12 May 2021',
      issuingAuthority: parcel.location.sroOffice || `Sub-Registrar Office (${parcel.location.taluka})`,
      status: 'Registered & Stamped by SRO',
      fileSize: '4.5 MB',
      thumbnail: 'stamp_deed',
      description: 'Certified Government stamped copy of Registered Conveyance / Sale Deed with consideration value, witness signatures, and SRO volume ledger seal.'
    },

    // 3. Ownership Document (स्वामित्व प्रमाण पत्र / 7/12 & 8A)
    {
      id: 'swamitva_ror',
      name: 'स्वामित्व प्रमाण पत्र / Record of Rights (7/12 & 8A / Pahani)',
      category: 'स्वामित्व एवं अधिकार (Ownership)',
      type: 'pdf',
      docNumber: `SWAMITVA-${parcel.ulpin.slice(-6)}-2024`,
      issueDate: '10 Jan 2024',
      issuingAuthority: `Tehsildar & Revenue Circle Officer (${parcel.location.taluka})`,
      status: 'Digitally Signed & Certified',
      fileSize: '1.8 MB',
      thumbnail: 'ror_preview',
      description: 'Comprehensive statutory ownership document declaring landowner legal title, khata shares, tenancy status, and land revenue assessment.'
    },

    // 4. Lagaan Receipt (लगान रसीद / e-Rent Receipt)
    {
      id: 'lagaan_receipt',
      name: 'लगान रसीद / Land Revenue Lagaan Payment Receipt',
      category: 'लगान एवं राजस्व (Revenue)',
      type: 'pdf',
      docNumber: `LGN-REC-${parcel.location.state.slice(0, 2).toUpperCase()}-2024-8891`,
      issueDate: '05 Mar 2024',
      issuingAuthority: 'Revenue Department Treasury / e-Lagaan Portal',
      status: 'Up to Date / Paid in Full',
      fileSize: '650 KB',
      thumbnail: 'receipt_preview',
      description: 'Government Treasury e-Lagaan receipt acknowledging payment of annual land revenue tax with treasury transaction UTR number.'
    },

    // 5. Jamabandi Register (जमाबंदी नकल / Jamabandi Copy)
    {
      id: 'jamabandi_copy',
      name: 'जमाबंदी नकल / RoR Jamabandi Register Extract',
      category: 'जमाबंदी एवं खतौनी (Jamabandi)',
      type: 'pdf',
      docNumber: `JAMABANDI-${parcel.revenueRecords?.khataNumber || 'KH-489'}`,
      issueDate: '22 Jan 2024',
      issuingAuthority: 'Circle Officer / Revenue Inspector',
      status: 'Updated in Central Jamabandi Portal',
      fileSize: '2.1 MB',
      thumbnail: 'jamabandi_preview',
      description: 'Official Jamabandi register copy confirming cultivator rights, khewat details, total area in bigha/hectares, and source of irrigation.'
    },

    // 6. Dakhil Kharij / Mutation Order (दाखिल खारिज आदेश / परवाना)
    {
      id: 'dakhil_kharij_order',
      name: 'दाखिल खारिज आदेश / Mutation Order (Dakhil-Kharij Parwana)',
      category: 'दाखिल खारिज (Mutation)',
      type: 'pdf',
      docNumber: parcel.revenueRecords?.mutationHistory?.[0]?.orderNo || `MUT-ORD-${parcel.location.district.slice(0, 3).toUpperCase()}-2022-411`,
      issueDate: parcel.revenueRecords?.mutationHistory?.[0]?.date || '18 Sep 2022',
      issuingAuthority: `Circle Officer / Tehsildar (${parcel.location.taluka})`,
      status: 'Sanctioned & RoR Mutated',
      fileSize: '1.5 MB',
      thumbnail: 'mutation_preview',
      description: 'Statutory quasi-judicial mutation order certifying title transfer from predecessor to current owner following registered deed execution.'
    },

    // 7. Khatiyan Extract (खतियान नकल / RS & CS Khatiyan)
    {
      id: 'khatiyan_extract',
      name: 'खतियान नकल / Cadastral Survey Khatiyan Extract',
      category: 'खतियान अभिलेख (Khatiyan)',
      type: 'pdf',
      docNumber: `KHATIYAN-VOL-18-${parcel.surveyNo.replace('/', '-')}`,
      issueDate: '14 Dec 2023',
      issuingAuthority: 'District Land Record Archive Office',
      status: 'Archived & Digitally Verified',
      fileSize: '2.8 MB',
      thumbnail: 'khatiyan_preview',
      description: 'Historic Survey Khatiyan record mapping original survey lineage, ancestral possession, common village easements, and gata tree records.'
    },

    // 8. Non-Encumbrance Certificate (भारमुक्त प्रमाण पत्र / EC Form 15/16)
    {
      id: 'encumbrance_cert',
      name: 'भारमुक्त प्रमाण पत्र / Non-Encumbrance Certificate (Form 15 & 16)',
      category: 'भारमुक्त प्रमाण पत्र (Encumbrance)',
      type: 'pdf',
      docNumber: `EC-30YR-${parcel.ulpin.slice(-6)}`,
      issueDate: '10 Jan 2024',
      issuingAuthority: 'Sub-Registrar Title Investigation Cell',
      status: parcel.encumbrance?.hasLien ? 'Active Bank Charge Registered' : 'Nil Encumbrance / Clear Title',
      fileSize: '1.2 MB',
      thumbnail: 'ec_preview',
      description: '30-Year comprehensive title search certifying that the land is free from prior mortgages, court injunctions, and execution attachments.'
    },

    // 9. Demarcation & Boundary Survey Report (सीमांकन एवं पंचनामा प्रतिवेदन)
    {
      id: 'demarcation_report',
      name: 'सीमांकन प्रतिवेदन / Boundary Demarcation & Field Panchnama',
      category: 'सीमांकन प्रतिवेदन (Demarcation)',
      type: 'photo_pdf',
      docNumber: `DEM-PAN-${parcel.surveyNo.replace('/', '-')}-2024`,
      issueDate: '28 Feb 2024',
      issuingAuthority: 'Revenue Inspector & Village Talathi / Patwari',
      status: 'Panchnama Signed by Adjacent Owners',
      fileSize: '2.4 MB',
      thumbnail: 'demarcation_preview',
      description: 'Spot demarcation report and joint Panchnama executed in the presence of adjoining plot holders with DGPS coordinates.'
    },

    // 10. Bank Hypothecation & Charge Certificate (बैंक बंधक एवं प्रभार प्रमाण पत्र)
    {
      id: 'bank_charge_noc',
      name: 'बैंक प्रभार प्रमाण पत्र / Bank Mortgage & CERSAI Lien Status',
      category: 'बैंक प्रभार एवं बंधक (Banking)',
      type: 'pdf',
      docNumber: parcel.encumbrance?.cersaiId || 'CER-2022-NIL-000',
      issueDate: '05 May 2022',
      issuingAuthority: parcel.encumbrance?.bankName || 'CERSAI National Asset Registry',
      status: parcel.encumbrance?.hasLien ? `Hypothecated to ${parcel.encumbrance?.bankName}` : 'No Active Mortgage / Clear Lien',
      fileSize: '890 KB',
      thumbnail: 'bank_preview',
      description: 'Statutory certificate under SARFAESI Act verifying registered bank mortgages, agricultural crop credit liens, and loan release NOCs.'
    }
  ];

  const filteredDocuments = activeFilter === 'all' 
    ? documentsList 
    : documentsList.filter(d => d.category.toLowerCase().includes(activeFilter.toLowerCase()) || d.id.includes(activeFilter));

  const handleDownloadDoc = (doc) => {
    showToast(`Downloading certified PDF for: ${doc.name}`, 'success');
  };

  return (
    <div className="bg-transparent text-[#1f2937] min-h-screen py-6 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Ribbon */}
        <div className="gov-card p-6 bg-white/90 backdrop-blur-md border-l-4 border-l-[#103b66] shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold mb-1">
                <FileCheck className="w-4 h-4 text-[#103b66]" />
                <span>डिजिटल भू-अभिलेख एवं दस्तावेज भंडार • Certified Digital Land Documents Vault</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#103b66]">
                Land Related All Documents (भूमि संबंधित सभी दस्तावेज)
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Complete official repository: Land Original Map (भू-नक्शा), Registered Sale Deed (बैनामा), Ownership (स्वामित्व 7/12), Lagaan (लगान रसीद), Jamabandi (जमाबंदी), Dakhil Kharij (दाखिल खारिज) & Khatiyan (खतियान).
              </p>
            </div>

            {/* Switch Active Parcel Dropdown */}
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm p-2 rounded-lg border border-slate-300">
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Parcel:</span>
              <select
                value={parcel.ulpin}
                onChange={(e) => {
                  const match = parcels.find(p => p.ulpin === e.target.value);
                  if (match) setSelectedParcel(match);
                }}
                className="px-2.5 py-1.5 bg-white/90 border border-slate-300 rounded text-xs font-mono font-bold text-[#103b66] focus:outline-none"
              >
                {parcels.map(p => (
                  <option key={p.ulpin} value={p.ulpin}>
                    {p.location.state}: {p.ulpin} ({p.surveyNo})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Selected Parcel Quick Summary Banner */}
        <div className="gov-card p-4 bg-[#103b66] text-white">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-slate-300 block text-[10px] font-mono">SELECTED ULPIN / BHU-AADHAAR</span>
              <span className="font-mono font-extrabold text-sm text-amber-400">{parcel.ulpin}</span>
            </div>
            <div>
              <span className="text-slate-300 block text-[10px]">SURVEY / KHASRA / GATA</span>
              <span className="font-bold text-white">{parcel.surveyNo} ({parcel.landUseCategory})</span>
            </div>
            <div>
              <span className="text-slate-300 block text-[10px]">REGISTERED KHATEDAR / OWNER</span>
              <span className="font-bold text-slate-100">{parcel.revenueRecords?.owners?.[0]?.name}</span>
            </div>
            <div>
              <span className="text-slate-300 block text-[10px]">JURISDICTION LOCATION</span>
              <span className="font-bold text-slate-100">{parcel.location.village}, {parcel.location.taluka}, {parcel.location.district}, {parcel.location.state}</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/90 backdrop-blur-md p-2 rounded-xl border border-white/60 shadow-lg text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeFilter === 'all' ? 'bg-[#103b66] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            All Documents ({documentsList.length})
          </button>
          <button
            onClick={() => setActiveFilter('naksha')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeFilter === 'naksha' ? 'bg-[#103b66] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            🗺️ भू-नक्शा / Maps
          </button>
          <button
            onClick={() => setActiveFilter('registration')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeFilter === 'registration' ? 'bg-[#103b66] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            📜 रजिस्ट्री / Deeds
          </button>
          <button
            onClick={() => setActiveFilter('ownership')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeFilter === 'ownership' ? 'bg-[#103b66] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            📑 स्वामित्व / RoR 7/12
          </button>
          <button
            onClick={() => setActiveFilter('revenue')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeFilter === 'revenue' ? 'bg-[#103b66] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            💳 लगान / Lagaan
          </button>
          <button
            onClick={() => setActiveFilter('mutation')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeFilter === 'mutation' ? 'bg-[#103b66] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            ⚖️ दाखिल खारिज / Mutation
          </button>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocuments.map((doc, idx) => (
            <div 
              key={doc.id}
              className="gov-card p-5 bg-white/90 backdrop-blur-md border-2 border-white/60 hover:border-[#103b66] hover:shadow-2xl hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
            >
              <div>
                
                {/* Document Top Badge & Format Pill */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="bg-blue-100 text-[#103b66] font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-blue-200">
                    {doc.category}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {doc.status.split('/')[0]}
                    </span>
                    <span className="bg-slate-100 text-slate-700 font-mono text-[10px] px-1.5 py-0.5 rounded font-bold">
                      {doc.type === 'photo_pdf' ? 'PHOTO / PDF' : 'PDF'}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mt-1 group-hover:text-[#103b66] transition-colors">
                  {idx + 1}. {doc.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {doc.description}
                </p>

                {/* Metadata Details */}
                <div className="grid grid-cols-2 gap-2 my-3.5 p-3 bg-slate-100/80 border border-slate-200 rounded-lg text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Document Certificate ID:</span>
                    <span className="font-mono font-bold text-slate-800 truncate block">{doc.docNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Certification Date:</span>
                    <span className="font-semibold text-slate-800">{doc.issueDate}</span>
                  </div>
                  <div className="col-span-2 border-t border-slate-200 pt-1.5 mt-0.5">
                    <span className="text-slate-500 block text-[10px]">Issuing Revenue Authority:</span>
                    <span className="font-semibold text-slate-800">{doc.issuingAuthority}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                <span className="text-[11px] text-slate-500 font-mono">Size: {doc.fileSize}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="px-3 py-1.5 bg-white/80 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>View / Inspect Document</span>
                  </button>
                  <button
                    onClick={() => handleDownloadDoc(doc)}
                    className="gov-btn-primary px-3 py-1.5 text-xs font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive High-Fidelity Document Visual & PDF Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[3000] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto text-xs text-[#1f2937]">
          <div className="relative w-full max-w-3xl bg-white border-2 border-slate-300 rounded-2xl shadow-2xl overflow-hidden font-sans max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header Bar */}
            <div className="bg-[#103b66] px-6 py-4 text-white flex items-center justify-between border-b-2 border-amber-600 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-white shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{selectedDoc.name}</h3>
                  <p className="text-xs text-slate-200 font-mono">Certificate: {selectedDoc.docNumber} • NIC Certified</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Rendered Canvas Preview */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 bg-slate-100">
              
              {/* Official Document Sheet */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-300 shadow-md relative overflow-hidden">
                
                {/* Government Header Stamp */}
                <div className="text-center border-b-2 border-amber-600 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#103b66] text-white flex items-center justify-center font-black mx-auto mb-1 text-sm">
                    भू
                  </div>
                  <h4 className="font-extrabold text-base text-[#103b66]">
                    भारत सरकार • GOVERNMENT OF INDIA
                  </h4>
                  <p className="text-xs font-bold text-slate-800">
                    राजस्व एवं भूमि सुधार विभाग • DEPARTMENT OF LAND RECORDS & REVENUE
                  </p>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">
                    State: {parcel.location.state} • District: {parcel.location.district} • Tehsil: {parcel.location.taluka} • Village: {parcel.location.village}
                  </p>
                </div>

                {/* Specific Document Visual Canvas */}
                {selectedDoc.id === 'bhu_naksha_map' || selectedDoc.id === 'demarcation_report' ? (
                  /* Visual Cadastral Map / Photo Canvas */
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-700 relative p-4 text-center">
                      <div className="text-amber-400 text-xs font-bold font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
                        <Compass className="w-4 h-4" />
                        <span>भू-नक्शा कैडस्ट्रल मानचित्र • Cadastral Survey Polygon Map</span>
                      </div>
                      
                      {/* Geometric Representation of Parcel Polygon */}
                      <div className="h-64 w-full bg-slate-950 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-800">
                        <svg className="w-full h-full p-4" viewBox="0 0 400 240">
                          {/* Grid Background */}
                          <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                          
                          {/* Adjoining Plot Boundary Lines */}
                          <polygon points="40,20 180,30 170,110 50,100" fill="#0f172a" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
                          <text x="90" y="65" fill="#64748b" fontSize="10" fontFamily="monospace">Survey 141</text>
                          
                          <polygon points="200,30 360,40 350,120 190,110" fill="#0f172a" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
                          <text x="260" y="75" fill="#64748b" fontSize="10" fontFamily="monospace">Survey 143</text>

                          {/* Selected High-Precision Cadastral Polygon */}
                          <polygon 
                            points="60,110 340,120 330,220 70,210" 
                            fill="#059669" 
                            fillOpacity="0.45" 
                            stroke="#10b981" 
                            strokeWidth="3" 
                          />
                          
                          {/* Center Marker & Labels */}
                          <circle cx="200" cy="165" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                          <text x="130" y="160" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">
                            ULPIN: {parcel.ulpin}
                          </text>
                          <text x="145" y="180" fill="#fef08a" fontSize="11" fontWeight="semibold" fontFamily="sans-serif">
                            Survey {parcel.surveyNo} ({parcel.spatialAttributes?.areaAcres} Acres)
                          </text>
                          
                          {/* Corner Coordinate Benchmarks */}
                          <text x="30" y="115" fill="#94a3b8" fontSize="8" fontFamily="monospace">Pt-1: 73.7375, 18.5905</text>
                          <text x="270" y="115" fill="#94a3b8" fontSize="8" fontFamily="monospace">Pt-2: 73.7405, 18.5908</text>
                          <text x="270" y="235" fill="#94a3b8" fontSize="8" fontFamily="monospace">Pt-3: 73.7402, 18.5925</text>
                          <text x="30" y="235" fill="#94a3b8" fontSize="8" fontFamily="monospace">Pt-4: 73.7378, 18.5921</text>
                        </svg>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-mono">
                        <span>Survey Scale: 1:500 (DGPS SVAMITVA Standard)</span>
                        <span>Accuracy: Class-A (+/- 5cm)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Textual & Certified Ledger Canvas */
                  <div className="space-y-4 text-xs">
                    
                    {/* Document Identification Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono">
                      <div>
                        <span className="text-[10px] text-slate-500 block">14-Digit ULPIN:</span>
                        <span className="font-bold text-[#103b66] text-xs">{parcel.ulpin}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Survey / Khasra No:</span>
                        <span className="font-bold text-slate-900 text-xs">{parcel.surveyNo}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Khata / Khatiyan No:</span>
                        <span className="font-bold text-slate-900 text-xs">{parcel.revenueRecords?.khataNumber || 'KH-489'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Cadastral Area:</span>
                        <span className="font-bold text-emerald-800 text-xs">{parcel.spatialAttributes?.areaAcres} Acres ({parcel.spatialAttributes?.areaHectares} Ha)</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Land Classification:</span>
                        <span className="font-bold text-slate-900 text-xs">{parcel.landClassification}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Title Status:</span>
                        <span className="font-bold text-slate-900 text-xs">{parcel.status}</span>
                      </div>
                    </div>

                    {/* Ownership Particulars */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl">
                      <span className="font-bold text-slate-900 block mb-2 text-xs border-b pb-1">
                        पट्टेदार एवं भू-स्वामी विवरण • Landowner & Khatedar Registry Particulars:
                      </span>
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700">
                            <th className="p-2 border border-slate-200">Sr.</th>
                            <th className="p-2 border border-slate-200">Landowner Name</th>
                            <th className="p-2 border border-slate-200">Relationship</th>
                            <th className="p-2 border border-slate-200">Share %</th>
                            <th className="p-2 border border-slate-200">Aadhaar / PAN Seeded</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parcel.revenueRecords?.owners?.map((o, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-2 border border-slate-200 font-bold">{idx + 1}</td>
                              <td className="p-2 border border-slate-200 font-bold text-slate-900">{o.name}</td>
                              <td className="p-2 border border-slate-200 text-slate-600">{o.relation}</td>
                              <td className="p-2 border border-slate-200 font-mono font-bold text-[#103b66]">{o.share}%</td>
                              <td className="p-2 border border-slate-200 font-mono text-emerald-700 font-bold">
                                {o.aadhaarMasked || 'XXXXXXXX9284'} (Seeded)
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                )}

                {/* Digital Verification & Stamp Footer */}
                <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-emerald-950">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-extrabold text-xs block text-emerald-900">
                        Certified & Digitally Signed Document
                      </span>
                      <span className="text-[11px] text-emerald-800 block">
                        Verified by {selectedDoc.issuingAuthority} • Issued on {selectedDoc.issueDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <QrCode className="w-10 h-10 text-emerald-900" />
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center shrink-0">
              <span className="text-[11px] text-slate-500 font-mono">
                Digitally authenticated with 256-bit SHA Certificate
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadDoc(selectedDoc)}
                  className="gov-btn-primary px-4 py-2 text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Certified PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

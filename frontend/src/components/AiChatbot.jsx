import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

/* ─────────────────────────────────────────────
   Comprehensive knowledge base for BHOO BHUMI
───────────────────────────────────────────── */
const KB = [
  /* 1. ULPIN / Bhu-Aadhaar */
  {
    keywords: ['ulpin', 'bhu-aadhaar', 'bhu aadhaar', 'bhuaadhaar', '14-digit', '14 digit', 'unique land', 'land id', 'parcel id', 'parcel number'],
    response: `📍 **ULPIN / Bhu-Aadhaar (14-Digit Unique Land Parcel ID)**\n\n` +
      `• ULPIN is a **14-digit alphanumeric code** assigned to every land parcel in India, derived from its DGPS-surveyed geographic centroid coordinates.\n` +
      `• Format: **IN-{State}-{District}-{Year}-{Sequence}** (e.g. IN-MH-PUN-2024-009871)\n` +
      `• Acts as the "**Aadhaar for Land**" — anchoring Revenue RoR, sale deeds, bank mortgages, court stays, municipal NOCs, and utility hooks to one physical parcel.\n` +
      `• Citizens can download a digitally-signed **Bhu-Aadhaar Passbook** with a QR code for instant offline verification.`,
    buttons: (ctx) => [
      { label: '📜 View Bhu-Aadhaar Certificate', action: () => ctx.setIsBhuAadhaarModalOpen(true) },
      { label: '🔍 Verify ULPIN QR Code', action: () => ctx.setIsQRVerifyModalOpen(true) },
    ]
  },
  /* 2. 8-in-1 Dossier */
  {
    keywords: ['dossier', '8-in-1', '8 in 1', 'registry', 'records', '7/12', 'ror', 'unified record', 'land record', 'land records', 'seven twelve', 'khatauni'],
    response: `📚 **8-in-1 Synchronized Land Record Dossier**\n\n` +
      `BHOO BHUMI unifies 8 multi-departmental registries into one dashboard:\n\n` +
      `1️⃣ **Revenue RoR (7/12 & Khatauni)** — Ownership share & crop history\n` +
      `2️⃣ **SRO Registration Deeds** — Conveyance, sale deeds & Index-II\n` +
      `3️⃣ **Town Planning & Zoning** — Master Plan 2031 FAR & setback rules\n` +
      `4️⃣ **Municipal NOCs** — Building permissions & occupancy certificates\n` +
      `5️⃣ **Property Tax** — Assessment ID, dues & instant receipts\n` +
      `6️⃣ **CERSAI & Bank Mortgages** — Hypothecation & lien clearance\n` +
      `7️⃣ **e-Courts & Risk Index** — Injunctions, stay orders & risk score\n` +
      `8️⃣ **Utilities GIS** — Power feeder, water & sewerage hooks`,
    buttons: (ctx) => [
      { label: '🚀 Open 8-in-1 Dossier Engine', action: () => ctx.setActiveTab('dossier') },
      { label: '⚖️ Compare 2 Parcels Side-by-Side', action: () => ctx.setIsCompareModalOpen(true) },
    ]
  },
  /* 3. Mutation / Khata Transfer */
  {
    keywords: ['mutate', 'mutation', 'khata', 'apply', 'transfer', 'khata transfer', 'name change', 'ownership transfer', 'conveyance', 'deed transfer'],
    response: `📝 **Online Digital Mutation & Khata Transfer**\n\n` +
      `BHOO BHUMI supports a **fully paperless mutation workflow**:\n\n` +
      `• **Step 1:** Citizen submits mutation application online with registered deed ID & KYC documents.\n` +
      `• **Step 2:** Revenue Inspector (Patwari) verifies DGPS cadastre boundaries & issues a 15-day public notice.\n` +
      `• **Step 3:** Sub-Registrar validates the SRO deed against Index-II records.\n` +
      `• **Step 4:** Tehsildar issues a digital mutation order — the 7/12 RoR is updated automatically.\n\n` +
      `⏱️ **Target turnaround: 7 working days** (vs. 45–90 days in traditional system).`,
    buttons: (ctx) => [
      { label: '📝 Apply for Online Mutation', action: () => ctx.setActiveTab('services') },
      { label: '⏱️ Track Existing Application', action: () => ctx.setActiveTab('tracker') },
    ]
  },
  /* 4. Title Health / Risk Index */
  {
    keywords: ['title health', 'title score', 'risk score', 'risk index', 'clear title', 'stay order', 'court stay', 'dispute', 'litigation', 'legal risk', 'title risk'],
    response: `🛡️ **Title Health Index & Risk Scoring Algorithm**\n\n` +
      `BHOO BHUMI's risk engine calculates a real-time title security score (0–100):\n\n` +
      `• **80–100 (Clear Title / Green):** Unencumbered, zero court stays, single owner, property tax clear.\n` +
      `• **50–79 (Moderate Caution / Amber):** Active bank mortgage (CERSAI registered) or pending municipal dues.\n` +
      `• **0–49 (High Risk / Red / Court Stay):** Active civil court injunction (e-Courts NJDG) or double-sale conflict.\n\n` +
      `🔒 *When a court stay is active, Sub-Registrar deed registration and Revenue mutation are automatically locked.*`,
    buttons: (ctx) => [
      { label: '🛡️ View Title Risk in Dossier', action: () => ctx.setActiveTab('dossier') },
      { label: '🗺️ Inspect GIS Cadastre', action: () => ctx.setActiveTab('map') },
    ]
  },
  /* 5. GIS Map / Cadastre */
  {
    keywords: ['gis', 'map', 'cadastre', 'cadastral', 'boundary', 'boundaries', 'satellite', 'basemap', 'layer', 'polygon', 'survey number', 'khasra map', 'geo', 'coordinates'],
    response: `🗺️ **Interactive GIS Land Cadastre**\n\n` +
      `• High-resolution DGPS/Drone survey polygon layers embedded on Leaflet.\n` +
      `• Color-coded by land-use (Green: Agricultural, Blue: Commercial, Amber: Residential, Red: Court Stayed).\n` +
      `• Live **Area Measurement tool** (click map vertices to calculate sq. meters & acres).\n` +
      `• Layer opacity slider, satellite basemap toggle, and district boundary filters.`,
    buttons: (ctx) => [
      { label: '🗺️ Launch GIS Cadastral Map', action: () => ctx.setActiveTab('map') },
    ]
  },
  /* 6. Property Tax */
  {
    keywords: ['property tax', 'tax', 'pay tax', 'tax dues', 'sas', 'municipal tax', 'assessment', 'receipt', 'tax receipt'],
    response: `💳 **Municipal Property Tax Integration**\n\n` +
      `• Integrated with Municipal Corporation Self-Assessment Scheme (SAS).\n` +
      `• Real-time display of annual tax assessment, paid status, and pending dues.\n` +
      `• **Instant 1-Click Tax Settlement** directly inside the 8-in-1 Dossier.\n` +
      `• Automatic digital receipt generation upon payment confirmation.`,
    buttons: (ctx) => [
      { label: '💳 View Tax & Pay Dues', action: () => ctx.setActiveTab('dossier') },
    ]
  },
  /* 7. Bank Mortgage / CERSAI */
  {
    keywords: ['cersai', 'mortgage', 'bank loan', 'lien', 'hypothecation', 'charge', 'bank charge', 'loan', 'encumbrance', 'nec'],
    response: `🏦 **CERSAI & Bank Mortgage Lien Sync**\n\n` +
      `• BHOO BHUMI integrates with **CERSAI (Central Registry of Securitisation Asset Reconstruction and Security Interest)** to display active bank mortgage liens.\n` +
      `• Prevents illegal double-mortgaging of land across multiple banks.\n` +
      `• Shows lender bank name, loan facility type, and sanctioned lien amount.\n` +
      `• Generates digital **Non-Encumbrance Certificates (NEC)** for clear parcels.`,
    buttons: (ctx) => [
      { label: '🏦 Check Encumbrance in Dossier', action: () => ctx.setActiveTab('dossier') },
    ]
  },
  /* 8. SRO Deed / Stamp Registration */
  {
    keywords: ['sro', 'sub-registrar', 'sub registrar', 'deed', 'sale deed', 'conveyance', 'index-ii', 'index 2', 'stamp duty', 'market valuation', 'ready reckoner'],
    response: `📜 **Sub-Registrar (SRO) Deed Integration**\n\n` +
      `• Synchronized with State Registration & Stamps Department.\n` +
      `• Displays Deed Number, Instrument Type, Registration Date, SRO Office, and Stamp Duty Paid.\n` +
      `• **Cryptographically-signed Index-II extract** prevents forged title deeds.\n` +
      `• Cross-referenced against Government Ready Reckoner / Circle Rates.`,
    buttons: (ctx) => [
      { label: '📜 View Registered Deed Details', action: () => ctx.setActiveTab('dossier') },
    ]
  },
  /* 9. Town Planning & Zoning */
  {
    keywords: ['town planning', 'zoning', 'master plan', 'far', 'fsi', 'building height', 'setback', 'na conversion', 'non agricultural', 'land use'],
    response: `🏗️ **Town Planning & Zoning Integration**\n\n` +
      `• Linked with Urban Development & Town Planning Master Plan 2031.\n` +
      `• Displays permissible **Floor Area Ratio (FAR / FSI)** and max building height limits.\n` +
      `• Highlights buffer zone restrictions (NDZ, CRZ, River/Railway/Highway setbacks).\n` +
      `• Auto-evaluates **Non-Agricultural (NA) conversion eligibility**.`,
    buttons: (ctx) => [
      { label: '🏗️ View Zoning & FAR Rules', action: () => ctx.setActiveTab('dossier') },
    ]
  },
  /* 10. Municipal Building Permits / NOCs */
  {
    keywords: ['building permit', 'building sanction', 'obps', 'noc', 'fire noc', 'env noc', 'occupancy certificate', 'oc', 'municipal noc'],
    response: `🏢 **Municipal Building Permissions & Statutory NOCs**\n\n` +
      `• Synchronized with Online Building Permission System (OBPS).\n` +
      `• Tracks Fire Department NOC, Environmental Clearance, and AAI Aviation Height NOC.\n` +
      `• Displays Sanction File Status and Occupancy Certificate (OC) issuance.`,
    buttons: (ctx) => [
      { label: '🏢 Check Municipal NOCs', action: () => ctx.setActiveTab('dossier') },
    ]
  },
  /* 11. Officer Workflows / Roles */
  {
    keywords: ['officer', 'patwari', 'tehsildar', 'sub-registrar officer', 'revenue officer', 'municipal officer', 'approval', 'sanction', 'workflow', 'scrutiny', 'e-sign'],
    response: `🏛️ **Government Officer Workflow Console**\n\n` +
      `BHOO BHUMI provides custom portals for all stakeholders:\n\n` +
      `• 👨‍💼 **Revenue Inspector (Patwari)** — Field verification & cadastre inspection\n` +
      `• 🏛️ **Tehsildar / Mamlatdar** — Mutation sanction & 7/12 e-signature\n` +
      `• 📜 **Sub-Registrar (SRO)** — Sale deed validation & Index-II lock\n` +
      `• 🏗️ **Town Planner / Municipal Officer** — FAR & zoning compliance review\n\n` +
      `*Use the top-right "Role Persona Switcher" to test any officer workflow live!*`,
    buttons: (ctx) => [
      { label: '🏛️ Open Officer Approval Console', action: () => ctx.setActiveTab('officer_workflow') },
    ]
  },
  /* 12. Audit Trail & Forensic Security */
  {
    keywords: ['audit', 'audit log', 'blockchain', 'hash', 'sha-256', 'tamper', 'security', 'log', 'forensic', 'tamper-evident'],
    response: `🔒 **Tamper-Evident Forensic Audit Log**\n\n` +
      `• Every action on BHOO BHUMI is recorded in a **cryptographically hashed audit log**.\n` +
      `• Each entry contains a SHA-256 hash chaining to the previous record.\n` +
      `• Any modification attempt is automatically detected — making BHOO BHUMI fully **forensic-audit compliant**.`,
    buttons: (ctx) => [
      { label: '🔒 View Audit Trail Console', action: () => ctx.setActiveTab('admin') },
    ]
  },
  /* 13. Fraud Prevention */
  {
    keywords: ['fraud', 'prevent fraud', 'double sale', 'forgery', 'illegal sale', 'scam', 'protection', 'safety'],
    response: `🛡️ **How BHOO BHUMI Prevents Land Fraud:**\n\n` +
      `1️⃣ **Zero Double Sales:** SRO sale deed registration is bound to ULPIN centroid. Duplicate registration attempts trigger an automated block.\n` +
      `2️⃣ **Court Stay Injunction Lock:** Active civil stay orders automatically freeze mutation and transfer APIs in real-time.\n` +
      `3️⃣ **Anti Mortgaging Fraud:** CERSAI integration displays active bank loans, preventing buyers from purchasing encumbered land.\n` +
      `4️⃣ **Aadhaar Identity Binding:** Landowners' Aadhaar is cryptographically seeded to Khatedar entries.`,
    buttons: (ctx) => [
      { label: '🛡️ Check Title Risk Index', action: () => ctx.setActiveTab('dossier') },
    ]
  },
  /* 14. What is BHOO BHUMI / About */
  {
    keywords: ['what is bhoo bhumi', 'about bhoo bhumi', 'bhoo bhumi', 'bhoobhumi', 'what is this', 'dpi', 'digital public infrastructure', 'platform', 'project', 'purpose'],
    response: `🏛️ **What is BHOO BHUMI?**\n\n` +
      `BHOO BHUMI is India's **Integrated GIS-based Digital Public Infrastructure (DPI) for Land Governance**.\n\n` +
      `It eliminates fragmented land administration by anchoring all land-related data to a single physical parcel via a 14-digit **ULPIN / Bhu-Aadhaar**.\n\n` +
      `**Key Pillars:**\n` +
      `• 🗺️ Parcel-centric GIS architecture with DGPS precision\n` +
      `• 🔗 8 interoperable government & financial registries\n` +
      `• 🤖 Automated Title Risk Scoring (0–100)\n` +
      `• 📜 Paperless mutation & digital passbook issuance\n` +
      `• 🏛️ Multi-stakeholder portals for Citizens, Officers & Admins`,
    buttons: (ctx) => [
      { label: '🗺️ Open GIS Map', action: () => ctx.setActiveTab('map') },
      { label: '📝 Apply for Mutation', action: () => ctx.setActiveTab('services') },
    ]
  },
  /* 15. Login / Auth */
  {
    keywords: ['login', 'sign in', 'register', 'signup', 'account', 'aadhaar login', 'otp', 'phone login', 'authentication', 'access'],
    response: `🔐 **Citizen Login & Registration**\n\n` +
      `BHOO BHUMI supports multiple authentication methods:\n\n` +
      `• 📱 **Mobile OTP Login** — Enter your 10-digit phone number and receive an instant OTP.\n` +
      `• 🆔 **Aadhaar / VID Login** — Use your 12-digit UIDAI Aadhaar number with biometric OTP.\n` +
      `• 🏛️ **Official / Admin Login** — Government officers authenticate via Parichay / Employee SSO.`,
    buttons: (ctx) => [
      { label: '🔐 Login / Register Now', action: () => { ctx.setAuthModalMode('login'); ctx.setIsAuthModalOpen(true); } },
    ]
  }
];

function findBestMatch(userQuery) {
  const queryLower = userQuery.toLowerCase().trim();
  let bestMatch = null;
  let highestScore = 0;

  for (const item of KB) {
    let score = 0;
    for (const kw of item.keywords) {
      if (queryLower.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return highestScore > 0 ? bestMatch : null;
}

export const AiChatbot = () => {
  const ctx = useLandStack();
  const {
    isChatbotOpen,
    setIsChatbotOpen,
    setActiveTab
  } = ctx;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `👋 **Welcome to BHOO BHUMI AI Assistant!**\n\nI'm your intelligent guide to India's Integrated GIS-based Land Governance Portal. Ask me anything about:\n• ULPIN / Bhu-Aadhaar\n• 8-in-1 Dossier (7/12 RoR)\n• Digital Land Mutation\n• Title Health & Court Stays\n• Property Tax & SRO Deeds\n• GIS Cadastral Map Search\n\nOr click a quick question below! 🌿`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButtons: [
        { label: '🗺️ Open GIS Land Map', action: () => setActiveTab('map') },
        { label: '📄 Explore 8-in-1 Dossier', action: () => setActiveTab('dossier') },
        { label: '📝 Apply for Mutation', action: () => setActiveTab('services') },
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickQuestions = [
    { id: 'ulpin', title: '🆔 What is ULPIN?', query: 'What is ULPIN Bhu-Aadhaar?' },
    { id: 'dossier', title: '📚 8-in-1 Dossier', query: 'What is the 8-in-1 dossier?' },
    { id: 'mutation', title: '📝 Apply Mutation', query: 'How to apply for mutation?' },
    { id: 'risk', title: '🛡️ Title Risk Score', query: 'How does title risk score work?' },
    { id: 'tax', title: '💳 Property Tax', query: 'How to pay property tax online?' },
    { id: 'fraud', title: '⚠️ Fraud Prevention', query: 'How does BHOO BHUMI prevent fraud?' },
    { id: 'officer', title: '🏛️ Officer Roles', query: 'What are the officer roles in BHOO BHUMI?' },
  ];

  const handleSendMessage = (userQueryText = null) => {
    const query = (userQueryText || inputValue).trim();
    if (!query) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: userTime
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userQueryText) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const generateBotResponse = (query) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const match = findBestMatch(query);

    if (match) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        time,
        text: match.response,
        actionButtons: match.buttons ? match.buttons(ctx) : []
      };
    }

    return {
      id: Date.now() + 1,
      sender: 'bot',
      time,
      text: `🤖 **BHOO BHUMI AI — Response to: "${query}"**\n\n` +
        `Here is what you can explore:\n\n` +
        `• 🗺️ **GIS Map** — Browse cadastral parcel boundaries\n` +
        `• 📄 **8-in-1 Dossier** — View synchronized 7/12 RoR data\n` +
        `• 📝 **Citizen Services** — Apply for paperless mutation\n\n` +
        `💡 *Tip: Try keywords like "mutation", "ULPIN", "risk score", "tax", "mortgage", or "map".*`,
      actionButtons: [
        { label: '🗺️ Open GIS Map', action: () => setActiveTab('map') },
        { label: '📄 Open 8-in-1 Dossier', action: () => setActiveTab('dossier') },
      ]
    };
  };

  const handleReset = () => {
    setMessages([{
      id: Date.now(),
      sender: 'bot',
      text: `🔄 **Chat Reset!** Ask me anything about BHOO BHUMI — ULPIN, mutations, GIS maps, risk scores, property tax, and more.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButtons: [
        { label: '🗺️ Open GIS Map', action: () => setActiveTab('map') },
        { label: '📄 Explore Dossier', action: () => setActiveTab('dossier') },
      ]
    }]);
  };

  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-[#103b66]">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isChatbotOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[2500]">
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="flex items-center space-x-2 px-4 py-3 rounded-full bg-[#103b66] text-white font-bold shadow-xl hover:bg-[#0a2540] border-2 border-amber-500 cursor-pointer transition-all"
            title="Open BHOO BHUMI AI Assistant"
          >
            <Bot className="w-5 h-5 text-amber-400" />
            <span className="text-xs uppercase tracking-wider">
              भू भूमि AI Assistant
            </span>
          </button>
        </div>
      )}

      {/* Chatbot Window */}
      {isChatbotOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[2500]
          w-full sm:w-[380px] md:w-[420px]
          h-[100dvh] sm:h-[560px] sm:max-h-[88vh]
          bg-white border border-slate-300
          sm:rounded shadow-2xl
          flex flex-col overflow-hidden text-xs text-slate-900 font-sans">

          {/* Header */}
          <div className="bg-[#103b66] text-white px-4 py-3 flex items-center justify-between border-b-2 border-amber-600 shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-amber-600 flex items-center justify-center font-bold text-white">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-xs">BHOO BHUMI AI Assistant</h3>
                <p className="text-[10px] text-slate-200">Government Land Governance Helpdesk</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={handleReset} className="p-1 text-slate-200 hover:text-white" title="Reset Chat">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setIsChatbotOpen(false)} className="p-1 text-slate-200 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#f4f6f9]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-[#103b66] text-white rounded-br-none'
                      : 'bg-white border border-slate-300 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {renderText(msg.text)}

                  {/* Action buttons inside bot response */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-200 flex flex-wrap gap-1">
                      {msg.actionButtons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            btn.action();
                            setIsChatbotOpen(false);
                          }}
                          className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-[#103b66] border border-blue-200 font-bold text-[10px] transition-colors"
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 p-2 bg-white border border-slate-200 rounded max-w-[120px]">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                <span className="text-slate-600 text-[11px] font-semibold">Analyzing...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Questions Horizontal Scroll */}
          <div className="p-2 bg-white border-t border-slate-200 flex items-center space-x-1.5 overflow-x-auto scrollbar-none shrink-0">
            {quickQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSendMessage(q.query)}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 text-[#103b66] border border-slate-300 font-semibold text-[10px] whitespace-nowrap shrink-0"
              >
                {q.title}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2 bg-white border-t border-slate-300 flex items-center gap-1.5 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about land records or ULPIN..."
              className="gov-input text-xs flex-1"
            />
            <button
              type="submit"
              className="gov-btn-primary p-2 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

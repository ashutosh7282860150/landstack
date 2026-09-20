import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Layers, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  Maximize2,
  Minimize2,
  RefreshCw,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';

export const AiChatbot = () => {
  const { 
    isChatbotOpen, 
    setIsChatbotOpen, 
    setActiveTab, 
    selectParcelByUlpin, 
    setIsBhuAadhaarModalOpen,
    setIsQRVerifyModalOpen,
    setIsCompareModalOpen,
    language,
    t
  } = useLandStack();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: t('chatbot.welcome'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButtons: [
        { label: '🗺️ Open GIS Land Map', action: () => setActiveTab('map') },
        { label: '📄 Explore 8-in-1 Dossier', action: () => setActiveTab('dossier') },
        { label: '📝 Apply for Mutation', action: () => setActiveTab('services') }
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
    {
      id: 'ulpin',
      title: 'What is 14-Digit ULPIN?',
      query: 'What is ULPIN / Bhu-Aadhaar and how is it calculated?'
    },
    {
      id: 'dossier',
      title: 'What is 8-in-1 Dossier?',
      query: 'What information is synchronized in the 8-in-1 Unified Dossier?'
    },
    {
      id: 'mutation',
      title: 'How to apply for Mutation?',
      query: 'How do I submit an online mutation and track Patwari approval?'
    },
    {
      id: 'risk',
      title: 'Title Risk Index & Court Stay',
      query: 'How does the Title Health Index (0-100) and e-Courts stay checking work?'
    },
    {
      id: 'tax',
      title: 'Pay Property Tax Online',
      query: 'How do I view pending property taxes and generate an instant payment receipt?'
    },
    {
      id: 'officer',
      title: 'Officer Persona Workflows',
      query: 'What are the roles of Revenue Officer, Sub-Registrar, and Town Planner?'
    }
  ];

  const handleSendMessage = (userQueryText = null) => {
    const query = (userQueryText || inputValue).trim();
    if (!query) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: userTime
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userQueryText) setInputValue('');
    setIsTyping(true);

    // Simulate AI reasoning and response generation
    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 700);
  };

  const generateBotResponse = (query) => {
    const q = query.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. ULPIN / Bhu-Aadhaar
    if (q.includes('ulpin') || q.includes('bhu-aadhaar') || q.includes('bhu aadhaar') || q.includes('14-digit') || q.includes('identity')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        time,
        text: `📍 **ULPIN (Unique Land Parcel Identification Number) / Bhu-Aadhaar:**\n\n` +
          `• ULPIN is a unique **14-digit alphanumeric code** assigned to every land parcel in India based on its geo-referenced DGPS centroid coordinates.\n` +
          `• It acts as the **"Aadhaar for Land"**, ensuring that revenue records, sale deeds, zoning plans, municipal NOCs, bank liens, and court stays are anchored to one physical parcel.\n` +
          `• You can print official **Bhu-Aadhaar Land Passbooks** embedded with cryptographically signed QR codes for instant offline verification.`,
        actionButtons: [
          { label: '📜 View Bhu-Aadhaar Certificate Demo', action: () => setIsBhuAadhaarModalOpen(true) },
          { label: '🔍 Verify ULPIN QR Code', action: () => setIsQRVerifyModalOpen(true) }
        ]
      };
    }

    // 2. 8-in-1 Dossier
    if (q.includes('dossier') || q.includes('8-in-1') || q.includes('registry') || q.includes('records') || q.includes('7/12') || q.includes('ror')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        time,
        text: `📚 **8-in-1 Synchronized Land Record Dossier:**\n\n` +
          `LAND STACK unifies 8 multi-departmental registries into a single synchronized dashboard:\n\n` +
          `1. **Revenue RoR (7/12 & Khatauni)** - Ownership share & crop history\n` +
          `2. **SRO Registration Deeds** - Conveyance, Sale deeds & Index-II\n` +
          `3. **Town Planning & Zoning** - Master Plan 2031 FAR & setback rules\n` +
          `4. **Municipal NOCs** - Building permissions & Occupancy certificates\n` +
          `5. **Property Tax** - Assessment ID, dues & instant receipt generation\n` +
          `6. **CERSAI & Bank Mortgages** - Hypothecation & lien clearance\n` +
          `7. **e-Courts & Risk Index** - Injunctions, stay orders & risk score\n` +
          `8. **Utilities GIS** - Power feeder load, water & sewerage hooks`,
        actionButtons: [
          { label: '🚀 Open 8-in-1 Dossier Engine', action: () => setActiveTab('dossier') },
          { label: '⚖️ Compare 2 Parcels Side-by-Side', action: () => setIsCompareModalOpen(true) }
        ]
      };
    }

    // 3. Mutation Application
    if (q.includes('mutate') || q.includes('mutation') || q.includes('khata') || q.includes('apply') || q.includes('service')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        time,
        text: `📝 **Online Digital Mutation & Khata Transfer:**\n\n` +
          `• LAND STACK supports paperless, auto-triggered mutation workflows upon deed registration.\n` +
          `• **Step 1:** Citizen submits online mutation application with registered deed ID.\n` +
          `• **Step 2:** Revenue Inspector (Patwari) inspects DGPS cadastre & issues public notice.\n` +
          `• **Step 3:** Sub-Registrar validates SRO Index-II compliance.\n` +
          `• **Step 4:** Tehsildar issues digital order, automatically updating the 7/12 RoR.`,
        actionButtons: [
          { label: '📝 Apply for Online Mutation', action: () => setActiveTab('services') },
          { label: '⏱️ Track Existing Application', action: () => setActiveTab('tracker') }
        ]
      };
    }

    // 4. Title Risk Index & Court Stay
    if (q.includes('risk') || q.includes('court') || q.includes('stay') || q.includes('litigation') || q.includes('score') || q.includes('title')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        time,
        text: `🛡️ **Automated Title Health Index (0-100 Score):**\n\n` +
          `• LAND STACK's AI risk engine automatically calculates title security scores:\n` +
          `  - **90-100 (Clear Green):** Free of encumbrances, clear title & verified ownership.\n` +
          `  - **50-89 (Moderate Amber):** Minor pending property tax dues or pending mutation.\n` +
          `  - **Below 50 (Red / Flagged):** Active civil court stay order or bank mortgage lien.\n\n` +
          `• Real-time integration with **e-Courts API** prevents illegal deed registrations on stayed parcels.`,
        actionButtons: [
          { label: '🗺️ Inspect GIS Cadastre Map', action: () => setActiveTab('map') },
          { label: '🛡️ View Admin Audit Log', action: () => setActiveTab('admin') }
        ]
      };
    }

    // 5. Property Tax
    if (q.includes('tax') || q.includes('pay') || q.includes('dues') || q.includes('receipt') || q.includes('payment')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        time,
        text: `💳 **Integrated Property Tax & Instant Receipts:**\n\n` +
          `• Every land parcel links directly to its Municipal Property Tax ID.\n` +
          `• Citizens can view annual tax assessments, outstanding dues, and make instant online payments.\n` +
          `• Upon payment, an instant cryptographically signed receipt is stored in the tamper-evident audit log.`,
        actionButtons: [
          { label: '📄 Check Parcel Property Tax', action: () => selectParcelByUlpin('IN-MH-PUN-2024-009871', 'tax') }
        ]
      };
    }

    // 6. Officer Roles
    if (q.includes('officer') || q.includes('patwari') || q.includes('tehsildar') || q.includes('registrar') || q.includes('role') || q.includes('admin')) {
      return {
        id: Date.now() + 1,
        sender: 'bot',
        time,
        text: `🏛️ **Multi-Stakeholder Governance Workflows:**\n\n` +
          `LAND STACK provides custom portals for all stakeholders:\n\n` +
          `• **Public Citizen:** Search ULPIN, download Bhu-Aadhaar passbooks, apply for mutations.\n` +
          `• **Revenue Officer (Patwari / Tehsildar):** Verify field DGPS survey & sanction mutations.\n` +
          `• **Sub-Registrar (SRO):** Instant pre-registration stay/encumbrance check.\n` +
          `• **Town Planner:** Check Master Plan FAR & issue municipal building NOCs.\n` +
          `• **Admin:** Real-time DPI health monitoring & audit trail log evaluation.`,
        actionButtons: [
          { label: '🏛️ Switch to Officer Portal', action: () => setActiveTab('officer_workflow') },
          { label: '📊 View Admin Analytics', action: () => setActiveTab('admin') }
        ]
      };
    }

    // General Fallback
    return {
      id: Date.now() + 1,
      sender: 'bot',
      time,
      text: `🤖 **LAND STACK DPI Assistant Response:**\n\n` +
        `Thank you for asking about **"${query}"**.\n\n` +
        `LAND STACK is India's premier Integrated GIS-based Digital Public Infrastructure for Land Governance. You can explore cadastral maps, view 8-in-1 synchronized dossiers, apply for digital mutations, or verify ULPIN Bhu-Aadhaar passbooks.`,
      actionButtons: [
        { label: '🗺️ Open GIS Land Map', action: () => setActiveTab('map') },
        { label: '📜 Open 8-in-1 Dossier', action: () => setActiveTab('dossier') },
        { label: '📝 Apply for Mutation', action: () => setActiveTab('services') }
      ]
    };
  };

  return (
    <>
      {/* Floating Chatbot Trigger Button (Bottom Right Corner) */}
      {!isChatbotOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[2500]">
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="relative group p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-slate-950 font-black shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 border border-emerald-400/40 cursor-pointer"
            title="Open LAND STACK AI Assistant"
          >
            {/* Glowing ring pulse */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>

            <Bot className="w-6 h-6 text-slate-950 animate-bounce" />
            <span className="hidden sm:inline text-xs tracking-tight font-black uppercase text-slate-950">
              LAND STACK AI
            </span>
          </button>
        </div>
      )}

      {/* Expandable Chatbot Window */}
      {isChatbotOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[2500] w-[calc(100vw-2rem)] sm:w-96 h-[520px] max-h-[85vh] bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-xs text-slate-200 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-bold shadow">
                <Bot className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-extrabold text-white text-xs">LAND STACK AI Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-slate-400">DPI Governance Knowledge Engine</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsChatbotOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Minimize Chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Question Preset Chips */}
          <div className="bg-slate-950/70 p-2 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider shrink-0 px-1">
              Suggestions:
            </span>
            {quickQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSendMessage(q.query)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-[10px] font-medium whitespace-nowrap transition-all shrink-0"
              >
                {q.title}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-slate-950 p-3 rounded-2xl rounded-tr-none font-medium'
                    : 'bg-slate-950 border border-slate-800 p-3 rounded-2xl rounded-tl-none text-slate-200'
                }`}>
                  <div className="whitespace-pre-line leading-relaxed text-[11px]">
                    {msg.text}
                  </div>

                  {/* Render Action Buttons if available */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 space-y-1">
                      {msg.actionButtons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            btn.action();
                            setIsChatbotOpen(false);
                          }}
                          className="w-full p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-left text-[10px] font-bold flex items-center justify-between transition-colors group"
                        >
                          <span>{btn.label}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className={`text-[9px] block text-right font-mono ${
                    msg.sender === 'user' ? 'text-slate-900/80 font-bold' : 'text-slate-500'
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl rounded-tl-none text-slate-400 flex items-center space-x-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-150"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-300"></span>
                  <span className="text-[10px] ml-1">Analyzing Land Records...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chatbot.placeholder')}
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-40 text-slate-950 font-bold rounded-xl flex items-center justify-center shadow transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

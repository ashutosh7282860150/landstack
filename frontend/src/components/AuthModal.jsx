import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Fingerprint, 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  RefreshCw,
  Building,
  Key,
  Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLandStack, ROLES } from '../context/LandStackContext';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode,
    loginUser,
    setCurrentRole,
    setActiveTab
  } = useLandStack();

  // Tab: 'citizen' | 'admin' | 'register'
  const [activeTab, setActiveTabLocal] = useState('citizen');
  // Citizen method: 'phone' | 'aadhaar'
  const [loginMethod, setLoginMethod] = useState('phone');

  // Input states
  const [phoneInput, setPhoneInput] = useState('');
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAadhaar, setRegAadhaar] = useState('');
  const [regState, setRegState] = useState('Maharashtra');

  // OTP step
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingUser, setPendingUser] = useState(null);

  // Sync modal mode if changed externally
  useEffect(() => {
    if (authModalMode === 'register') {
      setActiveTabLocal('register');
    } else {
      setActiveTabLocal('citizen');
    }
  }, [authModalMode]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (isOtpStep && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpStep, timer]);

  if (!isAuthModalOpen) return null;

  // Generate & Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');

    let userPayload = null;

    if (activeTab === 'citizen') {
      if (loginMethod === 'phone') {
        if (!phoneInput || phoneInput.length < 10) {
          setErrorMsg('Please enter a valid 10-digit mobile number');
          return;
        }
        userPayload = {
          name: phoneInput.includes('98230') ? 'Rameshwar D. Patil' : 'Registered Landowner',
          phone: phoneInput,
          aadhaar: 'XXXXXXXX9284',
          role: 'citizen',
          isAuthenticated: true,
          authMethod: 'Mobile OTP'
        };
      } else {
        if (!aadhaarInput || aadhaarInput.length < 12) {
          setErrorMsg('Please enter a valid 12-digit Aadhaar / VID number');
          return;
        }
        userPayload = {
          name: 'Aadhaar Verified Citizen',
          phone: '+91 98230 91823',
          aadhaar: `XXXXXXXX${aadhaarInput.slice(-4)}`,
          role: 'citizen',
          isAuthenticated: true,
          authMethod: 'Aadhaar OTP'
        };
      }
    } else if (activeTab === 'register') {
      if (!regName || !regPhone) {
        setErrorMsg('Please enter your full name and mobile number');
        return;
      }
      userPayload = {
        name: regName,
        phone: regPhone,
        aadhaar: regAadhaar ? `XXXXXXXX${regAadhaar.slice(-4)}` : 'XXXXXXXX7812',
        state: regState,
        role: 'citizen',
        isAuthenticated: true,
        authMethod: 'Registration OTP'
      };
    } else if (activeTab === 'admin') {
      if (!adminIdInput) {
        setErrorMsg('Please enter your Official Employee ID or Parichay ID');
        return;
      }
      userPayload = {
        name: 'Anand S. Kulkarni (Patwari / Tehsildar)',
        employeeId: adminIdInput,
        role: 'revenue_officer',
        isAuthenticated: true,
        authMethod: 'Govt SSO'
      };
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setPendingUser(userPayload);
    setIsOtpStep(true);
    setTimer(30);
  };

  // Handle individual OTP digit change
  const handleOtpDigitChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Auto-fill Demo OTP
  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setOtpCode(generatedOtp.split(''));
    }
  };

  // Verify OTP & Login
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered.length < 6) {
      setErrorMsg('Please enter complete 6-digit OTP');
      return;
    }

    // In demo, accept generated OTP or '123456'
    if (entered === generatedOtp || entered === '123456') {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      if (pendingUser?.role === 'revenue_officer' || pendingUser?.role === 'admin') {
        const officerRole = ROLES.find(r => r.id === 'revenue_officer');
        if (officerRole) setCurrentRole(officerRole);
      }
      loginUser(pendingUser);
      setIsOtpStep(false);
      setOtpCode(['', '', '', '', '', '']);
    } else {
      setErrorMsg('Incorrect OTP. Click "Auto-fill Demo OTP" to test.');
    }
  };

  // Quick Demo Prefill helpers
  const handleQuickCitizenDemo = () => {
    setActiveTabLocal('citizen');
    setLoginMethod('phone');
    setPhoneInput('9823091823');
  };

  const handleQuickAadhaarDemo = () => {
    setActiveTabLocal('citizen');
    setLoginMethod('aadhaar');
    setAadhaarInput('541289009284');
  };

  const handleQuickAdminDemo = () => {
    setActiveTabLocal('admin');
    setAdminIdInput('REV-MH-PUN-091');
    setAdminPassword('GovTech@2026');
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto text-xs text-slate-200">
      <div className="relative w-full max-w-md max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm">LAND STACK Gateway</h2>
              <p className="text-[10px] text-slate-400">Digital Public Infrastructure Authentication</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setIsOtpStep(false);
              setErrorMsg('');
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          
          {!isOtpStep ? (
            <>
              {/* Top Persona Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTabLocal('citizen');
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center space-x-1 ${
                    activeTab === 'citizen'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Citizen</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTabLocal('admin');
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center space-x-1 ${
                    activeTab === 'admin'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Official</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTabLocal('register');
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center space-x-1 ${
                    activeTab === 'register'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>

              {/* 1. Citizen Login Flow */}
              {activeTab === 'citizen' && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  {/* Method toggle: Phone vs Aadhaar */}
                  <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800">
                    <span className="text-slate-400 font-medium">Authenticate Using:</span>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setLoginMethod('phone')}
                        className={`px-2 py-1 rounded-md font-semibold flex items-center space-x-1 ${
                          loginMethod === 'phone'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-3 h-3" />
                        <span>Mobile No</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginMethod('aadhaar')}
                        className={`px-2 py-1 rounded-md font-semibold flex items-center space-x-1 ${
                          loginMethod === 'aadhaar'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Fingerprint className="w-3 h-3" />
                        <span>Aadhaar / VID</span>
                      </button>
                    </div>
                  </div>

                  {loginMethod === 'phone' ? (
                    <div>
                      <label className="text-slate-400 block mb-1">Mobile Phone Number:</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength="10"
                          placeholder="98230 91823"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                          className="w-full pl-12 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        A 6-digit OTP will be sent to your registered mobile.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label className="text-slate-400 block mb-1">12-Digit Aadhaar / VID Number:</label>
                      <div className="relative">
                        <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          maxLength="12"
                          placeholder="5412 8900 9284"
                          value={aadhaarInput}
                          onChange={(e) => setAadhaarInput(e.target.value.replace(/\D/g, ''))}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Secure UIDAI Aadhaar OTP verification simulation.
                      </p>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-[11px] flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>Get Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Quick One-Click Demo Logins */}
                  <div className="pt-3 border-t border-slate-800 space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">
                      Quick Demo Autofill:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleQuickCitizenDemo}
                        className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-[11px] transition-colors"
                      >
                        <span className="text-emerald-400 font-bold block">👤 Rameshwar Patil</span>
                        <span className="text-slate-400 text-[10px] font-mono">+91 9823091823</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleQuickAadhaarDemo}
                        className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-[11px] transition-colors"
                      >
                        <span className="text-blue-400 font-bold block">🆔 Aadhaar Demo</span>
                        <span className="text-slate-400 text-[10px] font-mono">541289009284</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* 2. Official / Admin Login Flow */}
              {activeTab === 'admin' && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-slate-400 block mb-1">Official Employee ID / Parichay SSO:</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                      <input
                        type="text"
                        placeholder="e.g. REV-MH-PUN-091"
                        value={adminIdInput}
                        onChange={(e) => setAdminIdInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Official Password / Security PIN:</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-[11px] flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Key className="w-4 h-4" />
                    <span>Proceed to 2FA OTP Authentication</span>
                  </button>

                  {/* Quick Admin Fill */}
                  <div className="pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={handleQuickAdminDemo}
                      className="w-full p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-[11px] flex justify-between items-center"
                    >
                      <span className="text-blue-400 font-bold">🏛️ Revenue Officer (Patwari Hinjawadi)</span>
                      <span className="text-slate-400 font-mono text-[10px]">Autofill</span>
                    </button>
                  </div>
                </form>
              )}

              {/* 3. New Citizen Registration */}
              {activeTab === 'register' && (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="text-slate-400 block mb-0.5">Full Legal Name (as per Land Record):</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rameshwar Dattatray Patil"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 block mb-0.5">Mobile Phone No:</label>
                      <input
                        type="tel"
                        required
                        maxLength="10"
                        placeholder="9823091823"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-0.5">Aadhaar (Optional):</label>
                      <input
                        type="text"
                        maxLength="12"
                        placeholder="541289009284"
                        value={regAadhaar}
                        onChange={(e) => setRegAadhaar(e.target.value.replace(/\D/g, ''))}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-0.5">State / Jurisdiction:</label>
                    <select
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                  </div>

                  {errorMsg && (
                    <div className="p-2 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-[11px] flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </>
          ) : (
            /* ================= OTP VERIFICATION VIEW ================= */
            <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Smartphone className="w-6 h-6 animate-bounce" />
                </div>
                <h3 className="font-bold text-white text-base">Enter 6-Digit OTP</h3>
                <p className="text-slate-400 text-xs">
                  We've sent a 6-digit verification code for <strong className="text-emerald-400 font-mono">{pendingUser?.phone || pendingUser?.name}</strong>
                </p>
              </div>

              {/* Simulated OTP Notification Banner */}
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-emerald-300">
                    Demo Simulated OTP: <strong className="font-mono text-white text-xs">{generatedOtp}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg text-[10px] shadow"
                >
                  Auto-fill
                </button>
              </div>

              {/* 6 OTP Input Boxes */}
              <div className="flex justify-center gap-2">
                {otpCode.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-input-${i}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ))}
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-[11px] flex items-center space-x-1.5 text-center justify-center">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Access Land Stack DPI</span>
              </button>

              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOtpStep(false)}
                  className="hover:text-white underline"
                >
                  Change Mobile / Number
                </button>
                <span>
                  {timer > 0 ? `Resend in ${timer}s` : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </span>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

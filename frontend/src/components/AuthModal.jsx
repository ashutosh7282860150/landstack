import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Shield, 
  User, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLandStack, ROLES } from '../context/LandStackContext';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    loginUser,
    setCurrentRole,
    setActiveTab
  } = useLandStack();

  const [activeTab, setActiveTabLocal] = useState('citizen');
  const [loginMethod, setLoginMethod] = useState('phone');

  const [phoneInput, setPhoneInput] = useState('');
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAadhaar, setRegAadhaar] = useState('');
  const [regState, setRegState] = useState('Maharashtra');

  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingUser, setPendingUser] = useState(null);

  useEffect(() => {
    if (authModalMode === 'register') {
      setActiveTabLocal('register');
    } else {
      setActiveTabLocal('citizen');
    }
  }, [authModalMode]);

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

  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (activeTab === 'citizen') {
      if (loginMethod === 'phone' && (!phoneInput || phoneInput.length < 10)) {
        setErrorMsg('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (loginMethod === 'aadhaar' && (!aadhaarInput || aadhaarInput.length < 12)) {
        setErrorMsg('Please enter a valid 12-digit Aadhaar / UID number.');
        return;
      }

      const mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      setGeneratedOtp(mockOtp);
      setPendingUser({
        name: loginMethod === 'phone' ? `Citizen (${phoneInput.slice(-4)})` : `Aadhaar Holder (${aadhaarInput.slice(-4)})`,
        phone: phoneInput || '9823091823',
        aadhaar: aadhaarInput ? `XXXXXXXX${aadhaarInput.slice(-4)}` : 'XXXXXXXX9284',
        role: 'citizen'
      });
      setIsOtpStep(true);
      setTimer(30);
      setOtpCode([mockOtp[0], mockOtp[1], mockOtp[2], mockOtp[3], mockOtp[4], mockOtp[5]]);
    } else if (activeTab === 'register') {
      if (!regName || !regPhone || regPhone.length < 10) {
        setErrorMsg('Please enter full name and valid 10-digit mobile number.');
        return;
      }

      const mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      setGeneratedOtp(mockOtp);
      setPendingUser({
        name: regName,
        phone: regPhone,
        aadhaar: regAadhaar ? `XXXXXXXX${regAadhaar.slice(-4)}` : 'XXXXXXXX1122',
        role: 'citizen',
        state: regState
      });
      setIsOtpStep(true);
      setTimer(30);
      setOtpCode([mockOtp[0], mockOtp[1], mockOtp[2], mockOtp[3], mockOtp[4], mockOtp[5]]);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered !== generatedOtp && entered !== '123456') {
      setErrorMsg('Invalid OTP entered. Try again or check demo code.');
      return;
    }

    if (pendingUser) {
      loginUser(pendingUser);
      const citizenRole = ROLES.find(r => r.id === 'citizen');
      if (citizenRole) setCurrentRole(citizenRole);
      setIsAuthModalOpen(false);
      setIsOtpStep(false);
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!adminIdInput) {
      setErrorMsg('Please enter official Government Employee ID / SSO login.');
      return;
    }

    const adminUser = {
      name: `Officer (${adminIdInput})`,
      role: 'revenue_officer',
      officialId: adminIdInput
    };
    loginUser(adminUser);
    const officerRole = ROLES.find(r => r.id === 'revenue_officer');
    if (officerRole) setCurrentRole(officerRole);
    setActiveTab('officer_workflow');
    setIsAuthModalOpen(false);
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
  };

  const handleOtpDigitChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...otpCode];
    newCode[index] = value;
    setOtpCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`modal-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleQuickDemoFillPhone = () => {
    setActiveTabLocal('citizen');
    setLoginMethod('phone');
    setPhoneInput('9823091823');
    setErrorMsg('');
  };

  const handleQuickDemoFillAadhaar = () => {
    setActiveTabLocal('citizen');
    setLoginMethod('aadhaar');
    setAadhaarInput('465656565656');
    setErrorMsg('');
  };

  const handleQuickAdminDemo = () => {
    setActiveTabLocal('admin');
    setAdminIdInput('REV-MH-PUN-091');
    setAdminPassword('GovTech@2026');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto text-xs text-[#1f2937]">
      <div className="relative w-full max-w-md bg-white border-2 border-slate-300 rounded-2xl shadow-2xl overflow-hidden font-sans max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-[#103b66] px-5 py-3.5 text-white flex items-center justify-between border-b-2 border-amber-600 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center font-black text-white text-sm shadow-sm">
              भू
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">भू भूमि - राष्ट्रीय पोर्टल लॉगिन</h2>
              <p className="text-[11px] text-slate-200">BHOO BHUMI Single Sign-On Gateway</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setIsOtpStep(false);
              setErrorMsg('');
            }}
            className="p-1 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          
          {!isOtpStep ? (
            <>
              {/* Persona Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-300">
                <button
                  type="button"
                  onClick={() => { setActiveTabLocal('citizen'); setErrorMsg(''); }}
                  className={`py-2 rounded-lg font-bold text-xs transition-all ${
                    activeTab === 'citizen' ? 'bg-[#103b66] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  📱 नागरिक (Citizen)
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTabLocal('admin'); setErrorMsg(''); }}
                  className={`py-2 rounded-lg font-bold text-xs transition-all ${
                    activeTab === 'admin' ? 'bg-[#103b66] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🏛️ अधिकारी (Officer)
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTabLocal('register'); setErrorMsg(''); }}
                  className={`py-2 rounded-lg font-bold text-xs transition-all ${
                    activeTab === 'register' ? 'bg-[#103b66] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  + नया पंजीकरण
                </button>
              </div>

              {/* 1. Citizen Login */}
              {activeTab === 'citizen' && (
                <form onSubmit={handleSendOtp} className="space-y-3.5">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLoginMethod('phone')}
                      className={`flex-1 py-2 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors ${
                        loginMethod === 'phone' ? 'border-[#103b66] bg-blue-50 text-[#103b66] font-bold' : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile Phone + OTP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('aadhaar')}
                      className={`flex-1 py-2 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors ${
                        loginMethod === 'aadhaar' ? 'border-[#103b66] bg-blue-50 text-[#103b66] font-bold' : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Aadhaar (UIDAI) + OTP</span>
                    </button>
                  </div>

                  {loginMethod === 'phone' ? (
                    <div>
                      <label className="block font-bold text-slate-700 mb-1 text-xs">
                        10-Digit Registered Mobile Number *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-500 text-xs">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength="10"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="00000 00000"
                          className="w-full pl-12 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-mono focus:border-[#103b66] focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block font-bold text-slate-700 mb-1 text-xs">
                        12-Digit Aadhaar / VID Number *
                      </label>
                      <input
                        type="text"
                        maxLength="12"
                        value={aadhaarInput}
                        onChange={(e) => setAadhaarInput(e.target.value)}
                        placeholder="0000 0000 0000"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-mono focus:border-[#103b66] focus:outline-none"
                      />
                    </div>
                  )}

                  {errorMsg && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button type="submit" className="gov-btn-primary w-full py-2.5 text-xs justify-center font-bold">
                    <span>Send OTP Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Quick Fill Demo Helper Links in masked/XXXX form */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 text-[11px]">
                    <button 
                      type="button" 
                      onClick={handleQuickDemoFillPhone} 
                      className="text-blue-800 font-bold hover:underline"
                    >
                      ⚡ Quick Fill Demo Citizen (98XXXXXXXX)
                    </button>
                    <span className="text-slate-300">|</span>
                    <button 
                      type="button" 
                      onClick={handleQuickDemoFillAadhaar} 
                      className="text-blue-800 font-bold hover:underline"
                    >
                      ⚡ Quick Fill Demo Aadhaar (XXXX-XXXX-XXXX)
                    </button>
                  </div>
                </form>
              )}

              {/* 2. Officer SSO Login */}
              {activeTab === 'admin' && (
                <form onSubmit={handleAdminLogin} className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">
                      Official Government Employee ID / Parichay SSO *
                    </label>
                    <input
                      type="text"
                      value={adminIdInput}
                      onChange={(e) => setAdminIdInput(e.target.value)}
                      placeholder="REV-XX-XXX-000"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-mono focus:border-[#103b66] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">
                      SSO Official Password *
                    </label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-mono focus:border-[#103b66] focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button type="submit" className="gov-btn-orange w-full py-2.5 text-xs justify-center font-bold">
                    <Lock className="w-4 h-4" />
                    <span>Official SSO Sign In</span>
                  </button>

                  <div className="pt-2 text-center border-t border-slate-200">
                    <button 
                      type="button" 
                      onClick={handleQuickAdminDemo} 
                      className="text-blue-800 font-bold hover:underline text-[11px]"
                    >
                      ⚡ Quick Fill Demo Tehsildar (REV-MH-PUN-XXX)
                    </button>
                  </div>
                </form>
              )}

              {/* 3. Citizen Registration */}
              {activeTab === 'register' && (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">
                      Full Name (As on Aadhaar Record) *
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="XXXX XXXXX XXXXX"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:border-[#103b66] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      maxLength="10"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="00000 00000"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono focus:border-[#103b66] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">
                      Aadhaar Number (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength="12"
                      value={regAadhaar}
                      onChange={(e) => setRegAadhaar(e.target.value)}
                      placeholder="0000 0000 0000"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono focus:border-[#103b66] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">
                      State Jurisdiction *
                    </label>
                    <select 
                      value={regState} 
                      onChange={(e) => setRegState(e.target.value)} 
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:border-[#103b66] focus:outline-none"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                  </div>

                  {errorMsg && (
                    <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <button type="submit" className="gov-btn-primary w-full py-2 text-xs justify-center font-bold">
                    <span>Register & Send OTP</span>
                  </button>
                </form>
              )}
            </>
          ) : (
            /* OTP Verification Screen */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-center">
                <span className="font-bold text-amber-900 block text-xs">
                  Enter 6-Digit OTP Sent to Your Registered Mobile
                </span>
                <div className="bg-amber-100 border border-amber-400 py-1 px-2 rounded-lg mt-1.5 inline-block">
                  <span className="font-mono font-black text-amber-900 text-sm tracking-widest">
                    DEMO OTP CODE: {generatedOtp}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Auto-filled for demonstration. You can click 'Verify & Access'.
                </p>
              </div>

              <div className="flex justify-center gap-1.5">
                {otpCode.map((digit, i) => (
                  <input
                    key={i}
                    id={`modal-otp-${i}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                    className="w-10 h-10 sm:w-11 sm:h-11 text-center text-lg font-mono font-bold bg-white border-2 border-slate-300 rounded-lg text-slate-900 focus:border-[#103b66] focus:outline-none"
                  />
                ))}
              </div>

              {errorMsg && <p className="text-red-700 font-bold text-xs text-center">{errorMsg}</p>}

              <button type="submit" className="gov-btn-primary w-full py-2.5 text-xs justify-center font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Verify & Access Bhoo Bhumi Portal</span>
              </button>

              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-600">
                <button
                  type="button"
                  onClick={() => { setIsOtpStep(false); setErrorMsg(''); }}
                  className="text-[#103b66] font-semibold hover:underline"
                >
                  ← Change Number
                </button>
                <span>
                  Resend in: <strong className="font-mono text-amber-700">{timer}s</strong>
                </span>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

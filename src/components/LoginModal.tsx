import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [role, setRole] = useState<'student' | 'faculty'>('student');
  const [campus, setCampus] = useState('landran');
  const [urn, setUrn] = useState('2104928');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onNotify(`Logged in successfully to ${campus === 'landran' ? 'Landran' : 'Jhanjeri'} Campus!`);
      onClose();
    }, 1200);
  };

  const handleM365 = () => {
    onNotify('Authenticating with CGC Outlook 365 single sign-on...');
    setTimeout(() => {
      onNotify('Outlook 365 Verified: 2104928@cgc.edu.in');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#1b365d] via-[#002046] to-[#1b365d] text-white p-4">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#002046] flex items-center justify-center text-[#feae2c]">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
            </div>
            <div className="flex flex-col min-w-0 pr-6">
              <span className="text-[10px] text-[#ffddb4] font-bold uppercase tracking-wider">
                Autonomous • NAAC A+
              </span>
              <h1 className="text-sm font-bold text-white truncate">Chandigarh Group of Colleges</h1>
              <p className="text-[11px] text-[#aec7f7]">Mohali • Landran • Jhanjeri Campuses</p>
            </div>
          </div>
        </div>

        {/* Portal Container */}
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold text-[#002046]">Student Portal Login</span>
              <span className="material-symbols-outlined text-[#feae2c] text-[22px]">verified_user</span>
            </div>
            <p className="text-xs text-[#44474e] leading-relaxed">
              Enter your official CGC University roll number or student URN to access your academic dashboard.
            </p>
          </div>

          {/* Role Switcher Segmented Control */}
          <div className="w-full bg-[#eff4ff] p-1 rounded-xl flex items-center border border-[#dce9ff]">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'student' ? 'bg-white text-[#002046] shadow-sm' : 'text-[#44474e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">badge</span>
              <span>Student Login</span>
            </button>
            <button
              onClick={() => setRole('faculty')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'faculty' ? 'bg-white text-[#002046] shadow-sm' : 'text-[#44474e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">co_present</span>
              <span>Faculty Portal</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Campus Selector */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#002046] flex items-center gap-1">
                <span>Campus &amp; Affiliation</span>
                <span className="text-[#835500]">*</span>
              </label>
              <select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full h-11 px-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-medium border border-[#dce9ff] focus:outline-none focus:ring-2 focus:ring-[#002046]"
              >
                <option value="landran">Landran Campus (Autonomous / IKGPTU)</option>
                <option value="jhanjeri">Jhanjeri Campus (NAAC A+ / PTU)</option>
                <option value="cgc-coe">CGC College of Engineering (Block 1)</option>
                <option value="cbsa">Chandigarh Business School of Admin (CBSA)</option>
              </select>
            </div>

            {/* University Roll / URN */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#002046] flex items-center gap-1">
                  <span>{role === 'student' ? 'University Roll Number / URN' : 'Faculty ID'}</span>
                  <span className="text-[#835500]">*</span>
                </label>
                <span className="text-[10px] text-[#44474e] bg-[#eff4ff] px-2 py-0.5 rounded-full">
                  PTU / ERP ID
                </span>
              </div>
              <input
                type="text"
                value={urn}
                onChange={(e) => setUrn(e.target.value)}
                placeholder="e.g. 2104928"
                required
                className="w-full h-11 px-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-medium border border-[#dce9ff] focus:outline-none focus:ring-2 focus:ring-[#002046]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#002046] flex items-center gap-1">
                <span>CGC ERP / Portal Password</span>
                <span className="text-[#835500]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full h-11 pl-3 pr-10 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-medium border border-[#dce9ff] focus:outline-none focus:ring-2 focus:ring-[#002046]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                  className="absolute right-2 top-2.5 text-[#74777f] hover:text-[#002046] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full h-11 mt-1 rounded-lg bg-[#002046] hover:bg-[#1b365d] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-transform cursor-pointer disabled:opacity-75"
            >
              {isAuthenticating ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Campus Companion</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Microsoft SSO */}
          <div className="relative flex items-center justify-center my-1">
            <div className="w-full h-px bg-[#e5eeff]"></div>
            <span className="absolute px-3 bg-white text-[10px] text-[#74777f] uppercase font-semibold tracking-wider">
              or institutional SSO
            </span>
          </div>

          <button
            onClick={handleM365}
            className="w-full h-11 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#dce9ff]"
          >
            {/* Microsoft 4-square */}
            <svg className="w-4 h-4" viewBox="0 0 21 21" fill="none">
              <rect x="0" y="0" width="10" height="10" fill="#F25022" />
              <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
              <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
              <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
            </svg>
            <span>Sign In with CGC Outlook 365 (@cgc.edu.in)</span>
          </button>

          {/* IT Support desk notice */}
          <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#74777f] text-[20px]">support_agent</span>
              <div className="flex flex-col">
                <span className="font-bold text-[#002046]">Need IT Support?</span>
                <span className="text-[11px] text-[#44474e]">Block 3 Ground Floor Desk • Ext: 441</span>
              </div>
            </div>
            <a
              href="tel:01723984200"
              className="px-2.5 py-1 rounded-lg bg-[#dce9ff] text-[#002046] font-bold text-xs"
            >
              Call Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

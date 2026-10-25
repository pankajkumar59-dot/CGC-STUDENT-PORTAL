import React from 'react';
import { CURRENT_STUDENT } from '../data/portalData';
import { CgcLogo } from './CgcLogo';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onNotify: (msg: string) => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
  onNotify,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
        {/* Physical Digital Student ID Card */}
        <div className="relative bg-[#002046] p-5 text-white flex flex-col gap-3">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <CgcLogo size={24} className="h-6 w-auto" />
              <span className="text-[11px] font-bold tracking-wider">CGC STUDENT IDENTITY CARD</span>
            </div>
            <span className="px-2 py-0.2 rounded-full bg-[#feae2c] text-[#6b4500] text-[9px] font-bold">
              VALID 2027
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img
              alt="Aarav Sharma"
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#feae2c] flex-shrink-0"
              src="/assets/aistudio/Image_12_973cf0c1.jpeg"
            />
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white truncate">{CURRENT_STUDENT.name}</h3>
              <p className="text-xs text-[#aec7f7]">URN: {CURRENT_STUDENT.rollNo} • {CURRENT_STUDENT.program}</p>
              <p className="text-[11px] text-[#87a0cd]">Campus: {CURRENT_STUDENT.campus}</p>
              <span className="inline-block mt-0.5 text-[9px] font-bold bg-white/20 text-white px-2 py-0.5 rounded">
                {CURRENT_STUDENT.semester} • {CURRENT_STUDENT.section}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#aec7f7]">
            <span>|||| ||| ||||| || |||||| |||| {CURRENT_STUDENT.rollNo}</span>
            <span className="font-bold text-[#feae2c]">PTU Reg: {CURRENT_STUDENT.ptuRegNo}</span>
          </div>
        </div>

        {/* Academic Mobility & ABC Details */}
        <div className="p-4 flex flex-col gap-4">
          <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#002046]">Academic Mobility &amp; ABC Account</span>
              <span className="material-symbols-outlined text-[#835500] text-[18px]">sync_alt</span>
            </div>
            <p className="text-[11px] text-[#44474e]">
              National Academic Depository (NAD) &amp; ABC Bank of Credits registered.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#dce9ff]">
              <div>
                <span className="text-[10px] text-[#74777f] block">ABC Digilocker ID</span>
                <span className="text-xs font-bold text-[#002046] font-mono">{CURRENT_STUDENT.abcId}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#74777f] block">Credits Earned</span>
                <span className="text-xs font-bold text-[#003d3c]">
                  {CURRENT_STUDENT.creditsTransferred} / {CURRENT_STUDENT.totalRequiredCredits}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info Sheet */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-[#e5eeff]">
              <span className="text-[#44474e]">Faculty Mentor</span>
              <span className="font-bold text-[#002046]">{CURRENT_STUDENT.mentor}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#e5eeff]">
              <span className="text-[#44474e]">Hostel Residence</span>
              <span className="font-bold text-[#002046]">{CURRENT_STUDENT.hostel}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#e5eeff]">
              <span className="text-[#44474e]">Registered Bus Fleet</span>
              <span className="font-bold text-[#002046]">{CURRENT_STUDENT.busRoute}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#e5eeff]">
              <span className="text-[#44474e]">Degree CGPA</span>
              <span className="font-bold text-[#835500]">{CURRENT_STUDENT.cgpa} / 10.0 (First Class)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => onNotify('Digital Student ID pass added to phone wallet')}
              className="w-full py-2.5 rounded-xl bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">badge</span>
              <span>Save Digital Student ID to Wallet</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="w-full py-2.5 rounded-xl border border-[#c4c6cf] text-xs font-bold text-[#002046] hover:bg-[#eff4ff] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">switch_account</span>
              <span>Switch Campus / ERP Access</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CURRENT_STUDENT } from '../data/portalData';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadFile: (fileName: string) => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onClose,
  onDownloadFile,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 bg-[#1b365d] text-white flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">PTU Official Academic Standing</h3>
            <p className="text-xs text-[#87a0cd]">IKGPTU B.Tech CSE Consolidated Transcript</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#74777f] font-bold uppercase">Current CGPA</span>
              <div className="text-2xl font-black text-[#002046]">{CURRENT_STUDENT.cgpa} / 10.0</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#74777f] font-bold uppercase">Active Backlogs</span>
              <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-0.5">
                0 (All Cleared)
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              Semester Performance History
            </h4>

            <div className="p-3 rounded-xl bg-white border border-[#e5eeff] flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-[#002046]">Semester 1 (Autumn 2023)</span>
                <span className="block text-[11px] text-[#44474e]">Credits Earned: 20.0 • Verified</span>
              </div>
              <span className="font-bold text-sm text-[#002046]">SGPA: 8.40</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#e5eeff] flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-[#002046]">Semester 2 (Spring 2024)</span>
                <span className="block text-[11px] text-[#44474e]">Credits Earned: 22.0 • Verified</span>
              </div>
              <span className="font-bold text-sm text-[#002046]">SGPA: 8.52</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#e5eeff] flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-[#002046]">Semester 3 (Autumn 2024)</span>
                <span className="block text-[11px] text-[#44474e]">Credits Earned: 22.0 • Top 5%</span>
              </div>
              <span className="font-bold text-sm text-[#835500]">SGPA: 8.95</span>
            </div>
          </div>

          <button
            onClick={() => onDownloadFile('Aarav_Sharma_Official_Provisional_Transcript.pdf')}
            className="w-full py-2.5 mt-1 rounded-xl bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">description</span>
            <span>Download Official Grade Transcript (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

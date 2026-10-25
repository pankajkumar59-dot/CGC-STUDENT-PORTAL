import React, { useState } from 'react';
import { calculateBunkAttendance } from '../utils/academicCalculations';
import { CURRENT_STUDENT, SUBJECT_ATTENDANCE } from '../data/portalData';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [extraBunks, setExtraBunks] = useState(0);

  if (!isOpen) return null;

  const result = calculateBunkAttendance(
    CURRENT_STUDENT.attendedClasses,
    CURRENT_STUDENT.totalClasses,
    extraBunks
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#1b365d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#feae2c] text-[#6b4500] flex items-center justify-center font-bold text-sm">
              {result.percentage}%
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Attendance &amp; Safe Bunk Portal</h3>
              <p className="text-xs text-[#87a0cd]">PTU 75% Regulatory Threshold</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex flex-col gap-4">
          {/* Bunk Simulator Interactive Card */}
          <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#002046] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#835500]">calculate</span>
                Bunk Safety Simulator
              </span>
              <button
                onClick={() => setExtraBunks(0)}
                className="text-[11px] text-[#835500] font-bold hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            <p className="text-xs text-[#44474e]">
              Simulate missing future classes to calculate safety margin:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-lg bg-white border border-[#e5eeff] flex flex-col items-center">
                <span className="text-[10px] text-[#74777f] font-semibold">Simulated Bunks</span>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    onClick={() => setExtraBunks((b) => Math.max(0, b - 1))}
                    className="w-7 h-7 rounded-full bg-[#e5eeff] font-bold text-[#002046] active:scale-90 cursor-pointer flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-base font-bold text-[#002046]">{extraBunks}</span>
                  <button
                    onClick={() => setExtraBunks((b) => b + 1)}
                    className="w-7 h-7 rounded-full bg-[#e5eeff] font-bold text-[#002046] active:scale-90 cursor-pointer flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#e5eeff] flex flex-col items-center justify-center">
                <span className="text-[10px] text-[#74777f] font-semibold">Projected Attendance</span>
                <span
                  className={`text-lg font-black mt-0.5 ${
                    result.isSafe ? 'text-[#003d3c]' : 'text-[#ba1a1a]'
                  }`}
                >
                  {result.percentage}%
                </span>
              </div>
            </div>

            <div
              className={`p-2.5 rounded-lg text-xs leading-relaxed border ${
                result.status === 'SAFE'
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                  : result.status === 'WARNING'
                  ? 'bg-amber-50 text-amber-950 border-amber-200'
                  : 'bg-red-50 text-red-950 border-red-200'
              }`}
            >
              {result.status === 'SAFE' && (
                <p>
                  <strong>Safe Zone:</strong> You can miss up to <strong>{result.safeBunksRemaining} more lectures</strong> across subjects and remain above the 75% PTU mandate.
                </p>
              )}
              {result.status === 'WARNING' && (
                <p>
                  <strong>Caution Zone:</strong> You are close to the threshold. Only <strong>{result.safeBunksRemaining} bunks left</strong> before you receive a detained warning!
                </p>
              )}
              {result.status === 'CRITICAL' && (
                <p>
                  <strong>Detained Warning!</strong> Your attendance drops to {result.percentage}%. You must attend upcoming classes to clear PTU MST eligibility.
                </p>
              )}
            </div>
          </div>

          {/* Subject Breakdown List */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#74777f]">
              Subject Wise Breakdown
            </h4>

            {SUBJECT_ATTENDANCE.map((sub) => (
              <div
                key={sub.code}
                className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#002046]">
                  <span>{sub.name} ({sub.code})</span>
                  <span className="text-[#003d3c]">
                    {sub.percentage}% ({sub.attended}/{sub.total})
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#dce9ff] overflow-hidden">
                  <div
                    className="h-full bg-[#003d3c] rounded-full"
                    style={{ width: `${sub.percentage}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-[#44474e]">
                  Can safely miss {sub.safeBunks} classes before falling below 75%
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              onNotify('Official attendance report sent to registered email');
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            Email Official Attendance Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

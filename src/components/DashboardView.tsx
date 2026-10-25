import React from 'react';
import { CURRENT_STUDENT } from '../data/portalData';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
  onOpenAttendance: () => void;
  onOpenTimetable: () => void;
  onOpenResults: () => void;
  onOpenNotices: () => void;
  onDownloadFile: (fileName: string) => void;
  onOpenReader: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenAttendance,
  onOpenTimetable,
  onOpenResults,
  onOpenNotices,
  onDownloadFile,
  onOpenReader,
}) => {
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 pt-2 pb-8 gap-4">
      {/* Student Profile & Academic Standing Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1b365d] text-white p-4 shadow-md">
        {/* Collegiate Ambient Watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none select-none text-white">
          <span className="material-symbols-outlined text-[140px]">school</span>
        </div>

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#835500]"></span>
                {CURRENT_STUDENT.campus}
              </span>
              <span className="text-[#87a0cd] text-[10px] font-medium">
                • {CURRENT_STUDENT.semester} ({CURRENT_STUDENT.section})
              </span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-white truncate flex items-center gap-1">
              {CURRENT_STUDENT.name}
            </h2>
            <p className="text-xs text-[#87a0cd] truncate mt-0.5 font-medium">
              Roll No: {CURRENT_STUDENT.rollNo} • {CURRENT_STUDENT.program}
            </p>
          </div>

          {/* Attendance Micro-Radial Progress (Tappable to Attendance & Bunk Simulator) */}
          <button
            onClick={onOpenAttendance}
            aria-label="View Attendance & Bunk Safety Details"
            className="flex flex-col items-center flex-shrink-0 bg-white/10 hover:bg-white/20 active:scale-95 transition-all cursor-pointer rounded-xl p-2.5 backdrop-blur-md border border-white/10 shadow-sm"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                <circle
                  className="text-[#87a0cd] opacity-30"
                  cx="22"
                  cy="22"
                  fill="none"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="3.5"
                ></circle>
                <circle
                  className="text-[#feae2c]"
                  cx="22"
                  cy="22"
                  fill="none"
                  r="18"
                  stroke="currentColor"
                  strokeDasharray="113.097"
                  strokeDashoffset="13.57"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-black text-white leading-none">88%</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#feae2c] mt-1 flex items-center gap-0.5">
              Safe (&gt;75%) <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </span>
          </button>
        </div>

        {/* Quick Semester Bar */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
          <button
            onClick={onOpenResults}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#feae2c]">verified</span>
            <span className="text-white font-bold">CGPA: {CURRENT_STUDENT.cgpa}</span>
            <span className="text-[10px] text-[#feae2c] underline ml-0.5">Grade Sheet</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#feae2c] animate-ping"></span>
            <span className="text-[11px] text-white font-medium">Active Academic Session 2024–25</span>
          </div>
        </div>
      </div>

      {/* Live Lecture Spotlight Ticker (Clickable to Timetable) */}
      <div
        onClick={onOpenTimetable}
        className="relative overflow-hidden rounded-xl bg-white p-3.5 shadow-sm border border-[#e5eeff] hover:border-[#feae2c]/60 cursor-pointer active:scale-[0.99] transition-all"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#feae2c] rounded-l-xl"></div>
        <div className="flex items-start justify-between gap-3 pl-1">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#002046] flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">laptop_mac</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#002046]">
                  NEXT UP • 11:00 AM
                </span>
                <span className="text-[11px] text-[#835500] font-bold">Block 3 • Rm 402</span>
              </div>
              <h3 className="text-sm font-bold text-[#002046] truncate mt-0.5">Operating Systems</h3>
              <p className="text-xs text-[#44474e] truncate">Dr. Preetinder Kaur • Unit 3 Lecture &amp; Lab Prep</p>
            </div>
          </div>
          <button
            aria-label="Lecture details"
            className="flex-shrink-0 w-9 h-9 rounded-full bg-[#e5eeff] hover:bg-[#dce9ff] flex items-center justify-center text-[#002046] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">directions</span>
          </button>
        </div>
      </div>

      {/* Primary Quick Actions 2x2 Collegiate Grid */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#002046] uppercase tracking-wide">Academic Hub</h3>
          <span className="text-[10px] text-[#835500] font-bold uppercase tracking-wider">Fast Access</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Action 1: Notes & Books */}
          <button
            onClick={() => onNavigate('notes')}
            className="group text-left relative flex flex-col justify-between p-3.5 rounded-xl bg-white hover:bg-[#eff4ff] border border-[#e5eeff] shadow-sm hover:border-[#835500] transition-all cursor-pointer active:scale-95"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#dce9ff] text-[#002046] flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[9px] font-bold">
                48 New
              </span>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-bold text-[#002046] group-hover:text-[#1b365d]">Notes &amp; Books</h4>
              <p className="text-xs text-[#44474e] line-clamp-1 mt-0.5">Curated toppers' pdfs</p>
            </div>
          </button>

          {/* Action 2: Curriculum */}
          <button
            onClick={() => onNavigate('syllabus')}
            className="group text-left relative flex flex-col justify-between p-3.5 rounded-xl bg-white hover:bg-[#eff4ff] border border-[#e5eeff] shadow-sm hover:border-[#835500] transition-all cursor-pointer active:scale-95"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#dce9ff] text-[#002046] flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#002046] text-[9px] font-bold">
                2024–25
              </span>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-bold text-[#002046] group-hover:text-[#1b365d]">Curriculum</h4>
              <p className="text-xs text-[#44474e] line-clamp-1 mt-0.5">PTU scheme &amp; units</p>
            </div>
          </button>

          {/* Action 3: Previous Year Papers */}
          <button
            onClick={() => onNavigate('exam-vault')}
            className="group text-left relative flex flex-col justify-between p-3.5 rounded-xl bg-white hover:bg-[#eff4ff] border border-[#e5eeff] shadow-sm hover:border-[#835500] transition-all cursor-pointer active:scale-95"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#dce9ff] text-[#002046] flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">history_edu</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#002046] text-[9px] font-bold">
                Solved
              </span>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-bold text-[#002046] group-hover:text-[#1b365d]">PYQ Papers</h4>
              <p className="text-xs text-[#44474e] line-clamp-1 mt-0.5">Mid-term &amp; End-term</p>
            </div>
          </button>

          {/* Action 4: CGC AI Copilot */}
          <button
            onClick={() => onNavigate('copilot')}
            className="group text-left relative flex flex-col justify-between p-3.5 rounded-xl bg-[#002046] text-white hover:bg-[#1b365d] transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/15 text-[#feae2c] flex items-center justify-center group-hover:rotate-6 transition-transform">
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[9px] font-bold">
                Smart AI
              </span>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-bold text-white">CGC Copilot</h4>
              <p className="text-xs text-[#aec7f7] line-clamp-1 mt-0.5">Instant syllabus helper</p>
            </div>
          </button>
        </div>
      </div>

      {/* Campus Featured Study Resources (Department Study Shelf) */}
      <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-[#e5eeff] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#835500]">local_library</span>
            <span className="text-sm font-bold text-[#002046]">Department Study Shelf</span>
          </div>
          <button
            onClick={() => onNavigate('notes')}
            className="text-xs text-[#835500] font-bold hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Illustrated Banner Card */}
        <div
          onClick={() => onNavigate('notes')}
          className="relative h-28 rounded-xl overflow-hidden bg-cover bg-center flex items-end p-3 cursor-pointer group active:scale-[0.99] transition-transform"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9W3orlEHlYVnOZY-Y3ZHGJUfdaBQJePFWeTWXY7Y4UImwyxmwJON844BJS-DyAV7JeL3gpECgKDjk6-QiGeMiROPklfu7G-MVJyX7_p8IY8nksh2bjzLJkpR-YwpwYp5R7e49NHvgf2qFiXrbfMo6RayA6REItvVnlL7oQrJvAp-BIbI0ERfvrWy8SZUnuxHXskWpKvYCjf7CDNSPXoqjBFRL7DdCnL_pVMYeOcX65d6S6SVSEmsg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#002046] via-[#002046]/60 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="min-w-0 pr-2">
              <span className="px-2 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[10px] font-bold">
                Exam Spotlight
              </span>
              <p className="text-sm font-bold text-white truncate mt-1">CSE 4th Sem Master Repository</p>
              <p className="text-[11px] text-[#87a0cd] truncate">Handwritten notes, lab manuals &amp; viva questions</p>
            </div>
            <span className="w-8 h-8 rounded-full bg-white text-[#002046] flex items-center justify-center flex-shrink-0 shadow group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </div>

      {/* Section: Recent Notes & Study Materials */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#002046]">description</span>
            <h3 className="text-sm font-bold text-[#002046]">Recent Notes &amp; Materials</h3>
          </div>
          <button
            onClick={() => onNavigate('notes')}
            className="text-xs text-[#835500] font-bold hover:underline cursor-pointer"
          >
            Filter By CSE
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {/* Note 1: Operating Systems */}
          <div className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex items-center justify-between gap-3 hover:border-[#feae2c]/40 transition-colors">
            <div
              className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
              onClick={onOpenReader}
            >
              <div className="w-11 h-11 rounded-lg bg-[#dce9ff] flex flex-col items-center justify-center text-[#002046] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                <span className="text-[9px] font-bold text-[#835500]">4.2 MB</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-sm font-bold text-[#002046] truncate">OS: Process Sync &amp; Deadlocks</h4>
                <p className="text-xs text-[#44474e] truncate">Unit 3 Handwritten • Verified Topper Note</p>
                <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                  <span className="text-[#835500] font-semibold">1.4k downloads</span>
                  <span className="text-[#c4c6cf]">•</span>
                  <span className="text-[#44474e]">Updated 2h ago</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onDownloadFile('OS_Unit3_Process_Deadlocks.pdf')}
              aria-label="Download OS Notes"
              className="w-9 h-9 rounded-full bg-[#e5eeff] hover:bg-[#feae2c] hover:text-[#6b4500] active:scale-90 flex items-center justify-center text-[#002046] transition-all flex-shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>

          {/* Note 2: DAA */}
          <div className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex items-center justify-between gap-3 hover:border-[#feae2c]/40 transition-colors">
            <div
              className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
              onClick={() => onNavigate('notes')}
            >
              <div className="w-11 h-11 rounded-lg bg-[#dce9ff] flex flex-col items-center justify-center text-[#002046] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">code</span>
                <span className="text-[9px] font-bold text-[#835500]">2.8 MB</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-sm font-bold text-[#002046] truncate">DAA: Dynamic Programming Sheet</h4>
                <p className="text-xs text-[#44474e] truncate">Algorithms &amp; Complexity Cheat Sheet</p>
                <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                  <span className="text-[#835500] font-semibold">890 downloads</span>
                  <span className="text-[#c4c6cf]">•</span>
                  <span className="text-[#44474e]">Unit 4 &amp; 5</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onDownloadFile('DAA_Dynamic_Programming.pdf')}
              aria-label="Download DAA Sheet"
              className="w-9 h-9 rounded-full bg-[#e5eeff] hover:bg-[#feae2c] hover:text-[#6b4500] active:scale-90 flex items-center justify-center text-[#002046] transition-all flex-shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>

          {/* Note 3: DBMS */}
          <div className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex items-center justify-between gap-3 hover:border-[#feae2c]/40 transition-colors">
            <div
              className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
              onClick={() => onNavigate('notes')}
            >
              <div className="w-11 h-11 rounded-lg bg-[#dce9ff] flex flex-col items-center justify-center text-[#002046] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">database</span>
                <span className="text-[9px] font-bold text-[#835500]">5.1 MB</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-sm font-bold text-[#002046] truncate">DBMS: SQL &amp; Normalization Revision</h4>
                <p className="text-xs text-[#44474e] truncate">Quick review cards + 1NF to BCNF charts</p>
                <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                  <span className="text-[#835500] font-semibold">2.1k downloads</span>
                  <span className="text-[#c4c6cf]">•</span>
                  <span className="text-[#44474e]">Mid-term special</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onDownloadFile('DBMS_SQL_Normalization_Guide.pdf')}
              aria-label="Download DBMS Guide"
              className="w-9 h-9 rounded-full bg-[#e5eeff] hover:bg-[#feae2c] hover:text-[#6b4500] active:scale-90 flex items-center justify-center text-[#002046] transition-all flex-shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section: CGC Official Notice Board */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#835500]">campaign</span>
            <h3 className="text-sm font-bold text-[#002046]">CGC Official Notice Board</h3>
          </div>
          <button
            onClick={onOpenNotices}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] hover:opacity-90 cursor-pointer"
          >
            2 Unread
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Notice 1 */}
          <div className="p-3.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold uppercase tracking-wider">
                Exam Alert
              </span>
              <span className="text-[11px] text-[#44474e]">Notice dated Yesterday</span>
            </div>
            <h4 className="text-sm font-bold text-[#002046]">
              Mid Semester Examination (MST-1) datesheet released for 2nd year
            </h4>
            <p className="text-xs text-[#44474e] leading-relaxed">
              Exams commence from October 14th across all engineering wings. Check your assigned seating block and admit status on the portal.
            </p>
            <div className="pt-1 flex items-center justify-between text-xs">
              <button
                onClick={() => onDownloadFile('MST1_Datesheet_Landran_2024.pdf')}
                className="text-[#002046] font-bold inline-flex items-center gap-1 hover:text-[#835500] cursor-pointer"
              >
                Download PDF Schedule
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <span className="text-[11px] text-[#835500] font-semibold">Ref: CGC/EXAM/24/109</span>
            </div>
          </div>

          {/* Notice 2 */}
          <div className="p-3.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#feae2c]/30 text-[#835500] text-[10px] font-bold uppercase tracking-wider">
                CRC Placement
              </span>
              <span className="text-[11px] text-[#44474e]">3 days ago</span>
            </div>
            <h4 className="text-sm font-bold text-[#002046]">
              Campus Placement Drive &amp; Pre-Placement Training Schedule
            </h4>
            <p className="text-xs text-[#44474e] leading-relaxed">
              Mandatory orientation session for 2026 graduating batch regarding coding assessments, aptitude workshops, and mock technical interviews.
            </p>
            <div className="pt-1 flex items-center justify-between text-xs">
              <button
                onClick={onOpenNotices}
                className="text-[#002046] font-bold inline-flex items-center gap-1 hover:text-[#835500] cursor-pointer"
              >
                View Eligibility &amp; Register
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <span className="text-[11px] text-[#44474e]">Auditorium 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Pulse & Clubs */}
      <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#e5eeff] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#002046]">Campus Pulse &amp; Clubs</h4>
          <span className="text-xs text-[#835500] font-bold">Mohali Quad</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="relative h-24 rounded-lg overflow-hidden bg-cover bg-center flex items-end p-2 cursor-pointer active:scale-95 transition-transform"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuiZ3T3UoFw9zeRvF-XvXvBrR1XfbDQRJ5cDpAJuNd1kuktlwsL3tHIh__kDrp6ULJMviwj3Gm8o-TpcibQRMrSSrC14ZMl1mluTLKbAFhV5rfbQNhtxnVEuhho_hftvoV684YPQLNy2Vm-m6PPfWuc-D5r_ySVSGnv6bWHT9CojjyGHKqVxkF1zh99tlNcnSFINddzl7SfDNn76MHel9diIFqJEIE1cSm4Ir4CT3r10o_vXO0RHdg')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#002046]/90 to-transparent"></div>
            <span className="relative z-10 text-xs font-bold text-white">Parivartan Tech Fest</span>
          </div>

          <div
            className="relative h-24 rounded-lg overflow-hidden bg-cover bg-center flex items-end p-2 cursor-pointer active:scale-95 transition-transform"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIJCiNx_hOXd9-WaYe1Fs8-LruN9_09Sn02YQXFYFSwjX48qRiZLnxbHR2ZVq8RXWRJZmVu84EbppAIWr3Blb3bkogLTZX0nM1noQms364NSUN8OIPYuqCTpoOihn850Xtvr9DAzix5fd98L0aTbdhygS6JYWvX8ucEk1mOTff0-BVsiOhgsYc7q_PYL-VMED_RdElhC5DY_JuFPchv3trc7DMTyOpqsQpelLbCw6rd1ejGifvALhS')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#002046]/90 to-transparent"></div>
            <span className="relative z-10 text-xs font-bold text-white">Annual Sports League</span>
          </div>
        </div>
      </div>

      {/* Quick Help & Query Bar */}
      <div className="p-3.5 rounded-xl bg-[#dce9ff] border border-[#cbdbf5] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#002046] text-white flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#002046] truncate">Have syllabus or exam doubts?</span>
            <span className="text-[11px] text-[#44474e] truncate">Ask CGC Copilot or reach CSE Department Desk</span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('copilot')}
          className="px-3.5 py-1.5 rounded-lg bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 transition-all flex-shrink-0 cursor-pointer shadow-sm"
        >
          Ask AI
        </button>
      </div>
    </div>
  );
};

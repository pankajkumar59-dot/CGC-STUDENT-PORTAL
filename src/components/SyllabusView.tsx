import React, { useState } from 'react';

interface SyllabusViewProps {
  onOpenNotes: () => void;
  onAskAi: (query: string) => void;
  onDownloadFile: (fileName: string) => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  onOpenNotes,
  onAskAi,
  onDownloadFile,
}) => {
  const [selectedSem, setSelectedSem] = useState(4);
  const [isOsExpanded, setIsOsExpanded] = useState(false);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 pt-1 pb-12 gap-4">
      {/* Department & Batch Badge Banner */}
      <div className="w-full bg-[#eff4ff] border border-[#dce9ff] rounded-xl p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1b365d] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                terminal
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] bg-[#d6e3ff] text-[#001b3d] px-2 py-0.5 rounded-full font-bold">
                  Autonomous 2021–25
                </span>
                <span className="text-[10px] bg-[#dce9ff] text-[#44474e] px-2 py-0.5 rounded-full font-semibold">
                  PTU Scheme
                </span>
              </div>
              <p className="text-base text-[#002046] font-bold truncate mt-0.5">
                Computer Science &amp; Engineering
              </p>
            </div>
          </div>

          <button
            onClick={() => {}}
            aria-label="Change Department"
            className="w-8 h-8 rounded-full bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Semester Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {semesters.map((sem) => {
          const isActive = selectedSem === sem;
          return (
            <button
              key={sem}
              onClick={() => setSelectedSem(sem)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#1b365d] text-white shadow-sm flex items-center gap-1.5'
                  : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
              }`}
            >
              {isActive && <span className="w-2 h-2 rounded-full bg-[#feae2c]"></span>}
              <span>Sem {sem} {sem === 4 ? '(Active)' : ''}</span>
            </button>
          );
        })}
      </div>

      {/* Hero Semester Progress Metric Card */}
      <div className="w-full bg-gradient-to-br from-[#1b365d] via-[#1b365d] to-[#002046] text-white rounded-xl p-4 shadow-md relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#feae2c]/10 pointer-events-none blur-xl"></div>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#ffddb4]">
                Academic Tracking
              </span>
              <h2 className="text-xl font-bold text-white">Semester 4 Coverage</h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-[#feae2c] leading-none">62%</span>
              <p className="text-[10px] text-[#aec7f7]">Overall Target</p>
            </div>
          </div>

          {/* Segmented Track Bar */}
          <div className="w-full bg-[#002046]/50 rounded-full h-2.5 overflow-hidden p-0.5 flex">
            <div
              className="bg-[#feae2c] h-full rounded-full transition-all duration-500"
              style={{ width: '62%' }}
            ></div>
          </div>

          {/* Milestone Badges */}
          <div className="flex items-center justify-between pt-0.5 flex-wrap gap-1">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[16px] text-[#a5f0ed]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="text-xs text-[#d6e3ff]">MST-1 Complete</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#feae2c]/20 px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-[16px] text-[#ffddb4] animate-pulse">
                timer
              </span>
              <span className="text-xs text-[#ffddb4] font-semibold">
                MST-2 Approaching (14 Days)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-[#002046]">Core &amp; Applied Subjects</h3>
          <span className="bg-[#d3e4fe] text-xs px-2 py-0.5 rounded-full text-[#001b3d] font-bold">
            5 Registered
          </span>
        </div>

        <button
          onClick={() => onAskAi('Show full PTU 4th Sem Computer Science syllabus curriculum roadmap')}
          className="text-xs text-[#835500] hover:text-[#6b4500] font-bold flex items-center gap-1 cursor-pointer"
        >
          <span>Curriculum Map</span>
          <span className="material-symbols-outlined text-[16px]">map</span>
        </button>
      </div>

      {/* Subject Card 1: Operating Systems */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-[#e5eeff] overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="bg-[#d6e3ff] text-[#001b3d] text-[10px] px-2 py-0.5 rounded-md font-bold">
                  BTCS-401
                </span>
                <span className="bg-[#e5eeff] text-[#44474e] text-[10px] px-2 py-0.5 rounded-md font-medium">
                  4 Credits
                </span>
                <span className="bg-[#e5eeff] text-[#44474e] text-[10px] px-2 py-0.5 rounded-md font-medium">
                  4 L/wk
                </span>
              </div>
              <h4 className="text-base font-bold text-[#002046] truncate">Operating Systems</h4>
            </div>

            <div className="flex flex-col items-end flex-shrink-0">
              <span className="text-xs text-[#835500] font-bold">65% Done</span>
              <span className="text-[10px] text-[#74777f]">Unit 3 In-flight</span>
            </div>
          </div>

          {/* Mini Progress Meter */}
          <div className="w-full bg-[#dce9ff] rounded-full h-1.5 my-3 overflow-hidden">
            <div className="bg-[#feae2c] h-full rounded-full" style={{ width: '65%' }}></div>
          </div>

          {/* Unit Syllabus Breakdown */}
          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0b1c30]">Unit Syllabus Modules</span>
              <span className="text-[10px] text-[#74777f]">3 of 5 In Sync</span>
            </div>

            {/* Unit 1 */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] border border-[#dce9ff]">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="material-symbols-outlined text-[18px] text-[#003d3c] flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">Unit 1: Intro to OS &amp; System Calls</p>
                  <p className="text-[11px] text-[#44474e] truncate">Kernel architecture, Dual-mode, Traps</p>
                </div>
              </div>
              <span className="text-[10px] bg-[#a5f0ed] text-[#00201f] px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                Completed
              </span>
            </div>

            {/* Unit 2 */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] border border-[#dce9ff]">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="material-symbols-outlined text-[18px] text-[#003d3c] flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">
                    Unit 2: Process Mgmt &amp; CPU Scheduling
                  </p>
                  <p className="text-[11px] text-[#44474e] truncate">
                    PCB, Context switch, FCFS, Round Robin
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-[#a5f0ed] text-[#00201f] px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                Completed
              </span>
            </div>

            {/* Unit 3 */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#ffddb4]/40 text-[#0b1c30] border border-[#feae2c]/40">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="material-symbols-outlined text-[18px] text-[#835500] flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  pending
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#0b1c30] truncate">
                    Unit 3: Synchronization &amp; Deadlocks
                  </p>
                  <p className="text-[11px] text-[#44474e] truncate">
                    Semaphores, Peterson's Algorithm, Banker's
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-[#feae2c] text-[#6b4500] px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                In-Progress
              </span>
            </div>

            {/* Expandable Units 4 & 5 */}
            {isOsExpanded && (
              <div className="space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] opacity-80 border border-[#dce9ff]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-[#74777f] flex-shrink-0">
                      radio_button_unchecked
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">
                        Unit 4: Memory Management &amp; Paging
                      </p>
                      <p className="text-[11px] text-[#44474e] truncate">
                        Virtual Memory, Page Replacement, Thrashing
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#e5eeff] text-[#74777f] px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                    Pending
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] opacity-80 border border-[#dce9ff]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-[#74777f] flex-shrink-0">
                      radio_button_unchecked
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">Unit 5: File Systems &amp; Disk I/O</p>
                      <p className="text-[11px] text-[#44474e] truncate">
                        File allocation, SSTF, SCAN scheduling
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#e5eeff] text-[#74777f] px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                    Pending
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Expand Units Toggle Button */}
          <button
            onClick={() => setIsOsExpanded(!isOsExpanded)}
            className="w-full mt-2.5 py-1.5 flex items-center justify-center gap-1 text-xs text-[#002046] font-bold hover:bg-[#eff4ff] rounded-lg transition-colors cursor-pointer"
          >
            <span>{isOsExpanded ? 'Collapse Units' : 'Show Remaining Units (2)'}</span>
            <span
              className={`material-symbols-outlined text-[16px] transition-transform ${
                isOsExpanded ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-2 gap-3 pt-3 mt-1">
            <button
              onClick={onOpenNotes}
              className="h-10 px-3 rounded-lg bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#002046] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">library_books</span>
              <span>View Unit Notes</span>
            </button>

            <button
              onClick={() => onAskAi('Ask AI doubt on Operating Systems Unit 3 Semaphores & Deadlocks')}
              className="h-10 px-3 rounded-lg bg-[#1b365d] hover:bg-[#002046] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] text-[#feae2c]">auto_awesome</span>
              <span>Ask AI: Unit 3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subject Card 2: DAA */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#d6e3ff] text-[#001b3d] text-[10px] px-2 py-0.5 rounded-md font-bold">
                BTCS-402
              </span>
              <span className="bg-[#e5eeff] text-[#44474e] text-[10px] px-2 py-0.5 rounded-md font-medium">
                4 Credits
              </span>
            </div>
            <h4 className="text-base font-bold text-[#002046] truncate">
              Design &amp; Analysis of Algorithms
            </h4>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#44474e]">
              <span className="material-symbols-outlined text-[16px]">school</span>
              <span>Dr. Sandeep Singh • CSE Dept</span>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-xs font-bold text-[#002046]">58%</span>
            <p className="text-[10px] text-[#74777f]">Covered</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="w-full bg-[#dce9ff] rounded-full h-1.5 mt-3 mb-3 overflow-hidden">
          <div className="bg-[#1b365d] h-full rounded-full" style={{ width: '58%' }}></div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[10px] bg-[#e5eeff] px-2 py-0.5 rounded-md text-[#44474e] font-medium">
            MST-2 Scope: Dynamic Prog.
          </span>
          <button
            onClick={() => onAskAi('Show PTU DAA Unit-wise exam weightage')}
            className="text-[#002046] font-bold hover:text-[#835500] flex items-center gap-1 cursor-pointer"
          >
            <span>Syllabus</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Subject Card 3: DBMS */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-[#d6e3ff] text-[#001b3d] text-[10px] px-2 py-0.5 rounded-md font-bold">
                BTCS-403
              </span>
              <span className="bg-[#e5eeff] text-[#44474e] text-[10px] px-2 py-0.5 rounded-md font-medium">
                3 Credits
              </span>
              <span className="bg-[#a5f0ed] text-[#00201f] text-[10px] px-2 py-0.5 rounded-md font-bold">
                Theory + Practical
              </span>
            </div>
            <h4 className="text-base font-bold text-[#002046] truncate">
              Database Management Systems
            </h4>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#44474e]">
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>SQL, Normalization &amp; Concurrency Control</span>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-xs font-bold text-[#003d3c]">75%</span>
            <p className="text-[10px] text-[#74777f]">Near Complete</p>
          </div>
        </div>

        <div className="w-full bg-[#dce9ff] rounded-full h-1.5 mt-3 mb-3 overflow-hidden">
          <div className="bg-[#003d3c] h-full rounded-full" style={{ width: '75%' }}></div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={() => onDownloadFile('BTCS406_DBMS_Lab_Manual.pdf')}
            className="text-[11px] text-[#835500] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">biotech</span>
            <span>BTCS-406 DBMS Lab Manual Attached</span>
          </button>

          <button
            onClick={() => onAskAi('Explain DBMS Unit 3 Concurrency Control and Two-Phase Locking')}
            className="text-[#002046] font-bold hover:text-[#835500] flex items-center gap-1 cursor-pointer"
          >
            <span>Details</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Subject Card 4: Universal Human Values */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-[#d6e3ff] text-[#001b3d] text-[10px] px-2 py-0.5 rounded-md font-bold">
                HSMC-122
              </span>
              <span className="bg-[#e5eeff] text-[#44474e] text-[10px] px-2 py-0.5 rounded-md font-medium">
                3 Credits
              </span>
              <span className="bg-[#dce9ff] text-[#44474e] text-[10px] px-2 py-0.5 rounded-md font-semibold">
                Mandatory Audit
              </span>
            </div>
            <h4 className="text-base font-bold text-[#002046] truncate">Universal Human Values</h4>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#44474e]">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>Self-exploration, Harmony in Human Relations</span>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-xs font-bold text-[#835500]">40%</span>
            <p className="text-[10px] text-[#74777f]">Covered</p>
          </div>
        </div>

        <div className="w-full bg-[#dce9ff] rounded-full h-1.5 mt-3 mb-3 overflow-hidden">
          <div className="bg-[#835500] h-full rounded-full" style={{ width: '40%' }}></div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[10px] text-[#74777f]">Next: Harmony in Society</span>
          <button
            onClick={() => onAskAi('Summarize Universal Human Values concepts')}
            className="text-[#002046] font-bold hover:text-[#835500] flex items-center gap-1 cursor-pointer"
          >
            <span>Syllabus</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Interactive Campus Visual Highlight Card */}
      <div className="w-full bg-[#eff4ff] rounded-xl p-4 shadow-sm border border-[#dce9ff] flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-[#e5eeff] flex-shrink-0 overflow-hidden relative shadow-sm">
          <img
            className="w-full h-full object-cover"
            alt="CGC Mohali Modern University Library"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnOA7aH44tVzB5VC3nb-tAaef3aN5T0P6XRtuYPhEUPAq4RBGK7qZSoS6ZlOgZY04ze9gHe4XA4oT0Fh3K2y57ecjTNs1jUrz9jDHaXvMfS38Tabn-D_ZRtUjBCt-AZuZELn2xA0KhIvl2h22bleWcIhDENa5-qwkVbPDkO14GoAX7zfVviRStUuW9izKiK95E8LOOBMAWSh100eiLQSbUYjm2o4maZ6FjJ0YblV4Atz6ODklsBn45"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-[#835500] uppercase tracking-wider font-bold">
            Central Library Portal
          </p>
          <h5 className="text-sm font-bold text-[#002046] truncate">Standard Textbooks Available</h5>
          <p className="text-xs text-[#44474e] truncate mt-0.5">
            Galvin OS (10th Ed) &amp; Cormen CLRS reserved in Reference Desk 3
          </p>
        </div>
      </div>

      {/* Footer Download Official PDF Syllabus Action Card */}
      <div className="w-full bg-[#dce9ff] rounded-xl p-4 shadow-sm border border-[#cbdbf5]">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#feae2c] text-[#6b4500] flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-[#002046]">Signed PTU/CGC Curriculum Copy</h4>
              <p className="text-xs text-[#44474e] mt-0.5">
                Academic Council verified syllabus including grading scheme, internal marks break-up, and laboratory experiment list.
              </p>
            </div>
          </div>

          <button
            onClick={() => onDownloadFile('PTU_CGC_CSE_Official_Signed_Syllabus.pdf')}
            className="w-full h-12 bg-[#002046] hover:bg-[#1b365d] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Download Official PDF Syllabus (Signed)</span>
          </button>

          <div className="flex items-center justify-between text-[#74777f] px-1 text-[10px]">
            <span>File Size: 4.8 MB • PDF</span>
            <span>Updated: Jan 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

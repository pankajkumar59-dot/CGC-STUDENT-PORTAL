import React, { useState } from 'react';

interface ExamVaultViewProps {
  onBack: () => void;
  onOpenReader: () => void;
  onDownloadFile: (fileName: string) => void;
  onSolveWithAi: (topic: string) => void;
  onUploadSnap: () => void;
}

export const ExamVaultView: React.FC<ExamVaultViewProps> = ({
  onBack,
  onOpenReader,
  onDownloadFile,
  onSolveWithAi,
  onUploadSnap,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeExamTab, setActiveExamTab] = useState<'all' | 'mst1' | 'mst2' | 'ptu'>('all');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Record<string, boolean>>({
    dbms: true,
  });

  const subjects = [
    'All Subjects',
    'Operating Systems',
    'DAA',
    'DBMS',
    'Discrete Maths',
    'Computer Networks',
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 pt-1 pb-10 gap-4">
      {/* Top Banner / Search Header */}
      <div className="bg-[#1b365d] text-white rounded-xl p-4 shadow-md relative overflow-hidden">
        {/* Ambient Decorative Varsity Crest Aura */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#feae2c]/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-[#d3e4fe]/10 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#feae2c]/20 text-[#ffddb4]">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Official Archive</span>
            </div>
            <span className="text-[10px] text-[#aec7f7] bg-white/10 px-2 py-0.5 rounded-full">
              Updated: Summer 2024
            </span>
          </div>

          <h1 className="text-xl font-bold text-white mt-0.5">
            PTU &amp; CGC Autonomous Exam Vault
          </h1>
          <p className="text-xs text-[#dce9ff] leading-relaxed">
            High-yield solved past papers, faculty answer keys, and recurrent scoring question trends.
          </p>

          {/* Search Bar with Paper Code Prompts */}
          <div className="mt-2 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#74777f] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g., BTCS-401, OS MST-1 2023..."
              className="w-full h-11 pl-10 pr-24 rounded-lg bg-white text-[#0b1c30] text-sm placeholder:text-[#74777f] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#feae2c]"
            />
            <button className="absolute right-1.5 h-8 px-3 bg-[#feae2c] text-[#6b4500] text-xs font-bold rounded-md flex items-center gap-1 shadow-sm active:scale-95 transition-transform cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Countdown & Weightage Cheat Sheet */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1 text-[#835500] text-[10px] font-bold uppercase mb-1">
              <span className="material-symbols-outlined text-[16px]">timer</span>
              <span>Upcoming Exam Milestone</span>
            </div>
            <h2 className="text-base font-bold text-[#002046] truncate">MST-2 Examination</h2>
            <p className="text-xs text-[#44474e] mt-0.5">
              Syllabus Coverage: Units 3 &amp; 4 (High Weightage)
            </p>
          </div>

          {/* Circular countdown badge */}
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-[#feae2c] text-[#6b4500] shadow-sm flex-shrink-0">
            <span className="text-lg font-black leading-none">14</span>
            <span className="text-[9px] uppercase font-bold tracking-tight">Days Left</span>
          </div>
        </div>

        {/* Quick Weightage Meter Breakdown */}
        <div className="mt-3 bg-[#eff4ff] rounded-lg p-2.5 flex items-center justify-between gap-2 border border-[#dce9ff]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#1b365d] text-white flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">auto_stories</span>
            </div>
            <div className="truncate">
              <span className="block text-xs text-[#0b1c30] font-bold truncate">
                Weightage Breakdown Available
              </span>
              <span className="block text-[11px] text-[#44474e] truncate">
                Algorithms (40%), Memory Mgmt (35%)
              </span>
            </div>
          </div>

          <button
            onClick={() => onSolveWithAi('Generate MST-2 AI Mock Exam for CSE 4th Sem')}
            className="flex-shrink-0 bg-[#002046] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px] text-[#ffddb4]">bolt</span>
            <span>AI Mock</span>
          </button>
        </div>
      </div>

      {/* Segmented Exam Type Tabs */}
      <div className="flex items-center bg-[#e5eeff] rounded-xl p-1 gap-1">
        <button
          onClick={() => setActiveExamTab('all')}
          className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeExamTab === 'all'
              ? 'bg-white text-[#002046] shadow-sm'
              : 'text-[#44474e] hover:text-[#002046]'
          }`}
        >
          All Papers
        </button>

        <button
          onClick={() => setActiveExamTab('mst1')}
          className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeExamTab === 'mst1'
              ? 'bg-white text-[#002046] shadow-sm'
              : 'text-[#44474e] hover:text-[#002046]'
          }`}
        >
          MST-1
        </button>

        <button
          onClick={() => setActiveExamTab('mst2')}
          className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeExamTab === 'mst2'
              ? 'bg-white text-[#002046] shadow-sm'
              : 'text-[#44474e] hover:text-[#002046]'
          }`}
        >
          MST-2
        </button>

        <button
          onClick={() => setActiveExamTab('ptu')}
          className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeExamTab === 'ptu'
              ? 'bg-white text-[#002046] shadow-sm'
              : 'text-[#44474e] hover:text-[#002046]'
          }`}
        >
          PTU End-Sem
        </button>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {subjects.map((sub) => {
          const isSelected = selectedSubject === sub || (sub === 'All Subjects' && selectedSubject === 'All');
          return (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub === 'All Subjects' ? 'All' : sub)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#002046] text-white shadow-sm flex items-center gap-1.5'
                  : 'bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              {isSelected && <span className="material-symbols-outlined text-[14px]">done</span>}
              <span>{sub}</span>
            </button>
          );
        })}
      </div>

      {/* Question Papers Feed Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#002046]">Featured Solved Sets</span>
          <span className="text-xs text-[#835500] font-semibold">32 Available</span>
        </div>

        {/* Card 1: Operating Systems PTU Dec 2023 Solved Paper */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3 relative">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#ffddb4] text-[#291800] text-[10px] font-bold">
                100% Solved Solutions
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#002046] text-[10px] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#835500]">verified_user</span>
                <span>Faculty Verified</span>
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#835500]">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="text-xs font-bold text-[#0b1c30]">4.9</span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#002046] leading-snug">
              Operating Systems (BTCS-401) — PTU Dec 2023 Solved Paper
            </h3>
            <div className="flex items-center gap-3 text-[#44474e] text-xs mt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">menu_book</span> 10 Pages
              </span>
              <span className="w-1 h-1 rounded-full bg-[#c4c6cf]"></span>
              <span>CGC Autonomous &amp; Affiliated</span>
            </div>
          </div>

          {/* Quick Section Breakdown Previews */}
          <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-2.5 rounded-lg border border-[#dce9ff]">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] text-[#002046] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#835500]">task_alt</span> Section A
              </span>
              <span className="text-xs text-[#44474e] line-clamp-1">
                10 Short Qs (2 Marks each, Fully Step-Solved)
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] text-[#002046] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#835500]">draw</span> Sections B &amp; C
              </span>
              <span className="text-xs text-[#44474e] line-clamp-1">
                Deadlock, Bankers Algo, Paging Architecture Diagrams
              </span>
            </div>
          </div>

          {/* Card Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onOpenReader}
              className="flex-1 h-11 bg-[#002046] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-[#1b365d]"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>View Paper Solutions</span>
            </button>

            <button
              onClick={() => onDownloadFile('OS_BTCS401_Dec2023_Solved_PTU.pdf')}
              className="h-11 px-3.5 bg-[#dce9ff] text-[#002046] rounded-lg text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform hover:bg-[#d3e4fe] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>(4.2 MB)</span>
            </button>
          </div>
        </div>

        {/* Card 2: DAA MST-1 Oct 2024 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3 relative">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[10px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                <span>Predicted Hot Topics</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#44474e] text-[10px] font-semibold">
                MST-1 Recent
              </span>
            </div>

            <span className="text-[#44474e] text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">description</span> 6 Pages
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#002046] leading-snug">
              Design &amp; Analysis of Algorithms — CGC MST-1 Oct 2024 (Official Paper)
            </h3>
            <p className="text-xs text-[#44474e] mt-1">
              Includes faculty rubric criteria and step-by-step master method derivation proofs.
            </p>
          </div>

          {/* Recurrent Exam Highlight Banner */}
          <div className="bg-[#eff4ff] p-2.5 rounded-lg flex items-center gap-2.5 border border-[#dce9ff]">
            <div className="w-7 h-7 rounded-full bg-[#feae2c]/30 text-[#835500] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">priority_high</span>
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] text-[#835500] font-bold">Repeated 8-mark question:</span>
              <span className="block text-xs text-[#0b1c30] truncate">
                Master Theorem Case 2 &amp; Merge Sort Recurrence
              </span>
            </div>
          </div>

          {/* Card Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onSolveWithAi('Solve DAA MST-1 Master Theorem Case 2 and Merge sort')}
              className="flex-1 h-11 bg-[#feae2c] text-[#6b4500] hover:bg-[#835500] hover:text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Solve with AI Copilot</span>
            </button>

            <button
              onClick={() => onDownloadFile('DAA_MST1_Oct2024_Official_Paper.pdf')}
              className="h-11 px-4 bg-[#e5eeff] text-[#002046] rounded-lg text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform hover:bg-[#dce9ff] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Card 3: DBMS 5 Years Trend Compilation */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3 relative">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#d3e4fe] text-[#002046] text-[10px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#835500]">workspace_premium</span>
                <span>Bestseller Topper Sheet</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#44474e] text-[10px] font-semibold">
                5-Year Vault
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#835500]">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="text-xs font-bold text-[#0b1c30]">5.0</span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#002046] leading-snug">
              Database Management Systems — 5 Years Trend Compilation (2019–2024)
            </h3>
            <p className="text-xs text-[#44474e] mt-1">
              Master cheat-sheet including 35 solved standard SQL queries, functional dependencies, and 3NF vs BCNF normalization proofs.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] p-2 rounded-lg text-center border border-[#dce9ff]">
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#002046] leading-none">35</span>
              <span className="text-[10px] text-[#44474e] mt-0.5 font-medium">Solved Queries</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#002046] leading-none">12</span>
              <span className="text-[10px] text-[#44474e] mt-0.5 font-medium">BCNF Proofs</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#835500] leading-none">94%</span>
              <span className="text-[10px] text-[#44474e] mt-0.5 font-medium">Match Rate</span>
            </div>
          </div>

          {/* Card Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onOpenReader}
              className="flex-1 h-11 bg-[#002046] text-white hover:bg-[#1b365d] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              <span>Open Full Solution Sheet</span>
            </button>

            <button
              onClick={() => {
                setBookmarkedPapers((prev) => ({ ...prev, dbms: !prev.dbms }));
              }}
              className="h-11 px-4 bg-[#dce9ff] text-[#002046] rounded-lg text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform hover:bg-[#d3e4fe] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {bookmarkedPapers.dbms ? 'bookmark' : 'bookmark_add'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Peer Upload & Rewards Floating Prompt */}
      <div className="bg-gradient-to-r from-[#dce9ff] to-[#e5eeff] rounded-xl p-4 shadow-sm border border-[#cbdbf5] relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#feae2c] text-[#6b4500] flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[26px]">upload_file</span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#002046] leading-tight truncate">
              Have a Recent Exam Paper?
            </h4>
            <p className="text-xs text-[#44474e] mt-0.5">
              Submit question papers to earn <strong className="text-[#835500]">+150 Library Points</strong> &amp; free photocopy coupons.
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={onUploadSnap}
            className="flex-1 h-10 bg-[#002046] text-white hover:bg-[#1b365d] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
            <span>Upload Snap / PDF</span>
          </button>

          <button
            onClick={() => onSolveWithAi('How to claim CGC Library Rewards points?')}
            className="h-10 px-3 bg-white text-[#002046] rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-[#f8f9ff]"
          >
            <span className="material-symbols-outlined text-[16px] text-[#835500]">emoji_events</span>
            <span>Rewards</span>
          </button>
        </div>
      </div>
    </div>
  );
};

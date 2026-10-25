import React, { useState } from 'react';

interface DocumentReaderViewProps {
  onBack: () => void;
  onAskAi: (topic: string) => void;
  onDownloadFile: (fileName: string) => void;
  onShowVivaModal: () => void;
}

export const DocumentReaderView: React.FC<DocumentReaderViewProps> = ({
  onBack,
  onAskAi,
  onDownloadFile,
  onShowVivaModal,
}) => {
  const [currentPage, setCurrentPage] = useState(14);
  const totalPages = 42;
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [activeHighlighter, setActiveHighlighter] = useState<'yellow' | 'emerald' | 'berry'>('yellow');
  const [customNotes, setCustomNotes] = useState<string[]>([]);
  const [explanationMode, setExplanationMode] = useState<'standard' | 'hinglish' | 'code'>('standard');
  const [showDismissExplainer, setShowDismissExplainer] = useState(false);

  const addStickyNote = () => {
    const promptText = window.prompt('Enter your annotation note for Page 14:');
    if (promptText && promptText.trim()) {
      setCustomNotes((prev) => [...prev, promptText.trim()]);
    }
  };

  const clearAnnotations = () => {
    if (customNotes.length > 0) {
      setCustomNotes([]);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-12 select-none">
      {/* Document Context Header Bar (Secondary app level) */}
      <div className="sticky top-16 z-30 bg-[#f8f9ff]/95 backdrop-blur-md px-4 py-2 flex flex-col gap-1.5 shadow-sm border-b border-[#e5eeff]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              onClick={onBack}
              aria-label="Go Back"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#002046] hover:bg-[#e5eeff] active:scale-95 transition-all flex-shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0">
              <h1 className="text-sm font-bold text-[#002046] truncate leading-tight">
                Operating Systems Unit 3: Process Synchronization &amp; Semaphores
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] font-bold">
                  Topper Notes
                </span>
                <span className="text-xs text-[#44474e] truncate">PTU CSE 5th Sem</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              aria-label="Search Document"
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#44474e] hover:text-[#002046] hover:bg-[#e5eeff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Bookmark"
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                isBookmarked ? 'text-[#835500] bg-[#ffddb4]' : 'text-[#44474e] hover:bg-[#e5eeff]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
            <button
              aria-label="Share"
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#44474e] hover:text-[#002046] hover:bg-[#e5eeff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
            <button
              onClick={() => onDownloadFile('OS_Unit3_Semaphores_Page14.pdf')}
              aria-label="Download Offline"
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#44474e] hover:text-[#002046] hover:bg-[#e5eeff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>
        </div>

        {/* Scrubber & Page Indicator Bar */}
        <div className="flex items-center justify-between px-1 pt-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#002046] font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#835500]"></span>
            <span className="text-[11px] text-[#44474e]">
              Annotated ({3 + customNotes.length} notes)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-6 h-6 flex items-center justify-center rounded text-[#44474e] hover:bg-[#e5eeff] text-xs cursor-pointer disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <div className="w-20 h-1.5 bg-[#dce9ff] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1b365d] rounded-full transition-all"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              ></div>
            </div>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-6 h-6 flex items-center justify-center rounded text-[#44474e] hover:bg-[#e5eeff] text-xs cursor-pointer disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Document Viewport Canvas Area */}
      <div className="px-4 mt-4 flex flex-col gap-4">
        {/* Realistic PDF Page Sheet */}
        <div className="bg-white rounded-xl shadow-md border border-[#e5eeff] p-4 flex flex-col gap-4 relative overflow-hidden">
          {/* Top watermark & page badge */}
          <div className="flex items-center justify-between text-[#44474e]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#835500] text-[16px]">verified</span>
              <span className="text-[10px] tracking-wider uppercase text-[#835500] font-bold">
                Verified CGC Scholar Notes
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#44474e]">#14 / Unit-III</span>
          </div>

          {/* Section Title in Handwritten Academic Style */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#1b365d] text-white text-[10px] uppercase font-bold tracking-wide">
                Sec 3.4
              </span>
              <h2 className="text-lg font-bold text-[#002046]">
                Classical Sync Problems: Producer-Consumer
              </h2>
            </div>
            <p className="text-xs text-[#44474e] mt-1 font-medium">
              Ref: Galvin OS 10th Ed. | Dr. S. Sharma Lecture Handout (Block 3)
            </p>
          </div>

          {/* Diagram Card: Producer-Consumer Problem using Semaphores */}
          <div className="bg-[#eff4ff] rounded-lg p-3 flex flex-col gap-2 border border-[#dce9ff]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#002046] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px] text-[#002046]">account_tree</span>
                Diagram: Semaphore State Machine (Buffer Size = N)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#002046] font-semibold">
                wait(S) &amp; signal(S)
              </span>
            </div>

            {/* Inline Visual SVG Diagram matching Image_1 */}
            <div className="w-full bg-white rounded-md p-3 flex flex-col items-center justify-center border border-[#e5eeff] shadow-inner">
              <svg
                className="w-full max-w-[420px] h-auto text-[#002046]"
                viewBox="0 0 340 130"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Producer Node */}
                <rect x="10" y="24" width="70" height="42" rx="6" fill="#1b365d" />
                <text x="45" y="44" fill="#ffffff" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" textAnchor="middle">
                  PRODUCER
                </text>
                <text x="45" y="56" fill="#aec7f7" fontFamily="Inter" fontSize="8" textAnchor="middle">
                  produce_item()
                </text>

                {/* Arrow 1 with wait(empty) */}
                <path d="M80 45 L115 45" stroke="#1b365d" strokeWidth="1.5" strokeDasharray="2 2" />
                <polygon points="117,45 112,42 112,48" fill="#1b365d" />
                <text x="98" y="38" fill="#835500" fontFamily="Plus Jakarta Sans" fontSize="7.5" fontWeight="700" textAnchor="middle">
                  wait(empty)
                </text>

                {/* Shared Buffer Array */}
                <rect x="120" y="15" width="100" height="60" rx="8" fill="#e5eeff" stroke="#aec7f7" strokeWidth="1.5" />
                <text x="170" y="28" fill="#002046" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="700" textAnchor="middle">
                  Bounded Buffer [N]
                </text>

                {/* Buffer Slots */}
                <rect x="127" y="36" width="18" height="24" rx="3" fill="#ffffff" stroke="#c4c6cf" />
                <rect x="149" y="36" width="18" height="24" rx="3" fill="#feae2c" stroke="#feae2c" />
                <rect x="171" y="36" width="18" height="24" rx="3" fill="#feae2c" stroke="#feae2c" />
                <rect x="193" y="36" width="18" height="24" rx="3" fill="#ffffff" stroke="#c4c6cf" />
                <text x="170" y="70" fill="#44474e" fontFamily="Inter" fontSize="7" textAnchor="middle">
                  mutex = 1 (Critical Sec)
                </text>

                {/* Arrow 2 to Consumer */}
                <path d="M220 45 L255 45" stroke="#1b365d" strokeWidth="1.5" />
                <polygon points="257,45 252,42 252,48" fill="#1b365d" />
                <text x="238" y="38" fill="#835500" fontFamily="Plus Jakarta Sans" fontSize="7.5" fontWeight="700" textAnchor="middle">
                  signal(full)
                </text>

                {/* Consumer Node */}
                <rect x="260" y="24" width="70" height="42" rx="6" fill="#1b365d" />
                <text x="295" y="44" fill="#ffffff" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" textAnchor="middle">
                  CONSUMER
                </text>
                <text x="295" y="56" fill="#aec7f7" fontFamily="Inter" fontSize="8" textAnchor="middle">
                  consume_item()
                </text>

                {/* Bottom Sync Legend Bar */}
                <rect x="20" y="92" width="300" height="26" rx="4" fill="#f8f9ff" stroke="#d3e4fe" />
                <circle cx="34" cy="105" r="4" fill="#feae2c" />
                <text x="44" y="108" fill="#0b1c30" fontFamily="Inter" fontSize="8">
                  Full Slots: sem full = 0
                </text>
                <circle cx="140" cy="105" r="4" fill="#87a0cd" />
                <text x="150" y="108" fill="#0b1c30" fontFamily="Inter" fontSize="8">
                  Empty: sem empty = N
                </text>
                <circle cx="246" cy="105" r="4" fill="#1b365d" />
                <text x="256" y="108" fill="#0b1c30" fontFamily="Inter" fontSize="8">
                  Mutex: sem = 1
                </text>
              </svg>
            </div>
          </div>

          {/* Academic Structured Notes Body */}
          <div className="flex flex-col gap-2.5 text-sm text-[#0b1c30] leading-relaxed">
            <p>
              The Producer and Consumer processes share a common, fixed-size memory pool (buffer). To prevent corrupted states when accessing shared indices, three primary semaphores are enforced:
            </p>

            {/* Highlighted Line with Copilot Glow Anchor */}
            <div
              className={`relative rounded-md p-2.5 -mx-1 transition-all ${
                activeHighlighter === 'yellow'
                  ? 'bg-[#feae2c]/20 border-l-4 border-[#835500]'
                  : activeHighlighter === 'emerald'
                  ? 'bg-[#a5f0ed]/30 border-l-4 border-[#003d3c]'
                  : 'bg-[#ffdad6]/40 border-l-4 border-[#ba1a1a]'
              }`}
            >
              <span className="font-semibold text-[#0b1c30] text-sm">
                Binary semaphore mutex initialized to 1 prevents race conditions.
              </span>
              <span className="inline-flex items-center gap-0.5 ml-2 align-middle px-1.5 py-0.5 rounded-full bg-[#835500] text-white text-[9px] font-bold shadow-xs">
                <span className="material-symbols-outlined text-[10px]">auto_awesome</span> Active Focus
              </span>
            </div>

            <p className="text-xs text-[#44474e]">
              A deadlock may occur if the wait operations on <code className="bg-[#e5eeff] px-1 py-0.5 rounded text-[#002046] font-mono text-xs">mutex</code> and <code className="bg-[#e5eeff] px-1 py-0.5 rounded text-[#002046] font-mono text-xs">empty</code> are inadvertently swapped. Always invoke <code className="font-mono text-xs text-[#002046] font-bold">wait(empty)</code> first before claiming the buffer lock.
            </p>
          </div>

          {/* Inline Sticky Note from classmate */}
          <div className="bg-[#eff4ff] rounded-lg p-3 flex items-start gap-3 border border-[#dce9ff]">
            <div className="w-7 h-7 rounded-full bg-[#feae2c] flex items-center justify-center flex-shrink-0 text-[#6b4500]">
              <span className="material-symbols-outlined text-[16px]">sticky_note_2</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#002046] font-bold">Amanpreet (Roll 210488)</span>
                <span className="text-[10px] text-[#44474e]">Yesterday, 9:20 PM</span>
              </div>
              <p className="text-xs text-[#44474e] mt-0.5">
                "Remember: If buffer is full, producer blocks on <span className="text-[#002046] font-bold">wait(empty)</span>. Don't confuse it with counting semaphore!"
              </p>
            </div>
          </div>

          {/* User's Added Sticky Notes */}
          {customNotes.map((note, index) => (
            <div key={index} className="bg-[#feae2c]/15 border border-[#feae2c]/40 rounded-lg p-3 flex items-start gap-3 animate-fadeIn">
              <div className="w-7 h-7 rounded-full bg-[#feae2c] text-[#6b4500] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#002046] font-bold">Aarav (Your Note)</span>
                  <span className="text-[10px] text-[#835500] font-semibold">Just now</span>
                </div>
                <p className="text-xs text-[#0b1c30] mt-0.5 font-medium">{note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Interactive AI Copilot Inline Explainer Card */}
        {!showDismissExplainer && (
          <div className="bg-[#1b365d] text-white rounded-xl shadow-xl p-4 flex flex-col gap-3 relative overflow-hidden">
            {/* Ambient Sparkle Glow behind card */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#feae2c]/20 blur-2xl pointer-events-none"></div>

            {/* Header of Explainer */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#feae2c] text-[#6b4500] flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">CGC Copilot</h3>
                  <p className="text-[10px] text-[#aec7f7]">Instant Paragraph Explanation</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[10px] font-bold">
                  PTU MST-1 Target
                </span>
                <button
                  onClick={() => setShowDismissExplainer(true)}
                  aria-label="Dismiss Explainer"
                  className="w-6 h-6 flex items-center justify-center rounded-full text-[#aec7f7] hover:text-white hover:bg-[#002046] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* AI Content Box */}
            <div className="bg-[#002046]/50 backdrop-blur-sm rounded-lg p-3 relative z-10 flex flex-col gap-1.5 border border-white/10">
              <div className="flex items-center gap-1.5 text-[#feae2c]">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Exam Insight • Guaranteed 5-Marks
                </span>
              </div>

              {explanationMode === 'standard' && (
                <p className="text-xs text-[#dce9ff] leading-relaxed">
                  Semaphore mutual exclusion requires both <span className="text-[#ffddb4] font-semibold">atomicity</span> (uninterruptible test-and-set) and <span className="text-[#ffddb4] font-semibold">bounded waiting</span> to strictly prevent starvation.
                </p>
              )}

              {explanationMode === 'hinglish' && (
                <p className="text-xs text-[#dce9ff] leading-relaxed">
                  <span className="text-[#ffddb4] font-semibold">Peterson Algorithm aur Semaphores</span> mein do cheezein mast yaad rakhni hai: Atomicity (ek process beech mein disturb na ho) aur Bounded Waiting (koi process hamesha ke liye bhookhi na reh jaye). MST-1 ke 5-mark answer mein yeh formula aur diagram zaroor draw karna!
                </p>
              )}

              {explanationMode === 'code' && (
                <div className="font-mono text-[11px] text-[#a5f0ed] bg-[#001b3d] p-2 rounded overflow-x-auto">
                  <code>
                    sem_wait(&amp;empty); // Wait if buffer full<br/>
                    sem_wait(&amp;mutex); // Claim lock<br/>
                    buffer[in] = item; // Add item<br/>
                    sem_post(&amp;mutex); // Release lock<br/>
                    sem_post(&amp;full);  // Signal full slot
                  </code>
                </div>
              )}
            </div>

            {/* Action Chips / Pill Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 relative z-10">
              <button
                onClick={onShowVivaModal}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#002046] hover:bg-[#d3e4fe] text-xs font-bold active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#835500]">quiz</span>
                <span>Generate Viva Questions</span>
              </button>

              <button
                onClick={() => setExplanationMode(explanationMode === 'hinglish' ? 'standard' : 'hinglish')}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-all cursor-pointer ${
                  explanationMode === 'hinglish'
                    ? 'bg-[#feae2c] text-[#6b4500] font-bold'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#89d3d1]">translate</span>
                <span>Simple Hinglish</span>
              </button>

              <button
                onClick={() => setExplanationMode(explanationMode === 'code' ? 'standard' : 'code')}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-all cursor-pointer ${
                  explanationMode === 'code'
                    ? 'bg-[#feae2c] text-[#6b4500] font-bold'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#89d3d1]">code</span>
                <span>Show Code in C</span>
              </button>
            </div>
          </div>
        )}

        {/* AI Floating Action Drawer Button */}
        <div className="flex items-center justify-between bg-[#e5eeff] rounded-xl p-3.5 shadow-sm border border-[#cbdbf5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#002046] shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">psychology</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#002046]">Stuck on Page 14?</span>
              <span className="text-xs text-[#44474e]">Ask Copilot to solve back-questions or draw flowchart</span>
            </div>
          </div>

          <button
            onClick={() => onAskAi('Page 14 Producer-Consumer problem back questions')}
            className="px-3.5 py-2 rounded-lg bg-[#feae2c] text-[#6b4500] hover:bg-[#835500] hover:text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer shrink-0 active:scale-95"
          >
            <span>Solve Now</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Bottom Interactive Annotation Dock */}
      <div className="sticky bottom-0 z-30 mt-6 px-4 pb-2">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-2.5 flex items-center justify-between border border-[#e5eeff] max-w-xl mx-auto">
          {/* Highlighter Tool with Palettes */}
          <div className="flex items-center gap-1.5 bg-[#eff4ff] px-2 py-1 rounded-xl">
            <button
              onClick={() => setActiveHighlighter('yellow')}
              aria-label="Select Yellow Highlighter"
              title="Yellow Accent"
              className={`w-7 h-7 rounded-full bg-[#feae2c] flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                activeHighlighter === 'yellow' ? 'ring-2 ring-[#002046]' : ''
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#835500]"></span>
            </button>
            <button
              onClick={() => setActiveHighlighter('emerald')}
              aria-label="Select Emerald Highlighter"
              title="Spruce Green"
              className={`w-7 h-7 rounded-full bg-[#a5f0ed] flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                activeHighlighter === 'emerald' ? 'ring-2 ring-[#002046]' : ''
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#003d3c]"></span>
            </button>
            <button
              onClick={() => setActiveHighlighter('berry')}
              aria-label="Select Berry Highlighter"
              title="Rose Alert"
              className={`w-7 h-7 rounded-full bg-[#ffdad6] flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                activeHighlighter === 'berry' ? 'ring-2 ring-[#002046]' : ''
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
            </button>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1">
            <button
              onClick={addStickyNote}
              aria-label="Add Sticky Note"
              className="w-10 h-10 flex flex-col items-center justify-center rounded-xl text-[#44474e] hover:text-[#002046] hover:bg-[#e5eeff] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">sticky_note_2</span>
              <span className="text-[9px] leading-none mt-0.5 font-bold">Note</span>
            </button>
            <button
              onClick={clearAnnotations}
              aria-label="Eraser"
              className="w-10 h-10 flex flex-col items-center justify-center rounded-xl text-[#44474e] hover:text-[#002046] hover:bg-[#e5eeff] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">ink_eraser</span>
              <span className="text-[9px] leading-none mt-0.5 font-bold">Erase</span>
            </button>
          </div>

          {/* Prominent AI Question Solver Trigger */}
          <button
            onClick={() => onAskAi('Page 14 Critical section explanation')}
            className="h-10 px-3.5 rounded-xl bg-[#1b365d] text-white hover:bg-[#002046] text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[18px] text-[#feae2c]">auto_awesome</span>
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

interface NotesAndBooksViewProps {
  onOpenReader: (docTitle?: string, docSubject?: string) => void;
  onDownloadFile: (fileName: string) => void;
  onOpenExamVault: () => void;
  onOpenUploadPrompt: () => void;
}

export const NotesAndBooksView: React.FC<NotesAndBooksViewProps> = ({
  onOpenReader,
  onDownloadFile,
  onOpenExamVault,
  onOpenUploadPrompt,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [activeCategory, setActiveCategory] = useState<'lecture' | 'books' | 'pyq' | 'labs'>('lecture');
  const [bookmarkedNotes, setBookmarkedNotes] = useState<Record<string, boolean>>({
    os: false,
    daa: false,
    dbms: true,
    pyq: false,
  });

  const subjects = ['All', 'Operating Systems', 'DAA', 'DBMS', 'Discrete Maths', 'Soft Skills'];

  const toggleBookmark = (id: string) => {
    setBookmarkedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleVoiceSearch = () => {
    setSearchQuery('OS Peterson Algorithm');
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 pt-1 pb-10 gap-4">
      {/* Search & Filter Header Sub-bar */}
      <section className="flex flex-col gap-2">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#74777f] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 1,200+ CGC notes, PYQs..."
            className="w-full h-12 pl-11 pr-24 bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#74777f] text-sm font-medium rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#002046] focus:shadow-md transition-all"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              onClick={handleVoiceSearch}
              aria-label="Voice Search"
              title="Voice Search"
              className="relative w-9 h-9 flex items-center justify-center rounded-lg text-[#002046] bg-[#ffddb4]/60 hover:bg-[#ffddb4] transition-colors cursor-pointer group"
            >
              <span className="absolute inset-0 rounded-lg bg-[#835500]/20 animate-ping pointer-events-none"></span>
              <span className="material-symbols-outlined text-[20px] text-[#835500] relative z-10">
                mic
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-[#835500]">
            <span className="material-symbols-outlined text-[14px]">record_voice_over</span>
            <span className="text-[11px] text-[#835500] font-semibold">
              Tap mic to voice search across 1,200+ CGC notes
            </span>
          </div>
          <button
            onClick={() => setSearchQuery('OS Peterson Algorithm')}
            className="text-[10px] text-[#002046] hover:text-[#835500] bg-[#dce9ff] px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer font-medium"
          >
            <span>Try: "OS Peterson Algorithm"</span>
            <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </button>
        </div>

        {/* Subject Scrollable Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {subjects.map((sub) => {
            const isSelected = selectedSubject === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1b365d] text-white shadow-sm flex items-center gap-1.5'
                    : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
                }`}
              >
                <span>{sub}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#feae2c]"></span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Campus Semester Selector Quick-Banner */}
      <section>
        <div className="bg-gradient-to-r from-[#002046] to-[#1b365d] text-white rounded-xl p-4 shadow-md relative overflow-hidden flex items-center justify-between">
          <div className="relative z-10 flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#aec7f7] uppercase tracking-wider font-bold">
                Department of CSE
              </span>
              <span className="w-1 h-1 rounded-full bg-[#d3e4fe]"></span>
              <span className="text-[10px] text-[#d3e4fe] font-medium">PTU Affiliated</span>
            </div>
            <span className="text-lg font-bold text-white mt-0.5">Semester 4 Library</span>
            <span className="text-xs text-[#aec7f7] mt-0.5 font-medium">
              Aligned with latest academic year 2024–25
            </span>
          </div>

          <button
            onClick={() => {}}
            className="relative z-10 px-3 py-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-lg text-xs font-semibold text-white flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
          >
            <span>Change</span>
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>

          {/* Ambient watermark */}
          <div className="absolute -right-3 -bottom-5 w-24 h-24 rounded-full bg-[#feae2c]/10 blur-xl pointer-events-none"></div>
        </div>
      </section>

      {/* Category Switcher Tabs */}
      <section>
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          <button
            onClick={() => setActiveCategory('lecture')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 shadow-sm flex items-center gap-2 cursor-pointer transition-colors ${
              activeCategory === 'lecture'
                ? 'bg-[#002046] text-white'
                : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>Lecture Notes (PDF)</span>
          </button>

          <button
            onClick={() => setActiveCategory('books')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-2 cursor-pointer transition-colors ${
              activeCategory === 'books'
                ? 'bg-[#002046] text-white'
                : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">library_books</span>
            <span>Prescribed Books</span>
          </button>

          <button
            onClick={() => onOpenExamVault()}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-2 cursor-pointer transition-colors ${
              activeCategory === 'pyq'
                ? 'bg-[#002046] text-white'
                : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">history_edu</span>
            <span>Solved PYQs (5 Yrs)</span>
          </button>

          <button
            onClick={() => setActiveCategory('labs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-2 cursor-pointer transition-colors ${
              activeCategory === 'labs'
                ? 'bg-[#002046] text-white'
                : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">biotech</span>
            <span>Lab Manuals</span>
          </button>
        </div>
      </section>

      {/* Curated Repository Stream */}
      <section className="flex flex-col gap-4">
        {/* Item 1: Operating Systems */}
        {(selectedSubject === 'All' || selectedSubject === 'Operating Systems') && (
          <article className="bg-white rounded-xl shadow-md border border-[#e5eeff] p-4 flex flex-col gap-3 relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3 min-w-0">
                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-[#e5eeff] flex items-center justify-center relative shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt="Operating System Concepts Galvin edition"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTS_Lw3rqJZPaqd1AmcXJUGnYEDKb8k9C3nREF6IpQQUgynQGMjQuiliurcmhl5fqS0mEk0RX_9Kk5RCRAMB-KGkWerfRaDuhLb9QyO9oa_vLwqyrtcGKTKW7Zkc3FidujBJBaOJdTDCry17nSGeJ7_r3gmlAGbazSoAQo6nyK8WotYo3G0Zu1fla6BHigmhktLi3uZVSxKoX3UnNlvnGXYN8XQ4ULiyRsn_F3iZLpHzRYdDlwyQb2"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-[#1b365d] text-white text-[9px] font-bold">
                    142p
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#835500] text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px] text-[#835500]">verified</span>
                      Verified Faculty Note
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#ffddb4] text-[#291800] text-[10px] font-semibold">
                      Sem 4
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-[#002046] mt-1 line-clamp-1">
                    Operating Systems: Concepts &amp; Notes
                  </h2>
                  <p className="text-xs text-[#44474e] line-clamp-1">
                    Galvin Edition + CGC Faculty curated module breakdowns
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#44474e]">
                    <span className="flex items-center gap-0.5 text-[#835500] font-bold">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      4.9 (418)
                    </span>
                    <span>•</span>
                    <span className="text-[11px]">Dept of CSE</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleBookmark('os')}
                aria-label="Bookmark Note"
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer active:scale-90 ${
                  bookmarkedNotes.os ? 'bg-[#ffddb4] text-[#835500]' : 'bg-[#eff4ff] text-[#002046] hover:bg-[#e5eeff]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {bookmarkedNotes.os ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
            </div>

            {/* Quick Meta Highlights */}
            <div className="bg-[#eff4ff] rounded-lg p-2.5 flex items-center justify-between text-[#44474e]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#002046]">psychology</span>
                <span className="text-xs">Threads, Semaphores &amp; Memory Mgmt</span>
              </div>
              <span className="text-xs text-[#002046] font-semibold">Unit 1–4</span>
            </div>

            {/* Action Button Bar */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onOpenReader('Operating Systems Unit 3: Process Synchronization & Semaphores', 'PTU CSE 5th Sem')}
                className="h-10 px-3 rounded-lg bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#002046] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#835500]">auto_awesome</span>
                <span>View Online / AI Explain</span>
              </button>

              <button
                onClick={() => onDownloadFile('Operating_Systems_Concepts_Notes.pdf')}
                className="h-10 px-3 rounded-lg bg-[#1b365d] text-white hover:bg-[#002046] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                <span>Offline PDF (8.4MB)</span>
              </button>
            </div>
          </article>
        )}

        {/* Item 2: Introduction to Algorithms (DAA) */}
        {(selectedSubject === 'All' || selectedSubject === 'DAA') && (
          <article className="bg-white rounded-xl shadow-md border border-[#e5eeff] p-4 flex flex-col gap-3 relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3 min-w-0">
                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-[#e5eeff] flex items-center justify-center relative shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt="Design and Analysis of Algorithms CLRS"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9K-3kaUpfJbeQq8qRa-IUAq98GC_P3AQ3RyiqmSnEkwTgKwpn1AU5pEwCNpFR66Fe0zhk-dsRx2qSAMdhofxdKD-P2Whvi5ei9kDKmgx1O9uKs_Ep_7ecqKIosn7Jc9F0efWn_GpmC2DhCx7lPiqtgOyjRz2fThsZ00fmJEFN2vm5q1-e4lcJf-UmbjJBinTCI3TBLphFu-DeFtiVXMCROenltaaiBia7jSjHgIfZWz9vO-HvAd4j"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-[#1b365d] text-white text-[9px] font-bold">
                    CLRS
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#2e476f] text-[10px] font-semibold">
                      Prof. Rajesh Summaries
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#ffddb4] text-[#291800] text-[10px] font-semibold">
                      Sem 4
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-[#002046] mt-1 line-clamp-1">
                    Introduction to Algorithms (DAA)
                  </h2>
                  <p className="text-xs text-[#44474e] line-clamp-1">
                    CLRS Reference summaries + Asymptotic &amp; Dynamic sets
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#44474e]">
                    <span className="flex items-center gap-0.5 text-[#835500] font-bold">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      4.8 (230 dls)
                    </span>
                    <span>•</span>
                    <span className="text-[11px]">Units 1 to 5</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleBookmark('daa')}
                aria-label="Bookmark Note"
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer active:scale-90 ${
                  bookmarkedNotes.daa ? 'bg-[#ffddb4] text-[#835500]' : 'bg-[#eff4ff] text-[#002046] hover:bg-[#e5eeff]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {bookmarkedNotes.daa ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
            </div>

            {/* Quick Meta Highlights */}
            <div className="bg-[#eff4ff] rounded-lg p-2.5 flex items-center justify-between text-[#44474e]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#835500]">insights</span>
                <span className="text-xs">Master Theorem, Greedy &amp; MST graphs</span>
              </div>
              <span className="text-xs text-[#835500] font-bold">High Exam Weight</span>
            </div>

            {/* Action Button Bar */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onOpenReader('Design & Analysis of Algorithms — CLRS Summaries', 'PTU CSE 5th Sem')}
                className="h-10 px-3 rounded-lg bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#002046] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#835500]">auto_awesome</span>
                <span>View Online / AI Explain</span>
              </button>

              <button
                onClick={() => onDownloadFile('DAA_Algorithms_CLRS_Summaries.pdf')}
                className="h-10 px-3 rounded-lg bg-[#1b365d] text-white hover:bg-[#002046] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                <span>Download (14.2MB)</span>
              </button>
            </div>
          </article>
        )}

        {/* Item 3: DBMS Handwritten Topper Notes */}
        {(selectedSubject === 'All' || selectedSubject === 'DBMS') && (
          <article className="bg-white rounded-xl shadow-md border border-[#e5eeff] p-4 flex flex-col gap-3 relative overflow-hidden">
            {/* High Yield Banner Ribbon */}
            <div className="absolute top-0 right-0">
              <div className="bg-[#feae2c] text-[#6b4500] px-3 py-0.5 text-[10px] rounded-bl-lg font-bold shadow-sm">
                High Yield for MSTs
              </div>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3 min-w-0">
                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-[#e5eeff] flex items-center justify-center relative shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt="DBMS Handwritten Topper Notebook"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzHljrfPad_CvMXqMl8tOBqmhz9ecXuN3KuLOZfXpBmedup4sIvM4ynoldW_jXwnjoG7W9ZuW1fYVfK1pIGfZBVsS2g4UCUqgsE_WyR6NY9tcS-EgV9oJW9O2W_Y_OvatIOyTOwFUDsGzB0IL2n3VN6ceqzHzL7T0Ecbr6jUaKp_VbfDsvybjnPpX7oaQrPDol2dWDyhCFDKFLaVk5T4Nf3NCBpbyhkTnlcqLUyF6w__k5XXyxftLI"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-[#835500] text-white text-[9px] font-bold">
                    TOPPER
                  </span>
                </div>

                <div className="flex flex-col min-w-0 pr-16">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#ffddb4] text-[#291800] text-[10px] font-semibold">
                      Verified CGC Scholar
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-[#002046] mt-1 line-clamp-1">
                    DBMS Handwritten Notes
                  </h2>
                  <p className="text-xs text-[#44474e] line-clamp-1">
                    ER Models, Nested SQL, B-Trees &amp; ACID properties
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#44474e]">
                    <span className="flex items-center gap-0.5 text-[#835500] font-bold">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      5.0 (612)
                    </span>
                    <span>•</span>
                    <span className="text-[11px]">88 pgs</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleBookmark('dbms')}
                aria-label="Bookmark Note"
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer active:scale-90 ${
                  bookmarkedNotes.dbms ? 'bg-[#ffddb4] text-[#835500]' : 'bg-[#eff4ff] text-[#002046] hover:bg-[#e5eeff]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {bookmarkedNotes.dbms ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
            </div>

            {/* Quick Highlights */}
            <div className="bg-[#eff4ff] rounded-lg p-2.5 flex items-center justify-between text-[#44474e]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#002046]">draw</span>
                <span className="text-xs">Includes 25+ repeated PTU MST questions</span>
              </div>
              <span className="text-xs text-[#002046] font-bold">100% Solved</span>
            </div>

            {/* Action Button Bar */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onOpenReader('DBMS Handwritten Topper Notes — Normalization & Transactions', 'PTU CSE 4th Sem')}
                className="h-10 px-3 rounded-lg bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#002046] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#835500]">auto_awesome</span>
                <span>View Online / AI Explain</span>
              </button>

              <button
                onClick={() => onDownloadFile('DBMS_Handwritten_Topper_Notes.pdf')}
                className="h-10 px-3 rounded-lg bg-[#1b365d] text-white hover:bg-[#002046] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                <span>Download (5.1MB)</span>
              </button>
            </div>
          </article>
        )}

        {/* Item 4: Solved PYQs (PTU 2019-2023) */}
        {(selectedSubject === 'All' || activeCategory === 'pyq') && (
          <article className="bg-white rounded-xl shadow-md border border-[#e5eeff] p-4 flex flex-col gap-3 relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3 min-w-0">
                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-[#e5eeff] flex items-center justify-center relative shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt="PTU 2019-2023 Solved Papers Booklet"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrdUa6His7gdi3L_npbD63JeJU6dfyM3JccABcZ8BuWUsD9FFGeAA6_F0qK4cntcY2A-K5ra_4M4ydRaCFuE3c3w9BVkFLfy170SMG3LJnAp0FPTPDMAErOCLv2qH1TTFBxC_-rmd7J_8t3hNW2K3USDVuJhTvfL7G0xsy0Adne4pSAjJ7bw2-f8QkbO799DDJ30-L0WigCmZx8fG5jOtpfJpGOR0cANT1y1Q6qtRNKr3GwnQbin9i"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-[#1b365d] text-white text-[9px] font-bold">
                    5 YRS
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#d3e4fe] text-[#002046] text-[10px] font-semibold">
                      Official Exam Bank
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#ffddb4] text-[#291800] text-[10px] font-semibold">
                      2019–2023
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-[#002046] mt-1 line-clamp-1">
                    PTU 2019–2023 Solved Papers
                  </h2>
                  <p className="text-xs text-[#44474e] line-clamp-1">
                    Model answers with marks distribution scheme
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#44474e]">
                    <span className="flex items-center gap-0.5 text-[#835500] font-bold">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      4.9 (890)
                    </span>
                    <span>•</span>
                    <span className="text-[11px]">All CSE Subjects</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleBookmark('pyq')}
                aria-label="Bookmark Note"
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer active:scale-90 ${
                  bookmarkedNotes.pyq ? 'bg-[#ffddb4] text-[#835500]' : 'bg-[#eff4ff] text-[#002046] hover:bg-[#e5eeff]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {bookmarkedNotes.pyq ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
            </div>

            {/* Quick Highlights */}
            <div className="bg-[#eff4ff] rounded-lg p-2.5 flex items-center justify-between text-[#44474e]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#002046]">checklist</span>
                <span className="text-xs">Section A, B &amp; C stepwise solutions</span>
              </div>
              <span className="text-xs text-[#835500] font-bold">10 Papers</span>
            </div>

            {/* Action Button Bar */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={onOpenExamVault}
                className="h-10 px-3 rounded-lg bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#002046] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#835500]">auto_awesome</span>
                <span>Open Solved Vault</span>
              </button>

              <button
                onClick={() => onDownloadFile('PTU_5Year_Solved_Bundle.pdf')}
                className="h-10 px-3 rounded-lg bg-[#1b365d] text-white hover:bg-[#002046] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                <span>Download Bundle (18MB)</span>
              </button>
            </div>
          </article>
        )}
      </section>

      {/* Community Contribution Prompt / Delight banner */}
      <section className="mt-2 mb-4">
        <div className="bg-[#dce9ff] border border-[#cbdbf5] rounded-xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#feae2c] text-[#6b4500] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-bold text-[#002046]">Have handwritten notes?</span>
            <span className="text-xs text-[#44474e]">
              Upload to earn CGC Library Karma points &amp; academic badges.
            </span>
          </div>

          <button
            onClick={onOpenUploadPrompt}
            className="px-3.5 py-2 rounded-lg bg-[#002046] text-white text-xs font-bold shrink-0 hover:bg-[#1b365d] active:scale-95 transition-transform cursor-pointer"
          >
            Upload
          </button>
        </div>
      </section>
    </div>
  );
};

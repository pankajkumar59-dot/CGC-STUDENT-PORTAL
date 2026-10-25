import React, { useState } from 'react';

interface OfflineVaultViewProps {
  onBack: () => void;
  onOpenReader: (docTitle?: string, docSubject?: string) => void;
  onExportPdf: (fileName: string) => void;
}

export const OfflineVaultView: React.FC<OfflineVaultViewProps> = ({
  onBack,
  onOpenReader,
  onExportPdf,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isCacheCleared, setIsCacheCleared] = useState(false);
  const [isDownloadPaused, setIsDownloadPaused] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(75);

  const [prefAnnotations, setPrefAnnotations] = useState(true);
  const [prefCloudSync, setPrefCloudSync] = useState(true);
  const [prefWifiOnly, setPrefWifiOnly] = useState(false);

  const handleRefreshSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  const handleClearCache = () => {
    setIsCacheCleared(true);
    setTimeout(() => {
      setIsCacheCleared(false);
    }, 2500);
  };

  const togglePause = () => {
    setIsDownloadPaused(!isDownloadPaused);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 pt-1 pb-12 gap-4">
      {/* Sub-Header / Page Context */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#002046] hover:bg-[#e5eeff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-[#835500]">
              <span className="material-symbols-outlined text-[14px]">cloud_done</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">
                Library &amp; Vault / Offline Storage
              </span>
            </div>
            <h1 className="text-xl font-bold text-[#002046] mt-0.5">
              Downloads &amp; Offline Vault
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleRefreshSync}
            aria-label="Refresh Sync"
            title="Refresh Sync"
            className={`w-9 h-9 rounded-full flex items-center justify-center text-[#1b365d] hover:bg-[#e5eeff] transition-all cursor-pointer ${
              isSyncing ? 'animate-spin text-[#835500]' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">sync</span>
          </button>
          <button
            onClick={handleClearCache}
            aria-label="Clean Storage"
            title="Clean Storage"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#74777f] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
          </button>
        </div>
      </div>

      {/* Device Storage Card */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#1b365d]">
              <span className="material-symbols-outlined text-[20px]">sd_card</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b1c30] block">App Local Storage</span>
              <span className="text-[11px] text-[#44474e]">
                {isCacheCleared ? '1.23 GB of 4.00 GB' : '1.42 GB of 4.00 GB'} Allocated Used
              </span>
            </div>
          </div>

          <button
            onClick={handleClearCache}
            className="px-2.5 py-1.5 rounded-lg bg-[#eff4ff] text-[#1b365d] hover:bg-[#e5eeff] text-xs font-bold transition-colors flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#835500]">cached</span>
            <span>{isCacheCleared ? 'Cache Cleared!' : 'Clear Cache (190 MB)'}</span>
          </button>
        </div>

        {/* Segmented Bar */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="w-full h-3 rounded-full bg-[#e5eeff] overflow-hidden flex">
            <div
              className="h-full bg-[#1b365d] transition-all duration-500"
              style={{ width: '20.5%' }}
              title="Lecture Notes (820 MB)"
            ></div>
            <div
              className="h-full bg-[#feae2c] transition-all duration-500"
              style={{ width: '10.25%' }}
              title="Solved PYQs (410 MB)"
            ></div>
            {!isCacheCleared && (
              <div
                className="h-full bg-[#003d3c] transition-all duration-500"
                style={{ width: '4.75%' }}
                title="AI Annotation Cache (190 MB)"
              ></div>
            )}
            <div
              className="h-full bg-[#d3e4fe]/50"
              style={{ width: isCacheCleared ? '69.25%' : '64.5%' }}
              title="Free"
            ></div>
          </div>

          {/* Segment Legend */}
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 pt-1 text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1b365d] flex-shrink-0"></span>
              <span className="text-[#44474e] truncate">
                Notes: <strong className="text-[#0b1c30]">820 MB</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#feae2c] flex-shrink-0"></span>
              <span className="text-[#44474e] truncate">
                PYQs: <strong className="text-[#0b1c30]">410 MB</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#003d3c] flex-shrink-0"></span>
              <span className="text-[#44474e] truncate">
                AI Cache:{' '}
                <strong className="text-[#0b1c30]">{isCacheCleared ? '0 MB' : '190 MB'}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d3e4fe] flex-shrink-0"></span>
              <span className="text-[#44474e] truncate">
                Free:{' '}
                <strong className="text-[#0b1c30]">
                  {isCacheCleared ? '2.77 GB' : '2.58 GB'}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* In-Progress Downloads */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#feae2c] animate-pulse"></span>
            <span className="text-sm font-bold text-[#002046]">In-Progress Downloads</span>
            <span className="text-[10px] bg-[#e5eeff] text-[#1b365d] px-2 py-0.5 rounded-full font-bold">
              1 active
            </span>
          </div>
          <span className="text-xs text-[#835500] font-bold">
            {isDownloadPaused ? 'Paused' : '1.2 MB/s'}
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#002046] flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">downloading</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] bg-[#dce9ff] text-[#002046] px-1.5 py-0.5 rounded font-bold">
                  BTCS-403
                </span>
                <span className="text-xs text-[#44474e]">PTU Solved Vault (2019–2024)</span>
              </div>
              <h2 className="text-xs font-bold text-[#0b1c30] mt-0.5 leading-snug line-clamp-1">
                Database Management Systems — 5-Year Solved Vault
              </h2>
              <p className="text-[11px] text-[#44474e] mt-0.5">
                Unit 1 to 5 • Faculty Verified • 18.4 MB of 24.6 MB ({downloadProgress}%)
              </p>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={togglePause}
                aria-label={isDownloadPaused ? 'Resume' : 'Pause'}
                className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#e5eeff] flex items-center justify-center text-[#002046] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isDownloadPaused ? 'play_arrow' : 'pause'}
                </span>
              </button>
              <button
                onClick={() => setDownloadProgress(100)}
                aria-label="Complete"
                className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#e5eeff] flex items-center justify-center text-[#74777f] hover:text-[#002046] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">done</span>
              </button>
            </div>
          </div>

          {/* Progress Bar with varsity gold accent */}
          <div className="w-full flex flex-col gap-1">
            <div className="w-full h-2 rounded-full bg-[#e5eeff] overflow-hidden relative">
              <div
                className="h-full bg-[#1b365d] rounded-full relative transition-all"
                style={{ width: `${downloadProgress}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[#feae2c]"></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[#44474e] text-xs">
              <span className="text-[11px]">
                {isDownloadPaused ? 'Download paused' : 'Estimated time: ~6 sec remaining'}
              </span>
              <span className="text-xs font-bold text-[#002046]">{downloadProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Settings & Preferences Toggles */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-0.5">
          <span className="material-symbols-outlined text-[18px] text-[#835500]">tune</span>
          <span className="text-sm font-bold text-[#002046]">Download Preferences</span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-[#e5eeff] flex flex-col gap-3">
          {/* Toggle 1 */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded bg-[#eff4ff] flex items-center justify-center text-[#1b365d] flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">draw</span>
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                  Download with high-res annotations
                </span>
                <p className="text-[11px] text-[#44474e] mt-0.5">
                  Includes faculty marginalia, handwriting vectors, and high-DPI architecture diagrams.
                </p>
              </div>
            </div>

            <button
              onClick={() => setPrefAnnotations(!prefAnnotations)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${
                prefAnnotations ? 'bg-[#1b365d]' : 'bg-[#c4c6cf]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform absolute top-0.5 left-0.5 ${
                  prefAnnotations ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div className="h-px w-full bg-[#e5eeff]"></div>

          {/* Toggle 2 */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded bg-[#eff4ff] flex items-center justify-center text-[#1b365d] flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">sync_saved_locally</span>
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                  Automatic cloud updates
                </span>
                <p className="text-[11px] text-[#44474e] mt-0.5">
                  Auto-refresh offline notes whenever professors release syllabus addendums on CGC ERP.
                </p>
              </div>
            </div>

            <button
              onClick={() => setPrefCloudSync(!prefCloudSync)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${
                prefCloudSync ? 'bg-[#1b365d]' : 'bg-[#c4c6cf]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform absolute top-0.5 left-0.5 ${
                  prefCloudSync ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div className="h-px w-full bg-[#e5eeff]"></div>

          {/* Toggle 3 */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded bg-[#eff4ff] flex items-center justify-center text-[#1b365d] flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">wifi</span>
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                  Download over Wi-Fi only
                </span>
                <p className="text-[11px] text-[#44474e] mt-0.5">
                  Save cellular data when commuting across Mohali campus.
                </p>
              </div>
            </div>

            <button
              onClick={() => setPrefWifiOnly(!prefWifiOnly)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${
                prefWifiOnly ? 'bg-[#1b365d]' : 'bg-[#c4c6cf]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform absolute top-0.5 left-0.5 ${
                  prefWifiOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Saved Offline Documents List */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <div>
            <span className="text-sm font-bold text-[#002046]">Saved Offline</span>
            <span className="text-xs text-[#44474e] ml-1 font-semibold">(4 Docs • 1.23 GB)</span>
          </div>

          <div className="flex items-center gap-1 bg-[#e5eeff] px-2.5 py-1 rounded-full text-[#1b365d] text-xs font-bold">
            <span className="material-symbols-outlined text-[15px]">sort</span>
            <span>Recently Added</span>
          </div>
        </div>

        {/* Item 1 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#1b365d] flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] bg-[#e5eeff] text-[#1b365d] px-2 py-0.5 rounded-full font-bold">
                  Verified Faculty Note • Sem 4
                </span>
                <h3 className="text-xs font-bold text-[#0b1c30] mt-1 leading-snug">
                  Operating Systems: Concepts &amp; CGC Hands-on Handout
                </h3>
                <div className="flex items-center gap-2 mt-1 text-[#44474e] text-xs flex-wrap">
                  <span>8.4 MB</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#835500] font-medium">
                    <span className="material-symbols-outlined text-[14px]">edit_note</span>
                    Stored with Annotations
                  </span>
                  <span>•</span>
                  <span className="text-[#835500] flex items-center gap-0.5 font-bold">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>Synced</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => onExportPdf('Operating_Systems_Handout.pdf')}
              className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#1b365d] hover:bg-[#e5eeff] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => onOpenReader('Operating Systems: Concepts & CGC Hands-on Handout', 'CSE Sem 4')}
              className="px-3 py-1.5 rounded-lg bg-[#1b365d] text-white hover:bg-[#002046] text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Open Offline Reader</span>
            </button>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-lg bg-[#ffddb4] flex items-center justify-center text-[#291800] flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">quiz</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] bg-[#ffddb4] text-[#291800] px-2 py-0.5 rounded-full font-bold">
                  Official Archive • PTU/CGC
                </span>
                <h3 className="text-xs font-bold text-[#0b1c30] mt-1 leading-snug">
                  Design &amp; Analysis of Algorithms — MST-1 Solved Paper (Oct 2024)
                </h3>
                <div className="flex items-center gap-2 mt-1 text-[#44474e] text-xs flex-wrap">
                  <span>14.2 MB</span>
                  <span>•</span>
                  <span>Updated 2 days ago</span>
                  <span>•</span>
                  <span className="text-[#835500] font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">offline_pin</span>
                    <span>Offline Ready</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => onExportPdf('DAA_MST1_Solved_Paper.pdf')}
              className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#1b365d] hover:bg-[#e5eeff] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => onOpenReader('Design & Analysis of Algorithms — MST-1 Solved Paper', 'PTU Official Archive')}
              className="px-3 py-1.5 rounded-lg bg-[#1b365d] text-white hover:bg-[#002046] text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Open Offline Reader</span>
            </button>
          </div>
        </div>

        {/* Item 3 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-lg bg-[#a5f0ed] flex items-center justify-center text-[#00201f] flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">folder_special</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] bg-[#a5f0ed] text-[#00201f] px-2 py-0.5 rounded-full font-bold">
                  Autonomous 2021–25 Scheme
                </span>
                <h3 className="text-xs font-bold text-[#0b1c30] mt-1 leading-snug">
                  PTU CSE 4th Semester Full Curriculum &amp; Lab Manuals Bundle
                </h3>
                <div className="flex items-center gap-2 mt-1 text-[#44474e] text-xs flex-wrap">
                  <span>4.8 MB</span>
                  <span>•</span>
                  <span className="text-[#835500] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>Offline Verified</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => onExportPdf('PTU_CSE_4thSem_Manuals.pdf')}
              className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#1b365d] hover:bg-[#e5eeff] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => onOpenReader('PTU CSE 4th Semester Full Curriculum & Lab Manuals Bundle', 'Autonomous 2021–25 Scheme')}
              className="px-3 py-1.5 rounded-lg bg-[#1b365d] text-white hover:bg-[#002046] text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Open Offline Reader</span>
            </button>
          </div>
        </div>
      </div>

      {/* Offline Exam Mode Notice Card */}
      <div className="bg-[#dce9ff] border border-[#cbdbf5] rounded-xl p-4 flex items-start gap-3 shadow-sm mt-1">
        <div className="w-8 h-8 rounded-full bg-[#feae2c] text-[#6b4500] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold text-[#002046] block">Exam Hall Ready Vault</span>
          <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">
            All saved documents are accessible without campus Wi-Fi or mobile data during MST exam hours. Annotations stay cached locally on your device.
          </p>
        </div>
      </div>
    </div>
  );
};

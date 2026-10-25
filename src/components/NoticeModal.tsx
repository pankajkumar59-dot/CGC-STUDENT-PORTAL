import React, { useState } from 'react';
import { CAMPUS_NOTICES, NoticeItem } from '../data/portalData';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadFile: (fileName: string) => void;
  onNotify: (msg: string) => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  onDownloadFile,
  onNotify,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'EXAM' | 'PLACEMENT' | 'ACADEMIC'>('ALL');
  const [notices, setNotices] = useState<NoticeItem[]>(CAMPUS_NOTICES);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotices((prev) => prev.map((n) => ({ ...n, unread: false })));
    onNotify('All notifications marked as read');
  };

  const filtered = notices.filter(
    (n) => activeFilter === 'ALL' || n.category === activeFilter
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#002046] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#feae2c] text-[24px]">campaign</span>
            <div>
              <h3 className="text-sm font-bold text-white">CGC Official Notice Board</h3>
              <p className="text-xs text-[#aec7f7]">Academic &amp; Placement Circulars</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-4 pt-3 flex items-center justify-between border-b border-[#e5eeff] pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`text-xs font-bold pb-1 cursor-pointer transition-colors ${
                activeFilter === 'ALL'
                  ? 'text-[#002046] border-b-2 border-[#002046]'
                  : 'text-[#74777f] hover:text-[#002046]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('EXAM')}
              className={`text-xs font-bold pb-1 cursor-pointer transition-colors ${
                activeFilter === 'EXAM'
                  ? 'text-[#002046] border-b-2 border-[#002046]'
                  : 'text-[#74777f] hover:text-[#002046]'
              }`}
            >
              Exams
            </button>
            <button
              onClick={() => setActiveFilter('PLACEMENT')}
              className={`text-xs font-bold pb-1 cursor-pointer transition-colors ${
                activeFilter === 'PLACEMENT'
                  ? 'text-[#002046] border-b-2 border-[#002046]'
                  : 'text-[#74777f] hover:text-[#002046]'
              }`}
            >
              Placements
            </button>
          </div>

          <button
            onClick={markAllRead}
            className="text-[11px] font-bold text-[#835500] hover:underline cursor-pointer"
          >
            Mark All Read
          </button>
        </div>

        {/* Notice List */}
        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border flex flex-col gap-1.5 transition-all ${
                item.category === 'EXAM'
                  ? 'bg-[#ffdad6]/20 border-[#ffdad6]'
                  : 'bg-white border-[#e5eeff]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    item.category === 'EXAM'
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : 'bg-[#feae2c]/30 text-[#835500]'
                  }`}
                >
                  {item.category === 'EXAM' ? 'Examination Alert' : 'CRC Placement'}
                </span>
                <span className="text-[10px] text-[#74777f]">{item.date}</span>
              </div>

              <h4 className="text-xs font-bold text-[#002046]">{item.title}</h4>
              <p className="text-xs text-[#44474e] leading-relaxed">{item.summary}</p>

              <div className="pt-1 flex items-center justify-between text-xs">
                {item.file ? (
                  <button
                    onClick={() => onDownloadFile(item.file!)}
                    className="text-[#002046] font-bold inline-flex items-center gap-1 hover:text-[#835500] cursor-pointer"
                  >
                    <span>Download PDF Circular</span>
                    <span className="material-symbols-outlined text-[15px]">download</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-[#44474e]">Auditorium 1 Session</span>
                )}
                <span className="text-[10px] text-[#835500] font-semibold">{item.ref}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

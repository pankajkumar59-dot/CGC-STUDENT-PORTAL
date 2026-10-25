import React, { useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [subject, setSubject] = useState('Operating Systems');
  const [title, setTitle] = useState('');
  const [notesType, setNotesType] = useState('Handwritten Notes');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onNotify('Notes submitted for faculty verification! +150 Library Karma Points awarded.');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 bg-[#1b365d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#feae2c] text-[#6b4500] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Upload Study Notes</h3>
              <p className="text-xs text-[#87a0cd]">Earn CGC Library Karma Points &amp; Badges</p>
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

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#002046]">Select Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-medium border border-[#dce9ff]"
            >
              <option value="Operating Systems">Operating Systems (BTCS-401)</option>
              <option value="DAA">Design &amp; Analysis of Algorithms (BTCS-402)</option>
              <option value="DBMS">Database Management Systems (BTCS-403)</option>
              <option value="Discrete Maths">Discrete Mathematics (BTCS-404)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#002046]">Note Title / Chapter</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unit 3 Semaphores & Peterson Algorithm Handwritten"
              className="w-full h-11 px-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-medium border border-[#dce9ff]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#002046]">Resource Type</label>
            <select
              value={notesType}
              onChange={(e) => setNotesType(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-medium border border-[#dce9ff]"
            >
              <option value="Handwritten Notes">Handwritten Topper Notes</option>
              <option value="Lab Manual">Lab Manual &amp; Program Code</option>
              <option value="MST Question Paper">Recent MST Question Paper</option>
              <option value="Formula Sheet">Cheat Sheet / Summary Formulas</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-[#cbdbf5] rounded-xl p-4 flex flex-col items-center justify-center text-center bg-[#eff4ff] gap-1 cursor-pointer hover:bg-[#e5eeff] transition-colors">
            <span className="material-symbols-outlined text-[32px] text-[#835500]">add_a_photo</span>
            <span className="text-xs font-bold text-[#002046]">Tap to snap notebook or pick PDF</span>
            <span className="text-[10px] text-[#74777f]">Supports PDF, JPG, PNG up to 25 MB</span>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-2.5 rounded-xl bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
          >
            {isUploading ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                <span>Submitting for Faculty Moderation...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">upload</span>
                <span>Submit &amp; Claim +150 Points</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

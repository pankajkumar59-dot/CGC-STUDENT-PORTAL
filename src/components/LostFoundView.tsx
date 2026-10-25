import React, { useState, useEffect } from 'react';
import { LostFoundItem, filterLostFound } from '../utils/campusData';

interface LostFoundViewProps {
  onNotify: (msg: string) => void;
}

const INITIAL_ITEMS: LostFoundItem[] = [
  {
    id: 'lf-1',
    kind: 'Lost',
    title: 'Lavender earbuds case (Boat Airdopes)',
    cat: 'Electronics',
    place: 'Near Central Library Lawn',
    details: 'Matte lavender charging case with a small anime cat sticker on the top lid.',
    date: 'Today, 10:15 AM',
    contact: 'CSE Block 3 Desk',
  },
  {
    id: 'lf-2',
    kind: 'Found',
    title: 'Blue steel insulated water bottle (Milton)',
    cat: 'Personal items',
    place: 'Academic Block 2, Room 204',
    details: 'Found after morning Web Development class on row 3 desk.',
    date: 'Yesterday, 04:30 PM',
    contact: 'CBSA Reception Desk',
  },
  {
    id: 'lf-3',
    kind: 'Lost',
    title: 'Black spiral notebook (DAA Lecture Notes)',
    cat: 'Books & stationery',
    place: 'Campus Food Court, Nescafe table',
    details: 'A5 size ruled notebook with green elastic band. Has Dr. Sandeep Singh lectures inside.',
    date: 'Yesterday, 01:20 PM',
    contact: 'Security Post Gate 2',
  },
  {
    id: 'lf-4',
    kind: 'Found',
    title: 'Scientific Calculator (Casio fx-991ES Plus)',
    cat: 'Electronics',
    place: 'Block 3, Computing Center Lab 4',
    details: 'Found plugged near workstation #28 after practical examination.',
    date: '2 days ago',
    contact: 'Lab Technician Desk',
  },
  {
    id: 'lf-5',
    kind: 'Found',
    title: 'CGC College Smart ID Card (Roll 2104812)',
    cat: 'Other',
    place: 'Sports Pavilion Cricket Grounds',
    details: 'Handed over to Security Post near Main Gate 1. Belonging to B.Tech ECE student.',
    date: '3 days ago',
    contact: 'Main Security Gate 1',
  },
];

const STORAGE_KEY = 'smart-campus-cgc-lf';

export const LostFoundView: React.FC<LostFoundViewProps> = ({ onNotify }) => {
  const [items, setItems] = useState<LostFoundItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ITEMS;
  });

  const [filterKind, setFilterKind] = useState<'all' | 'Lost' | 'Found'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formKind, setFormKind] = useState<'Lost' | 'Found'>('Lost');
  const [formTitle, setFormTitle] = useState('');
  const [formCat, setFormCat] = useState<LostFoundItem['cat']>('Personal items');
  const [formPlace, setFormPlace] = useState('');
  const [formDetails, setFormDetails] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formPlace.trim()) return;

    const newItem: LostFoundItem = {
      id: `lf-${Date.now()}`,
      kind: formKind,
      title: formTitle.trim(),
      cat: formCat,
      place: formPlace.trim(),
      details: formDetails.trim() || 'No additional details specified.',
      date: 'Just now',
      contact: 'Reported by Student',
    };

    setItems((prev) => [newItem, ...prev]);
    setFormTitle('');
    setFormPlace('');
    setFormDetails('');
    setShowForm(false);
    onNotify(`Posted to board: "${newItem.title}" (${newItem.kind})`);
  };

  const handleClaim = (item: LostFoundItem) => {
    onNotify(
      item.kind === 'Lost'
        ? `Found this? Please submit it to ${item.contact || 'CGC Security Desk'}!`
        : `Claim request recorded. Inquire at ${item.contact || 'Campus Reception'} with ID proof.`
    );
  };

  const filteredItems = filterLostFound(items, filterKind, searchQuery);

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 pt-1 pb-16 gap-4">
      {/* Page Heading */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[#835500]">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Smart Campus Community Board
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#002046] mt-0.5">Lost &amp; Found ✦</h1>
          <p className="text-xs text-[#44474e]">
            Campus finds, reunited. Post a lost item or help fellow scholars find theirs.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3.5 py-2 rounded-xl bg-[#002046] hover:bg-[#1b365d] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span>{showForm ? 'Close Form' : 'Post an Item'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5">
        <div className="relative w-full sm:flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#74777f] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, place e.g. bottle, library, notebook..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-[#e5eeff] text-xs text-[#0b1c30] placeholder:text-[#74777f] focus:outline-none focus:ring-2 focus:ring-[#002046]"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterKind('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterKind === 'all'
                ? 'bg-[#002046] text-white shadow-sm'
                : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
            }`}
          >
            Everything ({items.length})
          </button>

          <button
            onClick={() => setFilterKind('Lost')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterKind === 'Lost'
                ? 'bg-[#ba1a1a] text-white shadow-sm'
                : 'bg-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/80'
            }`}
          >
            Lost Only
          </button>

          <button
            onClick={() => setFilterKind('Found')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterKind === 'Found'
                ? 'bg-[#003d3c] text-white shadow-sm'
                : 'bg-[#a5f0ed] text-[#00201f] hover:bg-[#a5f0ed]/80'
            }`}
          >
            Found Only
          </button>
        </div>
      </div>

      {/* Post to Board Form (Collapsible) */}
      {showForm && (
        <div className="bg-white rounded-2xl p-4 border border-[#feae2c]/40 shadow-md flex flex-col gap-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#e5eeff] pb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#835500] text-[20px]">
                post_add
              </span>
              <h3 className="text-sm font-bold text-[#002046]">Post to Lost &amp; Found Board</h3>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="text-xs text-[#74777f] hover:text-[#002046] cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#002046]">Listing Type</label>
              <select
                value={formKind}
                onChange={(e) => setFormKind(e.target.value as any)}
                className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] text-xs font-medium border border-[#dce9ff]"
              >
                <option value="Lost">I Lost Something</option>
                <option value="Found">I Found Something</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#002046]">Item Name</label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Blue Milton water bottle, HP laptop charger"
                className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] text-xs font-medium border border-[#dce9ff]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#002046]">Category</label>
              <select
                value={formCat}
                onChange={(e) => setFormCat(e.target.value as any)}
                className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] text-xs font-medium border border-[#dce9ff]"
              >
                <option value="Personal items">Personal items (Bottles, Wallets, Bags)</option>
                <option value="Electronics">Electronics (Earbuds, Chargers, Laptops)</option>
                <option value="Books & stationery">Books &amp; Stationery (Notebooks, Calculators)</option>
                <option value="Other">Other (ID Cards, Keys, Umbrellas)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#002046]">Campus Location</label>
              <input
                type="text"
                required
                value={formPlace}
                onChange={(e) => setFormPlace(e.target.value)}
                placeholder="e.g. Block 3 Room 402, Central Library 1st Floor"
                className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] text-xs font-medium border border-[#dce9ff]"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-bold text-[#002046]">Description &amp; Identifying Details</label>
              <textarea
                value={formDetails}
                onChange={(e) => setFormDetails(e.target.value)}
                rows={2}
                placeholder="Describe distinguishing marks, stickers, color, approximate time..."
                className="w-full p-2.5 rounded-lg bg-[#eff4ff] text-xs font-medium border border-[#dce9ff]"
              ></textarea>
            </div>

            <div className="sm:col-span-2 flex items-center justify-between pt-1">
              <span className="text-[10px] text-[#74777f]">
                Saved securely in this browser session.
              </span>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#002046] hover:bg-[#1b365d] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Publish Listing
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredItems.map((item) => {
          const isLost = item.kind === 'Lost';
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isLost
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : 'bg-[#a5f0ed] text-[#00201f]'
                    }`}
                  >
                    {item.kind}
                  </span>
                  <span className="text-[10px] text-[#74777f]">{item.date}</span>
                </div>

                <h3 className="text-sm font-bold text-[#002046] leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[#835500] font-medium">
                  <span className="material-symbols-outlined text-[15px]">pin_drop</span>
                  <span className="truncate">{item.place}</span>
                </div>

                <p className="text-xs text-[#44474e] leading-relaxed line-clamp-3">
                  {item.details}
                </p>
              </div>

              <div className="pt-2 border-t border-[#e5eeff] flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#74777f] font-semibold">
                  Category: {item.cat}
                </span>

                <button
                  onClick={() => handleClaim(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                    isLost
                      ? 'bg-[#dce9ff] text-[#002046] hover:bg-[#d3e4fe]'
                      : 'bg-[#003d3c] text-white hover:bg-[#002625]'
                  }`}
                >
                  {isLost ? 'I Found This' : 'Claim Item'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-2xl p-8 border border-dashed border-[#cbdbf5] text-center flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[32px] text-[#74777f]">search_off</span>
          <h4 className="text-sm font-bold text-[#002046]">No listings found</h4>
          <p className="text-xs text-[#74777f]">
            Try clearing your search query or post a new lost/found notice above.
          </p>
        </div>
      )}

      {/* Safety Notice */}
      <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs text-[#44474e] flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px] text-[#835500] flex-shrink-0">
          shield
        </span>
        <span>
          <strong>Campus Safety:</strong> Never post personal phone numbers, passwords, or ATM card PINs on the public board.
        </span>
      </div>
    </div>
  );
};

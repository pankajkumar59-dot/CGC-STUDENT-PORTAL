import React, { useState } from 'react';

interface CampusEventsViewProps {
  onNotify: (msg: string) => void;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Innovation' | 'Clubs' | 'Cultural' | 'Sports' | 'Career';
  dateStr: string;
  dayNum: string;
  monthStr: string;
  venue: string;
  description: string;
  spotsLeft: string;
  saved?: boolean;
  registered?: boolean;
}

const EVENTS_LIST: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Parivartan TechFest 2026',
    category: 'Innovation',
    dateStr: '29 OCT 2026 • 10:00 AM',
    dayNum: '29',
    monthStr: 'OCT',
    venue: 'CGC Main Auditorium & Block 3 Quad',
    description: 'Annual inter-college engineering showcase featuring robotics arena, 24-hr hackathon, algorithmic bug-hunt, and drone race.',
    spotsLeft: '45 spots left',
    saved: true,
  },
  {
    id: 'ev-2',
    title: 'Student Technical Club Meetup',
    category: 'Clubs',
    dateStr: '02 NOV 2026 • 03:30 PM',
    dayNum: '02',
    monthStr: 'NOV',
    venue: 'Seminar Hall 2, Block 1',
    description: 'Hands-on orientation for Google Developer Student Club (GDSC) and Open Source Coding Chapter. Mentorship on GitHub projects.',
    spotsLeft: 'Open Registration',
  },
  {
    id: 'ev-3',
    title: 'Campus Innovation & Startup Showcase',
    category: 'Innovation',
    dateStr: '07 NOV 2026 • 11:00 AM',
    dayNum: '07',
    monthStr: 'NOV',
    venue: 'CGC Incubation & Innovation Cell',
    description: 'Pitch competition for student founders before angel investors and alumni entrepreneurs. Seed grants up to ₹2.5 Lakhs.',
    spotsLeft: '12 team slots',
  },
  {
    id: 'ev-4',
    title: 'Annual Inter-Branch Sports League',
    category: 'Sports',
    dateStr: '12 NOV 2026 • 09:00 AM',
    dayNum: '12',
    monthStr: 'NOV',
    venue: 'CGC Sports Complex & Cricket Ground',
    description: 'Cricket tournament, 5-a-side futsal, badminton championships, and athletics relays between CSE, ECE, ME, and CBSA wings.',
    spotsLeft: 'Team Entry Open',
  },
  {
    id: 'ev-5',
    title: 'Amazon Pre-Placement Technical Coding Assessment',
    category: 'Career',
    dateStr: '18 NOV 2026 • 02:00 PM',
    dayNum: '18',
    monthStr: 'NOV',
    venue: 'Central Computing Center Lab 1-4',
    description: 'Mandatory technical assessment and live problem-solving test for 2026 batch placement eligibility with SDE role opportunities.',
    spotsLeft: 'Mandatory for CSE/IT',
  },
];

export const CampusEventsView: React.FC<CampusEventsViewProps> = ({ onNotify }) => {
  const [events, setEvents] = useState<EventItem[]>(EVENTS_LIST);
  const [filterCat, setFilterCat] = useState<string>('All');

  const categories = ['All', 'Innovation', 'Clubs', 'Sports', 'Career'];

  const toggleSave = (id: string, title: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const nextSaved = !e.saved;
          onNotify(nextSaved ? `Saved "${title}" to your calendar` : `Removed "${title}" from saved`);
          return { ...e, saved: nextSaved };
        }
        return e;
      })
    );
  };

  const handleRegister = (id: string, title: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, registered: true } : e))
    );
    onNotify(`Registered successfully for ${title}! Ticket sent to student portal.`);
  };

  const filteredEvents = events.filter(
    (e) => filterCat === 'All' || e.category === filterCat
  );

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 pt-1 pb-16 gap-4">
      {/* Page Heading */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[#835500]">
            <span className="material-symbols-outlined text-[16px]">celebration</span>
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Student Life &amp; Activities
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#002046] mt-0.5">Campus Events ☆</h1>
          <p className="text-xs text-[#44474e]">
            Upcoming student club meetups, hackathons, and cultural festivals.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#002046] text-xs font-bold shrink-0">
          Fall 2026 Calendar
        </span>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = filterCat === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#002046] text-white shadow-sm'
                  : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {/* Big Date Badge */}
                  <div className="w-12 h-12 rounded-xl bg-[#e5eeff] text-[#002046] flex flex-col items-center justify-center font-black leading-tight border border-[#cbdbf5] shrink-0">
                    <span className="text-base">{event.dayNum}</span>
                    <span className="text-[9px] uppercase font-bold text-[#835500]">
                      {event.monthStr}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffddb4] text-[#291800]">
                      {event.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#002046] mt-0.5 line-clamp-1">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => toggleSave(event.id, event.title)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    event.saved
                      ? 'bg-[#feae2c] text-[#6b4500]'
                      : 'bg-[#eff4ff] text-[#74777f] hover:bg-[#e5eeff]'
                  }`}
                  title={event.saved ? 'Saved' : 'Save Event'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {event.saved ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#835500] font-medium">
                <span className="material-symbols-outlined text-[15px]">location_on</span>
                <span className="truncate">{event.venue}</span>
              </div>

              <p className="text-xs text-[#44474e] leading-relaxed line-clamp-2">
                {event.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#e5eeff] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#74777f] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#003d3c]"></span>
                {event.spotsLeft}
              </span>

              <button
                onClick={() => handleRegister(event.id, event.title)}
                disabled={event.registered}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs ${
                  event.registered
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-[#002046] hover:bg-[#1b365d] text-white'
                }`}
              >
                {event.registered ? 'Registered ✓' : 'Register Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

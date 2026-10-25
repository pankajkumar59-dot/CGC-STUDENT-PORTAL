import React, { useState } from 'react';
import { CAMPUS_PLACES, findCampusPlace, CampusPlace } from '../utils/campusData';

interface CampusMapViewProps {
  onNotify: (msg: string) => void;
}

export const CampusMapView: React.FC<CampusMapViewProps> = ({ onNotify }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<CampusPlace | null>(CAMPUS_PLACES[0]); // Default Block 3 CSE
  const [searchedAttempt, setSearchedAttempt] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedAttempt(true);
    const place = findCampusPlace(searchQuery);
    if (place) {
      setSelectedPlace(place);
      onNotify(`Located: ${place.name} (${place.walkMinutes} min walk)`);
    } else {
      setSelectedPlace(null);
    }
  };

  const handleQuickSelect = (place: CampusPlace) => {
    setSelectedPlace(place);
    setSearchQuery(place.code);
    setSearchedAttempt(false);
    onNotify(`Selected: ${place.name}`);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 pt-1 pb-12 gap-4">
      {/* Page Heading */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[#835500]">
            <span className="material-symbols-outlined text-[16px]">pin_drop</span>
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Smart Campus Navigator • GPS Verified
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#002046] mt-0.5">Find Your Room &amp; Building</h1>
          <p className="text-xs text-[#44474e]">
            Interactive campus locator for CGC University Mohali (Jhanjeri &amp; Landran).
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#002046] text-xs font-bold shrink-0">
          OpenStreetMap
        </span>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#74777f] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search e.g. Block 3, Library, Lab 4, Food Court, Rm 402..."
            className="w-full h-11 pl-10 pr-3 rounded-xl bg-white border border-[#e5eeff] text-xs text-[#0b1c30] placeholder:text-[#74777f] focus:outline-none focus:ring-2 focus:ring-[#002046] shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="h-11 px-4 rounded-xl bg-[#002046] hover:bg-[#1b365d] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">near_me</span>
          <span>Find Route</span>
        </button>
      </form>

      {/* Quick Landmark Chips */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {CAMPUS_PLACES.map((p) => {
          const isSelected = selectedPlace?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleQuickSelect(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#1b365d] text-white shadow-sm'
                  : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {p.type === 'academic' ? 'apartment' : p.type === 'facility' ? 'menu_book' : p.type === 'amenity' ? 'restaurant' : 'hotel'}
              </span>
              <span>{p.code}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Interactive Map + Route Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map Display Column (2 cols on lg) */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          <div className="relative rounded-2xl overflow-hidden border border-[#e5eeff] shadow-md bg-white">
            <iframe
              className="w-full h-80 sm:h-96 border-0"
              title="OpenStreetMap CGC University Mohali"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.5980%2C30.6765%2C76.6138%2C30.6865&layer=mapnik&marker=30.68114%2C76.60584"
            ></iframe>

            {/* Floating Quick Action Overlay on Map */}
            <div className="absolute top-3 left-3 bg-[#002046]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#feae2c] animate-ping"></span>
              <span>CGC Campus Vicinity • Jhanjeri &amp; Landran</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#74777f] px-1">
            <span>Map data © OpenStreetMap contributors</span>
            <a
              href="https://www.openstreetmap.org/?mlat=30.68114&mlon=76.60584#map=16/30.68114/76.60584"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#835500] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>Open Full HD Map</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Route Details Panel Column */}
        <div className="flex flex-col gap-3">
          {selectedPlace ? (
            <div className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-sm flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2 border-b border-[#e5eeff] pb-3">
                <div>
                  <span className="text-[10px] text-[#835500] uppercase font-bold tracking-wider">
                    Location Found
                  </span>
                  <h3 className="text-base font-bold text-[#002046] mt-0.5">{selectedPlace.name}</h3>
                  <p className="text-xs text-[#74777f] mt-0.5">{selectedPlace.floor}</p>
                </div>
                <div className="px-2.5 py-1 rounded-xl bg-[#feae2c]/20 text-[#6b4500] text-xs font-black flex flex-col items-center shrink-0">
                  <span>{selectedPlace.walkMinutes}</span>
                  <span className="text-[9px] uppercase font-bold">min walk</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs text-[#0b1c30] leading-relaxed">
                <span className="font-bold text-[#002046] block mb-1">About this Facility:</span>
                {selectedPlace.description}
              </div>

              <div className="p-3 rounded-xl bg-[#ffddb4]/25 border border-[#feae2c]/40 text-xs text-[#291800] leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-[#835500] mb-1">
                  <span className="material-symbols-outlined text-[16px]">turn_right</span>
                  <span>Walking Directions:</span>
                </div>
                {selectedPlace.directions}
              </div>

              <button
                onClick={() => onNotify(`Turn-by-turn navigation started for ${selectedPlace.name}`)}
                className="w-full py-2.5 rounded-xl bg-[#002046] hover:bg-[#1b365d] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                <span>Start Step-by-Step Walking Navigation</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-dashed border-[#cbdbf5] text-center flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#74777f]">
                <span className="material-symbols-outlined text-[28px]">location_off</span>
              </div>
              <h4 className="text-sm font-bold text-[#002046]">Place not in this demo</h4>
              <p className="text-xs text-[#74777f]">
                Try searching for <strong>Block 1, Block 2, Block 3, Library, Food Court, Auditorium, or Lab 4</strong>.
              </p>
            </div>
          )}

          {/* Emergency & Assistance Card */}
          <div className="p-3.5 rounded-xl bg-[#dce9ff] border border-[#cbdbf5] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#835500] text-[20px]">help_center</span>
              <div>
                <span className="font-bold text-[#002046] block">Need Security Escort?</span>
                <span className="text-[11px] text-[#44474e]">Gate 1 Security Control Desk</span>
              </div>
            </div>
            <a
              href="tel:01723984200"
              className="px-2.5 py-1 rounded-lg bg-[#002046] text-white font-bold text-xs"
            >
              Call Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

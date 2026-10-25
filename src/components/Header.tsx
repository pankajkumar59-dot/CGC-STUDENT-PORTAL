import React from 'react';
import { CgcLogo } from './CgcLogo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onBack?: () => void;
  unreadNotifsCount: number;
  onOpenNotices: () => void;
  onOpenProfile: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onBack,
  unreadNotifsCount,
  onOpenNotices,
  onOpenProfile,
  onOpenLogin,
}) => {
  const isSubView = ['reader', 'vault', 'exam-vault', 'map', 'lost-found', 'events'].includes(currentView);

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard';
      case 'notes':
        return 'Notes And Books';
      case 'copilot':
        return 'Cgc Copilot';
      case 'syllabus':
        return 'Syllabus';
      case 'reader':
        return 'Cgc Copilot';
      case 'vault':
        return 'Downloads & Vault';
      case 'exam-vault':
        return 'Exam Vault & PYQs';
      case 'map':
        return 'Find a Place (Map)';
      case 'lost-found':
        return 'Lost & Found Board';
      case 'events':
        return 'Campus Events';
      default:
        return 'Student Portal';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(27,54,93,0.05)]">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          {isSubView && onBack && (
            <button
              onClick={onBack}
              aria-label="Go Back"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#002046] hover:bg-[#e5eeff] active:scale-95 transition-all flex-shrink-0 -ml-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          )}

          <div onClick={() => onNavigate('dashboard')} className="cursor-pointer flex-shrink-0">
            <CgcLogo size={34} className="h-8.5 w-auto" />
          </div>

          <div
            className="flex flex-col min-w-0 cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            <span className="text-[10px] text-[#835500] uppercase font-bold tracking-wider truncate">
              CGC Mohali - Student Portal
            </span>
            <span className="text-lg font-bold text-[#002046] truncate leading-tight">
              {getTitle()}
            </span>
          </div>
        </div>

        {/* Desktop Quick Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-0.5 bg-[#eff4ff] p-1 rounded-full border border-[#dce9ff] text-xs">
          {[
            { id: 'dashboard', label: 'Overview' },
            { id: 'notes', label: 'Notes' },
            { id: 'exam-vault', label: 'PYQ Vault' },
            { id: 'copilot', label: 'Copilot AI' },
            { id: 'map', label: 'Map' },
            { id: 'lost-found', label: 'Lost & Found' },
            { id: 'events', label: 'Events' },
            { id: 'vault', label: 'Offline' },
          ].map((item) => {
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#1b365d] text-white shadow-sm'
                    : 'text-[#44474e] hover:text-[#002046] hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Find a place shortcut */}
          <button
            onClick={() => onNavigate('map')}
            aria-label="Campus Map"
            title="Campus Map & Room Finder"
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
              currentView === 'map' ? 'bg-[#dce9ff] text-[#002046]' : 'text-[#002046] hover:bg-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">pin_drop</span>
          </button>

          {/* Campus Switcher / Login portal button */}
          <button
            onClick={onOpenLogin}
            aria-label="Campus Login & ERP Switcher"
            title="Campus Switcher & ERP Login"
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#002046] hover:bg-[#e5eeff] active:scale-95 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">domain</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotices}
            aria-label="Notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#002046] hover:bg-[#e5eeff] active:scale-95 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadNotifsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#feae2c] ring-2 ring-[#f8f9ff] animate-pulse"></span>
            )}
          </button>

          {/* Student Profile Avatar */}
          <button
            onClick={onOpenProfile}
            aria-label="Open Student Profile"
            className="w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-transform cursor-pointer"
          >
            <img
              alt="Aarav Sharma"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#feae2c]"
              src="/assets/aistudio/Image_12_973cf0c1.jpeg"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

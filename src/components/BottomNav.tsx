import React from 'react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'notes', label: 'Notes & Books', icon: 'menu_book' },
    { id: 'copilot', label: 'CGC Copilot', icon: 'auto_awesome', isAi: true },
    { id: 'syllabus', label: 'Syllabus', icon: 'assignment' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-4px_16px_rgba(27,54,93,0.06)]">
      <div className="flex justify-around items-center h-16 max-w-5xl mx-auto px-2">
        {tabs.map((tab) => {
          const isActive =
            currentView === tab.id ||
            (tab.id === 'notes' && ['reader', 'vault', 'exam-vault'].includes(currentView));

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative cursor-pointer ${
                isActive
                  ? 'text-[#002046] font-bold'
                  : 'text-[#44474e] hover:text-[#002046]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    tab.isAi ? 'text-[#835500]' : ''
                  }`}
                  style={
                    isActive && !tab.isAi
                      ? { fontVariationSettings: "'FILL' 1, 'wght' 600" }
                      : undefined
                  }
                >
                  {tab.icon}
                </span>

                {tab.isAi && (
                  <span className="absolute -top-1 -right-4 px-1 py-0.2 bg-[#feae2c] text-[#6b4500] text-[9px] rounded-full leading-none font-bold">
                    AI
                  </span>
                )}
              </div>

              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

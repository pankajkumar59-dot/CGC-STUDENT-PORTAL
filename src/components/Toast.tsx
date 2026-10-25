import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-300 pointer-events-auto">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#002046] text-white shadow-2xl border border-[#feae2c]/60 text-xs font-bold">
        <span className="material-symbols-outlined text-[#feae2c] text-[18px]">
          {icon}
        </span>
        <span>{message}</span>
        <button
          onClick={onDismiss}
          className="ml-1 text-[#aec7f7] hover:text-white cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};

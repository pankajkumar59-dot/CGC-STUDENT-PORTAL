import React, { useState } from 'react';
import { TODAY_TIMETABLE } from '../data/portalData';

interface TimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const TimetableModal: React.FC<TimetableModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [selectedDay, setSelectedDay] = useState('THU');
  const [reminders, setReminders] = useState<Record<string, boolean>>({
    '11:00 AM': true,
  });

  if (!isOpen) return null;

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  const toggleReminder = (time: string, subject: string) => {
    const newState = !reminders[time];
    setReminders((prev) => ({ ...prev, [time]: newState }));
    onNotify(
      newState
        ? `Reminder set 10 mins before ${subject} (${time})`
        : `Reminder cleared for ${subject}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#002046] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#feae2c] text-[24px]">schedule</span>
            <div>
              <h3 className="text-sm font-bold text-white">Today's Class Schedule</h3>
              <p className="text-xs text-[#aec7f7]">B.Tech CSE Sem 4 (Sec B) • Block 3</p>
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

        {/* Day Picker */}
        <div className="px-4 pt-3 flex items-center gap-1.5 border-b border-[#e5eeff] pb-2 overflow-x-auto no-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDay === day
                  ? 'bg-[#1b365d] text-white shadow-sm'
                  : 'bg-[#e5eeff] text-[#44474e] hover:bg-[#dce9ff]'
              }`}
            >
              {day} {day === 'THU' ? '(Today)' : ''}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {TODAY_TIMETABLE.map((slot) => {
            const isCurrent = slot.status === 'current';
            const isCompleted = slot.status === 'completed';

            return (
              <div
                key={slot.time}
                className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-all ${
                  isCurrent
                    ? 'bg-[#ffddb4]/25 border-2 border-[#feae2c] shadow-sm'
                    : isCompleted
                    ? 'bg-[#eff4ff] border-[#e5eeff] opacity-65'
                    : 'bg-white border-[#e5eeff]'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={`text-xs font-bold mt-0.5 ${
                      isCurrent ? 'text-[#835500]' : 'text-[#74777f]'
                    }`}
                  >
                    {slot.time}
                  </span>

                  <div className="min-w-0">
                    {isCurrent && (
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#6b4500] bg-[#feae2c] px-2 py-0.2 rounded mb-1">
                        Happening Next
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded mb-1">
                        Completed
                      </span>
                    )}

                    <h4 className="font-bold text-xs text-[#002046] truncate mt-0.5">
                      {slot.subject}
                    </h4>
                    <p className="text-[11px] text-[#44474e] truncate">
                      {slot.room} • {slot.teacher}
                    </p>
                  </div>
                </div>

                {!isCompleted && (
                  <button
                    onClick={() => toggleReminder(slot.time, slot.subject)}
                    className={`p-2 rounded-lg text-xs flex items-center justify-center transition-colors cursor-pointer ${
                      reminders[slot.time]
                        ? 'bg-[#feae2c] text-[#6b4500]'
                        : 'bg-[#e5eeff] text-[#002046] hover:bg-[#dce9ff]'
                    }`}
                    title="Toggle Alert Notification"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {reminders[slot.time] ? 'notifications_active' : 'notification_add'}
                    </span>
                  </button>
                )}
              </div>
            );
          })}

          <button
            onClick={() => {
              onNotify('Timetable synced with device calendar');
              onClose();
            }}
            className="w-full py-2.5 mt-2 rounded-xl bg-[#002046] text-white text-xs font-bold hover:bg-[#1b365d] active:scale-95 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span>Sync with Google / Outlook Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

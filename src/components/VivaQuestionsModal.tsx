import React from 'react';

interface VivaQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskCopilot: (question: string) => void;
}

export const VivaQuestionsModal: React.FC<VivaQuestionsModalProps> = ({
  isOpen,
  onClose,
  onAskCopilot,
}) => {
  if (!isOpen) return null;

  const questions = [
    {
      q: '1. What are the three mandatory conditions to solve the critical-section problem?',
      a: 'Mutual Exclusion (only one process in critical section), Progress (selection of next process cannot be postponed indefinitely), and Bounded Waiting (limit on times other processes enter before request is granted).',
    },
    {
      q: "2. In Peterson's Algorithm, what is the role of the 'turn' variable versus 'flag[i]'?",
      a: "'flag[i] = true' indicates that process i wishes to enter the critical section. 'turn = j' graciously yields the right of way to process j if both express intent at the same time.",
    },
    {
      q: '3. What is the fundamental difference between a Binary Semaphore and a Counting Semaphore?',
      a: 'A binary semaphore value ranges strictly between 0 and 1 (acting as a mutex lock). A counting semaphore value can span across an unrestricted domain to control access to a pool of N identical resources.',
    },
    {
      q: "4. Why must wait(empty) precede wait(mutex) in the Bounded-Buffer Producer-Consumer code?",
      a: 'If a producer claims mutex first and finds the buffer full, it blocks holding the lock. The consumer can never access the buffer to consume items and signal empty, causing a permanent deadlock.',
    },
    {
      q: '5. How does TestAndSet instruction guarantee hardware-level atomicity?',
      a: 'It executes as an uninterruptible atomic CPU cycle: it reads the memory word value and simultaneously sets it to true, preventing any context switch midway.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 bg-[#1b365d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#feae2c] text-[#6b4500] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">quiz</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Top 5 OS Viva Questions</h3>
              <p className="text-xs text-[#87a0cd]">Unit 3: Synchronization &amp; Semaphores</p>
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

        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {questions.map((item, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-1.5"
            >
              <h4 className="text-xs font-bold text-[#002046]">{item.q}</h4>
              <p className="text-xs text-[#44474e] leading-relaxed">{item.a}</p>
              <button
                onClick={() => {
                  onClose();
                  onAskCopilot(`Explain viva question: ${item.q}`);
                }}
                className="text-[11px] font-bold text-[#835500] hover:underline self-start mt-1 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Ask Copilot for more depth</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

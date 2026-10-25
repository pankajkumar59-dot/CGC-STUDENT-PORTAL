import React, { useState, useEffect, useRef } from 'react';

interface CopilotViewProps {
  initialPrompt?: string;
  onClearPrompt?: () => void;
  onOpenCourseSelector?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text?: string;
  time: string;
  isInitialPeterson?: boolean;
}

export const CopilotView: React.FC<CopilotViewProps> = ({
  initialPrompt,
  onClearPrompt,
}) => {
  const [courseTrack, setCourseTrack] = useState('Operating Systems (Unit 3 - Process Sync)');
  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'user',
      text: "Explain Peterson's Algorithm in Operating Systems and is it important for CGC MST-1 exam?",
      time: '11:28 AM',
    },
    {
      id: 'm2',
      sender: 'ai',
      time: '11:28 AM',
      isInitialPeterson: true,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      handleUserSend(initialPrompt);
      if (onClearPrompt) onClearPrompt();
    }
  }, [initialPrompt]);

  const handleUserSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsThinking(true);

    setTimeout(() => {
      let aiResponseText = `Regarding **${text}**: In accordance with the PTU / CGC Autonomous curriculum for ${courseTrack}, this concept carries significant exam weightage (typically 5 to 10 marks in Section B). Make sure to draw clean state diagrams, state the base assumptions, and define variables accurately to ensure full marks.`;

      if (text.toLowerCase().includes('practice') || text.toLowerCase().includes('question')) {
        aiResponseText = `**PTU Model 10-Mark Practice Question:**\n\n"Define the critical section problem. State the three mandatory requirements that any solution must satisfy (Mutual Exclusion, Progress, Bounded Waiting). With pseudocode and shared memory variables, explain how Peterson's algorithm solves this for two processes."\n\n*Marking Scheme:* 2 Marks for Requirements, 4 Marks for Code/Logic, 4 Marks for Proof of Bounded Waiting.`;
      } else if (text.toLowerCase().includes('3 line') || text.toLowerCase().includes('summarize')) {
        aiResponseText = `**Peterson's Algorithm in 3 Lines:**\n1. It uses two shared variables: 'flag[2]' to express intent and 'turn' to yield priority.\n2. Mutual exclusion is preserved because no two processes can satisfy the busy-wait while condition simultaneously.\n3. Starvation and deadlock are prevented since 'turn' alternates strictly, assuring bounded waiting.`;
      } else if (text.toLowerCase().includes('c code') || text.toLowerCase().includes('implementation')) {
        aiResponseText = `\`\`\`c\n// Peterson's Algorithm in C (Process i & j)\nint turn;\nint flag[2] = {0, 0};\n\nvoid process(int i) {\n    int j = 1 - i;\n    flag[i] = 1;      // Process i wants to enter\n    turn = j;         // Yield turn to the other process\n    while (flag[j] && turn == j); // Busy wait\n\n    // --- CRITICAL SECTION ---\n    // shared data operations...\n\n    flag[i] = 0;      // Exit critical section\n    // --- REMAINDER SECTION ---\n}\n\`\`\``;
      } else if (text.toLowerCase().includes('banker')) {
        aiResponseText = `**Banker's Algorithm (Deadlock Avoidance):**\nRequires 4 core data structures: Available[m], Max[n][m], Allocation[n][m], and Need[n][m] where Need[i][j] = Max[i][j] - Allocation[i][j].\n\n*Safety Algorithm:* Set Work = Available and Finish[i] = false. Search for an index 'i' where Finish[i] == false and Need_i <= Work. If found, simulate resource return: Work = Work + Allocation_i; Finish[i] = true. If all Finish[i] == true, system is in a Safe State.`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 700);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserSend(inputMessage);
  };

  const tracks = [
    'Operating Systems (Unit 3 - Process Sync)',
    'Design & Analysis of Algorithms (Unit 2 - Greedy & DP)',
    'Database Management Systems (Unit 2 - Normalization)',
    'Discrete Mathematics (Unit 3 - Graph Theory)',
  ];

  const cycleTrack = () => {
    const currentIndex = tracks.indexOf(courseTrack);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCourseTrack(tracks[nextIndex]);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 pt-1 pb-16 gap-3">
      {/* Top Academic Context Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dce9ff] text-[#002046]">
            <span className="w-2 h-2 rounded-full bg-[#feae2c] animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wide">
              CGC Copilot Active • Grounded in B.Tech CSE Sem 4
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              aria-label="Start Live Voice Mode"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#feae2c] text-[#6b4500] text-xs font-bold shadow-sm hover:opacity-90 transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] animate-pulse">graphic_eq</span>
              <span>{isVoiceActive ? 'Voice Live' : 'Talk Live'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#002046] animate-ping"></span>
            </button>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'm1',
                    sender: 'user',
                    text: "Explain Peterson's Algorithm in Operating Systems and is it important for CGC MST-1 exam?",
                    time: '11:28 AM',
                  },
                  {
                    id: 'm2',
                    sender: 'ai',
                    time: '11:28 AM',
                    isInitialPeterson: true,
                  },
                ]);
              }}
              aria-label="Reset chat context"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5eeff] hover:bg-[#dce9ff] text-[#44474e] transition-colors cursor-pointer text-xs"
            >
              <span className="material-symbols-outlined text-[14px]">history</span>
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Active Course & Unit Selector */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] shadow-sm border border-[#dce9ff]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#1b365d] text-white flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">school</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#835500] uppercase font-bold truncate">
                Course Track
              </span>
              <span className="text-xs font-bold text-[#002046] truncate">{courseTrack}</span>
            </div>
          </div>

          <button
            onClick={cycleTrack}
            aria-label="Change active subject"
            className="flex items-center gap-0.5 px-2.5 py-1 rounded-lg bg-[#d3e4fe] text-[#002046] hover:bg-[#c4c6cf]/40 transition-colors flex-shrink-0 text-xs font-bold cursor-pointer"
          >
            <span>Change</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>
      </div>

      {/* Chat Stream Container */}
      <div className="flex flex-col gap-4 min-h-[300px]">
        {/* Timestamp Divider */}
        <div className="flex items-center justify-center my-0.5">
          <span className="px-3 py-0.5 rounded-full bg-[#dce9ff] text-[#44474e] text-[11px] font-semibold">
            Today • 11:28 AM • MST-1 Revision Mode
          </span>
        </div>

        {/* Dynamic Messages Stream */}
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex flex-col items-end gap-1 pl-8">
                <div className="flex items-end gap-2 max-w-full">
                  <div className="p-3.5 rounded-2xl rounded-br-sm bg-[#1b365d] text-white shadow-sm">
                    <p className="text-sm leading-relaxed text-white">{msg.text}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#feae2c] text-[#6b4500] flex items-center justify-center flex-shrink-0 mb-1">
                    <span className="text-[10px] font-bold">ME</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#74777f] px-1">{msg.time} • Read</span>
              </div>
            );
          }

          // Initial rich Peterson response (matches Image_19)
          if (msg.isInitialPeterson) {
            return (
              <div key={msg.id} className="flex flex-col items-start gap-1 pr-4">
                <div className="flex items-start gap-2 max-w-full">
                  <div className="w-7 h-7 rounded-lg bg-[#002046] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <span className="material-symbols-outlined text-[17px] text-[#feae2c]">
                      auto_awesome
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-2xl rounded-tl-sm bg-white border border-[#e5eeff] shadow-sm w-full">
                    {/* Copilot Headline & Intro */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#002046]">CGC Campus Copilot</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#dce9ff] text-[#002046] text-[10px] font-bold">
                          Verified
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-[#74777f]">
                        verified_user
                      </span>
                    </div>

                    <p className="text-sm text-[#0b1c30] leading-relaxed">
                      Here is <span className="font-bold text-[#002046]">Peterson's Solution</span> simplified: A classic software-based solution to the critical-section problem restricted to <em>two processes</em> alternating execution.
                    </p>

                    {/* Core Mechanics Subcard */}
                    <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
                      <span className="text-[11px] text-[#002046] font-bold uppercase tracking-wider">
                        Algorithmic Pillars
                      </span>
                      <div className="flex flex-col gap-2 text-xs text-[#0b1c30]">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#d6e3ff] text-[#001b3d] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                            1
                          </span>
                          <div>
                            <span className="font-bold text-[#002046]">Shared Memory Variables:</span> Uses{' '}
                            <code className="px-1.5 py-0.5 rounded bg-[#d3e4fe] text-[#002046] font-mono text-[11px]">
                              int turn
                            </code>{' '}
                            (whose turn to enter) and{' '}
                            <code className="px-1.5 py-0.5 rounded bg-[#d3e4fe] text-[#002046] font-mono text-[11px]">
                              boolean flag[2]
                            </code>{' '}
                            (process readiness).
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#d6e3ff] text-[#001b3d] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                            2
                          </span>
                          <div>
                            <span className="font-bold text-[#002046]">Mutual Exclusion Guaranteed:</span> Only one process enters the Critical Section at any instant.
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#d6e3ff] text-[#001b3d] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                            3
                          </span>
                          <div>
                            <span className="font-bold text-[#002046]">Progress &amp; Bounded Waiting:</span> No deadlock occurs; a process will not wait indefinitely to gain entry.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exam Probability Alert Card */}
                    <div className="p-3 rounded-xl bg-[#ffddb4] text-[#291800] border border-[#feae2c]/40 flex items-start gap-2.5 shadow-sm">
                      <span className="material-symbols-outlined text-[20px] text-[#835500] flex-shrink-0 mt-0.5">
                        hotel_class
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#835500]">
                            High Exam Probability (MST-1)
                          </span>
                          <span className="px-1.5 py-0.2 rounded-full bg-[#feae2c] text-[#6b4500] text-[10px] font-bold">
                            10 Marks
                          </span>
                        </div>
                        <p className="text-xs text-[#291800] leading-tight">
                          Repeated consecutively in PTU/CGC MST-1 question papers in <strong>2021, 2022, and 2023</strong>. Always draw the process flag diagram for full marks!
                        </p>
                      </div>
                    </div>

                    {/* Quick Follow-up Action Chips */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span className="text-[11px] text-[#44474e] font-semibold">Quick Follow-ups:</span>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => handleUserSend('Generate 10-mark Practice Question for Peterson Algorithm')}
                          className="px-3 py-1.5 rounded-full bg-[#e5eeff] hover:bg-[#dce9ff] text-[#002046] text-xs font-semibold transition-colors flex items-center gap-1 active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <span className="material-symbols-outlined text-[14px] text-[#835500]">quiz</span>
                          <span>Generate Practice Question</span>
                        </button>

                        <button
                          onClick={() => handleUserSend('Summarize Peterson Algorithm in 3 lines')}
                          className="px-3 py-1.5 rounded-full bg-[#e5eeff] hover:bg-[#dce9ff] text-[#002046] text-xs font-semibold transition-colors flex items-center gap-1 active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <span className="material-symbols-outlined text-[14px]">format_list_bulleted</span>
                          <span>Summarize in 3 lines</span>
                        </button>

                        <button
                          onClick={() => handleUserSend('Give C code implementation of Peterson Algorithm')}
                          className="px-3 py-1.5 rounded-full bg-[#e5eeff] hover:bg-[#dce9ff] text-[#002046] text-xs font-semibold transition-colors flex items-center gap-1 active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <span className="material-symbols-outlined text-[14px]">terminal</span>
                          <span>Give C code implementation</span>
                        </button>
                      </div>
                    </div>

                    {/* Reaction & Citation Footer */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <div className="flex items-center gap-2 text-[#74777f]">
                        <button className="p-1 rounded hover:text-[#002046] cursor-pointer" title="Helpful">
                          <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                        </button>
                        <button className="p-1 rounded hover:text-[#002046] cursor-pointer" title="Needs correction">
                          <span className="material-symbols-outlined text-[16px]">thumb_down</span>
                        </button>
                        <button className="p-1 rounded hover:text-[#002046] cursor-pointer" title="Copy text">
                          <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        </button>
                      </div>
                      <span className="text-[11px] text-[#74777f]">Ref: Galvin OS (9th Ed.) Ch. 5</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Subsequent AI Responses
          return (
            <div key={msg.id} className="flex flex-col items-start gap-1 pr-4 animate-fadeIn">
              <div className="flex items-start gap-2 max-w-full">
                <div className="w-7 h-7 rounded-lg bg-[#002046] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[17px] text-[#feae2c]">auto_awesome</span>
                </div>
                <div className="flex flex-col gap-2 p-3.5 rounded-2xl rounded-tl-sm bg-white border border-[#e5eeff] shadow-sm w-full text-xs text-[#0b1c30] leading-relaxed">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#002046]">CGC Academic Assistant</span>
                    <span className="text-[10px] text-[#74777f]">{msg.time}</span>
                  </div>
                  <div className="whitespace-pre-line text-xs font-normal text-[#0b1c30]">
                    {msg.text}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isThinking && (
          <div className="flex items-start gap-2 max-w-[90%]">
            <div className="w-7 h-7 rounded-full bg-[#002046] flex items-center justify-center text-[#feae2c] flex-shrink-0">
              <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#e5eeff] text-xs text-[#002046] italic">
              CGC Copilot is referencing IKGPTU coursepacks &amp; lecture handouts...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Live Voice Session Card (matches Image_19) */}
      {isVoiceActive && (
        <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-gradient-to-r from-[#1b365d] to-[#002046] text-white shadow-md border border-[#feae2c]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#feae2c] text-[#6b4500] flex items-center justify-center flex-shrink-0 animate-pulse">
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">Live Voice Session</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#835500] text-[9px] text-white font-bold uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <span className="text-[11px] text-[#87a0cd] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#feae2c] animate-ping"></span>
                  Listening in English &amp; Hinglish...
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsVoiceActive(false)}
                aria-label="Interrupt speech"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#feae2c]">pause_circle</span>
                <span>Interrupt</span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label="Mute microphone"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  isMuted ? 'bg-[#ba1a1a] text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isMuted ? 'mic_off' : 'mic'}
                </span>
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-between gap-3 border border-white/10">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="material-symbols-outlined text-[16px] text-[#feae2c] flex-shrink-0">
                record_voice_over
              </span>
              <p className="text-xs text-white truncate italic font-medium">
                "Sir, Peterson's algorithm mein race condition kaise avoid hoti hai...?"
              </p>
            </div>

            {/* Live Audio Visualizer bars */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <span className="w-1 bg-[#feae2c] rounded-full voice-bar"></span>
              <span className="w-1 bg-[#ffddb4] rounded-full voice-bar"></span>
              <span className="w-1 bg-[#feae2c] rounded-full voice-bar"></span>
              <span className="w-1 bg-white rounded-full voice-bar"></span>
              <span className="w-1 bg-[#ffddb4] rounded-full voice-bar"></span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#87a0cd] px-0.5">
            <span>AI Copilot speaking with natural academic voice</span>
            <span className="text-[#ffddb4] font-semibold">Tap mic below to pause</span>
          </div>
        </div>
      )}

      {/* Prompt Suggestion Carousel Section */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#835500]">bolt</span>
            <span className="text-[11px] text-[#002046] uppercase font-bold tracking-wider">
              Curriculum Fast Prompts
            </span>
          </div>
          <span className="text-[11px] text-[#44474e]">Swipe to explore</span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
          {/* Prompt 1 */}
          <div
            onClick={() => handleUserSend("Explain Banker's Algorithm with a step-by-step allocation example")}
            className="flex-shrink-0 w-64 p-3 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] shadow-sm cursor-pointer transition-all flex flex-col justify-between gap-2 active:scale-95"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#ffddb4] text-[#291800] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[14px]">calculate</span>
              </div>
              <span className="text-xs text-[#835500] font-bold">OS Unit 4</span>
            </div>
            <p className="text-xs text-[#0b1c30] line-clamp-2">
              Explain Banker's Algorithm with a step-by-step allocation example
            </p>
            <span className="text-xs text-[#002046] font-bold flex items-center gap-0.5">
              Ask this <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </span>
          </div>

          {/* Prompt 2 */}
          <div
            onClick={() => handleUserSend('Summarize Unit 2 DAA in 5 key takeaways for CGC examinations')}
            className="flex-shrink-0 w-64 p-3 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] shadow-sm cursor-pointer transition-all flex flex-col justify-between gap-2 active:scale-95"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#d6e3ff] text-[#001b3d] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[14px]">account_tree</span>
              </div>
              <span className="text-xs text-[#002046] font-bold">DAA Sem 4</span>
            </div>
            <p className="text-xs text-[#0b1c30] line-clamp-2">
              Summarize Unit 2 DAA in 5 high-yield exam takeaways
            </p>
            <span className="text-xs text-[#002046] font-bold flex items-center gap-0.5">
              Ask this <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </span>
          </div>

          {/* Prompt 3 */}
          <div
            onClick={() => handleUserSend('Show top 5 most repeated 2-mark questions in DBMS CGC PTU exams')}
            className="flex-shrink-0 w-64 p-3 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] shadow-sm cursor-pointer transition-all flex flex-col justify-between gap-2 active:scale-95"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#d3e4fe] text-[#0b1c30] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[14px]">database</span>
              </div>
              <span className="text-xs text-[#44474e] font-bold">DBMS Sem 4</span>
            </div>
            <p className="text-xs text-[#0b1c30] line-clamp-2">
              Show 5 most repeated 2-mark short questions in DBMS
            </p>
            <span className="text-xs text-[#002046] font-bold flex items-center gap-0.5">
              Ask this <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Input Bar */}
      <div className="sticky bottom-16 bg-[#f8f9ff]/95 backdrop-blur-md pt-2 pb-1 shadow-[0_-4px_12px_rgba(27,54,93,0.05)]">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs">
            <button
              onClick={() => setIsVoiceActive(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d6e3ff] text-[#002046] text-[11px] font-bold flex-shrink-0 shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px] text-[#835500]">mic</span>
              <span>🎙️ Hold to Speak with Copilot</span>
            </button>

            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#002046] text-[11px] font-medium flex-shrink-0">
              <span className="material-symbols-outlined text-[13px]">translate</span>
              <span>Hinglish voice supported</span>
            </span>

            <span className="text-[10px] text-[#74777f] flex-shrink-0">Latency &lt;280ms</span>
          </div>

          <form onSubmit={handleFormSubmit} className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-white border border-[#e5eeff] shadow-sm">
            <button
              type="button"
              aria-label="Upload document or photo"
              title="Upload question paper page or notebook photo"
              className="w-8 h-8 rounded-full text-[#44474e] hover:text-[#002046] hover:bg-[#eff4ff] transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask any question from syllabus or notes..."
              className="flex-1 bg-transparent border-0 outline-none text-[#0b1c30] placeholder:text-[#74777f] text-xs min-w-0"
            />

            <button
              type="button"
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              aria-label="Interactive Voice Agent"
              className="relative w-9 h-9 rounded-full bg-[#feae2c] text-[#6b4500] hover:bg-[#ffddb4] transition-all flex items-center justify-center flex-shrink-0 shadow-sm ring-2 ring-[#feae2c]/40 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#002046] ring-1 ring-white animate-ping"></span>
            </button>

            <button
              type="submit"
              aria-label="Send academic query"
              className="w-10 h-10 rounded-xl bg-[#1b365d] hover:bg-[#002046] text-white transition-all flex items-center justify-center flex-shrink-0 shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>

          <div className="flex items-center justify-between px-2 text-[10px]">
            <span className="text-[#74777f]">
              Trained on official IKGPTU &amp; CGC Mohali Academic Coursepacks
            </span>
            <span className="text-[#835500] font-bold">AI Copilot v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

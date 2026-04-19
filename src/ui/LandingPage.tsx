import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExamConfig } from '../engine/examEngine';

interface LandingPageProps {
  localConfig: ExamConfig;
  setLocalConfig: React.Dispatch<React.SetStateAction<ExamConfig>>;
  onStartExam: () => void;
  onStudyMode: () => void;
  onQuickReview: () => void;
}

const SUBJECTS = [
  { key: 'Language Proficiency', label: 'Language Proficiency' },
  { key: 'Science', label: 'Science' },
  { key: 'Mathematics', label: 'Mathematics' },
  { key: 'Reading Comprehension', label: 'Reading Comprehension' },
] as const;

const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export function LandingPage({
  localConfig,
  setLocalConfig,
  onStartExam,
  onStudyMode,
  onQuickReview,
}: LandingPageProps) {
  const customHours = Math.floor((localConfig.customTimeLimit || 0) / 3600);
  const customMinutes = Math.floor(((localConfig.customTimeLimit || 0) % 3600) / 60);
  const customSeconds = (localConfig.customTimeLimit || 0) % 60;
  const hasCustomTime = localConfig.customTimeLimit !== null && localConfig.customTimeLimit > 0;

  const updateTime = (h: number, m: number, s: number) => {
    const total = h * 3600 + m * 60 + s;
    setLocalConfig(prev => ({ ...prev, customTimeLimit: total > 0 ? total : null }));
  };

  return (
    <div
      className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center font-serif text-black p-4 py-8 overflow-y-auto"
    >
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white shadow-2xl shadow-black/50 overflow-hidden"
          style={{ backgroundImage: paperTexture, backgroundSize: '200px 200px' }}
        >
          {/* Main Card Content */}
          <div className="border-2 border-black h-full flex flex-col">
            <div className="bg-black text-white px-5 py-3 flex items-center justify-between shrink-0">
              <h1 className="text-lg font-black uppercase tracking-[0.15em]">
                CET Simulator
              </h1>
              <span className="text-[9px] uppercase tracking-widest opacity-60">
                College Entrance Test
              </span>
            </div>

            <div className="px-5 py-3 border-b border-black/10 shrink-0">
              <p className="text-[10px] leading-relaxed opacity-60">
                INSTRUCTIONS: This examination consists of multiple timed sections.
                Configure your session parameters below. Shade your answers completely
                on the provided answer sheet. Any form of cheating will result in
                immediate disqualification.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Section A: Timer */}
              <div className="px-5 pt-4 pb-4 border-b border-black/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                    A. Section Timer
                  </span>
                  {hasCustomTime && (
                    <button
                      onClick={() => setLocalConfig(prev => ({ ...prev, customTimeLimit: null }))}
                      className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 border border-black/20 hover:border-black transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 py-3 border border-black/10 bg-gray-50/50">
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => updateTime(Math.min(99, customHours + 1), customMinutes, customSeconds)}
                      className="w-6 h-4 flex items-center justify-center text-[8px] border border-black/20 hover:bg-black hover:text-white transition-colors"
                    >
                      ▲
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center text-xl font-black border-x border-black/10 tabular-nums"
                      style={{ fontFamily: 'serif' }}
                    >
                      {customHours.toString().padStart(2, '0')}
                    </div>
                    <button
                      onClick={() => updateTime(Math.max(0, customHours - 1), customMinutes, customSeconds)}
                      className="w-6 h-4 flex items-center justify-center text-[8px] border border-black/20 hover:bg-black hover:text-white transition-colors"
                    >
                      ▼
                    </button>
                    <span className="text-[7px] font-bold uppercase tracking-widest opacity-30 mt-1">Hr</span>
                  </div>

                  <span className="text-xl font-black opacity-30 -mt-5">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => updateTime(customHours, (customMinutes + 1) % 60, customSeconds)}
                      className="w-6 h-4 flex items-center justify-center text-[8px] border border-black/20 hover:bg-black hover:text-white transition-colors"
                    >
                      ▲
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center text-xl font-black border-x border-black/10 tabular-nums"
                      style={{ fontFamily: 'serif' }}
                    >
                      {customMinutes.toString().padStart(2, '0')}
                    </div>
                    <button
                      onClick={() => updateTime(customHours, (customMinutes + 59) % 60, customSeconds)}
                      className="w-6 h-4 flex items-center justify-center text-[8px] border border-black/20 hover:bg-black hover:text-white transition-colors"
                    >
                      ▼
                    </button>
                    <span className="text-[7px] font-bold uppercase tracking-widest opacity-30 mt-1">Min</span>
                  </div>

                  <span className="text-xl font-black opacity-30 -mt-5">:</span>

                  {/* Seconds */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => updateTime(customHours, customMinutes, (customSeconds + 1) % 60)}
                      className="w-6 h-4 flex items-center justify-center text-[8px] border border-black/20 hover:bg-black hover:text-white transition-colors"
                    >
                      ▲
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center text-xl font-black border-x border-black/10 tabular-nums"
                      style={{ fontFamily: 'serif' }}
                    >
                      {customSeconds.toString().padStart(2, '0')}
                    </div>
                    <button
                      onClick={() => updateTime(customHours, customMinutes, (customSeconds + 59) % 60)}
                      className="w-6 h-4 flex items-center justify-center text-[8px] border border-black/20 hover:bg-black hover:text-white transition-colors"
                    >
                      ▼
                    </button>
                    <span className="text-[7px] font-bold uppercase tracking-widest opacity-30 mt-1">Sec</span>
                  </div>
                </div>

                <p className="text-[9px] text-center mt-2 opacity-40 italic">
                  {hasCustomTime
                    ? `Custom override: ${customHours > 0 ? `${customHours}h ` : ''}${customMinutes}m ${customSeconds > 0 ? `${customSeconds}s` : ''} per section`
                    : 'Standard per-section time limits apply'}
                </p>
              </div>

              {/* Section B: Question Quota */}
              <div className="px-5 pt-4 pb-4 border-b border-black/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                    B. Question Quota
                  </span>
                  {!SUBJECTS.every(s => localConfig.subjectLimits[s.key] === null) && (
                    <button
                      onClick={() => {
                        setLocalConfig(prev => ({
                          ...prev,
                          subjectLimits: Object.fromEntries(SUBJECTS.map(s => [s.key, null])),
                        }));
                      }}
                      className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 border border-black/20 hover:border-black transition-colors"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                <div className="space-y-0 border border-black/15">
                  {SUBJECTS.map((subj, i) => {
                    const limit = localConfig.subjectLimits[subj.key];
                    const isFull = limit === null;
                    return (
                      <div
                        key={subj.key}
                        className={`flex items-center justify-between px-3 py-1.5 ${i < SUBJECTS.length - 1 ? 'border-b border-black/10' : ''
                          }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[9px] font-bold w-4 text-right opacity-40">
                            {i + 1}.
                          </span>
                          <span className="text-[10px] font-bold truncate">{subj.label}</span>
                        </div>

                        <div className="flex items-center border border-black/20 shrink-0">
                          <button
                            onClick={() => setLocalConfig(prev => ({
                              ...prev,
                              subjectLimits: {
                                ...prev.subjectLimits,
                                [subj.key]: Math.max(0, (prev.subjectLimits[subj.key] || 10) - 5),
                              },
                            }))}
                            className="w-5 h-5 flex items-center justify-center text-[9px] hover:bg-black hover:text-white transition-colors border-r border-black/10"
                          >
                            −
                          </button>
                          <div className="w-8 h-5 flex items-center justify-center text-[9px] font-black tabular-nums border-r border-black/10">
                            {isFull ? 'Full' : limit}
                          </div>
                          <button
                            onClick={() => setLocalConfig(prev => ({
                              ...prev,
                              subjectLimits: {
                                ...prev.subjectLimits,
                                [subj.key]: (prev.subjectLimits[subj.key] || 0) + 5,
                              },
                            }))}
                            className="w-5 h-5 flex items-center justify-center text-[9px] hover:bg-black hover:text-white transition-colors border-r border-black/10"
                          >
                            +
                          </button>
                          <button
                            onClick={() => setLocalConfig(prev => ({
                              ...prev,
                              subjectLimits: {
                                ...prev.subjectLimits,
                                [subj.key]: isFull ? 10 : null,
                              },
                            }))}
                            className={`w-6 h-5 flex items-center justify-center text-[7px] font-black uppercase transition-colors ${isFull ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
                              }`}
                          >
                            All
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="p-5 pt-3 bg-gray-50/50 shrink-0 border-t border-black/5">
              <button
                onClick={onStartExam}
                className="w-full bg-black text-white px-6 py-3.5 font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors text-sm mb-3 active:translate-y-0.5"
              >
                Begin Full Simulation
              </button>

              <div className="flex gap-2">
                <button
                  onClick={onQuickReview}
                  className="flex-1 border border-black/20 px-3 py-2 text-[9px] font-bold uppercase tracking-widest hover:border-black transition-colors"
                >
                  Quick Review
                </button>
                <button
                  onClick={onStudyMode}
                  className="flex-1 border border-black/20 px-3 py-2 text-[9px] font-bold uppercase tracking-widest hover:border-black transition-colors"
                >
                  Study Mode
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-[9px] text-center opacity-30 uppercase tracking-widest text-white/50">
          Do not turn the page until instructed to do so.
        </p>
      </div>
    </div>
  );
}

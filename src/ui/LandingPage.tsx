import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExamConfig } from '../engine/examEngine';

interface LandingPageProps {
  localConfig: ExamConfig;
  setLocalConfig: React.Dispatch<React.SetStateAction<ExamConfig>>;
  onStartExam: () => void;
  onStudyMode: () => void;
  onQuickReview: () => void;
}

const SUBJECTS = [
  { key: 'Language Proficiency', label: 'Language' },
  { key: 'Science', label: 'Science' },
  { key: 'Mathematics', label: 'Math' },
  { key: 'Reading Comprehension', label: 'Reading' },
] as const;

const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export function LandingPage({
  localConfig,
  setLocalConfig,
  onStartExam,
  onStudyMode,
  onQuickReview,
}: LandingPageProps) {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-neutral-950 flex flex-col items-center justify-center font-sans text-white p-6 overflow-y-auto">
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-3">
            CET<span className="text-white/20">SIM</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold">College Entrance Test Prep</p>
        </motion.div>

        {/* Main Actions Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full space-y-3 mb-10"
        >
          <button
            onClick={onStartExam}
            className="w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors active:scale-[0.98] text-sm"
          >
            Begin Simulation
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onQuickReview}
              className="border border-white/10 bg-white/5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-colors active:scale-[0.96]"
            >
              Quick Review
            </button>
            <button
              onClick={onStudyMode}
              className="relative border border-white/10 bg-white/5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-colors active:scale-[0.96]"
            >
              Study Mode
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[7px] px-1 font-black shadow-sm">WIP</span>
            </button>
          </div>
        </motion.div>

        {/* Configuration Section */}
        <div className="w-full">
          <button
            onClick={() => setIsConfigOpen(!isConfigOpen)}
            className="text-[9px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
          >
            {isConfigOpen ? '[ Hide Settings ]' : '[ Customize Session ]'}
          </button>

          <AnimatePresence>
            {isConfigOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 border border-white/10 bg-white/5 p-6 text-left relative backdrop-blur-sm">
                  <div className="space-y-5">
                    {/* Timer Option */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest opacity-60">Timer</label>
                      <select
                        value={localConfig.customTimeLimit || ''}
                        onChange={(e) => setLocalConfig(prev => ({ ...prev, customTimeLimit: e.target.value ? Number(e.target.value) : null }))}
                        className="bg-transparent text-[10px] font-bold focus:outline-none text-right cursor-pointer"
                      >
                        <option value="" className="bg-neutral-900">Standard (60m)</option>
                        <option value="900" className="bg-neutral-900">15m / Sec</option>
                        <option value="1800" className="bg-neutral-900">30m / Sec</option>
                        <option value="3600" className="bg-neutral-900">60m / Sec</option>
                        <option value="1" className="bg-neutral-900">Untimed</option>
                      </select>
                    </div>

                    {/* Question Limits */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {SUBJECTS.map((subj) => (
                        <div key={subj.key} className="flex items-center justify-between border-b border-white/10 pb-1">
                          <label className="text-[8px] font-bold uppercase opacity-40">{subj.label}</label>
                          <select
                            value={localConfig.subjectLimits[subj.key] === null ? '' : localConfig.subjectLimits[subj.key]}
                            onChange={(e) => setLocalConfig(prev => ({
                              ...prev,
                              subjectLimits: { ...prev.subjectLimits, [subj.key]: e.target.value ? Number(e.target.value) : null }
                            }))}
                            className="bg-transparent text-[10px] font-bold focus:outline-none text-right cursor-pointer"
                          >
                            <option value="" className="bg-neutral-900">Full</option>
                            <option value="5" className="bg-neutral-900">5</option>
                            <option value="10" className="bg-neutral-900">10</option>
                            <option value="25" className="bg-neutral-900">25</option>
                          </select>
                        </div>
                      ))}
                    </div>

                    {/* Scoring Logic */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Right-Minus-Wrong</span>
                        <span className="text-[7px] opacity-30 italic leading-none mt-0.5">UPCAT Standard</span>
                      </div>
                      <button 
                        onClick={() => setLocalConfig(prev => ({ ...prev, rightMinusWrong: !prev.rightMinusWrong }))}
                        className={`w-4 h-4 border border-white/30 flex items-center justify-center transition-all ${localConfig.rightMinusWrong ? 'bg-white' : 'bg-transparent'}`}
                      >
                        {localConfig.rightMinusWrong && <div className="w-2 h-2 bg-black" />}
                      </button>
                    </div>

                    {/* Quick Feedback */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Quick Feedback</span>
                        <span className="text-[7px] opacity-30 italic leading-none mt-0.5">Show correct answer after each item</span>
                      </div>
                      <button 
                        onClick={() => setLocalConfig(prev => ({ ...prev, quickFeedback: !prev.quickFeedback }))}
                        className={`w-4 h-4 border border-white/30 flex items-center justify-center transition-all ${localConfig.quickFeedback ? 'bg-white' : 'bg-transparent'}`}
                      >
                        {localConfig.quickFeedback && <div className="w-2 h-2 bg-black" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="mt-10 opacity-10 pointer-events-none">
          <p className="text-[7px] uppercase tracking-[0.4em] font-bold">Proprietary Assessment Engine</p>
        </div>
      </div>
    </div>
  );
}

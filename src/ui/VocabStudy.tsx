import React, { useState, useMemo, useEffect } from 'react';
import vocabData from '../data/english-vocab.json';
import { motion, AnimatePresence } from 'motion/react';
import { VocabWord } from '../types/vocab';
import { useVocabSR } from '../hooks/useVocabSR';
import { VocabFlashcard, VocabDetail } from './VocabCard';

const words = vocabData as VocabWord[];

export const VocabStudy: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState<VocabWord | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'flashcards' | 'daily'>('daily');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const { srTimestamp, updateSR, loadSRData } = useVocabSR();

  const randomizedWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, []);

  const filteredWords = useMemo(() => {
    return words.filter(w => 
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const dailyWords = useMemo(() => {
    if (!words || words.length === 0) return [];
    
    const srData = loadSRData();
    const nowTs = Date.now();
    
    const dueWords = words.filter(w => {
        const metrics = srData[w.word];
        return metrics && metrics.nextReview <= nowTs;
    });

    const newWords = words.filter(w => !srData[w.word]);

    const dt = new Date();
    const dateSeed = parseInt(`${dt.getFullYear()}${dt.getMonth() + 1}${dt.getDate()}`, 10);
    
    const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    const shuffledNew = [...newWords];
    let m = shuffledNew.length;
    let currSeed = dateSeed;
    while (m > 0) {
      const i = Math.floor(seededRandom(currSeed++) * m--);
      [shuffledNew[m], shuffledNew[i]] = [shuffledNew[i], shuffledNew[m]];
    }

    return [...dueWords, ...shuffledNew].slice(0, Math.max(5, dueWords.length));
  }, [srTimestamp]);

  // Keyboard navigation for flashcards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === 'flashcards' && randomizedWords.length > 0) {
        if (e.key === 'ArrowLeft') {
          setFlashcardIndex(prev => (prev > 0 ? prev - 1 : randomizedWords.length - 1));
        } else if (e.key === 'ArrowRight') {
          setFlashcardIndex(prev => (prev < randomizedWords.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, randomizedWords, flashcardIndex]);

  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <div className="h-screen flex flex-col bg-[#fafaf8] font-sans text-neutral-800"
      style={{ backgroundImage: paperTexture, backgroundSize: '150px 150px' }}
    >
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-neutral-200 z-30 sticky top-0">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest text-neutral-900 leading-none mb-1">Study Mode</h2>
          <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-[0.2em]">{words.length} Vocabulary Items</p>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="flex bg-neutral-100 rounded-lg p-1 mr-4">
                <button 
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                    List
                </button>
                <button 
                    onClick={() => setViewMode('daily')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'daily' ? 'bg-white text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                    Daily
                </button>
                <button 
                    onClick={() => setViewMode('flashcards')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'flashcards' ? 'bg-white text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                    Flashcards
                </button>
            </div>
            <button 
                onClick={onExit}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors"
                title="Exit to Exam"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {viewMode === 'list' || viewMode === 'daily' ? (
            <motion.div 
                key="list-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col p-6 md:p-8"
            >
                <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
                    <div className={`relative mb-8 group transition-all duration-500 ${viewMode === 'daily' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-indigo-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input 
                            type="text"
                            placeholder="Find a word or concept..."
                            className="w-full bg-white border-2 border-neutral-100 focus:border-indigo-400 p-4 pl-12 rounded-2xl outline-none transition-all text-neutral-700 font-medium placeholder:text-neutral-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {viewMode === 'daily' && (
                        <div className="mb-8 p-6 bg-indigo-600 rounded-3xl text-white relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" /></svg>
                           </div>
                           <h3 className="text-2xl font-black mb-1 uppercase tracking-tight">Today's Focus Set</h3>
                           <p className="text-xs text-indigo-100 font-medium opacity-80 mb-4">Your personalized review and study set for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.</p>
                           <div className="flex gap-1">
                                {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"></div>)}
                           </div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                            {(viewMode === 'daily' ? dailyWords : filteredWords).map((w, idx) => (
                                <motion.div 
                                    key={w.word}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                                    className="bg-white p-5 rounded-2xl border border-neutral-100 hover:border-indigo-200 cursor-pointer transition-all group relative overflow-hidden"
                                    onClick={() => setSelectedWord(w)}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{w.word}</h3>
                                        <div className="w-2 h-2 rounded-full bg-indigo-400 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 italic font-medium">
                                        {w.definition}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {w.synonyms.slice(0, 2).map(s => (
                                            <span key={s} className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-1.5 py-0.5 rounded-md uppercase">{s}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {selectedWord && (
                        <VocabDetail 
                            vocab={selectedWord} 
                            onClose={() => setSelectedWord(null)} 
                            onAction={(known) => {
                                updateSR(selectedWord.word, known);
                                setSelectedWord(null);
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
                key="flashcard-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col items-center justify-center p-6 bg-indigo-50/30"
            >
                <div className="max-w-xl w-full flex flex-col items-center">
                    <VocabFlashcard 
                        vocab={randomizedWords[flashcardIndex]}
                        onAction={(known) => {
                            updateSR(randomizedWords[flashcardIndex].word, known);
                            setFlashcardIndex(prev => (prev < randomizedWords.length - 1 ? prev + 1 : 0));
                        }}
                    />

                    <div className="mt-12 flex items-center gap-8">
                        <button 
                            onClick={() => setFlashcardIndex(prev => (prev > 0 ? prev - 1 : randomizedWords.length - 1))}
                            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-neutral-200 text-neutral-400 hover:text-indigo-600 hover:border-indigo-200 transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        
                        <div className="flex flex-col items-center">
                            <span className="text-lg font-black text-neutral-900">{flashcardIndex + 1}</span>
                            <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">of {randomizedWords.length}</span>
                        </div>

                        <button 
                            onClick={() => setFlashcardIndex(prev => (prev < randomizedWords.length - 1 ? prev + 1 : 0))}
                            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-neutral-200 text-neutral-400 hover:text-indigo-600 hover:border-indigo-200 transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>

                    <div className="mt-12 flex items-center gap-4 bg-white/50 px-6 py-3 rounded-2xl border border-white">
                        <div className="flex gap-2">
                             <kbd className="px-2 py-1 bg-white rounded border border-neutral-200 text-[9px] font-bold">SPACE</kbd>
                             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest self-center">Flip</span>
                        </div>
                        <div className="w-px h-3 bg-neutral-200"></div>
                        <div className="flex gap-2">
                             <kbd className="px-2 py-1 bg-white rounded border border-neutral-200 text-[9px] font-bold">Arrows</kbd>
                             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest self-center">Navigate</span>
                        </div>
                    </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

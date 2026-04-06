import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import vocabData from '../data/english-vocab.json';
import topicsData from '../data/topics.json';
import { VocabWord } from '../types/vocab';
import { Lesson, TopicsData } from '../types/lesson';
import { useVocabSR } from '../hooks/useVocabSR';
import { VocabFlashcard, VocabDetail } from './VocabCard';
import { LessonView } from './LessonView';
import { getDailySeed, selectDailyTopics, selectDailyVocab } from '../lib/dailyUtils';
import { lessonRegistry } from '../data/lessonRegistry';

const words = vocabData as VocabWord[];

type ViewMode = 'daily' | 'list' | 'flashcards';

const fadeTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15, ease: "linear" }
};

const SUBJECT_COLORS: Record<string, string> = {
    Mathematics: '#0EA5E9',              // soft red
    Science: '#8B5CF6',                  // soft orange
    'Reading Comprehension': '#F43F5E',  // soft yellow
    'Language Proficiency': '#F59E0B',   // soft pink
};

// Map accessible dark versions for when these colors are used on white backgrounds
const SUBJECT_TEXT_COLORS: Record<string, string> = {
    Mathematics: '#0EA5E9',              // soft red
    Science: '#8B5CF6',                  // soft orange
    'Reading Comprehension': '#F43F5E',  // soft yellow
    'Language Proficiency': '#F59E0B',   // soft pink
};

export const DailyStudy: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWord, setSelectedWord] = useState<VocabWord | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('daily');
    const [flashcardIndex, setFlashcardIndex] = useState(0);
    const [heroIndex, setHeroIndex] = useState(0);

    const { srTimestamp, updateSR } = useVocabSR();
    const dailySeed = useMemo(() => getDailySeed(), []);

    const dailyContent = useMemo(() => {
        const selectedVocab = selectDailyVocab(dailySeed, words, 8);
        const availableTopicIds = Object.keys(lessonRegistry).map(Number);
        const selectedTopics = selectDailyTopics(dailySeed, topicsData as TopicsData, availableTopicIds);

        const selectedLessons = selectedTopics
            .map(t => lessonRegistry[t.topic.id])
            .filter(Boolean) as Lesson[];

        return { vocab: selectedVocab, lessons: selectedLessons };
    }, [dailySeed, srTimestamp]);

    const filteredWords = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return words.filter(w =>
            w.word.toLowerCase().includes(term) ||
            w.definition.toLowerCase().includes(term)
        );
    }, [searchTerm]);

    const currentDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

    const NavIcon = ({ mode }: { mode: ViewMode }) => {
        if (mode === 'daily') return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        );
        if (mode === 'list') return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        );
        return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        );
    };

    const navLabels: Record<ViewMode, string> = {
        daily: 'Daily',
        list: 'Glossary',
        flashcards: 'Flashcards',
    };

    return (
        <div className="h-[100dvh] w-full flex flex-col font-sans text-slate-800 overflow-hidden subpixel-antialiased" style={{ background: '#F7F8FA' }}>

            {/* Header */}
            <header className="px-5 md:px-8 py-4 flex justify-between items-center shrink-0 z-30 border-b" style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}>
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold tracking-tight text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Daily Study</h2>
                    <span className="text-xs text-slate-400 mt-0.5">{currentDate}</span>
                </div>

                {/* Desktop tabs */}
                <div className="hidden md:flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                    {(['daily', 'list', 'flashcards'] as ViewMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => {
                                setViewMode(mode);
                                if (mode === 'flashcards') setFlashcardIndex(0);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === mode
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {navLabels[mode]}
                        </button>
                    ))}
                </div>

                <button
                    onClick={onExit}
                    className="w-9 h-9 flex shrink-0 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </header>

            <main className="flex-1 relative overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">

                    {/* DAILY VIEW */}
                    {viewMode === 'daily' && (
                        <motion.div
                            key="daily-view"
                            initial={fadeTransition.initial}
                            animate={fadeTransition.animate}
                            exit={fadeTransition.exit}
                            className="absolute inset-0 flex flex-col overflow-y-auto no-scrollbar"
                        >
                            {/* Vocab Hero Section */}
                            <section className="w-full" style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
                                {/* Section label + dots */}
                                <div className="px-5 md:px-8 pt-6 pb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Vocabulary</span>
                                        <span className="text-xs text-slate-300">·</span>
                                        <span className="text-xs text-slate-400">{heroIndex + 1} of {dailyContent.vocab.length}</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {dailyContent.vocab.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setHeroIndex(i)}
                                                className="h-1.5 rounded-full transition-all outline-none"
                                                style={{
                                                    width: heroIndex === i ? '2rem' : '0.5rem',
                                                    background: heroIndex === i ? '#F57799' : '#E5E7EB'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Vocab card body */}
                                <div className="px-5 md:px-8 pb-8">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={heroIndex}
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -20, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="grid lg:grid-cols-2 gap-6 lg:gap-10 max-w-5xl"
                                        >
                                            {/* Word + Definition */}
                                            <div className="flex flex-col justify-center gap-4">
                                                <div>
                                                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                        {dailyContent.vocab[heroIndex].word}
                                                    </h1>
                                                    <div className="mt-2 h-0.5 w-12 rounded-full" style={{ background: '#F57799' }} />
                                                </div>
                                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                                    {dailyContent.vocab[heroIndex].definition}
                                                </p>
                                            </div>

                                            {/* Sample sentence + actions */}
                                            <div className="rounded-xl p-5 md:p-6 flex flex-col gap-4" style={{ background: '#F7F8FA', border: '1px solid #E5E7EB' }}>
                                                <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Example</p>
                                                <p className="text-base md:text-lg text-slate-700 italic leading-relaxed flex-1">
                                                    "{dailyContent.vocab[heroIndex].sample_sentence}"
                                                </p>
                                                <div className="flex gap-3 pt-2 border-t" style={{ borderColor: '#E5E7EB' }}>
                                                    <button
                                                        onClick={() => setSelectedWord(dailyContent.vocab[heroIndex])}
                                                        className="flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors text-slate-600 hover:text-slate-900 hover:bg-white border"
                                                        style={{ borderColor: '#E5E7EB' }}
                                                    >
                                                        Details
                                                    </button>
                                                    <button
                                                        onClick={() => setHeroIndex(prev => (prev + 1) % dailyContent.vocab.length)}
                                                        className="flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors text-white flex items-center justify-center gap-2"
                                                        style={{ background: '#F57799' }}
                                                    >
                                                        Next <span>→</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </section>

                            {/* Lessons Section */}
                            <section className="px-5 md:px-8 py-8 max-w-5xl w-full pb-28 md:pb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Today's Lessons</span>
                                    <div className="flex-1 h-px" style={{ background: '#E5E7EB' }} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dailyContent.lessons.map((lesson, idx) => {
                                        const themeColor = SUBJECT_COLORS[lesson.subject] ?? '#94A3B8';
                                        const textColor = SUBJECT_TEXT_COLORS[lesson.subject] ?? themeColor;

                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => setSelectedLesson(lesson)}
                                                className="text-left rounded-xl p-6 flex flex-col gap-4 transition-all group hover:shadow-lg hover:-translate-y-1 bg-white border border-slate-100"

                                            >
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                                                        style={{ background: `${themeColor}25`, color: textColor }}
                                                    >
                                                        {lesson.subject}
                                                    </span>
                                                    <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" stroke={textColor} strokeWidth="2.5" viewBox="0 0 24 24">
                                                        <path d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>

                                                <h4 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Inter, sans-serif', color: textColor }}>
                                                    {lesson.title}
                                                </h4>

                                                <div className="flex flex-wrap gap-x-2 gap-y-1 pt-2 border-t border-slate-50">
                                                    {lesson.highlights.slice(0, 3).map(h => (
                                                        <span key={h} className="text-[11px] font-medium text-slate-400 uppercase tracking-tight">
                                                            {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {/* GLOSSARY VIEW */}
                    {viewMode === 'list' && (
                        <motion.div
                            key="list-view"
                            initial={fadeTransition.initial}
                            animate={fadeTransition.animate}
                            exit={fadeTransition.exit}
                            className="absolute inset-0 flex flex-col p-5 md:p-8"
                            style={{ background: '#F7F8FA' }}
                        >
                            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col min-h-0">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Glossary</h2>
                                        <p className="text-sm text-slate-400 mt-0.5">{filteredWords.length} terms</p>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search words or definitions..."
                                        className="w-full md:max-w-xs px-4 py-2.5 text-sm rounded-lg outline-none transition-all"
                                        style={{
                                            background: '#FFFFFF',
                                            border: '1px solid #E5E7EB',
                                            color: '#1E293B'
                                        }}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="flex-1 overflow-y-auto no-scrollbar pb-24 md:pb-4">
                                    {filteredWords.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-48 rounded-xl" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                                            <span className="text-sm text-slate-400">No results found.</span>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {filteredWords.map((w) => (
                                                <button
                                                    key={w.word}
                                                    className="text-left rounded-xl p-4 flex flex-col gap-2 transition-all hover:shadow-sm group"
                                                    style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                                                    onClick={() => setSelectedWord(w)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1 h-5 rounded-full group-hover:h-7 transition-all" style={{ background: '#3B82F6' }} />
                                                        <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>{w.word}</h3>
                                                    </div>
                                                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{w.definition}</p>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* FLASHCARDS VIEW */}
                    {viewMode === 'flashcards' && (
                        <motion.div
                            key="flashcard-view"
                            initial={fadeTransition.initial}
                            animate={fadeTransition.animate}
                            exit={fadeTransition.exit}
                            className="absolute inset-0 flex flex-col items-center overflow-y-auto no-scrollbar py-6 px-6"
                            style={{ background: '#F7F8FA' }}
                        >
                            <div className="max-w-lg w-full h-fit flex flex-col items-center gap-6 md:gap-8 my-auto">
                                {/* Header row */}
                                <div className="w-full flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Flashcards</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">Daily vocabulary set</p>
                                    </div>
                                    <span className="text-sm font-medium text-slate-500 tabular-nums bg-white px-3 py-1.5 rounded-lg" style={{ border: '1px solid #E5E7EB' }}>
                                        {flashcardIndex + 1} / {dailyContent.vocab.length}
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div className="w-full h-1.5 rounded-full" style={{ background: '#E5E7EB' }}>
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            background: '#F57799',
                                            width: `${((flashcardIndex + 1) / dailyContent.vocab.length) * 100}%`
                                        }}
                                    />
                                </div>

                                {dailyContent.vocab.length > 0 && (
                                    <div className="w-full relative min-h-[400px]">
                                        <VocabFlashcard
                                            vocab={dailyContent.vocab[flashcardIndex]}
                                            onAction={(known) => {
                                                updateSR(dailyContent.vocab[flashcardIndex].word, known);
                                                setFlashcardIndex(prev => (prev + 1) % dailyContent.vocab.length);
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="flex gap-3 w-full pb-20 md:pb-0">
                                    <button
                                        onClick={() => setFlashcardIndex(prev => (prev - 1 + dailyContent.vocab.length) % dailyContent.vocab.length)}
                                        className="h-12 flex-1 flex items-center justify-center rounded-xl transition-colors text-slate-600 hover:bg-white"
                                        style={{ border: '1px solid #E5E7EB' }}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setFlashcardIndex(prev => (prev + 1) % dailyContent.vocab.length)}
                                        className="h-12 flex-1 flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-colors text-slate-600 hover:bg-white"
                                        style={{ border: '1px solid #E5E7EB' }}
                                    >
                                        Skip
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden shrink-0 z-40" style={{ background: '#FFFFFF', borderTop: '1px solid #E5E7EB' }}>
                <div className="flex justify-around items-center h-16 pb-safe">
                    {(['daily', 'list', 'flashcards'] as ViewMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => {
                                setViewMode(mode);
                                if (mode === 'flashcards') setFlashcardIndex(0);
                            }}
                            className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors"
                            style={{ color: viewMode === mode ? '#F57799' : '#94A3B8' }}
                        >
                            <NavIcon mode={mode} />
                            <span className="text-[10px] font-medium">{navLabels[mode]}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Modals */}
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
                {selectedLesson && (
                    selectedLesson.Component ? (
                        <selectedLesson.Component onClose={() => setSelectedLesson(null)} />
                    ) : (
                        <LessonView lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
                    )
                )}
            </AnimatePresence>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
            `}</style>
        </div>
    );
};
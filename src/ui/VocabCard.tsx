import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VocabWord } from '../types/vocab';

interface CardProps {
    vocab: VocabWord;
    onAction?: (known: boolean) => void;
}

const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!text) return null;
    if (!highlight) return <>{text}</>;

    const regex = new RegExp(`(\\b${highlight}\\b)`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) => (
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <strong key={i} className="font-bold" style={{ color: '#1E3A5F', borderBottom: '2px solid #3B82F6' }}>
                        {part}
                    </strong>
                ) : (
                    part
                )
            ))}
        </>
    );
};

export const VocabFlashcard: React.FC<CardProps> = ({ vocab, onAction }) => {
    const [showBack, setShowBack] = useState(false);

    const handleAction = (e: React.MouseEvent, known: boolean) => {
        e.stopPropagation();
        onAction?.(known);
        setShowBack(false);
    };

    return (
        <div
            className="perspective-1000 w-full max-w-[min(420px,calc(100vw-3rem))] aspect-[4/5] cursor-pointer mx-auto relative"
            onClick={() => setShowBack(!showBack)}
        >
            <motion.div
                animate={{ rotateY: showBack ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="relative w-full h-full preserve-3d"
            >
                {/* FRONT */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl flex flex-col items-center justify-center text-center p-8 gap-4"
                    style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)' }}
                >
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Vocabulary</span>

                    <h2
                        className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        {vocab.word}
                    </h2>

                    <div className="w-10 h-0.5 rounded-full mt-1" style={{ background: '#F57799' }} />

                    <p className="text-sm text-slate-400 mt-6">Tap to reveal</p>
                </div>

                {/* BACK */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl flex flex-col rotate-y-180 overflow-hidden"
                    style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)' }}
                >
                    {/* Back header */}
                    <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: '#F1F5F9' }}>
                        <h2
                            className="text-xl font-bold text-slate-900 tracking-tight"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            {vocab.word}
                        </h2>
                    </div>

                    <div className="flex-1 overflow-hidden px-6 py-5 flex flex-col gap-4">
                        <p className="text-base text-slate-700 leading-relaxed">
                            {vocab.definition}
                        </p>

                        {vocab.sample_sentence && (
                            <div className="rounded-lg p-4 flex-1" style={{ background: '#F7F8FA', border: '1px solid #E5E7EB' }}>
                                <p className="text-sm text-slate-500 italic leading-relaxed">
                                    "<HighlightedText text={vocab.sample_sentence} highlight={vocab.word} />"
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-5 border-t" style={{ borderColor: '#F1F5F9' }}>
                        <button
                            onClick={(e) => handleAction(e, false)}
                            className="py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-slate-600 hover:bg-slate-50"
                            style={{ border: '1px solid #E5E7EB' }}
                        >
                            <span>↺</span> Again
                        </button>
                        <button
                            onClick={(e) => handleAction(e, true)}
                            className="py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-white"
                            style={{ background: '#F57799' }}
                        >
                            <span>✓</span> Got it
                        </button>
                    </div>
                </div>
            </motion.div>

            <style>{`
                .rotate-y-180 { transform: rotateY(180deg); }
                .backface-hidden { backface-visibility: hidden; }
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
            `}</style>
        </div>
    );
};

export const VocabDetail: React.FC<{ vocab: VocabWord; onClose: () => void; onAction: (known: boolean) => void }> = ({ vocab, onClose, onAction }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
            style={{ background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl flex flex-col overflow-hidden md:rounded-2xl"
                style={{
                    background: '#FFFFFF',
                    maxHeight: '92dvh',
                    borderTop: '1px solid #E5E7EB',
                    boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-5 flex items-center justify-between border-b" style={{ borderColor: '#E5E7EB' }}>
                    <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Word Detail</p>
                        <h2
                            className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            {vocab.word}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">
                    {/* Definition */}
                    <section>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Definition</p>
                        <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {vocab.definition}
                        </p>
                    </section>

                    {/* Sample sentence */}
                    {vocab.sample_sentence && (
                        <section>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Example</p>
                            <div className="rounded-xl p-5" style={{ background: '#F7F8FA', border: '1px solid #E5E7EB', borderLeft: '3px solid #F57799' }}>
                                <p className="text-base text-slate-700 italic leading-relaxed">
                                    "<HighlightedText text={vocab.sample_sentence} highlight={vocab.word} />"
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Synonyms */}
                    {vocab.synonyms?.length > 0 && (
                        <section>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Synonyms</p>
                            <div className="flex flex-wrap gap-2">
                                {vocab.synonyms.map(s => (
                                    <span
                                        key={s}
                                        className="text-sm font-medium px-3 py-1.5 rounded-lg"
                                        style={{ background: '#FFF7CD', color: '#000000ff', border: '1px solid #FFF7CD' }}
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Memory aid */}
                    {vocab.root_or_helper && (
                        <section>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Memory Aid</p>
                            <p className="text-base text-slate-600 leading-relaxed italic font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {vocab.root_or_helper}
                            </p>
                        </section>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-5 grid grid-cols-2 gap-3 border-t" style={{ borderColor: '#E5E7EB' }}>
                    <button
                        onClick={() => onAction(false)}
                        className="py-3 text-sm font-medium rounded-xl transition-colors text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2"
                        style={{ border: '1px solid #E5E7EB' }}
                    >
                        <span>↺</span> Review Again
                    </button>
                    <button
                        onClick={() => onAction(true)}
                        className="py-3 text-sm font-medium rounded-xl transition-colors text-white flex items-center justify-center gap-2"
                        style={{ background: '#F57799' }}
                    >
                        <span>✓</span> I Know This
                    </button>
                </div>
            </motion.div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #CBD5E1 transparent; }
            `}</style>
        </motion.div>
    );
};
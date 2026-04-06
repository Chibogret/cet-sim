import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Ensure you're using 'framer-motion'
import { VocabWord } from '../types/vocab';

interface CardProps {
    vocab: VocabWord;
    onAction?: (known: boolean) => void;
}

const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!text) return null;
    if (!highlight) return <>{text}</>;

    // Use regex to find the word, case-insensitive.
    // We use word boundaries \b to ensure we match the full word.
    const regex = new RegExp(`(\\b${highlight}\\b)`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) => (
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <strong key={i} className="font-extrabold text-neutral-900 underline decoration-indigo-400/30 decoration-2 underline-offset-2">
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
            className="perspective-1000 w-full max-w-sm aspect-[3/4] cursor-pointer mx-auto"
            onClick={() => setShowBack(!showBack)}
        >
            <motion.div
                animate={{ rotateY: showBack ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="relative w-full h-full preserve-3d"
            >
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden bg-[#F9F9F7] rounded-xl border border-neutral-200 p-10 flex flex-col shadow-sm">

                    <h2 className="text-6xl font-serif text-neutral-900 font-bold ">{vocab.word}</h2>

                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-8">Meaning</span>
                    <h3 className="text-4xl font-serif text-neutral-800 leading-tight mb-8">
                        {vocab.definition}
                    </h3>

                    <div className="border-l-2 border-neutral-200 pl-4 mb-8">
                        <p className="text-neutral-500 text-sm italic leading-relaxed">
                            "<HighlightedText text={vocab.sample_sentence} highlight={vocab.word} />"
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-auto">
                        {vocab.synonyms.slice(0, 3).map(s => (
                            <span key={s} className="text-[9px] bg-[#fdfd96] font-bold uppercase border border-neutral-200 px-2 py-1 rounded">
                                {s}
                            </span>
                        ))}
                    </div>

                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest text-center mt-6">Click to flip</p>
                </div>

                {/* BACK (Placeholder for the word itself) */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-xl border border-neutral-200 p-12 flex flex-col items-center justify-center rotate-y-180">
                    <h2 className="text-6xl font-serif text-neutral-900">{vocab.word}</h2>
                </div>
            </motion.div>
        </div>
    );
};

export const VocabDetail: React.FC<{ vocab: VocabWord; onClose: () => void; onAction: (known: boolean) => void }> = ({ vocab, onClose, onAction }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm p-4 flex items-center justify-center"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#FDFDFB] max-w-xl w-full rounded-xl shadow-2xl border border-neutral-200 flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Close */}
                <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Vocabulary</span>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors border border-neutral-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="1.5" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                    {/* Main Word */}
                    <h1 className="text-7xl font-serif text-neutral-900 tracking-tight">{vocab.word}</h1>

                    <section>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Definition</h4>
                        <p className="text-3xl font-serif font-bold text-neutral-800 leading-tight">
                            {vocab.definition}
                        </p>
                    </section>

                    <section>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Synonym Network</h4>
                        <div className="flex flex-wrap gap-2">
                            {vocab.synonyms.map(s => (
                                <span key={s} className="bg-[#E9F5F2] text-[#4A8B7E] px-4 py-1 rounded text-xs font-bold uppercase tracking-wider border border-[#D1E7E2]">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Context / Usage</h4>
                        <div className="border-l-4 border-[#D9A74A] pl-6 py-1">
                            <p className="text-neutral-700 text-lg leading-relaxed font-medium">
                                "<HighlightedText text={vocab.sample_sentence} highlight={vocab.word} />"
                            </p>
                        </div>
                    </section>

                    <section className="pt-6 border-t border-neutral-100">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Pro-Tip / Helper</h4>
                        <p className="text-neutral-600 text-base">
                            From Greek <span className="bg-[#FEF3C7] px-1 rounded">auto</span> (self) + <span className="bg-[#FEF3C7] px-1 rounded">kratos</span> (power)
                        </p>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-8 grid grid-cols-2 gap-4 bg-white border-t border-neutral-100">
                    <button
                        onClick={() => onAction(false)}
                        className="py-4 rounded-xl border border-neutral-200 text-neutral-800 font-bold text-sm uppercase flex flex-col items-center justify-center hover:bg-neutral-50 transition-all"
                    >
                        <span className="text-lg">↺</span>
                        Show Again
                    </button>
                    <button
                        onClick={() => onAction(true)}
                        className="py-4 rounded-xl border border-neutral-200 text-neutral-800 font-bold text-sm uppercase flex flex-col items-center justify-center hover:bg-neutral-50 transition-all"
                    >
                        <span className="text-lg">✓</span>
                        I Know This
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};
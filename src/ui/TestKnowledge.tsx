import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Question } from '../types/question';
import { questionsBank } from '../data/questions_bank';

const SUBJECT_COLORS: Record<string, string> = {
    Mathematics: '#0EA5E9',
    Science: '#8B5CF6',
    'Reading Comprehension': '#F43F5E',
    'Language Proficiency': '#F59E0B',
};

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    if (!text) return null;
    
    // Split by $ markers for inline math
    const mathParts = text.split(/(\$.*?\$)/g);
    
    return (
        <>
            {mathParts.map((mp, i) => {
                if (mp.startsWith('$') && mp.endsWith('$')) {
                    const math = mp.slice(1, -1);
                    return <InlineMath key={`math-${i}`} math={math} />;
                }
                
                const uTagParts = mp.split(/(<u>.*?<\/u>)/g);
                return uTagParts.map((uPart, uIdx) => {
                    if (uPart.startsWith('<u>') && uPart.endsWith('</u>')) {
                        return <span key={`u-${i}-${uIdx}`} className="underline decoration-1 underline-offset-2 text-slate-900">{uPart.slice(3, -4)}</span>;
                    }

                    const underlineParts = uPart.split(/(_.*?_)/g);
                    return underlineParts.map((subUPart, subUIdx) => {
                        if (subUPart.startsWith('_') && subUPart.endsWith('_')) {
                            const content = subUPart.slice(1, -1);
                            // If it's just a sequence of underscores (blank line), render literally
                            if (content.length === 0 || /^_+$/.test(content)) {
                                return <React.Fragment key={`uu-${i}-${uIdx}-${subUIdx}`}>{subUPart}</React.Fragment>;
                            }
                            return <span key={`uu-${i}-${uIdx}-${subUIdx}`} className="underline decoration-1 underline-offset-2 text-slate-900">{content}</span>;
                        }

                        // Error Identification Support: {text}[label]
                        const errorIDParts = subUPart.split(/(\{.*?\}\[.*?\])/g);
                        return errorIDParts.map((part, j) => {
                            const match = part.match(/^\{(.*?)\}\[(.*?)\]$/);
                            if (match) {
                                return (
                                    <span key={`err-${i}-${uIdx}-${subUIdx}-${j}`} className="relative inline mx-1 underline underline-offset-[3px] decoration-slate-900">
                                        {match[1]}
                                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] no-underline text-slate-400">
                                            {match[2]}
                                        </span>
                                    </span>
                                );
                            }
                            return <span key={`text-${i}-${uIdx}-${subUIdx}-${j}`}>{part}</span>;
                        });
                    });
                });

            })}
        </>
    );
};

export const TestKnowledge: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // Shuffle questions on mount, keeping groups together
    useEffect(() => {
        const groups: Record<string, Question[]> = {};
        questionsBank.forEach(q => {
            const key = q.groupId || q.id;
            if (!groups[key]) groups[key] = [];
            groups[key].push(q);
        });

        const shuffledGroups = Object.values(groups).sort(() => Math.random() - 0.5);
        setQuestions(shuffledGroups.flat());
    }, []);


    const currentQuestion = questions[currentIndex];

    // Information about the current question group
    const groupInfo = useMemo(() => {
        if (!currentQuestion?.groupId || questions.length === 0) return null;
        const groupQuestions = questions.filter(q => q.groupId === currentQuestion.groupId);
        const indexInGroup = groupQuestions.indexOf(currentQuestion);
        return {
            index: indexInGroup + 1,
            total: groupQuestions.length
        };
    }, [currentQuestion, questions]);


    const handleOptionSelect = (option: string) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (!selectedOption || isAnswered) return;

        setIsAnswered(true);
        if (selectedOption === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setIsFinished(true);
        }
    };

    const handleReset = () => {
        const groups: Record<string, Question[]> = {};
        questionsBank.forEach(q => {
            const key = q.groupId || q.id;
            if (!groups[key]) groups[key] = [];
            groups[key].push(q);
        });

        const shuffledGroups = Object.values(groups).sort(() => Math.random() - 0.5);
        setQuestions(shuffledGroups.flat());
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setIsFinished(false);
    };


    if (questions.length === 0) return null;

    if (isFinished) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg w-full bg-white rounded-2xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center gap-6"
            >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Test Complete!</h2>
                    <p className="text-slate-500 mt-2">You've answered all available questions.</p>
                </div>

                <div className="w-full flex flex-col gap-2 bg-slate-50 rounded-xl p-6 border border-slate-100">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Score</span>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-black text-slate-900">{score}</span>
                        <span className="text-xl text-slate-300">/ {questions.length}</span>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3">
                    <button
                        onClick={handleReset}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                        Retake Test
                    </button>
                    <p className="text-xs text-slate-400 italic">Questions are reshuffled every time you restart.</p>
                </div>
            </motion.div>
        );
    }

    const themeColor = SUBJECT_COLORS[currentQuestion.subject] || '#94A3B8';

    return (
        <div className="max-w-2xl w-full flex flex-col gap-6">
            {/* Progress Bar & Header */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider w-fit"
                            style={{ background: `${themeColor}20`, color: themeColor }}
                        >
                            {currentQuestion.subject}
                        </span>
                        <h3 className="text-sm font-bold text-slate-400">{currentQuestion.subtopic}</h3>
                    </div>
                    <span className="text-sm font-bold text-slate-500 tabular-nums">
                        {currentIndex + 1} <span className="text-slate-300">/</span> {questions.length}
                    </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-slate-900"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col gap-6"
            >
                <div>
                    {currentQuestion.variant === 'error-identification' && (
                        <div className="mb-6 p-4 bg-slate-50 rounded-xl border-l-4 border-slate-900 italic font-medium text-xs md:text-sm text-slate-600 leading-relaxed shadow-inner">
                            <span className="font-bold not-italic block mb-1 uppercase tracking-widest text-[10px] text-slate-400">
                                {currentQuestion.subtopic === 'Pagkilala ng Mali' ? 'Panuto' : 'Instructions'}
                            </span>
                            {currentQuestion.subtopic === 'Pagkilala ng Mali' 
                                ? 'Piliin ang salita o parirala na nagpapamali sa pangungusap. Kung ang pangungusap ay tama, piliin ang ' 
                                : 'Choose the word or phrase that makes the sentence grammatically incorrect. If the sentence is correct, choose '}
                            <strong className="text-slate-900 font-bold">
                                {currentQuestion.subtopic === 'Pagkilala ng Mali' ? 'WALANG MALI' : 'NO ERROR'}
                            </strong>.
                        </div>
                    )}

                    {currentQuestion.contextTitle && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px bg-slate-100 flex-1" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-3">
                                {currentQuestion.contextTitle}
                            </span>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>
                    )}

                    {currentQuestion.passage && (
                        <div className={`bg-slate-50 border border-slate-100 p-6 mb-6 rounded-xl relative overflow-hidden shadow-inner ${currentQuestion.passageType === 'poetry' ? 'flex flex-col items-center' : ''}`}>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/50 -rotate-45 translate-x-12 -translate-y-12" />
                            <p className={`text-slate-700 leading-relaxed text-sm md:text-base relative z-10 ${currentQuestion.passageType === 'poetry' ? 'whitespace-pre-line italic font-serif text-center' : ''}`}>
                                <FormattedText text={currentQuestion.passage} />
                            </p>
                            {groupInfo && (
                                <div className="mt-4 pt-4 border-t border-slate-200/50 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full">
                                    <span>Reading Passage</span>
                                    <span>Part {groupInfo.index} of {groupInfo.total}</span>
                                </div>
                            )}
                        </div>
                    )}


                    {currentQuestion.figure && (
                        <div className="w-full rounded-xl overflow-hidden border border-slate-100 bg-white mb-6 p-3 shadow-sm">
                            <img src={currentQuestion.figure} alt="Question figure" className="w-full h-auto object-contain max-h-80 rounded-lg" />
                            <div className="mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <span>Reference Figure</span>
                                {groupInfo && <span>Question {groupInfo.index} of {groupInfo.total}</span>}
                            </div>
                        </div>
                    )}

                    <h2 className={`text-xl md:text-2xl font-bold text-slate-900 leading-tight ${currentQuestion.variant === 'error-identification' ? 'leading-[3] pt-4' : ''}`}>
                        <FormattedText text={currentQuestion.question} />
                    </h2>
                </div>



                <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = isAnswered && option === currentQuestion.correctAnswer;
                        const isWrong = isAnswered && isSelected && option !== currentQuestion.correctAnswer;

                        let borderColor = '#E2E8F0';
                        let bgColor = '#FFFFFF';
                        let textColor = '#475569';

                        if (isSelected && !isAnswered) {
                            borderColor = '#000000';
                            bgColor = '#F8FAFC';
                            textColor = '#000000';
                        } else if (isCorrect) {
                            borderColor = '#22C55E';
                            bgColor = '#F0FDF4';
                            textColor = '#166534';
                        } else if (isWrong) {
                            borderColor = '#EF4444';
                            bgColor = '#FEF2F2';
                            textColor = '#991B1B';
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(option)}
                                disabled={isAnswered}
                                className="w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group"
                                style={{
                                    borderColor,
                                    backgroundColor: bgColor,
                                    color: textColor
                                }}
                            >
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border-2 transition-colors ${isSelected && !isAnswered ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-100'
                                    }`}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                {currentQuestion.variant !== 'error-identification' && (
                                    <span className="text-base font-medium flex-1">
                                        <FormattedText text={option} />
                                    </span>
                                )}
                                {isCorrect && (
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {isWrong && (
                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col gap-2"
                        >
                            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Explanation
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                <FormattedText text={currentQuestion.explanation} />
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex gap-3">
                    {!isAnswered ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedOption}
                            className={`flex-1 py-4 font-bold rounded-xl transition-all ${selectedOption
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                            {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                            <span>→</span>
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

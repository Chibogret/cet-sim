import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageViewer } from '../ImageViewer';


const Lesson801: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [dateStr, setDateStr] = useState("");
    const [zoomedImage, setZoomedImage] = useState<{ src: string, alt: string } | null>(null);


    useEffect(() => {
        const today = new Date();
        setDateStr(`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear().toString().substr(-2)}`);
    }, []);

    return (
        <div className={`fixed inset-0 z-[100] bg-slate-900/60 px-0 sm:px-4 py-0 sm:py-8 flex justify-center items-start ${zoomedImage ? 'overflow-hidden' : 'overflow-y-auto backdrop-blur-md'}`}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Kalam:wght@300;400;700&family=Roboto+Mono:ital,wght@0,400;0,600;1,400&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap');
                
                .binder-paper {
                    background-color: #fdfbf7;
                    /* Ruled lines background */
                    background-image: linear-gradient(#bae6fd 1px, transparent 1px);
                    background-size: 100% 2rem;
                    background-position: 0 4rem;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
                    position: relative;
                }

                /* Responsive vertical margin line */
                .binder-paper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background-color: #fca5a5;
                    left: 1.25rem;
                    z-index: 10;
                }
                @media (min-width: 640px) {
                    .binder-paper::before {
                        left: 4rem;
                    }
                }

                .hole-punch {
                    width: 1.25rem;
                    height: 1.25rem;
                    background-color: #cbd5e1;
                    border-radius: 50%;
                    position: absolute;
                    left: 0.75rem;
                    box-shadow: inset 2px 2px 4px rgba(0,0,0,0.3);
                    display: none; /* Hidden on mobile */
                    z-index: 20;
                }
                @media (min-width: 768px) {
                    .hole-punch { display: block; left: 1.25rem; }
                }

                .hole-1 { top: 10%; }
                .hole-2 { top: 50%; }
                .hole-3 { bottom: 10%; }

                .hand-box {
                    border: 2px solid #1e3a8a;
                    border-radius: 4px;
                    padding: 1.25rem;
                    background: rgba(255,255,255,0.7);
                }

                .highlight-yellow {
                    background: linear-gradient(104deg, transparent 0%, transparent 2%, rgba(254, 240, 138, 0.8) 3%, rgba(254, 240, 138, 0.8) 97%, transparent 98%);
                    padding: 0 4px;
                }

                .highlight-pink {
                    background: linear-gradient(104deg, transparent 0%, transparent 2%, rgba(251, 207, 232, 0.8) 3%, rgba(251, 207, 232, 0.8) 97%, transparent 98%);
                    padding: 0 4px;
                }

                .sticky-note {
                    background-color: #fff4a2ff;
                    box-shadow: 2px 4px 6px rgba(0,0,0,0.15);
                    padding: 1.25rem;
                    position: relative;
                }

                .lined-text {
                    line-height: 2rem;
                }

                .font-math { font-family: 'Roboto Mono', monospace; }
                .font-hand { font-family: 'Kalam', cursive; }
                .font-scribble { font-family: 'Caveat', cursive; }
                
                /* Custom utility classes */
                .text-pen-blue { color: #1e3a8a; }
                .text-pen-red { color: #dc2626; }
                .text-pen-black { color: #1c1917; }
                .border-pen-blue { border-color: #1e3a8a; }
                .border-pen-red { border-color: #dc2626; }
                .decoration-pen-blue { text-decoration-color: #1e3a8a; }
                .decoration-pen-red { text-decoration-color: #dc2626; }
                .bg-paper-line { background-color: #bae6fd; }
                .bg-paper-margin { background-color: #fca5a5; }
            `}</style>

            <div className="w-full max-w-4xl relative min-h-fit">
                <div className="binder-paper w-full min-h-fit text-pen-black lined-text relative shadow-2xl rounded-sm sm:rounded-xl mb-0 sm:mb-8">

                    <div className="hole-punch hole-1"></div>
                    <div className="hole-punch hole-2"></div>
                    <div className="hole-punch hole-3"></div>

                    {/* Exit Switcher - More robust on mobile */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 text-pen-red font-hand text-base sm:text-xl font-bold p-2 hover:scale-110 transition-transform group bg-white/40 sm:bg-transparent rounded-full sm:rounded-none"
                    >
                        <span className="hidden sm:inline mr-2">Exit Paper</span>
                        <span className="sm:hidden">Close ✕</span>
                        <span className="hidden sm:inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </button>

                    <div className="pl-8 sm:pl-[5rem] pr-4 sm:pr-8 pt-16 sm:pt-8 pb-12 font-sans">

                        {/* Meta Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-pen-blue text-xs sm:text-sm mb-6 gap-1 pr-12 sm:pr-0">
                            <span className="font-bold uppercase tracking-widest leading-tight">Order of Operations</span>
                        </div>

                        {/* Topic Header */}
                        <div className="text-center p-4 mb-2 rounded">
                            <h3 className="text-xl sm:text-5xl font-bold ">PEMDAS/GEMDAS</h3>
                        </div>

                        {/* Critical Rule Banner */}
                        <div className="bg-rose-50 border-2 border-pen-red p-4 mb-8 rounded shadow-sm">
                            <h3 className="font-hand text-xl sm:text-2xl text-pen-red font-bold underline decoration-2">THE CRITICAL RULE:</h3>
                            <p className="text-base sm:text-lg leading-relaxed mt-1">
                                <span className="font-bold">Multiplication and division</span> are the <span className="font-bold underline">same level</span>. <span className="font-bold">Addition and subtraction</span> are the  <span className="font-bold underline">same level</span>. <span className="highlight-yellow">Evaluate strictly LEFT to RIGHT.</span> This is where most students fail.
                            </p>
                        </div>

                        {/* Main Hierarchy */}
                        <div className="mb-10">
                            <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-2 underline decoration-pen-blue">1. The Standard Hierarchy</h2>
                            <ul className="list-none ml-2 sm:ml-4 space-y-1 font-medium text-sm sm:text-base">
                                <li className="flex flex-wrap items-baseline gap-x-2">
                                    <span className="font-bold text-pen-blue">Level 1:</span> Groups
                                    <span className="font-math bg-white/50 px-1 border border-slate-300 rounded text-xs sm:text-sm">( ) [ ] {"{ }"} | | Fraction Bars</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="font-bold text-pen-blue">Level 2:</span> Exponents & Roots <span className="font-math bg-white/50 px-1 rounded text-xs sm:text-sm">x² √x</span>
                                </li>
                                <li className="relative">
                                    <span className="font-bold text-pen-blue">Level 3:</span> Mult / Div <span className="highlight-pink font-bold">LEFT TO RIGHT</span>
                                    <div className="text-pen-red font-bold text-[10px] sm:text-xs ml-4 sm:ml-8 leading-tight italic tracking-tight mt-1">
                                        ↳ Rule: A number beside parentheses is just multiplication. 2(3+4) is just multiplication in sequence.
                                    </div>
                                </li>
                                <li className="mt-2">
                                    <span className="font-bold text-pen-blue">Level 4:</span> Add / Sub <span className="highlight-pink font-bold">LEFT TO RIGHT</span>
                                </li>
                            </ul>
                            <div className="mt-6 flex flex-col items-center">
                                <img
                                    src="/assets/lessons/801/pemdas_pyramid.png"
                                    alt="PEMDAS Operations Pyramid"
                                    className="w-full max-w-[480px] h-auto rounded p-2 cursor-zoom-in hover:shadow-md transition-shadow"
                                    onClick={() => setZoomedImage({ src: "/assets/lessons/801/pemdas_pyramid.png", alt: "PEMDAS Operations Pyramid" })}
                                />
                                <span className="text-[10px] text-slate-500 italic mt-1 font-math">FIG_PEMDAS_PYRAMID: The visual hierarchy of operations.</span>
                            </div>

                        </div>

                        {/* Edge Case Lab & Exam Tips Grid */}
                        <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                            <div className="sticky-note transform sm:-rotate-1">
                                <h3 className="font-hand text-xl sm:text-3xl font-bold  mb-3">
                                    Edge Case Lab: Exam Traps
                                </h3>

                                <div className="space-y-3 font-bold font-math text-xs sm:text-sm">

                                    <div className="flex flex-col border-b border-yellow-300/50 pb-1">
                                        <div className="flex justify-between">
                                            <span>-2²</span>
                                            <span className="text-pen-red">-4</span>
                                        </div>
                                        <span className="text-[10px] text-gray-600">
                                            exponent applies before the negative (-(2²))
                                        </span>
                                    </div>

                                    <div className="flex flex-col border-b border-yellow-300/50 pb-1">
                                        <div className="flex justify-between">
                                            <span>(-2)²</span>
                                            <span className="text-green-700">4</span>
                                        </div>
                                        <span className="text-[10px] text-gray-600">
                                            parentheses change the base
                                        </span>
                                    </div>

                                    <div className="flex flex-col border-b border-yellow-300/50 pb-1">
                                        <div className="flex justify-between">
                                            <span>6 ÷ 2(1+2)</span>
                                            <span className="text-pen-blue">9</span>
                                        </div>
                                        <span className="text-[10px] text-gray-600">
                                            multiplication is not “stronger” than division (left-to-right rule)
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <span>| -3² |</span>
                                            <span className="text-pen-blue">9</span>
                                        </div>
                                        <span className="text-[10px] text-gray-600">
                                            exponent happens before absolute value
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div className="bg-blue-50/80 border-2 border-blue-200 p-5 sm:p-6 rounded transform sm:rotate-1">
                                <h3 className="font-hand text-xl sm:text-2xl font-bold text-pen-blue mb-2">Exam Tips:</h3>
                                <ul className="text-[11px] sm:text-xs space-y-3 text-slate-700 leading-tight">
                                    <li className="flex gap-2">
                                        <span className="text-pen-blue">1.</span>
                                        <span><span className="font-bold">Only operations <span className="underline italic">inside</span> parentheses are Level 1</span>. A number beside parentheses is just multiplication.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-pen-blue">2.</span>
                                        <span><span className="font-bold">Watch the Fraction Bar.</span> It’s a "hidden" parenthesis. Simplify the entire top and bottom before final division.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-pen-blue">3.</span>
                                        <span><span className="font-bold">The Zero Shortcut.</span> If a massive group is multiplied by <code className="bg-white px-1">0</code>, the answer is <code className="bg-white px-1">0</code>. Don't waste time calculating the mess inside.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-pen-blue">4.</span>
                                        <span><span className="font-bold">Sign Verification.</span> <code className="bg-white px-1">-3²</code> is the #1 point-loser on tests. It is <span className="underline">-9</span>. Only <code className="bg-white px-1">(-3)²</code> is positive <span className="underline">9</span>.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Expanded Practice Problems */}
                        <div>
                            <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-4 underline decoration-pen-blue">2. Practice Reps</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 font-math text-sm sm:text-base">
                                <div className="hand-box">
                                    <h4 className="font-hand text-lg sm:text-xl font-bold text-pen-blue border-b border-pen-blue mb-3">Chain Operations (L to R)</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between gap-4">
                                            <span>20 ÷ 5 &times; 2</span>
                                            <span className="font-bold">= 8</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span>36 ÷ 6 &times; 3 ÷ 2</span>
                                            <span className="font-bold">= 9</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span>48 ÷ 2 &times; 3 &times; 2</span>
                                            <span className="font-bold">= 144</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span>12 ÷ 4 &times; (2 + 1)</span>
                                            <span className="font-bold">= 9</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="hand-box">
                                    <h4 className="font-hand text-lg sm:text-xl font-bold text-pen-blue border-b border-pen-blue mb-3">Mixed Operations</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between gap-4">
                                            <span>18 ÷ 3(2 + 1)</span>
                                            <span className="font-bold">= 18</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span>10 - 2³ + | -4 &times; 2 |</span>
                                            <span className="font-bold">= 10</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span>24 ÷ (3 &times; 2) + 5</span>
                                            <span className="font-bold">= 9</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span>-3² + 2(5 + 1)</span>
                                            <span className="font-bold">= 3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <AnimatePresence>
                {zoomedImage && (
                    <ImageViewer
                        src={zoomedImage.src}
                        alt={zoomedImage.alt}
                        onClose={() => setZoomedImage(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};


export default Lesson801;
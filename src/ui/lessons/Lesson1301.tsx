import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageViewer } from '../ImageViewer';

const Lesson1301: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [page, setPage] = useState(1);
    const [zoomedImage, setZoomedImage] = useState<{ src: string, alt: string } | null>(null);

    // Accurate poem text for Robert Frost's "Fire and Ice"
    const samplePoem = {
        title: "Fire and Ice",
        author: "Robert Frost",
        lines: [
            "Some say the world will end in fire,",
            "Some say in ice.",
            "From what I’ve tasted of desire",
            "I hold with those who favor fire.",
            "But if it had to perish twice,",
            "I think I know enough of hate",
            "To say that for destruction ice",
            "Is also great",
            "And would suffice."
        ]
    };

    return (
        <div className={`fixed inset-0 z-[100] bg-slate-900/60 px-0 sm:px-4 py-0 sm:py-8 flex justify-center items-start ${zoomedImage ? 'overflow-hidden' : 'overflow-y-auto backdrop-blur-md'}`}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Kalam:wght@300;400;700&family=Roboto+Mono:ital,wght@0,400;0,600;1,400&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap');
                
                .binder-paper {
                    background-color: #fdfbf7;
                    background-image: linear-gradient(#bae6fd 1px, transparent 1px);
                    background-size: 100% 2rem;
                    background-position: 0 4rem;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
                    position: relative;
                }

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
                
                .text-pen-blue { color: #1e3a8a; }
                .text-pen-red { color: #dc2626; }
                .text-pen-black { color: #1c1917; }
                .border-pen-blue { border-color: #1e3a8a; }
                .border-pen-red { border-color: #dc2626; }
                .decoration-pen-blue { text-decoration-color: #1e3a8a; }
                .decoration-pen-red { text-decoration-color: #dc2626; }

                .poem-excerpt {
                    padding: 2rem;
                    font-family: 'serif';
                    font-style: italic;
                    line-height: 1.8;
                }
            `}</style>

            <div className="w-full max-w-4xl relative min-h-fit">
                <div className="binder-paper w-full min-h-fit text-pen-black lined-text relative shadow-2xl rounded-sm sm:rounded-xl mb-0 sm:mb-8">

                    <div className="hole-punch hole-1"></div>
                    <div className="hole-punch hole-2"></div>
                    <div className="hole-punch hole-3"></div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 text-pen-red font-hand text-base sm:text-xl font-bold p-2 hover:scale-110 transition-transform group bg-white/40 sm:bg-transparent rounded-full sm:rounded-none"
                    >
                        <span className="hidden sm:inline mr-2">Exit Paper</span>
                        <span className="sm:hidden">Close ✕</span>
                        <span className="hidden sm:inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </button>

                    <div className="pl-8 sm:pl-[5rem] pr-4 sm:pr-8 pt-16 sm:pt-8 pb-12 font-sans">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-pen-blue text-xs sm:text-sm mb-6 gap-1 pr-12 sm:pr-0">
                            <span className="font-bold uppercase tracking-widest leading-tight">Reading Comprehension / Poetry (Page {page}/2)</span>
                        </div>

                        <div className="text-center p-4 mb-2 rounded">
                            <h3 className="text-xl sm:text-5xl font-bold">Poetry in Practice</h3>
                        </div>

                        <div className="mb-10 px-4">
                            <div className="poem-excerpt relative group">
                                <div className="absolute -top-3 -right-3 bg-pen-blue text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter">Sample Passage</div>
                                <h4 className="text-3xl font-bold not-italic mb-4 text-center font-hand text-pen-blue">{samplePoem.title}</h4>
                                {samplePoem.lines.map((line, idx) => (
                                    <p key={idx} className="text-center text-sm sm:text-base leading-relaxed relative">
                                        {line}
                                        {idx === 2 && <span className="text-pen-red font-hand text-[12px] ml-4 not-italic absolute opacity-0 group-hover:opacity-100 transition-opacity">← Metaphor starts here!</span>}
                                        {idx === 4 && <span className="text-pen-red font-hand text-[12px] ml-4 not-italic absolute opacity-0 group-hover:opacity-100 transition-opacity">← THE SHIFT (Volta)</span>}
                                    </p>
                                ))}
                                <p className="text-right text-[10px] mt-4 not-italic font-bold text-slate-400">— {samplePoem.author}</p>
                            </div>
                        </div>

                        {page === 1 ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-rose-50 border-2 border-pen-red p-4 mb-8 rounded shadow-sm">
                                    <h3 className="font-hand text-xl sm:text-2xl text-pen-red font-bold underline decoration-2">THE ENTRANCE EXAM REALITY:</h3>
                                    <p className="text-base sm:text-lg leading-relaxed mt-1">
                                        In <span className="italic">Fire and Ice</span>, does Frost care about the weather? <span className="font-bold">No.</span> He uses elemental forces as symbols. CETs test if you can see through the <span className="highlight-yellow">literal</span> (burning/freezing) to the <span className="highlight-yellow">figurative</span> (emotion/nature).
                                    </p>
                                </div>

                                <div className="mb-10">
                                    <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-2 underline decoration-pen-blue">1. The Analytical Toolkit</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ml-2 sm:ml-4 text-sm sm:text-base">
                                        <ul className="list-none space-y-4 font-medium">
                                            <li>
                                                <span className="font-bold text-pen-blue">Speaker & Perspective:</span>
                                                <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight">Look at line 3: "From what I’ve tasted of desire." The speaker is experienced and perhaps a bit cynical. They aren't just observing; they are reflecting on personal history.</div>
                                            </li>
                                            <li>
                                                <span className="font-bold text-pen-blue">Tone: Philosophical & Resigned</span>
                                                <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight">Notice how the speaker discusses the apocalypse so calmly. The tone is detached, almost like they've accepted the inevitable destruction.</div>
                                            </li>
                                        </ul>
                                        <ul className="list-none space-y-4 font-medium mt-4 md:mt-0">
                                            <li>
                                                <span className="font-bold text-pen-blue">Identifying "The Shift":</span>
                                                <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight">The word "But" in line 5 signals a shift from the speaker's first preference (Fire) to a secondary, equally deadly option (Ice). Shifts are where the "True" meaning of a poem often hides.</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                    <div className="sticky-note transform sm:-rotate-1">
                                        <h3 className="font-hand text-xl sm:text-3xl font-bold mb-3">
                                            The "Diction" Drill
                                        </h3>
                                        <div className="space-y-3 font-medium text-xs sm:text-sm">
                                            <div className="flex flex-col border-b border-yellow-300/50 pb-2">
                                                <span className="pr-2 font-bold">Why use "Suffice"?</span>
                                                <span className="text-[12px] text-pen-red font-hand mt-1">"Suffice" is understated and formal. It emphasizes the cold, calculating nature of "Hate" (Ice) compared to the erratic nature of "Fire".</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50/80 border-2 border-blue-200 p-5 sm:p-6 rounded transform sm:rotate-1">
                                        <h3 className="font-hand text-xl sm:text-2xl font-bold text-pen-blue mb-2">Analyzing with T-P-C-A-T</h3>
                                        <ul className="text-[12px] sm:text-sm space-y-2 text-slate-800 leading-tight mb-1">
                                            <li><span className="font-bold highlight-pink">T</span>itle: Fire/Ice (Opposites)</li>
                                            <li><span className="font-bold highlight-pink">P</span>araphrase: World ends two ways.</li>
                                            <li><span className="font-bold highlight-pink">C</span>onnotation: Fire = Passion, Ice = Indifference.</li>
                                            <li><span className="font-bold highlight-pink">A</span>ttitude: Dispassionate, wise.</li>
                                            <li><span className="font-bold highlight-pink">T</span>heme: Human emotions are destructive.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-8">
                                    <button
                                        onClick={() => { setPage(2); window.scrollTo(0, 0); }}
                                        className="font-hand text-xl sm:text-3xl font-bold text-pen-blue hover:scale-110 transition-transform bg-white/40 px-4 py-1 rounded-lg border-2 border-pen-blue/20"
                                    >
                                        Metaphors & Final Reps &rarr;
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-10">
                                    <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-2 underline decoration-pen-blue">2. Extended Metaphors in "Fire and Ice"</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ml-2 sm:ml-4 text-sm sm:text-base">
                                        <ul className="list-none space-y-4 font-medium">
                                            <li>
                                                <span className="font-bold text-pen-blue">Fire = Desire:</span>
                                                <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Just as fire consumes and burns quickly, "desire" (passion, greed) is an impulsive, hot emotion that destroys through intensity.</div>
                                            </li>
                                            <li>
                                                <span className="font-bold text-pen-blue">Ice = Hate:</span>
                                                <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Ice represents "cold" hatred—indifference, rigidity, and silence. It isolates and destroys slowly but just as effectively.</div>
                                            </li>
                                        </ul>
                                        <ul className="list-none space-y-4 font-medium mt-4 md:mt-0">
                                            <li>
                                                <span className="font-bold text-pen-blue">Understatement:</span> "Is also great / and would suffice."
                                                <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Frost uses clinical, almost bored language to describe the end of the world, creating an ironically chilling effect.</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-4 underline decoration-pen-blue">3. Rapid Fire Reps</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="hand-box">
                                            <p className="text-sm italic mb-2">1. In line 6, what does "I think I know enough of hate" suggest about the speaker?</p>
                                            <p className="font-hand text-xl text-pen-red font-bold">&rarr; They are disillusioned or worldly.</p>
                                        </div>
                                        <div className="hand-box">
                                            <p className="text-sm italic mb-2">2. What is the rhyme scheme of the first 4 lines?</p>
                                            <p className="font-hand text-xl text-pen-red font-bold">&rarr; ABAA <span className="text-xs font-sans text-gray-500 font-normal">(fire/ice/desire/fire)</span></p>
                                        </div>
                                        <div className="hand-box">
                                            <p className="text-sm italic mb-2">3. Primary Figure of Speech used for 'Fire' and 'Ice'?</p>
                                            <p className="font-hand text-xl text-pen-red font-bold">&rarr; Symbolism / Extended Metaphor</p>
                                        </div>
                                        <div className="hand-box">
                                            <p className="text-sm italic mb-2">4. Which emotion does 'Ice' represent in the context of the poem?</p>
                                            <p className="font-hand text-xl text-pen-red font-bold">&rarr; Indifference / Hate</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-8">
                                    <button
                                        onClick={() => { setPage(1); window.scrollTo(0, 0); }}
                                        className="font-hand text-xl sm:text-3xl font-bold text-pen-blue hover:scale-110 transition-transform bg-white/40 px-4 py-1 rounded-lg border-2 border-pen-blue/20"
                                    >
                                        &larr; Back to start
                                    </button>
                                    <div className="font-hand text-pen-red text-xl sm:text-2xl pt-2">Finished!</div>
                                </div>
                            </motion.div>
                        )}

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

export default Lesson1301;
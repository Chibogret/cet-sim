import React, { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { motion, AnimatePresence } from 'motion/react';
import { ImageViewer } from '../ImageViewer';

/**
 * MISSING FIGURES / DIAGRAMS TO GENERATE:
 * 1. FIG_FBD_BASIC: Simple Free Body Diagram showing balanced/unbalanced arrows (Force vectors).
 * 2. FIG_NORMAL_FORCE_INCLINE: Diagram of a block on a ramp with FN = mg cos(θ).
 * 3. FIG_FRICTION_SURFACES: Microscopic view of surfaces or a block being pushed vs static limit.
 * 4. FIG_PULLEY_TENSION: Ideal pulley system showing uniform tension (T) along a continuous string.
 */

const Lesson703: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [page, setPage] = useState(1);
  const [zoomedImage, setZoomedImage] = useState<{ src: string, alt: string } | null>(null);

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
              <span className="font-bold uppercase tracking-widest leading-tight">Physics / Dynamics (Page {page}/2)</span>
            </div>

            <div className="text-center p-4 mb-2 rounded">
              <h3 className="text-xl sm:text-5xl font-bold">Force and Motion</h3>
            </div>

            {page === 1 ? (
              <>
                {/* Critical Rule Banner */}
                <div className="bg-rose-50 border-2 border-pen-red p-4 mb-8 rounded shadow-sm">
                  <h3 className="font-hand text-xl sm:text-2xl text-pen-red font-bold underline decoration-2">THE ENTRANCE EXAM REALITY:</h3>
                  <p className="text-base sm:text-lg leading-relaxed mt-1">
                    CETs will <span className="font-bold underline">never</span> just ask you to recite definitions of forces. They test your ability to apply them to <span className="highlight-yellow">free-body diagrams (FBDs)</span> and expose misconceptions like confusing mass with weight, or misidentifying action-reaction pairs.
                  </p>
                </div>

                {/* Main Hierarchy */}
                <div className="mb-10">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-2 underline decoration-pen-blue">1. Newton's Laws of Motion</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ml-2 sm:ml-4 text-sm sm:text-base">
                    <ul className="list-none space-y-4 font-medium">
                      <li>
                        <span className="font-bold text-pen-blue">1st Law (Inertia):</span> Objects keep doing what they are already doing unless a net force acts on them.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Constant velocity means Net Force = 0! If a car moves steadily at 60 mph, engine thrust perfectly balances friction.</div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">2nd Law (<InlineMath math="F = ma" />):</span> Net force equals mass times acceleration.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Don't forget the "Net" in Net Force (<InlineMath math="\Sigma F" />). Always sum up opposing forces before equating to "<InlineMath math="ma" />".</div>
                      </li>
                    </ul>
                    <ul className="list-none space-y-4 font-medium mt-4 md:mt-0">
                      <li>
                        <span className="font-bold text-pen-blue">3rd Law (Action-Reaction):</span> Every action has an equal and opposite reaction.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Action/reaction pairs act on DIFFERENT objects. If Earth pulls you down with 500 N, you pull Earth up with 500 N. They do NOT cancel out on the same object!</div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Lab Section */}
                <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="sticky-note transform sm:-rotate-1">
                    <h3 className="font-hand text-xl sm:text-3xl font-bold mb-3">
                      Conceptual Dynamics Lab
                    </h3>
                    <div className="space-y-3 font-medium text-xs sm:text-sm">
                      <div className="flex flex-col border-b border-yellow-300/50 pb-2">
                        <span className="pr-2 font-bold">Q: Elevator moves UP at a CONSTANT speed. Is <InlineMath math="T > W" />?</span>
                        <span className="text-[12px] text-pen-red font-hand mt-1">No, <InlineMath math="T = W" />. Constant velocity means <InlineMath math="a = 0" />, meaning <InlineMath math="\Sigma F = 0" />.</span>
                      </div>
                      <div className="flex flex-col border-b border-yellow-300/50 pb-2">
                        <span className="pr-2 font-bold">Q: A bug hits a truck's windshield. Which feels more force?</span>
                        <span className="text-[12px] text-pen-red font-hand mt-1">They feel the EXACT SAME force (3rd Law). The bug just has less mass, so it experiences lethal acceleration.</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/80 border-2 border-blue-200 p-5 sm:p-6 rounded transform sm:rotate-1">
                    <h3 className="font-hand text-xl sm:text-2xl font-bold text-pen-blue mb-2">P1 Strategy: The FBD</h3>
                    <ul className="text-[12px] sm:text-sm space-y-3 text-slate-800 leading-tight mb-3">
                      <li><span className="font-bold highlight-pink">Draw It Out:</span> Never solve dynamics in your head. Isolate the object and draw every force as an arrow.</li>
                      <li><span className="font-bold highlight-pink">Choose a Winner:</span> The direction of acceleration is your positive direction. Set up your equation as: (Winning Forces) - (Losing Forces) = ma.</li>
                    </ul>
                    <div className="mt-4 flex flex-col items-center">
                      <img
                        src="/assets/lessons/703/fbd_basic.png"
                        alt="Basic Free Body Diagram"
                        className="w-full max-w-[280px] h-auto rounded border border-slate-200 bg-white/80 p-2 shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
                        onClick={() => setZoomedImage({ src: "/assets/lessons/703/fbd_basic.png", alt: "Basic Free Body Diagram" })}
                      />
                      <span className="text-[10px] text-slate-500 italic mt-1 font-math">FIG_FBD_BASIC: Isolate the object and sum vectors.</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => { setPage(2); window.scrollTo(0, 0); }}
                    className="font-hand text-xl sm:text-3xl font-bold text-pen-blue hover:scale-110 transition-transform bg-white/40 px-4 py-1 rounded-lg border-2 border-pen-blue/20"
                  >
                    More to follow &rarr;
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-10">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-2 underline decoration-pen-blue">2. Specific Forces and Vectors</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ml-2 sm:ml-4 text-sm sm:text-base">
                    <ul className="list-none space-y-4 font-medium">
                      <li>
                        <span className="font-bold text-pen-blue">Normal Force (<InlineMath math="F_N" />):</span> A contact force pushing perpendicularly away from a surface.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: <InlineMath math="F_N" /> does NOT always equal <InlineMath math="mg" />! On an incline, <InlineMath math="F_N = mg \cos(\theta)" />. If you push down on a box, the ground pushes back harder (<InlineMath math="F_N" /> increases).</div>
                        <div className="mt-4 flex flex-col items-center">
                          <img
                            src="/assets/lessons/703/normal_force_incline.png"
                            alt="Normal Force on Incline"
                            className="w-full max-w-[240px] h-auto rounded p-2 cursor-zoom-in hover:shadow-md transition-shadow"
                            onClick={() => setZoomedImage({ src: "/assets/lessons/703/normal_force_incline.png", alt: "Normal Force on Incline" })}
                          />
                          <span className="text-[10px] text-slate-500 italic mt-1 font-math">FIG_NORMAL_FORCE_INCLINE: Normal force is perpendicular to the surface.</span>
                        </div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">Friction (<InlineMath math="f" />):</span> A contact force that opposes sliding motion between surfaces.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Static friction (<InlineMath math="\mu_s" />) is a shape-shifter up to a max limit. It is ALWAYS harder to start moving an object than to keep it moving (<InlineMath math="\mu_s > \mu_k" />).</div>
                        <div className="mt-4 flex flex-col items-center">
                          <img
                            src="/assets/lessons/703/friction_surfaces.png"
                            alt="Friction Interaction"
                            className="w-full max-w-[240px] h-auto rounded p-2 cursor-zoom-in hover:shadow-md transition-shadow"
                            onClick={() => setZoomedImage({ src: "/assets/lessons/703/friction_surfaces.png", alt: "Friction Interaction" })}
                          />
                          <span className="text-[10px] text-slate-500 italic mt-1 font-math">FIG_FRICTION_SURFACES: Friction opposes motion at the molecular level.</span>
                        </div>
                      </li>
                    </ul>
                    <ul className="list-none space-y-4 font-medium mt-4 md:mt-0">
                      <li>
                        <span className="font-bold text-pen-blue">Tension (<InlineMath math="T" />):</span> Pulling force transmitted through a string, rope, or cable.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Ropes can only pull, never push. In an ideal, massless pulley system, tension is uniform everywhere along the same continuous string.</div>
                        <div className="mt-4 flex flex-col items-center">
                          <img
                            src="/assets/lessons/703/pulley_tension.png"
                            alt="Pulley System Tension"
                            className="w-full max-w-[240px] h-auto rounded p-2 cursor-zoom-in hover:shadow-md transition-shadow"
                            onClick={() => setZoomedImage({ src: "/assets/lessons/703/pulley_tension.png", alt: "Pulley System Tension" })}
                          />
                          <span className="text-[10px] text-slate-500 italic mt-1 font-math">FIG_PULLEY_TENSION: Tension is uniform in a single ideal string.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-4 underline decoration-pen-blue">3. Rapid Fire Reps</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="hand-box">
                      <p className="text-sm italic mb-2">1. Net force on a sky diver who has reached terminal velocity?</p>
                      <p className="font-hand text-xl text-pen-red font-bold">&rarr; 0 Newtons <span className="text-xs font-sans text-gray-500 font-normal">(velocity is constant)</span></p>
                    </div>
                    <div className="hand-box">
                      <p className="text-sm italic mb-2">2. A book rests on a table. What is the 3rd Law pair to the Earth pulling it down?</p>
                      <p className="font-hand text-xl text-pen-red font-bold">&rarr; The book pulling Earth UP <span className="text-xs font-sans text-gray-500 font-normal">(Not Normal Force!)</span></p>
                    </div>
                    <div className="hand-box">
                      <p className="text-sm italic mb-2">3. You push a 10kg box with 20N, but it stays perfectly still. Friction force?</p>
                      <p className="font-hand text-xl text-pen-red font-bold">&rarr; 20 Newtons <span className="text-xs font-sans text-gray-500 font-normal">(static friction matches your push)</span></p>
                    </div>
                    <div className="hand-box">
                      <p className="text-sm italic mb-2">4. Your apparent weight while standing on a scale in an elevator in free-fall?</p>
                      <p className="font-hand text-xl text-pen-red font-bold">&rarr; 0 Newtons <span className="text-xs font-sans text-gray-500 font-normal">(Normal force drops to zero)</span></p>
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
              </>
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

export default Lesson703;
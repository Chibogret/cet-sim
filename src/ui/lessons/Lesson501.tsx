import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageViewer } from '../ImageViewer';

const Lesson501: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
              <span className="font-bold uppercase tracking-widest leading-tight">Science / Biology (Page {page}/2)</span>
            </div>

            <div className="text-center p-4 mb-2 rounded">
              <h3 className="text-xl sm:text-5xl font-bold">Cell Biology</h3>
            </div>

            {page === 1 ? (
              <>
                <div className="bg-rose-50 border-2 border-pen-red p-4 mb-8 rounded shadow-sm">
                  <h3 className="font-hand text-xl sm:text-2xl text-pen-red font-bold underline decoration-2">THE ENTRANCE EXAM REALITY:</h3>
                  <p className="text-base sm:text-lg leading-relaxed mt-1">
                    CETs rarely ask for a simple list of organelles. They focus on <span className="highlight-yellow">structural-functional relationships</span> and the differences between Prokaryotes, Eukaryotes, Plant, and Animal cells. 
                  </p>
                </div>

                <div className="mb-10">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-2 underline decoration-pen-blue">1. The Cell Components</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ml-2 sm:ml-4 text-sm sm:text-base">
                    <ul className="list-none space-y-4 font-medium">
                      <li>
                        <span className="font-bold text-pen-blue">Nucleus:</span> The brain of the cell; contains DNA.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: The Nucleolus (inside the nucleus) is where ribosomes are made, not DNA. Don't mix them up!</div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">Mitochondria:</span> The powerhouse; site of ATP production.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: They have their own DNA! This is the "Endosymbiotic Theory" often tested in advanced SAT/CET biology.</div>
                      </li>
                    </ul>
                    <div className="mt-4 flex flex-col items-center">
                      <img 
                        src="/assets/lessons/501/cell_structure.png" 
                        alt="Cell Structure" 
                        className="w-full max-w-[280px] h-auto rounded border border-slate-200 bg-white/80 p-2 shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
                        onClick={() => setZoomedImage({ src: "/assets/lessons/501/cell_structure.png", alt: "Cell Structure" })}
                      />
                      <span className="text-[10px] text-slate-500 italic mt-1 font-math">FIG_CELL_STRUCTURE: Essential organelle mapping.</span>
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
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-2 underline decoration-pen-blue">2. Cell Division & Energy</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-2 sm:ml-4">
                    <div className="space-y-4">
                        <div className="hand-box">
                            <h4 className="font-hand text-xl font-bold text-pen-blue mb-2">Mitosis vs. Meiosis</h4>
                            <p className="text-sm">Mitosis = Growth (Identical). Meiosis = Sex Cells (Unique).</p>
                        </div>
                        <div className="mt-4 flex flex-col items-center">
                          <img 
                            src="/assets/lessons/501/mitosis.png" 
                            alt="Mitosis Stages" 
                            className="w-full max-w-[240px] h-auto rounded border border-slate-200 bg-white/80 p-2 shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
                            onClick={() => setZoomedImage({ src: "/assets/lessons/501/mitosis.png", alt: "Mitosis Stages" })}
                          />
                          <span className="text-[10px] text-slate-500 italic mt-1 font-math">FIG_MITOSIS: PMAT stages overview.</span>
                        </div>
                    </div>
                    <div className="sticky-note transform rotate-1">
                        <h4 className="font-hand text-xl font-bold mb-2">The Energy Loop</h4>
                        <p className="text-sm italic">Photosynthesis happens in Chloroplasts (Plants). Cellular Respiration happens in Mitochondria (All Eukaryotes).</p>
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

export default Lesson501;

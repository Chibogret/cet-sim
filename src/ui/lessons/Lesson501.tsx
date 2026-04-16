import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageViewer } from '../ImageViewer';

const Lesson501: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [page, setPage] = useState(1);
  const [zoomedImage, setZoomedImage] = useState<{ src: string, alt: string, reference?: string } | null>(null);
  const [references, setReferences] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/assets/lessons/501/references.txt')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const refMap: Record<string, string> = {};
        lines.forEach(line => {
          const match = line.match(/\[(.*?)\](.*)/);
          if (match) {
            refMap[match[1]] = match[2].trim();
          }
        });
        setReferences(refMap);
      })
      .catch(err => console.error("Failed to load references:", err));
  }, []);

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
                    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
                    padding: 1.5rem;
                    position: relative;
                    border-radius: 2px;
                }

                .washi-tape {
                    position: absolute;
                    top: -12px;
                    left: 50%;
                    transform: translateX(-50%) rotate(-1deg);
                    width: 110px;
                    height: 30px;
                    background: rgba(255, 255, 255, 0.5);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    backdrop-filter: blur(1px);
                    z-index: 5;
                    border-left: 1px dashed rgba(0,0,0,0.1);
                    border-right: 1px dashed rgba(0,0,0,0.1);
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
                    UPCAT, ACET, and DCAT rarely ask for a simple list of organelles. They focus on <span className="highlight-yellow">structural-functional relationships</span>, cellular environments (tonicity), and identifying which organelle is most abundant in a specific tissue type.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-4 underline decoration-pen-blue">1. Cell Types: The Big Divides</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-2 sm:ml-4">
                    <div className="hand-box border-dashed">
                      <h4 className="font-hand text-2xl font-bold text-pen-blue mb-3 underline decoration-pen-blue/30">Prokaryotes vs. Eukaryotes</h4>
                      <div className="space-y-4 text-sm">
                        <div>
                          <span className="font-bold text-pen-red">Prokaryotes:</span> <span className="italic text-xs">(Before Nucleus)</span>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            <li><span className="font-bold">DNA:</span> Circular, naked, in <span className="highlight-yellow">nucleoid</span> region.</li>
                            <li><span className="font-bold">Ribosomes:</span> <span className="font-math">70S</span> (smaller).</li>
                            <li><span className="font-bold">Division:</span> Binary Fission.</li>
                            <li><span className="font-bold">Organelles:</span> None membrane-bound.</li>
                          </ul>
                        </div>
                        <div>
                          <span className="font-bold text-pen-blue">Eukaryotes:</span> <span className="italic text-xs">(True Nucleus)</span>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            <li><span className="font-bold">DNA:</span> Linear, wrapped around histones, in <span className="highlight-pink">nucleus</span>.</li>
                            <li><span className="font-bold">Ribosomes:</span> <span className="font-math">80S</span> (larger).</li>
                            <li><span className="font-bold">Division:</span> Mitosis & Meiosis.</li>
                            <li><span className="font-bold">Organelles:</span> Complex & membrane-bound.</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-2 bg-yellow-100/50 border border-yellow-200 rounded-sm text-xs leading-tight font-hand">
                        <span className="font-bold text-pen-red">UPCAT MUST-KNOW:</span> Both have DNA, Ribosomes, Cytoplasm, and a Cell Membrane!
                      </div>
                    </div>
                    <div className="sticky-note transform rotate-1 transition-transform duration-300 cursor-default shadow-lg">
                      <div className="washi-tape"></div>
                      <h4 className="font-hand text-2xl font-bold mb-3 text-pen-blue border-b border-pen-blue/20 pb-1">Plant vs. Animal Cells</h4>

                      <div className="space-y-4">
                        <section>
                          <h5 className="font-bold text-xs uppercase tracking-wider text-green-700">☘️ Plant Exclusives:</h5>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li><span className="font-bold">Cell Wall:</span> Rigid cellulose (Shape!).</li>
                            <li><span className="font-bold">Chloroplasts:</span> Photosynthesis.</li>
                            <li><span className="font-bold">Large Vacuole:</span> Turgor pressure.</li>
                            <li><span className="italic">Cytokinesis:</span> <span className="font-bold">Cell Plate</span> formation.</li>
                            <li><span className="italic">Storage:</span> Starch.</li>
                          </ul>
                        </section>

                        <section>
                          <h5 className="font-bold text-xs uppercase tracking-wider text-rose-700">🐾 Animal Exclusives:</h5>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li><span className="font-bold">Centrioles:</span> Cell division.</li>
                            <li><span className="font-bold">Lysosomes:</span> Common (digestion).</li>
                            <li><span className="italic">Cytokinesis:</span> <span className="font-bold">Cleavage Furrow</span>.</li>
                            <li><span className="italic">Storage:</span> Glycogen.</li>
                          </ul>
                        </section>

                        <div className="mt-2 pt-2 border-t border-pen-blue/10">
                          <p className="font-scribble text-lg leading-tight text-pen-red">
                            *Shape: Plants are fixed/rect; Animals are irregular/round!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-4 underline decoration-pen-blue">2. High-Yield Organelles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ml-2 sm:ml-4 text-sm sm:text-base">
                    <ul className="list-none space-y-4 font-medium">
                      <li>
                        <span className="font-bold text-pen-blue">Nucleus & Nucleolus:</span> Nucleus holds DNA.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight">Exam Trap: The Nucleolus (inside) makes ribosomes, NOT DNA.</div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">Mitochondria:</span> Site of ATP production (Cellular Respiration).
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight">Exam Trap: They have their own DNA! (Endosymbiotic Theory). Abundant in muscle cells.</div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">Endoplasmic Reticulum (ER):</span>
                        <br />- <span className="italic">Rough ER:</span> Has ribosomes, makes proteins.
                        <br />- <span className="italic">Smooth ER:</span> Lipid synthesis, detoxifies drugs. <span className="highlight-pink">Highly abundant in Liver cells!</span>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">Golgi Apparatus:</span> The "post office". Modifies, sorts, and packages proteins.
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">Lysosomes:</span> Contains hydrolytic enzymes for digestion. The "suicide sac" (apoptosis).
                      </li>
                    </ul>
                    <div className="flex flex-col items-center mt-6 md:mt-0">
                      <img
                        src="/assets/lessons/501/cell_structure.png"
                        alt="Cell Structure"
                        className="w-full max-w-[680px] h-auto rounded p-2 cursor-zoom-in "
                        onClick={() => setZoomedImage({ 
                          src: "/assets/lessons/501/cell_structure.png", 
                          alt: "Cell Structure",
                          reference: references['cell_structure']
                        })}
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
                    Next: Transport & Energy &rarr;
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-4 underline decoration-pen-blue">3. Cell Transport & Tonicity</h2>
                  <div className="hand-box ml-2 sm:ml-4 mb-4">
                    <p className="text-sm sm:text-base mb-2">
                      <span className="font-bold">Passive Transport</span> (No ATP, High to Low) vs. <span className="font-bold">Active Transport</span> (Needs ATP, Low to High).
                    </p>
                    <div className="bg-blue-50 p-3 rounded">
                      <h4 className="font-hand text-lg font-bold text-pen-red mb-1">UPCAT Favorite: Osmosis & Tonicity</h4>
                      <ul className="list-disc pl-5 text-sm space-y-2">
                        <li><span className="font-bold">Hypertonic Solution:</span> More solute outside. Water leaves the cell. Cell <span className="highlight-yellow">shrinks</span> (Plasmolysis in plants).</li>
                        <li><span className="font-bold">Hypotonic Solution:</span> Less solute outside. Water enters the cell. Cell <span className="highlight-yellow">swells/bursts</span> (Lysis in animals, Turgid in plants). <span className="italic text-pen-blue">"Hypo = Hippo (gets fat)"</span></li>
                        <li><span className="font-bold">Isotonic Solution:</span> Equal concentration. No net movement.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-4 underline decoration-pen-blue">4. Cell Division (PMAT)</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-2 sm:ml-4">
                    <div className="space-y-4">
                      <ul className="list-none space-y-2 text-sm sm:text-base">
                        <li><span className="font-bold text-pen-blue">Mitosis:</span> Somatic (body) cells. 1 division &rarr; 2 identical diploid (2n) cells. Purpose: Growth & Repair.</li>
                        <li><span className="font-bold text-pen-blue">Meiosis:</span> Gametes (sex cells). 2 divisions &rarr; 4 unique haploid (n) cells.</li>
                      </ul>
                      <div className="sticky-note transform -rotate-1 mt-4 hover:rotate-0 transition-transform duration-300 shadow-lg">
                        <div className="washi-tape"></div>
                        <h4 className="font-hand text-lg font-bold text-pen-red">Crucial CET Detail:</h4>
                        <p className="text-sm leading-snug">
                          <span className="font-bold">Crossing Over</span> occurs in <span className="highlight-pink">Prophase I of Meiosis</span>. This is the primary source of genetic variation!
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="/assets/lessons/501/mitosis.png"
                        alt="Mitosis Stages"
                        className="w-full max-w-[680px] h-auto p-2 cursor-zoom-in transition-shadow"
                        onClick={() => setZoomedImage({ 
                          src: "/assets/lessons/501/mitosis.png", 
                          alt: "Mitosis Stages",
                          reference: references['mitosis']
                        })}
                      />
                      <span className="text-[10px] text-slate-500 italic mt-1 font-math">FIG_MITOSIS: Prophase, Metaphase, Anaphase, Telophase.</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-4 underline decoration-pen-blue">5. Bioenergetics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-2 sm:ml-4">
                    <div className="hand-box border-green-600">
                      <h4 className="font-hand text-xl font-bold text-green-700 mb-2">Photosynthesis (Chloroplast)</h4>
                      <ul className="text-sm space-y-1 list-disc pl-4">
                        <li><span className="font-bold">Light-Dependent:</span> In Thylakoids. Uses H2O & Light &rarr; Makes ATP, NADPH, O2.</li>
                        <li><span className="font-bold">Calvin Cycle (Dark):</span> In Stroma. Uses CO2, ATP, NADPH &rarr; Makes Glucose.</li>
                      </ul>
                    </div>
                    <div className="hand-box border-orange-600">
                      <h4 className="font-hand text-xl font-bold text-orange-700 mb-2">Cellular Respiration (Mitochondria)</h4>
                      <ul className="text-sm space-y-1 list-disc pl-4">
                        <li><span className="font-bold">Glycolysis:</span> In Cytoplasm. Anaerobic. Yields 2 ATP.</li>
                        <li><span className="font-bold">Krebs Cycle & ETC:</span> In Mitochondria. Aerobic. Yields ~34-36 ATP. Oxygen is the final electron acceptor!</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-12">
                  <button
                    onClick={() => { setPage(1); window.scrollTo(0, 0); }}
                    className="font-hand text-xl sm:text-3xl font-bold text-pen-blue hover:scale-110 transition-transform bg-white/40 px-4 py-1 rounded-lg border-2 border-pen-blue/20"
                  >
                    &larr; Back
                  </button>
                  <div className="font-hand text-pen-red text-xl sm:text-3xl pt-2 font-bold transform -rotate-2">Ready for the CET!</div>
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
            reference={zoomedImage.reference}
            onClose={() => setZoomedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lesson501;
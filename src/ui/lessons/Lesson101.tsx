import React, { useState, useEffect } from 'react';

const Lesson101: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [page, setPage] = useState(1);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md overflow-y-auto px-0 sm:px-4 py-0 sm:py-8 flex justify-center items-start">
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
              <span className="font-bold uppercase tracking-widest leading-tight">Language Proficiency (Page {page}/2)</span>
            </div>

            {/* Topic Header */}
            <div className="text-center p-4 mb-2 rounded">
              <h3 className="text-xl sm:text-5xl font-bold">Parts of Speech</h3>
            </div>

            {page === 1 ? (
              <>
                {/* Critical Rule Banner */}
                <div className="bg-rose-50 border-2 border-pen-red p-4 mb-8 rounded shadow-sm">
                  <h3 className="font-hand text-xl sm:text-2xl text-pen-red font-bold underline decoration-2">THE ENTRANCE EXAM REALITY:</h3>
                  <p className="text-base sm:text-lg leading-relaxed mt-1">
                    The SAT, ACT, and CETs will <span className="font-bold underline">never</span> ask you to define a noun. They test your ability to recognize how words <span className="highlight-yellow">function syntactically</span> to expose errors like subject-verb disagreement, ambiguous pronouns, and faulty parallelism.
                  </p>
                </div>

                {/* Main Hierarchy */}
                <div className="mb-10">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-2 underline decoration-pen-blue">1. The Core 5</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ml-2 sm:ml-4 text-sm sm:text-base">
                    <ul className="list-none space-y-4 font-medium">
                      <li>
                        <span className="font-bold text-pen-blue">1. Nouns:</span> People, places, things, or ideas.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Collective Nouns (flock, committee) look plural but are singular. Gerunds (-ing) act as nouns. <br />Ex: The <span className="underline italic">jury</span> has reached <span className="underline">its</span> verdict.</div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">2. Pronouns:</span> Replacements for nouns.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Pronoun-Antecedent Disagreement and Case. <br />Ex: Each student must bring <span className="underline">his or her</span> (not their) book.</div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">3. Verbs:</span> Action or state of being.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Irregular Past Participles. <br />Ex: I have <span className="underline italic">swum</span> (not swam) in this lake before.</div>
                      </li>
                    </ul>
                    <ul className="list-none space-y-4 font-medium mt-4 md:mt-0">
                      <li>
                        <span className="font-bold text-pen-blue">4. Adjectives:</span> Modify nouns or pronouns.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Comparatives vs Superlatives. <br />Ex: Of the two boys, he is the <span className="underline">taller</span> (not tallest).</div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">5. Adverbs:</span> Modify verbs, adjectives, or other adverbs.
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Adjectives where adverbs should be. <br />Ex: He drives <span className="underline italic">carefully</span> (not careful).</div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Lab Section */}
                <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="sticky-note transform sm:-rotate-1">
                    <h3 className="font-hand text-xl sm:text-3xl font-bold mb-3">
                      Error Identification Lab
                    </h3>
                    <div className="space-y-3 font-medium text-xs sm:text-sm">
                      <div className="flex flex-col border-b border-yellow-300/50 pb-2">
                        <span className="pr-2">The flock of wild geese <span className="line-through text-pen-red">fly</span> <span className="font-bold text-green-700">flies</span> south.</span>
                        <span className="text-[11px] text-slate-700 mt-1 italic">Subject "flock" is singular. "Of wild geese" is just noise.</span>
                      </div>
                      <div className="flex flex-col border-b border-yellow-300/50 pb-2">
                        <span className="pr-2">Neither John nor his friends <span className="line-through text-pen-red">was</span> <span className="font-bold text-green-700">were</span> there.</span>
                        <span className="text-[11px] text-slate-700 mt-1 italic">Pronoun "neither/nor" follows the closer subject ("friends").</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/80 border-2 border-blue-200 p-5 sm:p-6 rounded transform sm:rotate-1">
                    <h3 className="font-hand text-xl sm:text-2xl font-bold text-pen-blue mb-2">P1 Strategy:</h3>
                    <ul className="text-[12px] sm:text-sm space-y-3 text-slate-800 leading-tight">
                      <li><span className="font-bold highlight-pink">The "Ly" Check:</span> If a word modifies a verb, it almost always needs an -ly.</li>
                      <li><span className="font-bold highlight-pink">Slash & Burn:</span> Physically cross out "of", "in", and "by" phrases to find the real subject.</li>
                    </ul>
                  </div>
                </div>

                {/* Footer Navigation */}
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
                {/* Page 2 Content */}
                <div className="mb-10">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-2 underline decoration-pen-blue">2. The Structural Glue</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ml-2 sm:ml-4 text-sm sm:text-base">
                    <ul className="list-none space-y-4 font-medium">
                      <li>
                        <span className="font-bold text-pen-blue">6. Prepositions:</span> Show relationship/position (in, of, for, with).
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Idiomatic prepositions. <br />Ex: I am <span className="underline italic">interested in</span> (not to) the project.</div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">7. Conjunctions:</span> Connect words/phrases (FANBOYS).
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Comma splices with conjunctive adverbs. <br />Ex: I left; <span className="underline italic">however</span> (not comma), I returned.</div>
                      </li>
                    </ul>
                    <ul className="list-none space-y-4 font-medium mt-4 md:mt-0">
                      <li>
                        <span className="font-bold text-pen-blue">8. Interjections:</span> Emotional outbursts (Wow!, Ouch).
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: Rare on CETs, but watch for exclamation point misuse in sentence structure.</div>
                      </li>
                      <li>
                        <span className="font-bold text-pen-blue">9. Determiners:</span> Articles (a, an, the) and markers (this, those).
                        <div className="text-pen-red font-hand text-sm sm:text-base ml-4 leading-tight ">Exam Trap: a vs. an. Use "an" before vowel sounds, not just vowel letters. <br />Ex: An <span className="underline italic">hour</span> (correct), A <span className="underline">university</span> (correct).</div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Practice Reps */}
                <div className="mb-10">
                  <h2 className="font-hand text-2xl sm:text-3xl font-bold text-pen-blue mb-4 underline decoration-pen-blue">3. Rapid Fire Reps</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="hand-box">
                      <p className="text-sm italic mb-2">1. The team, along with the coaches, ___ arriving soon.</p>
                      <p className="font-hand text-xl text-pen-red font-bold">&rarr; is <span className="text-xs font-sans text-gray-500 font-normal">(ignore 'along with...')</span></p>
                    </div>
                    <div className="hand-box">
                      <p className="text-sm italic mb-2">2. He didn't do ___ on the test.</p>
                      <p className="font-hand text-xl text-pen-red font-bold">&rarr; well <span className="text-xs font-sans text-gray-500 font-normal">(adverb for 'did')</span></p>
                    </div>
                    <div className="hand-box">
                      <p className="text-sm italic mb-2">3. I have ___ older brother and ___ younger sister.</p>
                      <p className="font-hand text-xl text-pen-red font-bold">&rarr; an / a <span className="text-xs font-sans text-gray-500 font-normal">(determiner check)</span></p>
                    </div>
                    <div className="hand-box">
                      <p className="text-sm italic mb-2">4. Wow! ___ is a beautiful painting.</p>
                      <p className="font-hand text-xl text-pen-red font-bold">&rarr; That <span className="text-xs font-sans text-gray-500 font-normal">(demonstrative determiner)</span></p>
                    </div>
                  </div>
                </div>

                {/* Footer Navigation */}
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
    </div>
  );
};

export default Lesson101;
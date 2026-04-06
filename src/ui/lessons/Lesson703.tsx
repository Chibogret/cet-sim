import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const Lesson703: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-[#fafaf8] w-full max-w-4xl min-h-screen md:min-h-0 bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col font-serif text-neutral-800 leading-relaxed">
        <header className="p-6 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-10 font-sans">
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-1 block">Science Module 703</span>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight italic">Force & Motion</h3>
            </div>
            <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </header>

        <div className="flex-1 p-8 space-y-12 pb-20">
          <p className="text-base text-neutral-600 leading-relaxed">
            Dynamics is the study of why objects move. Instead of just describing the path of a particle, we look at the <span className="font-black text-indigo-600">Forces</span> acting upon it.
          </p>

          <section className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-100 border border-neutral-100 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 w-24 h-24 text-indigo-50/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" /></svg>
            </div>
            
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2 font-sans">
                Newton's Second Law
                <span className="flex-1 h-px bg-neutral-100"></span>
            </h4>
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-4">
                <div className="flex-1 bg-indigo-50/50 p-6 rounded-2xl border-2 border-indigo-100/50">
                    <BlockMath math={"\\vec{F} = m\\vec{a}"} />
                    <p className="text-[11px] text-center text-indigo-400 font-bold uppercase tracking-widest mt-4 font-sans">Force = Mass × Acceleration</p>
                </div>
                <div className="flex-1 text-sm space-y-4">
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 shadow-sm">
                        <strong className="text-indigo-600 block mb-0.5 font-sans">Force (N)</strong>
                        <p className="text-[11px] font-medium opacity-60">Measured in Newtons, representing the interaction.</p>
                    </div>
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 italic font-medium opacity-80 shadow-sm border-l-4 border-indigo-200">
                        "Mass is the resistance to acceleration. A heavier object is harder to nudge."
                    </div>
                </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="p-8 bg-emerald-50/50 border border-emerald-100 rounded-3xl shadow-sm hover:translate-y-[-2px] transition-transform">
                <h4 className="flex items-center gap-2 text-emerald-700 font-black uppercase tracking-widest text-[10px] mb-4 font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    Law I: Inertia
                </h4>
                <p className="text-xs text-emerald-900/70 font-medium leading-relaxed">An object stays at rest or in uniform motion unless acted on by an external net force.</p>
            </section>
            
            <section className="p-8 bg-amber-50/50 border border-amber-100 rounded-3xl shadow-sm hover:translate-y-[-2px] transition-transform">
                <h4 className="flex items-center gap-2 text-amber-700 font-black uppercase tracking-widest text-[10px] mb-4 font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    Law III: Action/Reaction
                </h4>
                <p className="text-xs text-amber-900/70 font-medium leading-relaxed">For every action force, there is a reaction force of equal magnitude and opposite direction.</p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-100 text-center font-sans">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-neutral-300">End of Physics Module</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson703;

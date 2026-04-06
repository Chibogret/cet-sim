import React from 'react';

const Lesson501: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-[#fafaf8] w-full max-w-4xl min-h-screen md:min-h-0 bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col font-sans text-neutral-800 leading-relaxed">
        <header className="p-6 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-1 block">Biological Sciences</span>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight italic">Cell Theory</h3>
            </div>
            <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </header>

        <div className="flex-1 p-8 space-y-12 pb-20">
            <header className="py-20 text-center relative border-4 border-emerald-50 rounded-[3rem] bg-emerald-50/20 group">
                <div className="absolute top-0 right-0 p-12 w-32 h-32 text-emerald-50 pointer-events-none group-hover:rotate-12 transition-transform duration-1000 opacity-20">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" /></svg>
                </div>
                <h4 className="text-[10px] font-black underline decoration-emerald-200 decoration-4 underline-offset-8 uppercase tracking-[0.6em] text-emerald-600 mb-6 font-mono">Module 501</h4>
                <h3 className="text-4xl font-black text-neutral-900 tracking-tighter leading-none mb-4 italic italic-serif">The Cell Matrix</h3>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest leading-relaxed">The Fundamental Unit of Life</p>
            </header>

            <section className="max-w-xl mx-auto space-y-10">
                <div className="p-8 bg-white border-2 border-emerald-50 shadow-2xl shadow-emerald-50 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 w-16 h-16 text-emerald-100 pointer-events-none group-hover:scale-110 transition-transform">
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" /></svg>
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4 border-b border-emerald-50 pb-2">The Components</h4>
                    <div className="space-y-4">
                        <div className="flex gap-4 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                            <span className="text-neutral-900 font-black text-sm uppercase italic">The Nucleus: The Hub of Info.</span>
                        </div>
                        <div className="flex gap-4 items-center pl-4 border-l-2 border-emerald-50">
                            <p className="text-xs text-neutral-500 italic leading-relaxed font-serif">Encases the genetic blueprint (DNA), the very recipe of existence.</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
                            <span className="text-neutral-900 font-black text-sm uppercase italic">Mitochondria: The Powerhouse.</span>
                        </div>
                        <div className="flex gap-4 items-center pl-4 border-l-2 border-sky-50">
                            <p className="text-xs text-neutral-500 italic leading-relaxed font-serif">Responsible for ATP production, driving cellular processes.</p>
                        </div>
                    </div>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group p-6 bg-emerald-900 border-2 border-emerald-800 rounded-3xl text-emerald-50 shadow-2xl shadow-emerald-500/10 hover:bg-emerald-800 transition-colors">
                       <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-4">Core Process I</h5>
                       <strong className="text-base font-black italic block mb-2 leading-none uppercase tracking-tighter">Photosynthesis</strong>
                       <p className="text-[11px] text-emerald-100 opacity-60 leading-relaxed font-medium italic">Transforming sunlight into sugar, the foundation of almost all living systems on Earth.</p>
                    </div>
                    <div className="p-6 bg-white border-2 border-emerald-50 rounded-3xl shadow-xl shadow-neutral-100 hover:border-emerald-200 transition-all cursor-crosshair">
                       <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-300 mb-4 font-mono">Cell Division</h5>
                       <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-tight italic underline decoration-sky-100 decoration-4 underline-offset-4">Mitosis & Meiosis</p>
                       <p className="text-xs text-neutral-500 mt-2 leading-relaxed">The delicate choreography of reproduction and growth.</p>
                    </div>
                </section>
            </section>

            <div className="text-center py-12 border-t-4 border-double border-emerald-50 opacity-20 hover:opacity-100 transition-opacity font-mono">
                <span className="text-[9px] font-black uppercase tracking-[1em] text-emerald-700">Biology Foundations 501</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson501;

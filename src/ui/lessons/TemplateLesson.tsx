import React from 'react';

const TemplateLesson: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-[#fafaf8] w-full max-w-4xl min-h-screen md:min-h-0 bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
        <header className="p-6 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-1 block">Subject Category</span>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight italic">Bespoke Lesson Title</h3>
            </div>
            <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </header>

        <div className="flex-1 p-8 space-y-12 pb-20">
            <section className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 w-16 h-16 text-indigo-50/20 group-hover:scale-110 transition-transform pointer-events-none">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" /></svg>
                </div>
                <h4 className="text-indigo-600 font-black uppercase tracking-widest text-[10px] mb-4">Core Concepts</h4>
                <p className="text-sm text-neutral-600 mb-6 font-medium italic leading-relaxed">
                    Add your bespoke content here using pure JSX. Since this component handles its own modal, you have total control over line height, typography, and interactive elements.
                </p>
                <div className="flex gap-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-neutral-50 text-neutral-400 uppercase">Interactive Concept</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-neutral-50 text-neutral-400 uppercase">Tactile UI</span>
                </div>
            </section>

            <section className="p-8 bg-amber-50/50 rounded-3xl border border-amber-100 italic">
                <h4 className="text-amber-800 font-bold uppercase tracking-tight text-[10px] mb-3">Design Tip</h4>
                <p className="text-xs text-amber-900/60 leading-relaxed">
                    Create "papers" that feel handcrafted. Use subtle gradients, shadows, and serif fonts where appropriate.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default TemplateLesson;

import React from 'react';

const Lesson1301: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-[#fdfbf7] w-full max-w-4xl min-h-screen md:min-h-0 bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col font-serif text-neutral-800 leading-relaxed">
        <header className="p-6 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-10 font-sans">
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-1 block">Reading Comprehension</span>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight italic">Literary Analysis: Poetry</h3>
            </div>
            <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </header>

        <div className="flex-1 p-8 space-y-12 pb-20">
            <header className="relative py-12 text-center border-y border-neutral-100 bg-neutral-50/30 rounded-3xl overflow-hidden group font-sans">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000 grayscale">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" /></svg>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-neutral-300 mb-6">Literary Arts</h4>
                <h3 className="text-5xl font-black text-neutral-900 tracking-tighter leading-none mb-4 italic italic-serif">Poetry</h3>
                <p className="text-sm text-neutral-400 font-medium italic opacity-80 max-w-sm mx-auto font-serif">"The best words in the best order." — Samuel Taylor Coleridge</p>
            </header>

            <section className="max-w-xl mx-auto space-y-10">
                <div className="relative p-8 bg-white border border-neutral-100 shadow-xl shadow-neutral-50 rounded-2xl group transition-all hover:-translate-y-1">
                    <div className="w-1.5 h-12 bg-indigo-200 absolute -left-0.5 top-8 rounded-full"></div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4 ml-2 font-sans">Core Pillar: Rhythm & Meter</h4>
                    <p className="text-base text-neutral-700 leading-relaxed mb-4 first-letter:text-4xl first-letter:font-black first-letter:mr-2 first-letter:float-left first-letter:text-indigo-600">
                        The heartbeat of a poem. Meter is the structured arrangement of syllables into patterns of stressed and unstressed beats.
                    </p>
                    <div className="pt-4 border-t border-neutral-50 text-[11px] font-mono italic text-neutral-400 transform transition-transform group-hover:translate-x-1">
                        Ex: Iambic Pentameter (da-DUM da-DUM da-DUM...)
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-2 font-sans">Structural Units</h5>
                        <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-white transition-colors shadow-sm">
                            <strong className="text-neutral-900 block mb-1">Stanza</strong>
                            <p className="text-xs text-neutral-500 leading-relaxed italic">A group of lines forming the basic unit in a poem; much like a paragraph in prose.</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-2 font-sans">Devices</h5>
                        <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-white transition-colors shadow-sm">
                            <strong className="text-neutral-900 block mb-1">Imagery</strong>
                            <p className="text-xs text-neutral-500 leading-relaxed italic">Language that evokes the five senses, creating a "mental movie" for the reader.</p>
                        </div>
                    </div>
                </div>

                <section className="bg-neutral-900 p-10 rounded-[2.5rem] text-neutral-100 shadow-2xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 w-24 h-24 text-white/5 opacity-50 group-hover:rotate-45 transition-transform duration-1000">
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" /></svg>
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-6 font-sans">Critical Reading Hint</h4>
                    <p className="text-lg font-bold leading-relaxed italic mb-4 text-white/90">
                        "When analyzing poetry on the exam, don't just look for what it <strong>says</strong> — look for what it <strong>suggests</strong>. Dig for the metaphor."
                    </p>
                    <div className="flex gap-1.5 opacity-30 mt-8">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white"></div>)}
                    </div>
                </section>
            </section>

            <div className="text-center py-12 opacity-20 hover:opacity-50 transition-opacity font-sans">
                <span className="text-[9px] font-black uppercase tracking-[1em] text-neutral-400">Literary Framework 1301</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson1301;

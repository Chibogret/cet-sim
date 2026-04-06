import React from 'react';

const Lesson101: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-[#fafaf8] w-full max-w-4xl min-h-screen md:min-h-0 bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
        <header className="p-6 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-1 block">Language Proficiency</span>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight italic">Parts of Speech</h3>
            </div>
            <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </header>

        <div className="flex-1 p-8 space-y-10">
          <div className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50/50 rounded-r-lg">
            <p className="text-sm italic text-neutral-600 leading-relaxed font-serif">
              The building blocks of any language. Understanding parts of speech is like knowing the basic elements in chemistry; it allows you to see the underlying architecture of every sentence you speak or write.
            </p>
          </div>

          <section>
            <h4 className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs mb-3">
                <span className="w-4 h-[2px] bg-indigo-200"></span>
                Primary Categories
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { name: "Nouns", def: "Names: Person, place, thing, or idea.", ex: "Study, Library, Ambition" },
                    { name: "Pronouns", def: "Substitutes for nouns to avoid repetition.", ex: "He, They, It, Someone" },
                    { name: "Verbs", def: "Actions or states of being.", ex: "Understand, Exist, Synthesize" },
                    { name: "Adjectives", def: "Descriptors for nouns or pronouns.", ex: "Diligent, Eloquent, Nuanced" }
                ].map(item => (
                    <div key={item.name} className="p-4 bg-white border border-neutral-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <span className="block text-indigo-600 font-bold mb-1">{item.name}</span>
                        <p className="text-xs text-neutral-500 mb-2">{item.def}</p>
                        <span className="text-[10px] font-mono bg-neutral-50 px-2 py-0.5 rounded text-neutral-400">Ex: {item.ex}</span>
                    </div>
                ))}
            </div>
          </section>

          <section className="relative p-6 rounded-2xl bg-amber-50/50 border border-amber-100 overflow-hidden">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 text-amber-200 opacity-20 pointer-events-none">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" /></svg>
            </div>
            <h4 className="text-amber-800 font-black uppercase tracking-tight text-sm mb-3">The Critical Connection</h4>
            <p className="text-sm text-amber-900/70 leading-relaxed font-medium italic">
                "Wait, can a word be more than one part of speech?" 
                <br/><br/>
                <strong>Absolutely.</strong> Many words shift categories depending on context. Take the word <strong>'Study'</strong>:
                <br/>
                • Noun: "Her <em>study</em> of history was deep."
                <br/>
                • Verb: "She decided to <em>study</em> every night."
            </p>
          </section>

          <section className="space-y-4 pb-12">
            <h4 className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs mb-1">
                <span className="w-4 h-[2px] bg-indigo-200"></span>
                Modifiers & Connections
            </h4>
            <div className="space-y-2">
                <div className="flex gap-4 p-4 rounded-xl border border-neutral-100 bg-white shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg shrink-0 font-black italic">Adv</div>
                    <div>
                       <span className="text-xs font-bold uppercase tracking-tight text-neutral-800">Adverbs</span>
                       <p className="text-[11px] text-neutral-500 leading-snug mt-0.5">Modify verbs, adjectives, or other adverbs. They often (but not always!) end in -ly.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl border border-neutral-100 bg-white shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg shrink-0 font-black italic">Pre</div>
                    <div>
                       <span className="text-xs font-bold uppercase tracking-tight text-neutral-800">Prepositions</span>
                       <p className="text-[11px] text-neutral-500 leading-snug mt-0.5">Show relationships of space, time, or direction. Think of anything a squirrel can do to a tree (up, on, around, under).</p>
                    </div>
                </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Lesson101;

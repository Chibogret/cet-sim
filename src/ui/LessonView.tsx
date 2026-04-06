import React, { useState } from 'react';
import { motion } from 'motion/react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Lesson } from '../types/lesson';

interface LessonViewProps {
  lesson: Lesson;
  onClose: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onClose }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  // Simple "Markdown" parser for basic headers and bold text
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold mt-6 mb-2 text-neutral-900 uppercase tracking-tight">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold mt-4 mb-1 text-indigo-600">{line.replace(/\*\*/g, '')}</p>;
      }
      
      // Basic Katex detection for formulas like $F=ma$
      const parts = line.split(/(\$[^\$]+\$)/g);
      return (
        <p key={i} className="text-base text-neutral-700 leading-relaxed mb-3">
          {parts.map((part, pi) => {
            if (part.startsWith('$') && part.endsWith('$')) {
              return <InlineMath key={pi} math={part.slice(1, -1)} />;
            }
            // Handle inline bolding within lines
            const subparts = part.split(/(\*\*[^\*]+\*\*)/g);
            return subparts.map((sp, spi) => {
                if (sp.startsWith('**') && sp.endsWith('**')) {
                    return <strong key={spi}>{sp.replace(/\*\*/g, '')}</strong>;
                }
                return sp;
            });
          })}
        </p>
      );
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-[#fafaf8] w-full h-full md:h-auto md:max-w-3xl md:max-h-full overflow-hidden flex flex-col md:rounded-3xl shadow-2xl border border-white">
        <header className="p-4 md:p-6 border-b border-neutral-200 flex justify-between items-center bg-white">
          <div>
             <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded">
                    {lesson.subject}
                </span>
                <span className="text-[9px] md:text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{lesson.category}</span>
             </div>
             <h2 className="text-xl md:text-2xl font-black text-neutral-900 uppercase tracking-tight leading-none">{lesson.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 font-serif">
          <div className="max-w-2xl mx-auto">
            {lesson.Component ? (
                <lesson.Component onClose={onClose} />
            ) : (
                renderContent(lesson.content)
            )}

            {lesson.highlights && (
                <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-wrap gap-2">
                    {lesson.highlights.map(h => (
                        <span key={h} className="text-[10px] font-black bg-white border border-neutral-200 text-neutral-500 px-3 py-1 rounded-full uppercase tracking-widest">
                            {h}
                        </span>
                    ))}
                </div>
            )}
            
            <div className="mt-12 bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-6">
                {!showQuiz ? (
                    <div className="text-center">
                        <h4 className="text-indigo-900 font-black uppercase tracking-widest mb-2">Check Your Understanding</h4>
                        <p className="text-sm text-indigo-700 mb-4 opacity-70 italic">Quick check to reinforce what you've just read.</p>
                        <button 
                            onClick={() => setShowQuiz(true)}
                            className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                        >
                            Take Mini-Quiz
                        </button>
                    </div>
                ) : (
                    <div>
                        {lesson.quiz && lesson.quiz[0] && (
                            <div className="space-y-4">
                                <h4 className="text-indigo-900 font-black uppercase tracking-tight text-lg mb-4">{lesson.quiz[0].question}</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {lesson.quiz[0].options.map(option => (
                                        <button 
                                            key={option}
                                            onClick={() => setQuizAnswer(option)}
                                            className={`p-4 rounded-xl text-left font-bold transition-all border-2 ${
                                                quizAnswer === option 
                                                ? (option === lesson.quiz[0].answer ? 'bg-green-100 border-green-500 text-green-900' : 'bg-red-100 border-red-500 text-red-900')
                                                : 'bg-white border-neutral-100 hover:border-indigo-300 text-neutral-600'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                {quizAnswer && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-xl text-sm ${quizAnswer === lesson.quiz[0].answer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
                                    >
                                        <p className="font-bold mb-1 uppercase tracking-widest text-[10px]">
                                            {quizAnswer === lesson.quiz[0].answer ? 'Correct!' : 'Incorrect'}
                                        </p>
                                        <p>{lesson.quiz[0].explanation}</p>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

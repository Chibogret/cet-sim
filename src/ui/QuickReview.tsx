import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, SubjectType } from '../types/question';
import { questionsBank } from '../data/questions_bank';
import { renderTextWithFormatting, deservesFigureBelow, MediaRenderer, getInstruction } from './SharedFormatting';

interface QuickReviewProps {
  onExit: () => void;
}

export const QuickReview: React.FC<QuickReviewProps> = ({ onExit }) => {
  const [batchCount, setBatchCount] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Whiter, more textured paper SVG filter
  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  const generateQuestions = (batches: number) => {
    const subjects: SubjectType[] = ['Language Proficiency', 'Science', 'Mathematics', 'Reading Comprehension'];
    let newQuestions: Question[] = [];

    for (let i = 0; i < batches; i++) {
      subjects.forEach(subject => {
        const subjectQuestions = questionsBank.filter(q => q.subject === subject);
        if (subjectQuestions.length > 0) {
          const randomIndex = Math.floor(Math.random() * subjectQuestions.length);
          newQuestions.push(subjectQuestions[randomIndex]);
        }
      });
    }

    // Shuffle the final list to mix subjects
    newQuestions = newQuestions.sort(() => Math.random() - 0.5);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setShowFeedback(false);
    setIsFinished(false);
  };

  useEffect(() => {
    generateQuestions(batchCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchCount]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option: string) => {
    if (showFeedback || isFinished) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  if (!currentQuestion && !isFinished) return null;

  const { instruction, typeHeader, isFilipino } = currentQuestion ? getInstruction(currentQuestion) : { instruction: '', typeHeader: '', isFilipino: false };

  return (
    <div className="flex flex-col h-screen bg-black text-black font-serif overflow-hidden select-none">
      {/* Header */}
      <header className="bg-white border-b-2 border-black p-4 flex justify-between items-center z-10 shrink-0">
        <div>
          <h1 className="font-bold uppercase tracking-widest text-lg">Quick Review Mode</h1>
          <p className="text-xs italic opacity-70">Immediate Feedback Active</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest">Batches (x4 items):</span>
            <select 
              value={batchCount} 
              onChange={(e) => setBatchCount(Number(e.target.value))}
              className="border border-black p-1 text-sm bg-white outline-none"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => generateQuestions(batchCount)}
            className="text-[10px] border border-black px-3 py-1.5 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            New Set
          </button>
          <button 
            onClick={onExit}
            className="text-[10px] border border-red-700 text-red-700 px-3 py-1.5 font-bold uppercase tracking-widest hover:bg-red-700 hover:text-white transition-colors"
          >
            Exit
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative" style={{ backgroundImage: paperTexture, backgroundSize: '200px 200px' }}>
        <div className="max-w-2xl mx-auto p-6 md:p-12 pb-32">
          
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Progress and Subject */}
                <div className="border-b-2 border-black pb-2 flex justify-between items-end">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Section</div>
                    <div className="font-bold text-lg uppercase tracking-wider">{currentQuestion.subject}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Item</div>
                    <div className="font-bold text-lg">{currentIndex + 1} / {questions.length}</div>
                  </div>
                </div>

                {/* Instruction */}
                {instruction && (
                  <div className="text-sm leading-relaxed border-l-4 border-black pl-4 py-1 bg-black/5">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">{typeHeader}</div>
                    <div>
                      <span className="font-bold">{isFilipino ? 'Panuto: ' : 'Instructions: '}</span>
                      {instruction}
                    </div>
                  </div>
                )}

                {/* Media (Passage / Figure) */}
                {currentQuestion.passage && (
                  <div className="border border-black/20 bg-black/5 p-6 mb-6">
                    <MediaRenderer 
                      type="text" 
                      content={currentQuestion.passage} 
                      passageType={currentQuestion.passageType} 
                    />
                  </div>
                )}
                {currentQuestion.figure && !deservesFigureBelow(currentQuestion) && (
                  <MediaRenderer type="image" content={currentQuestion.figure} />
                )}

                {/* Question */}
                <div className="text-base leading-relaxed text-justify">
                  {renderTextWithFormatting(currentQuestion.question)}
                </div>

                {currentQuestion.figure && deservesFigureBelow(currentQuestion) && (
                  <MediaRenderer type="image" content={currentQuestion.figure} />
                )}

                {/* Options (Simulation Style) */}
                <div className="space-y-3 pt-4">
                  {currentQuestion.options.map((option, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    const isSelected = answers[currentQuestion.id] === option;
                    const isCorrect = option === currentQuestion.correctAnswer;
                    
                    let bgStyle = "bg-transparent";
                    let borderStyle = "border-black/30 hover:border-black";
                    let textStyle = "text-black";

                    if (showFeedback) {
                      if (isCorrect) {
                        bgStyle = "bg-green-100";
                        borderStyle = "border-green-600";
                      } else if (isSelected && !isCorrect) {
                        bgStyle = "bg-red-100";
                        borderStyle = "border-red-600";
                      } else {
                        borderStyle = "border-black/10 opacity-50";
                      }
                    } else if (isSelected) {
                      bgStyle = "bg-black/10";
                      borderStyle = "border-black";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        disabled={showFeedback}
                        className={`w-full text-left p-4 border-2 transition-all flex items-start gap-4 ${bgStyle} ${borderStyle} ${textStyle}`}
                      >
                        <div className={`w-6 h-6 shrink-0 rounded-full border border-black flex items-center justify-center text-xs font-bold ${isSelected && !showFeedback ? 'bg-black text-white' : ''}`}>
                          {letter}
                        </div>
                        <div className="pt-0.5 whitespace-pre-wrap leading-relaxed">
                          {renderTextWithFormatting(option.replace(/^(\(?[A-E]\)[\.\s-]*|[A-E]\.[\s-]*)/, '').trim() || option)}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Section */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-8 border-t-2 border-black pt-6"
                    >
                      <div className="bg-black text-white p-6">
                        <h3 className={`text-xl font-bold uppercase tracking-widest mb-4 ${answers[currentQuestion.id] === currentQuestion.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                          {answers[currentQuestion.id] === currentQuestion.correctAnswer ? 'Correct' : 'Incorrect'}
                        </h3>
                        <div className="text-sm leading-relaxed mb-6">
                          <strong className="block mb-2 uppercase tracking-widest text-[10px] opacity-70">Explanation</strong>
                          {renderTextWithFormatting(currentQuestion.explanation)}
                        </div>
                        <button
                          onClick={handleNext}
                          className="w-full bg-white text-black py-3 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                          {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">Review Complete</h2>
                <div className="border-y-2 border-black py-8 mb-8">
                  <div className="text-6xl font-bold mb-2">
                    {questions.filter(q => answers[q.id] === q.correctAnswer).length} / {questions.length}
                  </div>
                  <div className="text-xs uppercase tracking-widest opacity-70">Total Score</div>
                </div>
                
                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                  <button
                    onClick={() => generateQuestions(batchCount)}
                    className="border-2 border-black py-3 font-bold uppercase tracking-widest bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    Start Another Set
                  </button>
                  <button
                    onClick={onExit}
                    className="border-2 border-black py-3 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                  >
                    Return to Main Menu
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
};

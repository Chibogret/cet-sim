import React from 'react';
import { Question } from '../types/question';

interface AnswerSheetProps {
  questions: Question[];
  answers: Record<string, string>;
  crossouts: Record<string, string>;
  changesRemaining: number;
  onAnswer: (questionId: string, answer: string) => void;
  quickFeedback?: boolean;
}

export const AnswerSheet: React.FC<AnswerSheetProps> = ({ questions, answers, crossouts, changesRemaining, onAnswer, quickFeedback }) => {
  // Whiter, more textured paper SVG filter
  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <div
      data-testid="answer-sheet"
      className="w-full h-full overflow-y-auto bg-white md:border-l border-black p-4 font-serif text-black flex flex-col relative"
      style={{
        backgroundImage: paperTexture,
        backgroundSize: '200px 200px',
      }}
    >
      <div className="text-center border-b border-black pb-2 mb-4">
        <h3 className="font-bold uppercase tracking-widest text-sm">Answer Sheet</h3>
        <p className="text-[10px] italic">Shade circles completely. Mark with an X to change. Max {changesRemaining} changes remaining.</p>
      </div>

      <div className="flex-1 space-y-3 md:space-y-2 max-w-xs mx-auto w-full pb-20">
        {questions.map((q, index) => {
          const hasAnswered = Boolean(answers[q.id]);
          const isCorrect = hasAnswered && answers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
          const showFeedback = quickFeedback && hasAnswered;

          return (
            <div key={q.id} className="flex items-center gap-4 md:gap-2 justify-center md:justify-start">
              <span className="w-6 text-right font-bold text-sm md:text-xs">{index + 1}.</span>
              <div className="flex gap-1 md:gap-1">
                {q.options.map((option, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const isSelected = answers[q.id] === option;
                  const isCrossedOut = crossouts[q.id] === option;
                  const disableBtn = Boolean(answers[q.id] && answers[q.id] !== option && changesRemaining < 1);
                  const isCorrectOption = option.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                  let feedbackState = '';
                  if (showFeedback) {
                    if (isSelected && isCorrect) {
                      feedbackState = 'text-white before:bg-green-700 before:border-green-700';
                    } else if (isSelected && !isCorrect) {
                      feedbackState = 'text-white before:bg-red-600 before:border-red-600';
                    } else if (isCorrectOption && !isCorrect) {
                      feedbackState = 'text-white before:bg-green-700 before:border-green-700';
                    }
                  }

                  const baseClasses = 'w-11 h-11 rounded-full flex items-center justify-center text-xs transition-colors relative shrink-0 before:absolute before:w-9 before:h-9 before:rounded-full before:border before:transition-colors';

                  let stateClasses: string;
                  if (feedbackState) {
                    stateClasses = feedbackState;
                  } else if (isSelected || isCrossedOut) {
                    stateClasses = 'text-white before:bg-black before:border-black';
                  } else {
                    stateClasses = 'text-black before:bg-transparent before:border-black';
                  }

                  const interactionClasses = showFeedback || disableBtn ? 'cursor-not-allowed opacity-80' : 'hover:bg-gray-200';

                  return (
                    <button
                      key={letter}
                      data-testid={`answer-${index + 1}-${letter}`}
                      onClick={() => {
                        if (!disableBtn && !showFeedback) onAnswer(q.id, option);
                      }}
                      disabled={disableBtn || showFeedback}
                      className={`${baseClasses} ${stateClasses} ${interactionClasses}`}
                    >
                      <span className="relative z-10">
                        {!(isSelected || isCrossedOut || (showFeedback && isCorrectOption && !isCorrect)) && letter}
                      </span>
                      {isCrossedOut && (
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 pointer-events-none z-20" viewBox="0 0 100 100">
                          <line x1="15" y1="15" x2="85" y2="85" stroke="white" strokeWidth="10" strokeLinecap="round" />
                          <line x1="85" y1="15" x2="15" y2="85" stroke="white" strokeWidth="10" strokeLinecap="round" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

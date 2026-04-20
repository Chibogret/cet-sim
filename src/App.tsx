import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { useExamEngine } from './engine/examEngine';
import { useSheetEngine } from './engine/sheetEngine';
import { useTelemetry } from './hooks/useTelemetry';
import { PaperView } from './ui/PaperView';
import { AnswerSheet } from './ui/AnswerSheet';
import { LandingPage } from './ui/LandingPage';
import { TimerBar } from './ui/TimerBar';

import { DailyStudy } from './ui/DailyStudy';
import { QuickReview } from './ui/QuickReview';

export default function App() {
  const {
    examState,
    currentSection,
    currentSectionGroups,
    dailyQuestions,
    sectionQuestions,
    timeLeft,
    timerActive,
    fatigueLevel,
    startExam,
    nextSection,
    toggleTimer,
    setTimeLeft,
    setExamState,
    currentSectionIndex,
    config,
    setConfig
  } = useExamEngine();

  const [localConfig, setLocalConfig] = useState(config);

  const { logEvent, clearTelemetry } = useTelemetry();

  const {
    answers,
    crossouts,
    changesRemaining,
    getAnswer,
    setAnswer,
    clearAllAnswers,
    getScore
  } = useSheetEngine();

  const [proctorPenalty, setProctorPenalty] = useState(false);
  const [appMode, setAppMode] = useState<'exam' | 'study' | 'quick-review'>('exam');

  // Whiter, more textured paper SVG filter
  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && examState === 'running') {
        setTimeLeft(prev => Math.max(0, prev - 5));
        setProctorPenalty(true);
        logEvent('PROCTOR_PENALTY', { reason: 'TAB_HIDDEN' });
      } else if (!document.hidden && examState === 'running') {
        logEvent('PROCTOR_RESUME', { reason: 'TAB_VISIBLE' });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [examState, setTimeLeft, logEvent]);

  React.useEffect(() => {
    if (examState === 'running') {
      logEvent('SECTION_START', { sectionIndex: currentSectionIndex, sectionName: currentSection?.name || 'Unknown' });
    }
  }, [currentSectionIndex, examState, logEvent, currentSection]);

  const handleStartExam = () => {
    clearTelemetry();
    logEvent('EXAM_START', { config: localConfig });
    clearAllAnswers();
    startExam(localConfig);
  };

  const getAIPromptData = () => {
    const allQuestions = dailyQuestions;

    const correct = allQuestions.filter(q => {
      const userAns = answers[q.id];
      return userAns?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    });

    const incorrect = allQuestions.filter(q => {
      const userAns = answers[q.id];
      return userAns && userAns.trim().toLowerCase() !== q.correctAnswer.trim().toLowerCase();
    });

    const unanswered = allQuestions.filter(q => !answers[q.id]);

    const deduction = config.rightMinusWrong ? Math.floor(incorrect.length / 4) : 0;
    const finalScore = correct.length - deduction;

    const promptText = `
You are a veteran review professor specializing in Philippine college entrance examinations (UPCAT, ACET, DCAT, USTET).
Your audience consists of mature students preparing for rigorous academic hurdles. 
You are direct, precise, and academic. You do not use emojis. You do not give empty praise or use corny techniques.

Your primary task is to present this feedback visually. DO NOT output a wall of text.

Generate a visual Performance Dashboard. Include brief explanations of the mistakes made. Add a disclaimer that this is an ai-generated info so triple-check and review well.
Assume right minus wrong in some exams.
---

EXAM SESSION RESULTS
Total Items   : ${allQuestions.length}
Correct       : ${correct.length}
Wrong         : ${incorrect.length}
Unanswered    : ${unanswered.length}
Deduction     : ${deduction} (RMW: ${config.rightMinusWrong ? 'Yes' : 'No'})
Final Score   : ${finalScore}
Raw Score     : ${((finalScore / allQuestions.length) * 100).toFixed(1)}%

FULL QUESTION POOL:
${JSON.stringify(allQuestions, null, 2)}

ERRORS (with student answers):
${JSON.stringify(
      incorrect.map(q => ({
        id: q.id,
        prompt: q.question,
        studentAnswer: answers[q.id],
        correctAnswer: q.correctAnswer,
      })),

      null, 2
    )}

${unanswered.length > 0
        ? `UNANSWERED ITEMS:
${JSON.stringify(unanswered.map(q => ({ id: q.id, prompt: q.question })), null, 2)}`

        : ""}
`.trim();

    return { promptText, correct, incorrect, unanswered, allQuestions, finalScore };
  };

  const handleAnswer = (questionId: string, answer: string) => {
    const currentAnswer = getAnswer(questionId);
    if (currentAnswer === answer) return;

    if (currentAnswer && currentAnswer !== answer) {
      if (crossouts[questionId] || changesRemaining < 1) {
        return; // Unable to change
      }

      // Doubt mechanic: Changing an answer penalizes time
      setTimeLeft(prev => Math.max(0, prev - 5));
      logEvent('ANSWER_CHANGED_PENALTY', { questionId, oldAnswer: currentAnswer, newAnswer: answer });
    }
    logEvent('SELECT_OPTION', { questionId, answer });
    setAnswer(questionId, answer);
  };

  // Determine which exam view to show
  const renderExamContent = () => {
    if (examState === 'start') {
      return (
        <LandingPage
          localConfig={localConfig}
          setLocalConfig={setLocalConfig}
          onStartExam={handleStartExam}
          onStudyMode={() => setAppMode('study')}
          onQuickReview={() => setAppMode('quick-review')}
        />
      );
    }

    if (examState === 'section_end') {
      return (
        <div className="h-screen bg-white flex items-center justify-center font-serif text-black p-4"
          style={{ backgroundImage: paperTexture, backgroundSize: '200px 200px' }}
        >
          <div className="max-w-md border-2 border-black p-8 text-center bg-white">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Time is Up / Section Ended</h2>
            <p className="text-sm mb-6">
              Pencils down. The time for {currentSection?.name} has concluded.
              Please wait for instructions to proceed to the next section.
            </p>
            <button
              onClick={() => {
                logEvent('MANUAL_SECTION_ADVANCE');
                nextSection();
              }}
              className="border border-black px-8 py-2 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Proceed to Next Section
            </button>
          </div>
        </div>
      );
    }

    if (examState === 'finished') {
      const allQuestions = dailyQuestions;
      const correctCount = allQuestions.filter(q => answers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()).length;
      const wrongCount = allQuestions.filter(q => answers[q.id] && answers[q.id].trim().toLowerCase() !== q.correctAnswer.trim().toLowerCase()).length;
      
      const deduction = config.rightMinusWrong ? Math.floor(wrongCount / 4) : 0;
      const finalScore = correctCount - deduction;

      const subjectScores = allQuestions.reduce((acc, q) => {
        if (!acc[q.subject]) acc[q.subject] = { correct: 0, total: 0 };
        acc[q.subject].total++;
        if (answers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
          acc[q.subject].correct++;
        }
        return acc;
      }, {} as Record<string, { correct: number, total: number }>);

      return (
        <div className="h-screen bg-white flex items-center justify-center font-serif text-black p-4"
          style={{ backgroundImage: paperTexture, backgroundSize: '200px 200px' }}
        >
          <div className="max-w-md w-full border-2 border-black p-8 text-center bg-white">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Examination Concluded</h2>
            <p className="text-[10px] uppercase tracking-widest opacity-60 mb-8">Performance Summary Sheet</p>
            
            <div className="space-y-3 mb-8">
              {Object.entries(subjectScores).map(([subject, score]) => (
                <div key={subject} className="flex justify-between items-center border-b border-black/10 pb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-left">{subject}</span>
                  <span className="text-sm font-black tabular-nums">{score.correct} / {score.total}</span>
                </div>
              ))}
              <div className="pt-3 border-t-2 border-black space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Raw Correct</span>
                  <span className="text-sm font-bold tabular-nums">{correctCount} / {allQuestions.length}</span>
                </div>
                {config.rightMinusWrong && (
                  <div className="flex justify-between items-center text-red-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Wrong Deduction (1/4)</span>
                    <span className="text-sm font-bold tabular-nums">-{deduction}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-1 border-t border-black/10">
                  <span className="text-sm font-black uppercase tracking-[0.2em]">Final Adjusted Score</span>
                  <span className="text-xl font-black tabular-nums">{finalScore}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => {
                  const { correct, incorrect, unanswered, allQuestions } = getAIPromptData();

                  const questionsWithAnswers = allQuestions.map((q, i) =>
                    `${i + 1}. ${q.question}\nStudent Answer: ${answers[q.id] || '(Unanswered)'}\nCorrect Answer: ${q.correctAnswer}\n`
                  ).join('\n---\n');


                  const summary = {
                    total: allQuestions.length,
                    correct: correct.length,
                    wrong: incorrect.length,
                    unanswered: unanswered.length,
                    deduction,
                    finalScore,
                    rightMinusWrong: config.rightMinusWrong
                  };

                  const content = `EXAM RECAP\n==========\n\n${questionsWithAnswers}\n\nSUMMARY JSON:\n${JSON.stringify(summary, null, 2)}`;

                  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.setAttribute("href", url);
                  link.setAttribute("download", `exam_recap_${new Date().toISOString().split('T')[0]}.txt`);
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                  setTimeout(() => URL.revokeObjectURL(url), 100);
                }}
                className="text-[10px] border border-black px-4 py-1.5 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
              >
                Export (.txt)
              </button>
              <button
                onClick={() => {
                  const { promptText, correct, incorrect } = getAIPromptData();
                  const compactData = `Correct:${correct.length},Incorrect:${incorrect.length},Mistakes:${JSON.stringify(incorrect.map(q => ({ id: q.id, u: answers[q.id], c: q.correctAnswer })))}`;

                  const fullContent = `${promptText}\n\n[DATA: ${compactData}]`;
                  const aiLink = `https://claude.ai/new?q=${encodeURIComponent(fullContent).replace(/%20/g, '+')}`;
                  window.open(aiLink, "_blank");
                }}
                className="text-[10px] border border-black px-4 py-1.5 font-bold uppercase tracking-widest bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Send to AI (Yuck)
              </button>
            </div>
            <button
              onClick={() => {
                clearAllAnswers();
                localStorage.clear();
                window.location.reload();
              }}
              className="mt-6 text-[10px] uppercase tracking-widest underline opacity-50 hover:opacity-100 transition-opacity block mx-auto"
            >
              Retake Exam
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="h-screen flex flex-col bg-white font-serif text-black overflow-hidden relative">
        {/* Proctor Penalty Overlay */}
        {proctorPenalty && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-white border-4 border-red-700 p-8 max-w-sm text-center font-serif shadow-2xl">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-red-700 mb-4">Proctor Warning</h2>
              <p className="text-sm mb-6">
                You have left the examination environment. <strong>5 seconds</strong> have been deducted from your time. Further infractions may lead to automatic disqualification.
              </p>
              <button
                onClick={() => setProctorPenalty(false)}
                className="border-2 border-red-700 text-red-700 px-6 py-2 font-bold uppercase tracking-widest hover:bg-red-700 hover:text-white transition-colors w-full"
              >
                Acknowledge
              </button>
            </div>
          </div>
        )}

        <div className="bg-white border-b border-black z-10 sticky top-0"
          style={{ backgroundImage: paperTexture, backgroundSize: '200px 200px' }}
        >
          <div className="px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6">
            <div className="w-full sm:flex-1">
              <TimerBar
                timeLeft={timeLeft}
                totalTime={currentSection.timeLimitSeconds}
                sectionName={currentSection.name}
                timerActive={timerActive}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <button
                onClick={toggleTimer}
                className={`text-[9px] sm:text-[10px] border border-black px-2 sm:px-3 py-1.5 font-bold uppercase tracking-widest transition-all shrink-0 ${!timerActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                {timerActive ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Advance to next section? You cannot return to this section.")) {
                    logEvent('MANUAL_SECTION_ADVANCE');
                    nextSection();
                  }
                }}
                className="text-[9px] sm:text-[10px] border border-black px-2 sm:px-3 py-1.5 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shrink-0"
              >
                Next Section
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Abort current examination? This will lose all progress.")) {
                    setExamState('start');
                  }
                }}
                className="text-[9px] sm:text-[10px] border border-red-700 text-red-700 px-2 sm:px-3 py-1.5 font-bold uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all shrink-0"
              >
                Abort
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar relative">
          <div className="absolute bottom-4 right-4 md:hidden text-[10px] font-bold uppercase tracking-widest bg-white border border-black px-3 py-2 pointer-events-none z-20 opacity-90 flex items-center gap-2">
            <span>Swipe</span>
            <span className="text-lg leading-none">↔</span>
          </div>
          <div className="w-full shrink-0 snap-center md:flex-1 h-full">
            <PaperView
              groups={currentSectionGroups}
              fatigueLevel={fatigueLevel}
            />
          </div>
          <div className="w-full shrink-0 snap-center md:w-64 h-full">
            <AnswerSheet
              questions={sectionQuestions}
              answers={answers}
              crossouts={crossouts}
              changesRemaining={changesRemaining}
              onAnswer={handleAnswer}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <motion.div
        className="w-full h-full overflow-hidden"
      >
        {renderExamContent()}
      </motion.div>

      <AnimatePresence>
        {appMode === 'study' && (
          <motion.div
            key="study-mode"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300, 
              mass: 0.8 
            }}
            className="fixed inset-0 z-50 overflow-hidden"
            style={{ 
              background: '#F7F8FA' 
            }}
          >
            <DailyStudy onExit={() => setAppMode('exam')} />
          </motion.div>
        )}
        {appMode === 'quick-review' && (
          <motion.div
            key="quick-review-mode"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300, 
              mass: 0.8 
            }}
            className="fixed inset-0 z-50 overflow-hidden bg-black"
          >
            <QuickReview onExit={() => setAppMode('exam')} />
          </motion.div>
        )}
      </AnimatePresence>

      <Analytics />
    </div>
  );
}

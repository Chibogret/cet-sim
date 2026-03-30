import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useExamEngine } from './engine/examEngine';
import { useSheetEngine } from './engine/sheetEngine';
import { useDeckEngine } from './engine/deckEngine';
import { useTelemetry } from './hooks/useTelemetry';
import { PaperView } from './ui/PaperView';
import { AnswerSheet } from './ui/AnswerSheet';
import { TimerBar } from './ui/TimerBar';
import { flattenQuestions } from './data/questions';

export default function App() {
  const {
    examState,
    currentSection,
    currentSectionGroups,
    dailyQuestionGroups,
    sectionQuestions,
    timeLeft,
    fatigueLevel,
    startExam,
    nextSection,
    setTimeLeft,
    setTimerActive,
    setExamState,
    currentSectionIndex
  } = useExamEngine();

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
  const { tactics, useTactic, drawTactic, eliminatedOptions, resetDeck } = useDeckEngine();

  const [proctorPenalty, setProctorPenalty] = useState(false);
  const [secondGuessActive, setSecondGuessActive] = useState(false);

  // Whiter, more textured paper SVG filter
  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23ffffff'/%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  React.useEffect(() => {
    setSecondGuessActive(false);
    if (currentSectionIndex > 0 && examState === 'running') {
      drawTactic();
    }
  }, [currentSectionIndex, examState, drawTactic]);

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
    logEvent('EXAM_START');
    clearAllAnswers();
    resetDeck();
    startExam();
  };

  const getAIPromptData = () => {
    const allQuestions = flattenQuestions(dailyQuestionGroups);

    const correct = allQuestions.filter(q => {
      const userAns = answers[q.id];
      return userAns?.trim().toLowerCase() === q.answer.trim().toLowerCase();
    });

    const incorrect = allQuestions.filter(q => {
      const userAns = answers[q.id];
      return userAns && userAns.trim().toLowerCase() !== q.answer.trim().toLowerCase();
    });

    const unanswered = allQuestions.filter(q => !answers[q.id]);

    const score = allQuestions.length > 0
      ? ((correct.length / allQuestions.length) * 100).toFixed(1)
      : "0.0";

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
Raw Score     : ${score}%

FULL QUESTION POOL:
${JSON.stringify(allQuestions, null, 2)}

ERRORS (with student answers):
${JSON.stringify(
      incorrect.map(q => ({
        id: q.id,
        prompt: q.prompt,
        studentAnswer: answers[q.id],
        correctAnswer: q.answer,
      })),
      null, 2
    )}

${unanswered.length > 0
        ? `UNANSWERED ITEMS:
${JSON.stringify(unanswered.map(q => ({ id: q.id, prompt: q.prompt })), null, 2)}`
        : ""}
`.trim();

    return { promptText, correct, incorrect, unanswered, allQuestions, score };
  };

  if (examState === 'start') {
    return (
      <>
        <div className="h-screen bg-white flex items-center justify-center font-serif text-black p-4"
          style={{ backgroundImage: paperTexture, backgroundSize: '200px 200px' }}
        >
          <div className="max-w-md border-2 border-black p-8 text-center bg-white shadow-sm relative">
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-4">CET Simulator</h1>
          <p className="text-sm mb-6 text-justify">
            INSTRUCTIONS: This examination consists of multiple sections. You will be timed per section.
            Do not turn the page until instructed to do so. Shade your answers completely on the provided answer sheet.
            Any form of cheating, including leaving the exam tab, will result in immediate disqualification or time penalties.
          </p>
          <div className="mb-8 p-3 border border-dotted border-black text-[10px] uppercase tracking-tighter opacity-70">
            Daily Exam Mode: Active. No customization permitted. Standard Rules Apply.
          </div>
          <button
            onClick={handleStartExam}
            className="border border-black px-8 py-2 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Begin Examination
          </button>
        </div>
      </div>
      <Analytics />
    </>
    );
  }

  if (examState === 'section_end') {
    return (
      <>
        <div className="h-screen bg-white flex items-center justify-center font-serif text-black p-4"
          style={{ backgroundImage: paperTexture, backgroundSize: '200px 200px' }}
        >
          <div className="max-w-md border-2 border-black p-8 text-center bg-white shadow-sm">
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
      <Analytics />
    </>
    );
  }

  if (examState === 'finished') {
    const allQuestions = flattenQuestions(dailyQuestionGroups);
    const totalScore = getScore(allQuestions);
    return (
      <>
        <div className="h-screen bg-white flex items-center justify-center font-serif text-black p-4"
          style={{ backgroundImage: paperTexture, backgroundSize: '200px 200px' }}
        >
          <div className="max-w-md border-2 border-black p-8 text-center bg-white shadow-sm">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Examination Concluded</h2>
          <p className="text-sm mb-6">
            Please submit your test booklets and answer sheets.
          </p>
          <div className="border-t border-b border-black py-4 mb-6">
            <p className="text-lg font-bold">Raw Score: {totalScore} / {allQuestions.length}</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => {
                const { correct, incorrect, unanswered, allQuestions } = getAIPromptData();

                const questionsWithAnswers = allQuestions.map((q, i) =>
                  `${i + 1}. ${q.prompt}\nStudent Answer: ${answers[q.id] || '(Unanswered)'}\nCorrect Answer: ${q.answer}\n`
                ).join('\n---\n');

                const summary = {
                  total: allQuestions.length,
                  correct: correct.length,
                  wrong: incorrect.length,
                  unanswered: unanswered.length
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
                const compactData = `Correct:${correct.length},Incorrect:${incorrect.length},Mistakes:${JSON.stringify(incorrect.map(q => ({ id: q.id, u: answers[q.id], c: q.answer })))}`;
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
      <Analytics />
    </>
    );
  }

  const handleAnswer = (questionId: string, answer: string) => {
    const currentAnswer = getAnswer(questionId);
    if (currentAnswer === answer) return;

    if (currentAnswer && currentAnswer !== answer) {
      if (crossouts[questionId] || changesRemaining <= 0) {
        return; // Unable to change
      }

      if (secondGuessActive) {
        setSecondGuessActive(false);
        logEvent('USE_TACTIC', { tactic: 'Second Guess', effect: 'penalty_prevented' });
        // No time penalty applied
      } else {
        // Doubt mechanic: Changing an answer penalizes time
        setTimeLeft(prev => Math.max(0, prev - 5));
        logEvent('ANSWER_CHANGED_PENALTY', { questionId, oldAnswer: currentAnswer, newAnswer: answer });
      }
    }
    logEvent('SELECT_OPTION', { questionId, answer });
    setAnswer(questionId, answer);
  };

  return (
    <>
      <div className="h-screen flex flex-col bg-white font-serif text-black overflow-hidden relative">
        {/* Proctor Penalty Overlay */}
        {proctorPenalty && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
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

      <div className="p-4 bg-white border-b border-black shadow-sm z-10"
        style={{ backgroundImage: paperTexture, backgroundSize: '200px 200px' }}
      >
        <TimerBar
          timeLeft={timeLeft}
          totalTime={currentSection.timeLimitSeconds}
          sectionName={currentSection.name}
        />

        {/* Tactics Bar */}
        <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[10px] font-bold uppercase tracking-widest mr-2 self-center shrink-0">Cognitive Tactics:</span>
          {tactics.map((tactic, i) => (
            <button
              key={`${tactic}-${i}`}
              onClick={() => {
                if (tactic === 'Time Borrow') {
                  setTimeLeft(prev => prev + 15);
                  useTactic(tactic);
                  logEvent('USE_TACTIC', { tactic, effect: '+15s' });
                } else if (tactic === 'Process of Elimination') {
                  // Find first unanswered question in current section that doesn't already have options eliminated
                  const unanswered = sectionQuestions.find(q => !answers[q.id] && (!eliminatedOptions[q.id] || eliminatedOptions[q.id].length === 0));
                  if (unanswered) {
                    const incorrect = unanswered.options
                      .filter(o => !o.startsWith(unanswered.answer))
                      .map(o => o.charAt(0));
                    // Pick 2 random incorrect
                    const toEliminate = incorrect.sort(() => 0.5 - Math.random()).slice(0, 2);
                    useTactic(tactic, { questionId: unanswered.id, incorrectOptions: toEliminate });
                    logEvent('USE_TACTIC', { tactic, questionId: unanswered.id, eliminated: toEliminate });
                  } else {
                    alert("No unanswered questions in this section for Process of Elimination.");
                  }
                } else if (tactic === 'Pattern Insight') {
                  // Highlight a likely answer (just visual, we can implement later or just consume it)
                  useTactic(tactic);
                  alert("Pattern Insight: The most common answer historically is 'C'.");
                  logEvent('USE_TACTIC', { tactic, effect: 'highlight_c' });
                } else if (tactic === 'Second Guess') {
                  setSecondGuessActive(true);
                  useTactic(tactic);
                  alert("Second Guess active: Your next answer change will not incur a time penalty.");
                  logEvent('USE_TACTIC', { tactic, effect: 'activated' });
                } else if (tactic === 'Skip Bank') {
                  const unanswered = sectionQuestions.find(q => !answers[q.id]);
                  if (unanswered) {
                    useTactic(tactic);
                    const el = document.getElementById(`q-${unanswered.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    logEvent('USE_TACTIC', { tactic, scrolledTo: unanswered.id });
                  } else {
                    alert("No unanswered questions to locate.");
                  }
                } else {
                  useTactic(tactic);
                  logEvent('USE_TACTIC', { tactic });
                }
              }}
              className="text-[10px] border border-black px-2 py-1 hover:bg-black hover:text-white transition-colors shrink-0"
            >
              {tactic}
            </button>
          ))}
          {tactics.length === 0 && (
            <span className="text-[10px] italic opacity-50 self-center shrink-0">No tactics remaining.</span>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar relative">
        <div className="absolute bottom-4 right-4 md:hidden text-[10px] font-bold uppercase tracking-widest bg-white border border-black px-3 py-2 pointer-events-none z-20 opacity-90 shadow-sm flex items-center gap-2">
          <span>Swipe</span>
          <span className="text-lg leading-none">↔</span>
        </div>
        <div className="w-full shrink-0 snap-center md:flex-1 h-full">
          <PaperView
            groups={currentSectionGroups}
            fatigueLevel={fatigueLevel}
            eliminatedOptions={eliminatedOptions}
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
    <Analytics />
  </>
  );
}

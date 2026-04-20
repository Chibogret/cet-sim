import { useState, useEffect, useRef } from 'react';

export function useSheetEngine() {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('curve_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [crossouts, setCrossouts] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('curve_crossouts');
    return saved ? JSON.parse(saved) : {};
  });

  const [changesRemaining, setChangesRemaining] = useState<number>(() => {
    const saved = localStorage.getItem('curve_changes');
    return saved ? parseInt(saved, 10) : 3;
  });

  const answersRef = useRef(answers);
  const crossoutsRef = useRef(crossouts);
  const changesRef = useRef(changesRemaining);

  useEffect(() => {
    answersRef.current = answers;
    crossoutsRef.current = crossouts;
    changesRef.current = changesRemaining;
    localStorage.setItem('curve_answers', JSON.stringify(answers));
    localStorage.setItem('curve_crossouts', JSON.stringify(crossouts));
    localStorage.setItem('curve_changes', changesRemaining.toString());
  }, [answers, crossouts, changesRemaining]);

  // Guaranteed save on tab close / hide
  useEffect(() => {
    const handleUnloadOrHide = () => {
      localStorage.setItem('curve_answers', JSON.stringify(answersRef.current));
      localStorage.setItem('curve_crossouts', JSON.stringify(crossoutsRef.current));
      localStorage.setItem('curve_changes', changesRef.current.toString());
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleUnloadOrHide();
      }
    };

    window.addEventListener('beforeunload', handleUnloadOrHide);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleUnloadOrHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const getAnswer = (questionId: string) => answersRef.current[questionId];

  const setAnswer = (questionId: string, answer: string) => {
    const currentAnswer = answers[questionId];
    if (currentAnswer && currentAnswer !== answer) {
      setCrossouts(c => ({ ...c, [questionId]: currentAnswer }));
      setChangesRemaining(cr => Math.max(0, cr - 1));
    }
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const clearAllAnswers = () => {
    setAnswers({});
    setCrossouts({});
    setChangesRemaining(3);
    answersRef.current = {};
    crossoutsRef.current = {};
    changesRef.current = 3;
  };

  const removeAnswer = (questionId: string) => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
  };

  const getScore = (questions: {id: string, answer: string}[]) => {
    let correct = 0;
    questions.forEach(q => {
      const userAnswer = answers[q.id];
      if (!userAnswer) return;
      
      const normalizedUser = userAnswer.trim().toLowerCase();
      const normalizedCorrect = q.answer.trim().toLowerCase();
      
      if (normalizedUser === normalizedCorrect) {
        correct++;
      }
    });
    return correct;
  };

  return {
    answers,
    crossouts,
    changesRemaining,
    getAnswer,
    setAnswer,
    removeAnswer,
    clearAllAnswers,
    getScore
  };
}

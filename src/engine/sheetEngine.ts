import { useState, useEffect, useRef } from 'react';

const loadStoredRecord = (key: string): Record<string, string> => {
  const saved = localStorage.getItem(key);
  if (!saved) return {};

  try {
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    );
  } catch {
    localStorage.removeItem(key);
    return {};
  }
};

const loadStoredCount = (key: string, fallback: number): number => {
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;

  const parsed = Number.parseInt(saved, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function useSheetEngine() {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    return loadStoredRecord('curve_answers');
  });

  const [crossouts, setCrossouts] = useState<Record<string, string>>(() => {
    return loadStoredRecord('curve_crossouts');
  });

  const [changesRemaining, setChangesRemaining] = useState<number>(() => {
    return loadStoredCount('curve_changes', 3);
  });

  const answersRef = useRef(answers);
  const crossoutsRef = useRef(crossouts);
  const changesRef = useRef(changesRemaining);
  const skipNextPersistRef = useRef(false);

  useEffect(() => {
    answersRef.current = answers;
    crossoutsRef.current = crossouts;
    changesRef.current = changesRemaining;
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      localStorage.removeItem('curve_answers');
      localStorage.removeItem('curve_crossouts');
      localStorage.removeItem('curve_changes');
      return;
    }

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

  const clearAllAnswers = (persist = true) => {
    if (!persist) skipNextPersistRef.current = true;
    setAnswers({});
    setCrossouts({});
    setChangesRemaining(3);
    answersRef.current = {};
    crossoutsRef.current = {};
    changesRef.current = 3;
    if (!persist) {
      localStorage.removeItem('curve_answers');
      localStorage.removeItem('curve_crossouts');
      localStorage.removeItem('curve_changes');
    }
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

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { sections } from '../data/sections';
import { questionGroups as originalQuestionGroups, flattenQuestions } from '../data/questions';

export type ExamState = 'start' | 'running' | 'section_end' | 'finished';

// Simple seeded random for deterministic "Daily" shuffle
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let m = shuffled.length;
  let currSeed = seed;
  while (m) {
    const i = Math.floor(seededRandom(currSeed++) * m--);
    const t = shuffled[m];
    shuffled[m] = shuffled[i];
    shuffled[i] = t;
  }
  return shuffled;
}

export function useExamEngine() {
  const [examState, setExamState] = useState<ExamState>(() => {
    const saved = localStorage.getItem('curve_examState');
    return (saved as ExamState) || 'start';
  });
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(() => {
    const saved = localStorage.getItem('curve_sectionIndex');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [endTime, setEndTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('curve_endTime');
    return saved ? parseInt(saved, 10) : null;
  });
  
  const [timeLeft, setTimeLeftState] = useState(() => {
    const savedEndTime = localStorage.getItem('curve_endTime');
    if (savedEndTime) {
      const remaining = Math.max(0, Math.floor((parseInt(savedEndTime, 10) - Date.now()) / 1000));
      return remaining;
    }
    const savedIndex = localStorage.getItem('curve_sectionIndex');
    const idx = savedIndex ? parseInt(savedIndex, 10) : 0;
    return sections[idx]?.timeLimitSeconds || 0;
  });
  const [timerActive, setTimerActive] = useState(() => examState === 'running');
  const [fatigueLevel, setFatigueLevel] = useState(() => {
    const saved = localStorage.getItem('curve_fatigueLevel');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Disable auto-progress to allow users to see the section end screen
  const autoProgress = false;

  const dailySeed = useMemo(() => {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }, []);

  const dailyQuestionGroups = useMemo(() => {
    return shuffleWithSeed(originalQuestionGroups, dailySeed);
  }, [dailySeed]);

  const currentSection = sections[currentSectionIndex];
  const currentSectionGroups = dailyQuestionGroups.filter(g => g.section === currentSection?.name);
  const sectionQuestions = flattenQuestions(currentSectionGroups);

  useEffect(() => {
    localStorage.setItem('curve_examState', examState);
    localStorage.setItem('curve_sectionIndex', currentSectionIndex.toString());
    localStorage.setItem('curve_fatigueLevel', fatigueLevel.toString());
    if (endTime !== null) {
      localStorage.setItem('curve_endTime', endTime.toString());
    } else {
      localStorage.removeItem('curve_endTime');
    }
  }, [examState, currentSectionIndex, fatigueLevel, endTime]);

  const setTimeLeft = useCallback((value: number | ((prev: number) => number)) => {
    setTimeLeftState(prev => {
      const newVal = typeof value === 'function' ? value(prev) : value;
      setEndTime(Date.now() + newVal * 1000);
      return newVal;
    });
  }, []);

  const startExam = () => {
    localStorage.removeItem('curve_answers');
    localStorage.removeItem('curve_crossouts');
    localStorage.removeItem('curve_changes');
    setExamState('running');
    setCurrentSectionIndex(0);
    setTimeLeft(sections[0].timeLimitSeconds);
    setTimerActive(true);
    setFatigueLevel(0);
  };

  const nextSection = useCallback(() => {
    setCurrentSectionIndex(prev => {
      if (prev < sections.length - 1) {
        const nextIdx = prev + 1;
        setTimeLeft(sections[nextIdx].timeLimitSeconds);
        setTimerActive(true);
        setExamState('running');
        setFatigueLevel(f => f + 1);
        return nextIdx;
      } else {
        setExamState('finished');
        setTimerActive(false);
        setEndTime(null);
        return prev;
      }
    });
  }, [setTimeLeft]);

  useEffect(() => {
    if (!timerActive || !endTime) {
      return;
    }

    const checkTime = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeftState(remaining);
      
      if (remaining <= 0) {
        if (autoProgress) {
          nextSection();
        } else {
          setTimerActive(false);
          setExamState('section_end');
        }
      }
    };

    checkTime(); // Run immediately
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, [timerActive, endTime, nextSection]);

  return {
    examState,
    currentSection,
    currentSectionIndex,
    currentSectionGroups,
    dailyQuestionGroups, // Export all for telemetry
    sectionQuestions,
    timeLeft,
    fatigueLevel,
    startExam,
    nextSection,
    setTimerActive,
    setTimeLeft,
    setExamState,
    autoProgress
  };
}

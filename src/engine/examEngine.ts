import { useState, useEffect, useCallback, useMemo } from 'react';
import { sections } from '../data/sections';
import { questionsBank } from '../data/questions_bank';
import { Question } from '../types/question';

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

  const dailyQuestions = useMemo(() => {
    const groups: Record<string, Question[]> = {};
    questionsBank.forEach(q => {
      const unifiedSubtopics = [
        'Verbs', 'Prepositions', 'Adverbs', 'Nouns', 'Pronoun-Antecedent', 
        'Determiners', 'Subject-Verb', 'Redundancy', 'Bahagi ng Pananalita',
        'Use of Context Clues', 'Talasalitaan', 'Spelling'
      ];

      // Priority 1: Explicitly defined groupId for SHARED CONTEXT (passage/figure)
      // These should be shuffled as independent units.
      if (q.groupId && (q.passage || q.figure || q.contextTitle?.includes('Passage'))) {
        const key = q.groupId;
        if (!groups[key]) groups[key] = [];
        groups[key].push(q);
        return;
      }

      // Priority 2: Error Identification (Unified per subject)
      if (q.variant === 'error-identification') {
        const key = `err-${q.subject}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(q);
        return;
      }

      // Priority 3: Unified Grammar and Vocabulary block
      // This keeps all completion and vocab together (including antonym blocks)
      if (unifiedSubtopics.includes(q.subtopic)) {
        const key = `unified-${q.subject}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(q);
        return;
      }

      // Priority 4: Default subtopic grouping
      // If no groupId but has shared-style context (figure/passage), it must be an independent group
      const key = q.groupId || ((q.figure || q.passage) ? q.id : `sub-${q.subject}-${q.subtopic}`);
      if (!groups[key]) groups[key] = [];
      groups[key].push(q);
    });
    const shuffledGroups = shuffleWithSeed(Object.values(groups), dailySeed);
    return shuffledGroups.flat();
  }, [dailySeed]);

  const currentSection = sections[currentSectionIndex];
  const sectionQuestions = useMemo(() => {
    return dailyQuestions.filter(q => q.subject === currentSection?.name);
  }, [dailyQuestions, currentSection]);

  const currentSectionGroups = useMemo(() => {
    const groups: Question[][] = [];
    let currentGroup: Question[] = [];
    let currentGroupId: string | undefined = undefined;

    sectionQuestions.forEach(q => {
      let gId = q.groupId;
      
      if (!gId) {
        if (q.figure || q.passage) {
          gId = q.id; // Treat as unique context
        } else if (q.variant === 'error-identification') {
          gId = `err-${q.subject}`;
        } else {
          const completionSubtopics = [
            'Verbs', 'Prepositions', 'Adverbs', 'Nouns', 'Pronoun-Antecedent', 
            'Determiners', 'Subject-Verb', 'Redundancy', 'Bahagi ng Pananalita'
          ];
          if (completionSubtopics.includes(q.subtopic)) {
            gId = `comp-${q.subject}`;
          } else {
            gId = `sub-${q.subject}-${q.subtopic}`;
          }
        }
      }
      
      if (gId === currentGroupId) {
        currentGroup.push(q);
      } else {
        if (currentGroup.length > 0) groups.push(currentGroup);
        currentGroup = [q];
        currentGroupId = gId;
      }
    });
    if (currentGroup.length > 0) groups.push(currentGroup);
    return groups;
  }, [sectionQuestions]);

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
      if (timerActive) {
        setEndTime(Date.now() + newVal * 1000);
      }
      return newVal;
    });
  }, [timerActive]);

  const toggleTimer = useCallback(() => {
    setTimerActive(prev => {
      const nextActive = !prev;
      if (nextActive) {
        // Resuming: set new end time based on current timeLeft state
        setEndTime(Date.now() + timeLeft * 1000);
      } else {
        // Pausing: end time is no longer relevant
        setEndTime(null);
      }
      return nextActive;
    });
  }, [timeLeft]);

  const startExam = () => {
    localStorage.removeItem('curve_answers');
    localStorage.removeItem('curve_crossouts');
    localStorage.removeItem('curve_changes');
    setExamState('running');
    setCurrentSectionIndex(0);
    const initialTime = sections[0].timeLimitSeconds;
    setTimeLeftState(initialTime);
    setEndTime(Date.now() + initialTime * 1000);
    setTimerActive(true);
    setFatigueLevel(0);
  };

  const nextSection = useCallback(() => {
    setCurrentSectionIndex(prev => {
      if (prev < sections.length - 1) {
        const nextIdx = prev + 1;
        const nextTime = sections[nextIdx].timeLimitSeconds;
        setTimeLeftState(nextTime);
        setEndTime(Date.now() + nextTime * 1000);
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
  }, []);

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
    dailyQuestions, // Export all for telemetry
    sectionQuestions,
    timeLeft,
    timerActive,
    fatigueLevel,
    startExam,
    nextSection,
    toggleTimer,
    setTimerActive,
    setTimeLeft,
    setExamState,
    autoProgress
  };
}


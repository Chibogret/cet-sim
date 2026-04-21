import { useState, useEffect, useCallback, useMemo } from 'react';
import { sections } from '../data/sections';
import { questionsBank } from '../data/questions_bank';
import { Question } from '../types/question';
import { getSectionTimeLimit, isUntimedConfig } from './examConfig';
import { parseStoredExamNumber, sanitizeSectionIndex } from './storageAudit';

export type ExamState = 'start' | 'running' | 'section_end' | 'finished';

const examStates: ExamState[] = ['start', 'running', 'section_end', 'finished'];

function isExamState(value: string | null): value is ExamState {
  return value !== null && examStates.includes(value as ExamState);
}

function parseStoredNumber(key: string): number | null {
  const saved = localStorage.getItem(key);
  const parsed = parseStoredExamNumber(saved);

  if (parsed !== null) return parsed;

  if (saved !== null) localStorage.removeItem(key);
  return null;
}

function parseStoredSectionIndex(): number {
  const parsed = parseStoredNumber('curve_sectionIndex');
  const sanitized = sanitizeSectionIndex(parsed, sections.length);

  if (parsed !== null && sanitized !== parsed) {
    localStorage.removeItem('curve_sectionIndex');
  }

  return sanitized;
}

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

export interface ExamConfig {
  customTimeLimit: number | null; // in seconds; 0 means untimed
  subjectLimits: Record<string, number | null>;
  rightMinusWrong: boolean;
  quickFeedback: boolean;
}

export function useExamEngine() {
  const [config, setConfig] = useState<ExamConfig>(() => {
    const saved = localStorage.getItem('curve_examConfig');
    const defaultConfig: ExamConfig = { 
      customTimeLimit: null, 
      subjectLimits: {
        'Language Proficiency': null,
        'Science': null,
        'Mathematics': null,
        'Reading Comprehension': null
      },
      rightMinusWrong: false,
      quickFeedback: false
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultConfig, ...parsed, subjectLimits: { ...defaultConfig.subjectLimits, ...(parsed.subjectLimits || {}) } };
      } catch (e) {
        console.error("Failed to parse config", e);
      }
    }
    return defaultConfig;
  });

  const [examState, setExamState] = useState<ExamState>(() => {
    const saved = localStorage.getItem('curve_examState');
    return isExamState(saved) ? saved : 'start';
  });
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(() => {
    return parseStoredSectionIndex();
  });
  
  const [endTime, setEndTime] = useState<number | null>(() => {
    return parseStoredNumber('curve_endTime');
  });
  
  const [timeLeft, setTimeLeftState] = useState(() => {
    const savedEndTime = parseStoredNumber('curve_endTime');
    if (savedEndTime !== null) {
      const remaining = Math.max(0, Math.floor((savedEndTime - Date.now()) / 1000));
      return remaining;
    }
    const idx = parseStoredSectionIndex();
    
    // We'll trust the saved end time if it exists, otherwise we'll initialize on start
    return sections[idx]?.timeLimitSeconds || 0;
  });
  const [timerActive, setTimerActive] = useState(() => examState === 'running');
  const [fatigueLevel, setFatigueLevel] = useState(() => {
    return parseStoredNumber('curve_fatigueLevel') ?? 0;
  });

  useEffect(() => {
    if (examState !== 'running' || !isUntimedConfig(config.customTimeLimit)) return;
    setTimerActive(false);
    setEndTime(null);
    setTimeLeftState(0);
  }, [config.customTimeLimit, examState]);

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
      if (unifiedSubtopics.includes(q.subtopic)) {
        const key = `unified-${q.subject}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(q);
        return;
      }

      // Priority 4: Default subtopic grouping
      const key = q.groupId || ((q.figure || q.passage) ? q.id : `sub-${q.subject}-${q.subtopic}`);
      if (!groups[key]) groups[key] = [];
      groups[key].push(q);
    });

    const shuffledGroups = shuffleWithSeed(Object.values(groups), dailySeed);
    
    // Apply per-subject limits
    const subjectBuckets: Record<string, Question[]> = {};
    shuffledGroups.forEach(group => {
      const subj = group[0].subject;
      if (!subjectBuckets[subj]) subjectBuckets[subj] = [];
      
      const limits = config.subjectLimits || {};
      const limit = limits[subj];
      if (limit === null || subjectBuckets[subj].length < limit) {
        // If adding this group exceeds the limit, we might want to slice it, 
        // but usually groups (like passages) should stay together.
        // For now, let's just add the whole group if the limit isn't reached yet.
        subjectBuckets[subj].push(...group);
      }
    });

    // Final slice to be exact if needed
    Object.keys(subjectBuckets).forEach(subj => {
      const limits = config.subjectLimits || {};
      const limit = limits[subj];
      if (limit !== null && limit !== undefined && subjectBuckets[subj].length > limit) {
        subjectBuckets[subj] = subjectBuckets[subj].slice(0, limit);
      }
    });

    return Object.values(subjectBuckets).flat();
  }, [dailySeed, config.subjectLimits]);

  const currentSection = sections[currentSectionIndex] ?? sections[0];

  useEffect(() => {
    if (
      examState !== 'running' ||
      !timerActive ||
      endTime !== null ||
      isUntimedConfig(config.customTimeLimit)
    ) {
      return;
    }

    const recoveredTime = getSectionTimeLimit(config.customTimeLimit, currentSection.timeLimitSeconds) ?? 0;
    setTimeLeftState(recoveredTime);
    setEndTime(Date.now() + recoveredTime * 1000);
  }, [config.customTimeLimit, currentSection.timeLimitSeconds, endTime, examState, timerActive]);

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
    localStorage.setItem('curve_examConfig', JSON.stringify(config));
    if (examState === 'start') {
      localStorage.removeItem('curve_examState');
      localStorage.removeItem('curve_sectionIndex');
      localStorage.removeItem('curve_fatigueLevel');
      localStorage.removeItem('curve_endTime');
      return;
    }

    localStorage.setItem('curve_examState', examState);
    localStorage.setItem('curve_sectionIndex', currentSectionIndex.toString());
    localStorage.setItem('curve_fatigueLevel', fatigueLevel.toString());
    if (endTime !== null) {
      localStorage.setItem('curve_endTime', endTime.toString());
    } else {
      localStorage.removeItem('curve_endTime');
    }
  }, [examState, currentSectionIndex, fatigueLevel, endTime, config]);

  const setTimeLeft = useCallback((value: number | ((prev: number) => number)) => {
    setTimeLeftState(prev => {
      const newVal = typeof value === 'function' ? value(prev) : value;
      if (timerActive && !isUntimedConfig(config.customTimeLimit)) {
        setEndTime(Date.now() + newVal * 1000);
      }
      return newVal;
    });
  }, [config.customTimeLimit, timerActive]);

  const toggleTimer = useCallback(() => {
    if (isUntimedConfig(config.customTimeLimit)) return;

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
  }, [config.customTimeLimit, timeLeft]);

  const startExam = (newConfig?: ExamConfig) => {
    if (newConfig) setConfig(newConfig);
    const activeConfig = newConfig || config;

    localStorage.removeItem('curve_answers');
    localStorage.removeItem('curve_crossouts');
    localStorage.removeItem('curve_changes');
    setExamState('running');
    setCurrentSectionIndex(0);
    
    const initialTime = getSectionTimeLimit(activeConfig.customTimeLimit, sections[0].timeLimitSeconds);
    setTimeLeftState(initialTime ?? 0);
    setEndTime(initialTime === null ? null : Date.now() + initialTime * 1000);
    setTimerActive(initialTime !== null);
    setFatigueLevel(0);
  };

  const abortExam = useCallback(() => {
    setTimerActive(false);
    setEndTime(null);
    setTimeLeftState(sections[0]?.timeLimitSeconds || 0);
    setCurrentSectionIndex(0);
    setFatigueLevel(0);
    setExamState('start');
    localStorage.removeItem('curve_examState');
    localStorage.removeItem('curve_sectionIndex');
    localStorage.removeItem('curve_fatigueLevel');
    localStorage.removeItem('curve_endTime');
  }, []);

  const nextSection = useCallback(() => {
    setCurrentSectionIndex(prev => {
      if (prev < sections.length - 1) {
        const nextIdx = prev + 1;
        const nextTime = getSectionTimeLimit(config.customTimeLimit, sections[nextIdx].timeLimitSeconds);
        setTimeLeftState(nextTime ?? 0);
        setEndTime(nextTime === null ? null : Date.now() + nextTime * 1000);
        setTimerActive(nextTime !== null);
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
  }, [config.customTimeLimit]);

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
    dailyQuestions,
    sectionQuestions,
    timeLeft,
    timerActive,
    fatigueLevel,
    startExam,
    abortExam,
    nextSection,
    toggleTimer,
    setTimerActive,
    setTimeLeft,
    setExamState,
    autoProgress,
    config,
    setConfig
  };
}



import React, { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { sections } from '../data/sections';
import { buildCompactExamSeed, useExamEngine } from './examEngine';

type ExamEngineResult = ReturnType<typeof useExamEngine>;

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function renderExamEngine() {
  let result: ExamEngineResult | undefined;
  const container = document.createElement('div');
  const root: Root = createRoot(container);

  function Harness() {
    result = useExamEngine();
    return null;
  }

  act(() => {
    root.render(React.createElement(Harness));
  });

  return {
    get result() {
      if (!result) throw new Error('Hook did not render');
      return result;
    },
    unmount() {
      act(() => {
        root.unmount();
      });
      container.remove();
    }
  };
}

describe('exam engine persisted state recovery', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState(null, '', '/');
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-21T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it('rejects malformed stored section indexes instead of partially parsing them', () => {
    localStorage.setItem('curve_examState', 'running');
    localStorage.setItem('curve_sectionIndex', '1abc');
    localStorage.setItem('curve_endTime', String(Date.now() + sections[0].timeLimitSeconds * 1000));

    const hook = renderExamEngine();

    expect(hook.result.currentSectionIndex).toBe(0);
    expect(hook.result.currentSection.name).toBe(sections[0].name);

    hook.unmount();
  });

  it('recovers a running timed exam from a malformed stored end time', () => {
    localStorage.setItem('curve_examState', 'running');
    localStorage.setItem('curve_sectionIndex', '0');
    localStorage.setItem('curve_endTime', '49:17');

    const hook = renderExamEngine();

    expect(hook.result.examState).toBe('running');
    expect(hook.result.timerActive).toBe(true);
    expect(hook.result.timeLeft).toBe(sections[0].timeLimitSeconds);
    expect(localStorage.getItem('curve_endTime')).toBe(String(Date.now() + sections[0].timeLimitSeconds * 1000));

    hook.unmount();
  });

  it('uses a stored custom seed to generate a reproducible exam order', () => {
    localStorage.setItem('curve_examConfig', JSON.stringify({
      customTimeLimit: null,
      subjectLimits: {
        'Language Proficiency': null,
        Science: null,
        Mathematics: null,
        'Reading Comprehension': null
      },
      rightMinusWrong: false,
      quickFeedback: false,
      customSeed: 'share-2026'
    }));

    const firstHook = renderExamEngine();
    const firstOrder = firstHook.result.dailyQuestions.map(question => question.id);
    firstHook.unmount();

    const secondHook = renderExamEngine();
    const secondOrder = secondHook.result.dailyQuestions.map(question => question.id);

    expect(secondOrder).toEqual(firstOrder);

    secondHook.unmount();
  });

  it('generates a different exam order for a different custom seed', () => {
    localStorage.setItem('curve_examConfig', JSON.stringify({
      customTimeLimit: null,
      subjectLimits: {
        'Language Proficiency': null,
        Science: null,
        Mathematics: null,
        'Reading Comprehension': null
      },
      rightMinusWrong: false,
      quickFeedback: false,
      customSeed: 'share-2026-a'
    }));

    const firstHook = renderExamEngine();
    const firstOrder = firstHook.result.dailyQuestions.map(question => question.id);
    firstHook.unmount();

    localStorage.setItem('curve_examConfig', JSON.stringify({
      customTimeLimit: null,
      subjectLimits: {
        'Language Proficiency': null,
        Science: null,
        Mathematics: null,
        'Reading Comprehension': null
      },
      rightMinusWrong: false,
      quickFeedback: false,
      customSeed: 'share-2026-b'
    }));

    const secondHook = renderExamEngine();
    const secondOrder = secondHook.result.dailyQuestions.map(question => question.id);

    expect(secondOrder).not.toEqual(firstOrder);

    secondHook.unmount();
  });

  it('loads a custom seed from the share URL into exam config', () => {
    window.history.replaceState(null, '', '/?seed=url-share-42');

    const hook = renderExamEngine();

    expect(hook.result.config.customSeed).toBe('url-share-42');

    hook.unmount();
  });

  it('applies subject item limits while using a stored custom seed', () => {
    localStorage.setItem('curve_examConfig', JSON.stringify({
      customTimeLimit: null,
      subjectLimits: {
        'Language Proficiency': 5,
        Science: 5,
        Mathematics: 5,
        'Reading Comprehension': 5
      },
      rightMinusWrong: false,
      quickFeedback: false,
      customSeed: 'limited-share-2026'
    }));

    const firstHook = renderExamEngine();
    const firstOrder = firstHook.result.dailyQuestions.map(question => question.id);
    const firstCounts = firstHook.result.dailyQuestions.reduce<Record<string, number>>((counts, question) => {
      counts[question.subject] = (counts[question.subject] ?? 0) + 1;
      return counts;
    }, {});
    firstHook.unmount();

    const secondHook = renderExamEngine();
    const secondOrder = secondHook.result.dailyQuestions.map(question => question.id);

    expect(secondOrder).toEqual(firstOrder);
    expect(firstCounts).toEqual({
      'Language Proficiency': 5,
      Science: 5,
      Mathematics: 5,
      'Reading Comprehension': 5
    });

    secondHook.unmount();
  });

  it('builds a short opaque seed that encodes subject item limits', () => {
    const seed = buildCompactExamSeed({
      'Language Proficiency': 5,
      Science: 5,
      Mathematics: 5,
      'Reading Comprehension': 5
    }, 'ABC123');

    expect(seed).toBe('C1ABC1232D');
    expect(seed).toHaveLength(10);
  });

  it('loads subject item limits from a compact seed', () => {
    localStorage.setItem('curve_examConfig', JSON.stringify({
      customTimeLimit: null,
      subjectLimits: {
        'Language Proficiency': null,
        Science: null,
        Mathematics: null,
        'Reading Comprehension': null
      },
      rightMinusWrong: false,
      quickFeedback: false,
      customSeed: buildCompactExamSeed({
        'Language Proficiency': 5,
        Science: 10,
        Mathematics: 25,
        'Reading Comprehension': null
      }, 'ZX90QP')
    }));

    const hook = renderExamEngine();

    expect(hook.result.config.subjectLimits).toEqual({
      'Language Proficiency': 5,
      Science: 10,
      Mathematics: 25,
      'Reading Comprehension': null
    });

    hook.unmount();
  });

  it('lets a compact URL seed override stored subject item limits', () => {
    localStorage.setItem('curve_examConfig', JSON.stringify({
      customTimeLimit: null,
      subjectLimits: {
        'Language Proficiency': 25,
        Science: 25,
        Mathematics: 25,
        'Reading Comprehension': 25
      },
      rightMinusWrong: false,
      quickFeedback: false,
      customSeed: 'saved-seed'
    }));
    window.history.replaceState(null, '', `/?seed=${buildCompactExamSeed({
      'Language Proficiency': 5,
      Science: 5,
      Mathematics: 10,
      'Reading Comprehension': null
    }, 'URL777')}`);

    const hook = renderExamEngine();

    expect(hook.result.config.subjectLimits).toEqual({
      'Language Proficiency': 5,
      Science: 5,
      Mathematics: 10,
      'Reading Comprehension': null
    });

    hook.unmount();
  });

  it('normalizes configured custom seeds before generating question order', () => {
    const spacedSeedHook = renderExamEngine();

    act(() => {
      spacedSeedHook.result.setConfig(prev => ({ ...prev, customSeed: '  share-2026  ' }));
    });

    const spacedSeedOrder = spacedSeedHook.result.dailyQuestions.map(question => question.id);
    spacedSeedHook.unmount();

    localStorage.setItem('curve_examConfig', JSON.stringify({
      customTimeLimit: null,
      subjectLimits: {
        'Language Proficiency': null,
        Science: null,
        Mathematics: null,
        'Reading Comprehension': null
      },
      rightMinusWrong: false,
      quickFeedback: false,
      customSeed: 'share-2026'
    }));

    const trimmedSeedHook = renderExamEngine();
    const trimmedSeedOrder = trimmedSeedHook.result.dailyQuestions.map(question => question.id);

    expect(spacedSeedOrder).toEqual(trimmedSeedOrder);

    trimmedSeedHook.unmount();
  });
});

import React, { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { sections } from '../data/sections';
import { useExamEngine } from './examEngine';

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
});

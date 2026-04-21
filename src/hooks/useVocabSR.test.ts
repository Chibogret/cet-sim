import React, { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { useVocabSR } from './useVocabSR';

type VocabSRResult = ReturnType<typeof useVocabSR>;

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function renderVocabSRHook() {
  let result: VocabSRResult | undefined;
  const container = document.createElement('div');
  const root: Root = createRoot(container);

  function Harness() {
    result = useVocabSR();
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

describe('spaced-repetition persistence recovery', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-21T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it('starts with empty metrics when stored spaced-repetition data is not a record', () => {
    localStorage.setItem('vocab_sr_metrics', '"not-a-record"');

    const hook = renderVocabSRHook();

    expect(hook.result.loadSRData()).toEqual({});
    expect(() => {
      act(() => {
        hook.result.updateSR('alpha', true);
      });
    }).not.toThrow();

    const persisted = JSON.parse(localStorage.getItem('vocab_sr_metrics') ?? '{}');
    expect(persisted.alpha).toMatchObject({
      interval: 1,
      repetition: 1,
      easeFactor: 2.6
    });

    hook.unmount();
  });
});

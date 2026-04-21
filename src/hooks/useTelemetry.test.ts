import React, { act } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { useTelemetry } from './useTelemetry';

type TelemetryResult = ReturnType<typeof useTelemetry>;

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function renderTelemetryHook() {
  let result: TelemetryResult | undefined;
  const container = document.createElement('div');
  const root: Root = createRoot(container);

  function Harness() {
    result = useTelemetry();
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

describe('telemetry persistence recovery', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts with an empty event list when stored telemetry is not an array', () => {
    localStorage.setItem('curve_telemetry', '{"unexpected":"shape"}');

    const hook = renderTelemetryHook();

    expect(hook.result.events).toEqual([]);
    expect(() => {
      act(() => {
        hook.result.logEvent('PROCTOR_RESUME', { reason: 'TAB_VISIBLE' });
      });
    }).not.toThrow();

    const persisted = JSON.parse(localStorage.getItem('curve_telemetry') ?? '[]');
    expect(persisted).toHaveLength(1);
    expect(persisted[0]).toMatchObject({ type: 'PROCTOR_RESUME', data: { reason: 'TAB_VISIBLE' } });

    hook.unmount();
  });
});

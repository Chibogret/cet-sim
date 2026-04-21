import { describe, expect, it } from 'vitest';
import { canChangeAnswer } from './answerRules';

describe('answer change rules', () => {
  it('allows first answers without consuming a change', () => {
    expect(canChangeAnswer(undefined, 'A', 0)).toBe(true);
  });

  it('allows repeated selections of the same answer', () => {
    expect(canChangeAnswer('A', 'A', 0)).toBe(true);
  });

  it('allows changing the same question while global changes remain', () => {
    expect(canChangeAnswer('A', 'B', 2)).toBe(true);
  });

  it('blocks answer changes only when the global change count is exhausted', () => {
    expect(canChangeAnswer('A', 'B', 0)).toBe(false);
  });
});

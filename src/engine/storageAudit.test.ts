import { describe, expect, it } from 'vitest';
import { normalizeStoredExamState, parseStoredExamNumber, sanitizeSectionIndex } from './storageAudit';

describe('CET local-storage audit contract', () => {
  it('normalizes valid exam states and rejects invalid states', () => {
    expect(normalizeStoredExamState('running')).toBe('running');
    expect(normalizeStoredExamState('section_end')).toBe('section_end');
    expect(normalizeStoredExamState('review')).toBe('start');
    expect(normalizeStoredExamState(null)).toBe('start');
  });

  it('parses finite numeric timer values and rejects malformed values', () => {
    expect(parseStoredExamNumber('12345')).toBe(12345);
    expect(parseStoredExamNumber('49:17')).toBeNull();
    expect(parseStoredExamNumber('not-a-number')).toBeNull();
    expect(parseStoredExamNumber(null)).toBeNull();
  });

  it('clamps out-of-range persisted section indexes back to the first section', () => {
    expect(sanitizeSectionIndex(2, 4)).toBe(2);
    expect(sanitizeSectionIndex(-1, 4)).toBe(0);
    expect(sanitizeSectionIndex(4, 4)).toBe(0);
    expect(sanitizeSectionIndex(null, 4)).toBe(0);
  });
});

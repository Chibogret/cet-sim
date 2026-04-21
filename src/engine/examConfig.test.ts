import { describe, expect, it } from 'vitest';
import { getSectionTimeLimit, isUntimedConfig } from './examConfig';

describe('exam configuration helpers', () => {
  it('uses the standard section time when no custom time is configured', () => {
    expect(getSectionTimeLimit(null, 3600)).toBe(3600);
  });

  it('uses custom positive time limits as seconds', () => {
    expect(getSectionTimeLimit(900, 3600)).toBe(900);
  });

  it('treats zero as a real untimed session', () => {
    expect(getSectionTimeLimit(0, 3600)).toBeNull();
    expect(isUntimedConfig(0)).toBe(true);
    expect(isUntimedConfig(null)).toBe(false);
  });
});

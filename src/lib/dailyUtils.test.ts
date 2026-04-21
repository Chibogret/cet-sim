import { describe, expect, it } from 'vitest';
import { selectDailyVocab } from './dailyUtils';
import { VocabWord } from '../types/vocab';

const vocab: VocabWord[] = [
  { word: 'alpha', definition: 'first', synonyms: [] },
  { word: 'bravo', definition: 'second', synonyms: [] },
  { word: 'charlie', definition: 'third', synonyms: [] },
  { word: 'delta', definition: 'fourth', synonyms: [] }
];

describe('daily vocabulary selection', () => {
  it('prioritizes due spaced-repetition words before seeded filler words', () => {
    const now = 1_000_000;
    const selected = selectDailyVocab(20260421, vocab, 3, {
      alpha: { nextReview: now - 1, interval: 1, repetition: 1, easeFactor: 2.5 },
      charlie: { nextReview: now + 86_400_000, interval: 1, repetition: 1, easeFactor: 2.5 }
    }, now);

    expect(selected[0].word).toBe('alpha');
    expect(selected).toHaveLength(3);
    expect(new Set(selected.map(word => word.word)).size).toBe(3);
  });
});

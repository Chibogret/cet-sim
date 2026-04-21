import { describe, expect, it } from 'vitest';
import { calculateScoreSummary } from './scoringAudit';

const questions = Array.from({ length: 12 }, (_, index) => ({
  id: `q-${index + 1}`,
  correctAnswer: 'A'
}));

describe('CET scoring audit contract', () => {
  it('reports raw correct over total when right-minus-wrong is off', () => {
    const summary = calculateScoreSummary(questions, {
      'q-1': 'A',
      'q-2': 'A',
      'q-3': 'B'
    }, false);

    expect(summary).toMatchObject({
      total: 12,
      correct: 2,
      incorrect: 1,
      unanswered: 9,
      deduction: 0,
      finalScore: 2
    });
  });

  it.each([
    { wrong: 1, expectedDeduction: 0.25, expectedFinal: 4.75 },
    { wrong: 2, expectedDeduction: 0.5, expectedFinal: 4.5 },
    { wrong: 3, expectedDeduction: 0.75, expectedFinal: 4.25 },
    { wrong: 5, expectedDeduction: 1.25, expectedFinal: 3.75 }
  ])('uses exact UPCAT 0.25 penalties for $wrong wrong answers', ({ wrong, expectedDeduction, expectedFinal }) => {
    const answers: Record<string, string> = {
      'q-1': 'A',
      'q-2': 'A',
      'q-3': 'A',
      'q-4': 'A',
      'q-5': 'A'
    };

    for (let index = 0; index < wrong; index++) {
      answers[`q-${index + 6}`] = 'B';
    }

    const summary = calculateScoreSummary(questions, answers, true);

    expect(summary.incorrect).toBe(wrong);
    expect(summary.deduction).toBe(expectedDeduction);
    expect(summary.finalScore).toBe(expectedFinal);
  });

  it('does not penalize unanswered questions', () => {
    const summary = calculateScoreSummary(questions, {
      'q-1': 'A',
      'q-2': 'B'
    }, true);

    expect(summary).toMatchObject({
      correct: 1,
      incorrect: 1,
      unanswered: 10,
      deduction: 0.25,
      finalScore: 0.75
    });
  });
});

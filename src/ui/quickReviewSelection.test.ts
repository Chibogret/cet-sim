import { describe, expect, it } from 'vitest';
import { buildQuickReviewSet, getQuestionInstructionLabel } from './quickReviewSelection';
import { Question } from '../types/question';

const makeQuestion = (id: string, subject: Question['subject'], variant?: Question['variant']): Question => ({
  id,
  subject,
  subtopic: variant === 'error-identification' ? 'Special Agreements' : 'General',
  variant,
  question: `${id}?`,
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 'A',
  explanation: 'Because.'
});

describe('quick review selection', () => {
  it('does not repeat questions inside one generated set', () => {
    const questions: Question[] = [
      makeQuestion('lp-1', 'Language Proficiency'),
      makeQuestion('lp-2', 'Language Proficiency'),
      makeQuestion('sc-1', 'Science'),
      makeQuestion('sc-2', 'Science'),
      makeQuestion('ma-1', 'Mathematics'),
      makeQuestion('ma-2', 'Mathematics'),
      makeQuestion('rc-1', 'Reading Comprehension'),
      makeQuestion('rc-2', 'Reading Comprehension')
    ];

    const selected = buildQuickReviewSet(questions, 2, () => 0);

    expect(selected).toHaveLength(8);
    expect(new Set(selected.map(question => question.id)).size).toBe(8);
  });

  it('uses English instruction labels for English error-identification questions', () => {
    expect(getQuestionInstructionLabel(makeQuestion('lp-err', 'Language Proficiency', 'error-identification'))).toBe('Instructions');
  });
});

import { describe, expect, it } from 'vitest';
import { questionsBank } from './questions_bank';
import { lintQuestions } from './questionContentLint';

describe('question content lint', () => {
  it('keeps the checked question bank free of known clarity blockers', () => {
    expect(lintQuestions(questionsBank)).toEqual([]);
  });
});

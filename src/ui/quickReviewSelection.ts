import { Question, SubjectType } from '../types/question';
import { getInstruction } from './SharedFormatting';

export const QUICK_REVIEW_SUBJECTS: SubjectType[] = [
  'Language Proficiency',
  'Science',
  'Mathematics',
  'Reading Comprehension'
];

export function buildQuickReviewSet(
  questions: Question[],
  batches: number,
  random: () => number = Math.random
): Question[] {
  const pools = new Map<SubjectType, Question[]>();

  QUICK_REVIEW_SUBJECTS.forEach(subject => {
    pools.set(subject, questions.filter(question => question.subject === subject));
  });

  const selected: Question[] = [];

  for (let batchIndex = 0; batchIndex < batches; batchIndex++) {
    QUICK_REVIEW_SUBJECTS.forEach(subject => {
      const pool = pools.get(subject);
      if (!pool || pool.length === 0) return;

      const randomIndex = Math.floor(random() * pool.length);
      const [question] = pool.splice(randomIndex, 1);
      selected.push(question);
    });
  }

  return shuffleQuestions(selected, random);
}

export function shuffleQuestions(questions: Question[], random: () => number = Math.random): Question[] {
  const shuffled = [...questions];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function getQuestionInstructionLabel(question: Question): 'Instructions' | 'Panuto' {
  return getInstruction(question).isFilipino ? 'Panuto' : 'Instructions';
}

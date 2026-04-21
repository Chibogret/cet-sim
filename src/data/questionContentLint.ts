import { Question } from '../types/question';

export interface QuestionLintIssue {
  id: string;
  message: string;
}

interface PatternRule {
  pattern: RegExp;
  message: string;
}

const textRules: PatternRule[] = [
  { pattern: /\bhits the break\b/i, message: 'Uses "break" where the vehicle-control word is intended.' },
  { pattern: /\bsufficient enough\b/i, message: 'Uses redundant phrasing: "sufficient enough".' },
  { pattern: /\bsignificantly lesser\b/i, message: 'Uses nonstandard comparative phrasing: "significantly lesser".' },
  { pattern: /\bten times of that of\b/i, message: 'Uses awkward comparison phrasing: "ten times of that of".' },
  { pattern: /\bsetups of beaker\b/i, message: 'Uses ungrammatical lab setup phrasing.' },
  { pattern: /\beach of the setup\b/i, message: 'Uses singular "setup" after "each of the".' },
  { pattern: /\bminiscule\b/i, message: 'Uses the nonstandard spelling "miniscule".' },
  { pattern: /\bknown someone die of plane crash\b/i, message: 'Contains an ungrammatical reading distractor.' },
  { pattern: /\bcorrectly is always true\b/i, message: 'Contains awkward stem wording: "correctly is always true".' },
  { pattern: /\bextracellular internalized\b/i, message: 'Contains incomplete lysosome-option wording.' }
];

export function lintQuestions(questions: Question[]): QuestionLintIssue[] {
  const issues: QuestionLintIssue[] = [];
  const seenQuestionText = new Map<string, string>();

  questions.forEach(question => {
    const fields = [question.question, question.explanation, ...question.options];
    const combined = fields.join('\n');

    textRules.forEach(rule => {
      if (rule.pattern.test(combined)) {
        issues.push({ id: question.id, message: rule.message });
      }
    });

    if (/\bline\s+\d+\b/i.test(question.question) && !containsLineMarkers(question.passage)) {
      issues.push({ id: question.id, message: 'References a line number, but the attached passage has no line markers.' });
    }

    const normalizedQuestion = normalizeQuestionText(question.question);
    const previousId = seenQuestionText.get(normalizedQuestion);
    if (previousId && !isAllowedDuplicateStem(question.question)) {
      issues.push({ id: question.id, message: `Duplicates question stem from ${previousId}.` });
    } else {
      seenQuestionText.set(normalizedQuestion, question.id);
    }
  });

  return issues;
}

function containsLineMarkers(passage: string | undefined): boolean {
  if (!passage) return false;
  return /(^|\n)\s*(?:\(\d+\)|\d+\.|\[\d+\]|\d+\s+\S)/.test(passage);
}

function normalizeQuestionText(text: string): string {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

function isAllowedDuplicateStem(text: string): boolean {
  return /^identify the word that is spelled incorrectly:?$/i.test(text.trim());
}

if (process.argv[1] && process.argv[1].endsWith('questionContentLint.ts')) {
  const { questionsBank } = await import('./questions_bank');
  const issues = lintQuestions(questionsBank);

  if (issues.length > 0) {
    console.error(`Question content lint found ${issues.length} issue(s):`);
    issues.forEach(issue => {
      console.error(`- ${issue.id}: ${issue.message}`);
    });
    process.exit(1);
  }

  console.log(`Question content lint passed for ${questionsBank.length} questions.`);
}

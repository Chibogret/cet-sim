export interface ScorableQuestion {
  id: string;
  correctAnswer: string;
  subject?: string;
}

export interface ScoreSummary {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  deduction: number;
  finalScore: number;
}

const normalizeAnswer = (answer: string) => answer.trim().toLowerCase();

export function calculateScoreSummary(
  questions: ScorableQuestion[],
  answers: Record<string, string>,
  rightMinusWrong: boolean
): ScoreSummary {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach(question => {
    const userAnswer = answers[question.id];
    if (!userAnswer) {
      unanswered++;
      return;
    }

    if (normalizeAnswer(userAnswer) === normalizeAnswer(question.correctAnswer)) {
      correct++;
    } else {
      incorrect++;
    }
  });

  const deduction = rightMinusWrong ? incorrect * 0.25 : 0;

  return {
    total: questions.length,
    correct,
    incorrect,
    unanswered,
    deduction,
    finalScore: correct - deduction
  };
}

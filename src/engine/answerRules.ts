export function canChangeAnswer(currentAnswer: string | undefined, nextAnswer: string, changesRemaining: number): boolean {
  if (!currentAnswer || currentAnswer === nextAnswer) return true;
  return changesRemaining > 0;
}

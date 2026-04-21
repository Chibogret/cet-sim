import type { ExamState } from './examEngine';

const examStates: ExamState[] = ['start', 'running', 'section_end', 'finished'];

export function normalizeStoredExamState(value: string | null): ExamState {
  return value !== null && examStates.includes(value as ExamState) ? value as ExamState : 'start';
}

export function parseStoredExamNumber(value: string | null): number | null {
  if (!value) return null;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed.toString() === value ? parsed : null;
}

export function sanitizeSectionIndex(value: number | null, sectionCount: number): number {
  if (value === null) return 0;
  if (value < 0 || value >= sectionCount) return 0;
  return value;
}

export type CustomTimeLimit = number | null;

export function isUntimedConfig(customTimeLimit: CustomTimeLimit): boolean {
  return customTimeLimit === 0;
}

export function getSectionTimeLimit(customTimeLimit: CustomTimeLimit, standardSeconds: number): number | null {
  if (isUntimedConfig(customTimeLimit)) return null;
  return customTimeLimit ?? standardSeconds;
}

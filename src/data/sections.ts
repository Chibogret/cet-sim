export interface Section {
  id: string;
  name: string;
  timeLimitSeconds: number;
}

export const sections: Section[] = [
  { id: 'Language Proficiency', name: 'Language Proficiency', timeLimitSeconds: 3600 },
  { id: 'Science', name: 'Science', timeLimitSeconds: 3600 },
  { id: 'Mathematics', name: 'Mathematics', timeLimitSeconds: 3600 },
  { id: 'Reading Comprehension', name: 'Reading Comprehension', timeLimitSeconds: 3600 },
];

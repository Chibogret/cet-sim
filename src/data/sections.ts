export interface Section {
  id: string;
  name: string;
  timeLimitSeconds: number;
}

export const sections: Section[] = [
  { id: 'Language Proficiency', name: 'Language Proficiency', timeLimitSeconds: 60 },
  { id: 'Science', name: 'Science', timeLimitSeconds: 60 },
  { id: 'Mathematics', name: 'Mathematics', timeLimitSeconds: 90 },
  { id: 'Reading Comprehension', name: 'Reading Comprehension', timeLimitSeconds: 60 },
];

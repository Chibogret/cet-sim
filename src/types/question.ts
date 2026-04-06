export type SubjectType = 'Language Proficiency' | 'Science' | 'Mathematics' | 'Reading Comprehension';

export interface Question {
    id: string;
    subject: SubjectType;
    subtopic: string;
    figure?: string; // Image URL/Path
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export type SubjectType = 'Language Proficiency' | 'Science' | 'Mathematics' | 'Reading Comprehension';

export interface ReadingPassage {
    groupId: string;
    contextTitle: string;
    passage?: string;
    instruction?: string;
}

export interface Question {
    id: string;
    subject: SubjectType;
    subtopic: string;
    contextTitle?: string; // e.g., "Passage 1", "Figure A"
    passage?: string; // The text passage for the question
    figure?: string; // Image URL/Path
    groupId?: string; // To group questions that share the same context
    passageType?: 'prose' | 'poetry'; // Rendering style for the passage
    variant?: 'standard' | 'error-identification'; // To handle specific formatting (e.g., underline identification)
    instruction?: string;
    question: string;

    options: string[];
    correctAnswer: string;
    explanation: string;
}


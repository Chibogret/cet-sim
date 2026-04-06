import React from 'react';

export interface Lesson {
  id: string; // e.g., "703-force-and-motion"
  topicId: number; // Mapping to topics.json
  title: string;
  subject: string;
  category: string;
  content: string; // Markdown content (fallback)
  highlights: string[];
  Component?: React.FC<{ onClose: () => void }>; // Custom bespoke lesson component
  quiz?: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
}

export interface DailyStudySet {
  date: string; // YYYY-MM-DD
  seed: number;
  vocab: string[]; // List of vocab words
  lessons: Lesson[]; // One per subject
}

export interface Topic {
  id: number;
  name: string;
  subtopics?: string[];
}

export interface SubjectCategory {
  id: number;
  subject: string;
  category: string;
  topics: Topic[];
}

export interface TopicsData {
  upcat_coverage: SubjectCategory[];
}

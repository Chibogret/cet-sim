import { Lesson } from '../types/lesson';
import Lesson101 from '../ui/lessons/Lesson101';
import Lesson703 from '../ui/lessons/Lesson703';
import Lesson801 from '../ui/lessons/Lesson801';
import Lesson1301 from '../ui/lessons/Lesson1301';
import Lesson501 from '../ui/lessons/Lesson501';

export const lessons: Lesson[] = [
  {
    id: '101-parts-of-speech',
    topicId: 101,
    title: 'Parts of Speech',
    subject: 'Language Proficiency',
    category: 'English',
    content: 'The building blocks of language: Nouns, Verbs, Adjectives, and more.',
    highlights: ['Nouns', 'Pronouns', 'Verbs', 'Adjectives', 'Adverbs', 'Prepositions', 'Conjunctions', 'Interjections', 'Determiners'],
    Component: Lesson101,
    quiz: [
      {
        question: "Which of these words can function as both a noun and a verb?",
        options: ["Study", "Diligent", "Quickly", "Always"],
        answer: "Study",
        explanation: "Study can be a noun (Her study was thorough) or a verb (She decided to study)."
      }
    ]
  },
  {
    id: '703-force-and-motion',
    topicId: 703,
    title: 'Force and Motion',
    subject: 'Science',
    category: 'Physics',
    content: 'Newton\'s Laws of Motion and the relationship between Force, Mass, and Acceleration.',
    highlights: ['Newton\'s Laws', 'F=ma', 'Inertia'],
    Component: Lesson703,
    quiz: [
      {
        question: "What is Newton's Second Law of Motion?",
        options: ["Inertia", "Action/Reaction", "F = ma", "Gravity"],
        answer: "F = ma",
        explanation: "Force equals Mass times Acceleration."
      }
    ]
  },
  {
    id: '801-pemdas',
    topicId: 801,
    title: 'PEMDAS',
    subject: 'Mathematics',
    category: 'Arithmetic',
    content: 'The order of operations: Parentheses, Exponents, Multiplication, Division, Addition, Subtraction.',
    highlights: ['Order of Ops', 'Hierarchy', 'Left-to-Right'],
    Component: Lesson801,
    quiz: [
      {
        question: "In the expression 2 + 3 × 4, what is the correct result?",
        options: ["20", "14", "12", "9"],
        answer: "14",
        explanation: "According to PEMDAS, multiplication comes before addition: 3 × 4 = 12, then 2 + 12 = 14."
      }
    ]
  },
  {
    id: '1301-poetry',
    topicId: 1301,
    title: 'Poetry',
    subject: 'Reading Comprehension',
    category: 'N/A',
    content: 'Understanding rhythm, meter, imagery, and structural units in poetic works.',
    highlights: ['Stanza', 'Rhythm', 'Imagery'],
    Component: Lesson1301,
    quiz: [
      {
        question: "What is a stanza in poetry?",
        options: ["A type of meter", "A group of lines", "A musical instrument", "A metaphor"],
        answer: "A group of lines",
        explanation: "A stanza is a group of lines forming the basic recurring metrical unit in a poem."
      }
    ]
  },
  {
    id: '501-cell-theory',
    topicId: 501,
    title: 'Cell Biology',
    subject: 'Science',
    category: 'Biology',
    content: 'The fundamental unit of life: Nucleus, Mitochondria, and core biological processes.',
    highlights: ['Nucleus', 'Mitochondria', 'Photosynthesis'],
    Component: Lesson501,
    quiz: [
      {
        question: "Which organelle is known as the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"],
        answer: "Mitochondria",
        explanation: "Mitochondria are responsible for ATP production, driving cellular processes."
      }
    ]
  }
];

export const lessonRegistry: Record<number, Lesson> = lessons.reduce((acc, lesson) => {
  acc[lesson.topicId] = lesson;
  return acc;
}, {} as Record<number, Lesson>);

import { Question } from '../types/question';

export const questionsBank: Question[] = [
    // Language Proficiency (Topic 101: Parts of Speech)
    {
        id: 'LP-101-1',
        subject: 'Language Proficiency',
        subtopic: 'Nouns',
        question: 'Identify the part of speech of the word "but" in the following sentence: "All the participants but Sarah were able to complete the rigorous course on time."',
        options: ['Conjunction', 'Preposition', 'Adverb', 'Noun'],
        correctAnswer: 'Preposition',
        explanation: 'In this context, "but" is used as a preposition meaning "except." It connects the noun "Sarah" to the rest of the sentence, indicating she was the only exception.'
    },
    {
        id: 'LP-101-2',
        subject: 'Language Proficiency',
        subtopic: 'Verbs',
        question: 'Choose the grammatically correct verb form: "The prevalence of digital misinformation, along with various socioeconomic factors, ______ a significant threat to modern democracy."',
        options: ['pose', 'poses', 'is posing', 'has posed'],
        correctAnswer: 'poses',
        explanation: 'The subject of the sentence is "prevalence," which is singular. The phrase "along with various socioeconomic factors" is an additive phrase and does not change the number of the subject. Therefore, the singular verb "poses" is required.'
    },

    // Science (Topic 703: Force and Motion)
    {
        id: 'SC-703-1',
        subject: 'Science',
        subtopic: 'Newton\'s Laws of Motion',
        question: 'A 70 kg skydiver has reached terminal velocity. Which of the following statements about the forces acting on the skydiver is true?',
        options: [
            'The net force is equal to the skydiver\'s weight (mg).',
            'The drag force is greater than the skydiver\'s weight.',
            'The magnitude of the drag force is equal to the magnitude of the gravitational force.',
            'The skydiver is in a state of free fall with an acceleration of 9.8 m/s².'
        ],
        correctAnswer: 'The magnitude of the drag force is equal to the magnitude of the gravitational force.',
        explanation: 'At terminal velocity, an object is no longer accelerating, meaning the net force is zero. This occurs when the upward drag force exactly balances the downward force of gravity.'
    },
    {
        id: 'SC-703-2',
        subject: 'Science',
        subtopic: 'Newton\'s Laws of Motion',
        question: 'A book is resting on a horizontal table. According to Newton\'s Third Law, if the Earth exerts a downward gravitational force on the book, what is the corresponding reaction force?',
        options: [
            'The upward normal force exerted by the table on the book.',
            'The downward force exerted by the book on the table.',
            'The upward gravitational force exerted by the book on the Earth.',
            'The friction between the book and the table surface.'
        ],
        correctAnswer: 'The upward gravitational force exerted by the book on the Earth.',
        explanation: 'Newton\'s Third Law states that every action has an equal and opposite reaction of the SAME TYPE. If the action is Earth pulling the book (gravity), the reaction is the book pulling the Earth (gravity). The normal force is a contact force, not a reaction to gravity.'
    },

    // Mathematics (Topic 801: Order of Operations)
    {
        id: 'MA-801-1',
        subject: 'Mathematics',
        subtopic: 'Order of Operations (PEMDAS)',
        question: 'Evaluate the expression based on standard mathematical conventions: $48 \\div 2(9 + 3)$',
        options: ['2', '288', '12', '24'],
        correctAnswer: '288',
        explanation: 'Following PEMDAS/BODMAS: First, parentheses (9+3)=12. Then, multiplication and division are performed from left to right. $48 \\div 2 = 24$, then $24 \\times 12 = 288$.'
    },
    {
        id: 'MA-801-2',
        subject: 'Mathematics',
        subtopic: 'Order of Operations (PEMDAS)',
        question: 'What is the value of the expression: $-3^2 + (-2)^3 \\div \\frac{1}{4}$?',
        options: ['-1', '-41', '-17', '-25'],
        correctAnswer: '-41',
        explanation: '1. Exponents: $-3^2 = -(3 \\times 3) = -9$ and $(-2)^3 = -8$. 2. Division: $-8 \\div (1/4) = -8 \\times 4 = -32$. 3. Addition: $-9 + (-32) = -41$.'
    },
    {
        id: 'MA-801-3',
        subject: 'Mathematics',
        subtopic: 'Order of Operations (PEMDAS)',
        question: 'Evaluate the following: $6 \\div 2(1 + 2)$',
        options: ['1', '9', '6', '3'],
        correctAnswer: '9',
        explanation: 'Parentheses first: (1+2)=3. Then $6 \\div 2 \\times 3$. Left to right: $3 \\times 3 = 9$.'
    },
    {
        id: 'MA-801-4',
        subject: 'Mathematics',
        subtopic: 'Order of Operations (PEMDAS)',
        question: 'What is the result of $10 - 10 \\times 10 + 10$?',
        options: ['0', '100', '-80', '20'],
        correctAnswer: '-80',
        explanation: 'Multiplication first: $10 \\times 10 = 100$. Then addition and subtraction left to right: $10 - 100 + 10 = -90 + 10 = -80$.'
    },

    // Reading Comprehension (Topic 1301: Poetry)
    {
        id: 'RC-1301-1',
        subject: 'Reading Comprehension',
        subtopic: 'Poetry',
        question: 'Identify the literary device used in the following line: "The camera loves her, even when the lights are dim."',
        options: ['Metaphor', 'Personification', 'Hyperbole', 'Synecdoche'],
        correctAnswer: 'Personification',
        explanation: 'Personification is used because an inanimate object, the camera, is given the human emotion of "loving" someone.'
    },
    {
        id: 'RC-1301-2',
        subject: 'Reading Comprehension',
        subtopic: 'Poetry',
        question: 'In poetic meter, what is the term for a foot consisting of one unstressed syllable followed by one stressed syllable?',
        options: ['Trochee', 'Anapest', 'Iamb', 'Dactyl'],
        correctAnswer: 'Iamb',
        explanation: 'An iamb is a metrical foot consisting of an unstressed syllable followed by a stressed syllable ($u /$), commonly used in iambic pentameter.'
    },

    // Science (Topic 501: Cell Biology)
    {
        id: 'SC-501-1',
        subject: 'Science',
        subtopic: 'Structure of a Cell',
        question: 'Which of the following molecules is primarily responsible for maintaining the fluidity of the plasma membrane at extremely low temperatures?',
        options: ['Phospholipids', 'Integral proteins', 'Cholesterol', 'Glycolipids'],
        correctAnswer: 'Cholesterol',
        explanation: 'Cholesterol acts as a "temperature buffer" in cell membranes. At low temperatures, it prevents phospholipids from packing too tightly, maintaining fluidity.'
    },
    {
        id: 'SC-501-2',
        subject: 'Science',
        subtopic: 'Structure of a Cell',
        question: 'According to the endosymbiotic theory, which organelle was originally a free-living prokaryote that was engulfed by a primitive eukaryotic cell?',
        options: ['Golgi Apparatus', 'Endoplasmic Reticulum', 'Mitochondrion', 'Lysosome'],
        correctAnswer: 'Mitochondrion',
        explanation: 'Mitochondria (and chloroplasts) have their own circular DNA, ribosomes similar to bacteria, and a double membrane, supporting the theory that they were once endosymbiotic prokaryotes.'
    }
];

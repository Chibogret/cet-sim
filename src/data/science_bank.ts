import { Question } from '../types/question';

export const scienceQuestions: Question[] = [
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
    {
        id: 'SC-FIG-1-1',
        subject: 'Science',
        subtopic: 'Cell Biology',
        contextTitle: 'Figure A: Plant Cell',
        groupId: 'figure-a',
        figure: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000&auto=format&fit=crop',
        question: 'Identify the large central structure labeled in typical plant cell diagrams that stores water and maintains turgor pressure.',
        options: ['Nucleus', 'Mitochondria', 'Large Central Vacuole', 'Chloroplast'],
        correctAnswer: 'Large Central Vacuole',
        explanation: 'The Large Central Vacuole is a characteristic feature of plant cells, responsible for storage and structural support via turgor pressure.'
    },
    {
        id: 'SC-FIG-1-2',
        subject: 'Science',
        subtopic: 'Cell Biology',
        contextTitle: 'Figure A: Plant Cell',
        groupId: 'figure-a',
        figure: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000&auto=format&fit=crop',
        question: 'Which organelle, visible in a plant cell figure, is responsible for photosynthesis?',
        options: ['Ribosome', 'Chloroplast', 'Smooth ER', 'Centriole'],
        correctAnswer: 'Chloroplast',
        explanation: 'Chloroplasts contain chlorophyll and are the sites where photosynthesis occurs in plant cells.'
    },
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

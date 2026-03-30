export type MediaType = 'text' | 'image';

export interface MediaContent {
  type: MediaType;
  content: string; // Text passage or Image URL
  caption?: string;
}

export interface Question {
  id: string;
  prompt: string;
  type: 'mc';
  options: string[];
  answer: string;
  media?: MediaContent[];
}

export interface QuestionGroup {
  id: string;
  section: string;
  sharedMedia?: MediaContent[];
  questions: Question[];
}

export const flattenQuestions = (groups: QuestionGroup[]): Question[] => {
  return groups.flatMap(g => g.questions);
};

export const questionGroups: QuestionGroup[] = [
  // Language Proficiency
  {
    id: 'g1',
    section: 'Language Proficiency',
    questions: [
      { id: 'q1', prompt: 'Choose the word that best completes the sentence: The politician\'s speech was so ______ that most of the audience fell asleep.', type: 'mc', options: ['A. riveting', 'B. soporific', 'C. lucid', 'D. concise'], answer: 'B' },
      { id: 'q2', prompt: 'Identify the error in the sentence: Neither the manager nor the employees was aware of the new policy.', type: 'mc', options: ['A. Neither the manager', 'B. nor the employees', 'C. was aware', 'D. of the new policy'], answer: 'C' },
      { id: 'q3', prompt: 'What is the synonym of "Ephemeral"?', type: 'mc', options: ['A. Permanent', 'B. Fleeting', 'C. Luminous', 'D. Obscure'], answer: 'B' },
      { id: 'q4', prompt: 'Choose the correct preposition: She is proficient ______ speaking three languages.', type: 'mc', options: ['A. in', 'B. at', 'C. on', 'D. with'], answer: 'A' },
      { id: 'q5', prompt: 'Which of the following sentences is grammatically correct?', type: 'mc', options: ['A. The group of students are going on a field trip.', 'B. The group of students is going on a field trip.', 'C. The group of student are going on a field trip.', 'D. The groups of students is going on a field trip.'], answer: 'B' }
    ]
  },
  
  // Science
  {
    id: 'g2',
    section: 'Science',
    questions: [
      { id: 'q6', prompt: 'Which of the following is NOT a fundamental force of nature?', type: 'mc', options: ['A. Gravity', 'B. Electromagnetism', 'C. Centrifugal force', 'D. Strong nuclear force'], answer: 'C' },
      { id: 'q7', prompt: 'What is the powerhouse of the cell?', type: 'mc', options: ['A. Nucleus', 'B. Ribosome', 'C. Mitochondria', 'D. Endoplasmic reticulum'], answer: 'C' }
    ]
  },
  {
    id: 'g3',
    section: 'Science',
    sharedMedia: [
      {
        type: 'image',
        content: 'https://placehold.co/500x300/e0e0e0/000000?text=Graph:+Enzyme+Activity+vs+pH',
        caption: 'Effect of pH on the activity of Enzyme X.'
      }
    ],
    questions: [
      { id: 'q8', prompt: 'Based on the figure above, what is the optimal pH for Enzyme X?', type: 'mc', options: ['A. 2.0', 'B. 7.0', 'C. 8.5', 'D. 10.0'], answer: 'B' },
      { id: 'q9', prompt: 'What happens to the enzyme activity at pH 10?', type: 'mc', options: ['A. It reaches its peak.', 'B. It denatures and activity drops to zero.', 'C. It stabilizes.', 'D. It reverses the reaction.'], answer: 'B' }
    ]
  },

  // Mathematics
  {
    id: 'g4',
    section: 'Mathematics',
    questions: [
      { id: 'q11', prompt: 'If $3x - 7 = 14$, what is the value of $x$?', type: 'mc', options: ['A. $5$', 'B. $7$', 'C. $9$', 'D. $21$'], answer: 'B' },
      { id: 'q12', prompt: 'What is the derivative of $f(x) = x^2 + 3x$?', type: 'mc', options: ['A. $2x + 3$', 'B. $x + 3$', 'C. $2x$', 'D. $3$'], answer: 'A' },
      { 
        id: 'q14', 
        prompt: 'What is the area of the shaded region in the figure above?', 
        type: 'mc', 
        options: ['A. 8π', 'B. 16π', 'C. 4π', 'D. 2π'], 
        answer: 'B',
        media: [{ type: 'image', content: 'https://placehold.co/300x300/e0e0e0/000000?text=Circle+Radius+4', caption: 'A circle with radius r=4.' }]
      }
    ]
  },

  // Reading Comprehension
  {
    id: 'g5',
    section: 'Reading Comprehension',
    sharedMedia: [
      {
        type: 'text',
        content: "The concept of 'neuroplasticity' has revolutionized our understanding of the human brain. For decades, the prevailing scientific dogma asserted that the adult brain was a static organ, its neural pathways hardwired and immutable after a certain age. However, pioneering research in the late 20th century demonstrated that the brain possesses a remarkable ability to reorganize itself by forming new neural connections throughout life. This adaptability allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or to changes in their environment. For instance, studies on stroke victims have shown that when one hemisphere of the brain is damaged, the intact hemisphere can sometimes take over some of its functions. Furthermore, neuroplasticity is not solely a response to trauma; it is the fundamental mechanism underlying learning and memory. Every time we learn a new skill, be it playing an instrument or speaking a foreign language, our brain physically changes, strengthening certain synapses and pruning others."
      }
    ],
    questions: [
      { id: 'q16', prompt: 'What was the "prevailing scientific dogma" regarding the adult brain prior to the late 20th century?', type: 'mc', options: ['A. It was constantly forming new connections.', 'B. It was a static, unchangeable organ.', 'C. It could only change in response to severe trauma.', 'D. It was primarily responsible for motor functions.'], answer: 'B' },
      { id: 'q17', prompt: 'According to the passage, which of the following is an example of neuroplasticity?', type: 'mc', options: ['A. The pruning of synapses during early childhood.', 'B. The intact hemisphere of a stroke victim taking over lost functions.', 'C. The inability to learn a new language after a certain age.', 'D. The hardwiring of neural pathways.'], answer: 'B' },
      { id: 'q18', prompt: 'The author mentions learning to play an instrument to illustrate that:', type: 'mc', options: ['A. Neuroplasticity only occurs during deliberate practice.', 'B. Musical ability is hardwired into the brain.', 'C. Neuroplasticity is the mechanism behind everyday learning.', 'D. The brain is more plastic in musicians than in non-musicians.'], answer: 'C' }
    ]
  }
];

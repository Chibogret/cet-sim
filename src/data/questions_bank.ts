import { Question } from '../types/question';
import { scienceQuestions } from './science_bank';
import { mathQuestions } from './math_bank';
import { languageQuestions } from './language_bank';
import { readingQuestions, readingPassages } from './reading_bank';

// Hydrate reading questions with their respective passages
const hydratedReadingQuestions = readingQuestions.map(q => {
    if (q.groupId) {
        const passageData = readingPassages.find(p => p.groupId === q.groupId);
        if (passageData) {
            return {
                ...q,
                contextTitle: passageData.contextTitle,
                passage: passageData.passage
            };
        }
    }
    return q;
});

export const questionsBank: Question[] = [
    ...languageQuestions,
    ...scienceQuestions,
    ...mathQuestions,
    ...hydratedReadingQuestions
];

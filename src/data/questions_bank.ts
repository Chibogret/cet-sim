import { Question } from '../types/question';
import { scienceQuestions } from './science_bank';
import { mathQuestions } from './math_bank';
import { languageQuestions, languageGroups } from './language_bank';
import { readingQuestions, readingPassages } from './reading_bank';

// Hydrate language questions with their respective instructions/context
const hydratedLanguageQuestions = languageQuestions.map(q => {
    if (q.groupId) {
        const groupData = languageGroups.find(g => g.groupId === q.groupId);
        if (groupData) {
            return {
                ...q,
                contextTitle: groupData.contextTitle,
                instruction: groupData.instruction
            };
        }
    }
    return q;
});

// Hydrate reading questions with their respective passages
const hydratedReadingQuestions = readingQuestions.map(q => {
    if (q.groupId) {
        const passageData = readingPassages.find(p => p.groupId === q.groupId);
        if (passageData) {
            return {
                ...q,
                contextTitle: passageData.contextTitle,
                passage: passageData.passage,
                instruction: passageData.instruction
            };
        }
    }
    return q;
});

export const questionsBank: Question[] = [
    ...hydratedLanguageQuestions,
    ...scienceQuestions,
    ...mathQuestions,
    ...hydratedReadingQuestions
];

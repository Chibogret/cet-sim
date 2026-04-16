import { Question } from '../types/question';

export const mathQuestions: Question[] = [
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
    }
];

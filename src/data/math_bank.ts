// TODO: Add figures manually for the following Math questions: 
// MA-1007-1 (Circle with inscribed triangle and central angle)

import { Question } from '../types/question';

export const mathQuestions: Question[] = [
    {
        id: 'MA-901-1',
        subject: 'Mathematics',
        subtopic: 'Set and Set Notation',
        question: 'The Mathematics Club has 52 members, while the English Club has 39 members. If 21 students are members of both the Mathematics and English Club, how many students will be there when the two clubs meet together?',
        options: ['91', '70', '49', '21'],
        correctAnswer: '70',
        explanation: 'Using the Principle of Inclusion-Exclusion: Total = n(Math) + n(English) - n(Both) = 52 + 39 - 21 = 70.'
    },
    {
        id: 'MA-901-2',
        subject: 'Mathematics',
        subtopic: 'Set and Set Notation',
        question: 'Which of the following translates to this diagram:',
        figure: '/assets/figures/MA-901-2.png',
        options: [
            '$(A \\cup B \\cup C) - (B \\cap C) - A\'$',
            '$C \\cup (A \\cap B)$',
            '$(A \\cap B \\cup C) \\cap (A \\cup C)$',
            '$(C - (C \\cap B)) \\cup (A \\cap B)$'
        ],
        correctAnswer: '$C \\cup (A \\cap B)$',
        explanation: 'The shaded region encompasses the entirety of circle C, as well as the intersection between circles A and B. This perfectly translates to the union of set C and the intersection of A and B, which is $C \\cup (A \\cap B)$.'
    },
    {
        id: 'MA-901-3',
        subject: 'Mathematics',
        subtopic: 'Set and Set Notation',
        question: 'Given the sets:\nA = set of all natural numbers\nB = set of all whole numbers\nC = set of all integral numbers\nWhat is $A \\cap B \\cap C$?',
        options: [
            '$\\varnothing$',
            '$\\{0\\}$',
            'set of all counting numbers',
            'set of all real numbers'
        ],
        correctAnswer: 'set of all counting numbers',
        explanation: 'Natural numbers are $\{1, 2, 3, \\dots\}$, whole numbers include zero $\{0, 1, 2, \\dots\}$, and integers include negatives. Their intersection is the most restrictive set, which is the natural numbers (also known as counting numbers).'
    },
    {
        id: 'MA-801-1',
        subject: 'Mathematics',
        subtopic: 'Order of Operations (PEMDAS)',
        question: '$4.5 \\times 5 - 5 + 5 \\div 5 = ?$ Wait, the question is numbered 4, and the expression is $5 \\times 5 - 5 + 5 \\div 5 = ?$',
        options: ['5', '19', '21', '25'],
        correctAnswer: '21',
        explanation: 'Following PEMDAS: perform multiplication and division first. $(5 \\times 5) - 5 + (5 \\div 5) = 25 - 5 + 1 = 21$.'
    },
    {
        id: 'MA-812-1',
        subject: 'Mathematics',
        subtopic: 'Divisibility Rules',
        question: 'Which of the following is NOT divisible by 7?',
        options: ['287', '301', '329', '373'],
        correctAnswer: '373',
        explanation: 'Testing each option: $287 = 7 \\times 41$, $301 = 7 \\times 43$, $329 = 7 \\times 47$. $373 \\div 7 \\approx 53.28$, meaning 373 is not evenly divisible by 7.'
    },
    {
        id: 'MA-807-1',
        subject: 'Mathematics',
        subtopic: 'Fractions and Decimals',
        question: 'Arrange the following in ASCENDING order: $1\\frac{1}{3} , 0.45 , 1.5\\% , \\frac{9}{8} , \\frac{19}{57}$',
        options: [
            '$\\frac{19}{57} , \\frac{9}{8} , 0.45 , 1\\frac{1}{3} , 1.5\\%$',
            '$1.5\\% , \\frac{19}{57} , 0.45 , \\frac{9}{8} , 1\\frac{1}{3}$',
            '$\\frac{19}{57} , \\frac{9}{8} , 0.45 , 1.5\\% , 1\\frac{1}{3}$',
            '$1.5\\% , \\frac{19}{57} , 0.45 , 1\\frac{1}{3} , \\frac{9}{8}$'
        ],
        correctAnswer: '$1.5\\% , \\frac{19}{57} , 0.45 , \\frac{9}{8} , 1\\frac{1}{3}$',
        explanation: 'Convert everything to decimals to compare: $1.5\\% = 0.015$; $\\frac{19}{57} = \\frac{1}{3} \\approx 0.333$; $0.45 = 0.45$; $\\frac{9}{8} = 1.125$; $1\\frac{1}{3} \\approx 1.333$. In ascending order: $1.5\\%$, $\\frac{19}{57}$, $0.45$, $\\frac{9}{8}$, $1\\frac{1}{3}$.'
    },
    {
        id: 'MA-804-1',
        subject: 'Mathematics',
        subtopic: 'GCF and LCM',
        question: 'What is the greatest common factor of 149 and 163?',
        options: ['19', '13', '11', '1'],
        correctAnswer: '1',
        explanation: 'Both 149 and 163 are prime numbers. Therefore, their only common factor is 1.'
    },
    {
        id: 'MA-807-2',
        subject: 'Mathematics',
        subtopic: 'Fractions and Decimals',
        question: 'Five-eighths of the half of 144 is equivalent to one-thirds of what number?',
        options: ['45', '90', '135', '405'],
        correctAnswer: '135',
        explanation: 'Half of 144 is 72. $\\frac{5}{8}$ of 72 is $5 \\times 9 = 45$. Let $x$ be the unknown number. $\\frac{1}{3}x = 45$, so $x = 135$.'
    },
    {
        id: 'MA-906-1',
        subject: 'Mathematics',
        subtopic: 'Evaluation',
        question: 'Evaluate $x^2 + \\frac{xy - 2z}{(y-z)^2}$ if $x=2, y=-1$ and $z=3$.',
        options: ['7/2', '3', '13/2', '11'],
        correctAnswer: '7/2',
        explanation: 'Substitute the values: $x^2 = 4$; Numerator: $(2)(-1) - 2(3) = -2 - 6 = -8$; Denominator: $(-1-3)^2 = (-4)^2 = 16$. Result is $4 + \\frac{-8}{16} = 4 - 0.5 = 3.5 = \\frac{7}{2}$.'
    },
    {
        id: 'MA-902-1',
        subject: 'Mathematics',
        subtopic: 'Operations on Expressions',
        question: 'Simplify the expression: $3(2x+5) - \\{-x + 2[2 - 3(1+x)]\\} +[-x + 2(-x + 5)]$',
        options: ['6x + 15', '10x + 27', '-4x + 23', '-2x + 23'],
        correctAnswer: '10x + 27',
        explanation: 'Term 1: $6x + 15$. Term 2: $-\\{-x + 2[2-3-3x]\\} = -\\{-x - 2 - 6x\\} = 7x + 2$. Term 3: $-x - 2x + 10 = -3x + 10$. Summing them up: $(6x + 15) + (7x + 2) + (-3x + 10) = 10x + 27$.'
    },
    {
        id: 'MA-903-1',
        subject: 'Mathematics',
        subtopic: 'Polynomials',
        question: 'What is the degree of $7xy^5z^3$?',
        options: ['1', '5', '9', '15'],
        correctAnswer: '9',
        explanation: 'The degree of a monomial is the sum of the exponents of its variables: $1 (for x) + 5 (for y) + 3 (for z) = 9$.'
    },
    {
        id: 'MA-903-2',
        subject: 'Mathematics',
        subtopic: 'Polynomials',
        question: 'What is the degree of the polynomial $2a^2bc - d^3e^2f + 5g^2h^3i^2$?',
        options: ['3', '5', '7', '17'],
        correctAnswer: '7',
        explanation: 'Calculate the degree of each term. Term 1: $2+1+1=4$; Term 2: $3+2+1=6$; Term 3: $2+3+2=7$. The polynomial\'s degree is the highest degree among its terms, which is 7.'
    },
    {
        id: 'MA-903-3',
        subject: 'Mathematics',
        subtopic: 'Polynomials',
        question: 'Which of the following polynomials has the highest degree?',
        options: [
            '$32a^3b^8 - 15a^5b^4$',
            '$-2x^3y^2z^5$',
            '$m^2n^3 + 3mn^4$',
            '$((x^2)^2)^2$'
        ],
        correctAnswer: '$32a^3b^8 - 15a^5b^4$',
        explanation: 'Check degrees: A has max degree $3+8=11$; B has degree $3+2+5=10$; C has max degree $2+3=5$; D evaluates to $x^8$, so its degree is 8. Option A has the highest degree.'
    },
    {
        id: 'MA-902-2',
        subject: 'Mathematics',
        subtopic: 'Operations on Expressions',
        question: 'Simplify $(2-a-b)(2+a+b) + (2-a)(2+b)$.',
        options: [
            '$8 + a^2 - 3ab + b^2 - 2a - 2b$',
            '$8 - a^2 - 3ab - b^2 - 2a + 2b$',
            '$8 - a^2 + 3ab - b^2 + 2a + 2b$',
            '$8 - a^2 - 3ab - b^2 + 2a - 2b$'
        ],
        correctAnswer: '$8 - a^2 - 3ab - b^2 - 2a + 2b$',
        explanation: 'First part is difference of squares: $(2 - (a+b))(2 + (a+b)) = 4 - (a^2 + 2ab + b^2)$. Second part: $4 + 2b - 2a - ab$. Adding them together: $4 - a^2 - 2ab - b^2 + 4 + 2b - 2a - ab = 8 - a^2 - 3ab - b^2 - 2a + 2b$.'
    },
    {
        id: 'MA-903-4',
        subject: 'Mathematics',
        subtopic: 'Special Products',
        question: 'Find the product: $(x+y)(x-y-z)$',
        options: [
            '$x^2 - xz - yz - y^2$',
            '$x^2 - 2xy + yz - xz - y^2$',
            '$x^2 - xy - yz + y^2$',
            '$x^2 - xy + yz - xz - y^2$'
        ],
        correctAnswer: '$x^2 - xz - yz - y^2$',
        explanation: 'Distribute each term: $x(x-y-z) + y(x-y-z) = x^2 - xy - xz + xy - y^2 - yz$. The $-xy$ and $+xy$ cancel out, leaving $x^2 - xz - yz - y^2$.'
    },
    {
        id: 'MA-903-5',
        subject: 'Mathematics',
        subtopic: 'Synthetic Division',
        question: 'Divide $a^3 - 12a^2 + 32a - 15$ by $a-3$.',
        options: [
            '$a^2 + 6a - 5$',
            '$a^2 - 6a + 5$',
            '$a^2 + 9a - 5$',
            '$a^2 - 9a + 5$'
        ],
        correctAnswer: '$a^2 - 9a + 5$',
        explanation: 'Using synthetic or long division with root $a=3$: $1 \\times 3 = 3$; $-12 + 3 = -9$; $-9 \\times 3 = -27$; $32 - 27 = 5$; $5 \\times 3 = 15$; $-15 + 15 = 0$. The quotient is $a^2 - 9a + 5$.'
    },
    {
        id: 'MA-1202-1',
        subject: 'Mathematics',
        subtopic: 'Measures of Central Tendency',
        question: 'What is the mean of all prime numbers between 30 and 50?',
        options: ['119/3', '124/3', '199/5', '207/5'],
        correctAnswer: '199/5',
        explanation: 'The prime numbers between 30 and 50 are 31, 37, 41, 43, and 47. Sum = $31 + 37 + 41 + 43 + 47 = 199$. Since there are 5 numbers, the mean is $\\frac{199}{5}$.'
    },
    {
        id: 'MA-1202-2',
        subject: 'Mathematics',
        subtopic: 'Measures of Central Tendency',
        question: '92, 81, 95, 89 and x are the scores Adam got on his five Math quizzes. If the average of Adam\'s quizzes is 86.2, what score did he get on his fifth quiz?',
        options: ['68', '74', '77', '83'],
        correctAnswer: '74',
        explanation: 'Set up the equation for the mean: $(92 + 81 + 95 + 89 + x) / 5 = 86.2$. Total points = $86.2 \\times 5 = 431$. Sum of known scores = 357. $x = 431 - 357 = 74$.'
    },
    {
        id: 'MA-1203-1',
        subject: 'Mathematics',
        subtopic: 'Combination and Permutation',
        question: 'In a certain school, a student ID constitutes 2 letters and then 3 digits (ex. \'ab123\') which cannot be jumbled. If repetition of the letters and digits is allowed, how many student IDs are possible?',
        options: ['316,000', '410,000', '650,000', '676,000'],
        correctAnswer: '676,000',
        explanation: 'Letters = $26 \\times 26 = 676$. Digits = $10 \\times 10 \\times 10 = 1000$. Total combinations = $676 \\times 1000 = 676,000$.'
    },
    {
        id: 'MA-1203-2',
        subject: 'Mathematics',
        subtopic: 'Combination and Permutation',
        question: 'A school canteen offers 3 different types of rice, 5 meat dishes, 7 vegetable dishes, and 4 fruits. If students can only choose a type of rice, a meat or a vegetable dish, and a fruit, how many possible combinations could there be?',
        options: ['19', '144', '390', '420'],
        correctAnswer: '144',
        explanation: 'By fundamental counting principle: Options for rice = 3. Options for the second dish (meat OR veg) = $5 + 7 = 12$. Options for fruit = 4. Total = $3 \\times 12 \\times 4 = 144$.'
    },
    {
        id: 'MA-1203-3',
        subject: 'Mathematics',
        subtopic: 'Combination and Permutation',
        question: 'How many words, with or without meaning, can you form with the letters of the word BANANA?',
        options: ['60', '90', '708', '720'],
        correctAnswer: '60',
        explanation: 'BANANA has 6 letters total with repetitions (3 A\'s and 2 N\'s). Permutations = $\\frac{6!}{3! \\times 2!} = \\frac{720}{6 \\times 2} = \\frac{720}{12} = 60$.'
    },
    {
        id: 'MA-904-1',
        subject: 'Mathematics',
        subtopic: 'Linear Equations',
        question: 'Which among the following is a linear equation?',
        options: [
            '$C = \\frac{5}{9}(F-32)$',
            '$x - 2xy + y = 0$',
            '$\\beta + \\frac{1}{\\beta} = -1$',
            '$\\frac{\\sqrt{a} + \\sqrt{b}}{ab} = 0$'
        ],
        correctAnswer: '$C = \\frac{5}{9}(F-32)$',
        explanation: 'A linear equation has highest degree of 1 and contains no products of variables or variables in denominators/radicals. Option A is the only one satisfying these conditions.'
    },
    {
        id: 'MA-904-2',
        subject: 'Mathematics',
        subtopic: 'Linear Equations',
        question: 'Calculate the value of $x$: $7(5-2x) + 1 = 3x + 2$.',
        options: ['0', '1', '2', '3'],
        correctAnswer: '2',
        explanation: 'Distribute: $35 - 14x + 1 = 3x + 2 \\Rightarrow 36 - 14x = 3x + 2$. Isolate $x$: $34 = 17x \\Rightarrow x = 2$.'
    },
    {
        id: 'MA-905-1',
        subject: 'Mathematics',
        subtopic: 'Quadratic Formula',
        question: 'Find the roots of the equation $a^2 + 6a - 5 = 0$?',
        options: [
            '$\\{-1, -5\\}$',
            '$\\{-1, 5\\}$',
            '$\\{-3 \\pm \\sqrt{14}\\}$',
            '$\\{-3 \\pm 3\\sqrt{2}\\}$'
        ],
        correctAnswer: '$\\{-3 \\pm \\sqrt{14}\\}$',
        explanation: 'Using quadratic formula: $a = \\frac{-6 \\pm \\sqrt{6^2 - 4(1)(-5)}}{2} = \\frac{-6 \\pm \\sqrt{36 + 20}}{2} = \\frac{-6 \\pm \\sqrt{56}}{2} = \\frac{-6 \\pm 2\\sqrt{14}}{2} = -3 \\pm \\sqrt{14}$.'
    },
    {
        id: 'MA-905-2',
        subject: 'Mathematics',
        subtopic: 'Quadratic Formula',
        question: 'Determine the solution set of $2y^2 + y - 7 = 0$.',
        options: [
            '$\\{3/2, -2\\}$',
            '$\\{-3/2, 2\\}$',
            '$\\{\\frac{-1 \\pm \\sqrt{53}}{4}\\}$',
            '$\\{\\frac{-1 \\pm \\sqrt{57}}{4}\\}$'
        ],
        correctAnswer: '$\\{\\frac{-1 \\pm \\sqrt{57}}{4}\\}$',
        explanation: 'Using quadratic formula: $y = \\frac{-1 \\pm \\sqrt{1^2 - 4(2)(-7)}}{2(2)} = \\frac{-1 \\pm \\sqrt{1 + 56}}{4} = \\frac{-1 \\pm \\sqrt{57}}{4}$.'
    },
    {
        id: 'MA-903-6',
        subject: 'Mathematics',
        subtopic: 'Synthetic Division',
        question: 'Calculate for the roots of the equation $3a^4 - 5a^3 - 10a^2 + 20a - 8 = 0$.',
        options: [
            '$\\{1/3, 1, -2, +2\\}$',
            '$\\{1/3, -1, -2, +2\\}$',
            '$\\{2/3, 1, -2, +2\\}$',
            '$\\{2/3, -1, -2, +2\\}$'
        ],
        correctAnswer: '$\\{2/3, 1, -2, +2\\}$',
        explanation: 'Testing $a=1$: $3(1) - 5(1) - 10(1) + 20(1) - 8 = 0$, so $a=1$ is a root. The product of roots for $px^4+...+qx^0=0$ is $q/p = -8/3$. Evaluating the valid options, product of $\\{2/3, 1, -2, 2\\}$ equals $-8/3$.'
    },
    {
        id: 'MA-903-7',
        subject: 'Mathematics',
        subtopic: 'Synthetic Division',
        question: 'Find the remainder when $2z^{9876} - z^{543} + 3z^{21} + 5z^0 - 1$ is divided by $z+1$.',
        options: ['1', '2', '3', '4'],
        correctAnswer: '4',
        explanation: 'By the Remainder Theorem, evaluate the polynomial at $z = -1$. $2(-1)^{9876} - (-1)^{543} + 3(-1)^{21} + 5(1) - 1 = 2(1) - (-1) + 3(-1) + 5 - 1 = 2 + 1 - 3 + 5 - 1 = 4$.'
    },
    {
        id: 'MA-906-2',
        subject: 'Mathematics',
        subtopic: 'Rational Functions',
        question: 'Calculate for the solution set of $\\frac{u-16}{u+5} = \\frac{u^3 - 64}{u^2 + u - 20}$.',
        options: ['$\\{\\}$', '$\\{8, 16\\}$', '$\\mathbb{R}$', '$\\mathbb{R} \\setminus \\{-5, 4\\}$'],
        correctAnswer: '$\\{\\}$',
        explanation: 'Simplify the right side: $\\frac{(u-4)(u^2+4u+16)}{(u+5)(u-4)} = \\frac{u^2+4u+16}{u+5}$. Setting numerators equal (since denominators are identical): $u - 16 = u^2 + 4u + 16 \\Rightarrow u^2 + 3u + 32 = 0$. The discriminant $3^2 - 4(1)(32) = -119 < 0$, meaning no real solutions.'
    },
    {
        id: 'MA-906-3',
        subject: 'Mathematics',
        subtopic: 'Rational Functions',
        question: 'In the rational equation $\\frac{2x-3}{x+4} = \\frac{y}{2x^2 + 5x - 12}$, what must be the value of $y$ such that the solution set would be $\\{1, 2\\}$?',
        options: ['1', '-4', '3/2', 'Both B and C'],
        correctAnswer: '1',
        explanation: 'Note that $2x^2 + 5x - 12 = (2x - 3)(x + 4)$. Multiply both sides by $(2x - 3)(x + 4)$, resulting in $(2x - 3)^2 = y$. Testing $x=1$ yields $y=(-1)^2=1$. Testing $x=2$ yields $y=(1)^2=1$.'
    },
    {
        id: 'MA-906-4',
        subject: 'Mathematics',
        subtopic: 'Radical Functions',
        question: 'Calculate for the value of $s$ such that the equation $\\sqrt{r^2 - s} - (r+3) = 1$ has a solution set of $\\{-3\\}$.',
        options: ['-10', '10', '-8', '8'],
        correctAnswer: '8',
        explanation: 'Substitute $r = -3$ into the equation: $\\sqrt{(-3)^2 - s} - (-3+3) = 1 \\Rightarrow \\sqrt{9 - s} - 0 = 1 \\Rightarrow 9 - s = 1^2 \\Rightarrow s = 8$.'
    },
    {
        id: 'MA-906-5',
        subject: 'Mathematics',
        subtopic: 'Radical Functions',
        question: 'Solve for the solution set of the radical equation $\\sqrt{\\beta^2 + 4\\beta + 4} = \\beta + 2$.',
        options: [
            '$\\{-2, 2\\}$',
            '$\\{-1\\}$',
            '$\\{-2, -1, 2\\}$',
            '$\\{-2, -1\\}$'
        ],
        correctAnswer: '$\\{-2, -1, 2\\}$',
        explanation: 'The equation simplifies to $\\sqrt{(\\beta+2)^2} = \\beta+2$, which implies $|\\beta+2| = \\beta+2$. This is true for all $\\beta \\ge -2$. The largest set among the options that only contains valid solutions is $\\{-2, -1, 2\\}$.'
    },
    {
        id: 'MA-901-4',
        subject: 'Mathematics',
        subtopic: 'Set and Set Notation',
        question: 'Which of the following interval notation represent this illustration:',
        figure: '/assets/figures/MA-901-4.png',
        options: [
            '$(-\\infty, a] \\cap[b, +\\infty)$',
            '$(-\\infty, a) \\cap (b, +\\infty)$',
            '$(-\\infty, a] \\cup[b, +\\infty)$',
            '$(-\\infty, a] \\cup (b, +\\infty)$'
        ],
        correctAnswer: '$(-\\infty, a] \\cup (b, +\\infty)$',
        explanation: 'The number line shows a shaded region to the left of "a" ending in a solid circle, translating to $(-\\infty, a]$. The region to the right starts at an open circle "b", translating to $(b, \\infty)$. Both regions represent the solution via a union.'
    },
    {
        id: 'MA-904-3',
        subject: 'Mathematics',
        subtopic: 'Linear Equations',
        question: '$k - 3 < 5k + 7 \\le 2$ has a solution set of?',
        options: [
            '$(-5/2, -1]$',
            '$(-\\infty, -5/2] \\cup[-1, +\\infty)$',
            '$(-\\infty, -5/3] \\cup[-1, +\\infty)$',
            '$(-5/3, -1]$'
        ],
        correctAnswer: '$(-5/2, -1]$',
        explanation: 'Solve the compound inequality: 1) $k - 3 < 5k + 7 \\Rightarrow -10 < 4k \\Rightarrow k > -5/2$. 2) $5k + 7 \\le 2 \\Rightarrow 5k \\le -5 \\Rightarrow k \\le -1$. The intersection is $-5/2 < k \\le -1$, or $(-5/2, -1]$.'
    },
    {
        id: 'MA-906-6',
        subject: 'Mathematics',
        subtopic: 'Rational Functions',
        question: 'Find the solution set of $-2 \\le \\frac{2x+3}{x-5} < 3$.',
        options: [
            '$[7/4, 18)$',
            '$7/4 < x < 18$',
            '$(-\\infty, 7/4) \\cup[18, +\\infty)$',
            '$(-\\infty, 7/4] \\cup (18, +\\infty)$'
        ],
        correctAnswer: '$(-\\infty, 7/4] \\cup (18, +\\infty)$',
        explanation: 'Split into two inequalities. $\\frac{2x+3}{x-5} \\ge -2 \\Rightarrow \\frac{4x-7}{x-5} \\ge 0$ which yields $(-\\infty, 7/4] \\cup (5, \\infty)$. Next, $\\frac{2x+3}{x-5} < 3 \\Rightarrow \\frac{-x+18}{x-5} < 0 \\Rightarrow \\frac{x-18}{x-5} > 0$ which yields $(-\\infty, 5) \\cup (18, \\infty)$. Their intersection is $(-\\infty, 7/4] \\cup (18, \\infty)$.'
    },
    {
        id: 'MA-906-7',
        subject: 'Mathematics',
        subtopic: 'Absolute Value Functions',
        question: 'What is the solution set of $2|2r+5| \\ge r+5$?',
        options: [
            '$[-3, -5/3]$',
            '$[-17/5, -1]$',
            '$(-\\infty, -3] \\cup[-5/3, +\\infty)$',
            '$(-\\infty, -17/5] \\cup[-1, +\\infty)$'
        ],
        correctAnswer: '$(-\\infty, -3] \\cup[-5/3, +\\infty)$',
        explanation: 'Case 1 ($r \\ge -5/2$): $4r+10 \\ge r+5 \\Rightarrow 3r \\ge -5 \\Rightarrow r \\ge -5/3$. Case 2 ($r < -5/2$): $-4r-10 \\ge r+5 \\Rightarrow -5r \\ge 15 \\Rightarrow r \\le -3$. The union is $(-\\infty, -3] \\cup[-5/3, \\infty)$.'
    },
    {
        id: 'MA-906-8',
        subject: 'Mathematics',
        subtopic: 'Domain and Range',
        question: 'Which of the following graphs is NOT a function?',
        figure: '/assets/figures/MA-906-8.png',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'D',
        explanation: 'Graph D depicts a circle. Using the vertical line test, a single vertical line can intersect a circle at two different points, meaning a single x-value maps to multiple y-values. Therefore, it is not a function.'
    },
    {
        id: 'MA-906-9',
        subject: 'Mathematics',
        subtopic: 'Domain and Range',
        question: 'What is the domain and range of the ordered pairs $(1,a), (2,b)$ and $(3,c)$?',
        options: [
            'domain = $\\{1, 2, 3\\}$; range = $\\{a, b, c\\}$',
            'domain = $\\{a, b, c\\}$; range = $\\{1, 2, 3\\}$',
            'domain = $\\{(1,a), (2,b), (3,c)\\}$; range = $\\varnothing$',
            'domain = $\\varnothing$; range = $\\{(1,a), (2,b), (3,c)\\}$'
        ],
        correctAnswer: 'domain = $\\{1, 2, 3\\}$; range = $\\{a, b, c\\}$',
        explanation: 'The domain consists of all the first coordinates (x-values) which are $\{1, 2, 3\}$. The range consists of all the second coordinates (y-values) which are $\{a, b, c\}$.'
    },
    {
        id: 'MA-906-10',
        subject: 'Mathematics',
        subtopic: 'Evaluation',
        question: 'Given the functions $f(x) = 2x^2 - 5x + 4$ and $g(x) = x - 2$, what is $(f \\circ g)(x)$?',
        options: [
            '$2x^2 - 3x + 2$',
            '$2x^2 - 13x + 22$',
            '$2x^2 - 3x + 22$',
            '$2x^2 - 13x + 2$'
        ],
        correctAnswer: '$2x^2 - 13x + 22$',
        explanation: 'Substitute $g(x)$ into $f(x)$: $2(x-2)^2 - 5(x-2) + 4 = 2(x^2 - 4x + 4) - 5x + 10 + 4 = 2x^2 - 8x + 8 - 5x + 14 = 2x^2 - 13x + 22$.'
    },
    {
        id: 'MA-906-11',
        subject: 'Mathematics',
        subtopic: 'Domain and Range',
        question: 'Solve for the domain and range of the function $f(x) = \\frac{3x-4}{x+2}$.',
        options: [
            'domain = $\\{x \\mid x \\in \\mathbb{R}, x \\neq -2\\}$ ; range = $\\{y \\mid y \\in \\mathbb{R}, y \\neq 3\\}$',
            'domain = $\\{x \\mid x = 4/3\\}$ ; range = $\\{y \\mid y = 2\\}$',
            'domain = $\\{x \\mid x \\in \\mathbb{R}, x \\neq -2\\}$ ; range = $\\{y \\mid y \\in \\mathbb{R}, y \\neq -3\\}$',
            'domain = $\\{x \\mid x = 4/3\\}$ ; range = $\\{y \\mid y = -2\\}$'
        ],
        correctAnswer: 'domain = $\\{x \\mid x \\in \\mathbb{R}, x \\neq -2\\}$ ; range = $\\{y \\mid y \\in \\mathbb{R}, y \\neq 3\\}$',
        explanation: 'Domain: Denominator cannot be zero, so $x+2 \\neq 0 \\Rightarrow x \\neq -2$. Range: Find the horizontal asymptote. For $\\frac{ax+b}{cx+d}$, it is $y=a/c$. Hence $y \\neq 3/1 \\Rightarrow y \\neq 3$.'
    },
    {
        id: 'MA-906-12',
        subject: 'Mathematics',
        subtopic: 'Rational Functions',
        question: 'Solve for the x- and y-intercepts of the function $f(x) = \\frac{3x-4}{x+2}$.',
        options: [
            'x-intercept = $(0, 4/3)$; y-intercept = $(0, -2)$',
            'x-intercept = $(0, 4/3)$; y-intercept = $(0, 3)$',
            'x-intercept = $(4/3, 0)$; y-intercept = $(0, -2)$',
            'x-intercept = $(4/3, 0)$; y-intercept = $(3, 0)$'
        ],
        correctAnswer: 'x-intercept = $(4/3, 0)$; y-intercept = $(0, -2)$',
        explanation: 'For x-intercept, set $y=0$: $3x - 4 = 0 \\Rightarrow x = 4/3$. For y-intercept, set $x=0$: $y = -4 / 2 = -2$.'
    },
    {
        id: 'MA-906-13',
        subject: 'Mathematics',
        subtopic: 'Piecewise Functions',
        question: 'Given the piecewise function, $g(x) = \\begin{cases} \\log_2 x & \\text{if } x < 2 \\\\ 2^{5-3x} & \\text{if } x = 2 \\\\ x(x-5) & \\text{if } x > 2 \\end{cases}$, what is the value of $g(g(2))$?',
        options: ['-1/2', '1/2', '-1', '1'],
        correctAnswer: '-1',
        explanation: 'Evaluate inner function $g(2)$. Since $x=2$, use the second piece: $2^{5-3(2)} = 2^{-1} = 1/2$. Now evaluate $g(1/2)$. Since $1/2 < 2$, use the first piece: $\\log_2 (1/2) = -1$.'
    },
    {
        id: 'MA-904-4',
        subject: 'Mathematics',
        subtopic: 'Linear Equations',
        question: 'Which of the following equations are parallel and perpendicular to $3x - y = 2$?',
        options: [
            'parallel: $3x + y = 2$; perpendicular: $x - 3y = 6$',
            'parallel: $x - 3y = 6$; perpendicular: $3x + y = 2$',
            'parallel: $-3x + y = 2$; perpendicular: $x + 3y = 6$',
            'parallel: $x + 3y = 6$; perpendicular: $-3x + y = 2$'
        ],
        correctAnswer: 'parallel: $-3x + y = 2$; perpendicular: $x + 3y = 6$',
        explanation: 'Original equation $y = 3x - 2$ has slope 3. Parallel lines have slope 3; perpendicular lines have slope $-1/3$. In Option C: $-3x + y = 2 \\Rightarrow y = 3x + 2$ (slope 3). $x + 3y = 6 \\Rightarrow y = -1/3x + 2$ (slope $-1/3$).'
    },
    {
        id: 'MA-908-1',
        subject: 'Mathematics',
        subtopic: 'Arithmetic Sequence',
        question: 'Find the sum of the first 6 terms of the series $1/3, 23/24, 19/12, \\dots$',
        options: ['77/8', '77/4', '91/8', '107/4'],
        correctAnswer: '91/8',
        explanation: 'Convert to common denominator: $8/24, 23/24, 38/24$. Difference $d = 15/24$. $S_n = \\frac{n}{2}[2a_1 + (n-1)d] = \\frac{6}{2}[2(8/24) + 5(15/24)] = 3[16/24 + 75/24] = 3(91/24) = 91/8$.'
    },
    {
        id: 'MA-1005-1',
        subject: 'Mathematics',
        subtopic: 'Lines and Angles',
        question: 'What is the measure of the $\\angle a$?',
        figure: '/assets/figures/MA-1005-1.png',
        options: ['$21^\\circ$', '$23^\\circ$', '$42^\\circ$', '$46^\\circ$'],
        correctAnswer: '$23^\\circ$',
        explanation: 'The given figure shows two vertically opposite angles. Therefore, they are equal: $7a - 138 = a \\Rightarrow 6a = 138 \\Rightarrow a = 23^\\circ$.'
    },
    {
        id: 'MA-1101-1',
        subject: 'Mathematics',
        subtopic: 'Unit Circle',
        question: 'What is $\\frac{7\\pi}{6}$ radians in degrees?',
        options: ['$315^\\circ$', '$210^\\circ$', '$175^\\circ$', '$105^\\circ$'],
        correctAnswer: '$210^\\circ$',
        explanation: 'To convert radians to degrees, multiply by $\\frac{180}{\\pi}$. $\\frac{7\\pi}{6} \\times \\frac{180}{\\pi} = 7 \\times 30 = 210^\\circ$.'
    },
    {
        id: 'MA-1003-1',
        subject: 'Mathematics',
        subtopic: 'Euclidean Geometry',
        question: 'The longer side of a $30^\\circ-60^\\circ-90^\\circ$ triangle measures 12 units. What is the length of the hypotenuse?',
        options: ['6 units', '$4\\sqrt{3}$ units', '$6\\sqrt{3}$ units', '$8\\sqrt{3}$ units'],
        correctAnswer: '$8\\sqrt{3}$ units',
        explanation: 'The sides of a $30^\\circ-60^\\circ-90^\\circ$ triangle follow the ratio $1 : \\sqrt{3} : 2$. The longer leg is $x\\sqrt{3} = 12 \\Rightarrow x = 12/\\sqrt{3} = 4\\sqrt{3}$. Hypotenuse is $2x = 8\\sqrt{3}$.'
    },
    {
        id: 'MA-1003-2',
        subject: 'Mathematics',
        subtopic: 'Euclidean Geometry',
        question: 'Which side of the $\\triangle MTH$ is the largest? The triangle is not drawn to scale.',
        figure: '/assets/figures/MA-1003-2.png',
        options: ['MT', 'TH', 'MH', 'Cannot be determined'],
        correctAnswer: 'MT',
        explanation: 'Angle M is $30^\\circ$, Angle T is $70^\\circ$. Therefore, Angle H is $180^\\circ - (30^\\circ + 70^\\circ) = 80^\\circ$. The longest side is always opposite the largest angle, so it is MT.'
    },
    {
        id: 'MA-1006-1',
        subject: 'Mathematics',
        subtopic: 'Polygons',
        question: 'What is the measure of an exterior angle of a regular 24-gon?',
        options: ['$15^\\circ$', '$165^\\circ$', '$360^\\circ$', '$8640^\\circ$'],
        correctAnswer: '$15^\\circ$',
        explanation: 'The sum of exterior angles of any regular polygon is $360^\\circ$. For a 24-gon, each exterior angle is $360^\\circ / 24 = 15^\\circ$.'
    },
    {
        id: 'MA-1006-2',
        subject: 'Mathematics',
        subtopic: 'Polygons',
        question: 'FOUR is a parallelogram with equal sides. If $m\\angle FRU$ is $70^\\circ$, solve for $m\\angle OFS$.',
        figure: '/assets/figures/MA-1006-2.png',
        options: ['$35^\\circ$', '$55^\\circ$', '$95^\\circ$', '$110^\\circ$'],
        correctAnswer: '$55^\\circ$',
        explanation: 'A parallelogram with equal sides is a rhombus. Consecutive angles are supplementary, so $\\angle RFO = 180^\\circ - 70^\\circ = 110^\\circ$. Diagonals of a rhombus bisect the angles, so $\\angle OFS = 110^\\circ / 2 = 55^\\circ$.'
    },
    {
        id: 'MA-1008-1',
        subject: 'Mathematics',
        subtopic: 'Areas and Volumes',
        question: 'If the lengths of the sides of a square is multiplied by 4, what is its effect on the area?',
        options: [
            'will increase 4 times',
            'will increase 8 times',
            'will increase 16 times',
            'will remain the same'
        ],
        correctAnswer: 'will increase 16 times',
        explanation: 'Area of a square is $s^2$. If the side is multiplied by 4, the new area is $(4s)^2 = 16s^2$, which is an increase of 16 times.'
    },
    {
        id: 'MA-1008-2',
        subject: 'Mathematics',
        subtopic: 'Areas and Volumes',
        question: 'Find the area of the shaded region.',
        figure: '/assets/figures/MA-1008-2.png',
        options: ['$(11/4)\\pi$ mm2', '$(55/4)\\pi$ mm2', '$(11/2)\\pi$ mm2', '$55\\pi$ mm2'],
        correctAnswer: '$(55/4)\\pi$ mm2',
        explanation: 'The figure shows an annular sector. Outer diameter is 8mm ($R=4$), inner diameter is 2mm ($r=1$). Missing angle is $30^\\circ$, so the shaded portion covers $330^\\circ$. Area = $\\frac{330}{360} \\pi (4^2 - 1^2) = \\frac{11}{12} \\pi (15) = \\frac{55}{4}\\pi$.'
    },
    {
        id: 'MA-1104-1',
        subject: 'Mathematics',
        subtopic: 'Trigonometric Identities',
        question: '$\\left( \\frac{\\sqrt{1-\\cos^2 x}}{\\cos x} \\right)^2 + 1$ is equal to?',
        options: ['$\\tan x$', '$\\tan^2 x$', '$\\sec^2 x$', '$\\csc^2 x$'],
        correctAnswer: '$\\sec^2 x$',
        explanation: 'Using the Pythagorean identity: $\\sqrt{1-\\cos^2 x} = \\sqrt{\\sin^2 x}$. Squaring it removes the absolute value constraint: $\\frac{\\sin^2 x}{\\cos^2 x} + 1 = \\tan^2 x + 1 = \\sec^2 x$.'
    },
    {
        id: 'MA-1007-1',
        subject: 'Mathematics',
        subtopic: 'Circles',
        question: 'Given the figure, solve for $m\\angle \\theta$.',
        options: ['$41^\\circ$', '$49^\\circ$', '$51^\\circ$', '$59^\\circ$'],
        correctAnswer: '$41^\\circ$',
        explanation: 'The figure shows a central angle of $82^\\circ$ and an inscribed angle $\\theta$ that both subtend the same arc. An inscribed angle is half the measure of its intercepted central angle: $82^\\circ / 2 = 41^\\circ$.'
    },
    {
        id: 'MA-902-3',
        subject: 'Mathematics',
        subtopic: 'Translation, Simplification',
        question: 'Twice a number less than four is equal to eight. What is the number?',
        options: ['6', '-2', '-6', '2'],
        correctAnswer: '-2',
        explanation: 'Translated mathematically, "twice a number less than four" denotes the quantity twice a number being subtracted from 4: $4 - 2x = 8$. Solving for $x$ gives $-2x = 4 \\Rightarrow x = -2$.'
    },
    {
        id: 'MA-907-1',
        subject: 'Mathematics',
        subtopic: 'Substitution',
        question: 'The sum of the digits of a two-digit number is 7. When the digits are reversed, the resulting number is two plus twice the original number. What is the original number?',
        options: ['91', '82', '25', '54'],
        correctAnswer: '25',
        explanation: 'Testing options: Sum of digits in 25 is 7. Reversed is 52. Twice the original is $25 \\times 2 = 50$. "Two plus twice the original" is $50 + 2 = 52$, which matches perfectly.'
    },
    {
        id: 'MA-904-5',
        subject: 'Mathematics',
        subtopic: 'Linear Equations',
        question: 'My dad promised to give me Php 100 for every Php 500 that I save. If I now have a total of Php 31,800 (including the money my dad promised), how much of my money came from my dad?',
        options: ['Php 3,800', 'Php 5,300', 'Php 6,800', 'Php 7,300'],
        correctAnswer: 'Php 5,300',
        explanation: 'For every Php 500 saved, dad gives Php 100, a ratio of 5:1. Let Dad\'s contribution be $x$. Savings is $5x$. Total $6x = 31800$. $x = 31800 / 6 = 5300$.'
    },
    {
        id: 'MA-809-1',
        subject: 'Mathematics',
        subtopic: 'Percentage',
        question: 'A t-shirt on a 10% off costs Php 765. What is its original price?',
        options: ['Php 688.50', 'Php 800', 'Php 841.50', 'Php 850'],
        correctAnswer: 'Php 850',
        explanation: 'At 10% off, Php 765 represents 90% of the original price. $0.90P = 765 \\Rightarrow P = 765 / 0.9 = 850$.'
    },
    {
        id: 'MA-809-2',
        subject: 'Mathematics',
        subtopic: 'Percentage',
        question: 'Ryoma Echizen bought a condo for Y yen. After a year, he sold it to his friend for 75% more than the amount he paid when he bought the condo. He then gave 50% of his profit to his dad as a gift. How much did Echizen give to his dad?',
        options: ['$\\frac{3}{8}Y$', '$\\frac{1}{8}Y$', '$\\frac{2}{3}Y$', '$\\frac{1}{3}Y$'],
        correctAnswer: '$\\frac{3}{8}Y$',
        explanation: 'His profit is 75% of Y, which is $\\frac{3}{4}Y$. He gave 50% of this profit to his dad: $\\frac{1}{2} \\times \\frac{3}{4}Y = \\frac{3}{8}Y$.'
    },
    {
        id: 'MA-906-14',
        subject: 'Mathematics',
        subtopic: 'Rational Functions',
        question: 'Penny and Sheldon can make ten Penny Blossoms in 30 minutes. If Penny does the job alone, it would take her 120 minutes. How long would it take Sheldon to finish the job alone?',
        options: ['40 minutes', '80 minutes', '120 minutes', '160 minutes'],
        correctAnswer: '40 minutes',
        explanation: 'Combined rate is $\\frac{1}{30}$ jobs/minute. Penny\'s rate is $\\frac{1}{120}$ jobs/min. Sheldon\'s rate is $\\frac{1}{30} - \\frac{1}{120} = \\frac{4}{120} - \\frac{1}{120} = \\frac{3}{120} = \\frac{1}{40}$ jobs/minute. Therefore, it takes Sheldon 40 minutes.'
    },
    {
        id: 'MA-906-15',
        subject: 'Mathematics',
        subtopic: 'Rational Functions',
        question: 'The speed of a motorboat in still water is 10 kilometers per hour (kph). Downstream, the same motorboat takes 1 hour to take the same distance it can travel 3 hours upstream. What is the speed of the current?',
        options: ['2 kph', '3 kph', '5 kph', '7 kph'],
        correctAnswer: '5 kph',
        explanation: 'Let $c$ be the current speed. Distance = Rate $\\times$ Time. Since distances are equal: $(10+c) \\times 1 = (10-c) \\times 3 \\Rightarrow 10+c = 30-3c \\Rightarrow 4c = 20 \\Rightarrow c = 5$.'
    }
];
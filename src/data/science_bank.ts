import { Question } from '../types/question';


export const scienceQuestions: Question[] = [
    {
        id: 'SC-602-1',
        subject: 'Science',
        subtopic: 'Properties',
        question: 'A researcher wanted to determine whether density varies based on temperature. He utilized copper as his material and he found out that at $20^{\\circ}C$ the density is $8.94~g/cm^{3}$ then decreased to $8.91~g/cm^{3}$ at $60^{\\circ}C$. What conclusion can be derived from this experiment?',
        options: [
            'A. There is a decrease in the mass of the metal when heated',
            'B. The metal contracted as the temperature increased',
            'C. The mass of the metal decreased due to increased temperature',
            'D. The metal expanded'
        ],
        correctAnswer: 'D. The metal expanded',
        explanation: 'Density is mass per unit volume. The mass of the copper remains constant when heated. A decrease in density implies an increase in volume, meaning the metal expanded due to increased temperature.'
    },
    {
        id: 'SC-602-2',
        subject: 'Science',
        subtopic: 'States of Matter',
        question: 'In a certain laboratory, a student wanted to increase the rate of the evaporation of water in a controlled temperature setup. Which of the following would significantly help in increasing the rate of evaporation?',
        options: [
            'A. Increasing atmospheric pressure',
            'B. Increasing the surface area of the liquid',
            'C. Doing the experiment in a humid temperature',
            'D. Both A and B are correct'
        ],
        correctAnswer: 'B. Increasing the surface area of the liquid',
        explanation: 'Increasing the surface area of a liquid exposes more molecules to the surface, allowing them to escape more readily into the gaseous phase, thereby increasing the overall rate of evaporation.'
    },
    {
        id: 'SC-604-3',
        subject: 'Science',
        subtopic: 'Bonding',
        question: 'Which of the following is the molecular geometry of atom X which has 3 bonding pairs and 1 lone pair?',
        options: [
            'A. Trigonal bipyramidal',
            'B. Trigonal pyramidal',
            'C. Bent',
            'D. Linear'
        ],
        correctAnswer: 'B. Trigonal pyramidal',
        explanation: 'A central atom with 3 bonding electron pairs and 1 lone pair has a steric number of 4. The electron geometry is tetrahedral, but the actual molecular geometry (shape of the atoms) is trigonal pyramidal.'
    },
    {
        id: 'SC-605-4',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        question: 'Which of the following statements is/are true regarding conjugate pairs in acid-base reactions?',
        options: [
            'A. When a conjugate acid is weak, its conjugate base is strong',
            'B. When a conjugate base is strong, its conjugate acid is weak',
            'C. When a conjugate acid is strong, its conjugate base is strong',
            'D. Both A and B are correct'
        ],
        correctAnswer: 'D. Both A and B are correct',
        explanation: 'In Brønsted-Lowry acid-base theory, there is an inverse relationship between the strengths of conjugate acid-base pairs. A weak conjugate acid implies a relatively strong conjugate base, and vice versa.'
    },
    {
        id: 'SC-605-5',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        question: 'Sulfuric Acid ($H_2SO_4$), is a strong acid that is utilized in many laboratory experiments as well as synthesis in organic chemistry. How many ionization stages does sulfuric acid undergo before it completely ionizes when it is placed in $H_2O$?',
        options: [
            'A. 4 ionization stages',
            'B. 3 ionization stages',
            'C. 2 ionization stages',
            'D. 1 ionization stage'
        ],
        correctAnswer: 'C. 2 ionization stages',
        explanation: 'Sulfuric acid ($H_2SO_4$) is a diprotic acid, meaning it contains two ionizable hydrogen atoms. Therefore, it dissociates and undergoes two distinct ionization stages in water.'
    },
    {
        id: 'SC-605-6',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        groupId: 'sc-chem-equilibrium-1',
        contextTitle: 'Equilibrium Observation',
        passage: 'A student observed the reaction between Substance X and Substance Y. It yields two products, Substance A and Substance B. He observed that the substance which acts as the acid in the forward reaction is more acidic than the substance that acts as the acid in the backward reactions.\n\n$X+Y\\Leftrightarrow A+B$',
        question: 'Based on the chemical reaction above, which of the following factors greatly influenced the position of equilibrium in the reaction?',
        options: [
            'A. Difference in the acidity of the acid in reactant and products',
            'B. Difference in the strength of the bases between the base in the reactant and product',
            'C. Difference in the masses of the products formed and the reactants',
            'D. A and B only'
        ],
        correctAnswer: 'A. Difference in the acidity of the acid in reactant and products',
        explanation: 'The observed data explicitly notes the difference in acidity. Acid-base equilibria are driven by the relative strengths (acidity/basicity) of the reactants versus products, favoring the formation of the weaker acid.'
    },
    {
        id: 'SC-605-7',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        groupId: 'sc-chem-equilibrium-1',
        question: 'From this given information, where is the position of the equilibrium?',
        options: [
            'A. right, producing more product',
            'B. left, producing more reactant',
            'C. Does not move/change',
            'D. Insufficient information'
        ],
        correctAnswer: 'A. right, producing more product',
        explanation: 'Acid-base equilibria always favor the side of the chemical equation that contains the weaker acid and weaker base. Since the reactant acid is stronger, the forward reaction is favored, shifting the equilibrium to the right.'
    },
    {
        id: 'SC-605-8',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        groupId: 'sc-chem-equilibrium-1',
        question: 'What conclusion can be derived from the observation above?',
        options: [
            'A. Difference in acidity is a factor which affects position of the equilibrium in a chemical reaction',
            'B. The equilibrium favors the side where the weaker acid is placed',
            'C. The equilibrium favors the side where stronger acid is placed',
            'D. A and B are correct'
        ],
        correctAnswer: 'D. A and B are correct',
        explanation: 'The observation confirms that relative acidity influences the equilibrium point, specifically demonstrating that the equilibrium will naturally favor the production of the weaker acid.'
    },
    {
        id: 'SC-605-9',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        question: 'Which of the following is considered as a Lewis Acid?',
        options: [
            'A. $FeCl_{3}$',
            'B. $AlCl_{3}$',
            'C. $NH_{3}$',
            'D. Both A and B'
        ],
        correctAnswer: 'D. Both A and B',
        explanation: 'A Lewis acid is a chemical species that can accept an electron pair. Both Iron(III) chloride ($FeCl_3$) and Aluminum chloride ($AlCl_3$) have central atoms capable of accepting electron pairs. Ammonia ($NH_3$) acts as a Lewis base.'
    },
    {
        id: 'SC-603-10',
        subject: 'Science',
        subtopic: 'Mole, Avogadro\'s Number',
        question: 'How many nitrogen atoms are present in 34g of $NH_{3}$, which is used as a fertilizer in animal feed and in the manufacture of polymers? The molar mass of $NH_{3}$ is $17~g/mol$.',
        options: [
            'A. $1.20\\times10^{24}$',
            'B. $4.82\\times10^{21}$',
            'C. $5.10\\times10^{23}$',
            'D. $4.21\\times10^{23}$'
        ],
        correctAnswer: 'A. $1.20\\times10^{24}$',
        explanation: 'First, calculate the moles of $NH_3$: $34\\text{ g} / 17\\text{ g/mol} = 2\\text{ moles}$. Since there is one nitrogen atom per molecule of $NH_3$, there are 2 moles of nitrogen atoms. Multiply by Avogadro\'s number ($2 \\times 6.022 \\times 10^{23}$) to get $1.20 \\times 10^{24}$ atoms.'
    },
    // {
    //     id: 'SC-605-11',
    //     subject: 'Science',
    //     subtopic: 'Molecular Composition',
    //     question: 'Calculate the mole fraction of Carbon in a certain compound if it is composed of 41.92% carbon, 3.58% hydrogen, and 54.50% oxygen by mass. Use $C=12~g/mol$, $H=1~g/mol$, $O=16~g/mol$.',
    //     options: [
    //         'A. 3.33',
    //         'B. 0.033',
    //         'C. 33.3',
    //         'D. .033'
    //     ],
    //     correctAnswer: 'C. 33.3',
    //     explanation: 'Assuming a 100g sample, convert masses to moles: $41.92\\text{g C} \\div 12\\text{ g/mol} = 3.49\\text{ mol C}$; $3.58\\text{g H} \\div 1\\text{ g/mol} = 3.58\\text{ mol H}$; $54.50\\text{g O} \\div 16\\text{ g/mol} = 3.41\\text{ mol O}$. The total moles equal $10.48\\text{ mol}$. The mole fraction of Carbon is $3.49 \\div 10.48 = 0.333$. (Note: Option C represents this fraction as a percentage, 33.3%).'
    // }, Corrected April 21, 2026 (Question had 0.333 as an option and was marked as correct, which is technically not correct since the option was 33.3)
    {
        id: "SC-605-11",
        subject: "Science",
        subtopic: "Molecular Composition",
        question: "Calculate the mole fraction of Carbon in a certain compound if it is composed of 41.92% carbon, 3.58% hydrogen, and 54.50% oxygen by mass. Use $C=12~g/mol$, $H=1~g/mol$, $O=16~g/mol$.",
        options: [
            "A. 3.33",
            "B. 0.033",
            "C. 33.3",
            "D. .333"
        ],
        correctAnswer: "D. .333",
        explanation: "Assuming a 100g sample, convert masses to moles: $n_C = 41.92\\text{g} / 12\\text{ g/mol} = 3.493\\text{ mol}$; $n_H = 3.58\\text{g} / 1\\text{ g/mol} = 3.58\\text{ mol}$; $n_O = 54.50\\text{g} / 16\\text{ g/mol} = 3.406\\text{ mol}$. Total moles $n_{total} = 3.493 + 3.58 + 3.406 = 10.479\\text{ mol}$. The mole fraction of Carbon ($x_C$) is $n_C / n_{total} = 3.493 / 10.479 = 0.333$."
    },
    {
        id: 'SC-605-12',
        subject: 'Science',
        subtopic: 'Balancing Equations',
        question: 'Combustion, which is an important process in Chemistry, releases the chemical energy stored in the chemical bonds of the fuels. Which of the following is the correct order of coefficients in the balanced equation for the combustion of ethane:\n\n$C_{2}H_{6}+O_{2}\\rightarrow CO_{2}+H_{2}O$',
        options: [
            'A. 2, 7, 4, 6',
            'B. 4, 14, 8, 12',
            'C. 1, 3, 4, 6',
            'D. 7, 2, 4, 6'
        ],
        correctAnswer: 'A. 2, 7, 4, 6',
        explanation: 'To balance $C_2H_6 + O_2 \\rightarrow CO_2 + H_2O$, balancing Carbon and Hydrogen gives $C_2H_6 \\rightarrow 2CO_2 + 3H_2O$. This requires 7 Oxygen atoms on the left ($3.5O_2$). Multiplying the entire equation by 2 to clear the fraction yields $2C_2H_6 + 7O_2 \\rightarrow 4CO_2 + 6H_2O$.'
    },
    {
        id: 'SC-605-13',
        subject: 'Science',
        subtopic: 'Balancing Equations',
        question: 'Glucose, $C_{6}H_{12}O_{6}$, is broken down inside our bodies to supply the needed energy for growth and continuous function of our organs. The equation wherein glucose is broken down is as follows:\n\n$C_{6}H_{12}O_{6}+O_{2}\\rightarrow CO_{2}+H_{2}O$\n\nWhich of the following statements is true?',
        options: [
            'A. 6 grams of $CO_2$ is produced with every 1 gram of $C_6H_{12}O_6$',
            'B. 1 mole of $C_6H_{12}O_6$ is consumed to produce 6 moles of $CO_2$',
            'C. It requires $6CO_2$ molecules to completely react 1 mole of $C_6H_{12}O_6$',
            'D. All of the above are correct'
        ],
        correctAnswer: 'B. 1 mole of $C_6H_{12}O_6$ is consumed to produce 6 moles of $CO_2$',
        explanation: 'The properly balanced chemical equation for cellular respiration is $C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O$. The stoichiometry dictates that exactly 1 mole of glucose produces 6 moles of carbon dioxide.'
    },
    {
        id: 'SC-605-14',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        question: 'Referring to the previous question, if an average person intakes about 560 grams of glucose every week, how much oxygen molecule is needed to degrade the glucose into carbon dioxide and water? ($C_{6}H_{12}O_{6}=180~g/mol$, $O=16~g/mol$)',
        options: [
            'A. 298.67 g oxygen molecule',
            'B. 597.33 g oxygen molecule',
            'C. 16.59 g oxygen molecule',
            'D. 99.56 g oxygen molecule'
        ],
        correctAnswer: 'B. 597.33 g oxygen molecule',
        explanation: 'Convert mass of glucose to moles: $560\\text{g} \\div 180\\text{ g/mol} = 3.111\\text{ mol}$. From the balanced equation, 1 mole of glucose requires 6 moles of $O_2$. Moles of $O_2$ needed $= 3.111 \\times 6 = 18.667\\text{ mol}$. Mass of $O_2 = 18.667\\text{ mol} \\times 32\\text{ g/mol} = 597.33\\text{ g}$.'
    },
    {
        id: 'SC-605-15',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        groupId: 'sc-chem-urea-synthesis-1',
        contextTitle: 'Urea Synthesis',
        passage: 'A chemist wanted to synthesize urea through $NH_3$ and $CO_2$ to be utilized as fertilizer in their farm. Arriving at his laboratory, he saw that only 532 grams of ammonia and 1142g of carbon dioxide were left for him to use. ($N=14~g/mol$, $H=1~g/mol$, $C=12~g/mol$, $O=16~g/mol$)\n\nChemical equation: $2NH_3+CO_2\\rightarrow(NH_2)_2CO+H_2O$',
        question: 'Would the ammonia left in his laboratory be sufficient enough to produce at least 1kg of urea?',
        options: [
            'A. Yes, since the maximum yield would be 937.27 g of urea',
            'B. No, since the maximum yield would be 938.82 g of urea',
            'C. Yes, since the maximum yield would be 925.52 g of urea',
            'D. No, since the maximum yield would be 928.82 g of urea'
        ],
        correctAnswer: 'B. No, since the maximum yield would be 938.82 g of urea',
        explanation: 'We have $532\\text{g } NH_3 \\div 17\\text{ g/mol} = 31.29\\text{ mol } NH_3$ and $1142\\text{g } CO_2 \\div 44\\text{ g/mol} = 25.95\\text{ mol } CO_2$. Ammonia is the limiting reactant because the reaction requires a 2:1 ratio. The theoretical yield of urea is $(31.29 \\div 2) \\times 60\\text{ g/mol} = 938.82\\text{ g}$. Since $938.82\\text{ g} < 1000\\text{ g}$, it is not sufficient.'
    },
    {
        id: 'SC-605-16',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        groupId: 'sc-chem-urea-synthesis-1',
        question: 'Relating to the scenario above, which of the following statements is incorrect?',
        options: [
            'A. There is enough carbon dioxide to react all the ammonia in the synthesis reaction above',
            'B. Ammonia determines the maximum yield in the given scenario',
            'C. 1 mole of carbon dioxide corresponds to 1 mole of ammonia',
            'D. All statements are correct'
        ],
        correctAnswer: 'C. 1 mole of carbon dioxide corresponds to 1 mole of ammonia',
        explanation: 'The balanced chemical equation for the synthesis of urea is $2NH_3 + CO_2 \\rightarrow (NH_2)_2CO + H_2O$. This indicates that 1 mole of carbon dioxide reacts with 2 moles of ammonia, making statement C incorrect.'
    },
    {
        id: 'SC-605-17',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        groupId: 'sc-chem-urea-synthesis-1',
        question: 'Giving an actual yield of 914.65 g, what is the percent yield of the reaction?',
        options: [
            'A. 97.59%',
            'B. 97.43%',
            'C. 98.83%',
            'D. 98.47%'
        ],
        correctAnswer: 'B. 97.43%',
        explanation: 'Percent yield is calculated as $(\\text{Actual Yield} \\div \\text{Theoretical Yield}) \\times 100$. Using the values from the previous problem: $(914.65\\text{ g} \\div 938.82\\text{ g}) \\times 100 = 97.43\\%$.'
    },
    {
        id: 'SC-605-18',
        subject: 'Science',
        subtopic: 'Chemical Reactions',
        groupId: 'sc-chem-visual-stoich-1',
        contextTitle: 'Visual Stoichiometry',
        question: 'Which of the equations best represent the reaction in the two figures below?\n\nLegend: A= Blue  B= Yellow  C= Red  D= Green',
        figure: '/assets/figures/sc-item-18.png',
        options: [
            'A. $8A+4B\\rightarrow C+D$',
            'B. $2A+B\\rightarrow C+D$',
            'C. $2A+4B\\rightarrow C+D$',
            'D. $4A+8B\\rightarrow 4C+4D$'
        ],
        correctAnswer: 'B. $2A+B\\rightarrow C+D$',
        explanation: 'To solve visual stoichiometry problems, you must count the individual molecules of each color (element) on the reactant side and the product side. Then, derive the simplest whole-number ratio (empirical formulation) to determine the properly balanced chemical equation.'
    },
    {
        id: 'SC-604-19',
        subject: 'Science',
        subtopic: 'Electronegativity',
        groupId: 'sc-chem-halogens-1',
        contextTitle: 'Halogen Elements Table',
        figure: '/assets/figures/sc-chem-halogens-1.png',
        question: 'Which of the following arrangements are correct when arranging the atoms from lowest to highest electronegativity?',
        options: [
            'A. 1, 2, 3, 4',
            'B. 4, 3, 2, 1',
            'C. 3, 2, 4, 1',
            'D. 3, 4, 2, 1'
        ],
        correctAnswer: 'D. 3, 4, 2, 1',
        explanation: 'Electronegativity increases as you move up a group on the periodic table. Therefore, the order from lowest to highest electronegativity for the halogens is Iodine (3) < Bromine (4) < Chlorine (2) < Fluorine (1).'
    },
    {
        id: 'SC-604-20',
        subject: 'Science',
        subtopic: 'Families',
        groupId: 'sc-chem-halogens-1',
        question: 'Which of the following is the correct order of decreasing atomic radius of the atoms above?',
        options: [
            'A. 3, 4, 2, 1',
            'B. 1, 4, 3, 2',
            'C. 1, 3, 4, 2',
            'D. 1, 4, 2, 3'
        ],
        correctAnswer: 'A. 3, 4, 2, 1',
        explanation: 'Atomic radius increases as you move down a group on the periodic table due to the addition of electron shells. The order of decreasing atomic radius (largest to smallest) is Iodine (3) > Bromine (4) > Chlorine (2) > Fluorine (1).'
    },
    {
        id: 'SC-604-21',
        subject: 'Science',
        subtopic: 'Bonding',
        groupId: 'sc-chem-halogens-1',
        question: 'Iodine anion is considered as the weakest base among the four atoms in the table. This is due to which of the following reasons below?',
        options: [
            'A. Large atomic radius of iodine disperses the negative charge within the atom, thus it becomes stable and least reactive as a base',
            'B. It has the strongest electronegativity. It can bear the negative charge thus becomes stable and least reactive as a base',
            'C. It has the strongest intermolecular force of attraction among the four anions/atoms.',
            'D. Both A and C are correct'
        ],
        correctAnswer: 'A. Large atomic radius of iodine disperses the negative charge within the atom, thus it becomes stable and least reactive as a base',
        explanation: 'The iodide ion ($I^-$) is a very weak conjugate base because its exceptionally large atomic radius allows it to distribute its negative charge over a greater volume. This higher polarizability makes the ion highly stable and less reactive compared to smaller halide ions.'
    },
    {
        id: 'SC-504-22',
        subject: 'Science',
        subtopic: 'Ecosystems',
        question: 'What type of adaptation involves the metabolism of an organism? An example of this is the ability of spiders to synthesize silk for webbing.',
        options: [
            'A. Physiological Adaptation',
            'B. Structural Adaptation',
            'C. Camouflage',
            'D. Warning Coloration'
        ],
        correctAnswer: 'A. Physiological Adaptation',
        explanation: 'Physiological adaptations refer to internal biochemical or metabolic adjustments within an organism\'s cells or tissues (such as venom production or synthesizing spider silk) that enhance its ability to survive in its environment.'
    },
    {
        id: 'SC-504-23',
        subject: 'Science',
        subtopic: 'Ecosystems',
        question: 'What type of relationship is observed when a barnacle attaches to the shells of marine mollusks and turtles?',
        options: [
            'A. Commensalism',
            'B. Competition',
            'C. Parasitism',
            'D. Mutualism',
            'E. None of these'
        ],
        correctAnswer: 'A. Commensalism',
        explanation: 'This is a classic example of commensalism. The barnacle benefits significantly by finding a hard surface to attach to and being transported to nutrient-rich waters, while the host (the turtle) is generally neither helped nor harmed.'
    },
    {
        id: 'SC-504-24',
        subject: 'Science',
        subtopic: 'Ecosystems',
        question: 'A student on a field trip spotted some pineapples in a plantation of papaya. What type of relationship is exhibited in this scenario?',
        options: [
            'A. Mutualism',
            'B. Commensalism',
            'C. Parasitism',
            'D. Neutralism'
        ],
        correctAnswer: 'D. Neutralism',
        explanation: 'If two populations occupy the same physical area but do not significantly interact or affect each other\'s survival or growth (for instance, by utilizing drastically different root depths or soil nutrients), the relationship is best categorized as neutralism.'
    },
    {
        id: 'SC-504-25',
        subject: 'Science',
        subtopic: 'Ecosystems',
        question: 'Protocooperation is a relationship between two populations which is favorable but both of them do not depend on each other. Which of the following are examples of such a relationship?',
        options: [
            'A. Garden slugs clean up plant matter to pave way for earthworms to dig under the soil',
            'B. Interaction of antibiotics to a petri dish containing two different bacteria',
            'C. Algae manufacturing food for itself and fungi',
            'D. Both A and C are examples of protocooperation'
        ],
        correctAnswer: 'A. Garden slugs clean up plant matter to pave way for earthworms to dig under the soil',
        explanation: 'Protocooperation is a form of non-obligatory mutualism where organisms benefit from each other but can survive independently. Slugs cleaning up plant matter makes soil movement easier for earthworms, benefiting both indirectly. (Option C refers to lichen, which is an obligate mutualistic relationship).'
    },
    {
        id: 'SC-504-26',
        subject: 'Science',
        subtopic: 'Biodiversity',
        question: 'This refers to the change in the genetic makeup within a group of organisms over an extended period of time.',
        options: [
            'A. Evolution',
            'B. Mutation',
            'C. Genetic Dominance',
            'D. Genetic Revolution'
        ],
        correctAnswer: 'A. Evolution',
        explanation: 'Evolution is fundamentally defined in biology as the change in the heritable characteristics or genetic makeup of biological populations over successive generations.'
    },
    {
        id: 'SC-502-27',
        subject: 'Science',
        subtopic: 'DNA',
        question: 'Deoxyribonucleic acid (DNA) is the genetic material possessed by cellular organisms and viruses. DNA denotes the absence of one what atom?',
        options: [
            'A. Nitrogen',
            'B. Hydrogen',
            'C. Oxygen',
            'D. Carbon'
        ],
        correctAnswer: 'C. Oxygen',
        explanation: 'Deoxyribonucleic acid (DNA) contains the sugar deoxyribose, which literally means "without oxygen." Specifically, it lacks one oxygen atom at the 2\' carbon position compared to the ribose sugar found in RNA.'
    },
    {
        id: 'SC-501-28',
        subject: 'Science',
        subtopic: 'Cell Division',
        question: 'In the scenario wherein an oogonium divides in the process of oogenesis, which of the following statements is true:',
        options: [
            'A. Each of the daughter cells will have exactly half of the chromosomes the parent cell has',
            'B. The parent and the daughter cells have exactly the same number of chromosomes',
            'C. The chromosomes in the daughter cells would be twice the number of that of the parent cell',
            'D. The chromosomal division cannot be predicted in this process'
        ],
        correctAnswer: 'A. Each of the daughter cells will have exactly half of the chromosomes the parent cell has',
        explanation: 'Oogenesis utilizes the cell division process known as meiosis to produce egg cells (ova). Meiosis is a reduction division, meaning the resulting gametes will possess exactly half the number of chromosomes (haploid) as the original diploid parent cell.'
    },
    {
        id: 'SC-501-29',
        subject: 'Science',
        subtopic: 'Cellular Respiration',
        question: 'Wine is made up of ethanol which is produced under the process of fermentation. This type of respiration is called anaerobic respiration. Which of the following is/are characteristic/s of anaerobic respiration?',
        options: [
            'A. Occurs usually with microorganisms',
            'B. This is more common with plants and animals than with microorganisms',
            'C. Yields a lower number of ATP when compared to ATP produced in aerobic respiration',
            'D. Both A and C are correct'
        ],
        correctAnswer: 'D. Both A and C are correct',
        explanation: 'Anaerobic respiration (such as alcoholic fermentation) occurs in the absence of oxygen, is heavily utilized by microorganisms like yeast, and produces significantly less ATP (usually 2 ATP per glucose molecule) compared to aerobic cellular respiration.'
    },
    {
        id: 'SC-501-30',
        subject: 'Science',
        subtopic: 'Structure of a Cell',
        question: 'Which of the following describes the function of lysosome inside the cell?',
        options: [
            'A. It contains digestive enzymes which degrades extracellular internalized by the cell and worn-out organelles.',
            'B. It helps in the transfer of ribosomes in the other parts of the cells',
            'C. It bundles macromolecules such as proteins as they are being synthesized in the cell',
            'D. It is in charge in synthesizing hormones and lipids'
        ],
        correctAnswer: 'A. It contains digestive enzymes which degrades extracellular internalized by the cell and worn-out organelles.',
        explanation: 'Lysosomes are specialized membrane-bound organelles that act as the cell\'s waste disposal system. They contain strong hydrolytic digestive enzymes capable of breaking down biomolecules, foreign debris, and worn-out organelles.'
    },
    {
        id: 'SC-606-31',
        subject: 'Science',
        subtopic: 'Carbon and Hydrocarbon',
        question: 'Dimethyl ether ($CH_{3}OCH_{3}$) and ethanol ($C_{2}H_{5}OH$) have the same chemical formula yet they differ on how each of the atoms are connected to each other. What type of isomerism is exhibited by the two molecules?',
        options: [
            'A. Functional Isomer',
            'B. Stereoisomerism',
            'C. Diasteriomerism',
            'D. Positional isomers'
        ],
        correctAnswer: 'A. Functional Isomer',
        explanation: 'Ethanol is an alcohol (contains an -OH group), while dimethyl ether is an ether (contains an -O- linkage). Because they share the same molecular formula ($C_2H_6O$) but have completely different functional groups, they are classified as functional isomers.'
    },
    {
        id: 'SC-504-32',
        subject: 'Science',
        subtopic: 'Ecosystems',
        question: 'Which of the following denotes the correct order of the hierarchy of biological organization from the simplest to the most complex level?',
        options: [
            'A. Organelle, tissue, ecosystem, biosphere, population, organism',
            'B. Cell, biosphere, population, community, organ, molecules',
            'C. Molecule, cell, organ system, population, ecosystem, biosphere',
            'D. Ecosystem, organ system, ecosystem, population, cell, molecule'
        ],
        correctAnswer: 'C. Molecule, cell, organ system, population, ecosystem, biosphere',
        explanation: 'The standard biological hierarchy logically scales from the simplest components to the most comprehensive systems: atoms $\\rightarrow$ molecules $\\rightarrow$ organelles $\\rightarrow$ cells $\\rightarrow$ tissues $\\rightarrow$ organs $\\rightarrow$ organ systems $\\rightarrow$ organisms $\\rightarrow$ populations $\\rightarrow$ communities $\\rightarrow$ ecosystems $\\rightarrow$ biosphere.'
    },
    {
        id: 'SC-501-33',
        subject: 'Science',
        subtopic: 'Structure of a Cell',
        question: 'Among the choices below, which is not true about the deoxyribonucleic acid (DNA) and cell composition?',
        options: [
            'A. Every cell is enclosed by a certain membrane',
            'B. Each cell has genetic information',
            'C. All organisms have cells with its nucleus enclosed by a membrane',
            'D. DNA is a unit of heredity transferred by the parent to their offspring'
        ],
        correctAnswer: 'C. All organisms have cells with its nucleus enclosed by a membrane',
        explanation: 'Option C is definitively false. Prokaryotic organisms (such as bacteria and archaea) possess DNA and are considered living cells, but they lack a true membrane-bound nucleus; their genetic material freely resides in a nucleoid region.'
    },
    {
        id: 'SC-501-34',
        subject: 'Science',
        subtopic: 'Photosynthesis',
        question: 'Chloroplasts are organelles found in plant cells and eukaryotic algae that conduct photosynthesis. Chloroplasts absorb sunlight and convert it into which type of energy?',
        options: [
            'A. Energy of motion',
            'B. Kinetic energy',
            'C. Mechanical energy',
            'D. None of these'
        ],
        correctAnswer: 'D. None of these',
        explanation: 'During the process of photosynthesis, chloroplasts absorb radiant light energy from the sun and convert it specifically into chemical energy, which is then stored in the molecular bonds of glucose and other organic compounds.'
    },
    {
        id: 'SC-504-35',
        subject: 'Science',
        subtopic: 'Ecosystems',
        question: 'Producers are the primary source of energy of succeeding organisms in the food chain. Which of the following sources do the producers obtain their energy from?',
        options: [
            'A. Thermal Energy',
            'B. Chemical Energy',
            'C. Potential Energy',
            'D. Light energy'
        ],
        correctAnswer: 'D. Light energy',
        explanation: 'Primary producers (autotrophs), such as plants, cyanobacteria, and algae, harness radiant light energy from the sun to synthesize their own food via photosynthesis.'
    },
    {
        id: 'SC-504-36',
        subject: 'Science',
        subtopic: 'Ecosystems',
        question: 'In the vast majority of ecosystems, <u>sunlight</u> is the ultimate source of energy and energy leaves the ecosystem in the form of <u>heat</u>. Is the statement above true? If not, replace the underline words with the correct pair.',
        options: [
            'A. It is true',
            'B. Producers, heat',
            'C. Plants, heat',
            'D. Producers, consumers'
        ],
        correctAnswer: 'A. It is true',
        explanation: 'The flow of energy in biological systems is unidirectional. Energy constantly enters almost all Earth\'s ecosystems as sunlight, is captured by producers, travels through consumer trophic levels, and is ultimately lost to space as heat.'
    },
    {
        id: 'SC-501-37',
        subject: 'Science',
        subtopic: 'Structure of a Cell',
        question: 'Which of the following information is true regarding prokaryotic and eukaryotic cells?',
        options: [
            'A. Prokaryotic cells have a visible membrane-bound nucleus',
            'B. Prokaryotic cells have a cell membrane that encloses all organelles',
            'C. Eukaryotic cells lacks a nucleus enclosed by a membrane',
            'D. All of the statements above are true'
        ],
        correctAnswer: 'B. Prokaryotic cells have a cell membrane that encloses all organelles',
        explanation: '(Note: Prokaryotes technically lack membrane-bound organelles altogether). However, among the flawed options presented, B is the closest to a structural truth as prokaryotic cells do possess a plasma (cell) membrane that encloses their entire cytoplasmic contents. Options A and C are universally false.'
    },
    {
        id: 'SC-501-38',
        subject: 'Science',
        subtopic: 'Structure of a Cell',
        question: 'This protein acts as a biological catalyst to bring about a certain biochemical reaction.',
        options: [
            'A. Enzyme',
            'B. Metabolites',
            'C. Feedback activators',
            'D. Feedback inhibitors'
        ],
        correctAnswer: 'A. Enzyme',
        explanation: 'Enzymes are highly specific, complex protein structures that function as biological catalysts, accelerating the rate of metabolic chemical reactions in cells without being consumed or permanently altered.'
    },
    {
        id: 'SC-401-39',
        subject: 'Science',
        subtopic: 'Rocks and Minerals',
        question: 'A professor in Earth Science wanted to demonstrate the effect of acid rain on certain types of rocks using 3 setups of beaker with a vinegar solution of pH 3.0. After some time, the pH of each of the setup was tested. It was observed that some setups maintained pH 3 while the others increased to pH 7. What can be best inferred from the experiment?',
        options: [
            'A. The experiment is incomplete due to the fact that not all setups reached pH change from 3-7.',
            'B. Vinegar reacts unpredictably with inorganic rocks',
            'C. The different rock types vary in chemical composition so some reacted to the acid.',
            'D. All of these are correct'
        ],
        correctAnswer: 'C. The different rock types vary in chemical composition so some reacted to the acid.',
        explanation: 'Different rocks possess unique mineral compositions. Carbonate-rich rocks (like limestone) contain calcium carbonate, which actively neutralizes acids, raising the solution\'s pH. Silicate rocks (like granite) are inert to weak acids, leaving the pH unchanged.'
    },
    {
        id: 'SC-402-40',
        subject: 'Science',
        subtopic: 'Rotation and Revolution',
        question: 'It is observed that it takes about 10 Earth hours for a certain planet X to complete a single day. Which best explains the phenomenon?',
        options: [
            'A. Planet X is denser than Earth',
            'B. Planet X nearer to the sun than Earth',
            'C. Planet X rotates more rapidly than Earth',
            'D. All of the above'
        ],
        correctAnswer: 'C. Planet X rotates more rapidly than Earth',
        explanation: 'The length of a "day" on any celestial body is determined purely by the speed of its axial rotation. If a planet completes a full rotation (a day) in only 10 Earth hours, it indicates the planet is spinning much faster than Earth.'
    },
    {
        id: 'SC-401-41',
        subject: 'Science',
        subtopic: 'Earth\'s Surface',
        question: 'In Toyang\'s barangay, there is a river that cuts deep into the Earth, wherein several layers A, B, C, D (arranged from the top to the bottom layer) of different rocks are exposed. The oldest rock layer is likely to be layer...',
        options: [
            'A. A',
            'B. B',
            'C. C',
            'D. D'
        ],
        correctAnswer: 'D. D',
        explanation: 'According to the geological Principle of Superposition, in an undisturbed sequence of sedimentary strata, the oldest layer was deposited first and sits at the very bottom (Layer D), while the youngest layer is on top.'
    },
    {
        id: 'SC-402-42',
        subject: 'Science',
        subtopic: 'The Solar System',
        question: 'The density of Saturn is significantly lesser when compared to the Earth. However, the diameter of Saturn is ten times of that of Earth. The disparity in density of the two planets is due to...',
        options: [
            'A. Earth is nearer to the sun',
            'B. Earth has a shorter revolution around the sun',
            'C. Saturn being a gaseous planet',
            'D. Saturn has a ring around it'
        ],
        correctAnswer: 'C. Saturn being a gaseous planet',
        explanation: 'Saturn is classified as a "gas giant," composed predominantly of the lightest elements in the universe, hydrogen and helium. Earth is a terrestrial planet made of dense rock and metal cores. Thus, despite its enormous size, Saturn\'s overall density is incredibly low.'
    },
    {
        id: 'SC-401-43',
        subject: 'Science',
        subtopic: 'Earth\'s Surface',
        question: 'Geologists suggest that the Earth is approximately 4.6 Billion years old, though no rock was found and dated to reach more than 4 billion years old. The discrepancy is most probably due to the fact that the original crust of the earth was...',
        options: [
            'A. Blasted during the formation of the earth',
            'B. Destroyed by solar radiation',
            'C. Subjected to extensive erosion',
            'D. Just too difficult to measure precisely'
        ],
        correctAnswer: 'C. Subjected to extensive erosion',
        explanation: 'The Earth is a highly geologically active planet. Eons of plate tectonics (subduction melting crust), severe weathering, and extensive surface erosion have constantly recycled and destroyed the primordial original crust, making rocks older than 4 billion years extremely rare.'
    },
    {
        id: 'SC-402-44',
        subject: 'Science',
        subtopic: 'The Solar System',
        question: 'Radioisotope dating of the oldest lunar rock was found to be _____ years old.',
        options: [
            'A. 200,000',
            'B. 13.5 billion',
            'C. 10 billion',
            'D. 4.4 billion'
        ],
        correctAnswer: 'D. 4.4 billion',
        explanation: 'Samples of the oldest lunar crust rocks (anorthosites) retrieved during the Apollo missions have been radioisotope dated to approximately 4.4 to 4.5 billion years old, offering crucial independent confirmation of the age of the Earth-Moon system.'
    },
    {
        id: 'SC-504-45',
        subject: 'Science',
        subtopic: 'Biogeochemical Cycles',
        question: 'Presence of photosynthetic bacteria on earth paved way to which of the following cycles below?',
        options: [
            'A. Oxygen cycle',
            'B. Nitrogen fixation',
            'C. Anaerobic respiration',
            'D. Both A and B'
        ],
        correctAnswer: 'A. Oxygen cycle',
        explanation: 'Early photosynthetic bacteria (cyanobacteria) were the first organisms to release free molecular oxygen as a metabolic byproduct on a massive scale (The Great Oxidation Event), paving the way for the modern global oxygen cycle.'
    },
    {
        id: 'SC-401-46',
        subject: 'Science',
        subtopic: 'Air, Weather, and Climate',
        question: 'Which of the following is the product of the convergence of warm and cold air masses at the surface of the earth?',
        options: [
            'A. Winds die down',
            'B. Cloud formation decreases',
            'C. Stormy weather patterns are developed',
            'D. Both B and C'
        ],
        correctAnswer: 'C. Stormy weather patterns are developed',
        explanation: 'When warm and cold air masses converge (creating a weather front), the warmer, less dense air is violently forced upward over the cold air. As it rises, it cools rapidly, causing moisture to condense, leading to heavy cloud formation and stormy weather.'
    },
    {
        id: 'SC-701-47',
        subject: 'Science',
        subtopic: 'Displacement, Velocity, Time',
        question: 'Object X is moving at a speed of $Y~m/s$ at a given time interval. Which of the following correctly is always true about the average speed of object X?',
        options: [
            'A. The magnitude of its average velocity over a given time interval',
            'B. One half its speed as it reached the end of the time interval',
            'C. The acceleration of object X multiplied by the time interval',
            'D. The distance covered by object X during the time interval over the time interval'
        ],
        correctAnswer: 'D. The distance covered by object X during the time interval over the time interval',
        explanation: 'By strict kinematic definition, average speed is a scalar quantity calculated as the total distance traveled by an object divided by the total time elapsed during that specific interval.'
    },
    {
        id: 'SC-701-48',
        subject: 'Science',
        subtopic: 'Displacement, Velocity, Time',
        question: 'An object has a coordinate depicted by the function $x=5t-t^2$ where x is in meters while t is in seconds. Given the time interval of $t=0$ to $t=4s$, find the average velocity of the object?',
        options: [
            'A. $+ 1m/s$',
            'B. $-1~m/s$',
            'C. $+4m/s$',
            'D. $-4m/s$'
        ],
        correctAnswer: 'A. $+ 1m/s$',
        explanation: 'Average velocity is defined as the total displacement over time: $v_{avg} = (x_f - x_i) \\div (t_f - t_i)$. First, find the positions: at $t=0$, $x = 0\\text{m}$; at $t=4$, $x = 5(4) - (4)^2 = 20 - 16 = 4\\text{m}$. Therefore, $v_{avg} = (4 - 0) \\div (4 - 0) = +1\\text{ m/s}$.'
    },
    {
        id: 'SC-701-49',
        subject: 'Science',
        subtopic: 'Displacement, Velocity, Time',
        question: 'An automobile is said to move only at a positive x-direction. If the automobile left position $x_{1}=4m$ at $t_{1}=2s$ and reached position $x_{2}$ at $t_{2}=9s$ and the average speed is $25~m/s$, find the $x_{2}$.',
        options: [
            'A. 180 m',
            'B. 179 m',
            'C. 175 m',
            'D. 176 m'
        ],
        correctAnswer: 'B. 179 m',
        explanation: 'Using the average velocity formula: $v_{avg} = (x_2 - x_1) \\div (t_2 - t_1)$. Plugging in the variables: $25 = (x_2 - 4) \\div (9 - 2)$. Multiplying both sides by 7 yields $175 = x_2 - 4$. Solving for $x_2$, we get $179\\text{ m}$.'
    },
    {
        id: 'SC-703-50',
        subject: 'Science',
        subtopic: 'Newton\'s Laws of Motion',
        question: 'A group of friends in a road trip is driving at a speed of $x~m/s$. The driver then hits the break due to a dog that suddenly crossed the road. Which of the following is observed in this phenomenon?',
        options: [
            'A. The people and objects inside the car will not move significantly',
            'B. The people and objects inside the car will lurch backward',
            'C. The people and objects inside the car will lurch forward.',
            'D. All of the above can be observed depending on the speed.'
        ],
        correctAnswer: 'C. The people and objects inside the car will lurch forward.',
        explanation: 'According to Newton\'s First Law of Motion (Inertia), an object in motion tends to stay in motion. When the car experiences a sudden deceleration (brakes), the untethered mass inside continues moving at the initial forward speed relative to the car\'s new speed, causing a forward lurch.'
    },
    {
        id: 'SC-703-51',
        subject: 'Science',
        subtopic: 'Newton\'s Laws of Motion',
        question: 'A ball is pushed in a frictionless surface. Which of the following statement/s is/are true?',
        options: [
            'A. The ball will continue rolling unless acted upon by equal, opposite force.',
            'B. The ball will skid along the surface continuously unless acted upon by an equal, opposite force.',
            'C. The ball will stop at some point due to continuous gravitational acting on the ball.',
            'D. Both A and B can be observed'
        ],
        correctAnswer: 'B. The ball will skid along the surface continuously unless acted upon by an equal, opposite force.',
        explanation: 'On a perfectly frictionless surface, there is no force to create the torque needed to initiate rotational motion (rolling). Thus, if a ball is pushed linearly, it will skid or slide along the surface at a constant velocity indefinitely as described by Newton\'s First Law.'
    },
    {
        id: 'SC-708-52',
        subject: 'Science',
        subtopic: 'Reflection and Refraction',
        question: 'A student lighted a nearby plain mirror with an angle of incidence of $21^{\\circ}$. What is the angle of reflection in this scenario?',
        options: [
            'A. 21',
            'B. 42',
            'C. 12.5',
            'D. Insufficient information to solve the problem'
        ],
        correctAnswer: 'A. 21',
        explanation: 'The Law of Reflection states that the angle of incidence (the angle an incoming ray makes with the normal) is always exactly equal to the angle of reflection. Therefore, the angle is $21^{\\circ}$.'
    },
    {
        id: 'SC-704-53',
        subject: 'Science',
        subtopic: 'Centripetal Force',
        question: 'While travelling to a nearby mountainous city, a group of friends noticed that the roads to their destination are tilted or banked. This is used to prevent cars from falling off the road. Banking of such roads is used to provide what type of force?',
        options: [
            'A. Centrifugal Force',
            'B. Centripetal Force',
            'C. Weight',
            'D. Magnetic Force'
        ],
        correctAnswer: 'B. Centripetal Force',
        explanation: 'Banking curves on roads redirects a component of the road\'s normal force horizontally towards the center of the curve. This assists friction in providing the necessary centripetal force required to keep the vehicle moving safely in a circular path.'
    },
    {
        id: 'SC-706-54',
        subject: 'Science',
        subtopic: 'Newton\'s Laws of Gravitation',
        question: 'A tidal bulge caused by the moon\'s gravitational force is stronger than the tidal bulge caused by the sun\'s gravitational force. This is due to...',
        options: [
            'A. Sun has no gravitational force',
            'B. Sun is warmer',
            'C. Moon is nearer to the earth than the sun',
            'D. The moon does not have its own light'
        ],
        correctAnswer: 'C. Moon is nearer to the earth than the sun',
        explanation: 'Although the Sun is vastly more massive than the Moon, tidal forces are a differential force heavily dependent on distance (inversely proportional to the cube of the distance). Because the Moon is significantly closer to Earth, its gravitational gradient across the Earth is much stronger.'
    },
    {
        id: 'SC-402-55',
        subject: 'Science',
        subtopic: 'Solar and Lunar Eclipses',
        question: 'This is referred to the completely dark inner part of a shadow cast during eclipses.',
        options: [
            'A. Umbra',
            'B. Penumbra',
            'C. Apogee',
            'D. Perigee'
        ],
        correctAnswer: 'A. Umbra',
        explanation: 'The umbra is the fully shaded, darkest, and innermost part of a shadow cast by an opaque object. During a solar or lunar eclipse, observers positioned fully within the umbra experience a total eclipse.'
    },
    {
        id: 'SC-401-56',
        subject: 'Science',
        subtopic: 'Earth\'s Surface',
        question: 'Which of the following refers to the discontinuity between the mantle and the outer core?',
        options: [
            'A. Gutenburg Discontinuity',
            'B. Mohorovicic Discontinuity',
            'C. Lehman Discontinuity',
            'D. Repiti Discontinuity'
        ],
        correctAnswer: 'A. Gutenburg Discontinuity',
        explanation: 'The Gutenberg Discontinuity is the seismic boundary that separates the Earth\'s solid, rocky lower mantle from the liquid iron-nickel outer core. (The Mohorovičić discontinuity separates the crust and the mantle).'
    },
    {
        id: 'SC-504-57',
        subject: 'Science',
        subtopic: 'Ecosystems',
        question: 'A student makes a setup to observe the growth of a sunflower. The setup is a completely covered box with soil and a large hole on the upper right side of the box. After several weeks of observation the flower was observed to be nearer to the hole in the box. This phenomenon is called...',
        options: [
            'A. Phototropism',
            'B. Thigmotropism',
            'C. Geotropism',
            'D. Hydrotropism'
        ],
        correctAnswer: 'A. Phototropism',
        explanation: 'Phototropism is the biological phenomenon where an organism (like a plant) exhibits directional growth in response to a light source. The stem curves towards the hole to maximize light absorption for photosynthesis.'
    },
    {
        id: 'SC-504-58',
        subject: 'Science',
        subtopic: 'Ecosystems',
        question: 'A rabbit and a mouse are in the same level in the food chain where both of them feed on grass that acts as the primary producer in the food chain. The relationship of the rabbit and mouse is said to be?',
        options: [
            'A. Mutualism',
            'B. Parasitism',
            'C. Commensalism',
            'D. Competition'
        ],
        correctAnswer: 'D. Competition',
        explanation: 'When two different species occupy the same trophic level and rely on the same limited environmental resource (such as grass in a shared habitat), they engage in interspecific competition.'
    },
    {
        id: 'SC-501-59',
        subject: 'Science',
        subtopic: 'Cell Division',
        question: 'Mitosis occurs in eukaryotic cells for several reasons. Which of the following statements shows the importance of mitosis?',
        options: [
            'A. For reproduction',
            'B. For growth',
            'C. For replacement of dead cells',
            'D. Both B and C are correct'
        ],
        correctAnswer: 'D. Both B and C are correct',
        explanation: 'Mitosis is a form of cellular division utilized by somatic (body) cells. It produces identical daughter cells and is essential for the physical growth of an organism, as well as for tissue repair and replacing dead or damaged cells.'
    },
    {
        id: 'SC-502-60',
        subject: 'Science',
        subtopic: 'Mendelian Heredity',
        question: 'If a man is a heterozygous widow\'s peak (Ww) and mates with a homozygous straight hairline (ww) woman, which of the following is true about the phenotypic ratio of their offspring?',
        options: [
            'A. 4:0, All widow\'s peak',
            'B. 0:4, All straight hairline',
            'C. 2:2 50% probability for Widow\'s peak and 50% probability for straight hairline offspring',
            'D. 3:1. 75% Widow\'s peak, 25% straight hairline'
        ],
        correctAnswer: 'C. 2:2 50% probability for Widow\'s peak and 50% probability for straight hairline offspring',
        explanation: 'A cross between a heterozygous dominant individual (Ww) and a homozygous recessive individual (ww) yields a Punnett square with results Ww, Ww, ww, and ww. This translates to a 1:1 or 50/50 phenotypic ratio.'
    }
];

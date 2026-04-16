# Question Bank Data Structure

The application uses a flat but group-aware data structure to represent both individual and context-based exam questions. This allows for flexible rendering in both the **Single-Question View** (Study Mode) and the **Full Paper View** (Exam Mode).

## File Structure

The data is organized into subject-specific modules within the `src/data/` directory:

- `questions_bank.ts`: The central entry point that aggregates and hydrates all question modules.
- `reading_bank.ts`: Contains `readingPassages` and `readingQuestions`. Passages are stored separately to avoid duplication.
- `science_bank.ts`: Science-related questions.
- `math_bank.ts`: Mathematics questions (utilizes KaTeX).
- `language_bank.ts`: Language Proficiency questions.
- `topics.json`: The master curriculum map used for categorization and stats. Use this as a reference for `subject` and `subtopic` strings.

## Interfaces (`src/types/question.ts`)

### `Question` Interface
The primary data type for all question items.

```typescript
export interface Question {
    id: string;          // Unique identifier (e.g., 'LP-101-1')
    subject: SubjectType;// 'Language Proficiency' | 'Science' | 'Mathematics' | 'Reading Comprehension'
    subtopic: string;    // MUST match a subtopic in topics.json
    question: string;    // The main prompt (supports KaTeX via $...$)
    options: string[];   // Array of 4 multiple-choice options
    correctAnswer: string; // MUST match one of the items in options
    explanation: string;  // Pedagogical explanation
    
    // Optional Context Fields
    groupId?: string;      // Used to link multiple questions to the same passage/figure
    contextTitle?: string; // Human-readable title (e.g., "Passage 1")
    passage?: string;      // Long-form text excerpt
    figure?: string;       // Image URL or path (Science/Math diagrams)
    passageType?: 'prose' | 'poetry'; // Influences text layout
    variant?: 'standard' | 'error-identification'; // NEW: Use 'error-identification' for grammar tests
}
```

### `ReadingPassage` Interface
Used in `reading_bank.ts` to define shared contexts for reading comprehension.

```typescript
export interface ReadingPassage {
    groupId: string;
    contextTitle: string;
    passage: string;
}
```

## How Grouping & Hydration Works

### Deterministic Grouping
The exam engine identifies questions with the same `groupId` and treats them as a contiguous block. Shared context (like a `passage` or `figure`) is rendered once at the beginning of the group to avoid redundancy.

### Hydration (Reading Comprehension)
To keep the source files clean, `reading_bank.ts` stores passages in a separate `readingPassages` array. These are merged into individual questions inside `questions_bank.ts` before export:

```typescript
// From questions_bank.ts
const hydratedReadingQuestions = readingQuestions.map(q => {
    if (q.groupId) {
        const passageData = readingPassages.find(p => p.groupId === q.groupId);
        if (passageData) {
            return { ...q, contextTitle: passageData.contextTitle, passage: passageData.passage };
        }
    }
    return q;
});
```

### Error Identification Variant
For "Finding the Error" questions where specific parts of a sentence are underlined and labeled (A, B, C, D), use the following:
- Set `variant` to `'error-identification'`.
- Use the syntax `{text}[label]` in the `question` string.
- Provide the text identified by the label as the corresponding option.

**Example Syntax:**
```typescript
question: "{She}[A] {don't}[B] want to go {to the park}[C]. {No error}[D]."
```
This will automatically render the text with underlines and labels centered beneath each part.

### Vocabulary (Synonyms & Antonyms)
To group vocabulary questions and provide standardized instructions while adhering to `topics.json`:
- For **Synonyms**, use the standard `subtopic` ('Use of Context Clues' or 'Talasalitaan').
- For **Antonyms**, use the same standard `subtopic` but add a specific `groupId`:
  - `lp-antonym-eng`: Triggers English "opposite in meaning" instructions.
  - `lp-antonym-fil`: Triggers Filipino "kasalungat" instructions.
- The system in `PaperView.tsx` will automatically inject the correct instruction header based on these specific group IDs.

## Step-by-Step: Adding a New Question

Follow these steps to ensure new content integrates correctly with the simulation engine and analytics system.

### 1. Identify the Subject & Target File
Depending on the subject matter, locate the corresponding file in `src/data/`:
- **Language Proficiency**: `language_bank.ts`
- **Science**: `science_bank.ts`
- **Mathematics**: `math_bank.ts`
- **Reading Comprehension**: `reading_bank.ts`

### 2. Generate a Unique ID
Follow the convention: `[SUBJECT_CODE]-[TOPIC_ID]-[INDEX]`
- `LP` = Language Proficiency
- `SC` = Science
- `MA` = Mathematics
- `RC` = Reading Comprehension
- *Example*: `LP-102-5` (Language Proficiency, Agreement, Item 5)

### 3. Match the Subtopic
Open `topics.json` and find the appropriate `subtopic` name. Your question's `subtopic` field **MUST** match this string exactly (case-sensitive) for the analytics engine to track progress correctly.

### 4. Code the Question Object
Append your question to the exported array in the target file.

#### Standard Question Template:
```typescript
{
    id: 'SC-501-10',
    subject: 'Science',
    subtopic: 'Structure of a Cell',
    question: 'Which organelle is known as the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'],
    correctAnswer: 'Mitochondria',
    explanation: 'The mitochondria generate most of the cell\'s supply of ATP.'
},
```

### 5. Specialized Content Types

#### Mathematical Expressions
Use LaTeX syntax wrapped in single dollar signs for inline (`$E=mc^2$`) or double dollar signs for blocks (`$$\frac{-b \pm \sqrt{d}}{2a}$$`).

#### Error Identification (Grammar)
Set `variant: 'error-identification'` and use the `{text}[label]` syntax:
```typescript
question: "{Neither}[A] of the contestants {were}[B] able to complete {the difficult challenge}[C]. {No error}[D].",
variant: 'error-identification'
```

#### Grouped Questions & Passages
1. Add the passage to `readingPassages` in `reading_bank.ts` with a unique `groupId`.
2. Add questions to `readingQuestions` using that same `groupId`.
3. The engine in `questions_bank.ts` will automatically hydrate them.

---

## Best Practices for Content Addition

-   **IDs**: Always check for duplicate IDs before committing.
-   **Explanations**: Aim for academic rigor. Explain *why* the correct answer is right and why distractors are wrong if possible.
-   **Asset Management**: Store figures in `public/assets/figures/` and reference via absolute paths starting with `/assets/...`.
-   **Verification**: Run `npm run dev` and check the "Study Mode" / "Test Your Knowledge" views to see your new questions in action.


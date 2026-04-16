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

## Best Practices for Content Addition

-   **IDs**: Follow the convention: `[SUBJECT_CODE]-[SUBTOPIC_ID]-[INDEX]` (e.g., `SC-703-1`).
-   **Subtopics**: Ensure the `subtopic` string matches the name in `topics.json` exactly.
-   **Mathematics**: Use KaTeX. Single dollar signs `$x^2$` for inline, double `$$...$$` for blocks.
-   **Reading Content**: Add the text to `readingPassages` first, then reference its `groupId` in your `readingQuestions`.
-   **Science Figures**: Unlike reading passages, figures are currently included directly in the question objects in `science_bank.ts`. If multiple questions share a figure, repeat the `figure` and `contextTitle` fields.

## Asset Management

All figure/image assets should be stored in: `public/assets/figures/`. Reference them using absolute paths relative to the public root: `/assets/figures/cell_diagram.png`.


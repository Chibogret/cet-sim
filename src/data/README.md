# Data Structure

The application uses a hierarchical data structure to represent complex exam formats.

## QuestionGroup
A `QuestionGroup` logically groups questions that share common context, such as a reading passage or a scientific figure.

```typescript
interface QuestionGroup {
  id: string;
  section: string; // e.g., 'Reading Comprehension'
  sharedMedia?: MediaContent[]; // Passages, figures, etc. shared by all questions in the group
  questions: Question[];
}
```

## Question
A `Question` represents a single multiple-choice item. It can also have its own specific media.

```typescript
interface Question {
  id: string;
  prompt: string;
  options: string[]; // e.g., ['A. Option 1', 'B. Option 2']
  answer: string;    // e.g., 'A'
  media?: MediaContent[]; // Media specific to this question
}
```

## MediaContent
`MediaContent` represents text or image assets used in the exam.

```typescript
interface MediaContent {
  type: 'text' | 'image';
  content: string; // The actual text or the URL to the image
  caption?: string;
}
```

## Utility Functions
- `flattenQuestions(groups: QuestionGroup[]): Question[]`: Converts the hierarchical group structure into a flat array of questions, useful for scoring and answer sheet rendering.

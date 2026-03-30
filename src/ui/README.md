# UI Components

The user interface components are designed to simulate a physical examination environment.

## PaperView.tsx
Renders the actual test questions and associated media.
- Receives `QuestionGroup` data to render shared passages/figures followed by their respective questions.
- Applies visual effects based on `fatigueLevel` (blur, contrast, letter spacing, line height).
- Uses a sophisticated SVG filter for a realistic, subtle paper texture background.
- Handles the display of eliminated options (from the 'Process of Elimination' tactic).

## AnswerSheet.tsx
Renders the interactive answer sheet for shading choices.
- Receives a flattened list of `Question` objects.
- Displays a grid of selectable bubbles (A, B, C, D).
- Updates the `answers` state in the `sheetEngine`.
- Uses the same sophisticated SVG paper texture as the `PaperView`.

## TimerBar.tsx
Displays the remaining time for the current section.
- Visually indicates urgency (turns red when time is low).
- Shows the current section name.

# Engines

The application logic is separated into distinct "engines" (custom React hooks) to manage state and behavior.

## examEngine.ts
Manages the overall flow of the examination.
- Tracks the current section (`currentSectionIndex`).
- Manages the countdown timer (`timeLeft`, `timerActive`).
- Calculates the `fatigueLevel` based on sections completed.
- Handles state transitions (`start`, `running`, `section_end`, `finished`).
- Filters `questionGroups` for the current section and provides a flattened list of `sectionQuestions`.

## sheetEngine.ts
Manages the user's answers and scoring.
- Stores the user's selected answers in a dictionary (`answers`).
- Provides a function to update answers (`setAnswer`).
- Calculates the final raw score (`getScore`).

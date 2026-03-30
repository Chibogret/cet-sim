# University Admission Test Simulator (Beta)

Welcome to the Beta Release of the Deterministic University Admission Test Simulator, designed specifically for UPCAT, ACET, DCAT, and USTET readiness. This application focuses on delivering a deterministic, proctored, high-fidelity daily simulation of high-stakes exams.

## Features

- **Daily Rotation:** The question set shuffles deterministically based on the current date, providing a true "Daily Challenge" experience identical across all users on any given day.
- **Strict Proctor Mechanics:** The exam rigorously checks for taboo behaviors such as opening other tabs. Any "visibility loss" incurs a time penalty.
- **Cognitive Tactics:** Five strategic exam maneuvers:
  1. *Time Borrow:* +15 seconds to your clock.
  2. *Process of Elimination:* Automatically strikes through two incorrect options for a blank question.
  3. *Pattern Insight:* Analyzes frequency (simulated). 
  4. *Second Guess:* The "doubt mechanic" normally deducts 5 seconds when you change an answer. This tactic prevents that penalty for your next change.
  5. *Skip Bank:* Smoothly scrolls to your next unanswered question to optimize pacing.
- **AI-Ready Analytics:** End-of-exam features compile an exportable `.txt` payload or directly open an AI interaction pre-loaded with a rigid prompt directing a custom "veteran professor" AI to visually dissect and correct knowledge gaps.

## Beta Version Fixes && Adjustments (v0.9.0)

For the beta release, several logic checks and styling updates have been finalized based on internal alpha testing:

1. **Aesthetics & Readability Polish:** We replaced the heavy gray styling with a proper stark white (`#ffffff`) background, modifying the underlying SVG fractal noise filter to increase the alpha property (from 0.08 to 0.15). The end result is a highly readable UI that retains a subtle, distinct "exam paper" texture.
2. **Fixed Auto-Progress Bypass Bug:** Exam Engine now properly respects real-world pacing. Previously, continuous timers would skip the "Section Ended" screen and immediately rush into the next test area. The engine now pauses correctly, requiring the user to explicitly "Proceed" after time is called.
3. **Fixed Elimination State Bleed:** Process of Elimination states (`curve_eliminated`) are now properly cleared from LocalStorage at the start of every new daily attempt. Previously, strikethroughs would persist into completely different questions in subsequent attempts.
4. **Resolved Visibility Leak:** Cleaned up a dangling `document.addEventListener('visibilitychange')` listener inside the persistent Sheet Engine hook.
5. **Finalized Tactic Implementations:** "Second Guess" and "Skip Bank" were hooked into `App.tsx`'s state management. 
   - *Second Guess* flags state to nullify the next `ANSWER_CHANGED_PENALTY`.
   - *Skip Bank* utilizes pure Javascript DOM element searches (`document.getElementById`) to reliably locate the next empty element ID and apply smooth scrolling to anchor the user cleanly to their skipped items.

## Setup Instructions

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Enter testing suite via typical `localhost:5173` routes.

Please track any remaining bugs via the issue tracker. Good luck, examinees.

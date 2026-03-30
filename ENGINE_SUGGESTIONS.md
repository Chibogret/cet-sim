# Suggestions for Exam Engine Modifications

Here are some suggested enhancements for the current exam engine architecture (located in `src/engine/`):

## 1. Modular Penalty System (examEngine.ts)
Currently, penalties for actions like changing answers ("doubt penalty") are hard-coded in the UI (`App.tsx`). This logic should be moved to the `examEngine` state machine.
- **Suggestion**: Create a `dispatchPenalty({ type: 'DOUBT', questionId })` hook function. The engine can decide the severity (e.g., deducting 5 seconds or lowering a score modifier).

## 2. Dynamic Section Transitions
Right now, the transition from one section to another is manual when the time expires (showing a `section_end` screen). 
- **Suggestion**: Add a configuration option for "Auto-Progress" vs "Strict Pauses." Some simulated exams might jump straight to the next section without requiring the `Proceed` button.

## 3. Pause & Resume Capability
If this is used for non-proctored studying or as a practice tool, allowing a pause mechanism is essential. Currently, time flows uncontrollably once started.
- **Suggestion**: Introduce a `setPaused(boolean)` state. It must freeze `elapsedTime` updates correctly without breaking the `performance.now()`-based timer accuracy.

## 4. More Complex Question Types (sheetEngine.ts)
The `sheetEngine` currently uses a simple `Record<string, string>` mapping for single-choice questions.
- **Suggestion**: Evolve the structure into `Record<string, { value: string | string[], timestamp: number }>` to accommodate multi-select checkboxes or short-form fill-in-the-blanks, which are increasingly common in digital SATs and other tests.

## 5. Event Telemetry / Analytics Engine
To figure out where users struggle most, it's very useful to track events (when an option is selected, when a tactic is used, time spent per question).
- **Suggestion**: Create a lightweight telemetry array in the storage: `[{ timestamp, type: 'SELECT_OPTION', data: { id, value } }]`. This data could be displayed on a results screen or exported.

## 6. Real-Time Recovery & Persistence Polish
The current state is saved to `localStorage`, but if a user accidentally closes the tab during the 60-second timer tick, they might lose up to a second of accuracy.
- **Suggestion**: Tie `localStorage` syncing to a `visibilitychange` event (like the proctor penalty) or a specific time-delta sync, to guarantee absolute state accuracy upon page reload.

## 7. Formatting Parser Abstraction
We currently parse equations inline within the UI.
- **Suggestion**: Create a dedicated `formatEngine` or use a comprehensive markdown pipeline (e.g. `remark`/`rehype`) to separate text formatting from `PaperView`, making it reusable for external content injection.

## 8. Item Response Theory (IRT) Scoring Modules
The engine currently doesn't factor in dynamic difficulty.
- **Suggestion**: Introduce an IRT scoring module to the engine. Rather than outputting raw totals, this module would calculate scores by weighting questions based on their intrinsic difficulties, similar to the modern digital SAT.

## 9. Modular Exam Configurations
- **Suggestion**: Expose a robust `ExamConfig` schema allowing users to inject custom strictness rules, time limits, and breaks dynamically instead of relying on default constants.

# CET Simulator QA Review

Review date: April 21, 2026  
Scope: functional QA, content QA, workflow friction, and performance risk review. Visual/UI redesign suggestions are intentionally excluded.

## Bugs & Errors

### 1. "Untimed" mode ends the section after one second

- **Evidence:** The settings dropdown labels `value="1"` as `Untimed` in `src/ui/LandingPage.tsx`. `startExam()` treats `customTimeLimit` as seconds, so the exam starts with a 1-second timer in `src/engine/examEngine.ts`.
- **User impact:** A student selecting "Untimed" is immediately sent to the section-end screen.
- **Repro:** Customize Session -> Timer -> Untimed -> Begin Simulation. After roughly 1.5 seconds, the app shows "TIME IS UP / SECTION ENDED."
- **Why broken:** The label promises no time limit, but the stored value is a one-second timed section.

### 2. Answer changes silently fail after one change on the same question

- **Evidence:** `src/engine/sheetEngine.ts` stores one `crossouts[questionId]` value after the first change. `src/App.tsx` blocks further changes if `crossouts[questionId]` exists, while `src/ui/AnswerSheet.tsx` only disables alternate choices when `changesRemaining < 1`.
- **User impact:** A student can see remaining changes and enabled answer bubbles, click another option, and nothing happens.
- **Repro:** Start exam -> answer item 1 as A -> change item 1 to B -> with 2 changes still remaining, click C. The answer remains B and no explanation is shown.
- **Why broken:** The UI state and the rule enforcement disagree. The app behaves like "one change per question," but the displayed rule only communicates a global "Max N changes remaining."

### 3. iPad answer bubbles fail the current touch-target requirement

- **Evidence:** `npm run test:e2e` fails `iPad Pro answer bubbles meet 44px touch-target minimum`; Playwright measured the first bubble at 32 px. The answer bubbles are defined as `w-8 h-8` in `src/ui/AnswerSheet.tsx`.
- **User impact:** Tapping answer choices on tablet is more error-prone than the test's own accessibility threshold permits.
- **Why broken:** This is a functional input-target failure, not a visual preference issue.

### 4. Study Mode stores spaced-repetition data but does not use it for daily selection

- **Evidence:** `useVocabSR()` writes `nextReview`, `interval`, `repetition`, and `easeFactor` to `vocab_sr_metrics`, but `DailyStudy` still calls `selectDailyVocab(dailySeed, words, 8)`. `selectDailyVocab()` only shuffles by date seed and ignores due words.
- **User impact:** Words marked forgotten or due for review do not become more likely to appear. The "spaced repetition" behavior is therefore incomplete.
- **Why broken:** Review metadata is collected but not connected to the selection algorithm.

### 5. Quick Review can repeat questions inside the same set

- **Evidence:** `QuickReview.generateQuestions()` uses `Math.random()` once per subject per batch and pushes the selected item into `newQuestions` without removing it from the pool.
- **User impact:** In larger review sets, students can receive duplicate questions while other available questions are skipped.
- **Why broken:** Random sampling is with replacement, but a review set is normally expected to contain unique items unless explicitly stated otherwise.

### 6. Quick Review labels English error-identification instructions with "Panuto"

- **Evidence:** `getInstruction()` returns `isFilipino: true` for every `error-identification` question, even English items such as `LP-105-10`. Quick Review uses `isFilipino ? 'Panuto: ' : 'Instructions: '`.
- **User impact:** English grammar questions can display a Filipino instruction label, which looks like a localization/content error.
- **Why broken:** The helper conflates "has error-identification instructions" with "is Filipino."

### 7. Performance risk: main production JavaScript chunk is large

- **Evidence:** `npm run build` succeeds but reports `assets/index-*.js` at approximately 1,030 kB minified / 304 kB gzip and triggers Vite's chunk-size warning.
- **User impact:** First load can be slow on low-end phones or weak mobile connections, especially because large question, vocabulary, and lesson banks appear to be bundled up front.
- **Why broken:** Not a correctness failure, but a measurable performance risk flagged by the build tool.

## Current Pain Points

### 1. Answering requires moving away from the question feed

- The main paper view is intentionally read-only; answers must be entered in the separate answer sheet. This is realistic for a simulation, but it adds friction on mobile because users must swipe between the question pane and answer sheet pane.
- The pain point is strongest for long reading/science items where students must remember the chosen option while navigating to the sheet.

### 2. Pause undermines strict simulation expectations

- The app presents a proctored exam model with penalties for tab switching, but it also allows pausing the timer directly.
- This creates a rules mismatch: users can avoid time pressure through Pause while still being penalized for visibility changes.

### 3. Change-limit feedback is too implicit

- When a same-question second change is blocked, there is no user-facing reason. The student is left to infer whether the tap missed, the app lagged, or the answer was locked.
- This is especially problematic because the global remaining-change counter can still be above zero.

### 4. Section progression is all-or-nothing

- Advancing to the next section is irreversible, which is valid for exam simulation, but there is no pre-advance summary of unanswered questions.
- Users can accidentally leave a section with blanks even though the answer state is already available locally.

### 5. Quick Review has no visible duplicate guard or coverage promise

- The mode selects random questions by subject and batch, but users are not told whether repeats are possible.
- This can make practice feel less comprehensive than the size of the question bank suggests.

## Question Quality Review

### Data integrity checks that passed

- Total hydrated question count: 270.
- Subject distribution: Language Proficiency 72, Science 60, Mathematics 60, Reading Comprehension 78.
- No duplicate question IDs found.
- No missing explanations found.
- Every `correctAnswer` matched one of its options.
- All referenced figure assets loaded with nonzero dimensions in E2E tests.
- Rendered language content passed the existing mojibake-marker test.

### High-priority content issues

#### Line-number references appear without rendered line numbers

- **Affected items:** `RC-1301-63`, `RC-1301-64`, `RC-1301-66`, `RC-1302-76`.
- **Problem:** These questions refer to "line 14," "line 3," or "line 9," but the rendered passage/poem component does not display line numbers.
- **Impact:** Students cannot reliably locate the referenced text. This is a content-function mismatch, not a visual preference.

#### `SC-703-50` contains a word-choice error that changes surface meaning

- **Current wording:** The driver "hits the break."
- **Problem:** "Break" should mean separation or interruption; the item clearly intends vehicle braking.
- **Impact:** This is likely understandable, but it is an avoidable distractor in a physics item.

#### `SC-501-30` answer option A is grammatically incomplete

- **Current option:** "It contains digestive enzymes which degrades extracellular internalized by the cell and worn-out organelles."
- **Problem:** The phrase "extracellular internalized by the cell" is missing a noun and has subject-verb agreement issues.
- **Impact:** The correct answer is identifiable, but the option quality is below exam-standard clarity.

#### `SC-701-47` has awkward and redundant phrasing

- **Current wording:** "Which of the following correctly is always true about the average speed of object X?"
- **Problem:** The adverb placement and "correctly is always true" phrasing are unnatural.
- **Impact:** The underlying physics concept is fine, but the stem slows comprehension.

#### `SC-605-15` uses redundant phrasing

- **Current wording:** "sufficient enough"
- **Problem:** Redundant expression.
- **Impact:** Low content risk, but it should be cleaned for professional assessment tone.

#### `SC-401-39` has several grammar issues in the setup

- **Current wording includes:** "3 setups of beaker," "each of the setup."
- **Problem:** The scenario is understandable but not polished.
- **Impact:** The grammar noise distracts from the experimental-inference skill being tested.

#### `SC-402-42` has awkward comparative wording

- **Current wording:** "significantly lesser," "ten times of that of Earth."
- **Problem:** These are nonstandard comparative constructions.
- **Impact:** The correct answer is still clear, but the item reads less like a formal exam question.

#### `MA-1203-1` has unclear wording around ordering

- **Current wording:** "a student ID constitutes 2 letters and then 3 digits ... which cannot be jumbled."
- **Problem:** "Constitutes" and "cannot be jumbled" are awkward for a fixed-format ID.
- **Impact:** The calculation is correct, but the stem may confuse students before they reach the combinatorics.

#### `RC-1302-15` has an ungrammatical distractor

- **Current option:** "People who fear flying have known someone die of plane crash."
- **Problem:** Missing article/preposition structure.
- **Impact:** The distractor may be dismissed for grammar rather than comprehension.

#### `RC-1302-18` uses a misspelling

- **Current option:** "miniscule"
- **Problem:** Standard spelling is "minuscule."
- **Impact:** Low risk, but spelling errors in reading options reduce perceived assessment quality.

### Accuracy observations

- I did not find schema-level answer-key errors in the automated checks.
- The sampled quantitative science/math explanations checked out for `SC-605-11`, `SC-605-15`, `MA-1203-1`, and `MA-812-1`.
- Some content should still receive expert academic validation, especially reading-comprehension items where answer defensibility depends on the source passage and any intended line numbering.

## Functional Suggestions

1. Treat `Untimed` as a real untimed state instead of `1` second. Confirm behavior across start, section transition, refresh, and results.

2. Decide the intended answer-change rule and make logic match it:
   - If the rule is global three changes, allow multiple changes on the same question until the counter reaches zero.
   - If the rule is one change per question, disable remaining options after the first change and explain the lock state.

3. Add regression coverage for:
   - Untimed mode not expiring.
   - Same-question second-change behavior.
   - Quick Review English error-identification instruction label.
   - Study Mode due/forgotten vocabulary resurfacing.
   - Reading items with line references having usable line anchors.

4. Connect spaced-repetition metadata to vocabulary selection. Due or forgotten words should influence Daily Study and/or Flashcards, otherwise remove the claim that selection is optimized by spaced repetition.

5. Change Quick Review sampling to avoid duplicates within one generated set unless the product intentionally wants repeated drilling.

6. Add a content-lint pass for question banks:
   - Flag line-number references when the associated passage has no line markers.
   - Flag common wording issues such as "sufficient enough," "hits the break," and "miniscule."
   - Flag duplicate stems where repeated wording is not intentional.
   - Flag options whose grammar quality makes them implausible for non-content reasons.

7. Investigate bundle splitting for large data-backed study/review modules. The app builds successfully, but the current main chunk size is a performance warning worth addressing before broader release.

## Verification Notes

- `npm run lint`: passed.
- `npm run build`: passed with one large chunk warning.
- `npm run test:unit`: 9 tests passed.
- `npm run test:e2e`: 22 passed, 41 skipped, 1 failed. Failure: iPad Pro answer bubble target measured at 32 px instead of the expected 44 px.
- Manual browser repros confirmed the "Untimed" one-second expiration and the silent same-question answer-change block.

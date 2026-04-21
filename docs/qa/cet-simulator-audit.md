# CET Simulator QA Audit

Date: 2026-04-21

## Coverage Added

- Unit audit tests for scoring and local-storage normalization.
- Playwright black-box tests for timer persistence, timer expiry, section navigation, abort cleanup, scoring display, answer-sheet behavior, explanation leakage, sticky layout, iPad Pro touch targets, mobile figure sizing, localization, and figure asset loading.
- Browser projects: Chromium desktop, WebKit iPad Pro, Chromium mobile portrait, and Firefox desktop.

## Defects Fixed

1. **Right-minus-wrong scoring floors deductions**
   - Expected: `correct - incorrect * 0.25`.
   - Fixed: deduction now uses the exact `0.25` penalty per incorrect answer.
   - Verified: `npm run test:unit` and `npm run test:e2e -- --project=chromium-desktop`.
   - Severity: High, scoring reliability.

2. **Abort does not clear temporary exam state**
   - Expected: Abort removes `curve_examState`, `curve_sectionIndex`, `curve_endTime`, `curve_answers`, `curve_crossouts`, `curve_changes`, and `curve_telemetry`.
   - Fixed: Abort now stops the timer engine and clears temporary answers, crossouts, change count, exam state, section, end time, fatigue, and telemetry.
   - Verified: `npm run test:e2e -- --project=chromium-desktop`.
   - Severity: High, session integrity.

3. **Browser Back exits/unlocks the active section state**
   - Expected: after advancing to Science, browser Back must not restore or escape to a prior locked exam state.
   - Fixed: running exam sessions now guard browser history so Back does not unlock the previous section.
   - Verified: `npm run test:e2e -- --project=chromium-desktop`.
   - Severity: High, navigation integrity.

4. **Main question feed must remain read-only**
   - Expected: only the answer sheet accepts responses; clicking option text in the main feed must not answer the question.
   - Fixed: main-feed options remain read-only, and the answer sheet is the only input surface.
   - Verified: `npm run test:e2e -- --project=chromium-desktop`.
   - Severity: Medium, UX/sync.

5. **iPad Pro answer bubbles are below touch-target minimum**
   - Expected: answer bubbles provide at least 44x44 CSS px tap targets without visually oversized circles.
   - Fixed: answer-sheet controls now keep a compact visual bubble inside a 44x44 CSS px tap target.
   - Verified: `npm run test:e2e -- --project=webkit-ipad-pro`.
   - Severity: Medium, tablet usability.

## Verification Summary

- `npm run lint`: passed.
- `npm run test:unit`: passed, 9 tests.
- `npm run test:e2e -- --project=chromium-desktop`: passed, 12 tests, 2 viewport-specific skips.
- `npm run test:e2e -- --project=webkit-ipad-pro`: passed, 4 tests, 10 project-specific skips.
- `npm run test:e2e -- --project=chromium-mobile`: passed, 3 tests, 11 project-specific skips.
- `npm run test:e2e -- --project=firefox-desktop`: passed, 2 tests, 12 project-specific skips.
- `npm run build`: passed with the existing bundle-size warning.

## Passing Checks

- Timer refresh persistence resumes near the persisted end time.
- Expired timer enters the section-end state.
- Right-minus-wrong OFF displays raw correct score correctly.
- Answer-sheet selection persists across reload and blocks a fourth change.
- Simulation mode with Quick Feedback off does not render explanations before results.
- Header and answer sheet remain sticky/independently scrollable on desktop and iPad layouts.
- Mobile portrait figures stay inside the viewport.
- Rendered language content has no detected mojibake markers in Chromium, WebKit, or Firefox.
- Referenced figure assets load with nonzero natural dimensions.

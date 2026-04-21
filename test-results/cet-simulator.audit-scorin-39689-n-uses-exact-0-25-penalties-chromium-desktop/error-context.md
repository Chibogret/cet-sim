# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cet-simulator.audit.spec.ts >> scoring reliability >> right-minus-wrong on uses exact 0.25 penalties
- Location: tests\e2e\cet-simulator.audit.spec.ts:161:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Wrong Deduction/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/Wrong Deduction/i)

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: "[plugin:vite:css-analysis] ENOENT: no such file or directory, open 'C:\\Users\\deiny\\OneDrive\\Desktop\\cet-sim\\cet-sim\\playwright-report\\trace\\playwright-logo.svg'"
  - generic [ref=e5]: C:/Users/deiny/OneDrive/Desktop/cet-sim/cet-sim/src/index.css
  - generic [ref=e6]: at async open (node:internal/fs/promises:641:25) at async Object.readFile (node:internal/fs/promises:1245:14) at async fileToDevUrl (file:///C:/Users/deiny/OneDrive/Desktop/cet-sim/cet-sim/node_modules/vite/dist/node/chunks/dep-D4NMHUTW.js:10500:21) at async TransformPluginContext.handler (file:///C:/Users/deiny/OneDrive/Desktop/cet-sim/cet-sim/node_modules/vite/dist/node/chunks/dep-D4NMHUTW.js:43496:29) at async EnvironmentPluginContainer.transform (file:///C:/Users/deiny/OneDrive/Desktop/cet-sim/cet-sim/node_modules/vite/dist/node/chunks/dep-D4NMHUTW.js:42323:18) at async loadAndTransform (file:///C:/Users/deiny/OneDrive/Desktop/cet-sim/cet-sim/node_modules/vite/dist/node/chunks/dep-D4NMHUTW.js:35739:27) at async viteTransformMiddleware (file:///C:/Users/deiny/OneDrive/Desktop/cet-sim/cet-sim/node_modules/vite/dist/node/chunks/dep-D4NMHUTW.js:37254:24
  - generic [ref=e7]:
    - text: Click outside, press Esc key, or fix the code to dismiss.
    - text: You can also disable this overlay by setting
    - code [ref=e8]: server.hmr.overlay
    - text: to
    - code [ref=e9]: "false"
    - text: in
    - code [ref=e10]: vite.config.ts
    - text: .
```

# Test source

```ts
  65  |   };
  66  | 
  67  |   await seedStorage(page, {
  68  |     ...runningStorage({
  69  |       curve_examState: 'finished',
  70  |       curve_endTime: '',
  71  |       curve_examConfig: JSON.stringify(scoringConfig),
  72  |       curve_answers: JSON.stringify(answers)
  73  |     })
  74  |   });
  75  | }
  76  | 
  77  | function answersWithWrongCount(wrongCount: number) {
  78  |   const sample = questionsBank.slice(0, 8);
  79  |   const answers: Record<string, string> = {};
  80  | 
  81  |   sample.slice(0, 5).forEach(question => {
  82  |     answers[question.id] = question.correctAnswer;
  83  |   });
  84  | 
  85  |   sample.slice(0, wrongCount).forEach(question => {
  86  |     answers[question.id] = question.options.find(option => option !== question.correctAnswer) ?? '__wrong__';
  87  |   });
  88  | 
  89  |   return answers;
  90  | }
  91  | 
  92  | test.describe('exam state and navigation reliability', () => {
  93  |   test('timer resumes from stored end time after refresh', async ({ page }, testInfo) => {
  94  |     runOnly(testInfo, ['chromium-desktop']);
  95  |     await seedStorage(page, runningStorage({
  96  |       curve_endTime: String(Date.now() + (49 * 60 + 17) * 1000)
  97  |     }));
  98  | 
  99  |     await expect(page.getByText(/49:1[0-7]/)).toBeVisible();
  100 |     await expect(page.getByText('60:00')).toHaveCount(0);
  101 |   });
  102 | 
  103 |   test('expired timer enters section-end state', async ({ page }, testInfo) => {
  104 |     runOnly(testInfo, ['chromium-desktop']);
  105 |     await seedStorage(page, runningStorage({
  106 |       curve_endTime: String(Date.now() - 1000)
  107 |     }));
  108 | 
  109 |     await expect(page.getByText(/Time is Up \/ Section Ended/i)).toBeVisible();
  110 |   });
  111 | 
  112 |   test('next section requires confirmation and browser Back does not unlock prior section', async ({ page }, testInfo) => {
  113 |     runOnly(testInfo, ['chromium-desktop']);
  114 |     await seedStorage(page, runningStorage());
  115 | 
  116 |     page.once('dialog', dialog => dialog.dismiss());
  117 |     await page.getByRole('button', { name: 'Next Section' }).click();
  118 |     await expect(page.getByRole('heading', { name: /Language Proficiency/i })).toBeVisible();
  119 | 
  120 |     page.once('dialog', dialog => dialog.accept());
  121 |     await page.getByRole('button', { name: 'Next Section' }).click();
  122 |     await expect(page.getByRole('heading', { name: /Science/i })).toBeVisible();
  123 | 
  124 |     await page.goBack().catch(() => null);
  125 |     await expect(page.getByRole('heading', { name: /Science/i })).toBeVisible();
  126 |     await expect(page.getByRole('heading', { name: /Language Proficiency/i })).toHaveCount(0);
  127 |   });
  128 | 
  129 |   test('abort clears all temporary exam state and returns to start', async ({ page }, testInfo) => {
  130 |     runOnly(testInfo, ['chromium-desktop']);
  131 |     await seedStorage(page, runningStorage({
  132 |       curve_answers: JSON.stringify({ [questionsBank[0].id]: questionsBank[0].correctAnswer }),
  133 |       curve_crossouts: JSON.stringify({ [questionsBank[0].id]: questionsBank[0].options[1] }),
  134 |       curve_changes: '0',
  135 |       curve_telemetry: JSON.stringify([{ timestamp: Date.now(), type: 'SELECT_OPTION' }])
  136 |     }));
  137 | 
  138 |     page.once('dialog', dialog => dialog.accept());
  139 |     await page.getByRole('button', { name: 'Abort' }).click();
  140 | 
  141 |     await expect(page.getByRole('button', { name: 'Begin Simulation' })).toBeVisible();
  142 |     const remaining = await page.evaluate(keys => {
  143 |       return Object.fromEntries(keys.map(key => [key, localStorage.getItem(key)]));
  144 |     }, temporaryKeys);
  145 | 
  146 |     expect(remaining).toEqual(Object.fromEntries(temporaryKeys.map(key => [key, null])));
  147 |     await expect(page.getByText(/Performance Summary Sheet/i)).toHaveCount(0);
  148 |   });
  149 | });
  150 | 
  151 | test.describe('scoring reliability', () => {
  152 |   test('right-minus-wrong off shows raw correct over total', async ({ page }, testInfo) => {
  153 |     runOnly(testInfo, ['chromium-desktop']);
  154 |     await finishExamWithAnswers(page, answersWithWrongCount(2), false);
  155 | 
  156 |     await expect(page.getByText(/Raw Correct/i)).toBeVisible();
  157 |     await expect(page.getByText(`3 / ${questionsBank.length}`)).toBeVisible();
  158 |     await expect(page.getByText(/^3$/)).toBeVisible();
  159 |   });
  160 | 
  161 |   test('right-minus-wrong on uses exact 0.25 penalties', async ({ page }, testInfo) => {
  162 |     runOnly(testInfo, ['chromium-desktop']);
  163 |     await finishExamWithAnswers(page, answersWithWrongCount(3), true);
  164 | 
> 165 |     await expect(page.getByText(/Wrong Deduction/i)).toBeVisible();
      |                                                      ^ Error: expect(locator).toBeVisible() failed
  166 |     await expect(page.getByText('-0.75')).toBeVisible();
  167 |     await expect(page.getByText(/^1\.25$/)).toBeVisible();
  168 |   });
  169 | });
  170 | 
  171 | test.describe('answer sheet synchronization and change limits', () => {
  172 |   test('quick feedback keeps the answer sheet tight without horizontal overflow', async ({ page }, testInfo) => {
  173 |     runOnly(testInfo, ['chromium-desktop']);
  174 |     await seedStorage(page, runningStorage({
  175 |       curve_examConfig: JSON.stringify({ ...baseConfig, quickFeedback: true })
  176 |     }));
  177 | 
  178 |     await page.getByTestId('answer-1-A').click();
  179 | 
  180 |     const sheetOverflow = await page.getByTestId('answer-sheet').evaluate(node => ({
  181 |       clientWidth: node.clientWidth,
  182 |       scrollWidth: node.scrollWidth
  183 |     }));
  184 |     const documentOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  185 | 
  186 |     expect(sheetOverflow.scrollWidth).toBeLessThanOrEqual(sheetOverflow.clientWidth);
  187 |     expect(documentOverflow).toBeLessThanOrEqual(1);
  188 |   });
  189 | 
  190 |   test('quick feedback colors paper view choices after answering', async ({ page }, testInfo) => {
  191 |     runOnly(testInfo, ['chromium-desktop']);
  192 |     const firstQuestion = questionsBank[0];
  193 |     const wrongOptionIndex = firstQuestion.options.findIndex(option => option !== firstQuestion.correctAnswer);
  194 |     const correctOptionIndex = firstQuestion.options.findIndex(option => option === firstQuestion.correctAnswer);
  195 |     const wrongLetter = String.fromCharCode(65 + wrongOptionIndex);
  196 |     const correctLetter = String.fromCharCode(65 + correctOptionIndex);
  197 | 
  198 |     await seedStorage(page, runningStorage({
  199 |       curve_examConfig: JSON.stringify({ ...baseConfig, quickFeedback: true })
  200 |     }));
  201 | 
  202 |     await page.getByTestId(`answer-1-${wrongLetter}`).click();
  203 | 
  204 |     await expect(page.getByTestId(`paper-choice-1-${wrongLetter}`)).toHaveClass(/bg-red-50/);
  205 |     await expect(page.getByTestId(`paper-choice-1-${correctLetter}`)).toHaveClass(/bg-green-50/);
  206 |   });
  207 | 
  208 |   test('answer sheet selection persists across refresh and blocks a fourth change', async ({ page }, testInfo) => {
  209 |     runOnly(testInfo, ['chromium-desktop']);
  210 |     await seedStorage(page, runningStorage());
  211 | 
  212 |     await page.getByTestId('answer-1-A').click();
  213 |     await expect(page.getByTestId('answer-1-A')).toHaveClass(/bg-black/);
  214 | 
  215 |     await page.reload();
  216 |     await expect(page.getByTestId('answer-1-A')).toHaveClass(/bg-black/);
  217 | 
  218 |     await page.getByTestId('answer-1-B').click();
  219 |     await page.getByTestId('answer-2-A').click();
  220 |     await page.getByTestId('answer-2-B').click();
  221 |     await page.getByTestId('answer-3-A').click();
  222 |     await page.getByTestId('answer-3-B').click();
  223 |     await expect(page.getByText(/Max 0 changes remaining/i)).toBeVisible();
  224 | 
  225 |     await page.getByTestId('answer-4-A').click();
  226 |     await expect(page.getByTestId('answer-4-B')).toBeDisabled();
  227 |   });
  228 | 
  229 |   test('main question feed is read-only and answer sheet remains the only input surface', async ({ page }, testInfo) => {
  230 |     runOnly(testInfo, ['chromium-desktop']);
  231 |     await seedStorage(page, runningStorage());
  232 | 
  233 |     await page.getByTestId('question-1').getByText(/^A\.$/).click();
  234 |     await expect(page.getByTestId('answer-1-A')).not.toHaveClass(/before:bg-black/);
  235 | 
  236 |     await page.getByTestId('answer-1-A').click();
  237 |     await expect(page.getByTestId('answer-1-A')).toHaveClass(/before:bg-black/);
  238 |   });
  239 | });
  240 | 
  241 | test.describe('simulation leakage and responsive UI', () => {
  242 |   test('simulation mode does not render explanations before results', async ({ page }, testInfo) => {
  243 |     runOnly(testInfo, ['chromium-desktop']);
  244 |     await seedStorage(page, runningStorage({
  245 |       curve_examConfig: JSON.stringify({ ...baseConfig, quickFeedback: false })
  246 |     }));
  247 | 
  248 |     await page.getByTestId('answer-1-A').click();
  249 |     await expect(page.getByText(/Explanation/i)).toHaveCount(0);
  250 |   });
  251 | 
  252 |   test('header and answer sheet remain independently scrollable/fixed on desktop and iPad layouts', async ({ page }, testInfo) => {
  253 |     runOnly(testInfo, ['chromium-desktop', 'webkit-ipad-pro']);
  254 |     await seedStorage(page, runningStorage());
  255 | 
  256 |     const headerTop = await page.getByTestId('exam-header').evaluate(node => node.getBoundingClientRect().top);
  257 |     await page.getByTestId('paper-view').evaluate(node => {
  258 |       node.scrollTop = 600;
  259 |     });
  260 |     await expect(page.getByTestId('exam-header')).toBeVisible();
  261 |     await expect.poll(async () => page.getByTestId('exam-header').evaluate(node => node.getBoundingClientRect().top)).toBe(headerTop);
  262 | 
  263 |     const before = await page.getByTestId('answer-sheet').evaluate(node => node.scrollTop);
  264 |     await page.getByTestId('answer-sheet').evaluate(node => {
  265 |       node.scrollTop = 300;
```
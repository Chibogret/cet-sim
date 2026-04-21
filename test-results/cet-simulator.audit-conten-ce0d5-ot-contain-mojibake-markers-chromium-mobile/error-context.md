# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cet-simulator.audit.spec.ts >> content and localization >> rendered language content does not contain mojibake markers
- Location: tests\e2e\cet-simulator.audit.spec.ts:299:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.innerText: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('paper-view')

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
  266 |     });
  267 |     await expect.poll(async () => page.getByTestId('answer-sheet').evaluate(node => node.scrollTop)).toBeGreaterThanOrEqual(before);
  268 |   });
  269 | 
  270 |   test('iPad Pro answer bubbles meet 44px touch-target minimum', async ({ page }, testInfo) => {
  271 |     runOnly(testInfo, ['webkit-ipad-pro']);
  272 |     await seedStorage(page, runningStorage());
  273 | 
  274 |     const firstBubble = await page.getByTestId('answer-1-A').boundingBox();
  275 |     expect(firstBubble).not.toBeNull();
  276 |     expect(firstBubble!.width).toBeGreaterThanOrEqual(44);
  277 |     expect(firstBubble!.height).toBeGreaterThanOrEqual(44);
  278 |   });
  279 | 
  280 |   test('mobile portrait figures stay inside the viewport', async ({ page }, testInfo) => {
  281 |     runOnly(testInfo, ['chromium-mobile']);
  282 |     await seedStorage(page, runningStorage({
  283 |       curve_sectionIndex: '1'
  284 |     }));
  285 | 
  286 |     const image = page.locator('img[src^="/assets/figures/"]').first();
  287 |     await expect(image).toBeVisible();
  288 |     const viewport = page.viewportSize();
  289 |     const box = await image.boundingBox();
  290 | 
  291 |     expect(viewport).not.toBeNull();
  292 |     expect(box).not.toBeNull();
  293 |     expect(box!.x).toBeGreaterThanOrEqual(0);
  294 |     expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width);
  295 |   });
  296 | });
  297 | 
  298 | test.describe('content and localization', () => {
  299 |   test('rendered language content does not contain mojibake markers', async ({ page }) => {
  300 |     await seedStorage(page, runningStorage());
  301 | 
> 302 |     const text = await page.getByTestId('paper-view').innerText();
      |                                                       ^ Error: locator.innerText: Test timeout of 30000ms exceeded.
  303 |     expect(text).not.toMatch(/[�]|Ã|â/);
  304 |   });
  305 | 
  306 |   test('all referenced figure assets load with nonzero natural dimensions', async ({ page }) => {
  307 |     await page.goto('/');
  308 | 
  309 |     const imageStats = await page.evaluate(async sources => {
  310 |       return Promise.all(sources.map(source => new Promise<{ src: string; naturalWidth: number; naturalHeight: number }>(resolve => {
  311 |         const image = new Image();
  312 |         image.onload = () => resolve({ src: source, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight });
  313 |         image.onerror = () => resolve({ src: source, naturalWidth: 0, naturalHeight: 0 });
  314 |         image.src = source;
  315 |       })));
  316 |     }, figureSources);
  317 | 
  318 |     expect(imageStats.length).toBeGreaterThan(0);
  319 |     imageStats.forEach(image => {
  320 |       expect(image.naturalWidth, `${image.src} width`).toBeGreaterThan(0);
  321 |       expect(image.naturalHeight, `${image.src} height`).toBeGreaterThan(0);
  322 |     });
  323 |   });
  324 | });
  325 | 
```
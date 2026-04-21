import { expect, test, type Page } from '@playwright/test';
import { questionsBank } from '../../src/data/questions_bank';

const figureSources = Array.from(new Set(questionsBank.flatMap(question => question.figure ? [question.figure] : [])));

const baseConfig = {
  customTimeLimit: null,
  subjectLimits: {
    'Language Proficiency': null,
    Science: null,
    Mathematics: null,
    'Reading Comprehension': null
  },
  rightMinusWrong: false,
  quickFeedback: false
};

const temporaryKeys = [
  'curve_examState',
  'curve_sectionIndex',
  'curve_endTime',
  'curve_answers',
  'curve_crossouts',
  'curve_changes',
  'curve_telemetry'
];

function runOnly(testInfo: { project: { name: string } }, projectNames: string[]) {
  test.skip(!projectNames.includes(testInfo.project.name), `Runs only in ${projectNames.join(', ')}`);
}

async function seedStorage(page: Page, storage: Record<string, string>) {
  await page.addInitScript(values => {
    if (sessionStorage.getItem('__cet_qa_seeded') === '1') return;
    localStorage.clear();
    Object.entries(values).forEach(([key, value]) => localStorage.setItem(key, value));
    sessionStorage.setItem('__cet_qa_seeded', '1');
  }, storage);
  await page.goto('/');
}

function runningStorage(overrides: Record<string, string> = {}) {
  return {
    curve_examState: 'running',
    curve_sectionIndex: '0',
    curve_fatigueLevel: '0',
    curve_examConfig: JSON.stringify(baseConfig),
    curve_endTime: String(Date.now() + 60 * 60 * 1000),
    curve_changes: '3',
    curve_answers: '{}',
    curve_crossouts: '{}',
    curve_telemetry: '[]',
    ...overrides
  };
}

async function finishExamWithAnswers(
  page: Page,
  answers: Record<string, string>,
  rightMinusWrong: boolean
) {
  const scoringConfig = {
    ...baseConfig,
    rightMinusWrong
  };

  await seedStorage(page, {
    ...runningStorage({
      curve_examState: 'finished',
      curve_endTime: '',
      curve_examConfig: JSON.stringify(scoringConfig),
      curve_answers: JSON.stringify(answers)
    })
  });
}

function answersWithWrongCount(wrongCount: number) {
  const sample = questionsBank.slice(0, 8);
  const answers: Record<string, string> = {};

  sample.slice(0, 5).forEach(question => {
    answers[question.id] = question.correctAnswer;
  });

  sample.slice(0, wrongCount).forEach(question => {
    answers[question.id] = question.options.find(option => option !== question.correctAnswer) ?? '__wrong__';
  });

  return answers;
}

test.describe('exam state and navigation reliability', () => {
  test('timer resumes from stored end time after refresh', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await seedStorage(page, runningStorage({
      curve_endTime: String(Date.now() + (49 * 60 + 17) * 1000)
    }));

    await expect(page.getByText(/49:1[0-7]/)).toBeVisible();
    await expect(page.getByText('60:00')).toHaveCount(0);
  });

  test('expired timer enters section-end state', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await seedStorage(page, runningStorage({
      curve_endTime: String(Date.now() - 1000)
    }));

    await expect(page.getByText(/Time is Up \/ Section Ended/i)).toBeVisible();
  });

  test('next section requires confirmation and browser Back does not unlock prior section', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await seedStorage(page, runningStorage());

    page.once('dialog', dialog => dialog.dismiss());
    await page.getByRole('button', { name: 'Next Section' }).click();
    await expect(page.getByRole('heading', { name: /Language Proficiency/i })).toBeVisible();

    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Next Section' }).click();
    await expect(page.getByRole('heading', { name: /Science/i })).toBeVisible();

    await page.goBack().catch(() => null);
    await expect(page.getByRole('heading', { name: /Science/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Language Proficiency/i })).toHaveCount(0);
  });

  test('abort clears all temporary exam state and returns to start', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await seedStorage(page, runningStorage({
      curve_answers: JSON.stringify({ [questionsBank[0].id]: questionsBank[0].correctAnswer }),
      curve_crossouts: JSON.stringify({ [questionsBank[0].id]: questionsBank[0].options[1] }),
      curve_changes: '0',
      curve_telemetry: JSON.stringify([{ timestamp: Date.now(), type: 'SELECT_OPTION' }])
    }));

    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Abort' }).click();

    await expect(page.getByRole('button', { name: 'Begin Simulation' })).toBeVisible();
    const remaining = await page.evaluate(keys => {
      return Object.fromEntries(keys.map(key => [key, localStorage.getItem(key)]));
    }, temporaryKeys);

    expect(remaining).toEqual(Object.fromEntries(temporaryKeys.map(key => [key, null])));
    await expect(page.getByText(/Performance Summary Sheet/i)).toHaveCount(0);
  });
});

test.describe('scoring reliability', () => {
  test('right-minus-wrong off shows raw correct over total', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await finishExamWithAnswers(page, answersWithWrongCount(2), false);

    await expect(page.getByText(/Raw Correct/i)).toBeVisible();
    await expect(page.getByText(`3 / ${questionsBank.length}`)).toBeVisible();
    await expect(page.getByText(/^3$/)).toBeVisible();
  });

  test('right-minus-wrong on uses exact 0.25 penalties', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await finishExamWithAnswers(page, answersWithWrongCount(3), true);

    await expect(page.getByText(/Wrong Deduction/i)).toBeVisible();
    await expect(page.getByText('-0.75')).toBeVisible();
    await expect(page.getByText(/^1\.25$/)).toBeVisible();
  });
});

test.describe('answer sheet synchronization and change limits', () => {
  test('quick feedback keeps the answer sheet tight without horizontal overflow', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await seedStorage(page, runningStorage({
      curve_examConfig: JSON.stringify({ ...baseConfig, quickFeedback: true })
    }));

    await page.getByTestId('answer-1-A').click();

    const sheetOverflow = await page.getByTestId('answer-sheet').evaluate(node => ({
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth
    }));
    const documentOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

    expect(sheetOverflow.scrollWidth).toBeLessThanOrEqual(sheetOverflow.clientWidth);
    expect(documentOverflow).toBeLessThanOrEqual(1);
  });

  test('quick feedback colors paper view choices after answering', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    const firstQuestion = questionsBank[0];
    const wrongOptionIndex = firstQuestion.options.findIndex(option => option !== firstQuestion.correctAnswer);
    const correctOptionIndex = firstQuestion.options.findIndex(option => option === firstQuestion.correctAnswer);
    const wrongLetter = String.fromCharCode(65 + wrongOptionIndex);
    const correctLetter = String.fromCharCode(65 + correctOptionIndex);

    await seedStorage(page, runningStorage({
      curve_examConfig: JSON.stringify({ ...baseConfig, quickFeedback: true })
    }));

    await page.getByTestId(`answer-1-${wrongLetter}`).click();

    await expect(page.getByTestId(`paper-choice-1-${wrongLetter}`)).toHaveClass(/bg-red-50/);
    await expect(page.getByTestId(`paper-choice-1-${correctLetter}`)).toHaveClass(/bg-green-50/);
  });

  test('answer sheet selection persists across refresh and blocks a fourth change', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await seedStorage(page, runningStorage());

    await page.getByTestId('answer-1-A').click();
    await expect(page.getByTestId('answer-1-A')).toHaveClass(/bg-black/);

    await page.reload();
    await expect(page.getByTestId('answer-1-A')).toHaveClass(/bg-black/);

    await page.getByTestId('answer-1-B').click();
    await page.getByTestId('answer-2-A').click();
    await page.getByTestId('answer-2-B').click();
    await page.getByTestId('answer-3-A').click();
    await page.getByTestId('answer-3-B').click();
    await expect(page.getByText(/Max 0 changes remaining/i)).toBeVisible();

    await page.getByTestId('answer-4-A').click();
    await expect(page.getByTestId('answer-4-B')).toBeDisabled();
  });

  test('main question feed is read-only and answer sheet remains the only input surface', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await seedStorage(page, runningStorage());

    await page.getByTestId('question-1').getByText(/^A\.$/).click();
    await expect(page.getByTestId('answer-1-A')).not.toHaveClass(/before:bg-black/);

    await page.getByTestId('answer-1-A').click();
    await expect(page.getByTestId('answer-1-A')).toHaveClass(/before:bg-black/);
  });
});

test.describe('simulation leakage and responsive UI', () => {
  test('simulation mode does not render explanations before results', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop']);
    await seedStorage(page, runningStorage({
      curve_examConfig: JSON.stringify({ ...baseConfig, quickFeedback: false })
    }));

    await page.getByTestId('answer-1-A').click();
    await expect(page.getByText(/Explanation/i)).toHaveCount(0);
  });

  test('header and answer sheet remain independently scrollable/fixed on desktop and iPad layouts', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-desktop', 'webkit-ipad-pro']);
    await seedStorage(page, runningStorage());

    const headerTop = await page.getByTestId('exam-header').evaluate(node => node.getBoundingClientRect().top);
    await page.getByTestId('paper-view').evaluate(node => {
      node.scrollTop = 600;
    });
    await expect(page.getByTestId('exam-header')).toBeVisible();
    await expect.poll(async () => page.getByTestId('exam-header').evaluate(node => node.getBoundingClientRect().top)).toBe(headerTop);

    const before = await page.getByTestId('answer-sheet').evaluate(node => node.scrollTop);
    await page.getByTestId('answer-sheet').evaluate(node => {
      node.scrollTop = 300;
    });
    await expect.poll(async () => page.getByTestId('answer-sheet').evaluate(node => node.scrollTop)).toBeGreaterThanOrEqual(before);
  });

  test('iPad Pro answer bubbles meet 44px touch-target minimum', async ({ page }, testInfo) => {
    runOnly(testInfo, ['webkit-ipad-pro']);
    await seedStorage(page, runningStorage());

    const firstBubble = await page.getByTestId('answer-1-A').boundingBox();
    expect(firstBubble).not.toBeNull();
    expect(firstBubble!.width).toBeGreaterThanOrEqual(44);
    expect(firstBubble!.height).toBeGreaterThanOrEqual(44);
  });

  test('mobile portrait figures stay inside the viewport', async ({ page }, testInfo) => {
    runOnly(testInfo, ['chromium-mobile']);
    await seedStorage(page, runningStorage({
      curve_sectionIndex: '1'
    }));

    const image = page.locator('img[src^="/assets/figures/"]').first();
    await expect(image).toBeVisible();
    const viewport = page.viewportSize();
    const box = await image.boundingBox();

    expect(viewport).not.toBeNull();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width);
  });
});

test.describe('content and localization', () => {
  test('rendered language content does not contain mojibake markers', async ({ page }) => {
    await seedStorage(page, runningStorage());

    const text = await page.getByTestId('paper-view').innerText();
    expect(text).not.toMatch(/[�]|Ã|â/);
  });

  test('all referenced figure assets load with nonzero natural dimensions', async ({ page }) => {
    await page.goto('/');

    const imageStats = await page.evaluate(async sources => {
      return Promise.all(sources.map(source => new Promise<{ src: string; naturalWidth: number; naturalHeight: number }>(resolve => {
        const image = new Image();
        image.onload = () => resolve({ src: source, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight });
        image.onerror = () => resolve({ src: source, naturalWidth: 0, naturalHeight: 0 });
        image.src = source;
      })));
    }, figureSources);

    expect(imageStats.length).toBeGreaterThan(0);
    imageStats.forEach(image => {
      expect(image.naturalWidth, `${image.src} width`).toBeGreaterThan(0);
      expect(image.naturalHeight, `${image.src} height`).toBeGreaterThan(0);
    });
  });
});

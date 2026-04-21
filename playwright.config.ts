import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  fullyParallel: false,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'webkit-ipad-pro',
      use: {
        ...devices['iPad Pro 11'],
        viewport: { width: 1024, height: 1366 }
      }
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 7'] }
    },
    {
      name: 'firefox-desktop',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
});

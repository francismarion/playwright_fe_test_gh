import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [
  ['line'],
  ['allure-playwright', { 
    outputFolder: process.env.ALLURE_RESULTS_DIR || 'allure-results' 
  }]
],
  testDir: './tests',
  timeout: 90000,
  expect: {
    timeout: 1000
  },
  retries: 0,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: process.env.CI === 'true' || process.env.PLAYWRIGHT_HEADLESS === 'true',
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        launchOptions: {
          slowMo: 300,
        },
      },
    },
  ],
});

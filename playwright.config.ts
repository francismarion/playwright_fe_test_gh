import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter : [
    ['list'],
    ['allure-playwright']
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
        headless: process.env.CI ? true : false, // run headed
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        launchOptions: {
          slowMo: 300, // ✅ put inside use
        },
      },
    },
  ],
});

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false, // run headed
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com/',
        launchOptions: {
          slowMo: 300, // ✅ put inside use
        },
      },
    },
  ],
});

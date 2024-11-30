import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalTimeout: 60 * 1000,
  timeout: 20 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  testDir: './src/',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'line' : 'list',
  /* Stop after first fail */
  maxFailures: undefined, // process.env.CI ? 1 : undefined,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Timeout of any action */
    actionTimeout: 10000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api-setup',
      testMatch: /\.apisetup\.ts/,
    },

    {
      name: 'web-client',
      testMatch: ['**/web-client/**'],
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled',
            '--exclude-switches=enable-automation',
            '--disable-gpu',
          ],
        },
      },
    },

    {
      name: 'api',
      testMatch: ['**/api/v1/**'],
      use: {
        extraHTTPHeaders: {
          token: `${process.env.TESTS_BEARER}`,
        },
      },
      dependencies: ['api-setup'],
    },
  ],
});

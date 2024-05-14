import { defineConfig, devices } from '@playwright/test';

// Check preview script in package.json file for correct port number
const port = 4322;
const baseURL = `http://127.0.0.1:${port}`
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './screenshots',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Don't do snapshot checks if you're in a CI */
  ignoreSnapshots: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  snapshotPathTemplate: 'screenshots/{arg}-{projectName}{ext}',
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    colorScheme: 'dark'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'desktop-light',
      use: {
        ...devices['Desktop Firefox'],
        colorScheme: 'light'
      },
    },
    {
      name: 'tablet',
      use: { ...devices['Nexus 10'] },
    },
    {
      name: 'tablet-light',
      use: {
        ...devices['Nexus 10'],
        colorScheme: 'light'
      },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-light',
      use: {
        ...devices['Pixel 5'],
        colorScheme: 'light'
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: `pnpm build && pnpm preview`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});

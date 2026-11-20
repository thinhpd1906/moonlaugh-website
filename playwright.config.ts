import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests: a real browser clicks through the built site.
 * - Locally: `npm run test:e2e` (first time: `npx playwright install chromium`).
 * - To use an installed Google Chrome instead: `PW_CHANNEL=chrome npm run test:e2e`.
 * The contact form never reaches Web3Forms in tests: the request is intercepted.
 */
const PORT = 4321;
const channel = process.env.PW_CHANNEL || undefined;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel } },
  ],
  webServer: {
    // --ignore-lock: never attach to (or be blocked by) a preview server started elsewhere.
    command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${PORT} --ignore-lock`,
    url: `http://127.0.0.1:${PORT}/en/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      // A fake key so the form is "connected"; requests are mocked in tests.
      PUBLIC_WEB3FORMS_KEY: process.env.PUBLIC_WEB3FORMS_KEY || 'e2e-test-key',
    },
  },
});

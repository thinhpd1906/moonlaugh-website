import { defineConfig } from 'vitest/config';

// Unit tests only. Browser (end-to-end) tests live in tests/e2e and run with Playwright.
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});

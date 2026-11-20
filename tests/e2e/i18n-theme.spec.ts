/** Features: docs/features/i18n-and-routing.md, docs/features/theme.md */
import { expect, test } from '@playwright/test';

test.describe('language switch', () => {
  test('keeps the visitor on the same page', async ({ page }) => {
    await page.goto('/en/team/bryan/');
    await page.locator('[data-lang-switch="vi"]').click();
    await expect(page).toHaveURL('/vi/team/bryan/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
    await expect(page.locator('h1')).toContainText('Phan Đức Thịnh');
    await expect(page.locator('[data-nav="team"]')).toHaveText('Đội ngũ');
  });

  test('is remembered for the root URL', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('[data-lang-switch="vi"]').click();
    await expect(page).toHaveURL('/vi/');
    await page.goto('/');
    await expect(page).toHaveURL('/vi/');
  });

  test('publishes hreflang alternates', async ({ page }) => {
    await page.goto('/en/services/');
    await expect(page.locator('link[rel="alternate"][hreflang="vi"]')).toHaveAttribute('href', /\/vi\/services\/$/);
  });
});

test.describe('theme switch', () => {
  test('toggles and survives a reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/en/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await page.locator('#theme-toggle').click();
    await expect(html).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'light');
    await page.locator('#theme-toggle').click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('follows the device setting on the first visit', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/en/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('labels the button with what it will do', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/en/');
    await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-label', 'Switch to light theme');
  });
});

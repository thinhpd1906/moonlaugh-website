/** Feature: docs/features/navigation.md */
import { expect, test } from '@playwright/test';

const tabs = [
  { key: 'home', path: '/en/' },
  { key: 'services', path: '/en/services/' },
  { key: 'process', path: '/en/how-we-work/' },
  { key: 'team', path: '/en/team/' },
  { key: 'contact', path: '/en/contact/' },
];

test.describe('main navigation', () => {
  for (const tab of tabs) {
    test(`"${tab.key}" tab opens ${tab.path} and is marked active`, async ({ page }) => {
      await page.goto('/en/services/');
      await page.locator(`[data-nav="${tab.key}"]`).click();
      await expect(page).toHaveURL(tab.path);
      await expect(page.locator(`[data-nav="${tab.key}"]`)).toHaveAttribute('aria-current', 'page');
      await expect(page.locator('[aria-current="page"][data-nav]')).toHaveCount(1);
    });
  }

  test('logo returns to the home page', async ({ page }) => {
    await page.goto('/en/contact/');
    await page.getByRole('link', { name: 'Moonlaugh' }).first().click();
    await expect(page).toHaveURL('/en/');
  });

  test('every page has one h1 and a title', async ({ page }) => {
    for (const tab of tabs) {
      await page.goto(tab.path);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/Moonlaugh/);
    }
  });

  test('call-to-action band leads to Contact, and is not shown on Contact', async ({ page }) => {
    await page.goto('/en/services/');
    await page.locator('[data-cta="band"]').click();
    await expect(page).toHaveURL('/en/contact/');
    await expect(page.locator('[data-cta="band"]')).toHaveCount(0);
  });

  test('home service rows link to the matching block on Services', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('[data-service="data"]').click();
    await expect(page).toHaveURL('/en/services/#data');
    await expect(page.locator('#data')).toBeVisible();
  });

  test('unknown pages show the 404 page', async ({ page }) => {
    const res = await page.goto('/en/does-not-exist/');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('does not exist');
  });
});

test.describe('root redirect', () => {
  test('sends English browsers to /en/', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL('/en/');
    await context.close();
  });

  test('sends Vietnamese browsers to /vi/', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'vi-VN' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL('/vi/');
    await context.close();
  });
});

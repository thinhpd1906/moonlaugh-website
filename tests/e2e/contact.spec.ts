/**
 * Contact form, end to end. Web3Forms is never called: page.route() intercepts the request.
 * Feature: docs/features/contact-form.md
 */
import { expect, test, type Page } from '@playwright/test';

const ENDPOINT = 'https://api.web3forms.com/submit';

async function fill(page: Page) {
  await page.locator('#f-name').fill('Lan Nguyen');
  await page.locator('#f-email').fill('lan@example.com');
  await page.locator('#f-type').selectOption({ index: 1 });
  await page.locator('#f-msg').fill('We need an Android TV app for our IPTV service.');
}

test.describe('contact form', () => {
  test('shows an error for each invalid field and sends nothing', async ({ page }) => {
    let called = false;
    await page.route(ENDPOINT, (route) => {
      called = true;
      return route.fulfill({ json: { success: true } });
    });
    await page.goto('/en/contact/');
    await page.locator('#f-email').fill('not-an-email');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.locator('[data-error="name"]')).toBeVisible();
    await expect(page.locator('[data-error="email"]')).toBeVisible();
    await expect(page.locator('[data-error="message"]')).toBeVisible();
    await expect(page.locator('#f-name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#f-name')).toBeFocused();
    expect(called).toBe(false);
  });

  test('sends the right data and shows the thank-you state', async ({ page }) => {
    let body: Record<string, unknown> = {};
    await page.route(ENDPOINT, async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ json: { success: true } });
    });
    await page.goto('/en/contact/');
    await fill(page);
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.locator('#form-done')).toBeVisible();
    await expect(page.locator('#contact-form')).toBeHidden();
    expect(body).toMatchObject({
      access_key: 'e2e-test-key',
      name: 'Lan Nguyen',
      email: 'lan@example.com',
      project_type: 'Web / fullstack',
      language: 'EN',
      botcheck: false,
    });

    await page.locator('#form-again').click();
    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(page.locator('#f-name')).toHaveValue('');
  });

  test('explains what to do when sending fails', async ({ page }) => {
    await page.route(ENDPOINT, (route) => route.fulfill({ status: 500, json: { success: false } }));
    await page.goto('/vi/contact/');
    await fill(page);
    await page.getByRole('button', { name: 'Gửi tin nhắn' }).click();
    await expect(page.locator('#form-status')).toContainText('Zalo 0395 811 906');
    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Gửi tin nhắn' })).toBeEnabled();
  });

  test('lists every direct channel with a working link', async ({ page }) => {
    await page.goto('/en/contact/');
    const expected: Record<string, string> = {
      email: 'mailto:phanthinhpdt@gmail.com',
      phone: 'tel:+84395811906',
      zalo: 'https://zalo.me/0395811906',
      whatsapp: 'https://wa.me/84395811906',
      messenger: 'https://m.me/moonlaughFlatmeta',
      community: 'https://www.facebook.com/groups/xuatkhaulaodongmoonlaugh',
    };
    for (const [id, href] of Object.entries(expected)) {
      await expect(page.locator(`[data-channel="${id}"]`)).toHaveAttribute('href', href);
    }
  });

  test('FAQ links to the community group', async ({ page }) => {
    await page.goto('/en/contact/');
    await expect(page.locator('[data-faq-community]')).toHaveAttribute('href', /facebook\.com\/groups\//);
  });
});

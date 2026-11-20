/** Features: docs/features/chat-widget.md, docs/features/team-profiles.md */
import { expect, test } from '@playwright/test';

test.describe('chat widget', () => {
  test('opens, lists every app with the right link, and closes', async ({ page }) => {
    await page.goto('/en/services/');
    const toggle = page.locator('#chat-toggle');
    const panel = page.locator('#chat-panel');
    await expect(panel).toBeHidden();
    await toggle.click();
    await expect(panel).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(panel.locator('[data-chat-app="zalo"]')).toHaveAttribute('href', 'https://zalo.me/0395811906');
    await expect(panel.locator('[data-chat-app="messenger"]')).toHaveAttribute('href', 'https://m.me/moonlaughFlatmeta');
    await expect(panel.locator('[data-chat-app="whatsapp"]')).toHaveAttribute('href', 'https://wa.me/84395811906');
    await expect(panel.locator('[data-chat-app="email"]')).toHaveAttribute('href', 'mailto:phanthinhpdt@gmail.com');
    await toggle.click();
    await expect(panel).toBeHidden();
  });

  test('closes with Escape', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('#chat-toggle').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('#chat-panel')).toBeHidden();
  });

  test('opens from the hero "Message us" button', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('[data-open-chat]').click();
    await expect(page.locator('#chat-panel')).toBeVisible();
  });
});

test.describe('team profiles', () => {
  test('a team card opens the profile, and back returns to the team', async ({ page }) => {
    await page.goto('/en/team/');
    await page.locator('[data-member="bryan"]').click();
    await expect(page).toHaveURL('/en/team/bryan/');
    await expect(page.locator('h1')).toContainText('Bryan');
    await expect(page.locator('[data-nav="team"]')).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('[data-profile-link="linkedin"]')).toHaveAttribute('href', 'https://www.linkedin.com/in/phanducthinh');
    await page.getByRole('link', { name: 'Back to team' }).click();
    await expect(page).toHaveURL('/en/team/');
  });

  test('draft members are not published', async ({ page }) => {
    const res = await page.goto('/en/team/fullstack-engineer/');
    expect(res?.status()).toBe(404);
  });
});

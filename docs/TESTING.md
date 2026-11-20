# Testing

Two layers, both run in CI on every push (`.github/workflows/ci.yml`).

| Layer | Tool | Location | Speed | Covers |
|---|---|---|---|---|
| Unit | Vitest | `tests/unit/` | ~1 s | Pure logic and data: translations, URL helpers, form validation/payload/submit, config consistency, team data |
| End-to-end | Playwright | `tests/e2e/` | ~40 s | The built site in a real browser, desktop and phone: navigation, language, theme, chat, team profiles, contact form |

Plus `npm run check` (TypeScript/Astro type check). Because `vi.ts` is typed as `Dict`,
a missing Vietnamese key is a type error even before tests run.

## Running

```bash
npm run test:unit                 # unit only
npm run test:e2e                  # builds, serves on :4321, runs Playwright
PW_CHANNEL=chrome npm run test:e2e   # use installed Chrome instead of Playwright's Chromium
npx playwright test --ui          # interactive runner, good for debugging
npm run verify                    # what CI runs
```

## What each suite protects

| File | Feature doc | Guards |
|---|---|---|
| `unit/i18n.test.ts` | i18n-and-routing | EN/VI same keys and list lengths, no empty strings, no placeholders, service keys |
| `unit/paths.test.ts` | i18n-and-routing | URL building, language switching, active tab |
| `unit/contact.test.ts` | contact-form | Email check, validation, Web3Forms payload, success/rejected/network/no-key |
| `unit/site-config.test.ts` | contact-channels | https links, no tracking params, phone numbers consistent everywhere |
| `unit/team.test.ts` | team-profiles | Slugs, complete copy in both languages, drafts never published |
| `e2e/navigation.spec.ts` | navigation | Tabs, active state, logo, one h1 per page, CTA band, service anchors, 404, root redirect |
| `e2e/i18n-theme.spec.ts` | i18n, theme | Language switch keeps page and is remembered, hreflang, theme toggle persists, follows device |
| `e2e/chat-team.spec.ts` | chat-widget, team-profiles | Chat open/close/Escape/links, hero button, profile navigation, drafts 404 |
| `e2e/contact.spec.ts` | contact-form, contact-channels | Field errors, correct payload, thank-you state, failure message, channel links |

## Rules

- The contact form **never** calls Web3Forms in tests: e2e uses `page.route()` to intercept,
  unit tests inject a fake `fetch`. The build uses the fake key `e2e-test-key`.
- New behaviour visible to visitors → e2e test. New logic or data rules → unit test.
- Prefer `data-*` hooks or accessible roles/names in selectors, not CSS classes.
- A flaky test is a bug: fix it, don't retry it away.

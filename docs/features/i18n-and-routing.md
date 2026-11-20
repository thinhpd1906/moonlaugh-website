# Feature: Languages (EN/VI) and URLs

**Status:** Live · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
Every page exists in English and Vietnamese at its own URL, so each language can be shared and indexed.

## Behaviour
- URLs: `/en/...` and `/vi/...`, same path after the language (`/en/team/bryan/` ↔ `/vi/team/bryan/`).
- The EN/VI switch keeps the visitor on the same page and remembers the choice (`localStorage['ml-lang']`).
- `/` redirects: saved choice → else Vietnamese if the browser language starts with `vi` → else English. Without JavaScript: English.
- Each page sets `<html lang>`, a canonical URL and `hreflang` alternates for both languages (+ `x-default` = English).
- Phone numbers are shown in local format in Vietnamese and international format in English.

## Where the code is
| File | Role |
|---|---|
| `src/lib/paths.ts` | `LOCALES`, `ROUTES`, `localePath`, `switchLocalePath`, `localeFromPath`, `localeStaticPaths` |
| `src/i18n/en.ts` | English copy and the `Dict` type |
| `src/i18n/vi.ts` | Vietnamese copy (typed as `Dict`) |
| `src/i18n/index.ts` | `useT(lang)` |
| `src/pages/index.astro` | Root redirect |
| `src/layouts/BaseLayout.astro` | `lang`, canonical, hreflang |

## Content and configuration
- Change wording: edit the same key in both files.
- Add a language: add it to `LOCALES`, create `src/i18n/<code>.ts` typed as `Dict`, register it in `src/i18n/index.ts`, extend the root redirect. Tests then require complete copy.

## Tests
| Test | What it checks |
|---|---|
| `tests/unit/i18n.test.ts` | Same keys and list lengths, no empty strings or placeholders |
| `tests/unit/paths.test.ts` | URL helpers |
| `tests/e2e/i18n-theme.spec.ts` | Switch keeps the page, is remembered, hreflang present |
| `tests/e2e/navigation.spec.ts` | Root redirect for English and Vietnamese browsers |

## Known limits / next steps
- URL segments are English in both languages (`/vi/services/`). Translating slugs would need a route map; not worth it now.

## History
- 1.0.0: created.

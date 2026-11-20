# Feature: Services page

**Status:** Live · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
Describes each service and what the client receives, so visitors can recognise their need.

## Behaviour
- Seven blocks: Mobile apps, Web & fullstack, AI & machine learning, Data science & analytics, TV & video streaming, Business analysis, Maintenance & support.
- Each block: title, description, technologies, and a "What you get" checklist.
- Each block has an anchor id equal to its `key` (`#mobile`, `#web`, `#ai`, `#data`, `#tv`, `#ba`, `#support`), used by the Home page rows.

## Where the code is
| File | Role |
|---|---|
| `src/pages/[lang]/services.astro` | Page |

## Content and configuration
`services.items[]` in both dictionaries. To add a service: add an item with a new unique `key` to **both** files in the same position; the Home list, Services page and tests pick it up. Also add it to `contact.form.types` if clients should be able to pick it.

## Tests
| Test | What it checks |
|---|---|
| `tests/unit/i18n.test.ts` | Same service keys in both languages, unique keys |
| `tests/e2e/navigation.spec.ts` | Home row → `#data` block visible |

## Known limits / next steps
- No prices shown on purpose (quotes are per project).

## History
- 1.0.0: created (7 services, Data science split from AI in design v1.1).

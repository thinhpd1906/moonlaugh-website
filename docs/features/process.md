# Feature: How we work (process)

**Status:** Live · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
Shows clients exactly what happens after they get in touch, which builds trust with first-time clients.

## Behaviour
- Six numbered steps: Discover → Plan & quote → Build → Testing → Security review (OWASP Top 10) → Launch & support.
- Each step: what happens and what the client receives.
- "Ways to work with us": fixed price per milestone, hourly, monthly support.
- The Home page shows the same six steps in short form.

## Where the code is
| File | Role |
|---|---|
| `src/pages/[lang]/how-we-work.astro` | Page |
| `src/pages/[lang]/index.astro` | Short version on Home |

## Content and configuration
`process.steps[]`, `process.models[]` in both dictionaries. Numbers are generated from the order.

## Tests
| Test | What it checks |
|---|---|
| `tests/unit/i18n.test.ts` | Same number of steps and models in both languages |
| `tests/e2e/navigation.spec.ts` | Page reachable, one h1 |

## Known limits / next steps
- The page promises a test report and a security checklist per project: keep templates for both so the promise is kept.

## History
- 1.0.0: created; Testing and Security review steps added in design v1.1.

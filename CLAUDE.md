# CLAUDE.md: guide for AI coding agents

Read this file first in every session. It is the contract for working on this repo.
(Other agents: AGENTS.md points here.)

## What this project is

The company website of **Moonlaugh**, a small software studio in Hanoi (apps, web, AI,
data science, TV/streaming, business analysis). Bilingual **English / Vietnamese**,
**dark / light** theme, static site built with **Astro**, no UI framework, no backend.
Visitors are potential clients (foreign and Vietnamese); the goal of every page is
trust and a contact.

Product context: `PRODUCT.md`. Visual system: `DESIGN.md`. Structure: `docs/ARCHITECTURE.md`.

## Commands

| Task | Command |
|---|---|
| Install | `npm ci` |
| Dev server (http://localhost:4321) | `npm run dev` |
| Type check | `npm run check` |
| Unit tests | `npm run test:unit` |
| End-to-end tests | `npm run test:e2e` (first time: `npx playwright install chromium`; or `PW_CHANNEL=chrome` to use installed Chrome) |
| Everything CI runs | `npm run verify` |
| Production build | `npm run build` → `dist/` |

## Where things live

| Need to change… | Edit |
|---|---|
| Any visible text | `src/i18n/en.ts` **and** `src/i18n/vi.ts` (same keys, same list lengths) |
| Phone, email, social links, form endpoint | `src/config/site.ts` |
| Team members | `src/data/team.ts` |
| Colours, fonts, spacing | `src/styles/global.css` (tokens) + `DESIGN.md` |
| A page | `src/pages/[lang]/…astro` |
| Shared UI | `src/components/` |
| URL rules | `src/lib/paths.ts` |
| Contact form logic | `src/lib/contact.ts` (UI: `src/components/ContactForm.astro`) |

## Rules (non-negotiable)

1. **Definition of done for any feature or change**:
   - code + tests (unit for logic in `src/lib` / data, e2e for user-visible behaviour),
   - the feature doc in `docs/features/` created or updated (copy `_TEMPLATE.md`),
   - an entry in `CHANGELOG.md` under `## [Unreleased]`,
   - `npm run verify` passes.
2. **Both languages, always.** Never add copy to one dictionary only. `tests/unit/i18n.test.ts` enforces parity.
3. **Both themes, always.** Use the CSS variables from `global.css`; never hard-code colours in components.
4. **All internal links go through `localePath()`** from `src/lib/paths.ts`. No hand-written `/en/...` strings in pages.
5. **Contact details only in `src/config/site.ts`.** Copy that shows numbers must match it (tested).
6. **No secrets in the repo.** `.env` is git-ignored. The Web3Forms key is public by design, still read from `PUBLIC_WEB3FORMS_KEY`.
7. **Accessibility:** one `<h1>` per page, labelled controls, visible focus, 44px touch targets, text contrast ≥ 4.5:1.
8. **Design rules** (from the Impeccable pass, see `DESIGN.md`): no small uppercase labels above headings, no rows of identical icon cards, no emoji or text glyphs as icons (use `Icon.astro`), no gradients on text.
9. **Never publish a team member** (`draft: false`) without their consent; never invent client names, numbers or testimonials.
10. Do not add dependencies without a reason written in a decision record (`docs/decisions/`).
11. Big or irreversible choices (framework, hosting, data storage) get a decision record before the code.

## Workflow for a change

1. Read the relevant `docs/features/*.md` and the code it points to.
2. Write or update the tests first when behaviour changes.
3. Make the change, in both languages and both themes.
4. Update the feature doc, `CHANGELOG.md` (Unreleased) and, if structure changed, `docs/ARCHITECTURE.md`.
5. Run `npm run verify`. Fix until green.
6. Commit with Conventional Commits: `feat: …`, `fix: …`, `docs: …`, `test: …`, `refactor: …`, `chore: …`.

Releases and versioning: `docs/WORKFLOW.md`.

## Known gaps / next steps

Tracked in `CHANGELOG.md` → Unreleased → Planned, and in each feature doc's "Known limits".

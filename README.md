# Moonlaugh website

Company website for **Moonlaugh**, a software studio in Hanoi: apps, web, AI, data
science, TV/streaming and business analysis. English and Vietnamese, dark and light theme.

Built with [Astro](https://astro.build) as a fully static site: plain HTML, CSS and a
little JavaScript. No server or database.

## Quick start

Requires Node.js 22 or newer.

```bash
npm ci                    # install
cp .env.example .env      # then paste your Web3Forms key into .env
npm run dev               # http://localhost:4321
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with live reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | TypeScript and Astro type check |
| `npm run test:unit` | Unit tests (Vitest), about 1 second |
| `npm run test:e2e` | Browser tests (Playwright), desktop and phone |
| `npm run verify` | Everything above, in the order CI runs it |

First time running browser tests: `npx playwright install chromium`
(or use your installed Chrome: `PW_CHANNEL=chrome npm run test:e2e`).

## Pages

| URL | Page |
|---|---|
| `/` | Sends visitors to `/en/` or `/vi/` (saved choice, else browser language) |
| `/en/`, `/vi/` | Home |
| `/{lang}/services/` | Services |
| `/{lang}/how-we-work/` | Process and ways to work together |
| `/{lang}/team/` | Team list |
| `/{lang}/team/{slug}/` | Team member profile |
| `/{lang}/contact/` | Contact channels, contact form, FAQ |

## Documentation

| File | For |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Rules and map for AI coding agents (and humans in a hurry) |
| [PRODUCT.md](PRODUCT.md) | Who the site is for and what it must achieve |
| [DESIGN.md](DESIGN.md) | Colours, type, spacing, components, design rules |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the code is organised |
| [docs/features/](docs/features/) | One document per feature |
| [docs/decisions/](docs/decisions/) | Why big technical choices were made |
| [docs/TESTING.md](docs/TESTING.md) | What is tested and how |
| [docs/WORKFLOW.md](docs/WORKFLOW.md) | How to make a change, version and release |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | How to put the site online |
| [CHANGELOG.md](CHANGELOG.md) | Every change, by version |

## Common edits

- **Change text:** edit `src/i18n/en.ts` and `src/i18n/vi.ts`.
- **Change phone, email or social links:** `src/config/site.ts`.
- **Add a team member:** `src/data/team.ts` (see `docs/features/team-profiles.md`).
- **Connect the contact form:** set `PUBLIC_WEB3FORMS_KEY` (see `docs/features/contact-form.md`).

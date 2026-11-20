# Feature: Navigation, footer and CTA band

**Status:** Live · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
Lets visitors move between the five main pages from anywhere, always showing where they are,
and ends every page (except Contact) with a call to start a project.

## Behaviour
- Header: logo (→ Home), tabs Home / Services / How we work / Team / Contact, theme switch, EN/VI switch, "Start a project" button.
- The current tab is underlined in the accent colour and has `aria-current="page"`. Team profile pages mark the Team tab.
- On phones (≤720px) the tabs stay on one line and scroll sideways.
- Footer: tagline, the four inner pages, Facebook / TikTok / Community links (open in a new tab), copyright.
- CTA band "Have a project in mind?" before the footer on every page except Contact.
- A "Skip to content" link appears on keyboard focus.
- Unknown URLs show a bilingual 404 page.

## Where the code is
| File | Role |
|---|---|
| `src/components/Header.astro` | Header, active tab, theme and language switch scripts |
| `src/components/Footer.astro` | Footer and social links |
| `src/components/CtaBand.astro` | Call-to-action band |
| `src/layouts/BaseLayout.astro` | Puts them together; `showCta` prop |
| `src/lib/paths.ts` | `ROUTES`, `localePath`, `activeRoute` |
| `src/pages/404.astro` | Not-found page |

## Content and configuration
Labels: `nav.*`, `footer.*`, `cta.*`, `common.*` in both dictionaries. Social URLs: `LINKS` in `src/config/site.ts`.

## Tests
| Test | What it checks |
|---|---|
| `tests/e2e/navigation.spec.ts` | Each tab URL and active state, logo, one h1 per page, CTA band, 404 |
| `tests/unit/paths.test.ts` | `activeRoute`, `localePath` |

## Known limits / next steps
- No dropdown menus; fine for five pages. If pages grow past ~6, design a mobile menu.

## History
- 1.0.0: created.

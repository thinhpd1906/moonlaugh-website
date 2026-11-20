# Feature: Team and profile pages

**Status:** Live · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
Shows the real people behind the studio; each person has a profile page with background, skills and links.

## Behaviour
- Team page and Home preview show a card per **published** member (photo or initial, name, role, short bio, "View profile").
- Profile page `/<lang>/team/<slug>/`: avatar, name, role, LinkedIn/GitHub (only those that exist, open in new tab), "Work with us" (→ Contact), About, Skills, Experience, "Back to team".
- Members with `draft: true` get no card and no page (their URL is a 404).

## Where the code is
| File | Role |
|---|---|
| `src/data/team.ts` | Member data, `publishedMembers()` |
| `src/pages/[lang]/team/index.astro` | Team list |
| `src/pages/[lang]/team/[slug].astro` | Profile page |
| `src/components/TeamCard.astro`, `Avatar.astro` | Card and avatar |

## Content and configuration
Add a person:
1. In `src/data/team.ts`, fill in a draft entry (or copy Bryan's): `slug`, `initial`, optional `photo`, `links`, and `copy.en` + `copy.vi` with the **same number** of skills and experience lines.
2. Optional photo: put a square image in `public/team/<slug>.jpg` and set `photo: '/team/<slug>.jpg'`.
3. Set `draft: false` **only with the person's consent**.
4. Run `npm run verify`, add a changelog line.

## Tests
| Test | What it checks |
|---|---|
| `tests/unit/team.test.ts` | Unique URL-safe slugs, complete copy in both languages, https links, drafts not published |
| `tests/e2e/chat-team.spec.ts` | Card → profile → back, LinkedIn link, draft URL is 404 |

## Known limits / next steps
- Bryan has no photo or GitHub yet.
- Experience lines start in 2022 while the copy says "5+ years" (accurate from Jan 2027, or add earlier experience).

## History
- 1.0.0: created; Bryan published, three draft slots (fullstack, AI/ML, BA).

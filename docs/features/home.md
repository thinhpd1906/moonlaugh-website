# Feature: Home page

**Status:** Live · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
Explains in one screen what Moonlaugh does and how to start, then gives a short tour of services, process, values and team.

## Behaviour
Sections, top to bottom:
1. **Hero**: headline, one-paragraph pitch, "Start a project" (→ Contact) and "Message us" (opens chat panel), a note with location / free consultation / languages, and the crescent-moon artwork with capability pills.
2. **Services**: editorial list of the 7 services; each row links to its block on the Services page (`/services/#<key>`); "Not sure what you need?" line → Contact.
3. **Process**: the 6 steps, numbered, 3 per row on desktop; link to How we work.
4. **Why Moonlaugh**: 4 short statements separated by rules.
5. **Team preview**: published member cards → profiles.
6. CTA band (shared).

## Where the code is
| File | Role |
|---|---|
| `src/pages/[lang]/index.astro` | Page and its styles |
| `src/components/TeamCard.astro`, `Avatar.astro` | Team cards |

## Content and configuration
`hero.*`, `services.*`, `process.*`, `why.*`, `team.*`, `more.*` in the dictionaries. Hero pill labels are in the page file (`chips`), same in both languages.

## Tests
| Test | What it checks |
|---|---|
| `tests/e2e/navigation.spec.ts` | Service row → Services anchor; one h1 |
| `tests/e2e/chat-team.spec.ts` | "Message us" opens the chat panel |

## Known limits / next steps
- Hero follows a common split layout (copy left, artwork right); a more distinctive hero is a possible v2 design task.
- No case studies yet: add a "Work" section once real projects can be shown.

## History
- 1.0.0: created from design v1.2.

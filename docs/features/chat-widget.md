# Feature: Floating chat button

**Status:** Live · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
A round button in the bottom-right corner of every page that opens quick links to message the studio.

## Behaviour
- Click the button: a small panel opens with Zalo, Messenger, WhatsApp and Email; the icon changes to ×.
- Closes with the button, the Escape key, or a click outside.
- Any element with `data-open-chat` opens it (used by the hero "Message us" button).
- Accessible: `aria-expanded`, `aria-controls`, label switches between "Open chat" and "Close chat".

## Where the code is
| File | Role |
|---|---|
| `src/components/ChatWidget.astro` | Markup, styles, script |
| `src/config/site.ts` | The links |

## Content and configuration
`chat.*` in both dictionaries; links from `LINKS`.

## Tests
| Test | What it checks |
|---|---|
| `tests/e2e/chat-team.spec.ts` | Open/close, all four links, Escape, hero button |

## Known limits / next steps
- `mailto:` and `tel:` links need an app on the visitor's device; on phones they work directly.
- Not a live chat. A live chat service could replace the panel later.

## History
- 1.0.0: created.

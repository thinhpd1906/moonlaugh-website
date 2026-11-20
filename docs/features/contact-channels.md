# Feature: Contact channels and community

**Status:** Live · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
Lets visitors reach the studio through the app they already use, and ask questions in the community group.

## Behaviour
- Contact page list: Email, Phone (tap to call), Zalo, WhatsApp, Messenger, Community (Facebook group). Web links open in a new tab.
- FAQ section (Contact page) points to the community group with "Join the community".
- Footer: Facebook page, TikTok, Community.
- Numbers display as `0395 811 906` in Vietnamese and `+84 395 811 906` in English.

## Where the code is
| File | Role |
|---|---|
| `src/config/site.ts` | `CONTACT` (numbers, email) and `LINKS` (all URLs), the only place to change them |
| `src/pages/[lang]/contact.astro` | Channel list and FAQ |
| `src/components/Footer.astro` | Social links |

## Content and configuration
Change a number or link in `src/config/site.ts`; if the displayed number changes, update `contact.phone/zalo/whatsapp` in both dictionaries (a test checks they match).

## Tests
| Test | What it checks |
|---|---|
| `tests/unit/site-config.test.ts` | https, no tracking parameters, numbers consistent across config and copy |
| `tests/e2e/contact.spec.ts` | Every channel's href, FAQ community link |

## Known limits / next steps
- The community group URL contains "xuatkhaulaodong" (labour export); rename the group's web address and update `LINKS.community`.
- Email is a personal Gmail; switch to `hello@<domain>` after buying the domain.

## History
- 1.0.0: created.

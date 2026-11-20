# Feature: Contact form

**Status:** Live, needs the real access key · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
Lets a visitor describe their project and send it straight to the studio's inbox, without a backend.

## Behaviour
- Fields: name, email, project type, budget (optional), project details.
- Validation on submit: name ≥ 2 characters, valid email, details 10–5000 characters. Each invalid field shows its own message, is marked `aria-invalid`, and the first one gets focus. Nothing is sent.
- While sending: button disabled, label "Sending…".
- Success: thank-you panel; "Send another message" brings the empty form back.
- Failure (network or rejected): message with Zalo number and email as a fallback; the form keeps what was typed.
- No access key configured: a clear "not connected yet" message with direct contacts; no request is made.
- Spam: hidden honeypot checkbox (`botcheck`); Web3Forms drops submissions where it is ticked.
- The email subject is "New project inquiry from the Moonlaugh website" (or the Vietnamese version) and includes language and page URL.

## Where the code is
| File | Role |
|---|---|
| `src/lib/contact.ts` | `validateContact`, `buildPayload`, `submitContact` (no DOM, unit-tested) |
| `src/components/ContactForm.astro` | Markup, styles, browser script |
| `src/config/site.ts` | `FORM.endpoint`, `FORM.accessKey` (from `PUBLIC_WEB3FORMS_KEY`) |

## Content and configuration
- Get a key at web3forms.com (sent to the email it should deliver to), then set `PUBLIC_WEB3FORMS_KEY` in `.env` locally and in the hosting settings. The key is not secret.
- Labels, options and messages: `contact.form.*` in both dictionaries.

## Tests
| Test | What it checks |
|---|---|
| `tests/unit/contact.test.ts` | Email rules, validation, payload shape, success / rejected / network / no-key |
| `tests/e2e/contact.spec.ts` | Field errors and focus, payload sent, thank-you and reset, Vietnamese failure message |

## Known limits / next steps
- No automatic reply email to the client (may require a paid Web3Forms plan).
- Submissions are only in email. Option: also log to a Google Sheet, or alert on Telegram.
- Consider Cloudflare Turnstile if spam gets through the honeypot.

## History
- 1.0.0: created (Web3Forms, see docs/decisions/0002-web3forms.md).

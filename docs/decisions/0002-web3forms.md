# 0002: Web3Forms for the contact form

**Date:** 2026-11-20 · **Status:** Accepted

## Context
The contact form must deliver messages without running a server.

## Decision
Post the form as JSON from the browser to `https://api.web3forms.com/submit` with a public
access key; Web3Forms emails the submission. Honeypot field `botcheck` for spam.

## Consequences
- + Free plan, set up in minutes, nothing to host.
- + The access key is designed to be public (it only maps to the destination email).
- − Messages live only in email; no dashboard on the free plan.
- − Depends on a third party; if it fails, visitors see a fallback with Zalo and email.
- The logic is isolated in `src/lib/contact.ts`, so switching provider (Formspree, own API) touches one file and its tests.

## Alternatives considered
- Formspree: a similar service; either would work. Web3Forms was chosen because the key needs no account dashboard.
- Google Apps Script → Sheets: free and keeps a log, but more setup and weaker spam handling.
- Own backend: unnecessary for current volume.

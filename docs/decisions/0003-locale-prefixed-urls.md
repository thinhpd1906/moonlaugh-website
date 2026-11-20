# 0003: Language prefix in every URL

**Date:** 2026-11-20 · **Status:** Accepted

## Context
The site serves English- and Vietnamese-speaking clients. Each language needs to be shareable
and indexable by search engines.

## Decision
Every page lives under `/en/` or `/vi/`; the rest of the path is identical in both languages.
`/` redirects to the saved or browser language. Pages are generated with a `[lang]` route
segment and `getStaticPaths`, without Astro's built-in i18n routing, to keep the rules in
one small file (`src/lib/paths.ts`) that is easy to test and to read.

## Consequences
- + Clear, linkable URLs per language; correct `hreflang` and `lang`.
- + Adding a third language is mechanical (see i18n feature doc).
- − Path segments stay English in Vietnamese URLs (`/vi/services/`).
- − `/` depends on JavaScript to pick a language (falls back to English without it).

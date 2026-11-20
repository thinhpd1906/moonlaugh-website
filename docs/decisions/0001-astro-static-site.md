# 0001: Astro static site, no UI framework

**Date:** 2026-11-20 · **Status:** Accepted

## Context
A bilingual marketing site for a small studio, maintained part-time by one engineer with AI agents.
Needs: fast, free to host, easy to change, nothing to patch or keep running.

## Decision
Astro with static output. Plain `.astro` components, CSS, and small vanilla TypeScript scripts.
No React/Vue, no CMS, no server.

## Consequences
- + Pages are plain HTML: fast, SEO-friendly, free hosting anywhere.
- + Very small dependency surface: fewer upgrades and security issues.
- + Easy for AI agents to read: one file per page/component, copy in two dictionaries.
- − Dynamic features (login, dashboards) would need a server or a separate app later.
- − Content edits need a code change (acceptable; a CMS can be added later if non-developers edit content).

## Alternatives considered
- Next.js: more power than needed, heavier, more to maintain.
- Website builders (Wix, WordPress): less control, monthly cost, hard for agents to work on.

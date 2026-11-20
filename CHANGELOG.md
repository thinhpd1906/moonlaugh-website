# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions: [Semantic Versioning](https://semver.org/).

- **MAJOR** (2.0.0): redesign, or URLs change in a way that breaks old links.
- **MINOR** (1.1.0): new page, feature or section.
- **PATCH** (1.0.1): fixes, copy edits, small style changes.

## [Unreleased]

### Planned
- Connect the real Web3Forms access key in the hosting settings.
- Change the community group URL slug (currently "xuatkhaulaodong…") to a studio-appropriate one.
- Add a real photo for Bryan and publish other team members once they agree.
- Buy the domain and update `site` in `astro.config.mjs` and `SITE.url` in `src/config/site.ts`.
- Sitemap and social share image.
- Automated accessibility checks (axe) in the e2e suite.

## [1.0.0] - 2026-11-20

First production version, built from design v1.2 (Impeccable pass).

### Added
- Bilingual site (English / Vietnamese) with language-prefixed URLs and a language switch that keeps the current page.
- Dark and light themes; follows the device setting on first visit, remembers the visitor's choice.
- Pages: Home, Services (7 services with deliverables), How we work (6 steps + engagement models), Team, Team member profile, Contact (channels, form, FAQ), 404.
- Contact form sending to email through Web3Forms, with validation, honeypot spam protection, sending / success / error states.
- Floating chat button with Zalo, Messenger, WhatsApp and email.
- Community link (Facebook group) on Contact, FAQ and footer.
- Unit tests (Vitest) and end-to-end tests (Playwright, desktop and phone).
- CI on GitHub Actions: type check, unit tests, build, end-to-end tests.
- Documentation for humans and AI agents: CLAUDE.md, architecture, feature docs, decision records, workflow.

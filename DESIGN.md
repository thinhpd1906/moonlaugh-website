# DESIGN.md

Visual system for the Moonlaugh website. Tokens live in `src/styles/global.css`;
keep this file and that file in sync.

## Concept

"Night sky, friendly moon." A deep navy ground with one warm moon-yellow accent.
The logo is a smiling crescent (the "laugh" in Moonlaugh) with a small star.

## Colour tokens

| Token | Dark | Light | Use |
|---|---|---|---|
| `--accent` | `#F5C451` | `#F5C451` | Primary buttons, logo, active underline, step rules |
| `--on-accent` | `#0B1020` | `#0B1020` | Text on accent |
| `--ink` | `#F5C451` | `#876C2D` | Accent used as **text or icon** (darker in light theme for contrast) |
| `--bg` | `#0B1020` | `#F7F8FC` | Page background |
| `--bg-2` | `#0E1428` | `#EEF1F8` | Alternate section band |
| `--surface` | `#131B33` | `#FFFFFF` | Cards, inputs' container, chat panel |
| `--line` | `#1E2745` | `#E2E6F0` | Hairlines between regions |
| `--border` | `#263052` | `#D5DAE8` | Card and input borders |
| `--border-2` | `#39446B` | `#B8C0D6` | Stronger borders (ghost buttons, CTA band) |
| `--text` | `#EEF1F8` | `#0B1020` | Main text |
| `--text-2` | `#A8B0C8` | `#4A5370` | Secondary text |
| `--muted` | `#8790AD` | `#5F6885` | Tags, notes, placeholders |
| `--body` | `#C9CFE0` | `#2A3150` | Long-form paragraphs (profile "About") |
| `--danger` | `#FF8A80` | `#C62828` | Form errors |

Rules: never hard-code colours in components; accent as text or icon must use `--ink`.

## Type

- Family: **Be Vietnam Pro** (Google Fonts), weights 400/500/600/700. Chosen for full Vietnamese diacritics.
- Display (h1 hero): clamp(40px, 5vw, 64px), weight 700, tracking -0.03em, line-height 1.08.
- Page h1: clamp(36px, 4.4vw, 56px). Section h2: clamp(30px, 3.4vw, 44px), tracking -0.02em.
- Body 16px / 1.6; lead 18–19px; small 14px; minimum 13px.
- Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`.

## Spacing and shape

- Container: max 1200px, 24px side padding.
- Section padding: 96px (64px on phones). Section head to content: 48px.
- Radii: 999px buttons/pills, 16–20px cards, 12px rows and inputs, 24px CTA band.
- Touch targets: at least 44px.

## Components

| Component | Notes |
|---|---|
| Primary button `.btn-primary` | Accent fill, dark text, brightens on hover, presses 1px |
| Ghost button `.btn-ghost` | Border `--border-2`, surface on hover |
| Text link `.text-link` | `--ink`, underline on hover, drawn arrow icon |
| Card `.card` (+ `.card-link`) | Surface + border; linked cards lift 2px and take an `--ink` border on hover |
| Service row | Editorial list row: title / description / tags + arrow; highlights on hover |
| Icons | `Icon.astro` only: 24px grid, round caps, stroke 1.7–2 |

## Design rules (from the Impeccable review, v1.2)

- No small uppercase "eyebrow" labels above headings.
- No rows of identical icon + heading + text cards as page structure (services are a list, "why" uses rules).
- Section numbers only where order matters (process steps).
- No emoji or text characters (→, ↗) as icons.
- No gradient text, no decorative glass/blur, no one-sided accent bars on boxes.
- Browser surfaces are themed: selection colour, caret, focus ring, scrollbar.
- Every interactive element has hover, focus and pressed states.

## Motion

Short (150–200ms) ease-out transitions on hover/press only. Everything respects
`prefers-reduced-motion`.

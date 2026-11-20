# Feature: Dark / light theme

**Status:** Live · **Since:** 1.0.0 · **Last changed:** 1.0.0

## Summary
Visitors can read the site in dark or light mode. Dark is the brand default.

## Behaviour
- First visit: follows the device setting (`prefers-color-scheme`); with no preference, dark.
- The sun/moon button in the header switches theme; the choice is saved in `localStorage['ml-theme']`.
- The theme is applied by an inline script in `<head>` before the page paints, so there is no flash.
- The button's accessible label says what it will do ("Switch to light theme").
- In light mode the accent used for text and icons is darker (`--ink: #876C2D`) for contrast; buttons keep the bright yellow.

## Where the code is
| File | Role |
|---|---|
| `src/styles/global.css` | Tokens for `[data-theme='dark']` and `[data-theme='light']` |
| `src/layouts/BaseLayout.astro` | Inline bootstrap script |
| `src/components/Header.astro` | Toggle button and script |

## Content and configuration
Colours: `DESIGN.md` table and `global.css`. Labels: `common.themeToLight`, `common.themeToDark`.

## Tests
| Test | What it checks |
|---|---|
| `tests/e2e/i18n-theme.spec.ts` | Toggle, persistence across reload, device preference, button label |

## Known limits / next steps
- No "follow system" option once a choice is saved (clearing site data resets it).

## History
- 1.0.0: created.

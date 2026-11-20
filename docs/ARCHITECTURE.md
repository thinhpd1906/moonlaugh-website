# Architecture

## In one paragraph

A static Astro site. At build time Astro renders every page, in both languages, to plain
HTML in `dist/`. There is no server: hosting just serves files. A few small scripts run in
the browser (theme switch, chat panel, contact form). The contact form posts directly from
the browser to Web3Forms, which emails the message.

## Folder map

```
src/
  config/site.ts        Brand, contact numbers, social links, form endpoint (single source of truth)
  i18n/en.ts            English copy; defines the Dict type
  i18n/vi.ts            Vietnamese copy; must match en.ts key-for-key
  i18n/index.ts         useT(lang) → dictionary
  lib/paths.ts          Locales, routes, localePath(), switchLocalePath(), activeRoute()
  lib/contact.ts        Contact form validation, payload, submit (pure, unit-tested)
  data/team.ts          Team members (draft flag hides unpublished people)
  styles/global.css     Design tokens (dark/light), base styles, buttons, cards
  layouts/BaseLayout.astro   <head>, theme bootstrap, Header, Footer, CTA band, ChatWidget
  components/           Header, Footer, ChatWidget, ContactForm, CtaBand, TeamCard,
                        Avatar, PageHeader, Icon, Logo
  pages/index.astro     "/" → redirect to /en/ or /vi/
  pages/404.astro       Not-found page (bilingual)
  pages/[lang]/         index (home), services, how-we-work, contact,
                        team/index, team/[slug]
public/                 favicon.svg, robots.txt (copied as-is)
tests/unit/             Vitest: i18n parity, paths, contact logic, config, team data
tests/e2e/              Playwright: navigation, language, theme, chat, team, contact form
docs/                   This documentation
```

## Request flow

```
Visitor → /            index.astro script → saved language, else browser language → /en/ or /vi/
Visitor → /vi/services/   pages/[lang]/services.astro, built for lang = "vi"
                          BaseLayout → Header (nav, theme, language) → page content → CtaBand → Footer → ChatWidget
Contact form submit    ContactForm.astro script → lib/contact.ts validate → POST api.web3forms.com/submit → email
```

## Key mechanisms

| Mechanism | How | Doc |
|---|---|---|
| Languages | `[lang]` dynamic segment + `getStaticPaths` over `LOCALES`; copy from `useT(lang)` | features/i18n-and-routing.md |
| Active tab | `activeRoute(Astro.url.pathname)` in Header | features/navigation.md |
| Theme | Inline script in `<head>` sets `data-theme` before paint; tokens switch via CSS variables | features/theme.md |
| Team pages | `getStaticPaths` over `publishedMembers()` × locales | features/team-profiles.md |
| Contact form | Server renders labels and options; browser script validates and posts JSON | features/contact-form.md |
| Chat panel | `ChatWidget.astro` script; any `[data-open-chat]` element opens it | features/chat-widget.md |

## Conventions

- URLs always end with `/` (`trailingSlash: 'always'`).
- Components get `lang` as a prop and call `useT(lang)` themselves.
- Test hooks use `data-*` attributes (`data-nav`, `data-channel`, `data-member`…). Do not remove them; e2e tests rely on them.
- Component styles are scoped (`<style>` in `.astro`); shared styles and tokens live in `global.css`.

## Adding a page

1. `src/pages/[lang]/<name>.astro` with `export const getStaticPaths = localeStaticPaths;`.
2. Add a key to `ROUTES` in `src/lib/paths.ts` (and to the nav in `Header.astro` if it is a tab).
3. Add copy to both dictionaries (`meta.<name>Title`, `meta.<name>Description`, content).
4. Add an e2e test, a feature doc, a changelog entry.

/**
 * Locale-aware URL helpers. Every internal link in the site goes through these
 * functions, so the URL scheme lives in one place.
 * Docs: docs/features/i18n-and-routing.md
 */

export const LOCALES = ['en', 'vi'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Top-level pages and their URL segment (same segment in every language). */
export const ROUTES = {
  home: '',
  services: 'services',
  process: 'how-we-work',
  team: 'team',
  contact: 'contact',
} as const;
export type RouteKey = keyof typeof ROUTES;

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}

/** Build a path such as `/vi/team/bryan/` (always with a trailing slash). */
export function localePath(lang: Locale, route: RouteKey, slug?: string): string {
  const parts = [lang, ROUTES[route], slug].filter((p): p is string => Boolean(p));
  return `/${parts.join('/')}/`;
}

/** Read the locale from a pathname (`/vi/contact/` -> `vi`). Falls back to the default. */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

/** Same page in another language: `/en/team/bryan/` -> `/vi/team/bryan/`. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = to;
  } else {
    segments.unshift(to);
  }
  return `/${segments.join('/')}/`;
}

/** getStaticPaths() result for pages under src/pages/[lang]/. */
export function localeStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

/** Which top-level route a pathname belongs to (team profiles count as `team`). */
export function activeRoute(pathname: string): RouteKey {
  const second = pathname.split('/').filter(Boolean)[1] ?? '';
  const match = (Object.keys(ROUTES) as RouteKey[]).find((key) => ROUTES[key] === second);
  return match ?? 'home';
}

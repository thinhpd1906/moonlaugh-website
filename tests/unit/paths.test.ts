/** Feature: docs/features/i18n-and-routing.md */
import { describe, expect, it } from 'vitest';
import { activeRoute, isLocale, localeFromPath, localePath, switchLocalePath } from '../../src/lib/paths';

describe('localePath', () => {
  it('builds paths with a trailing slash', () => {
    expect(localePath('en', 'home')).toBe('/en/');
    expect(localePath('vi', 'services')).toBe('/vi/services/');
    expect(localePath('en', 'process')).toBe('/en/how-we-work/');
    expect(localePath('vi', 'team', 'bryan')).toBe('/vi/team/bryan/');
  });
});

describe('switchLocalePath', () => {
  it('keeps the same page in the other language', () => {
    expect(switchLocalePath('/en/team/bryan/', 'vi')).toBe('/vi/team/bryan/');
    expect(switchLocalePath('/vi/contact/', 'en')).toBe('/en/contact/');
    expect(switchLocalePath('/en/', 'vi')).toBe('/vi/');
  });

  it('adds a locale to paths that have none', () => {
    expect(switchLocalePath('/', 'vi')).toBe('/vi/');
    expect(switchLocalePath('/404.html', 'en')).toBe('/en/404.html/');
  });
});

describe('localeFromPath / isLocale', () => {
  it('reads the locale from the first segment', () => {
    expect(localeFromPath('/vi/services/')).toBe('vi');
    expect(localeFromPath('/en/')).toBe('en');
  });

  it('falls back to English', () => {
    expect(localeFromPath('/')).toBe('en');
    expect(localeFromPath('/fr/page/')).toBe('en');
  });

  it('only accepts supported locales', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('vi')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe('activeRoute', () => {
  it('maps a path to its navigation tab', () => {
    expect(activeRoute('/en/')).toBe('home');
    expect(activeRoute('/en/services/')).toBe('services');
    expect(activeRoute('/vi/how-we-work/')).toBe('process');
    expect(activeRoute('/en/team/')).toBe('team');
    expect(activeRoute('/en/team/bryan/')).toBe('team');
    expect(activeRoute('/vi/contact/')).toBe('contact');
  });
});

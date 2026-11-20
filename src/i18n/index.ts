/**
 * Dictionary lookup. Pages call `useT(lang)` to get the copy for one language.
 * Docs: docs/features/i18n-and-routing.md
 */
import { en, type Dict } from './en';
import { vi } from './vi';
import type { Locale } from '../lib/paths';

export const dictionaries: Record<Locale, Dict> = { en, vi };

export function useT(lang: Locale): Dict {
  return dictionaries[lang];
}

export type { Dict };

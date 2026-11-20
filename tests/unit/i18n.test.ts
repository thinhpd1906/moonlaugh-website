/**
 * Guards the bilingual promise: every English string has a Vietnamese twin.
 * Feature: docs/features/i18n-and-routing.md
 */
import { describe, expect, it } from 'vitest';
import { en } from '../../src/i18n/en';
import { vi } from '../../src/i18n/vi';

type Json = string | number | boolean | Json[] | { [k: string]: Json };

/** Flatten an object into "path -> value" pairs, e.g. "services.items.0.title". */
function flatten(value: Json, prefix = ''): Record<string, Json> {
  if (Array.isArray(value)) {
    return value.reduce<Record<string, Json>>((acc, item, i) => ({ ...acc, ...flatten(item, `${prefix}${i}.`) }), {
      [`${prefix}length`]: value.length,
    });
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).reduce<Record<string, Json>>(
      (acc, [k, v]) => ({ ...acc, ...flatten(v, `${prefix}${k}.`) }),
      {},
    );
  }
  return { [prefix.slice(0, -1)]: value };
}

const enFlat = flatten(en as unknown as Json);
const viFlat = flatten(vi as unknown as Json);

describe('i18n dictionaries', () => {
  it('have exactly the same keys and list lengths', () => {
    expect(Object.keys(viFlat).sort()).toEqual(Object.keys(enFlat).sort());
  });

  it('have no empty strings', () => {
    for (const [path, value] of Object.entries({ ...enFlat, ...viFlat })) {
      if (typeof value === 'string') expect(value.trim(), path).not.toBe('');
    }
  });

  it('use the same service keys (they are URL anchors)', () => {
    expect(vi.services.items.map((s) => s.key)).toEqual(en.services.items.map((s) => s.key));
  });

  it('use unique service keys', () => {
    const keys = en.services.items.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('set the right html lang', () => {
    expect(en.meta.htmlLang).toBe('en');
    expect(vi.meta.htmlLang).toBe('vi');
  });

  it('contain no leftover placeholders', () => {
    for (const [path, value] of Object.entries({ ...enFlat, ...viFlat })) {
      if (typeof value === 'string') expect(value, path).not.toMatch(/\[(YOUR|TODO|Member name|Tên thành viên)/i);
    }
  });
});

/** Feature: docs/features/team-profiles.md */
import { describe, expect, it } from 'vitest';
import { TEAM, publishedMembers } from '../../src/data/team';
import { LOCALES } from '../../src/lib/paths';

describe('team data', () => {
  it('has at least one published member', () => {
    expect(publishedMembers().length).toBeGreaterThan(0);
  });

  it('uses unique, URL-safe slugs', () => {
    const slugs = TEAM.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('gives every published member complete copy in every language', () => {
    for (const member of publishedMembers()) {
      for (const lang of LOCALES) {
        const copy = member.copy[lang];
        for (const field of ['name', 'role', 'bio', 'about'] as const) {
          expect(copy[field].trim(), `${member.slug}.${lang}.${field}`).not.toBe('');
          expect(copy[field], `${member.slug}.${lang}.${field}`).not.toMatch(/^\[.*\]$/);
        }
        expect(copy.skills.length, `${member.slug}.${lang}.skills`).toBe(member.copy.en.skills.length);
        expect(copy.experience.length, `${member.slug}.${lang}.experience`).toBe(member.copy.en.experience.length);
      }
    }
  });

  it('links only to https profiles', () => {
    for (const member of publishedMembers()) {
      for (const href of Object.values(member.links)) {
        if (href) expect(href).toMatch(/^https:\/\//);
      }
    }
  });

  it('never publishes a draft placeholder', () => {
    expect(publishedMembers().every((m) => !m.draft)).toBe(true);
  });
});

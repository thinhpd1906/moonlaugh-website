/** Feature: docs/features/contact-channels.md */
import { describe, expect, it } from 'vitest';
import { CONTACT, LINKS } from '../../src/config/site';
import { en } from '../../src/i18n/en';
import { vi } from '../../src/i18n/vi';

describe('contact links', () => {
  it('use https for every web link', () => {
    for (const [name, href] of Object.entries(LINKS)) {
      if (name === 'email' || name === 'phone') continue;
      expect(href, name).toMatch(/^https:\/\//);
    }
  });

  it('have no tracking parameters', () => {
    for (const [name, href] of Object.entries(LINKS)) expect(href, name).not.toContain('?');
  });

  it('build email, phone, Zalo and WhatsApp links from one source', () => {
    expect(LINKS.email).toBe(`mailto:${CONTACT.email}`);
    expect(LINKS.phone).toBe(`tel:+${CONTACT.phoneE164}`);
    expect(LINKS.zalo).toBe(`https://zalo.me/${CONTACT.zaloNumber}`);
    expect(LINKS.whatsapp).toBe(`https://wa.me/${CONTACT.phoneE164}`);
  });

  it('keep local and international numbers consistent', () => {
    const local = CONTACT.phoneLocal.replace(/\s/g, '');
    const intl = CONTACT.phoneIntl.replace(/[\s+]/g, '');
    expect(CONTACT.zaloNumber).toBe(local);
    expect(intl).toBe(CONTACT.phoneE164);
    expect(`84${local.slice(1)}`).toBe(CONTACT.phoneE164);
  });

  it('show the same numbers in the copy as in the config', () => {
    expect(en.contact.phone).toBe(CONTACT.phoneIntl);
    expect(vi.contact.phone).toBe(CONTACT.phoneLocal);
  });
});

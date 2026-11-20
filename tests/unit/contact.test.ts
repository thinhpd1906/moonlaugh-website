/** Feature: docs/features/contact-form.md */
import { describe, expect, it, vi } from 'vitest';
import { buildPayload, isValidEmail, submitContact, validateContact, type ContactInput } from '../../src/lib/contact';

const good: ContactInput = {
  name: 'Lan Nguyen',
  email: 'lan@example.com',
  projectType: 'Mobile app',
  budget: 'Not sure yet',
  message: 'We need an Android TV app for our IPTV service.',
};

describe('isValidEmail', () => {
  it.each(['a@b.co', 'first.last@company.com.vn', ' spaced@ok.io '])('accepts %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });
  it.each(['', 'plain', 'a@b', 'a b@c.com', '@c.com'])('rejects %s', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

describe('validateContact', () => {
  it('passes a complete message', () => {
    expect(validateContact(good)).toEqual({ valid: true, errors: [] });
  });

  it('reports every missing field', () => {
    const result = validateContact({ ...good, name: ' ', email: 'nope', message: 'short' });
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(['name', 'email', 'message']);
  });

  it('rejects messages that are too long', () => {
    expect(validateContact({ ...good, message: 'x'.repeat(5001) }).errors).toContain('message');
  });
});

describe('buildPayload', () => {
  it('maps fields to the names Web3Forms emails', () => {
    const payload = buildPayload({ ...good, name: '  Lan  ' }, { accessKey: 'key-123', subject: 'Hi', lang: 'vi', page: 'https://moonlaugh.com/vi/contact/' });
    expect(payload).toEqual({
      access_key: 'key-123',
      subject: 'Hi',
      from_name: 'Moonlaugh Website',
      name: 'Lan',
      email: 'lan@example.com',
      project_type: 'Mobile app',
      budget: 'Not sure yet',
      message: good.message,
      language: 'VI',
      page: 'https://moonlaugh.com/vi/contact/',
      botcheck: false,
    });
  });

  it('passes the honeypot through so Web3Forms can drop bots', () => {
    expect(buildPayload({ ...good, botcheck: true }, { accessKey: 'k', subject: 's', lang: 'en', page: '/' }).botcheck).toBe(true);
  });
});

describe('submitContact', () => {
  const payload = buildPayload(good, { accessKey: 'key', subject: 's', lang: 'en', page: '/' });
  const respond = (status: number, body: unknown) =>
    vi.fn(async () => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }));

  it('succeeds when Web3Forms says success', async () => {
    const fetchMock = respond(200, { success: true });
    await expect(submitContact('https://api.test/submit', payload, fetchMock)).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.test/submit');
    expect(init.method).toBe('POST');
    expect(JSON.parse(String(init.body)).access_key).toBe('key');
  });

  it('fails when Web3Forms rejects the submission', async () => {
    await expect(submitContact('u', payload, respond(400, { success: false }))).resolves.toEqual({ ok: false, reason: 'rejected' });
  });

  it('fails cleanly on network errors', async () => {
    const broken = vi.fn(async () => {
      throw new TypeError('offline');
    });
    await expect(submitContact('u', payload, broken)).resolves.toEqual({ ok: false, reason: 'network' });
  });

  it('never calls the network without an access key', async () => {
    const fetchMock = respond(200, { success: true });
    await expect(submitContact('u', { ...payload, access_key: '' }, fetchMock)).resolves.toEqual({ ok: false, reason: 'no-key' });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

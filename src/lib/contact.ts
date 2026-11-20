/**
 * Contact form logic, kept free of DOM code so it can be unit-tested.
 * Used by src/components/ContactForm.astro.
 * Docs: docs/features/contact-form.md
 */

export interface ContactInput {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  /** Honeypot. Real visitors never tick it. */
  botcheck?: boolean;
}

export type ContactField = 'name' | 'email' | 'message';

export interface ValidationResult {
  valid: boolean;
  errors: ContactField[];
}

// Simple, permissive check: something@something.tld, no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MAX_LENGTH = 5000;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validateContact(input: ContactInput): ValidationResult {
  const errors: ContactField[] = [];
  if (input.name.trim().length < 2) errors.push('name');
  if (!isValidEmail(input.email)) errors.push('email');
  const message = input.message.trim();
  if (message.length < 10 || message.length > MESSAGE_MAX_LENGTH) errors.push('message');
  return { valid: errors.length === 0, errors };
}

export interface PayloadOptions {
  accessKey: string;
  subject: string;
  lang: string;
  page: string;
}

/** Shape the data the way Web3Forms expects it. Field names become email labels. */
export function buildPayload(input: ContactInput, opts: PayloadOptions): Record<string, string | boolean> {
  return {
    access_key: opts.accessKey,
    subject: opts.subject,
    from_name: 'Moonlaugh Website',
    name: input.name.trim(),
    email: input.email.trim(),
    project_type: input.projectType,
    budget: input.budget,
    message: input.message.trim(),
    language: opts.lang.toUpperCase(),
    page: opts.page,
    botcheck: Boolean(input.botcheck),
  };
}

export type SubmitResult = { ok: true } | { ok: false; reason: 'no-key' | 'network' | 'rejected' };

/** Send the payload. `fetchImpl` is injectable so tests never hit the network. */
export async function submitContact(
  endpoint: string,
  payload: Record<string, string | boolean>,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!payload.access_key) return { ok: false, reason: 'no-key' };
  try {
    const res = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean };
    return res.ok && json.success ? { ok: true } : { ok: false, reason: 'rejected' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}

/**
 * Site-wide settings: brand, contact channels and social links.
 * Change contact details HERE only; every page reads them from this file.
 * Docs: docs/features/contact-channels.md
 */

export const SITE = {
  name: 'Moonlaugh',
  url: 'https://moonlaugh.com',
  defaultLocale: 'en',
} as const;

export const CONTACT = {
  email: 'phanthinhpdt@gmail.com',
  /** Local Vietnamese format, shown to Vietnamese visitors. */
  phoneLocal: '0395 811 906',
  /** International format, shown to English visitors and used in links. */
  phoneIntl: '+84 395 811 906',
  /** E.164 digits without "+", used by tel: and wa.me links. */
  phoneE164: '84395811906',
  /** Zalo accepts the local number without spaces. */
  zaloNumber: '0395811906',
} as const;

export const LINKS = {
  email: `mailto:${CONTACT.email}`,
  phone: `tel:+${CONTACT.phoneE164}`,
  zalo: `https://zalo.me/${CONTACT.zaloNumber}`,
  whatsapp: `https://wa.me/${CONTACT.phoneE164}`,
  messenger: 'https://m.me/moonlaughFlatmeta',
  facebook: 'https://www.facebook.com/moonlaughFlatmeta',
  community: 'https://www.facebook.com/groups/xuatkhaulaodongmoonlaugh',
  tiktok: 'https://www.tiktok.com/@moonlaugh_official',
} as const;

/** Contact form backend. See docs/features/contact-form.md and docs/decisions/0002-web3forms.md */
export const FORM = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: (import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '') as string,
} as const;

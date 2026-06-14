/** Supported UI locales. RU is the default and the canonical (x-default) locale. */
export const LOCALES = ['ru', 'en'] as const;

export type Lang = (typeof LOCALES)[number];

export const DEFAULT_LANG: Lang = 'ru';

/** Narrow an arbitrary string (e.g. a route param) to a supported Lang. */
export function normalizeLang(value: string | null | undefined): Lang {
  return value === 'en' ? 'en' : 'ru';
}

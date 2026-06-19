import { effect, inject } from '@angular/core';
import { TranslationService } from '../i18n/translation.service';
import { SeoConfig, SeoService } from './seo.service';

/**
 * Wires page SEO to the active locale. Call inside a component constructor
 * (injection context). The factory re-runs whenever the locale changes, so the
 * right tags are present both at prerender time and after a client-side locale
 * switch.
 */
export function usePageSeo(factory: () => SeoConfig): void {
  const seo = inject(SeoService);
  const i18n = inject(TranslationService);
  effect(() => {
    i18n.lang();
    seo.update(factory());
  });
}

/**
 * SEO for a static page whose title and description come straight from i18n
 * keys. The title is suffixed with the brand name (`meta.brand_suffix`); the
 * path is the canonical route. Covers the common page pattern so components
 * don't repeat the title/description/path boilerplate.
 */
export function useStaticPageSeo(titleKey: string, descriptionKey: string, path: string): void {
  const i18n = inject(TranslationService);
  usePageSeo(() => ({
    title: `${i18n.translate(titleKey)} — ${i18n.translate('meta.brand_suffix')}`,
    description: i18n.translate(descriptionKey),
    path
  }));
}

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

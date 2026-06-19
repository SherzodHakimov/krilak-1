import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { LOCALES, Lang } from '../i18n/locale';
import { TranslationService } from '../i18n/translation.service';

export interface SeoConfig {
  /** Page title (~60 chars). */
  title: string;
  /** Meta description (~155 chars). */
  description: string;
  /** App-relative path WITHOUT the locale prefix, e.g. `/catalog`. Default `''`. */
  path?: string;
  /** Absolute or app-relative OG image. Defaults to the site OG image. */
  image?: string;
  /** OG type. Default `website`. */
  type?: 'website' | 'article';
}

const OG_LOCALE: Record<Lang, string> = { ru: 'ru_RU', en: 'en_US' };

/**
 * Centralised SEO/meta management. The single place allowed to touch
 * `<title>`, meta tags, canonical/hreflang links and JSON-LD. Runs during
 * prerendering so all tags land in the static HTML.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly i18n = inject(TranslationService);
  private readonly platformId = inject(PLATFORM_ID);

  private get origin(): string {
    return environment.siteUrl.replace(/\/$/, '');
  }

  /** Apply all SEO tags for the current page. */
  update(config: SeoConfig): void {
    const lang = this.i18n.lang();
    const path = this.normalizePath(config.path ?? '');
    const canonical = `${this.origin}/${lang}${path}`;
    const image = this.absolute(config.image ?? '/images/logo-mark.png');

    this.title.setTitle(config.title);
    this.setHtmlLang(lang);

    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[lang] });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setLink('canonical', canonical);
    this.setAlternates(path);
  }

  /** Absolute canonical URL for the active locale, e.g. for breadcrumb links. */
  canonicalFor(path: string): string {
    return `${this.origin}/${this.i18n.lang()}${this.normalizePath(path)}`;
  }

  /** Absolute URL for a static asset (no locale prefix), e.g. a product image. */
  absoluteUrl(path: string): string {
    return this.absolute(path);
  }

  /** Inject a JSON-LD structured-data block into <head>. */
  setJsonLd(id: string, data: Record<string, unknown>): void {
    const head = this.doc.head;
    let script = head.querySelector<HTMLScriptElement>(`script[data-ld="${id}"]`);
    if (!script) {
      script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-ld', id);
      head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  private setAlternates(path: string): void {
    for (const lang of LOCALES) {
      this.setLink('alternate', `${this.origin}/${lang}${path}`, lang);
    }
    // x-default points to the canonical default locale.
    this.setLink('alternate', `${this.origin}/ru${path}`, 'x-default');
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const head = this.doc.head;
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
    let link = head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', rel);
      if (hreflang) {
        link.setAttribute('hreflang', hreflang);
      }
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setHtmlLang(lang: Lang): void {
    // Safe on server (Domino) and browser; keeps <html lang> in sync per route.
    if (isPlatformServer(this.platformId) || this.doc.documentElement) {
      this.doc.documentElement.setAttribute('lang', lang);
    }
  }

  private normalizePath(path: string): string {
    if (!path || path === '/') {
      return '';
    }
    return path.startsWith('/') ? path : `/${path}`;
  }

  private absolute(url: string): string {
    if (/^https?:\/\//.test(url)) {
      return url;
    }
    return `${this.origin}${url.startsWith('/') ? '' : '/'}${url}`;
  }
}

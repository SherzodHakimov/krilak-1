import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from './translation.service';

/**
 * Prefixes an app-relative path with the active locale segment.
 *
 *   `'/catalog' | loc`  →  `/ru/catalog`
 *   `'' | loc`          →  `/ru`
 *
 * Use for every internal `routerLink` so navigation preserves the locale.
 */
@Pipe({ name: 'loc', pure: false })
export class LocalizePathPipe implements PipeTransform {
  private readonly i18n = inject(TranslationService);

  transform(path: string): string {
    const lang = this.i18n.lang();
    if (!path || path === '/') {
      return `/${lang}`;
    }
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `/${lang}${clean}`;
  }
}

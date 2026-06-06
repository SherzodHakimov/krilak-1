import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from './translation.service';

/**
 * Template translation pipe: `{{ 'hero.title' | t }}`.
 *
 * Impure so it re-resolves when the active locale changes (the same pattern
 * established UI i18n libraries use). Lookups are plain object reads, so the
 * cost is negligible for a content site.
 */
@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(TranslationService);

  transform(key: string): string {
    return this.i18n.translate(key);
  }
}

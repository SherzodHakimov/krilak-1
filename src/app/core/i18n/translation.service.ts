import { Injectable, computed, signal } from '@angular/core';
import { DEFAULT_LANG, Lang, normalizeLang } from './locale';
import { Dictionary, TRANSLATIONS } from './translations';

/**
 * Synchronous, route-driven translation store.
 *
 * The active language is set from the `:lang` route segment by the layout
 * component before any page renders, so {@link translate} resolves real text
 * during prerendering. No HTTP, no async loader, no TransferState — server and
 * client produce identical markup.
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly _lang = signal<Lang>(DEFAULT_LANG);

  /** Current active locale. */
  readonly lang = this._lang.asReadonly();

  /** Active dictionary, recomputed when the locale changes. */
  readonly dict = computed<Dictionary>(() => TRANSLATIONS[this._lang()]);

  /** Set the active locale (ignores unknown values, falling back to default). */
  setLang(value: string | null | undefined): void {
    const next = normalizeLang(value);
    if (next !== this._lang()) {
      this._lang.set(next);
    }
  }

  /**
   * Resolve a dot-separated key (e.g. `hero.title`) against the active
   * dictionary. Returns the key itself if the path is missing, which keeps
   * templates safe and makes missing translations visible.
   */
  translate(key: string): string {
    const value = this.lookup(this.dict(), key);
    return typeof value === 'string' ? value : key;
  }

  /** Resolve a key to any value (objects/arrays), for structured content. */
  resolve<T = unknown>(key: string): T | undefined {
    return this.lookup(this.dict(), key) as T | undefined;
  }

  private lookup(dict: Dictionary, key: string): unknown {
    let current: unknown = dict;
    for (const part of key.split('.')) {
      if (current && typeof current === 'object' && part in (current as object)) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }
    return current;
  }
}

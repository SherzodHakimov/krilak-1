import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { CatalogService } from '../../core/data/catalog.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { BreadcrumbsComponent, Crumb } from '../../shared/breadcrumbs.component';

/** Линейные SVG-иконки по слагу категории (24×24, stroke). */
const CATEGORY_ICONS: Record<string, string> = {
  compounds: 'M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3z',
  doors: 'M6 3h12v18H6z M14.5 12h.01',
  panels: 'M3 8l9-4 9 4-9 4-9-4z M3 12l9 4 9-4 M3 16l9 4 9-4',
  couplings: 'M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z M3 12h6 M15 12h6',
  cabinets: 'M5 3h14v18H5z M5 9h14 M9 6h.01 M9 13h.01',
  extinguishers: 'M9 2h4 M11 5V2 M8 8h6v13H8z M8 8a3 3 0 0 1 3-3',
  alarms: 'M12 3a7 7 0 0 1 7 7 6 6 0 0 0 .9 9H4.1A6 6 0 0 0 5 10a7 7 0 0 1 7-7z M10 21h4',
  hoses: 'M4 6h5a4 4 0 0 1 4 4v4a3 3 0 0 0 6 0 M4 4v4',
  _default: 'M4 4h16v16H4z M4 9h16'
};

/** Тон плитки и иконки по ключу цвета категории. */
const TILE_TONE: Record<string, { bg: string; icon: string }> = {
  flame: { bg: 'bg-gradient-to-br from-brand-amber/15 to-brand-leaf/10', icon: 'text-brand-amber' },
  steel: { bg: 'bg-gradient-to-br from-brand-steel/15 to-brand-graphite/5', icon: 'text-brand-steel' },
  amber: { bg: 'bg-gradient-to-br from-brand-amber/20 to-brand-amber/5', icon: 'text-amber-600' },
  graphite: { bg: 'bg-gradient-to-br from-brand-graphite/10 to-brand-graphite/[0.04]', icon: 'text-brand-graphite' },
  _default: { bg: 'bg-brand-cloud', icon: 'text-brand-ink/40' }
};

@Component({
  selector: 'app-catalog-index',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, BreadcrumbsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog-index.component.html'
})
export class CatalogIndexComponent {
  private readonly catalog = inject(CatalogService);
  private readonly i18n = inject(TranslationService);

  readonly crumbs: Crumb[] = [{ label: 'nav.home', link: '' }, { label: 'catalog.title' }];

  readonly query = signal('');
  readonly categories = computed(() => this.catalog.categories());
  readonly featured = computed(() => this.catalog.featured());

  readonly filteredCategories = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) {
      return this.categories();
    }
    return this.categories().filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('catalog.title')} — ${this.i18n.translate('meta.brand_suffix')}`,
      description: this.i18n.translate('catalog.subtitle'),
      path: '/catalog'
    }));
  }

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  categoryIcon(slug: string): string {
    return this.catalog.categoryBySlug(slug)?.icon ?? '▣';
  }

  /** SVG-путь линейной иконки категории. */
  iconPath(slug: string): string {
    return CATEGORY_ICONS[slug] ?? CATEGORY_ICONS['_default'];
  }

  /** Тон плитки/иконки по слагу категории (через её цвет). */
  tone(slug: string): { bg: string; icon: string } {
    const color = this.catalog.categoryBySlug(slug)?.color ?? '_default';
    return TILE_TONE[color] ?? TILE_TONE['_default'];
  }
}

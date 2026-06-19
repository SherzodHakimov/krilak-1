import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
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
  flame: { bg: 'bg-gradient-to-br from-brand-amber/40 to-brand-leaf/25', icon: 'text-brand-amber' },
  steel: { bg: 'bg-gradient-to-br from-brand-steel/40 to-brand-graphite/15', icon: 'text-brand-steel' },
  amber: { bg: 'bg-gradient-to-br from-brand-amber/45 to-brand-amber/15', icon: 'text-amber-600' },
  graphite: { bg: 'bg-gradient-to-br from-brand-graphite/30 to-brand-graphite/10', icon: 'text-brand-graphite' },
  _default: { bg: 'bg-gradient-to-br from-brand-cloud to-brand-fog', icon: 'text-brand-ink/40' }
};

@Component({
  selector: 'app-category',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, BreadcrumbsComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(CatalogService);
  private readonly i18n = inject(TranslationService);

  readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: this.route.snapshot.paramMap.get('slug') ?? ''
  });

  readonly category = computed(() => this.catalog.categoryBySlug(this.slug()));
  readonly products = computed(() => this.catalog.productsByCategory(this.slug()));

  /** SVG-путь иконки и тон плитки для карточек товара текущей категории. */
  readonly catIcon = computed(() => CATEGORY_ICONS[this.slug()] ?? CATEGORY_ICONS['_default']);
  readonly tileTone = computed(
    () => TILE_TONE[this.category()?.color ?? '_default'] ?? TILE_TONE['_default']
  );

  readonly crumbs = computed<Crumb[]>(() => {
    const cat = this.category();
    return [
      { label: 'nav.home', link: '' },
      { label: 'catalog.title', link: '/catalog' },
      ...(cat ? [{ label: cat.name, raw: true } as Crumb] : [])
    ];
  });

  readonly ratings = computed(() =>
    Array.from(new Set(this.products().flatMap((p) => p.rating))).sort()
  );
  readonly activeFilter = signal('all');
  readonly filteredProducts = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.products() : this.products().filter((p) => p.rating.includes(f));
  });

  setFilter(value: string): void {
    this.activeFilter.set(value);
  }

  constructor() {
    // Reset the active filter whenever the category changes.
    effect(() => {
      this.slug();
      this.activeFilter.set('all');
    });

    usePageSeo(() => {
      const cat = this.category();
      return {
        title: cat
          ? `${cat.name} — ${this.i18n.translate('meta.brand_suffix')}`
          : `${this.i18n.translate('catalog.title')} — ${this.i18n.translate('meta.brand_suffix')}`,
        description: cat?.description ?? this.i18n.translate('catalog.subtitle'),
        path: `/catalog/category/${this.slug()}`
      };
    });
  }
}

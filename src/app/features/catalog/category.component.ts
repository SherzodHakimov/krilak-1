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
import { categoryIconPath, categoryTone } from '../../core/data/category-icons';
import { RevealDirective } from '../../shared/reveal.directive';
import { BreadcrumbsComponent, Crumb } from '../../shared/breadcrumbs.component';

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
  readonly catIcon = computed(() => categoryIconPath(this.slug()));
  readonly tileTone = computed(() => categoryTone(this.category()?.color));

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

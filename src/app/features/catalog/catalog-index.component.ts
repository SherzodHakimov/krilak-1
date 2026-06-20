import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { useStaticPageSeo } from '../../core/seo/page-seo';
import { CatalogService } from '../../core/data/catalog.service';
import { categoryIconPath, categoryTone } from '../../core/data/category-icons';
import { RevealDirective } from '../../shared/reveal.directive';
import { BreadcrumbsComponent, pageCrumbs } from '../../shared/breadcrumbs.component';
import { ProductCardComponent } from '../../shared/product-card.component';

@Component({
  selector: 'app-catalog-index',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, BreadcrumbsComponent, ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog-index.component.html'
})
export class CatalogIndexComponent {
  private readonly catalog = inject(CatalogService);

  readonly crumbs = pageCrumbs('catalog.title');

  readonly query = signal('');
  readonly categories = computed(() => this.catalog.categories());
  readonly featured = computed(() => this.catalog.featured());

  /** Реальное число товаров по слагу категории (по факту, а не из products_count). */
  readonly productCounts = computed(() => this.catalog.productCounts());

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
    useStaticPageSeo('catalog.title', 'catalog.subtitle', '/catalog');
  }

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  categoryIcon(slug: string): string {
    return this.catalog.categoryBySlug(slug)?.icon ?? '▣';
  }

  /** SVG-путь линейной иконки категории. */
  iconPath(slug: string): string {
    return categoryIconPath(slug);
  }

  /** Тон плитки/иконки по слагу категории (через её цвет). */
  tone(slug: string): { bg: string; icon: string } {
    return categoryTone(this.catalog.categoryBySlug(slug)?.color);
  }
}

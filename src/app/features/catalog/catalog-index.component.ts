import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { CatalogService } from '../../core/data/catalog.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-catalog-index',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog-index.component.html'
})
export class CatalogIndexComponent {
  private readonly catalog = inject(CatalogService);
  private readonly i18n = inject(TranslationService);

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
}

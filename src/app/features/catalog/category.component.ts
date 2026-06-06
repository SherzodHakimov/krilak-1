import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { CatalogService } from '../../core/data/catalog.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-category',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective],
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
        title: cat ? `${cat.name} — КРИЛАК` : `${this.i18n.translate('catalog.title')} — КРИЛАК`,
        description: cat?.description ?? this.i18n.translate('catalog.subtitle'),
        path: `/catalog/category/${this.slug()}`
      };
    });
  }
}

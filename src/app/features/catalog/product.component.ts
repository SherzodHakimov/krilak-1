import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { KeyValuePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { CatalogService } from '../../core/data/catalog.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { QuoteFormComponent } from '../../shared/quote-form.component';
import { BreadcrumbsComponent, Crumb } from '../../shared/breadcrumbs.component';

@Component({
  selector: 'app-product',
  imports: [
    RouterLink,
    KeyValuePipe,
    TranslatePipe,
    LocalizePathPipe,
    RevealDirective,
    QuoteFormComponent,
    BreadcrumbsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product.component.html'
})
export class ProductComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(CatalogService);
  private readonly i18n = inject(TranslationService);

  readonly sku = toSignal(this.route.paramMap.pipe(map((p) => p.get('sku') ?? '')), {
    initialValue: this.route.snapshot.paramMap.get('sku') ?? ''
  });

  readonly product = computed(() => this.catalog.productBySku(this.sku()));
  readonly category = computed(() => {
    const p = this.product();
    return p ? this.catalog.categoryBySlug(p.category) : undefined;
  });

  readonly crumbs = computed<Crumb[]>(() => {
    const p = this.product();
    const cat = this.category();
    return [
      { label: 'catalog.title', link: '/catalog' },
      ...(cat ? [{ label: cat.name, raw: true, link: '/catalog/category/' + cat.slug } as Crumb] : []),
      ...(p ? [{ label: p.name, raw: true } as Crumb] : [])
    ];
  });

  constructor() {
    usePageSeo(() => {
      const p = this.product();
      return {
        title: p
          ? `${p.name} — ${p.subtitle} — ${this.i18n.translate('meta.brand_suffix')}`
          : this.i18n.translate('meta.brand_suffix'),
        description: p?.description ?? this.i18n.translate('catalog.subtitle'),
        path: `/catalog/product/${this.sku()}`
      };
    });
  }
}

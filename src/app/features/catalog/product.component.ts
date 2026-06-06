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

@Component({
  selector: 'app-product',
  imports: [RouterLink, KeyValuePipe, TranslatePipe, LocalizePathPipe, RevealDirective],
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
  readonly related = computed(() => {
    const p = this.product();
    return p
      ? this.catalog.productsByCategory(p.category).filter((r) => r.sku !== p.sku).slice(0, 3)
      : [];
  });

  constructor() {
    usePageSeo(() => {
      const p = this.product();
      return {
        title: p ? `${p.name} — ${p.subtitle} — КРИЛАК` : `КРИЛАК`,
        description: p?.description ?? this.i18n.translate('catalog.subtitle'),
        path: `/catalog/product/${this.sku()}`
      };
    });
  }
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../core/i18n/localize-path.pipe';
import { categoryIconPath } from '../core/data/category-icons';
import { Product } from '../core/data/catalog.types';
import { RevealDirective } from './reveal.directive';

/**
 * Dumb product card shared by the catalog index (featured) and category pages.
 * Receives a ready {@link Product} and its tile tone; computes only the SVG
 * icon path from the product category. Host is display:contents so the inner
 * <a> is the real grid item (equal-height flex layout + scroll-reveal intact).
 */
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  /** Товар для отображения. */
  readonly product = input.required<Product>();
  /** Тон плитки/иконки (из категории товара) — вычисляется страницей. */
  readonly tone = input.required<{ bg: string; icon: string }>();
  /** Responsive `sizes` для картинки (зависит от сетки страницы). */
  readonly sizes = input('(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw');
  /** Задержка scroll-reveal анимации в мс (стаггер по индексу в сетке). */
  readonly delay = input(0);

  /** SVG-путь иконки-заглушки по категории товара. */
  readonly iconPath = computed(() => categoryIconPath(this.product().category));
}

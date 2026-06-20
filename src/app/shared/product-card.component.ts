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
  template: `
    <a
      [routerLink]="'/catalog/product/' + product().sku | loc"
      class="card group block overflow-hidden flex flex-col cursor-pointer ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:ring-brand-leaf/40"
      data-reveal
      [attr.data-reveal-delay]="delay()"
    >
      <div
        class="relative aspect-[4/3] grid place-items-center overflow-hidden {{
          product().images.length ? 'bg-white' : tone().bg
        }}"
      >
        @if (product().images.length) {
          <img
            [ngSrc]="product().images[0]"
            [alt]="product().name"
            fill
            [sizes]="sizes()"
            class="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        } @else {
          <svg
            class="w-16 h-16 {{ tone().icon }} transition-transform duration-500 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path [attr.d]="iconPath()" />
          </svg>
        }
        @if (product().rating.length) {
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            @for (r of product().rating.slice(0, 3); track r) {
              <span class="pill bg-brand-cloud text-brand-ink/70 shadow-sm ring-1 ring-brand-mist/50">{{ r }}</span>
            }
          </div>
        }
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <h3
          class="font-display font-bold text-lg group-hover:text-brand-leaf transition-colors min-h-[3.5rem]"
        >
          {{ product().name }}
        </h3>
        <p class="text-sm text-brand-ink/70 mt-1 flex-1">{{ product().subtitle }}</p>
        <div class="mt-5 pt-5 border-t border-brand-fog flex items-center justify-between">
          <span class="text-sm font-mono text-brand-ink/50">{{ product().sku }}</span>
          <span
            class="text-sm font-semibold text-brand-leaf inline-flex items-center group-hover:translate-x-1 transition-transform"
            >{{ 'catalog.details' | t }}</span
          >
        </div>
      </div>
    </a>
  `
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

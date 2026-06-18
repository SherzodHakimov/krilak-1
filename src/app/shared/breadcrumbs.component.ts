import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../core/i18n/localize-path.pipe';
import { RevealDirective } from './reveal.directive';

/** Один сегмент хлебных крошек. */
export interface Crumb {
  /** Текст: ключ перевода (по умолчанию) либо готовый текст при `raw: true`. */
  label: string;
  /** Трактовать `label` как готовый текст, а не ключ перевода (имена категорий/товаров). */
  raw?: boolean;
  /** Путь для ссылки (например `/catalog`). Не указывать для текущей (последней) крошки. */
  link?: string;
}

/**
 * Хлебные крошки для тёмных hero-секций: «Главная / … / Текущая».
 * Последний сегмент — текущая страница (без ссылки). Ключи переводятся через `t`,
 * пути локализуются через `loc`. Для готового текста передавайте `raw: true`.
 */
@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <nav class="text-xs text-white/50 flex items-center gap-2 mb-6 flex-wrap" data-reveal aria-label="breadcrumb">
      @for (c of items(); track $index; let first = $first; let last = $last) {
        @if (!first) {
          <span aria-hidden="true">/</span>
        }
        @if (c.link != null && !last) {
          <a [routerLink]="c.link | loc" class="hover:text-white">{{ c.raw ? c.label : (c.label | t) }}</a>
        } @else {
          <span class="text-white" aria-current="page">{{ c.raw ? c.label : (c.label | t) }}</span>
        }
      }
    </nav>
  `
})
export class BreadcrumbsComponent {
  /** Сегменты от корня к текущей странице. Последний — текущая (без ссылки). */
  readonly items = input.required<Crumb[]>();
}

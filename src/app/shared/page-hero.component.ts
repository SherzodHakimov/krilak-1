import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { RevealDirective } from './reveal.directive';
import { BreadcrumbsComponent, Crumb } from './breadcrumbs.component';

/**
 * Тёмная hero-шапка простых страниц: eyebrow (янтарный) + заголовок + подзаголовок.
 * Все три входа — ключи перевода, локализация выполняется внутри через пайп `t`.
 */
@Component({
  selector: 'app-page-hero',
  imports: [TranslatePipe, RevealDirective, BreadcrumbsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Хост-обёртка не должна создавать собственный бокс — секция ведёт себя
  // так же, как если бы лежала в шаблоне страницы напрямую. Инлайновый стиль
  // (а не styles[]) не включает emulated-инкапсуляцию и не добавляет атрибутов.
  host: { style: 'display: contents' },
  templateUrl: './page-hero.component.html'
})
export class PageHeroComponent {
  /** Ключ перевода для надписи-eyebrow. */
  readonly eyebrow = input.required<string>();
  /** Ключ перевода для заголовка h1. */
  readonly title = input.required<string>();
  /** Ключ перевода для подзаголовка. */
  readonly subtitle = input.required<string>();
  /** Необязательные хлебные крошки над eyebrow. Не задавать — крошек не будет. */
  readonly crumbs = input<Crumb[]>();
}

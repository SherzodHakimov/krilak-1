import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { RevealDirective } from './reveal.directive';

/**
 * Тёмная hero-шапка простых страниц: eyebrow (янтарный) + заголовок + подзаголовок.
 * Все три входа — ключи перевода, локализация выполняется внутри через пайп `t`.
 */
@Component({
  selector: 'app-page-hero',
  imports: [TranslatePipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Хост-обёртка не должна создавать собственный бокс — секция ведёт себя
  // так же, как если бы лежала в шаблоне страницы напрямую. Инлайновый стиль
  // (а не styles[]) не включает emulated-инкапсуляцию и не добавляет атрибутов.
  host: { style: 'display: contents' },
  template: `
    <section class="bg-brand-graphite text-white relative overflow-hidden -mt-[7.25rem] pt-[7.25rem]">
      <div class="absolute inset-0 grid-lines opacity-[0.05] pointer-events-none"></div>
      <div class="container-x relative py-16 lg:py-24">
        <div class="max-w-3xl" data-reveal>
          <span class="eyebrow !text-brand-amber">{{ eyebrow() | t }}</span>
          <h1 class="mt-3 text-display-lg text-white text-balance">{{ title() | t }}</h1>
          <p class="mt-5 text-lg text-white/70">{{ subtitle() | t }}</p>
        </div>
      </div>
    </section>
  `
})
export class PageHeroComponent {
  /** Ключ перевода для надписи-eyebrow. */
  readonly eyebrow = input.required<string>();
  /** Ключ перевода для заголовка h1. */
  readonly title = input.required<string>();
  /** Ключ перевода для подзаголовка. */
  readonly subtitle = input.required<string>();
}

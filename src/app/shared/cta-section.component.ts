import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { RevealDirective } from './reveal.directive';
import { QuoteFormComponent } from './quote-form.component';

/**
 * Нижний тёмный CTA-блок «заявка» с формой `app-quote-form` справа.
 * Заголовок/подзаголовок берутся из ключей `cta.*`. Декор (pill, градиент)
 * включается входами; дополнительный контент левой колонки (список выгод и т.п.)
 * проецируется через `<ng-content>`.
 */
@Component({
  selector: 'app-cta-section',
  imports: [TranslatePipe, RevealDirective, QuoteFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Хост-обёртка не должна создавать собственный бокс — секция ведёт себя
  // так же, как если бы лежала в шаблоне страницы напрямую. Инлайновый стиль
  // (а не styles[]) не включает emulated-инкапсуляцию и не добавляет атрибутов.
  host: { style: 'display: contents' },
  template: `
    <section
      [attr.id]="sectionId() || null"
      class="section bg-brand-graphite text-white relative overflow-hidden"
    >
      <div class="absolute inset-0 grid-lines opacity-[0.04] pointer-events-none"></div>
      @if (gradient()) {
        <div
          class="absolute -right-32 -top-32 w-[480px] h-[480px] bg-leaf-gradient rounded-full blur-3xl opacity-25 pointer-events-none"
        ></div>
      }
      <div class="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <div data-reveal>
          @if (pill()) {
            <span class="pill-on-dark">{{ 'hero.eyebrow' | t }}</span>
          }
          <h2 class="text-display-lg text-white text-balance" [class.mt-5]="pill()">{{
            'cta.title' | t
          }}</h2>
          <!-- text-pretty присутствует только на «декорированном» варианте (с pill),
               как и в исходной вёрстке страниц. -->
          <p class="mt-5 text-lg text-white/70 max-w-lg" [class.text-pretty]="pill()">{{
            'cta.subtitle' | t
          }}</p>
          @if (benefitKeys().length) {
            <ul class="mt-8 space-y-3 text-sm text-white/80">
              @for (b of benefitKeys(); track b) {
                <li class="flex items-start gap-3">
                  <span
                    class="w-5 h-5 rounded-full bg-brand-leaf/20 text-brand-amber grid place-items-center text-xs mt-0.5"
                    >✓</span
                  >
                  <span>{{ 'cta.' + b | t }}</span>
                </li>
              }
            </ul>
          }
        </div>
        <div data-reveal data-reveal-delay="120">
          <app-quote-form variant="dark" [leadTitle]="leadTitle()" [source]="source()" />
        </div>
      </div>
    </section>
  `
})
export class CtaSectionComponent {
  /** Заголовок для Telegram-заявки (проксируется в quote-form). */
  readonly leadTitle = input.required<string>();
  /** Источник заявки для аналитики (проксируется в quote-form). */
  readonly source = input.required<string>();
  /** Показывать ли надпись-pill над заголовком. */
  readonly pill = input(true);
  /** Показывать ли декоративный градиентный блик. */
  readonly gradient = input(true);
  /** Необязательный id секции (например, якорь `cta`). */
  readonly sectionId = input('');
  /** Ключи выгод (`cta.<key>`) для списка в левой колонке; пусто — список скрыт. */
  readonly benefitKeys = input<string[]>([]);
}

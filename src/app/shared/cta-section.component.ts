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
  templateUrl: './cta-section.component.html'
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

import { DestroyRef, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { TelegramService } from '../core/telegram/telegram.service';
import { LeadField, SubmitState } from '../core/telegram/telegram.types';

/**
 * Считает контрол невалидным для показа ошибки: только после касания/правки,
 * чтобы пустая форма не подсвечивалась сразу.
 */
export function controlInvalid(form: FormGroup, control: string): boolean {
  const c = form.get(control);
  return !!c && c.invalid && (c.touched || c.dirty);
}

/** Параметры жизненного цикла отправки lead-формы. */
export interface SubmitLeadOptions {
  /** Сигнал состояния формы — обновляется по ходу отправки. */
  state: WritableSignal<SubmitState>;
  /** Реактивная форма (содержит honeypot-поле `website`). */
  form: FormGroup;
  /** Сервис доставки в Telegram. */
  telegram: TelegramService;
  /** Заголовок заявки. */
  title: string;
  /** Источник заявки (путь страницы). */
  source: string;
  /** Построение полей Telegram из «сырого» значения формы. */
  fields: (value: Record<string, unknown>) => LeadField[];
  /** Значение для сброса формы после успешной отправки. */
  resetValue?: unknown;
  /** Для авто-отписки, если компонент уничтожен до ответа Telegram. */
  destroyRef: DestroyRef;
}

/**
 * Единый жизненный цикл отправки lead-формы: защита от повторной отправки,
 * валидация, honeypot и доставка в Telegram с обновлением состояния.
 * Логика общая для всех форм сайта (quote-form, dealers, contacts).
 */
export function submitLead(options: SubmitLeadOptions): void {
  const { state, form, telegram } = options;

  if (state() === 'sending') {
    return;
  }
  if (form.invalid) {
    form.markAllAsTouched();
    return;
  }

  const value = form.getRawValue() as Record<string, unknown>;
  if (value['website']) {
    // Honeypot сработал — молча считаем успехом, бота не уведомляем.
    state.set('success');
    return;
  }

  state.set('sending');
  telegram
    .send({ title: options.title, source: options.source, fields: options.fields(value) })
    .pipe(takeUntilDestroyed(options.destroyRef))
    .subscribe({
      next: () => {
        state.set('success');
        form.reset(options.resetValue);
      },
      error: () => state.set('error')
    });
}

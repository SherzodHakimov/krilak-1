import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { TranslationService } from '../core/i18n/translation.service';
import { TelegramService } from '../core/telegram/telegram.service';
import { LeadField, SubmitState } from '../core/telegram/telegram.types';
import { controlInvalid, submitLead } from './lead-form';
import { LeadFieldDef } from './lead-fields';

/**
 * Schema-driven lead form: builds its FormGroup, layout and Telegram payload
 * from a {@link LeadFieldDef} array. Owns the full submission lifecycle (state,
 * validation, honeypot, delivery) so pages only declare which fields to show.
 */
@Component({
  selector: 'app-lead-form',
  imports: [ReactiveFormsModule, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lead-form.component.html'
})
export class LeadFormComponent {
  /** Поля формы (schema). */
  readonly fields = input.required<LeadFieldDef[]>();
  /** Заголовок Telegram-заявки и метка источника. */
  readonly leadTitle = input.required<string>();
  /** Источник заявки (путь страницы). */
  readonly source = input.required<string>();
  /** Визуальный вариант: `dark` для тёмных секций, `light` для белого фона. */
  readonly variant = input<'dark' | 'light'>('light');
  /** Обрамлять ли форму карточкой (false — «голая» форма, как в конфигураторе). */
  readonly card = input(true);
  /** i18n-ключ подписи кнопки отправки. */
  readonly submitLabelKey = input('cta.submit');
  /** i18n-ключ строки согласия под кнопкой. */
  readonly consentKey = input('cta.consent');
  /** Показывать ли строку согласия. */
  readonly showConsent = input(true);
  /** Доп. вычисляемые Telegram-поля, добавляемые к авто-построенным. */
  readonly extraFields = input<(() => LeadField[]) | null>(null);

  private readonly telegram = inject(TelegramService);
  private readonly i18n = inject(TranslationService);

  readonly state = signal<SubmitState>('idle');

  /** FormGroup, построенный из schema (+ honeypot). Стабилен: схема — константа. */
  readonly form = computed(() => this.buildForm(this.fields()));

  readonly isDark = computed(() => this.variant() === 'dark');
  readonly inputClass = computed(() => (this.isDark() ? 'input-on-dark' : 'input'));
  readonly errorClass = computed(() =>
    this.isDark() ? 'text-xs text-red-400 mt-1' : 'text-xs text-red-500 mt-1'
  );
  readonly formClass = computed(() => {
    if (!this.card()) {
      return 'space-y-4';
    }
    return this.isDark()
      ? 'card !bg-white/[0.04] !shadow-none border border-white/10 backdrop-blur p-8 lg:p-10 space-y-4'
      : 'card border border-brand-fog p-8 lg:p-10 space-y-4';
  });

  invalid(name: string): boolean {
    return controlInvalid(this.form(), name);
  }

  submit(): void {
    submitLead({
      state: this.state,
      form: this.form(),
      telegram: this.telegram,
      title: this.leadTitle(),
      source: this.source(),
      fields: (value) => {
        const built: LeadField[] = this.fields().map((f) => ({
          label: this.i18n.translate(f.labelKey),
          value:
            f.kind === 'select'
              ? this.i18n.translate(this.optionLabelKey(f, value[f.name] as string))
              : (value[f.name] as string)
        }));
        const extra = this.extraFields();
        return extra ? [...built, ...extra()] : built;
      }
    });
  }

  private optionLabelKey(f: LeadFieldDef, value: string): string {
    return f.options?.find((o) => o.value === value)?.labelKey ?? '';
  }

  private buildForm(defs: LeadFieldDef[]): FormGroup {
    const controls: Record<string, FormControl<string>> = {};
    for (const def of defs) {
      const validators = [
        ...(def.required ? [Validators.required] : []),
        ...(def.validators ?? [])
      ];
      controls[def.name] = new FormControl(def.default ?? '', { nonNullable: true, validators });
    }
    // Honeypot — настоящие пользователи не заполняют, боты часто да.
    controls['website'] = new FormControl('', { nonNullable: true });
    return new FormGroup(controls);
  }
}

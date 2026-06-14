import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { TranslationService } from '../core/i18n/translation.service';
import { TelegramService } from '../core/telegram/telegram.service';
import { SubmitState } from '../core/telegram/telegram.types';
import { controlInvalid, submitLead } from './lead-form';

/**
 * Reusable lead form that delivers submissions to Telegram. Dumb-ish: owns its
 * own form state and submission lifecycle, configured via inputs.
 */
@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quote-form.component.html'
})
export class QuoteFormComponent {
  /** Visual variant: `dark` for dark sections, `light` for white backgrounds. */
  readonly variant = input<'dark' | 'light'>('dark');
  /** Title used in the Telegram message and analytics source label. */
  readonly leadTitle = input('Заявка с сайта КРИЛАК');
  readonly source = input('/');

  private readonly fb = inject(FormBuilder);
  private readonly telegram = inject(TelegramService);
  private readonly i18n = inject(TranslationService);

  readonly state = signal<SubmitState>('idle');

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    company: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[+()\d\s-]{6,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    message: [''],
    // Honeypot — real users never fill this; bots often do.
    website: ['']
  });

  get isDark(): boolean {
    return this.variant() === 'dark';
  }

  invalid(control: 'name' | 'phone' | 'email'): boolean {
    return controlInvalid(this.form, control);
  }

  submit(): void {
    const v = this.form.getRawValue();
    submitLead({
      state: this.state,
      form: this.form,
      telegram: this.telegram,
      title: this.leadTitle(),
      source: this.source(),
      fields: () => [
        { label: this.t('cta.name'), value: v.name },
        { label: this.t('cta.company'), value: v.company },
        { label: this.t('cta.phone'), value: v.phone },
        { label: this.t('cta.email'), value: v.email },
        { label: this.t('cta.object'), value: v.message }
      ]
    });
  }

  private t(key: string): string {
    return this.i18n.translate(key);
  }
}

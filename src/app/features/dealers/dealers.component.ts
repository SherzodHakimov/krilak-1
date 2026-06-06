import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { TelegramService } from '../../core/telegram/telegram.service';
import { SubmitState } from '../../core/telegram/telegram.types';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-dealers',
  imports: [ReactiveFormsModule, TranslatePipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dealers.component.html'
})
export class DealersComponent {
  private readonly fb = inject(FormBuilder);
  private readonly telegram = inject(TelegramService);
  private readonly i18n = inject(TranslationService);

  readonly state = signal<SubmitState>('idle');

  readonly regions = [
    'Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск',
    'Нижний Новгород', 'Самара', 'Краснодар', 'Владивосток', 'Другой регион'
  ];

  private readonly benefitsSource = [
    { ru: 'Дилерские цены и прозрачная маржа', en: 'Dealer pricing and transparent margins' },
    { ru: 'Маркетинговая и техническая поддержка', en: 'Marketing and technical support' },
    { ru: 'Обучение и сертификация монтажников', en: 'Installer training and certification' },
    { ru: 'Складская программа и быстрая отгрузка', en: 'Stock program and fast shipping' }
  ];

  readonly benefits = computed(() => {
    const lang = this.i18n.lang();
    return this.benefitsSource.map((b) => b[lang]);
  });

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    company: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[+()\d\s-]{6,}$/)]],
    region: [this.regions[0]],
    terms: ['sales'],
    website: ['']
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('dealers.title')} — КРИЛАК`,
      description: this.i18n.translate('dealers.subtitle'),
      path: '/dealers'
    }));
  }

  invalid(control: 'name' | 'phone'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  private termsLabel(value: string): string {
    if (value === 'service') return this.i18n.translate('dealers.terms_service');
    if (value === 'both') return this.i18n.translate('dealers.terms_both');
    return this.i18n.translate('dealers.terms_sales');
  }

  submit(): void {
    if (this.state() === 'sending') {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    if (v.website) {
      this.state.set('success');
      return;
    }
    this.state.set('sending');
    this.telegram
      .send({
        title: 'KRILAK — заявка на партнёрство',
        source: '/dealers',
        fields: [
          { label: this.i18n.translate('cta.name'), value: v.name },
          { label: this.i18n.translate('cta.company'), value: v.company },
          { label: this.i18n.translate('cta.phone'), value: v.phone },
          { label: this.i18n.translate('dealers.region'), value: v.region },
          { label: this.i18n.translate('dealers.terms'), value: this.termsLabel(v.terms) }
        ]
      })
      .subscribe({
        next: () => {
          this.state.set('success');
          this.form.reset({ region: this.regions[0], terms: 'sales' });
        },
        error: () => this.state.set('error')
      });
  }
}

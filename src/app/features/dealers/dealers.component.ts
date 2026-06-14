import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { TelegramService } from '../../core/telegram/telegram.service';
import { SubmitState } from '../../core/telegram/telegram.types';
import { RevealDirective } from '../../shared/reveal.directive';
import { PageHeroComponent } from '../../shared/page-hero.component';
import { controlInvalid, submitLead } from '../../shared/lead-form';

@Component({
  selector: 'app-dealers',
  imports: [ReactiveFormsModule, TranslatePipe, RevealDirective, PageHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dealers.component.html'
})
export class DealersComponent {
  private readonly fb = inject(FormBuilder);
  private readonly telegram = inject(TelegramService);
  private readonly i18n = inject(TranslationService);

  readonly state = signal<SubmitState>('idle');

  private readonly regionsSource = [
    { ru: 'Москва', en: 'Moscow' },
    { ru: 'Санкт-Петербург', en: 'Saint Petersburg' },
    { ru: 'Казань', en: 'Kazan' },
    { ru: 'Екатеринбург', en: 'Yekaterinburg' },
    { ru: 'Новосибирск', en: 'Novosibirsk' },
    { ru: 'Нижний Новгород', en: 'Nizhny Novgorod' },
    { ru: 'Самара', en: 'Samara' },
    { ru: 'Краснодар', en: 'Krasnodar' },
    { ru: 'Владивосток', en: 'Vladivostok' },
    { ru: 'Другой регион', en: 'Other region' }
  ];
  readonly regions = computed(() => {
    const lang = this.i18n.lang();
    return this.regionsSource.map((r) => r[lang]);
  });

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
    region: [this.regions()[0]],
    terms: ['sales'],
    website: ['']
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('dealers.title')} — ${this.i18n.translate('meta.brand_suffix')}`,
      description: this.i18n.translate('dealers.subtitle'),
      path: '/dealers'
    }));
  }

  invalid(control: 'name' | 'phone'): boolean {
    return controlInvalid(this.form, control);
  }

  private termsLabel(value: string): string {
    if (value === 'service') return this.i18n.translate('dealers.terms_service');
    if (value === 'both') return this.i18n.translate('dealers.terms_both');
    return this.i18n.translate('dealers.terms_sales');
  }

  submit(): void {
    const v = this.form.getRawValue();
    submitLead({
      state: this.state,
      form: this.form,
      telegram: this.telegram,
      title: 'KRILAK — заявка на партнёрство',
      source: '/dealers',
      fields: () => [
        { label: this.i18n.translate('cta.name'), value: v.name },
        { label: this.i18n.translate('cta.company'), value: v.company },
        { label: this.i18n.translate('cta.phone'), value: v.phone },
        { label: this.i18n.translate('dealers.region'), value: v.region },
        { label: this.i18n.translate('dealers.terms'), value: this.termsLabel(v.terms) }
      ],
      resetValue: { region: this.regions()[0], terms: 'sales' }
    });
  }
}

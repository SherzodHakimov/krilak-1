import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { TelegramService } from '../../core/telegram/telegram.service';
import { SubmitState } from '../../core/telegram/telegram.types';
import { RevealDirective } from '../../shared/reveal.directive';
import { BreadcrumbsComponent, Crumb } from '../../shared/breadcrumbs.component';
import { controlInvalid, submitLead } from '../../shared/lead-form';

@Component({
  selector: 'app-contacts',
  imports: [ReactiveFormsModule, TranslatePipe, RevealDirective, BreadcrumbsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly telegram = inject(TelegramService);
  private readonly i18n = inject(TranslationService);

  readonly crumbs: Crumb[] = [{ label: 'nav.home', link: '' }, { label: 'nav.contacts' }];

  readonly state = signal<SubmitState>('idle');
  readonly topics = ['quote', 'tech', 'dealer', 'other'];

  readonly reps = [
    { city: 'Санкт-Петербург', cityEn: 'Saint Petersburg', phone: '+7 (812) 449-00-52', type: 'production' },
    { city: 'Казань', cityEn: 'Kazan', phone: '+7 (843) 220-00-52', type: 'dealer' },
    { city: 'Екатеринбург', cityEn: 'Yekaterinburg', phone: '+7 (343) 384-00-52', type: 'dealer' },
    { city: 'Новосибирск', cityEn: 'Novosibirsk', phone: '+7 (383) 297-00-52', type: 'dealer' }
  ];

  cityName(rep: { city: string; cityEn: string }): string {
    return this.i18n.lang() === 'en' ? rep.cityEn : rep.city;
  }

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    company: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[+()\d\s-]{6,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    topic: ['quote'],
    message: [''],
    website: ['']
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('contacts.title')} — ${this.i18n.translate('meta.brand_suffix')}`,
      description: this.i18n.translate('contacts.subtitle'),
      path: '/contacts'
    }));
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
      title: 'KRILAK — обращение с сайта',
      source: '/contacts',
      fields: () => [
        { label: this.i18n.translate('cta.name'), value: v.name },
        { label: this.i18n.translate('cta.company'), value: v.company },
        { label: this.i18n.translate('cta.phone'), value: v.phone },
        { label: this.i18n.translate('cta.email'), value: v.email },
        { label: this.i18n.translate('contacts.topic'), value: this.i18n.translate('contacts.topics.' + v.topic) },
        { label: this.i18n.translate('cta.object'), value: v.message }
      ],
      resetValue: { topic: 'quote' }
    });
  }
}

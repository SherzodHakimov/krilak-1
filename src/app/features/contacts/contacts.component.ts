import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { useStaticPageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { BreadcrumbsComponent, Crumb } from '../../shared/breadcrumbs.component';
import { LeadFormComponent } from '../../shared/lead-form.component';
import { CONTACT_FIELDS } from '../../shared/lead-fields';

@Component({
  selector: 'app-contacts',
  imports: [TranslatePipe, RevealDirective, BreadcrumbsComponent, LeadFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  private readonly i18n = inject(TranslationService);

  readonly crumbs: Crumb[] = [{ label: 'nav.home', link: '' }, { label: 'nav.contacts' }];

  readonly contactFields = CONTACT_FIELDS;

  readonly reps = [
    { city: 'Санкт-Петербург', cityEn: 'Saint Petersburg', phone: '+7 (812) 449-00-52', type: 'production' },
    { city: 'Казань', cityEn: 'Kazan', phone: '+7 (843) 220-00-52', type: 'dealer' },
    { city: 'Екатеринбург', cityEn: 'Yekaterinburg', phone: '+7 (343) 384-00-52', type: 'dealer' },
    { city: 'Новосибирск', cityEn: 'Novosibirsk', phone: '+7 (383) 297-00-52', type: 'dealer' }
  ];

  cityName(rep: { city: string; cityEn: string }): string {
    return this.i18n.lang() === 'en' ? rep.cityEn : rep.city;
  }

  constructor() {
    useStaticPageSeo('contacts.title', 'contacts.subtitle', '/contacts');
  }
}

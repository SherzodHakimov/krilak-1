import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { useStaticPageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { PageHeroComponent } from '../../shared/page-hero.component';
import { LeadFormComponent } from '../../shared/lead-form.component';
import { DEALER_FIELDS } from '../../shared/lead-fields';

@Component({
  selector: 'app-dealers',
  imports: [TranslatePipe, RevealDirective, PageHeroComponent, LeadFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dealers.component.html'
})
export class DealersComponent {
  private readonly i18n = inject(TranslationService);

  readonly dealerFields = DEALER_FIELDS;

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

  constructor() {
    useStaticPageSeo('dealers.title', 'dealers.subtitle', '/dealers');
  }
}

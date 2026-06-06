import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { CounterDirective } from '../../shared/counter.directive';

interface Milestone {
  year: string;
  text: { ru: string; en: string };
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, CounterDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html'
})
export class AboutComponent {
  private readonly i18n = inject(TranslationService);

  readonly values = ['quality', 'science', 'scale', 'responsibility'];

  private readonly milestones: Milestone[] = [
    { year: '1991', text: { ru: 'Основание ассоциации «КРИЛАК» и первые огнезащитные составы.', en: 'Krilak Association founded; first fire-protection coatings.' } },
    { year: '2001', text: { ru: 'Запуск собственной лаборатории и расширение производства.', en: 'Launch of an in-house laboratory and production expansion.' } },
    { year: '2010', text: { ru: 'Сертификация ISO 9001, выход на объекты федерального уровня.', en: 'ISO 9001 certification; entry into federal-scale projects.' } },
    { year: '2018', text: { ru: 'Огнезащита Лахта Центра — самого высокого здания Европы.', en: 'Fire protection of the Lakhta Center — Europe’s tallest building.' } },
    { year: '2024', text: { ru: 'Огнезащита R240 реакторного зала Ленинградской АЭС.', en: 'R240 protection of the Leningrad NPP reactor hall.' } }
  ];

  readonly timeline = computed(() => {
    const lang = this.i18n.lang();
    return this.milestones.map((m) => ({ year: m.year, text: m.text[lang] }));
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('about.title')} — КРИЛАК`,
      description: this.i18n.translate('about.subtitle'),
      path: '/about'
    }));
  }
}

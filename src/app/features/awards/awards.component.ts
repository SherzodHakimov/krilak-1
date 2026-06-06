import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';

interface Award {
  year: string;
  icon: string;
  title: { ru: string; en: string };
  org: { ru: string; en: string };
}

@Component({
  selector: 'app-awards',
  imports: [TranslatePipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './awards.component.html'
})
export class AwardsComponent {
  private readonly i18n = inject(TranslationService);

  private readonly source: Award[] = [
    { year: '2019', icon: '🏆', title: { ru: 'Лучшая фирма России', en: 'Best company in Russia' }, org: { ru: 'Всероссийский конкурс', en: 'National award' } },
    { year: '2018', icon: '🥇', title: { ru: 'Премия «Бренд года»', en: 'Brand of the Year' }, org: { ru: 'Огнезащита', en: 'Fire protection' } },
    { year: '2017', icon: '⭐', title: { ru: 'Лауреат выставки', en: 'Exhibition laureate' }, org: { ru: 'Всероссийская выставка', en: 'National exhibition' } },
    { year: '2016', icon: '🛡️', title: { ru: 'ISO 9001 ресертификация', en: 'ISO 9001 recertification' }, org: { ru: 'Система качества', en: 'Quality system' } },
    { year: '2015', icon: '📜', title: { ru: 'Лицензия МЧС', en: 'EMERCOM licence' }, org: { ru: 'Бессрочная', en: 'Open-ended' } },
    { year: '2014', icon: '🎖️', title: { ru: 'Знак качества', en: 'Quality mark' }, org: { ru: 'Отраслевой союз', en: 'Industry union' } },
    { year: '2012', icon: '🏅', title: { ru: 'Гран-при «Пожбезопасность»', en: 'Fire-safety Grand Prix' }, org: { ru: 'Международный форум', en: 'International forum' } },
    { year: '2010', icon: '📐', title: { ru: 'Патент на состав', en: 'Coating patent' }, org: { ru: 'Роспатент', en: 'Patent office' } },
    { year: '2008', icon: '🏆', title: { ru: 'Поставщик года', en: 'Supplier of the Year' }, org: { ru: 'Госкорпорация', en: 'State corporation' } },
    { year: '2006', icon: '⭐', title: { ru: 'Золотая медаль', en: 'Gold medal' }, org: { ru: 'Строительная выставка', en: 'Construction expo' } },
    { year: '2002', icon: '📜', title: { ru: 'Сертификат соответствия', en: 'Certificate of conformity' }, org: { ru: 'ГОСТ Р', en: 'GOST R' } },
    { year: '1998', icon: '🎖️', title: { ru: 'Диплом качества', en: 'Quality diploma' }, org: { ru: 'Региональный конкурс', en: 'Regional award' } }
  ];

  readonly awards = computed(() => {
    const lang = this.i18n.lang();
    return this.source.map((a) => ({ year: a.year, icon: a.icon, title: a.title[lang], org: a.org[lang] }));
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('awards.title')} — КРИЛАК`,
      description: this.i18n.translate('awards.subtitle'),
      path: '/awards'
    }));
  }
}

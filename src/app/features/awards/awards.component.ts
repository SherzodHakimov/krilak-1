import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { PageHeroComponent } from '../../shared/page-hero.component';

interface Award {
  year: string;
  icon: string;
  title: { ru: string; en: string };
  org: { ru: string; en: string };
}

// Линейные SVG-иконки (stroke, currentColor) — единый стиль с блоком «Признание» на главной.
const ICON = {
  trophy: 'M8 21h8M12 17v4M6 4h12v5a6 6 0 0 1-12 0V4zM6 6H3v1a3 3 0 0 0 3 3m12-4h3v1a3 3 0 0 1-3 3',
  medal: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 13.5 7 22l5-3 5 3-1.5-8.5',
  star: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z',
  shield: 'M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4',
  certificate: 'M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zM14 3v4h4M9 12h6M9 16h4'
} as const;

@Component({
  selector: 'app-awards',
  imports: [RevealDirective, PageHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './awards.component.html'
})
export class AwardsComponent {
  private readonly i18n = inject(TranslationService);

  private readonly source: Award[] = [
    { year: '2019', icon: ICON.trophy, title: { ru: 'Лучшая фирма России', en: 'Best company in Russia' }, org: { ru: 'Всероссийский конкурс', en: 'National award' } },
    { year: '2018', icon: ICON.medal, title: { ru: 'Премия «Бренд года»', en: 'Brand of the Year' }, org: { ru: 'Огнезащита', en: 'Fire protection' } },
    { year: '2017', icon: ICON.star, title: { ru: 'Лауреат выставки', en: 'Exhibition laureate' }, org: { ru: 'Всероссийская выставка', en: 'National exhibition' } },
    { year: '2016', icon: ICON.shield, title: { ru: 'ISO 9001 ресертификация', en: 'ISO 9001 recertification' }, org: { ru: 'Система качества', en: 'Quality system' } },
    { year: '2015', icon: ICON.certificate, title: { ru: 'Лицензия МЧС', en: 'EMERCOM licence' }, org: { ru: 'Бессрочная', en: 'Open-ended' } },
    { year: '2014', icon: ICON.shield, title: { ru: 'Знак качества', en: 'Quality mark' }, org: { ru: 'Отраслевой союз', en: 'Industry union' } },
    { year: '2012', icon: ICON.trophy, title: { ru: 'Гран-при «Пожбезопасность»', en: 'Fire-safety Grand Prix' }, org: { ru: 'Международный форум', en: 'International forum' } },
    { year: '2010', icon: ICON.certificate, title: { ru: 'Патент на состав', en: 'Coating patent' }, org: { ru: 'Роспатент', en: 'Patent office' } },
    { year: '2008', icon: ICON.trophy, title: { ru: 'Поставщик года', en: 'Supplier of the Year' }, org: { ru: 'Госкорпорация', en: 'State corporation' } },
    { year: '2006', icon: ICON.medal, title: { ru: 'Золотая медаль', en: 'Gold medal' }, org: { ru: 'Строительная выставка', en: 'Construction expo' } },
    { year: '2002', icon: ICON.certificate, title: { ru: 'Сертификат соответствия', en: 'Certificate of conformity' }, org: { ru: 'ГОСТ Р', en: 'GOST R' } },
    { year: '1998', icon: ICON.medal, title: { ru: 'Диплом качества', en: 'Quality diploma' }, org: { ru: 'Региональный конкурс', en: 'Regional award' } }
  ];

  readonly awards = computed(() => {
    const lang = this.i18n.lang();
    return this.source.map((a) => ({ year: a.year, icon: a.icon, title: a.title[lang], org: a.org[lang] }));
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('awards.title')} — ${this.i18n.translate('meta.brand_suffix')}`,
      description: this.i18n.translate('awards.subtitle'),
      path: '/awards'
    }));
  }
}

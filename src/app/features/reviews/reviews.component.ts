import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { PageHeroComponent } from '../../shared/page-hero.component';

interface Review {
  author: { ru: string; en: string };
  role: { ru: string; en: string };
  text: { ru: string; en: string };
}

@Component({
  selector: 'app-reviews',
  imports: [RevealDirective, PageHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent {
  private readonly i18n = inject(TranslationService);

  private readonly source: Review[] = [
    {
      author: { ru: 'Главный инженер проекта', en: 'Lead project engineer' },
      role: { ru: 'Генподрядчик, дата-центр', en: 'General contractor, data centre' },
      text: {
        ru: 'КрилаК закрыл всю огнезащиту дата-центра: газовое пожаротушение, ранние датчики и двери EI60. Сроки и документация — без замечаний.',
        en: 'Krilak covered the entire data-centre fire protection: gas suppression, early detection and EI60 doors. Timeline and documentation — flawless.'
      }
    },
    {
      author: { ru: 'Руководитель проектного отдела', en: 'Head of design department' },
      role: { ru: 'Проектный институт', en: 'Design institute' },
      text: {
        ru: 'Полный комплект ТУ и паспортов, грамотный расчёт расхода. Конфигуратор экономит часы работы на подбор системы.',
        en: 'A full set of datasheets and certificates, accurate consumption calculation. The configurator saves hours on system selection.'
      }
    },
    {
      author: { ru: 'Директор по эксплуатации', en: 'Operations director' },
      role: { ru: 'Торгово-развлекательный центр', en: 'Shopping & entertainment centre' },
      text: {
        ru: 'Огнезащита металлоконструкций и противопожарные двери смонтированы в срок, прошли приёмку надзора с первого раза.',
        en: 'Steel fire protection and fire doors were installed on schedule and passed regulatory acceptance on the first attempt.'
      }
    },
    {
      author: { ru: 'Снабженец', en: 'Procurement manager' },
      role: { ru: 'Энергетическая компания', en: 'Energy company' },
      text: {
        ru: 'Прозрачные цены, быстрые КП и поставка по всей стране. Удобно работать с одним производителем по всему спектру.',
        en: 'Transparent pricing, fast quotes and nationwide delivery. Convenient to work with a single producer across the whole range.'
      }
    }
  ];

  readonly reviews = computed(() => {
    const lang = this.i18n.lang();
    return this.source.map((r) => ({ author: r.author[lang], role: r.role[lang], text: r.text[lang] }));
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('reviews.title')} — ${this.i18n.translate('meta.brand_suffix')}`,
      description: this.i18n.translate('reviews.subtitle'),
      path: '/reviews'
    }));
  }
}

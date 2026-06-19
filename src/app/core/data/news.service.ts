import { Injectable, inject } from '@angular/core';
import { Lang, LangText } from '../i18n/locale';
import { TranslationService } from '../i18n/translation.service';

/** Цветовой акцент карточки статьи. */
export type NewsAccent = 'leaf' | 'steel' | 'amber';

export interface Article {
  slug: string;
  date: string;
  category: LangText;
  accent: NewsAccent;
  title: LangText;
  excerpt: LangText;
  body: { ru: string[]; en: string[] };
}

export interface LocalizedArticle {
  slug: string;
  date: string;
  category: string;
  accent: NewsAccent;
  title: string;
  excerpt: string;
  body: string[];
}

const ARTICLES: Article[] = [
  {
    slug: 'sp-2-13130-2026',
    date: '2026-05-22',
    accent: 'leaf',
    category: { ru: 'Норматив', en: 'Regulation' },
    title: {
      ru: 'Изменения СП 2.13130 в 2026 году: что нужно знать проектировщику',
      en: 'Changes to SP 2.13130 in 2026: what designers need to know'
    },
    excerpt: {
      ru: 'Разбираем поправки к нормативам пожарной безопасности зданий и сооружений и их влияние на выбор огнезащиты.',
      en: 'A breakdown of the updates to building fire-safety codes and how they affect fire-protection choices.'
    },
    body: {
      ru: [
        'В 2026 году вступают в силу поправки к своду правил СП 2.13130, регулирующему обеспечение огнестойкости объектов защиты.',
        'Ключевое изменение касается требований к пределам огнестойкости несущих конструкций в зданиях повышенной этажности и уточняет методики расчёта приведённой толщины металла.',
        'Для проектировщиков это означает более точный подбор системы огнезащиты под фактическую геометрию конструкций. Конфигуратор КрилаК учитывает обновлённые коэффициенты и помогает подобрать состав за минуту.'
      ],
      en: [
        'In 2026, amendments to the SP 2.13130 code of practice — which governs the fire resistance of protected structures — come into force.',
        'The key change concerns fire-resistance requirements for load-bearing structures in high-rise buildings and refines the methods for calculating the reduced metal thickness.',
        'For designers this means more precise selection of a fire-protection system for the actual geometry of the structures. The Krilak configurator already accounts for the updated coefficients and helps pick a coating in under a minute.'
      ]
    }
  },
  {
    slug: 'reactor-hall-12-weeks',
    date: '2026-05-14',
    accent: 'steel',
    category: { ru: 'Кейс', en: 'Case study' },
    title: {
      ru: 'Как мы защитили 4 200 м² реакторного зала за 12 недель',
      en: 'How we protected 4,200 m² of a reactor hall in 12 weeks'
    },
    excerpt: {
      ru: 'Технология нанесения КрилаК-СУПЕР на сложные металлоконструкции АЭС в сжатые сроки.',
      en: 'The technology behind applying Krilak-SUPER to complex nuclear-plant steel on a tight schedule.'
    },
    body: {
      ru: [
        'Огнезащита реакторного зала Ленинградской АЭС потребовала достижения предела R240 на металлоконструкциях сложной геометрии.',
        'Команда применила состав КрилаК-СУПЕР с контролем толщины каждого слоя и круглосуточным графиком работ.',
        'Результат — 4 200 м² защищённых конструкций за 12 недель без остановки смежных работ и с полным пакетом исполнительной документации.'
      ],
      en: [
        'Protecting the reactor hall of the Leningrad NPP required achieving an R240 rating on steel with complex geometry.',
        'The team applied the Krilak-SUPER coating with per-layer thickness control and a round-the-clock work schedule.',
        'The result: 4,200 m² of protected structures in 12 weeks, with no disruption to adjacent works and a full set of as-built documentation.'
      ]
    }
  },
  {
    slug: 'vesda-gas-suppression-data-centres',
    date: '2026-05-02',
    accent: 'amber',
    category: { ru: 'Технология', en: 'Technology' },
    title: {
      ru: 'VESDA + газовое пожаротушение для дата-центров: гайд',
      en: 'VESDA + gas suppression for data centres: a guide'
    },
    excerpt: {
      ru: 'Архитектура раннего обнаружения и тушения для серверных площадей от 500 м².',
      en: 'Early-detection and suppression architecture for server halls from 500 m².'
    },
    body: {
      ru: [
        'Дата-центры предъявляют особые требования: тушение без воды, минимальный простой и раннее обнаружение задымления.',
        'Связка аспирационных датчиков VESDA и газового пожаротушения Novec-1230 позволяет обнаружить возгорание на ранней стадии и потушить его без вреда для оборудования.',
        'В проекте дата-центра «Калининский» мы разделили площадь на 32 зоны защиты с независимым управлением и огнезащитными дверями EI60.'
      ],
      en: [
        'Data centres have special requirements: water-free suppression, minimal downtime and early smoke detection.',
        'Combining VESDA aspirating detectors with Novec-1230 gas suppression detects a fire at an early stage and extinguishes it without harming equipment.',
        'For the Kalininsky data centre we split the floor area into 32 independently controlled protection zones with EI60 fire doors.'
      ]
    }
  },
  {
    slug: 'cable-penetrations-ei180',
    date: '2026-04-18',
    accent: 'leaf',
    category: { ru: 'Технология', en: 'Technology' },
    title: {
      ru: 'Кабельные проходки EI180: как избежать типовых ошибок монтажа',
      en: 'EI180 cable penetrations: avoiding common installation mistakes'
    },
    excerpt: {
      ru: 'Чек-лист по монтажу терморасширяющихся муфт и герметизации проходок в противопожарных преградах.',
      en: 'A checklist for installing intumescent couplings and sealing penetrations in fire barriers.'
    },
    body: {
      ru: [
        'Проходки инженерных коммуникаций — одно из самых уязвимых мест противопожарной защиты здания.',
        'Мы собрали чек-лист: правильный подбор муфты под диаметр трубы, контроль зазоров и применение терморасширяющихся составов.',
        'Соблюдение технологии обеспечивает предел EI180 и проходит приёмку надзорных органов с первого раза.'
      ],
      en: [
        'Service penetrations are one of the most vulnerable points of a building’s fire protection.',
        'We put together a checklist: correct coupling selection for the pipe diameter, gap control and the use of intumescent compounds.',
        'Following the technology delivers an EI180 rating and passes regulatory acceptance on the first attempt.'
      ]
    }
  }
];

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly i18n = inject(TranslationService);

  all(): LocalizedArticle[] {
    const lang = this.i18n.lang();
    return ARTICLES.map((a) => this.localize(a, lang));
  }

  bySlug(slug: string): LocalizedArticle | undefined {
    const found = ARTICLES.find((a) => a.slug === slug);
    return found ? this.localize(found, this.i18n.lang()) : undefined;
  }

  /** Article slugs, for prerendering parameterized routes. */
  static slugs(): string[] {
    return ARTICLES.map((a) => a.slug);
  }

  private localize(a: Article, lang: Lang): LocalizedArticle {
    return {
      slug: a.slug,
      date: a.date,
      accent: a.accent,
      category: a.category[lang],
      title: a.title[lang],
      excerpt: a.excerpt[lang],
      body: a.body[lang]
    };
  }
}

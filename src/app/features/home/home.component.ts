import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  afterNextRender,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService } from '../../core/seo/seo.service';
import { organizationSchema, websiteSchema } from '../../core/seo/structured-data';
import { CatalogService } from '../../core/data/catalog.service';
import { ProjectsService } from '../../core/data/projects.service';
import { NewsService } from '../../core/data/news.service';
import { PROJECT_PHOTOS, NEWS_PHOTOS } from '../../core/data/photos';
import { newsGradientClass, newsPillClass } from '../../core/data/news-accent';
import { RevealDirective } from '../../shared/reveal.directive';
import { CounterDirective } from '../../shared/counter.directive';
import { CtaSectionComponent } from '../../shared/cta-section.component';
import { DmyDatePipe } from '../../shared/dmy-date.pipe';
import { GeoMapComponent } from './geo-map.component';
import { ConfiguratorService } from '../configurator/configurator.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    TranslatePipe,
    LocalizePathPipe,
    RevealDirective,
    CounterDirective,
    CtaSectionComponent,
    DmyDatePipe,
    GeoMapComponent,
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private readonly i18n = inject(TranslationService);
  private readonly seo = inject(SeoService);
  private readonly catalog = inject(CatalogService);
  private readonly projectsSvc = inject(ProjectsService);
  private readonly newsSvc = inject(NewsService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly configuratorSvc = inject(ConfiguratorService);

  // Мини-конфигуратор (шаг 1 «Тип объекта») прямо в блоке на главной.
  readonly objectTypes = this.configuratorSvc.objectTypes;
  readonly selectedObject = signal<string | null>(null);
  objectIcon(id: string): string {
    return this.configuratorSvc.objectIcon(id);
  }

  // --- Временная отладочная панель для блока «Решения по отраслям» ---
  readonly showGradient = signal(true);
  readonly showPhoto = signal(true);
  readonly solutionsInView = signal(false);

  // --- Временная отладочная панель для блока «Реализованные объекты» ---
  readonly projShowGradient = signal(true);
  readonly projShowPhoto = signal(true);
  readonly projInView = signal(false);

  // --- Временная отладочная панель для блока «Экспертный блог» ---
  readonly newsShowGradient = signal(true);
  readonly newsShowPhoto = signal(true);
  readonly newsInView = signal(false);

  readonly categories = computed(() => this.catalog.categories());
  // Линейные SVG-иконки категорий каталога (единый стиль с конфигуратором/наградами).
  private readonly categoryIcons: Record<string, string> = {
    compounds: 'M4 5h11v5H4zM15 7h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-7M9 11v3a2 2 0 0 0-2 2v4h3v-4',
    doors: 'M6 3h11a1 1 0 0 1 1 1v17H6zM4 21h15M13 12v2',
    panels: 'M3 5h18v3.5H3zM3 10.5h18v3.5H3zM3 16h18v3.5H3z',
    couplings: 'M2 10h7v4H2zM15 10h7v4h-7M9 8h2v8H9zM13 8h2v8h-2M11 12h2',
    cabinets: 'M5 3h14v18H5zM12 3v18M9 8v3M15 8v3'
  };
  categoryIcon(slug: string): string {
    return this.categoryIcons[slug] ?? 'M4 4h7v7H4zM13 4h7v7h-7M4 13h7v7H4zM13 13h7v7h-7';
  }
  readonly projects = computed(() =>
    this.projectsSvc
      .all()
      .slice(0, 3)
      .map((p) => ({ ...p, photo: PROJECT_PHOTOS[p.slug] ?? '' }))
  );
  readonly latestNews = computed(() =>
    this.newsSvc
      .all()
      .slice(0, 3)
      .map((a) => ({ ...a, photo: NEWS_PHOTOS[a.slug] ?? '' }))
  );
  readonly newsGradient = newsGradientClass;
  readonly newsPill = newsPillClass;

  readonly roles = [
    { key: 'designer', icon: 'M3 12 12 3l9 9M5 10v11h14V10', link: '/solutions' },
    { key: 'supplier', icon: 'M3 7h18l-2 12H5L3 7zM8 7V5a4 4 0 1 1 8 0v2', link: '/dealers' },
    { key: 'installer', icon: 'M14 7l3 3-7 7-3-3 7-7zm0 0 5-5 3 3-5 5', link: '/services' },
    { key: 'owner', icon: 'M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z', link: '/about' }
  ];

  // Линейные SVG-иконки (stroke, currentColor) вместо эмодзи — единый стиль с блоком «роли».
  readonly awards = [
    { y: '2019', key: 'a2019', icon: 'M8 21h8M12 17v4M6 4h12v5a6 6 0 0 1-12 0V4zM6 6H3v1a3 3 0 0 0 3 3m12-4h3v1a3 3 0 0 1-3 3' },
    { y: '2018', key: 'a2018', icon: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 13.5 7 22l5-3 5 3-1.5-8.5' },
    { y: '2017', key: 'a2017', icon: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z' },
    { y: '2016', key: 'a2016', icon: 'M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4' },
    { y: '2015', key: 'a2015', icon: 'M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zM14 3v4h4M9 12h6M9 16h4' }
  ];

  // photo — Unsplash photo id; адаптивный URL строит appImageLoader.
  readonly solutions = [
    { key: 'energy', badge: 'R240 · EI180', gradient: 'from-brand-graphite to-brand-steel/40', n: '01', photo: 'photo-1610028290816-5d937a395a49' },
    { key: 'transport', badge: 'EI120 · СОУЭ', gradient: 'from-brand-leaf to-brand-moss', n: '02', photo: 'photo-1532105956626-9569c03602f6' },
    { key: 'retail', badge: 'МР · ППБ', gradient: 'from-brand-amber to-brand-leaf', n: '03', photo: 'photo-1519567241046-7f570eee3ce6' },
    { key: 'industry', badge: 'R90 · ЛВЖ', gradient: 'from-brand-steel to-brand-graphite', n: '04', photo: 'photo-1553413077-190dd305871c' },
    { key: 'data', badge: 'Газовое · VESDA', gradient: 'from-emerald-700 to-brand-graphite', n: '05', photo: 'photo-1584169417032-d34e8d805e8b' },
    { key: 'housing', badge: 'К0 · СНиП', gradient: 'from-brand-ink to-brand-leaf/60', n: '06', photo: 'photo-1460317442991-0ec209397118' }
  ];

  readonly clients = [
    'РОСАТОМ', 'ГАЗПРОМ', 'МЕТРОСТРОЙ', 'РЖД', 'ЛУКОЙЛ',
    'РОСНЕФТЬ', 'ИНТЕР РАО', 'МОСИНЖПРОЕКТ', 'SBI', 'КРОКУС'
  ];

  constructor() {
    effect(() => {
      this.i18n.lang();
      this.seo.update({
        title: this.i18n.translate('meta.title'),
        description: this.i18n.translate('meta.description'),
        path: ''
      });
      const url = this.seoUrl();
      this.seo.setJsonLd('organization', organizationSchema(url, this.i18n.translate('meta.description')));
      this.seo.setJsonLd('website', websiteSchema(url));
    });

    // Показываем отладочные панели только когда соответствующий блок в зоне видимости.
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }
      const observe = (selector: string, target: typeof this.solutionsInView) => {
        const el = this.host.nativeElement.querySelector(selector);
        if (!el) {
          return;
        }
        const observer = new IntersectionObserver(
          (entries) => {
            // zone.js не патчит IntersectionObserver — возвращаем выполнение
            // в зону Angular, иначе сигнал обновится без перерисовки.
            this.zone.run(() => {
              for (const entry of entries) {
                target.set(entry.isIntersecting);
              }
            });
          },
          { threshold: 0.15 }
        );
        observer.observe(el);
      };
      observe('[data-solutions-section]', this.solutionsInView);
      observe('[data-projects-section]', this.projInView);
      observe('[data-news-section]', this.newsInView);
    });
  }

  private seoUrl(): string {
    return `https://krilak.ru/${this.i18n.lang()}`;
  }
}

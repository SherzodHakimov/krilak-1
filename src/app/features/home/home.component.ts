import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService } from '../../core/seo/seo.service';
import { CatalogService } from '../../core/data/catalog.service';
import { ProjectsService } from '../../core/data/projects.service';
import { NewsService } from '../../core/data/news.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { CounterDirective } from '../../shared/counter.directive';
import { QuoteFormComponent } from '../../shared/quote-form.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    TranslatePipe,
    LocalizePathPipe,
    RevealDirective,
    CounterDirective,
    QuoteFormComponent
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

  readonly categories = computed(() => this.catalog.categories());
  readonly projects = computed(() => this.projectsSvc.all().slice(0, 3));
  readonly latestNews = computed(() => this.newsSvc.all().slice(0, 3));

  readonly roles = [
    { key: 'designer', icon: 'M3 12 12 3l9 9M5 10v11h14V10', link: '/solutions' },
    { key: 'supplier', icon: 'M3 7h18l-2 12H5L3 7zM8 7V5a4 4 0 1 1 8 0v2', link: '/dealers' },
    { key: 'installer', icon: 'M14 7l3 3-7 7-3-3 7-7zm0 0 5-5 3 3-5 5', link: '/services' },
    { key: 'owner', icon: 'M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z', link: '/about' }
  ];

  readonly awards = [
    { y: '2019', i: '🏆', key: 'a2019' },
    { y: '2018', i: '🥇', key: 'a2018' },
    { y: '2017', i: '⭐', key: 'a2017' },
    { y: '2016', i: '🛡️', key: 'a2016' },
    { y: '2015', i: '📜', key: 'a2015' }
  ];

  readonly solutions = [
    { key: 'energy', badge: 'R240 · EI180', gradient: 'from-brand-graphite to-brand-steel/40', n: '01' },
    { key: 'transport', badge: 'EI120 · СОУЭ', gradient: 'from-brand-leaf to-brand-moss', n: '02' },
    { key: 'retail', badge: 'МР · ППБ', gradient: 'from-brand-amber to-brand-leaf', n: '03' },
    { key: 'industry', badge: 'R90 · ЛВЖ', gradient: 'from-brand-steel to-brand-graphite', n: '04' },
    { key: 'data', badge: 'Газовое · VESDA', gradient: 'from-emerald-700 to-brand-graphite', n: '05' },
    { key: 'housing', badge: 'К0 · СНиП', gradient: 'from-brand-ink to-brand-leaf/60', n: '06' }
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
      this.seo.setJsonLd('organization', {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'KRILAK',
        url: this.seoUrl(),
        description: this.i18n.translate('meta.description'),
        foundingDate: '1991',
        areaServed: 'RU'
      });
    });
  }

  private seoUrl(): string {
    return `https://krilak.ru/${this.i18n.lang()}`;
  }
}

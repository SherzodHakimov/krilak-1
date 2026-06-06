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

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { NewsService } from '../../core/data/news.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { DmyDatePipe } from '../../shared/dmy-date.pipe';
import { PageHeroComponent } from '../../shared/page-hero.component';

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

// Фото для карточек экспертного блога (по slug статьи) — единый стиль с главной.
const NEWS_PHOTOS: Record<string, string> = {
  'sp-2-13130-2026': unsplash('photo-1503387762-592deb58ef4e'),
  'reactor-hall-12-weeks': unsplash('photo-1527335988388-b40ee248d80c'),
  'vesda-gas-suppression-data-centres': unsplash('photo-1573164713988-8665fc963095'),
  'cable-penetrations-ei180': unsplash('photo-1558494949-ef010cbdcc31')
};

@Component({
  selector: 'app-news-list',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, DmyDatePipe, PageHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './news-list.component.html'
})
export class NewsListComponent {
  private readonly newsSvc = inject(NewsService);
  private readonly i18n = inject(TranslationService);

  readonly articles = computed(() =>
    this.newsSvc.all().map((a) => ({ ...a, photo: NEWS_PHOTOS[a.slug] ?? '' }))
  );

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('news.title')} — ${this.i18n.translate('meta.brand_suffix')}`,
      description: this.i18n.translate('news.subtitle'),
      path: '/news'
    }));
  }
}

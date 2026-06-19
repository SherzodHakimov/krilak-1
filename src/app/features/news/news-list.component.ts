import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { useStaticPageSeo } from '../../core/seo/page-seo';
import { NewsService } from '../../core/data/news.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { DmyDatePipe } from '../../shared/dmy-date.pipe';
import { PageHeroComponent } from '../../shared/page-hero.component';

// Unsplash photo ids для карточек блога (по slug статьи). URL строит appImageLoader.
const NEWS_PHOTOS: Record<string, string> = {
  'sp-2-13130-2026': 'photo-1503387762-592deb58ef4e',
  'reactor-hall-12-weeks': 'photo-1527335988388-b40ee248d80c',
  'vesda-gas-suppression-data-centres': 'photo-1573164713988-8665fc963095',
  'cable-penetrations-ei180': 'photo-1558494949-ef010cbdcc31'
};

@Component({
  selector: 'app-news-list',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, DmyDatePipe, PageHeroComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './news-list.component.html'
})
export class NewsListComponent {
  private readonly newsSvc = inject(NewsService);

  readonly articles = computed(() =>
    this.newsSvc.all().map((a) => ({ ...a, photo: NEWS_PHOTOS[a.slug] ?? '' }))
  );

  constructor() {
    useStaticPageSeo('news.title', 'news.subtitle', '/news');
  }
}

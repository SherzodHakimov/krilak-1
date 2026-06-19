import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { useStaticPageSeo } from '../../core/seo/page-seo';
import { NewsService } from '../../core/data/news.service';
import { NEWS_PHOTOS } from '../../core/data/photos';
import { newsGradientClass, newsPillClass } from '../../core/data/news-accent';
import { RevealDirective } from '../../shared/reveal.directive';
import { DmyDatePipe } from '../../shared/dmy-date.pipe';
import { PageHeroComponent } from '../../shared/page-hero.component';
import { pageCrumbs } from '../../shared/breadcrumbs.component';

@Component({
  selector: 'app-news-list',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, DmyDatePipe, PageHeroComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './news-list.component.html'
})
export class NewsListComponent {
  private readonly newsSvc = inject(NewsService);

  readonly crumbs = pageCrumbs('footer.news');
  readonly newsGradient = newsGradientClass;
  readonly newsPill = newsPillClass;
  readonly articles = computed(() =>
    this.newsSvc.all().map((a) => ({ ...a, photo: NEWS_PHOTOS[a.slug] ?? '' }))
  );

  constructor() {
    useStaticPageSeo('news.title', 'news.subtitle', '/news');
  }
}

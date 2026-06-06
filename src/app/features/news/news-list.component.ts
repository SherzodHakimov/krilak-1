import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { NewsService } from '../../core/data/news.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-news-list',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './news-list.component.html'
})
export class NewsListComponent {
  private readonly newsSvc = inject(NewsService);
  private readonly i18n = inject(TranslationService);

  readonly articles = computed(() => this.newsSvc.all());

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('news.title')} — КРИЛАК`,
      description: this.i18n.translate('news.subtitle'),
      path: '/news'
    }));
  }
}

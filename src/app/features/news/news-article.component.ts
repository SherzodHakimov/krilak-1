import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { NewsService } from '../../core/data/news.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-news-article',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './news-article.component.html'
})
export class NewsArticleComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly newsSvc = inject(NewsService);
  private readonly i18n = inject(TranslationService);

  readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: this.route.snapshot.paramMap.get('slug') ?? ''
  });

  readonly article = computed(() => this.newsSvc.bySlug(this.slug()));

  constructor() {
    usePageSeo(() => {
      const a = this.article();
      return {
        title: a ? `${a.title} — КРИЛАК` : `${this.i18n.translate('news.title')} — КРИЛАК`,
        description: a?.excerpt ?? this.i18n.translate('news.subtitle'),
        path: `/news/${this.slug()}`,
        type: 'article'
      };
    });
  }
}

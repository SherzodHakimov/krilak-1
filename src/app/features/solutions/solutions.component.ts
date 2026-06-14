import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { CtaSectionComponent } from '../../shared/cta-section.component';

@Component({
  selector: 'app-solutions',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, CtaSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solutions.component.html'
})
export class SolutionsComponent {
  private readonly i18n = inject(TranslationService);

  readonly items = [
    { key: 'energy', icon: '⚡', badge: 'R180 · R240', bullets: ['p1', 'p2', 'p3'] },
    { key: 'transport', icon: '🚇', badge: 'EI120 · СОУЭ', bullets: ['p1', 'p2', 'p3'] },
    { key: 'retail', icon: '🏙️', badge: 'МР · ППБ', bullets: ['p1', 'p2', 'p3'] },
    { key: 'industry', icon: '🏭', badge: 'R90 · ЛВЖ', bullets: [] as string[] },
    { key: 'data', icon: '🖥️', badge: 'Газовое · VESDA', bullets: [] as string[] },
    { key: 'housing', icon: '🏘️', badge: 'К0 · СНиП', bullets: [] as string[] }
  ];

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('solutions.title')} — ${this.i18n.translate('meta.brand_suffix')}`,
      description: this.i18n.translate('solutions.subtitle'),
      path: '/solutions'
    }));
  }
}

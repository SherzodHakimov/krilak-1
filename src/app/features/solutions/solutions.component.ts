import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { QuoteFormComponent } from '../../shared/quote-form.component';

@Component({
  selector: 'app-solutions',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, QuoteFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solutions.component.html'
})
export class SolutionsComponent {
  private readonly i18n = inject(TranslationService);

  readonly items = [
    { key: 'energy', badge: 'R240 · EI180', gradient: 'from-brand-graphite to-brand-steel/40', n: '01' },
    { key: 'transport', badge: 'EI120 · СОУЭ', gradient: 'from-brand-leaf to-brand-moss', n: '02' },
    { key: 'retail', badge: 'МР · ППБ', gradient: 'from-brand-amber to-brand-leaf', n: '03' },
    { key: 'industry', badge: 'R90 · ЛВЖ', gradient: 'from-brand-steel to-brand-graphite', n: '04' },
    { key: 'data', badge: 'Газовое · VESDA', gradient: 'from-emerald-700 to-brand-graphite', n: '05' },
    { key: 'housing', badge: 'К0 · СНиП', gradient: 'from-brand-ink to-brand-leaf/60', n: '06' }
  ];

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('solutions.title')} — КРИЛАК`,
      description: this.i18n.translate('solutions.subtitle'),
      path: '/solutions'
    }));
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { QuoteFormComponent } from '../../shared/quote-form.component';

@Component({
  selector: 'app-services',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, QuoteFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  private readonly i18n = inject(TranslationService);

  readonly items = [
    { key: 'design', icon: '📊', n: '01' },
    { key: 'supply', icon: '🚚', n: '02' },
    { key: 'install', icon: '🔧', n: '03' },
    { key: 'audit', icon: '🔎', n: '04' },
    { key: 'training', icon: '🎓', n: '05' },
    { key: 'service', icon: '🛠️', n: '06' }
  ];

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('services.title')} — КРИЛАК`,
      description: this.i18n.translate('services.subtitle'),
      path: '/services'
    }));
  }
}

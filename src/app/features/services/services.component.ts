import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-services',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  private readonly i18n = inject(TranslationService);

  readonly items = [
    { key: 'design', icon: '✎' },
    { key: 'supply', icon: '▦' },
    { key: 'install', icon: '⚒' },
    { key: 'audit', icon: '◎' },
    { key: 'training', icon: '✦' },
    { key: 'service', icon: '⟳' }
  ];

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('services.title')} — КРИЛАК`,
      description: this.i18n.translate('services.subtitle'),
      path: '/services'
    }));
  }
}

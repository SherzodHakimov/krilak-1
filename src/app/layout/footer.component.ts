import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../core/i18n/localize-path.pipe';
import { TranslationService } from '../core/i18n/translation.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  private readonly i18n = inject(TranslationService);
  /** Буквы названия бренда — раскладываются по ширине (flex), чтобы тянуться под префикс на любом языке. */
  readonly brandNameChars = computed(() => [...this.i18n.translate('brand.name')]);

  readonly companyLinks = [
    { path: '/about', key: 'nav.about' },
    { path: '/awards', key: 'awards.title' },
    { path: '/reviews', key: 'footer.reviews' },
    { path: '/projects', key: 'nav.projects' },
    { path: '/news', key: 'footer.news' }
  ];

  readonly partnerLinks = [
    { path: '/dealers', key: 'footer.dealers' },
    { path: '/configurator', key: 'nav.configurator' }
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { useStaticPageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { CtaSectionComponent } from '../../shared/cta-section.component';
import { BreadcrumbsComponent, pageCrumbs } from '../../shared/breadcrumbs.component';

@Component({
  selector: 'app-services',
  imports: [TranslatePipe, RevealDirective, CtaSectionComponent, BreadcrumbsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  readonly crumbs = pageCrumbs('nav.services');

  // Линейные SVG-иконки (stroke, currentColor) вместо эмодзи — единый стиль карточек.
  readonly items = [
    { key: 'design', n: '01', icon: 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z' },
    { key: 'supply', n: '02', icon: 'M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
    { key: 'install', n: '03', icon: 'M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.9 2.9-2.5-2.5 2.9-2.9z' },
    { key: 'audit', n: '04', icon: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35' },
    { key: 'training', n: '05', icon: 'M22 10 12 5 2 10l10 5 10-5zM6 12v5c0 1.5 12 1.5 12 0v-5M22 10v6' },
    { key: 'service', n: '06', icon: 'M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4' }
  ];

  constructor() {
    useStaticPageSeo('services.title', 'services.subtitle', '/services');
  }
}

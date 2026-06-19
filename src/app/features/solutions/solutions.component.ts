import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { useStaticPageSeo } from '../../core/seo/page-seo';
import { RevealDirective } from '../../shared/reveal.directive';
import { CtaSectionComponent } from '../../shared/cta-section.component';
import { BreadcrumbsComponent, pageCrumbs } from '../../shared/breadcrumbs.component';

@Component({
  selector: 'app-solutions',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, CtaSectionComponent, BreadcrumbsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solutions.component.html'
})
export class SolutionsComponent {
  readonly crumbs = pageCrumbs('nav.solutions');

  // Линейные SVG-иконки (stroke, currentColor) вместо эмодзи — единый стиль карточек.
  readonly items = [
    { key: 'energy', icon: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z', badge: 'R180 · R240', bullets: ['p1', 'p2', 'p3'] },
    { key: 'transport', icon: 'M8 4h8a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM5 12h14M9 21l1.5-3M15 21l-1.5-3M9 8h6', badge: 'EI120 · СОУЭ', bullets: ['p1', 'p2', 'p3'] },
    { key: 'retail', icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 9h.01M9 13h.01M15 9h.01M15 13h.01', badge: 'МР · ППБ', bullets: ['p1', 'p2', 'p3'] },
    { key: 'industry', icon: 'M3 21V10l6 4V10l6 4V10l6 4v7zM3 21h18M8 17h2M14 17h2', badge: 'R90 · ЛВЖ', bullets: [] as string[] },
    { key: 'data', icon: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01M12 7h6M12 17h6', badge: 'Газовое · VESDA', bullets: [] as string[] },
    { key: 'housing', icon: 'M3 12 12 3l9 9M5 10v11h14V10', badge: 'К0 · СНиП', bullets: [] as string[] }
  ];

  constructor() {
    useStaticPageSeo('solutions.title', 'solutions.subtitle', '/solutions');
  }
}

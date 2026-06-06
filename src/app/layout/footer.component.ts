import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../core/i18n/localize-path.pipe';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly productLinks = [
    { path: '/catalog/category/compounds', key: 'categories.items.compounds.title' },
    { path: '/catalog/category/doors', key: 'categories.items.doors.title' },
    { path: '/catalog/category/panels', key: 'categories.items.panels.title' },
    { path: '/catalog/category/alarms', key: 'categories.items.alarms.title' },
    { path: '/catalog/category/extinguishers', key: 'categories.items.extinguishers.title' }
  ];

  readonly companyLinks = [
    { path: '/about', key: 'nav.about' },
    { path: '/awards', key: 'awards.title' },
    { path: '/reviews', key: 'footer.reviews' },
    { path: '/projects', key: 'nav.projects' },
    { path: '/news', key: 'footer.news' }
  ];

  readonly partnerLinks = [
    { path: '/dealers', key: 'footer.dealers' },
    { path: '/dealers', key: 'footer.tenders' },
    { path: '/contacts', key: 'footer.documents' },
    { path: '/configurator', key: 'nav.configurator' }
  ];
}

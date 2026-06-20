import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { useStaticPageSeo } from '../../core/seo/page-seo';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
  constructor() {
    useStaticPageSeo('notfound.title', 'notfound.subtitle', '/404');
  }
}

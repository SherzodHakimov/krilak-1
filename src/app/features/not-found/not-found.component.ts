import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { useStaticPageSeo } from '../../core/seo/page-seo';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section min-h-[60vh] grid place-items-center">
      <div class="container-x text-center">
        <div class="text-display-xl font-display font-bold text-brand-leaf/20">404</div>
        <h1 class="text-display-md mt-2 text-balance">{{ 'notfound.title' | t }}</h1>
        <p class="mt-4 text-lg text-brand-ink/70">{{ 'notfound.subtitle' | t }}</p>
        <a [routerLink]="'' | loc" class="btn-primary mt-8">{{ 'notfound.home' | t }}</a>
      </div>
    </section>
  `
})
export class NotFoundComponent {
  constructor() {
    useStaticPageSeo('notfound.title', 'notfound.subtitle', '/404');
  }
}

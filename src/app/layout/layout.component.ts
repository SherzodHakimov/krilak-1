import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../core/i18n/translation.service';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { ChatWidgetComponent } from './chat-widget.component';

/**
 * App shell. Reads the `:lang` route segment and sets the active locale BEFORE
 * any page renders (synchronously in the constructor), so prerendered HTML is
 * already translated. Also reacts to locale changes during client navigation.
 */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatWidgetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-chat-widget />
  `
})
export class LayoutComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly i18n = inject(TranslationService);

  constructor() {
    this.i18n.setLang(this.route.snapshot.paramMap.get('lang'));
    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => this.i18n.setLang(params.get('lang')));
  }
}

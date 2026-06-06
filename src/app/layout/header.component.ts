import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../core/i18n/localize-path.pipe';
import { LOCALES, Lang } from '../core/i18n/locale';
import { TranslationService } from '../core/i18n/translation.service';

interface NavLink {
  path: string;
  key: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly i18n = inject(TranslationService);

  readonly locales = LOCALES;
  readonly scrolled = signal(false);
  readonly hidden = signal(false);
  readonly progress = signal(0);
  readonly menuOpen = signal(false);
  readonly dropdownOpen = signal(false);
  readonly currentUrl = signal(this.router.url);

  readonly navLinks: NavLink[] = [
    { path: '/solutions', key: 'nav.solutions' },
    { path: '/services', key: 'nav.services' },
    { path: '/projects', key: 'nav.projects' },
    { path: '/about', key: 'nav.about' },
    { path: '/contacts', key: 'nav.contacts' }
  ];

  readonly productLinks = [
    { path: '/catalog/category/compounds', icon: '▣', key: 'categories.items.compounds' },
    { path: '/catalog/category/doors', icon: '▥', key: 'categories.items.doors' },
    { path: '/catalog/category/panels', icon: '▤', key: 'categories.items.panels' },
    { path: '/catalog/category/alarms', icon: '◉', key: 'categories.items.alarms' }
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((e) => {
        this.currentUrl.set(e.urlAfterRedirects);
        this.menuOpen.set(false);
        this.dropdownOpen.set(false);
      });

    afterNextRender(() => {
      const onScroll = () => {
        const y = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.progress.set(docHeight > 0 ? (y / docHeight) * 100 : 0);
        this.scrolled.set(y > 12);
        this.hidden.set(y > 320 && y > this.lastY);
        this.lastY = y;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    });
  }

  private lastY = 0;

  get isEn(): boolean {
    return this.i18n.lang() === 'en';
  }

  langActive(lang: Lang): boolean {
    return this.i18n.lang() === lang;
  }

  /** Current path rebuilt under a different locale, preserving the route. */
  langUrl(lang: Lang): string {
    const rest = this.currentUrl().replace(/^\/(ru|en)(?=\/|$)/, '');
    return `/${lang}${rest || ''}`;
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  toggleDropdown(): void {
    this.dropdownOpen.update((v) => !v);
  }
}

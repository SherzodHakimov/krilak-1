import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../core/i18n/localize-path.pipe';
import { LOCALES, Lang } from '../core/i18n/locale';
import { TranslationService } from '../core/i18n/translation.service';
import { CatalogService } from '../core/data/catalog.service';

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
  private readonly catalog = inject(CatalogService);

  /** Категории каталога для выпадающего списка «Продукция». */
  readonly categories = computed(() => this.catalog.categories());

  /** Реальное число товаров по слагу категории (по факту, а не из products_count). */
  readonly productCounts = computed(() => this.catalog.productCounts());

  readonly locales = LOCALES;
  /** Буквы названия бренда — раскладываются по ширине (flex), чтобы тянуться под префикс на любом языке. */
  readonly brandNameChars = computed(() => [...this.i18n.translate('brand.name')]);
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

  private dropdownTimer: ReturnType<typeof setTimeout> | null = null;

  openDropdown(): void {
    if (this.dropdownTimer) {
      clearTimeout(this.dropdownTimer);
      this.dropdownTimer = null;
    }
    this.dropdownOpen.set(true);
  }

  closeDropdownDelayed(): void {
    this.dropdownTimer = setTimeout(() => this.dropdownOpen.set(false), 120);
  }
}

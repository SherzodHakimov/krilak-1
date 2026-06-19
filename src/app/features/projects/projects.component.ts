import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { ProjectsService } from '../../core/data/projects.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { CtaSectionComponent } from '../../shared/cta-section.component';
import { BreadcrumbsComponent, Crumb } from '../../shared/breadcrumbs.component';

// Unsplash photo ids для карточек объектов (по slug). URL строит appImageLoader.
// Карточка показывает фото поверх градиента; при отсутствии фото остаётся градиент.
const PROJECT_PHOTOS: Record<string, string> = {
  'leningrad-npp-7': 'photo-1630142895963-6996ae6b3a5b',
  'bkl-9-stations': 'photo-1610605941775-ffbeb8c589ba',
  'kalininsky-dc': 'photo-1695668548342-c0c1ad479aee',
  'lakhta-center': 'photo-1429497419816-9ca5cfb4571a',
  'kazan-arena': 'photo-1459865264687-595d652de67e',
  'moscow-city': 'photo-1512453979798-5ea266f8880c',
  'sheremetyevo-c': 'photo-1715927134295-6b1016e28414',
  'novosibirsk-metro': 'photo-1567402838980-757099545bc1',
  'rosseti-volga': 'photo-1613421633868-24fdb1b07d15',
  'vladivostok-bridge': 'photo-1512187849-463fdb898f21',
  'ekb-koltsovo': 'photo-1542296332-2e4473faf563',
  'norilsk-pgmk': 'photo-1717386255773-1e3037c81788'
};

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, RevealDirective, CtaSectionComponent, BreadcrumbsComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  private readonly projectsSvc = inject(ProjectsService);
  private readonly i18n = inject(TranslationService);

  readonly crumbs: Crumb[] = [{ label: 'nav.home', link: '' }, { label: 'nav.projects' }];

  readonly industries = this.projectsSvc.industries();
  readonly activeIndustry = signal<string>('all');
  readonly total = this.projectsSvc.all().length;

  area(value: number): string {
    return value.toLocaleString('ru-RU');
  }

  readonly projects = computed(() => {
    const all = this.projectsSvc.all().map((p) => ({ ...p, photo: PROJECT_PHOTOS[p.slug] ?? '' }));
    const filter = this.activeIndustry();
    return filter === 'all' ? all : all.filter((p) => p.industry === filter);
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('projects.title')} — ${this.i18n.translate('meta.brand_suffix')}`,
      description: this.i18n.translate('projects.subtitle'),
      path: '/projects'
    }));
  }

  setFilter(id: string): void {
    this.activeIndustry.set(id);
  }
}

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { useStaticPageSeo } from '../../core/seo/page-seo';
import { ProjectsService } from '../../core/data/projects.service';
import { PROJECT_PHOTOS } from '../../core/data/photos';
import { RevealDirective } from '../../shared/reveal.directive';
import { CtaSectionComponent } from '../../shared/cta-section.component';
import { BreadcrumbsComponent, Crumb } from '../../shared/breadcrumbs.component';

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, RevealDirective, CtaSectionComponent, BreadcrumbsComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  private readonly projectsSvc = inject(ProjectsService);

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
    useStaticPageSeo('projects.title', 'projects.subtitle', '/projects');
  }

  setFilter(id: string): void {
    this.activeIndustry.set(id);
  }
}

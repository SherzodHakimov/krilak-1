import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { ProjectsService } from '../../core/data/projects.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  private readonly projectsSvc = inject(ProjectsService);
  private readonly i18n = inject(TranslationService);

  readonly industries = this.projectsSvc.industries();
  readonly activeIndustry = signal<string>('all');

  readonly projects = computed(() => {
    const all = this.projectsSvc.all();
    const filter = this.activeIndustry();
    return filter === 'all' ? all : all.filter((p) => p.industry === filter);
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('projects.title')} — КРИЛАК`,
      description: this.i18n.translate('projects.subtitle'),
      path: '/projects'
    }));
  }

  setFilter(id: string): void {
    this.activeIndustry.set(id);
  }
}

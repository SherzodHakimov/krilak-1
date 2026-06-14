import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { ProjectsService } from '../../core/data/projects.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { CtaSectionComponent } from '../../shared/cta-section.component';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe, RevealDirective, CtaSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  private readonly projectsSvc = inject(ProjectsService);
  private readonly i18n = inject(TranslationService);

  readonly industries = this.projectsSvc.industries();
  readonly activeIndustry = signal<string>('all');
  readonly total = this.projectsSvc.all().length;

  area(value: number): string {
    return value.toLocaleString('ru-RU');
  }

  readonly projects = computed(() => {
    const all = this.projectsSvc.all();
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

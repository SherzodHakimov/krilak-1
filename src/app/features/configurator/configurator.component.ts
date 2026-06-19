import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { useStaticPageSeo } from '../../core/seo/page-seo';
import { LeadField } from '../../core/telegram/telegram.types';
import { ConfiguratorService } from './configurator.service';
import { BreadcrumbsComponent, Crumb } from '../../shared/breadcrumbs.component';
import { LeadFormComponent } from '../../shared/lead-form.component';
import { CONFIGURATOR_FIELDS } from '../../shared/lead-fields';

@Component({
  selector: 'app-configurator',
  imports: [RouterLink, DecimalPipe, TranslatePipe, LocalizePathPipe, BreadcrumbsComponent, LeadFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './configurator.component.html'
})
export class ConfiguratorComponent {
  private readonly configurator = inject(ConfiguratorService);
  private readonly i18n = inject(TranslationService);
  private readonly route = inject(ActivatedRoute);

  readonly crumbs: Crumb[] = [{ label: 'nav.home', link: '' }, { label: 'nav.configurator' }];

  readonly objectTypes = this.configurator.objectTypes;
  readonly structures = this.configurator.structures;
  readonly conditions = this.configurator.conditions;

  readonly step = signal(1);
  readonly objectType = signal('');
  readonly structure = signal('');
  readonly rating = signal('');
  readonly conditionId = signal('indoor');
  readonly area = signal<number | null>(null);

  readonly configuratorFields = CONFIGURATOR_FIELDS;

  readonly progress = computed(() => (this.step() / 5) * 100);

  readonly availableRatings = computed(() =>
    this.structure() ? this.configurator.ratingsFor(this.structure()) : this.configurator.ratings
  );

  readonly recommendation = computed(() => {
    if (this.step() < 5 || !this.structure() || !this.rating()) {
      return null;
    }
    return this.configurator.recommend({
      objectType: this.objectType(),
      structure: this.structure(),
      rating: this.rating(),
      conditions: this.conditionId(),
      area: this.area() ?? 0
    });
  });

  constructor() {
    useStaticPageSeo('configurator_block.title', 'configurator_block.subtitle', '/configurator');

    // Предвыбор типа объекта с главной (?object=…): пропускаем шаг 1.
    const preset = this.route.snapshot.queryParamMap.get('object');
    if (preset && this.configurator.objectTypes.some((o) => o.id === preset)) {
      this.objectType.set(preset);
      this.step.set(2);
    }
  }

  canAdvance(): boolean {
    switch (this.step()) {
      case 1:
        return !!this.objectType();
      case 2:
        return !!this.structure();
      case 3:
        return !!this.rating();
      case 4:
        return (this.area() ?? 0) > 0;
      default:
        return true;
    }
  }

  next(): void {
    if (this.canAdvance() && this.step() < 5) {
      this.step.update((s) => s + 1);
    }
  }

  prev(): void {
    if (this.step() > 1) {
      this.step.update((s) => s - 1);
    }
  }

  selectObjectType(id: string): void {
    this.objectType.set(id);
    this.next();
  }

  selectStructure(id: string): void {
    this.structure.set(id);
    this.rating.set('');
    this.next();
  }

  selectRating(rating: string): void {
    this.rating.set(rating);
    this.next();
  }

  onArea(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.area.set(Number.isFinite(value) ? value : null);
  }

  /** Вычисляемые поля заявки (расчёт из мастера) — добавляются к контактным. */
  readonly buildLeadExtras = (): LeadField[] => {
    const rec = this.recommendation();
    return [
      { label: this.i18n.translate('configurator_block.step_1'), value: this.objectTypeName() },
      { label: this.i18n.translate('configurator_block.step_2'), value: this.structureName() },
      { label: this.i18n.translate('configurator_block.step_3'), value: this.rating() },
      { label: this.i18n.translate('configurator_block.step_4'), value: `${this.area() ?? ''} м² · ${this.conditionName()}` },
      { label: 'SKU', value: rec?.sku },
      { label: this.i18n.translate('configurator_block.step_5'), value: rec ? `${rec.name} · ≈ ${rec.estimate.toLocaleString('ru-RU')} ₽` : '' }
    ];
  };

  structureName(): string {
    return this.configurator.structureById(this.structure())?.name ?? this.structure();
  }

  objectTypeName(): string {
    return this.configurator.objectTypes.find((o) => o.id === this.objectType())?.name ?? this.objectType();
  }

  objectIcon(id: string): string {
    return this.configurator.objectIcon(id);
  }

  structureIcon(id: string): string {
    return this.configurator.structureIcon(id);
  }

  conditionIcon(id: string): string {
    return this.configurator.conditionIcon(id);
  }

  conditionName(): string {
    return this.configurator.conditions.find((c) => c.id === this.conditionId())?.name ?? this.conditionId();
  }
}

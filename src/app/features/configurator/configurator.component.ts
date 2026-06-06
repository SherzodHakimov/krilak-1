import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../../core/i18n/localize-path.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { usePageSeo } from '../../core/seo/page-seo';
import { TelegramService } from '../../core/telegram/telegram.service';
import { SubmitState } from '../../core/telegram/telegram.types';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'app-configurator',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe, TranslatePipe, LocalizePathPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './configurator.component.html'
})
export class ConfiguratorComponent {
  private readonly configurator = inject(ConfiguratorService);
  private readonly telegram = inject(TelegramService);
  private readonly i18n = inject(TranslationService);
  private readonly fb = inject(FormBuilder);

  readonly objectTypes = this.configurator.objectTypes;
  readonly structures = this.configurator.structures;
  readonly conditions = this.configurator.conditions;

  readonly step = signal(1);
  readonly objectType = signal('');
  readonly structure = signal('');
  readonly rating = signal('');
  readonly conditionId = signal('indoor');
  readonly area = signal<number | null>(null);
  readonly state = signal<SubmitState>('idle');

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

  readonly leadForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[+()\d\s-]{6,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    website: ['']
  });

  constructor() {
    usePageSeo(() => ({
      title: `${this.i18n.translate('configurator_block.title')} — КРИЛАК`,
      description: this.i18n.translate('configurator_block.subtitle'),
      path: '/configurator'
    }));
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

  invalid(control: 'name' | 'phone' | 'email'): boolean {
    const c = this.leadForm.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  submitLead(): void {
    if (this.state() === 'sending') {
      return;
    }
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }
    const v = this.leadForm.getRawValue();
    if (v.website) {
      this.state.set('success');
      return;
    }
    const rec = this.recommendation();
    this.state.set('sending');
    this.telegram
      .send({
        title: 'KRILAK — заявка из конфигуратора',
        source: '/configurator',
        fields: [
          { label: this.i18n.translate('cta.name'), value: v.name },
          { label: this.i18n.translate('cta.phone'), value: v.phone },
          { label: this.i18n.translate('cta.email'), value: v.email },
          { label: this.i18n.translate('configurator_block.step_2'), value: this.structureName() },
          { label: this.i18n.translate('configurator_block.step_4'), value: this.rating() },
          { label: this.i18n.translate('configurator_block.step_3'), value: this.area() ?? '' },
          { label: 'SKU', value: rec?.sku },
          { label: this.i18n.translate('configurator_block.step_5'), value: rec ? `${rec.name} · ≈ ${rec.estimate.toLocaleString('ru-RU')} ₽` : '' }
        ]
      })
      .subscribe({
        next: () => this.state.set('success'),
        error: () => this.state.set('error')
      });
  }

  structureName(): string {
    return this.configurator.structureById(this.structure())?.name ?? this.structure();
  }
}

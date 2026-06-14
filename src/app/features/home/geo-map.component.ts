import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { OKRUG_GEO, OKRUG_VIEWBOX } from '../../shared/geo-okruga.data';

interface OkrugInfo {
  ru: string;
  en: string;
  count: number;
}

/**
 * Интерактивная карта России по 8 федеральным округам (блок «География работы»).
 * Геометрия — `geo-okruga.data.ts` (jVectorMap, Miller, субъекты сгруппированы в ФО).
 * Заливка — хороплет по числу объектов; при наведении округ всплывает поверх и
 * увеличивается, рядом — карточка с названием и счётчиком. Переходов по клику нет.
 */
@Component({
  selector: 'app-geo-map',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './geo-map.component.html',
  styles: [
    `
      .okrug { cursor: pointer; transition: fill 0.2s ease; }
      .okrug-count {
        font-size: 12px;
        font-weight: 700;
        fill: #0f1620;
        paint-order: stroke;
        stroke: #fff;
        stroke-width: 2.5px;
        stroke-linejoin: round;
        pointer-events: none;
      }
      .okrug-count--hidden { opacity: 0; }
      .okrug-count--active { fill: #fff; stroke: #3d7a1d; stroke-width: 0.8px; font-size: 13px; }
      .okrug-active {
        transform-box: fill-box;
        transform-origin: center;
        filter: drop-shadow(0 6px 14px rgba(15, 22, 32, 0.35));
        animation: okrugGrow 0.25s ease-out forwards;
        pointer-events: none;
      }
      @keyframes okrugGrow {
        from { transform: scale(1); }
        to { transform: scale(1.07); }
      }
    `
  ]
})
export class GeoMapComponent {
  private readonly i18n = inject(TranslationService);
  readonly viewBox = OKRUG_VIEWBOX;
  readonly active = signal<string | null>(null);

  private readonly info: Record<string, OkrugInfo> = {
    central: { ru: 'Центральный ФО', en: 'Central FD', count: 2100 },
    northwest: { ru: 'Северо-Западный ФО', en: 'Northwestern FD', count: 1250 },
    volga: { ru: 'Приволжский ФО', en: 'Volga FD', count: 1100 },
    ural: { ru: 'Уральский ФО', en: 'Ural FD', count: 780 },
    siberia: { ru: 'Сибирский ФО', en: 'Siberian FD', count: 720 },
    south: { ru: 'Южный ФО', en: 'Southern FD', count: 540 },
    caucasus: { ru: 'Северо-Кавказский ФО', en: 'North Caucasian FD', count: 300 },
    fareast: { ru: 'Дальневосточный ФО', en: 'Far Eastern FD', count: 410 }
  };

  /** Сплошной хороплет-цвет (светло-зелёный → тёмный мох) по доле объектов. */
  private color(pct: number): string {
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
    return `rgb(${lerp(206, 61, pct)},${lerp(231, 122, pct)},${lerp(178, 29, pct)})`;
  }

  readonly districts = computed(() => {
    const en = this.i18n.lang() === 'en';
    const max = Math.max(...Object.values(this.info).map((d) => d.count));
    return OKRUG_GEO.map((g) => {
      const i = this.info[g.id];
      const pct = i.count / max;
      return {
        id: g.id,
        d: g.d,
        cx: g.cx,
        cy: g.cy,
        name: en ? i.en : i.ru,
        countLabel: i.count.toLocaleString(en ? 'en-US' : 'ru-RU'),
        fill: this.color(pct),
        leftPct: (g.cx / 900) * 100,
        topPct: (g.cy / 345) * 100
      };
    });
  });

  readonly activeDistrict = computed(() => this.districts().find((d) => d.id === this.active()) ?? null);
}

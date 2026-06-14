import { Injectable } from '@angular/core';
import { MatrixData, MatrixOption, MatrixRow } from '../../core/data/matrix.types';
import matrixRaw from '../../core/data/raw/matrix.json';

export interface ConfiguratorAnswers {
  objectType: string;
  structure: string;
  rating: string;
  conditions: string;
  area: number;
}

export interface Recommendation {
  sku: string;
  name: string;
  consumption: number;
  consumptionUnit: string;
  totalConsumption: number;
  pricePerUnit: number;
  estimate: number;
}

/**
 * Client-side product recommendation engine. Pure lookup over the bundled
 * matrix — no backend, no DOM, no HTTP — so it runs anywhere and is trivially
 * testable.
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorService {
  private readonly data = matrixRaw as unknown as MatrixData;

  get objectTypes(): MatrixOption[] {
    return this.data.objectTypes;
  }
  get structures(): MatrixOption[] {
    return this.data.structures;
  }
  get ratings(): string[] {
    return this.data.ratings;
  }
  get conditions(): MatrixOption[] {
    return this.data.conditions;
  }

  structureById(id: string): MatrixOption | undefined {
    return this.data.structures.find((s) => s.id === id);
  }

  /** Линейные SVG-иконки типов объекта (stroke, viewBox 0 0 24 24) — единый стиль вместо эмодзи. */
  private readonly objectIcons: Record<string, string> = {
    industrial: 'M3 21h18M5 21V11l5 3V11l5 3V9l5 3v6M8 7V4h2v3',
    civic: 'M3 21h18M5 21V4h10v17M15 21V9h4v12M8 8h.01M12 8h.01M8 12h.01M12 12h.01M8 16h.01M12 16h.01',
    infra: 'M4 21V12a8 8 0 0 1 16 0v9M4 21h16M9 21v-5a3 3 0 0 1 6 0v5',
    housing: 'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9.5 21v-6h5v6'
  };

  objectIcon(id: string): string {
    return this.objectIcons[id] ?? '';
  }

  /** Линейные SVG-иконки типов конструкций. */
  private readonly structureIcons: Record<string, string> = {
    steel: 'M5 5h14M5 19h14M12 5v14',
    concrete: 'M4 5h16v14H4zM4 10h16M4 15h16M10 5v5M16 10v5M10 15v4',
    wood: 'M12 3l4 6h-2.5l3.5 5h-2.5l3 4H6.5l3-4H7l3.5-5H8zM12 22v-4',
    cable: 'M6 3v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v6M4 3h4M16 21h4',
    duct: 'M3 7h5v5a4 4 0 0 0 4 4h9M3 7v5h5M16 14l3 2-3 2',
    penetration: 'M5 3v18M5 9h6M5 15h6M11 7h5v10h-5zM16 12h4'
  };

  structureIcon(id: string): string {
    return this.structureIcons[id] ?? '';
  }

  /** Линейные SVG-иконки условий эксплуатации. */
  private readonly conditionIcons: Record<string, string> = {
    indoor: 'M4 11l8-6 8 6M6 10v9h12v-9M10 19v-5h4v5',
    outdoor: 'M7 16a4 4 0 0 1 0-8 5 5 0 0 1 9.5 1.5A3.5 3.5 0 0 1 17 16zM8 19l-1 2M12 19l-1 2M16 19l-1 2',
    aggressive: 'M9 3h6M10 3v5l-4.5 9A2 2 0 0 0 7.5 20h9a2 2 0 0 0 1.8-3l-4.3-9V3M8 13h8'
  };

  conditionIcon(id: string): string {
    return this.conditionIcons[id] ?? '';
  }

  /** Ratings available for a given structure, narrowing the wizard choices. */
  ratingsFor(structure: string): string[] {
    const available = new Set(
      this.data.matrix.filter((r) => r.structure === structure).map((r) => r.rating)
    );
    return this.data.ratings.filter((r) => available.has(r));
  }

  /**
   * Find the best matrix row for the answers and compute an estimate. Falls
   * back to the closest row for the structure when the exact rating/condition
   * combination is not tabulated.
   */
  recommend(answers: ConfiguratorAnswers): Recommendation | null {
    const candidates = this.data.matrix.filter((r) => r.structure === answers.structure);
    if (candidates.length === 0) {
      return null;
    }

    const exact = candidates.find(
      (r) => r.rating === answers.rating && r.conditions.includes(answers.conditions)
    );
    const byRating = candidates.find((r) => r.rating === answers.rating);
    const row: MatrixRow = exact ?? byRating ?? candidates[candidates.length - 1];

    const area = Number.isFinite(answers.area) && answers.area > 0 ? answers.area : 0;
    const totalConsumption = row.consumption * area;
    const estimate = totalConsumption * row.price_per_unit;

    return {
      sku: row.sku,
      name: row.name,
      consumption: row.consumption,
      consumptionUnit: row.consumption_unit,
      totalConsumption: Math.round(totalConsumption * 10) / 10,
      pricePerUnit: row.price_per_unit,
      estimate: Math.round(estimate)
    };
  }
}

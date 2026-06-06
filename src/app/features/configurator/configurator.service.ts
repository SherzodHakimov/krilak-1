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

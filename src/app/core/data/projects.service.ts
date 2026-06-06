import { Injectable } from '@angular/core';
import projectsRaw from './raw/projects.json';

export interface Project {
  slug: string;
  name: string;
  year: number;
  city: string;
  region: string;
  industry: string;
  industryLabel: string;
  rating: string;
  products: string[];
  area: number;
  summary: string;
  color: string;
}

interface RawProject {
  slug: string;
  name: string;
  year: number;
  lat: number;
  lng: number;
  city: string;
  region: string;
  industry: string;
  industry_label: string;
  rating: string;
  products: string[];
  area: number;
  summary: string;
  color: string;
}

interface RawProjects {
  projects: RawProject[];
}

/** Read-only access to the bundled projects dataset (cards only, no map). */
@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly raw = projectsRaw as unknown as RawProjects;

  all(): Project[] {
    return this.raw.projects.map((p) => ({
      slug: p.slug,
      name: p.name,
      year: p.year,
      city: p.city,
      region: p.region,
      industry: p.industry,
      industryLabel: p.industry_label,
      rating: p.rating,
      products: p.products,
      area: p.area,
      summary: p.summary,
      color: p.color
    }));
  }

  /** Distinct industries, for filter chips. */
  industries(): { id: string; label: string }[] {
    const map = new Map<string, string>();
    for (const p of this.raw.projects) {
      if (!map.has(p.industry)) {
        map.set(p.industry, p.industry_label);
      }
    }
    return [...map.entries()].map(([id, label]) => ({ id, label }));
  }
}

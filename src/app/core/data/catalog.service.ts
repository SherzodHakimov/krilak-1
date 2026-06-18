import { Injectable, inject } from '@angular/core';
import { TranslationService } from '../i18n/translation.service';
import { Category, Product, ProductDocument } from './catalog.types';
import catalogRaw from './raw/catalog.json';

interface RawCategory {
  slug: string;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  icon: string;
  color: string;
  products_count: number;
}

interface RawProduct {
  sku: string;
  slug: string;
  category: string;
  name: string;
  subtitle: string;
  rating?: string[];
  consumption?: string;
  color?: string;
  tags?: string[];
  featured?: boolean;
  description: string;
  specs?: Record<string, string>;
  documents?: ProductDocument[];
  images?: string[];
}

interface RawCatalog {
  categories: RawCategory[];
  products: RawProduct[];
}

/**
 * Read-only access to the bundled product catalog. The data is static, so it
 * is imported at build time (available synchronously during prerendering)
 * rather than fetched. Category text is localized to the active locale; product
 * names are technical brand names kept as-is.
 */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly i18n = inject(TranslationService);
  private readonly raw = catalogRaw as unknown as RawCatalog;

  categories(): Category[] {
    const en = this.i18n.lang() === 'en';
    return this.raw.categories.map((c) => ({
      slug: c.slug,
      name: en ? c.name_en : c.name,
      description: en ? c.description_en : c.description,
      icon: c.icon,
      color: c.color,
      productsCount: c.products_count
    }));
  }

  /** Category slugs, for prerendering parameterized routes. */
  static categorySlugs(): string[] {
    return (catalogRaw as unknown as RawCatalog).categories.map((c) => c.slug);
  }

  /** Product SKUs, for prerendering parameterized routes. */
  static productSkus(): string[] {
    return (catalogRaw as unknown as RawCatalog).products.map((p) => p.sku);
  }

  products(): Product[] {
    return this.raw.products.map((p) => this.mapProduct(p));
  }

  featured(): Product[] {
    return this.products().filter((p) => p.featured);
  }

  categoryBySlug(slug: string): Category | undefined {
    return this.categories().find((c) => c.slug === slug);
  }

  productBySku(sku: string): Product | undefined {
    const found = this.raw.products.find((p) => p.sku === sku);
    return found ? this.mapProduct(found) : undefined;
  }

  productsByCategory(slug: string): Product[] {
    return this.products().filter((p) => p.category === slug);
  }

  private mapProduct(p: RawProduct): Product {
    return {
      sku: p.sku,
      slug: p.slug,
      category: p.category,
      name: p.name,
      subtitle: p.subtitle,
      rating: p.rating ?? [],
      consumption: p.consumption,
      color: p.color,
      tags: p.tags ?? [],
      featured: p.featured ?? false,
      description: p.description,
      specs: p.specs ?? {},
      documents: p.documents ?? [],
      images: p.images ?? []
    };
  }
}

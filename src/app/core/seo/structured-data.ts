/**
 * Pure builders for JSON-LD structured data. They return plain schema objects;
 * injection into <head> is done by SeoService.setJsonLd. Keep these in sync with
 * the visible page content (Google penalises mismatched structured data).
 */

const BRAND = 'KRILAK';

/** Organization schema for the home page. */
export function organizationSchema(url: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    url,
    description,
    foundingDate: '1991',
    areaServed: 'RU'
  };
}

/** WebSite schema for the home page. */
export function websiteSchema(url: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND,
    url
  };
}

/** Product schema for a catalog product page. No price/offers — leads are quote-based. */
export function productSchema(p: {
  name: string;
  description: string;
  sku: string;
  url: string;
  image?: string;
  category?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    sku: p.sku,
    url: p.url,
    brand: { '@type': 'Brand', name: BRAND },
    ...(p.image ? { image: p.image } : {}),
    ...(p.category ? { category: p.category } : {})
  };
}

/** BreadcrumbList schema from ordered items; the last (current) item may omit its url. */
export function breadcrumbSchema(items: { name: string; url?: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {})
    }))
  };
}

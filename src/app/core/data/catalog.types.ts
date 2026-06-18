export interface ProductDocument {
  name: string;
  type: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  productsCount: number;
}

export interface Product {
  sku: string;
  slug: string;
  category: string;
  name: string;
  subtitle: string;
  rating: string[];
  consumption?: string;
  color?: string;
  tags: string[];
  featured: boolean;
  description: string;
  specs: Record<string, string>;
  documents: ProductDocument[];
  images: string[];
}

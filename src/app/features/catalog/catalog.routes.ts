import { Routes } from '@angular/router';

export const CATALOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./catalog-index.component').then((m) => m.CatalogIndexComponent)
  },
  {
    path: 'category/:slug',
    loadComponent: () => import('./category.component').then((m) => m.CategoryComponent)
  },
  {
    path: 'product/:sku',
    loadComponent: () => import('./product.component').then((m) => m.ProductComponent)
  }
];

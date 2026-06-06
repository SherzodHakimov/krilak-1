import { RenderMode, ServerRoute } from '@angular/ssr';
import { LOCALES } from './core/i18n/locale';
import { CatalogService } from './core/data/catalog.service';
import { NewsService } from './core/data/news.service';

/**
 * Every route is prerendered (SSG). Because all paths sit under the `:lang`
 * param, each route supplies `getPrerenderParams` to enumerate the locales —
 * and the data-driven routes also enumerate slugs/SKUs from the bundled JSON.
 */

const langs = async () => LOCALES.map((lang) => ({ lang }));

const langCategories = async () =>
  LOCALES.flatMap((lang) => CatalogService.categorySlugs().map((slug) => ({ lang, slug })));

const langProducts = async () =>
  LOCALES.flatMap((lang) => CatalogService.productSkus().map((sku) => ({ lang, sku })));

const langNews = async () =>
  LOCALES.flatMap((lang) => NewsService.slugs().map((slug) => ({ lang, slug })));

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/catalog', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  {
    path: ':lang/catalog/category/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: langCategories
  },
  {
    path: ':lang/catalog/product/:sku',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: langProducts
  },
  { path: ':lang/solutions', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/services', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/projects', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/configurator', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/dealers', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/about', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/awards', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/reviews', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/news', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  { path: ':lang/news/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: langNews },
  { path: ':lang/contacts', renderMode: RenderMode.Prerender, getPrerenderParams: langs },
  {
    path: ':lang/**',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => LOCALES.map((lang) => ({ lang, '**': '404' }))
  },
  { path: '**', renderMode: RenderMode.Prerender }
];

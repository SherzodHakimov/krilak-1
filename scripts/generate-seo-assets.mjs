// Generates public/robots.txt and public/sitemap.xml from the bundled data.
// Run with: node scripts/generate-seo-assets.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const SITE = 'https://krilak.ru';
const LOCALES = ['ru', 'en'];

const catalog = JSON.parse(
  readFileSync(resolve(root, 'src/app/core/data/raw/catalog.json'), 'utf8').replace(/^﻿/, '')
);

// News slugs mirror NewsService (kept in sync manually — small, stable set).
const newsSlugs = [
  'sp-2-13130-2026',
  'reactor-hall-12-weeks',
  'vesda-gas-suppression-data-centres',
  'cable-penetrations-ei180'
];

const staticPaths = [
  '',
  'catalog',
  'solutions',
  'services',
  'projects',
  'configurator',
  'dealers',
  'about',
  'awards',
  'reviews',
  'news',
  'contacts'
];

const paths = [
  ...staticPaths,
  ...catalog.categories.map((c) => `catalog/category/${c.slug}`),
  ...catalog.products.map((p) => `catalog/product/${p.sku}`),
  ...newsSlugs.map((s) => `news/${s}`)
];

const loc = (lang, path) => `${SITE}/${lang}${path ? '/' + path : ''}`;

const urls = [];
for (const lang of LOCALES) {
  for (const path of paths) {
    const alternates = LOCALES.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${loc(l, path)}"/>`
    ).join('\n');
    urls.push(
      `  <url>\n    <loc>${loc(lang, path)}</loc>\n${alternates}\n` +
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('ru', path)}"/>\n  </url>`
    );
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap, 'utf8');
writeFileSync(resolve(root, 'public/robots.txt'), robots, 'utf8');
console.log(`Generated sitemap.xml (${urls.length} urls) and robots.txt`);

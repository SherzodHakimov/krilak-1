/**
 * Presentation data for catalog category tiles, shared by the catalog index and
 * the category page so the icon set and tile palette live in one place.
 */

/** Линейные SVG-иконки по слагу категории (24×24, stroke). */
export const CATEGORY_ICONS: Record<string, string> = {
  compounds: 'M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3z',
  doors: 'M6 3h12v18H6z M14.5 12h.01',
  panels: 'M3 8l9-4 9 4-9 4-9-4z M3 12l9 4 9-4 M3 16l9 4 9-4',
  couplings: 'M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z M3 12h6 M15 12h6',
  cabinets: 'M5 3h14v18H5z M5 9h14 M9 6h.01 M9 13h.01',
  extinguishers: 'M9 2h4 M11 5V2 M8 8h6v13H8z M8 8a3 3 0 0 1 3-3',
  alarms: 'M12 3a7 7 0 0 1 7 7 6 6 0 0 0 .9 9H4.1A6 6 0 0 0 5 10a7 7 0 0 1 7-7z M10 21h4',
  hoses: 'M4 6h5a4 4 0 0 1 4 4v4a3 3 0 0 0 6 0 M4 4v4',
  _default: 'M4 4h16v16H4z M4 9h16'
};

/** Тон плитки и иконки по ключу цвета категории. */
export const TILE_TONE: Record<string, { bg: string; icon: string }> = {
  flame: { bg: 'bg-gradient-to-br from-brand-amber/40 to-brand-leaf/25', icon: 'text-brand-amber' },
  steel: { bg: 'bg-gradient-to-br from-brand-steel/40 to-brand-graphite/15', icon: 'text-brand-steel' },
  amber: { bg: 'bg-gradient-to-br from-brand-amber/45 to-brand-amber/15', icon: 'text-amber-600' },
  graphite: { bg: 'bg-gradient-to-br from-brand-graphite/30 to-brand-graphite/10', icon: 'text-brand-graphite' },
  _default: { bg: 'bg-gradient-to-br from-brand-cloud to-brand-fog', icon: 'text-brand-ink/40' }
};

/** SVG-путь иконки по слагу категории (с дефолтом). */
export function categoryIconPath(slug: string): string {
  return CATEGORY_ICONS[slug] ?? CATEGORY_ICONS['_default'];
}

/** Тон плитки/иконки по ключу цвета категории (с дефолтом). */
export function categoryTone(color: string | undefined): { bg: string; icon: string } {
  return TILE_TONE[color ?? '_default'] ?? TILE_TONE['_default'];
}

/**
 * Unsplash photo ids keyed by entity slug, shared across the projects/news list
 * pages and the home page teasers. URLs are built at render time by
 * appImageLoader (core/image-loader.ts).
 */

/** Фото для карточек объектов (по slug проекта). */
export const PROJECT_PHOTOS: Record<string, string> = {
  'leningrad-npp-7': 'photo-1630142895963-6996ae6b3a5b',
  'bkl-9-stations': 'photo-1610605941775-ffbeb8c589ba',
  'kalininsky-dc': 'photo-1695668548342-c0c1ad479aee',
  'lakhta-center': 'photo-1429497419816-9ca5cfb4571a',
  'kazan-arena': 'photo-1459865264687-595d652de67e',
  'moscow-city': 'photo-1512453979798-5ea266f8880c',
  'sheremetyevo-c': 'photo-1715927134295-6b1016e28414',
  'novosibirsk-metro': 'photo-1567402838980-757099545bc1',
  'rosseti-volga': 'photo-1613421633868-24fdb1b07d15',
  'vladivostok-bridge': 'photo-1512187849-463fdb898f21',
  'ekb-koltsovo': 'photo-1542296332-2e4473faf563',
  'norilsk-pgmk': 'photo-1717386255773-1e3037c81788'
};

/** Фото для карточек экспертного блога (по slug статьи). */
export const NEWS_PHOTOS: Record<string, string> = {
  'sp-2-13130-2026': 'photo-1503387762-592deb58ef4e',
  'reactor-hall-12-weeks': 'photo-1527335988388-b40ee248d80c',
  'vesda-gas-suppression-data-centres': 'photo-1573164713988-8665fc963095',
  'cable-penetrations-ei180': 'photo-1558494949-ef010cbdcc31'
};

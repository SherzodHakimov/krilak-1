/**
 * Self-hosted photo paths keyed by entity slug, shared across the projects/news
 * list pages and the home page teasers. Files live in `public/images/…` and are
 * served as-is by NgOptimizedImage (no third-party CDN, no external cookies).
 */

/** Фото для карточек объектов (по slug проекта). */
export const PROJECT_PHOTOS: Record<string, string> = {
  'leningrad-npp-7': '/images/projects/leningrad-npp-7.webp',
  'bkl-9-stations': '/images/projects/bkl-9-stations.webp',
  'kalininsky-dc': '/images/projects/kalininsky-dc.webp',
  'lakhta-center': '/images/projects/lakhta-center.webp',
  'kazan-arena': '/images/projects/kazan-arena.webp',
  'moscow-city': '/images/projects/moscow-city.webp',
  'sheremetyevo-c': '/images/projects/sheremetyevo-c.webp',
  'novosibirsk-metro': '/images/projects/novosibirsk-metro.webp',
  'rosseti-volga': '/images/projects/rosseti-volga.webp',
  'vladivostok-bridge': '/images/projects/vladivostok-bridge.webp',
  'ekb-koltsovo': '/images/projects/ekb-koltsovo.webp',
  'norilsk-pgmk': '/images/projects/norilsk-pgmk.webp'
};

/** Фото для карточек экспертного блога (по slug статьи). */
export const NEWS_PHOTOS: Record<string, string> = {
  'sp-2-13130-2026': '/images/news/sp-2-13130-2026.webp',
  'reactor-hall-12-weeks': '/images/news/reactor-hall-12-weeks.webp',
  'vesda-gas-suppression-data-centres': '/images/news/vesda-gas-suppression-data-centres.webp',
  'cable-penetrations-ei180': '/images/news/cable-penetrations-ei180.webp'
};

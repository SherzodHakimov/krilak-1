import { NewsAccent } from './news.service';

/**
 * Tailwind classes for a news card's colour accent, shared by the news list,
 * the article page and the home teasers (same accent on all three).
 * Full literal class strings so Tailwind's content scanner keeps them.
 */
const PILL: Record<NewsAccent, string> = {
  leaf: 'bg-brand-leaf text-white',
  steel: 'bg-brand-steel text-white',
  amber: 'bg-brand-amber text-brand-graphite'
};

const CARD_GRADIENT: Record<NewsAccent, string> = {
  leaf: 'from-brand-leaf/40 to-brand-amber/40',
  steel: 'from-brand-steel/40 to-brand-graphite/40',
  amber: 'from-emerald-500/40 to-brand-graphite/40'
};

/** Классы пилюли категории по акценту. */
export function newsPillClass(accent: NewsAccent): string {
  return PILL[accent];
}

/** Классы градиента-оверлея карточки по акценту. */
export function newsGradientClass(accent: NewsAccent): string {
  return CARD_GRADIENT[accent];
}

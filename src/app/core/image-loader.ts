import { ImageLoaderConfig } from '@angular/common';

/**
 * Image loader for NgOptimizedImage.
 *
 * Unsplash photo ids (`photo-…`) are served responsively at the width Angular
 * requests for the current `sizes`/viewport; every other source (local
 * `/images/…` files) is returned unchanged. This lets the home page request
 * appropriately sized stock photos instead of always fetching `w=800`.
 */
export function appImageLoader(config: ImageLoaderConfig): string {
  const { src, width } = config;
  if (src.startsWith('photo-')) {
    return `https://images.unsplash.com/${src}?auto=format&fit=crop&w=${width ?? 800}&q=70`;
  }
  return src;
}

import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Scroll-reveal animation. Applies the `is-visible` class when the host scrolls
 * into view (styling lives in styles.css under `[data-reveal]`).
 *
 * SSR-safe: the IntersectionObserver is wired up in `afterNextRender`, which
 * only runs in the browser, so prerendering is untouched. An optional
 * `data-reveal-delay` attribute (ms) staggers grouped elements.
 */
@Directive({ selector: '[data-reveal]' })
export class RevealDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement;
      const delay = Number(host.getAttribute('data-reveal-delay') ?? '0');

      if (typeof IntersectionObserver === 'undefined') {
        host.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              window.setTimeout(() => host.classList.add('is-visible'), delay);
              observer.unobserve(host);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      observer.observe(host);
    });
  }
}

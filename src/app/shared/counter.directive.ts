import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Counts the host element's number up from zero when it scrolls into view.
 *
 * The final value is expected to already be the host's text content (so the
 * prerendered HTML and the hydrated client both show the real number — no
 * mismatch). The count-up is a purely cosmetic, browser-only enhancement.
 *
 * Usage: `<span data-counter="7000">7 000</span>`
 */
@Directive({ selector: '[data-counter]' })
export class CounterDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement;
      const target = Number(host.getAttribute('data-counter') ?? '0');
      if (!Number.isFinite(target) || target <= 0 || typeof IntersectionObserver === 'undefined') {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.animate(host, target);
              observer.unobserve(host);
            }
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(host);
    });
  }

  private animate(host: HTMLElement, target: number): void {
    const duration = 1400;
    const start = performance.now();
    const format = (n: number) => Math.round(n).toLocaleString('ru-RU').replace(/,/g, ' ');

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      host.textContent = format(target * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        host.textContent = format(target);
      }
    };

    host.textContent = '0';
    requestAnimationFrame(tick);
  }
}

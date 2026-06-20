import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LeadFormComponent } from './lead-form.component';
import { QUOTE_FIELDS } from './lead-fields';

/**
 * Reusable lead form for CTA blocks and the product card. Thin wrapper over
 * {@link LeadFormComponent} with the universal quote field set — keeps the
 * ergonomic `variant`/`leadTitle`/`source` API used across pages.
 */
@Component({
  selector: 'app-quote-form',
  imports: [LeadFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quote-form.component.html'
})
export class QuoteFormComponent {
  /** Visual variant: `dark` for dark sections, `light` for white backgrounds. */
  readonly variant = input<'dark' | 'light'>('dark');
  /** Title used in the Telegram message and analytics source label. */
  readonly leadTitle = input('Заявка с сайта КРИЛАК');
  readonly source = input('/');

  readonly quoteFields = QUOTE_FIELDS;
}

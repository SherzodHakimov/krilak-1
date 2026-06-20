import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslatePipe } from '../core/i18n/translate.pipe';

/** Floating contact widget (WhatsApp / Telegram / callback). */
@Component({
  selector: 'app-chat-widget',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'open.set(false)' },
  templateUrl: './chat-widget.component.html'
})
export class ChatWidgetComponent {
  readonly open = signal(false);

  toggle(): void {
    this.open.update((v) => !v);
  }
}

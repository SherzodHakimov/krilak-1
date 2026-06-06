import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LeadPayload } from './telegram.types';

interface TelegramSendResponse {
  ok: boolean;
  description?: string;
}

/**
 * Delivers website leads to Telegram via the Bot API `sendMessage` endpoint.
 *
 * SSR-safe: the request is only issued in the browser after hydration; during
 * prerendering the call is a no-op error so forms never fire on the server.
 *
 * Security note: in a static SPA the bot token ships in the JS bundle. This is
 * acceptable for a single locked-down notification chat. To hide the token,
 * put a tiny serverless relay in front and point this service at it instead.
 */
@Injectable({ providedIn: 'root' })
export class TelegramService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  send(payload: LeadPayload): Observable<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Telegram send is browser-only'));
    }

    const { botToken, chatId } = environment.telegram;
    if (!botToken || botToken.startsWith('PASTE_') || !chatId || chatId.startsWith('PASTE_')) {
      return throwError(
        () => new Error('Telegram bot token / chat id are not configured. See src/environments.')
      );
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const body = {
      chat_id: chatId,
      text: this.format(payload),
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };

    return this.http.post<TelegramSendResponse>(url, body).pipe(
      map((res) => {
        if (!res.ok) {
          throw new Error(res.description ?? 'Telegram API returned ok=false');
        }
      })
    );
  }

  /** Build an HTML-formatted Telegram message from a lead payload. */
  private format(payload: LeadPayload): string {
    const lines: string[] = [`<b>${this.escape(payload.title)}</b>`];
    for (const field of payload.fields) {
      const value = field.value;
      if (value === null || value === undefined || `${value}`.trim() === '') {
        continue;
      }
      lines.push(`<b>${this.escape(field.label)}:</b> ${this.escape(`${value}`)}`);
    }
    lines.push(`\n<i>${this.escape(payload.source)}</i>`);
    return lines.join('\n');
  }

  /** Escape the characters Telegram's HTML parse mode treats as markup. */
  private escape(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

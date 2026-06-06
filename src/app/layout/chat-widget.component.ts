import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { LocalizePathPipe } from '../core/i18n/localize-path.pipe';

/** Floating contact widget (Telegram / WhatsApp / callback). */
@Component({
  selector: 'app-chat-widget',
  imports: [RouterLink, TranslatePipe, LocalizePathPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      @if (open()) {
        <div class="w-72 bg-white rounded-2xl shadow-card-hover border border-brand-fog p-5 animate-fade-up">
          <h3 class="font-display font-bold text-base text-brand-graphite">{{ 'chat.title' | t }}</h3>
          <p class="text-xs text-brand-ink/60 mt-1">{{ 'chat.subtitle' | t }}</p>
          <div class="mt-4 space-y-2">
            <a href="https://t.me/krilak" target="_blank" rel="noopener" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-cloud text-sm font-medium">
              <span class="w-8 h-8 rounded-lg bg-brand-steel/10 text-brand-steel grid place-items-center">✈</span>
              {{ 'chat.telegram' | t }}
            </a>
            <a href="https://wa.me/74957440052" target="_blank" rel="noopener" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-cloud text-sm font-medium">
              <span class="w-8 h-8 rounded-lg bg-brand-leaf/10 text-brand-leaf grid place-items-center">✆</span>
              {{ 'chat.whatsapp' | t }}
            </a>
            <a [routerLink]="'/contacts' | loc" (click)="open.set(false)" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-cloud text-sm font-medium">
              <span class="w-8 h-8 rounded-lg bg-brand-amber/15 text-amber-700 grid place-items-center">☎</span>
              {{ 'chat.call' | t }}
            </a>
          </div>
        </div>
      }
      <button
        (click)="toggle()"
        class="w-14 h-14 rounded-full bg-brand-leaf text-white shadow-card-hover grid place-items-center hover:bg-brand-moss transition-colors animate-leaf-glow"
        [attr.aria-label]="'chat.open' | t"
        aria-haspopup="true"
        [attr.aria-expanded]="open()"
      >
        @if (open()) {
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" /></svg>
        } @else {
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" stroke-linecap="round" stroke-linejoin="round" /></svg>
        }
      </button>
    </div>
  `
})
export class ChatWidgetComponent {
  readonly open = signal(false);

  toggle(): void {
    this.open.update((v) => !v);
  }
}

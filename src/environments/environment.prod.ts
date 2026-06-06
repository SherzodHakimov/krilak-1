/**
 * Production environment.
 *
 * Fill in the Telegram bot token and chat id before deploying. See README
 * ("Telegram integration") for how to obtain them and the security note.
 */
export const environment = {
  production: true,
  /** Absolute site origin, used by SeoService for canonical / og / hreflang URLs. */
  siteUrl: 'https://krilak.ru',
  telegram: {
    /** TODO: paste your Telegram Bot API token here (from @BotFather). */
    botToken: 'PASTE_YOUR_TELEGRAM_BOT_TOKEN_HERE',
    /** TODO: paste the destination chat id here (user, group or channel). */
    chatId: 'PASTE_YOUR_TELEGRAM_CHAT_ID_HERE'
  }
};

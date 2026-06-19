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
    /** Bot API token (@krilak_leads_bot, from @BotFather). */
    botToken: '8955401061:AAEbdtryosl7TZjs0mqcY7_LYjb3adUoq18',
    /** Destination chat id — group "Krilak leads group". */
    chatId: '-5571786546'
  }
};

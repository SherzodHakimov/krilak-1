/**
 * Development environment.
 *
 * Telegram lead delivery:
 *   1. Create a bot via @BotFather in Telegram and copy the HTTP API token.
 *   2. Find your chat / group / channel id (e.g. via @userinfobot or @getidsbot).
 *   3. Paste the values below. They are NOT secrets in a static SPA — see README
 *      ("Telegram integration") for the security note and the serverless-relay
 *      alternative if you need to hide the token.
 */
export const environment = {
  production: false,
  /** Absolute site origin, used by SeoService for canonical / og / hreflang URLs. */
  siteUrl: 'https://krilak.ru',
  telegram: {
    /** Bot API token (@krilak_leads_bot, from @BotFather). */
    botToken: '8955401061:AAEbdtryosl7TZjs0mqcY7_LYjb3adUoq18',
    /** Destination chat id — group "Krilak leads group". */
    chatId: '-5571786546'
  }
};

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
    /** TODO: paste your Telegram Bot API token here (from @BotFather). */
    botToken: 'PASTE_YOUR_TELEGRAM_BOT_TOKEN_HERE',
    /** TODO: paste the destination chat id here (user, group or channel). */
    chatId: 'PASTE_YOUR_TELEGRAM_CHAT_ID_HERE'
  }
};

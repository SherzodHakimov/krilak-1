# КРИЛАК — сайт на Angular (SSG, bilingual, Telegram-формы)

B2B-сайт огнезащиты «КРИЛАК», перенесённый с Vite + vanilla JS на **Angular 20** со
статической генерацией (SSG / prerender), двуязычностью **RU/EN** и отправкой заявок
в **Telegram** (без backend).

## Технологии

- **Angular 20**, standalone-компоненты, signals, OnPush, strict TypeScript.
- **Tailwind CSS 3** — перенесённые дизайн-токены и кастомные утилиты бренда.
- **SSG**: `outputMode: static` + `RenderMode.Prerender` — на выходе только статические
  файлы, Node-сервер не нужен.
- **i18n**: лёгкий синхронный словарь (`core/i18n`), локаль берётся из URL (`/ru`, `/en`).
  Переведённый текст попадает прямо в prerendered HTML без рассинхронизации гидрации.
- **Формы → Telegram** через `core/telegram/telegram.service.ts` (Bot API `sendMessage`).

## Команды

```bash
npm install        # установка зависимостей
npm start          # дев-сервер: http://localhost:4200  (откроется /ru)
npm run build      # прод-сборка + prerender → dist/krilak/browser
node scripts/generate-seo-assets.mjs   # пересборка robots.txt и sitemap.xml в public/
```

Готовый сайт — это содержимое **`dist/krilak/browser/`** (папки `ru/` и `en/`,
по одному `index.html` на каждый маршрут). Заливается на любой статический хостинг/CDN.

## Настройка Telegram (обязательно перед использованием форм)

Токен и chat id задаются в **`src/environments/environment.ts`** (dev) и
**`src/environments/environment.prod.ts`** (prod):

```ts
telegram: {
  botToken: 'PASTE_YOUR_TELEGRAM_BOT_TOKEN_HERE',
  chatId:   'PASTE_YOUR_TELEGRAM_CHAT_ID_HERE'
}
```

Как получить:

1. Создайте бота через **@BotFather** → получите `botToken`.
2. Узнайте `chatId` (например, через **@getidsbot** или **@userinfobot**); для группы
   добавьте туда бота. Канал — id вида `-100…`.
3. Вставьте значения в оба файла окружения.

Формы с интеграцией: **CTA на главной**, **Контакты**, **Дилерам**, **Конфигуратор**.
Каждая форма имеет валидацию, состояния `idle / sending / success / error`, honeypot
против спама и очищается после успешной отправки.

> **Безопасность.** В статическом SPA токен бота попадает в JS-бандл. Это допустимо для
> одного закрытого чата-уведомлений. Чтобы скрыть токен — поставьте перед ним тонкий
> serverless-релей и направьте `TelegramService` на него (поменяв URL в сервисе).

## Деплой (nginx)

Раздавайте `dist/krilak/browser/` статикой. Корень редиректит на локаль по умолчанию,
неизвестные пути — на prerendered 404:

```nginx
location = / { return 301 /ru/; }

location / {
  try_files $uri $uri/ /ru/index.html;
}
```

`robots.txt` и `sitemap.xml` лежат в `public/` и попадают в корень `browser/`.

## Структура

```
src/app/
  core/      i18n (словари, пайпы), seo (SeoService), telegram, data (catalog/projects/news), interceptors
  layout/    shell: header (sticky, mobile-menu, переключатель языка), footer, chat-widget
  shared/    reveal/counter директивы, переиспользуемая quote-form
  features/  home, catalog (index/category/product), solutions, services, projects,
             configurator, dealers, about, awards, reviews, news (list/article), contacts, not-found
```

Статические данные (`catalog/matrix/projects.json`) импортируются из
`src/app/core/data/raw/` — доступны синхронно при prerender, без HTTP и двойного фетча.

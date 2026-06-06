# 3 — ИСТОЧНИК ЗНАНИЙ (Angular SSR / SSG для SEO)

> **Тип:** источник знаний. Объяснения, код и контекст. Читается по контексту задачи; не является сводом обязательных правил и не дублирует рекомендации.
> **Парные документы:** `1-obyazatelnye-trebovaniya.md` (обязательное), `2-rekomendacii-po-kodu.md` (рекомендации по коду).
>
> Стек: **Angular 20+** (фронт), **NestJS** (бэкенд), **PostgreSQL** (БД).
> Синтаксис серверного рендеринга — `provideServerRendering(withRoutes(...))`. Отличия Angular 19 указаны в тексте.

---

## 1. Выбор стратегии рендеринга

**Вопрос:** нужен лендинг с хорошей индексацией. В интернете советуют Next.js, но удобнее Angular. Что делать?

**Ответ:** переходить на Next.js не нужно — Angular полностью закрывает SEO. Три стратегии:

| Стратегия | Где/когда строится HTML | SEO | Нужен Node-сервер | Когда использовать |
|-----------|------------------------|-----|-------------------|--------------------|
| **CSR** (по умолчанию) | в браузере после загрузки JS | плохо (пустой `<app-root>`) | нет | внутренние интерфейсы, кабинет |
| **SSR** | на сервере на каждый запрос | отлично | да | контент под пользователя / часто меняющийся |
| **SSG (Prerender)** | на этапе `ng build`, в статические файлы | отлично | **нет** | лендинги, блоги, документация |

**Для лендинга — SSG (Prerender), а не полный SSR.** Лендинг одинаков для всех, рендерить на каждый запрос незачем. Prerender даёт те же плюсы SEO, что и SSR, но меньший TTFB (готовый статический файл) и не требует Node-сервера — отдаётся с nginx/CDN.

**Ограничение Prerender:** все данные для рендера доступны на этапе сборки; не подходит для контента под конкретного пользователя. Для лендинга не проблема: статика индексируется, форма/калькулятор работают на клиенте после гидрации.

---

## 2. Гидрация (hydration)

Гидрация — процесс, когда отрисованный статический HTML «оживает» на клиенте: Angular перехватывает существующий DOM и навешивает обработчики, делая страницу интерактивной.

До гидрации статический DOM уничтожался и заменялся клиентской версией — это давало мелькание (content flicker) и портило Lighthouse. Сейчас DOM переиспользуется.

Включается автоматически при `ng add @angular/ssr`. `withEventReplay()` сохраняет клики/ввод, сделанные до загрузки JS, и воспроизводит их после гидрации.

---

## 3. Настройка проекта (пошагово)

### Шаг 1. Создать проект с SSR

```bash
ng new my-landing --ssr
# или в существующий проект:
ng add @angular/ssr
```

Команда ставит `@angular/ssr`, создаёт `main.server.ts`, серверный конфиг и включает гидрацию.

### Шаг 2. Серверные роуты (`src/app/app.routes.server.ts`)

```typescript
import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Стратегия рендеринга по каждому роуту.
 *  - RenderMode.Prerender — страница одинакова для всех (лендинг, /about, /contact).
 *  - RenderMode.Server    — контент зависит от запроса/пользователя (нужен Node).
 *  - RenderMode.Client    — рендер только в браузере (для SEO не годится).
 */
export const serverRoutes: ServerRoute[] = [
  { path: '',        renderMode: RenderMode.Prerender },
  { path: 'about',   renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: '**',      renderMode: RenderMode.Prerender },
];
```

### Шаг 3. Серверный конфиг (`src/app/app.config.server.ts`)

```typescript
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// Angular 20+: один вызов.
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

// Angular 19: два отдельных вызова —
//   provideServerRendering(),
//   provideServerRouting(serverRoutes),

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### Шаг 4. Клиентский конфиг (`src/app/app.config.ts`)

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideClientHydration(withEventReplay()),
  ],
};
```

### Шаг 5. SEO-сервис (`src/app/core/seo/seo.service.ts`)

Единая точка управления SEO. Мета-теги в компонентах вручную не выставлять — только через этот сервис.

```typescript
import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

// В Angular 20+ DOCUMENT можно импортировать из '@angular/core'.

export interface SeoConfig {
  title: string;        // вкладка и og:title, до ~60 символов
  description: string;  // meta description и og:description, до ~155 символов
  url: string;          // канонический АБСОЛЮТНЫЙ URL
  image?: string;       // абсолютный URL картинки 1200×630
  type?: string;        // website | article | product ...
  noindex?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  private readonly siteName = 'Название продукта';

  update(config: SeoConfig): void {
    const type = config.type ?? 'website';

    this.title.setTitle(config.title);

    // updateTag (не addTag): при навигации теги обновляются, а не дублируются.
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'robots', content: config.noindex ? 'noindex, nofollow' : 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:url', content: config.url });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    if (config.image) this.meta.updateTag({ property: 'og:image', content: config.image });

    // Twitter / X
    this.meta.updateTag({ name: 'twitter:card', content: config.image ? 'summary_large_image' : 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    if (config.image) this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.setCanonical(config.url);
  }

  setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** JSON-LD. Работает при пререндере и в браузере. Принимает объект или массив схем. */
  setJsonLd(schema: object | object[], id = 'app-jsonld'): void {
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    const json = JSON.stringify(schema);
    if (script) { script.textContent = json; return; }

    script = this.doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.id = id;
    script.textContent = json;
    this.doc.head.appendChild(script);
  }
}
```

### Шаг 6. Конструкторы JSON-LD (`src/app/core/seo/structured-data.ts`)

```typescript
const BASE_URL = 'https://example.uz';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Название продукта',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/logo.png`,
    sameAs: ['https://t.me/your_channel', 'https://www.linkedin.com/company/your-company'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998-00-000-00-00',
      contactType: 'customer service',
      areaServed: 'UZ',
      availableLanguage: ['ru', 'uz'],
    },
  };
}

export function websiteSchema() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Название продукта', url: BASE_URL };
}

export interface FaqItem { question: string; answer: string; }

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
```

### Шаг 7. Использование в компоненте (`pages/home/home.component.ts`)

```typescript
import { Component, OnInit, inject } from '@angular/core';

import { SeoService } from '../../core/seo/seo.service';
import { faqSchema, organizationSchema, websiteSchema } from '../../core/seo/structured-data';

@Component({ selector: 'app-home', standalone: true, templateUrl: './home.component.html' })
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    // Выполняется при пререндере → теги попадают в статический HTML.
    this.seo.update({
      title: 'Название продукта — короткий цепляющий заголовок',
      description: 'Оффер в одном предложении до 155 символов: что вы даёте и кому.',
      url: 'https://example.uz/',
      image: 'https://example.uz/assets/og-image.png',
      type: 'website',
    });

    this.seo.setJsonLd([
      organizationSchema(),
      websiteSchema(),
      faqSchema([{ question: 'Сколько стоит?', answer: 'Ответ попадёт в расширенный сниппет Google.' }]),
    ]);
  }
}
```

### Шаг 8. Семантический каркас (`pages/home/home.component.html`)

Ровно один `<h1>`, далее `h2/h3`, `alt` у картинок. Контент в разметке, а не подгружается JS.

```html
<main>
  <section class="hero">
    <h1>Главный заголовок с ключевым запросом</h1>
    <p>Подзаголовок: коротко раскрывает оффер.</p>
    <a href="#contact" class="cta">Оставить заявку</a>
  </section>

  <section id="calculator" aria-labelledby="calc-title">
    <h2 id="calc-title">Калькулятор</h2>
    <!-- Интерактив работает на клиенте после гидрации; данные — с NestJS API через HttpClient. -->
  </section>
</main>
```

### Шаг 9. robots.txt и sitemap.xml (`public/`)

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://example.uz/sitemap.xml
```

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.uz/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://example.uz/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>
```

### Структура папок (ориентир)

```
src/
├─ app/
│  ├─ app.routes.ts
│  ├─ app.routes.server.ts       # режим рендера по роутам (Prerender = SSG)
│  ├─ app.config.ts              # клиентский конфиг + гидрация + scroll
│  ├─ app.config.server.ts       # серверный конфиг
│  ├─ core/                      # синглтоны: SEO, API, auth, interceptors, guards
│  │  └─ seo/ { seo.service.ts  structured-data.ts }
│  ├─ shared/                    # переиспользуемые компоненты/пайпы/директивы
│  ├─ layout/                    # shell, header, sidebar
│  └─ features/ (или pages/)     # бизнес-фичи, группировка по доменам
│     └─ home/ { home.component.ts  home.component.html }
└─ public/ { robots.txt  sitemap.xml }
```

---

## 4. Сборка и деплой

**Вопрос:** если загрузить исходники на хостинг, заработает?

**Ответ:** нет — браузер не понимает TypeScript/шаблоны. Нужен билд, загружается результат.

```bash
ng build
# результат: dist/<имя-проекта>/browser/  (статические index.html + JS/CSS)

# Проверка, что контент в HTML (а не пустой <app-root>):
cat dist/*/browser/index.html | grep "<h1>"
```

Порядок: **исходники → `ng build` → загружаешь `dist/<проект>/browser/`** (не весь проект, не исходники).

Все роуты в `Prerender` → Node-сервер не нужен, это статика. nginx:

```nginx
server {
    root /var/www/landing/browser;
    location / { try_files $uri $uri/ /index.html; }
}
```

NestJS — отдельный сервис; форма/калькулятор ходят к нему `HttpClient`-ом в браузере.

---

## 5. Гибридный рендеринг — комбинирование CSR / SSR / SSG

**Вопрос:** можно ли комбинировать режимы и на каком уровне — модуль, компонент?

**Ответ:** да (hybrid rendering). Есть две разные оси управления.

### Ось 1 — режим рендера (CSR / SSR / SSG): по роутам

Назначается **на уровне роута (URL)**, не модуля и не компонента:

```typescript
export const serverRoutes: ServerRoute[] = [
  { path: '',            renderMode: RenderMode.Prerender }, // лендинг — SSG
  { path: 'blog',        renderMode: RenderMode.Prerender }, // SSG
  { path: 'product/:id', renderMode: RenderMode.Server },    // SSR
  { path: 'dashboard',   renderMode: RenderMode.Client },    // CSR
  { path: '**',          renderMode: RenderMode.Server },
];
```

В standalone-Angular «модуль» = ленивая группа роутов, поэтому режим назначается на уровне фичи через её путь (`admin/**` → `Client`). **Нельзя** задать режим на компонент: одна страница рендерится целиком в одном режиме. Граница — URL.

### Ось 2 — гидрация: по компонентам/блокам

Инкрементальная гидрация (Angular 19+, в части версий экспериментальная) управляет **когда блок становится интерактивным**, а не где рендерится HTML. Работает поверх `@defer`.

Включение: `provideClientHydration(withIncrementalHydration())`.

```html
@defer (hydrate on viewport)    { <heavy-chart /> }       <!-- при попадании в экран -->
@defer (hydrate on interaction) { <comments /> }          <!-- при первом клике -->
@defer (hydrate on idle)        { <related-list /> }
@defer (hydrate never)          { <terms-of-service /> }  <!-- останется статикой -->
```

Паттерны: статика — `hydrate never`; графики/карты — `hydrate on hover`/`on viewport`; интерактив — `hydrate on immediate`. **Ограничение:** родитель гидрируется раньше или вместе с детьми; ребёнок не гидрируется внутри ещё не гидрированного родителя.

---

## 6. Подводные камни

**1. Hydration mismatch (NG05xx).** Серверный DOM должен совпасть с клиентским, иначе откат к полной перерисовке. Причины: невалидный HTML (`<div>` в `<p>`, `<table>` без `<tbody>`), прямые DOM-манипуляции, контент на `Date.now()`/`Math.random()`/`window`, сторонние скрипты, правящие DOM до гидрации. Лечение: валидная разметка, без прямых DOM-манипуляций; крайняя мера — `ngSkipHydration`.

**2. Сторонние библиотеки с браузерными API.** Графики, карты, карусели падают при пререндере. Решение: `isPlatformBrowser()`, `afterNextRender()` или загрузка через `@defer`.

**3. Двойной запрос данных.** Без переноса состояния `HttpClient` запрашивает на сервере и повторно на клиенте. `provideClientHydration()` по умолчанию включает `HttpTransferCache` (кэширует GET). POST и спецкейсы — вручную. Для чистого SSG менее критично.

**4. Утечка состояния между пользователями (только `RenderMode.Server`).** Node-процесс один на всех; изменяемое состояние в module scope утечёт между запросами. Не хранить запросное состояние в module scope. Для SSG неактуально.

**5. Зависшие таймеры и подписки.** Zone.js ждёт стабильности перед отдачей HTML. `setInterval`, незавершённые `Observable`, polling блокируют рендер. Браузерные таймеры — через `afterNextRender()`, остальное завершать.

**6. Сертификаты при серверных запросах к внутренним API.** При HTTPS с корпоративным/самоподписанным CA Node упадёт с ошибкой сертификата. Указать `NODE_EXTRA_CA_CERTS` (путь к CA-бандлу) в окружении сборки/SSR.

**7. Время сборки на параметризованных роутах.** Для `product/:id` нужен `getPrerenderParams()`. Тысячи страниц = долгий билд; много меняющихся — аргумент за `RenderMode.Server`.

**8. HTTP-статусы и 404.** Пререндер не отдаёт настоящие коды: несуществующая страница вернёт 200 с `index.html`. Настоящий 404/301 — SSR-роут или nginx.

**9. i18n (ru/uz).** Каждая локаль — отдельный билд; нужны `hreflang`-теги. Заложить в структуру URL (`/ru/…`, `/uz/…`) заранее.

---

## 7. UI-библиотеки и SSR / SSG (ng-zorro, Angular Material)

**Вопрос:** как обстоят дела с SSR/SSG, если использовать UI-кит (например, ng-zorro)?

**Ответ:** современные мажорные UI-киты проектируются под SSR, и проблем по большому счёту нет. ng-zorro официально указывает Server-side Rendering в поддерживаемых окружениях, все его компоненты — Angular Native и работают в режиме OnPush/Zoneless. При SSG компоненты рендерятся в статический HTML на этапе `ng build` без падений в Node-окружении (нет `window`/`document`).

**Версии — синхронно с Angular.** ng-zorro держит major-версию синхронно с `@angular/core` (ng-zorro@20 ↔ Angular 20). Рассинхрон версий — частая причина hydration-багов. Ставить версию библиотеки, соответствующую версии Angular.

### Нюансы

**1. Overlay-компоненты (dropdown, tooltip, popover, modal, select, date-picker, drawer).** Построены на CDK Overlay, позиционируются динамически с измерением DOM. Их содержимое появляется в overlay-контейнере **только при взаимодействии** (клик/hover), уже в браузере после гидрации. На сервере/при пререндере открытого оверлея нет — это нормально и хорошо для SEO (контент выпадашки индексировать не нужно). Не открывать оверлей программно на этапе рендера — это источник рассинхрона.

**2. Hydration mismatch — основной риск.** Если компонент рендерит разную разметку на сервере и клиенте (завязка на размер экрана, media-query, случайные id) — варнинги NG0500 и откат к перерисовке. Лечение: обновить библиотеку (в свежих версиях большинство мест исправлено), обернуть блок в `@defer`, или `ngSkipHydration` на обёртке как крайняя мера.

**3. CSS обязателен в билде — иначе FOUC.** UI-кит тащит свой CSS. Подключить в `angular.json`, иначе при SSG страница придёт «голой» до загрузки. Для лендинга критично — первый экран должен быть стилизованным сразу.

**4. Иконки ng-zorro.** SVG-иконки прописываются в `assets` в `angular.json`. Для SSR убедиться, что инлайн-иконки доступны при рендере (иконки грузятся динамически и без настройки assets могут не отрисоваться на сервере).

**5. Image-компонент ng-zorro.** Поддерживает SSR: `nzPriority` добавляет `<link rel="preload">` при серверном рендеринге, браузер грузит картинку как высокоприоритетный ресурс. Полезно для LCP-картинки первого экрана лендинга.

### Настройка ng-zorro в `angular.json`

```jsonc
{
  "assets": [
    {
      "glob": "**/*",
      "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
      "output": "/assets/"
    }
  ],
  "styles": [
    "node_modules/ng-zorro-antd/ng-zorro-antd.min.css"
  ]
}
```

Установка: `ng add ng-zorro-antd` (CLI пропишет стили и иконки автоматически).

### Практика под SSG-лендинг

- Тяжёлые интерактивные компоненты (date-picker, большие таблицы, графики) оборачивать в `@defer (hydrate on interaction)` / `(hydrate on viewport)` — их JS не грузится сразу, первый экран лёгкий, а индексируемый текст уже в HTML. Для UI-китов особенно уместно: именно сложные компоненты тянут больше всего JS.
- Правило «каждый компонент SSR-safe» (файл 1) при ng-zorro выполняется самой библиотекой, но касается **вашего** кода: обёртки вокруг ng-zorro не лезут в `window`/`document` напрямую, только через `isPlatformBrowser()` / `afterNextRender()`.

### Если библиотека НЕ SSR-совместима

Для старых/нишевых библиотек без заявленной поддержки SSR — рендерить их компоненты только на клиенте: `@defer` + `isPlatformBrowser()`, либо вынести фичу на CSR-роут (`RenderMode.Client`). Для ng-zorro и Angular Material не требуется — оба поддерживают SSR штатно.

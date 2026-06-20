import { Lang } from './locale';

/**
 * UI string dictionaries for every supported locale.
 *
 * These are plain TypeScript objects imported at build time, so they are
 * available synchronously during prerendering. Both server and client compute
 * the same text for a given route locale, which means translated strings end
 * up in the static prerendered HTML with zero hydration mismatch — exactly the
 * SEO outcome the project guidelines require, without per-locale builds.
 */
export type Dictionary = Record<string, unknown>;

const ru: Dictionary = {
  meta: {
    title: 'КРИЛАК — комплексная огнезащита и пожарная безопасность с 1991 года',
    description:
      'Ассоциация «КРИЛАК» — российский производитель огнезащитных материалов, противопожарных конструкций и оборудования. 35 лет, 55+ наград, объекты в 80 регионах.',
    tagline: 'Огнезащита и пожарная безопасность',
    brand_suffix: 'КРИЛАК'
  },
  brand: { prefix: 'Ассоциация', name: 'КрилаК' },
  nav: {
    home: 'Главная',
    products: 'Продукция',
    solutions: 'Решения',
    services: 'Услуги',
    projects: 'Проекты',
    about: 'О компании',
    contacts: 'Контакты',
    configurator: 'Подобрать решение',
    quote: 'Получить КП',
    cabinet: 'Кабинет',
    login: 'Войти',
    search_placeholder: 'Найти продукт, ТУ, сертификат…'
  },
  roles: {
    eyebrow: 'Сегментация',
    title: 'Я ищу решение для своей роли:',
    intro:
      'За 35 лет мы выстроили отдельные сценарии для каждой роли — материалы, документы и формат общения подобраны под вашу задачу.',
    designer: 'Проектировщик',
    designer_hint: 'ТУ, паспорта, расчёт расхода',
    designer_cta: 'Открыть библиотеку',
    supplier: 'Снабженец',
    supplier_hint: 'Прайс, КП, реквизиты, тендеры',
    supplier_cta: 'Запросить КП',
    installer: 'Монтажник',
    installer_hint: 'Техкарта, обучение, сервис',
    installer_cta: 'Скачать техкарты',
    owner: 'Заказчик',
    owner_hint: 'Кейсы, лицензии, гарантии',
    owner_cta: 'Смотреть кейсы'
  },
  hero: {
    eyebrow: 'С 1991 года · 55+ наград',
    title: 'Защищаем людей и объекты от огня',
    title_a: 'Защищаем',
    title_b: 'людей и объекты',
    title_c: 'от огня',
    subtitle:
      'Ассоциация «КРИЛАК» — производитель полного цикла: огнезащитные составы, противопожарные конструкции, системы обнаружения и пожаротушения. От лаборатории до объекта в любой точке России.',
    cta_primary: 'Подобрать решение за 60 секунд',
    cta_secondary: 'Получить коммерческое предложение',
    live: 'Live · 28.05.2026',
    status_live: 'Производство активно',
    trust_1: '35',
    trust_1_label: 'лет защиты с 1991',
    trust_2: '55+',
    trust_2_label: 'наград и сертификатов',
    trust_3: '7K+',
    trust_3_label: 'реализованных объектов',
    trust_4: '80',
    trust_4_label: 'регионов работы',
    protect: 'Защищаем объекты',
    current: 'Текущий проект',
    current_value: 'Огнезащита R240 · АЭС',
    certs: 'ГОСТ Р · ISO 9001 · ЕАЭС',
    sector_npp: 'АЭС',
    sector_metro: 'Метро',
    sector_dc: 'Дата-центры',
    sector_mall: 'ТРЦ',
    sector_stadium: 'Стадионы'
  },
  metrics: {
    title: 'КрилаК в цифрах',
    subtitle: 'Производственная база и опыт, которыми защищаются стратегические объекты России',
    m1_label: 'Лет непрерывной работы с 1991',
    m2_label: 'Наград, премий и патентов',
    m3_label: 'Объектов защищены огнезащитой КрилаК',
    m4_label: 'Производственная мощность по огнезащите'
  },
  units: { m2: 'м²', tpy: 'т/год' },
  geo: { map_aria: 'Карта федеральных округов России' },
  categories: {
    eyebrow: 'Каталог продукции',
    title: 'Полный спектр огнезащиты и пожаробезопасности',
    subtitle:
      'Сертифицированные решения для металла, бетона, дерева, кабельных линий и инженерных систем',
    view_all: 'Смотреть весь каталог',
    all: 'Весь каталог',
    look: 'Смотреть',
    items: {
      compounds: { title: 'Огнезащитные составы', description: 'Краски, лаки, штукатурки для R15–R240' },
      doors: { title: 'Противопожарные двери', description: 'EI30–EI90, на заказ и склад' },
      panels: { title: 'Огнезащитные плиты', description: 'Конструктивная защита металла и бетона' },
      couplings: { title: 'Муфты и проходки', description: 'Кабельные и трубные проходки EI180' },
      extinguishers: { title: 'Огнетушители', description: 'Порошковые, углекислотные, воздушно-пенные' },
      alarms: { title: 'Извещатели и автоматика', description: 'Дымовые, тепловые, пламени, СОУЭ' },
      hoses: { title: 'Пожарные рукава и краны', description: 'Латексные, с двусторонним покрытием' },
      cabinets: { title: 'Пожарные шкафы и щиты', description: 'ШПК, ШПО, навесные и встроенные' }
    }
  },
  solutions: {
    eyebrow: 'Решения по отраслям',
    title: 'Сферы, для которых мы строим защиту',
    subtitle:
      'За 35 лет мы выработали отраслевые регламенты под уникальные требования критической инфраструктуры',
    more: 'Подробнее',
    items: {
      energy: {
        title: 'ТЭК и энергетика',
        description: 'АЭС, ТЭЦ, нефтегаз — R180 и выше, агрессивные среды',
        p1: 'КрилаК-СУПЕР для металлоконструкций',
        p2: 'КрилаК-КАБЕЛЬ для кабельных линий',
        p3: 'Огнезащитные плиты PRO'
      },
      transport: {
        title: 'Метро и транспорт',
        description: 'Туннели, депо, вокзалы — EI120, дым, эвакуация',
        p1: 'Муфты КрилаК EI180',
        p2: 'Двери EI60/EI90',
        p3: 'Извещатели ИП 212'
      },
      retail: {
        title: 'ТРЦ и общественные здания',
        description: 'Высотные центры, стадионы, аэропорты',
        p1: 'Декоративные ЛКМ',
        p2: 'Дверные комплекты',
        p3: 'Пожарные шкафы'
      },
      industry: { title: 'Промышленность и склады', description: 'Логистика, цеха, склады ГСМ и АХОВ' },
      data: { title: 'Дата-центры', description: 'Газовое пожаротушение, ранние датчики' },
      housing: { title: 'ЖКХ и социальные объекты', description: 'Жильё, школы, больницы — комфорт и стандарт' }
    }
  },
  configurator_block: {
    eyebrow: 'Конфигуратор',
    title: 'Подберите огнезащиту за 60 секунд',
    subtitle:
      '5 шагов до точной рекомендации продукта, расчёта расхода и оценочной сметы. Все данные сохраняются в личном кабинете.',
    step_1: 'Тип объекта',
    step_2: 'Тип конструкции',
    step_3: 'Класс огнестойкости',
    step_4: 'Площадь и условия',
    step_5: 'Получите расчёт и КП',
    cta: 'Открыть конфигуратор',
    nav_back: 'Назад',
    nav_next: 'Далее',
    area_label: 'Площадь объекта, м²',
    conditions_label: 'Условия эксплуатации',
    estimate: 'Оценочная смета',
    start: 'С какого объекта начнём?'
  },
  projects: {
    eyebrow: 'Реализованные объекты',
    title: 'Где работает «КрилаК»',
    subtitle: 'От АЭС и метро до дата-центров: 7 000+ объектов в 80 регионах, где огнезащита КрилаК надёжно служит десятилетиями.',
    view_map: 'Открыть карту объектов',
    view_all: 'Все проекты',
    area: 'Площадь',
    rating: 'Огнестойкость',
    year: 'Год',
    all_industries: 'Все объекты',
    hero_pill: '7 000+ объектов · 80 регионов',
    open_map: 'Открыть интерактивную карту →'
  },
  map: {
    eyebrow: 'География работы',
    title: 'Карта объектов «КрилаК»',
    subtitle:
      'Более 7 000 проектов в 80 регионах России и СНГ — от Калининграда до Камчатки. Найдите объект рядом с вами.',
    m1: 'регионов России',
    m2: 'реализованных объектов',
    m3: 'отраслей промышленности',
    cta: 'Смотреть все объекты',
    badge: '120 объектов в Москве и МО',
    districts_title: 'Объекты по федеральным округам',
    districts_note: 'обновлено в 2026',
    districts_footer: 'Покрытие: 8 / 8 округов · 80 регионов',
    districts_all: 'Все объекты',
    districts_hint: 'Наведите на округ, чтобы увидеть детали',
    objects_unit: 'объектов'
  },
  clients: {
    title: 'Нам доверяют',
    subtitle: 'Крупнейшие промышленные предприятия, госкомпании, генподрядчики и проектные институты'
  },
  awards: {
    eyebrow: 'Признание',
    title: 'Награды и сертификаты',
    subtitle: 'Подтверждённое качество, признанное отраслью и государством',
    archive: 'Открыть архив',
    all: 'Все награды',
    items: {
      a2019: { title: 'Лучшая фирма России', sub: 'Всероссийский конкурс' },
      a2018: { title: 'Премия «Бренд года»', sub: 'Огнезащита' },
      a2017: { title: '2-я Всероссийская выставка', sub: 'Лауреат' },
      a2016: { title: 'ISO 9001 ресертификация', sub: 'Качество' },
      a2015: { title: 'Лицензия МЧС', sub: 'Бессрочная' }
    }
  },
  news: {
    title: 'Экспертный блог',
    heading: 'Делимся экспертизой в огнезащите',
    subtitle: 'Аналитика рынка, разъяснения нормативов, разборы кейсов',
    view_all: 'Все статьи',
    read: 'Читать статью',
    back: 'Ко всем статьям'
  },
  cta: {
    title: 'Получите расчёт и образец бесплатно',
    subtitle: 'Заполните короткую форму — инженер свяжется в течение 2 часов в рабочее время.',
    name: 'Имя',
    company: 'Компания',
    phone: 'Телефон',
    email: 'Email',
    object: 'Объект и задача',
    object_ph: 'Тип объекта, площадь, требуемый предел огнестойкости…',
    submit: 'Отправить заявку',
    sending: 'Отправляем…',
    success: 'Спасибо! Заявка отправлена — инженер свяжется с вами в ближайшее время.',
    error: 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.',
    consent: 'Нажимая «Отправить», я соглашаюсь с политикой обработки персональных данных',
    benefit_1: 'Подбор продукта под класс огнестойкости и тип объекта',
    benefit_2: 'Бесплатный выезд инженера на объекты в Москве и МО',
    benefit_3: 'Образцы для проектной экспертизы — за наш счёт'
  },
  form: {
    required: 'Заполните это поле',
    email_invalid: 'Введите корректный email',
    phone_invalid: 'Введите корректный телефон'
  },
  footer: {
    about:
      'Ассоциация «КРИЛАК» — российский производитель огнезащитных материалов и противопожарного оборудования. С 1991 года защищаем стратегические объекты России и СНГ.',
    products_title: 'Продукция',
    company_title: 'Компания',
    for_partners: 'Партнёрам',
    dealers: 'Дилерам',
    tenders: 'Тендеры',
    documents: 'Документация',
    reviews: 'Отзывы',
    news: 'Новости',
    contacts_title: 'Связаться',
    phone: '+7 (495) 744-00-52',
    email: 'info@krilak.ru',
    address: 'Москва, Россия',
    schedule: 'Пн-Пт 09:00–18:00',
    rights: '© 1991–2026 Ассоциация «КРИЛАК». Все права защищены.',
    privacy: 'Политика конфиденциальности',
    cookies: 'Использование cookies'
  },
  chat: {
    title: 'Связаться с менеджером',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    call: 'Заказать звонок',
    write: 'Написать в чат',
    open: 'Связаться'
  },
  catalog: {
    title: 'Каталог продукции',
    subtitle: 'Сертифицированные материалы и оборудование для пассивной и активной огнезащиты',
    search_ph: 'Поиск по названию, SKU или применению…',
    all: 'Все категории',
    products: 'Продукты',
    nothing: 'Ничего не найдено. Измените запрос или сбросьте фильтр.',
    in_category: 'В категории',
    specs: 'Характеристики',
    documents: 'Документы',
    consumption: 'Расход',
    rating: 'Огнестойкость',
    related: 'Похожие продукты',
    request: 'Запросить КП',
    back_to_catalog: 'Назад в каталог',
    products_count: 'продуктов',
    directions_title: 'Направления защиты',
    help_cta: 'Не знаю что выбрать',
    featured_eyebrow: 'Хиты продаж',
    featured_title: 'Рекомендуемые продукты',
    analog_cta: 'Подобрать аналог',
    certified: 'Сертифицировано ГОСТ Р',
    warranty: 'Гарантия до 30 лет',
    filter_all: 'Все',
    filter_nothing: 'Под выбранный фильтр продуктов нет',
    details: 'Подробнее →',
    calc_cta: 'Перейти в конфигуратор →',
    analog: 'Подобрать аналог',
    hero_pill: '129+ SKU · 8 категорий'
  },
  services: {
    eyebrow: 'Услуги',
    title: 'Полный цикл огнезащитных работ',
    subtitle: 'От проектирования и расчёта до монтажа, контроля качества и сервисного обслуживания',
    items: {
      design: { title: 'Проектирование и расчёт', description: 'Подбор системы, расчёт расхода, разработка проектной документации и ТУ.' },
      supply: { title: 'Поставка материалов', description: 'Собственное производство, складская программа, доставка по всей России.' },
      install: { title: 'Монтаж и нанесение', description: 'Аттестованные бригады, нанесение составов, монтаж конструкций под ключ.' },
      audit: { title: 'Обследование и экспертиза', description: 'Аудит существующей огнезащиты, замеры толщины, заключения и рекомендации.' },
      training: { title: 'Обучение и техкарты', description: 'Обучение монтажников, технологические карты, авторский надзор.' },
      service: { title: 'Сервис и гарантия', description: 'Гарантийное и постгарантийное обслуживание, плановые проверки.' }
    }
  },
  about: {
    eyebrow: 'О компании',
    title: 'Защищаем людей и объекты с 1991 года',
    subtitle:
      'Ассоциация «КРИЛАК» — производитель полного цикла огнезащитных материалов и противопожарного оборудования с собственной лабораторией и производством.',
    mission_title: 'Наша миссия',
    mission_text:
      'Делать здания и инфраструктуру безопаснее, поставляя сертифицированную огнезащиту и решения, которым доверяют стратегические объекты России и СНГ.',
    history_title: 'Этапы развития',
    values_title: 'Наши принципы',
    values: {
      quality: { title: 'Качество и сертификация', description: 'ГОСТ Р, ISO 9001, ЕАЭС — каждый продукт проходит независимые испытания.' },
      science: { title: 'Собственная наука', description: 'Лаборатория и R&D-центр разрабатывают рецептуры нового поколения.' },
      scale: { title: 'Масштаб производства', description: 'До 10 000 тонн огнезащиты в год, поставки в 80 регионов.' },
      responsibility: { title: 'Ответственность', description: 'Гарантии до 30 лет и сопровождение объекта на всём жизненном цикле.' }
    }
  },
  reviews: {
    eyebrow: 'Отзывы',
    title: 'Что говорят наши заказчики',
    subtitle: 'Проектировщики, генподрядчики и эксплуатирующие организации о работе с КрилаК'
  },
  dealers: {
    eyebrow: 'Партнёрам',
    title: 'Станьте дилером КрилаК',
    subtitle: 'Прозрачные условия, маркетинговая поддержка, обучение и складская программа для партнёров',
    benefits_title: 'Преимущества партнёрства',
    form_title: 'Заявка на партнёрство',
    tenders_title: 'Тендеры и закупки',
    tenders_text: 'Актуальные тендеры, конкурсные процедуры и условия участия для поставщиков и подрядчиков.',
    region: 'Регион',
    terms: 'Формат сотрудничества',
    terms_sales: 'Продажи',
    terms_service: 'Монтаж и сервис',
    terms_both: 'Продажи и сервис',
    regions: {
      moscow: 'Москва',
      spb: 'Санкт-Петербург',
      kazan: 'Казань',
      ekb: 'Екатеринбург',
      nsk: 'Новосибирск',
      nnov: 'Нижний Новгород',
      samara: 'Самара',
      krasnodar: 'Краснодар',
      vladivostok: 'Владивосток',
      other: 'Другой регион'
    },
    submit: 'Отправить заявку'
  },
  contacts: {
    eyebrow: 'Контакты',
    title: 'Свяжитесь с нами',
    subtitle: 'Ответим на вопросы, рассчитаем смету и подберём решение под ваш объект',
    office: 'Головной офис',
    phone_label: 'Телефон',
    email_label: 'Email',
    schedule_label: 'Часы работы',
    reps_title: 'Региональные представители',
    rep_production: 'Производство',
    rep_dealer: 'Дилер',
    form_title: 'Написать нам',
    topic: 'Тема обращения',
    topics: {
      quote: 'Коммерческое предложение',
      tech: 'Технический вопрос',
      dealer: 'Партнёрство',
      other: 'Другое'
    }
  },
  notfound: {
    title: 'Страница не найдена',
    subtitle: 'Возможно, страница была перемещена или больше не существует.',
    home: 'На главную'
  }
};

const en: Dictionary = {
  meta: {
    title: 'Krilak — Comprehensive Fire Protection Since 1991',
    description:
      'Krilak Association — Russian manufacturer of fire-protection coatings, fire-rated structures and equipment. 35 years, 55+ awards, projects in 80 regions.',
    tagline: 'Fire protection & safety',
    brand_suffix: 'KRILAK'
  },
  brand: { prefix: 'Association', name: 'KrilaK' },
  nav: {
    home: 'Home',
    products: 'Products',
    solutions: 'Solutions',
    services: 'Services',
    projects: 'Projects',
    about: 'About',
    contacts: 'Contacts',
    configurator: 'Pick a solution',
    quote: 'Get a quote',
    cabinet: 'Account',
    login: 'Sign in',
    search_placeholder: 'Find a product, datasheet, certificate…'
  },
  roles: {
    eyebrow: 'Segmentation',
    title: 'I am looking for a solution as:',
    intro:
      'Over 35 years we have built dedicated playbooks for every role — materials, documents and the way we communicate are tailored to your task.',
    designer: 'Designer / Engineer',
    designer_hint: 'Datasheets, certificates, consumption',
    designer_cta: 'Open the library',
    supplier: 'Procurement',
    supplier_hint: 'Pricing, quotes, tenders, banking details',
    supplier_cta: 'Request a quote',
    installer: 'Installer',
    installer_hint: 'Tech cards, training, service',
    installer_cta: 'Download tech cards',
    owner: 'Decision maker',
    owner_hint: 'Cases, licences, warranties',
    owner_cta: 'View cases'
  },
  hero: {
    eyebrow: 'Since 1991 · 55+ awards',
    title: 'We protect people and assets from fire',
    title_a: 'We protect',
    title_b: 'people and assets',
    title_c: 'from fire',
    subtitle:
      'Krilak is a full-cycle producer: passive fire protection coatings, fire-rated structures, detection and suppression systems. From our lab to your site, anywhere in Russia.',
    cta_primary: 'Configure a solution in 60s',
    cta_secondary: 'Request a commercial offer',
    live: 'Live · 28.05.2026',
    status_live: 'Production active',
    trust_1: '35',
    trust_1_label: 'years of protection since 1991',
    trust_2: '55+',
    trust_2_label: 'awards & certificates',
    trust_3: '7K+',
    trust_3_label: 'projects delivered',
    trust_4: '80',
    trust_4_label: 'regions served',
    protect: 'We protect',
    current: 'Current project',
    current_value: 'Fire protection R240 · NPP',
    certs: 'GOST R · ISO 9001 · EAEU',
    sector_npp: 'NPP',
    sector_metro: 'Metro',
    sector_dc: 'Data centres',
    sector_mall: 'Malls',
    sector_stadium: 'Stadiums'
  },
  metrics: {
    title: 'Krilak by the numbers',
    subtitle: "Production capacity and experience trusted by Russia's strategic infrastructure",
    m1_label: 'Years of continuous operation since 1991',
    m2_label: 'Awards, honours and patents',
    m3_label: 'Sites protected by Krilak',
    m4_label: 'Annual coatings output'
  },
  units: { m2: 'm²', tpy: 't/yr' },
  geo: { map_aria: 'Map of the federal districts of Russia' },
  categories: {
    eyebrow: 'Product catalog',
    title: 'A full spectrum of passive and active fire protection',
    subtitle: 'Certified solutions for steel, concrete, wood, cabling and HVAC',
    view_all: 'View full catalog',
    all: 'Full catalog',
    look: 'View',
    items: {
      compounds: { title: 'Fire-protection coatings', description: 'Paints, varnishes, plasters for R15–R240' },
      doors: { title: 'Fire doors', description: 'EI30–EI90, custom and stock' },
      panels: { title: 'Fire-protection panels', description: 'Structural protection for steel and concrete' },
      couplings: { title: 'Couplings & penetrations', description: 'Cable and pipe penetrations EI180' },
      extinguishers: { title: 'Extinguishers', description: 'Dry-powder, CO₂, foam-water' },
      alarms: { title: 'Detectors & automation', description: 'Smoke, heat, flame, voice alert' },
      hoses: { title: 'Hoses & valves', description: 'Latex, two-side coated' },
      cabinets: { title: 'Cabinets & boards', description: 'Surface and recessed, ShPK, ShPO' }
    }
  },
  solutions: {
    eyebrow: 'Industry solutions',
    title: 'Where we deliver protection',
    subtitle: 'Industry-specific playbooks built over 35 years of critical infrastructure work',
    more: 'Learn more',
    items: {
      energy: {
        title: 'Energy & oil and gas',
        description: 'Nuclear, thermal, petrochem — R180+, harsh environments',
        p1: 'KrilaK-SUPER for steel structures',
        p2: 'KrilaK-CABLE for cable lines',
        p3: 'Fire-protection panels PRO'
      },
      transport: {
        title: 'Metro & transport',
        description: 'Tunnels, depots, stations — EI120, smoke & evac',
        p1: 'KrilaK couplings EI180',
        p2: 'Doors EI60/EI90',
        p3: 'Detectors IP 212'
      },
      retail: {
        title: 'Malls & public',
        description: 'High-rises, stadiums, airports',
        p1: 'Decorative coatings',
        p2: 'Door sets',
        p3: 'Fire cabinets'
      },
      industry: { title: 'Industry & warehousing', description: 'Logistics, plants, hazardous storage' },
      data: { title: 'Data centres', description: 'Gas suppression, early-warning detection' },
      housing: { title: 'Housing & social', description: 'Residential, schools, hospitals' }
    }
  },
  configurator_block: {
    eyebrow: 'Configurator',
    title: 'Pick the right fire protection in 60 seconds',
    subtitle:
      'Five steps to a precise product recommendation, consumption estimate and budget figure. Everything is saved in your account.',
    step_1: 'Object type',
    step_2: 'Structure type',
    step_3: 'Fire rating',
    step_4: 'Area & conditions',
    step_5: 'Get a calculation and quote',
    cta: 'Open the configurator',
    nav_back: 'Back',
    nav_next: 'Next',
    area_label: 'Floor area, m²',
    conditions_label: 'Operating conditions',
    estimate: 'Estimated budget',
    start: 'Which object are we starting with?'
  },
  projects: {
    eyebrow: 'Projects delivered',
    title: 'Where Krilak works',
    subtitle: 'From nuclear plants and metros to data centres: 7,000+ sites across 80 regions where Krilak fire protection reliably serves for decades.',
    view_map: 'Open project map',
    view_all: 'All projects',
    area: 'Area',
    rating: 'Fire rating',
    year: 'Year',
    all_industries: 'All projects',
    hero_pill: '7,000+ projects · 80 regions',
    open_map: 'Open the interactive map →'
  },
  map: {
    eyebrow: 'Geography',
    title: 'Krilak project map',
    subtitle:
      'Over 7,000 projects across 80 regions of Russia and the CIS — from Kaliningrad to Kamchatka. Find a site near you.',
    m1: 'regions of Russia',
    m2: 'projects delivered',
    m3: 'industries',
    cta: 'Browse all projects',
    badge: '120 sites in Moscow and the region',
    districts_title: 'Projects by federal district',
    districts_note: 'updated in 2026',
    districts_footer: 'Coverage: 8 / 8 districts · 80 regions',
    districts_all: 'All projects',
    districts_hint: 'Hover a district to see details',
    objects_unit: 'projects'
  },
  clients: {
    title: 'Trusted by',
    subtitle: 'Major industrial enterprises, state corporations, general contractors and design institutes'
  },
  awards: {
    eyebrow: 'Recognition',
    title: 'Awards & certifications',
    subtitle: 'Quality recognised by the industry and the state',
    archive: 'Open the archive',
    all: 'All awards',
    items: {
      a2019: { title: 'Best company in Russia', sub: 'National competition' },
      a2018: { title: '“Brand of the Year” award', sub: 'Fire protection' },
      a2017: { title: '2nd All-Russian exhibition', sub: 'Laureate' },
      a2016: { title: 'ISO 9001 recertification', sub: 'Quality' },
      a2015: { title: 'EMERCOM licence', sub: 'Perpetual' }
    }
  },
  news: {
    title: 'Expert insights',
    heading: 'Sharing our fire-protection expertise',
    subtitle: 'Market analysis, regulation breakdowns, case studies',
    view_all: 'All articles',
    read: 'Read article',
    back: 'Back to all articles'
  },
  cta: {
    title: 'Get a free estimate and a sample',
    subtitle: 'Fill out a short form — an engineer will be in touch within 2 business hours.',
    name: 'Name',
    company: 'Company',
    phone: 'Phone',
    email: 'Email',
    object: 'Object and brief',
    object_ph: 'Object type, area, required fire-resistance rating…',
    submit: 'Send request',
    sending: 'Sending…',
    success: 'Thank you! Your request has been sent — an engineer will contact you shortly.',
    error: 'Could not send the request. Please try again or call us.',
    consent: 'By submitting, I agree to the privacy policy',
    benefit_1: 'Product selection by fire-resistance rating and object type',
    benefit_2: 'Free engineer visit to sites in Moscow and the region',
    benefit_3: 'Samples for design expertise — at our expense'
  },
  form: {
    required: 'This field is required',
    email_invalid: 'Enter a valid email',
    phone_invalid: 'Enter a valid phone number'
  },
  footer: {
    about:
      'Krilak Association is a Russian manufacturer of fire-protection materials and equipment. Since 1991 we have been protecting strategic infrastructure across Russia and the CIS.',
    products_title: 'Products',
    company_title: 'Company',
    for_partners: 'Partners',
    dealers: 'Dealers',
    tenders: 'Tenders',
    documents: 'Documents',
    reviews: 'Reviews',
    news: 'News',
    contacts_title: 'Reach us',
    phone: '+7 (495) 744-00-52',
    email: 'info@krilak.ru',
    address: 'Moscow, Russia',
    schedule: 'Mon–Fri 09:00–18:00',
    rights: '© 1991–2026 Krilak Association. All rights reserved.',
    privacy: 'Privacy policy',
    cookies: 'Cookies'
  },
  chat: {
    title: 'Talk to a manager',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    call: 'Request a call',
    write: 'Open chat',
    open: 'Contact us'
  },
  catalog: {
    title: 'Product catalog',
    subtitle: 'Certified materials and equipment for passive and active fire protection',
    search_ph: 'Search by name, SKU or application…',
    all: 'All categories',
    products: 'Products',
    nothing: 'Nothing found. Adjust your query or reset the filter.',
    in_category: 'In category',
    specs: 'Specifications',
    documents: 'Documents',
    consumption: 'Consumption',
    rating: 'Fire rating',
    related: 'Related products',
    request: 'Request a quote',
    back_to_catalog: 'Back to catalog',
    products_count: 'products',
    directions_title: 'Areas of protection',
    help_cta: 'Not sure what to choose',
    featured_eyebrow: 'Best sellers',
    featured_title: 'Recommended products',
    analog_cta: 'Find an analog',
    certified: 'GOST R certified',
    warranty: 'Warranty up to 30 years',
    filter_all: 'All',
    filter_nothing: 'No products match the selected filter',
    details: 'Details →',
    calc_cta: 'Calculate in the configurator →',
    analog: 'Find an analog',
    hero_pill: '129+ SKU · 8 categories'
  },
  services: {
    eyebrow: 'Services',
    title: 'Full-cycle fire-protection works',
    subtitle: 'From design and calculation to installation, quality control and maintenance',
    items: {
      design: { title: 'Design & calculation', description: 'System selection, consumption calculation, design documentation and datasheets.' },
      supply: { title: 'Material supply', description: 'In-house production, stock program, delivery across Russia.' },
      install: { title: 'Installation & application', description: 'Certified crews, coating application, turnkey structure installation.' },
      audit: { title: 'Survey & expertise', description: 'Audit of existing protection, thickness measurements, reports and recommendations.' },
      training: { title: 'Training & tech cards', description: 'Installer training, technology cards, designer supervision.' },
      service: { title: 'Service & warranty', description: 'Warranty and post-warranty service, scheduled inspections.' }
    }
  },
  about: {
    eyebrow: 'About',
    title: 'Protecting people and assets since 1991',
    subtitle:
      'Krilak Association is a full-cycle manufacturer of fire-protection materials and equipment with its own laboratory and production.',
    mission_title: 'Our mission',
    mission_text:
      'To make buildings and infrastructure safer by supplying certified fire protection and solutions trusted by strategic sites across Russia and the CIS.',
    history_title: 'Milestones',
    values_title: 'Our principles',
    values: {
      quality: { title: 'Quality & certification', description: 'GOST R, ISO 9001, EAEU — every product passes independent testing.' },
      science: { title: 'In-house science', description: 'Our lab and R&D centre develop next-generation formulations.' },
      scale: { title: 'Production scale', description: 'Up to 10,000 tonnes of fire protection per year, supplied to 80 regions.' },
      responsibility: { title: 'Responsibility', description: 'Warranties up to 30 years and full life-cycle support.' }
    }
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'What our clients say',
    subtitle: 'Designers, general contractors and operators on working with Krilak'
  },
  dealers: {
    eyebrow: 'Partners',
    title: 'Become a Krilak dealer',
    subtitle: 'Transparent terms, marketing support, training and a stock program for partners',
    benefits_title: 'Partnership benefits',
    form_title: 'Partnership request',
    tenders_title: 'Tenders & procurement',
    tenders_text: 'Current tenders, competitive procedures and participation terms for suppliers and contractors.',
    region: 'Region',
    terms: 'Cooperation format',
    terms_sales: 'Sales',
    terms_service: 'Installation & service',
    terms_both: 'Sales & service',
    regions: {
      moscow: 'Moscow',
      spb: 'Saint Petersburg',
      kazan: 'Kazan',
      ekb: 'Yekaterinburg',
      nsk: 'Novosibirsk',
      nnov: 'Nizhny Novgorod',
      samara: 'Samara',
      krasnodar: 'Krasnodar',
      vladivostok: 'Vladivostok',
      other: 'Other region'
    },
    submit: 'Send request'
  },
  contacts: {
    eyebrow: 'Contacts',
    title: 'Get in touch',
    subtitle: 'We will answer your questions, estimate the budget and pick a solution for your site',
    office: 'Head office',
    phone_label: 'Phone',
    email_label: 'Email',
    schedule_label: 'Working hours',
    reps_title: 'Regional representatives',
    rep_production: 'Production',
    rep_dealer: 'Dealer',
    form_title: 'Write to us',
    topic: 'Topic',
    topics: {
      quote: 'Commercial offer',
      tech: 'Technical question',
      dealer: 'Partnership',
      other: 'Other'
    }
  },
  notfound: {
    title: 'Page not found',
    subtitle: 'The page may have been moved or no longer exists.',
    home: 'Go home'
  }
};

export const TRANSLATIONS: Record<Lang, Dictionary> = { ru, en };

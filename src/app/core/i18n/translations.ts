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
    tagline: 'Огнезащита и пожарная безопасность'
  },
  brand: { prefix: 'Ассоциация', name: 'КРИЛАК' },
  nav: {
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
    title: 'Я ищу решение для своей роли:',
    designer: 'Проектировщик',
    designer_hint: 'ТУ, паспорта, расчёт расхода',
    supplier: 'Снабженец',
    supplier_hint: 'Прайс, КП, реквизиты, тендеры',
    installer: 'Монтажник',
    installer_hint: 'Техкарта, обучение, сервис',
    owner: 'Заказчик',
    owner_hint: 'Кейсы, лицензии, гарантии'
  },
  hero: {
    eyebrow: 'С 1991 года · 55+ наград',
    title: 'Защищаем людей и объекты от огня',
    subtitle:
      'Ассоциация «КРИЛАК» — производитель полного цикла: огнезащитные составы, противопожарные конструкции, системы обнаружения и пожаротушения. От лаборатории до объекта в любой точке России.',
    cta_primary: 'Подобрать решение за 60 секунд',
    cta_secondary: 'Получить коммерческое предложение',
    trust_1: '1991',
    trust_1_label: 'Год основания',
    trust_2: '55+',
    trust_2_label: 'Наград и премий',
    trust_3: '10 000+ т',
    trust_3_label: 'Огнезащиты в год',
    trust_4: '80',
    trust_4_label: 'Регионов работы'
  },
  metrics: {
    title: 'КрилаК в цифрах',
    subtitle: 'Производственная база и опыт, которыми защищаются стратегические объекты России',
    m1_label: 'Лет непрерывной работы с 1991',
    m2_label: 'Наград, премий и патентов',
    m3_label: 'Объектов защищены огнезащитой КрилаК',
    m4_label: 'Производственная мощность по огнезащите'
  },
  categories: {
    eyebrow: 'Каталог продукции',
    title: 'Полный спектр огнезащиты и пожаробезопасности',
    subtitle:
      'Сертифицированные решения для металла, бетона, дерева, кабельных линий и инженерных систем',
    view_all: 'Смотреть весь каталог',
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
    items: {
      energy: { title: 'ТЭК и энергетика', description: 'АЭС, ТЭЦ, нефтегаз — R180 и выше, агрессивные среды' },
      transport: { title: 'Метро и транспорт', description: 'Туннели, депо, вокзалы — EI120, дым, эвакуация' },
      retail: { title: 'ТРЦ и общественные здания', description: 'Высотные центры, стадионы, аэропорты' },
      industry: { title: 'Промышленность и склады', description: 'Логистика, цеха, склады ГСМ и АХОВ' },
      data: { title: 'Дата-центры', description: 'Газовое пожаротушение, ранние датчики' },
      housing: { title: 'ЖКХ и социальные объекты', description: 'Жильё, школы, больницы — комфорт и стандарт' }
    }
  },
  configurator_block: {
    eyebrow: 'Конфигуратор',
    title: 'Подберите огнезащиту за 60 секунд',
    subtitle:
      '5 шагов до точной рекомендации продукта, расчёта расхода и оценочной сметы.',
    step_1: 'Тип объекта',
    step_2: 'Конструкция',
    step_3: 'Площадь',
    step_4: 'Класс огнестойкости',
    step_5: 'Получите расчёт',
    cta: 'Открыть конфигуратор'
  },
  projects: {
    eyebrow: 'Реализованные объекты',
    title: 'Где работает «КрилаК»',
    subtitle: 'Стратегические объекты, на которых наша огнезащита служит десятилетиями',
    view_map: 'Открыть карту объектов',
    view_all: 'Все проекты',
    area: 'Площадь',
    rating: 'Огнестойкость',
    year: 'Год',
    all_industries: 'Все отрасли'
  },
  clients: {
    title: 'Нам доверяют',
    subtitle: 'Крупнейшие промышленные предприятия, госкомпании, генподрядчики и проектные институты'
  },
  awards: {
    title: 'Награды и сертификаты',
    subtitle: 'Подтверждённое качество, признанное отраслью и государством',
    archive: 'Открыть архив',
    all: 'Все награды'
  },
  news: {
    title: 'Экспертный блог',
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
    consent: 'Нажимая «Отправить», я соглашаюсь с политикой обработки персональных данных'
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
    title: 'Связаться с инженером',
    subtitle: 'Ответим в рабочие часы менее чем за 5 минут',
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
    products_count: 'продуктов'
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
    tagline: 'Fire protection & safety'
  },
  brand: { prefix: 'Association', name: 'KRILAK' },
  nav: {
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
    title: 'I am looking for a solution as:',
    designer: 'Designer / Engineer',
    designer_hint: 'Datasheets, certificates, consumption',
    supplier: 'Procurement',
    supplier_hint: 'Pricing, quotes, tenders, banking details',
    installer: 'Installer',
    installer_hint: 'Tech cards, training, service',
    owner: 'Decision maker',
    owner_hint: 'Cases, licences, warranties'
  },
  hero: {
    eyebrow: 'Since 1991 · 55+ awards',
    title: 'We protect people and assets from fire',
    subtitle:
      'Krilak is a full-cycle producer: passive fire protection coatings, fire-rated structures, detection and suppression systems. From our lab to your site, anywhere in Russia.',
    cta_primary: 'Configure a solution in 60s',
    cta_secondary: 'Request a commercial offer',
    trust_1: '1991',
    trust_1_label: 'Founded',
    trust_2: '55+',
    trust_2_label: 'Awards & honours',
    trust_3: '10,000+ t',
    trust_3_label: 'Coatings produced yearly',
    trust_4: '80',
    trust_4_label: 'Regions served'
  },
  metrics: {
    title: 'Krilak by the numbers',
    subtitle: "Production capacity and experience trusted by Russia's strategic infrastructure",
    m1_label: 'Years of continuous operation since 1991',
    m2_label: 'Awards, honours and patents',
    m3_label: 'Sites protected by Krilak',
    m4_label: 'Annual coatings output'
  },
  categories: {
    eyebrow: 'Product catalog',
    title: 'A full spectrum of passive and active fire protection',
    subtitle: 'Certified solutions for steel, concrete, wood, cabling and HVAC',
    view_all: 'View full catalog',
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
    items: {
      energy: { title: 'Energy & oil and gas', description: 'Nuclear, thermal, petrochem — R180+, harsh environments' },
      transport: { title: 'Metro & transport', description: 'Tunnels, depots, stations — EI120, smoke & evac' },
      retail: { title: 'Malls & public', description: 'High-rises, stadiums, airports' },
      industry: { title: 'Industry & warehousing', description: 'Logistics, plants, hazardous storage' },
      data: { title: 'Data centres', description: 'Gas suppression, early-warning detection' },
      housing: { title: 'Housing & social', description: 'Residential, schools, hospitals' }
    }
  },
  configurator_block: {
    eyebrow: 'Configurator',
    title: 'Pick the right fire protection in 60 seconds',
    subtitle: 'Five steps to a precise product recommendation, consumption estimate and budget figure.',
    step_1: 'Object type',
    step_2: 'Structure',
    step_3: 'Area',
    step_4: 'Fire rating',
    step_5: 'Get a quote',
    cta: 'Open the configurator'
  },
  projects: {
    eyebrow: 'Projects delivered',
    title: 'Where Krilak works',
    subtitle: 'Strategic sites where our protection has served for decades',
    view_map: 'Open project map',
    view_all: 'All projects',
    area: 'Area',
    rating: 'Fire rating',
    year: 'Year',
    all_industries: 'All industries'
  },
  clients: {
    title: 'Trusted by',
    subtitle: 'Major industrial enterprises, state corporations, general contractors and design institutes'
  },
  awards: {
    title: 'Awards & certifications',
    subtitle: 'Quality recognised by the industry and the state',
    archive: 'Open the archive',
    all: 'All awards'
  },
  news: {
    title: 'Expert insights',
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
    consent: 'By submitting, I agree to the privacy policy'
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
    title: 'Talk to an engineer',
    subtitle: 'We reply in under 5 minutes during business hours',
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
    products_count: 'products'
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

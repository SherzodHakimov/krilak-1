import { ValidatorFn, Validators } from '@angular/forms';

/** Тип контрола поля лид-формы. Совпадает с `type` для input. */
export type LeadControlKind = 'text' | 'tel' | 'email' | 'textarea' | 'select';

/** Опция select: язык-независимый `value` + i18n-ключ подписи. */
export interface LeadSelectOption {
  value: string;
  labelKey: string;
}

/** Декларация одного поля лид-формы для schema-driven рендеринга. */
export interface LeadFieldDef {
  /** Имя контрола в FormGroup и ключ значения. */
  name: string;
  kind: LeadControlKind;
  /** i18n-ключ подписи (label). */
  labelKey: string;
  /** Добавляет `Validators.required`. */
  required?: boolean;
  /** Дополнительные валидаторы. */
  validators?: ValidatorFn[];
  /** i18n-ключ текста ошибки (показывается после касания/правки). */
  errorKey?: string;
  /** i18n-ключ плейсхолдера (textarea/input). */
  placeholderKey?: string;
  /** Строки textarea. */
  rows?: number;
  /** Ширина в сетке `sm:grid-cols-2`: 1 — половина, 2 — на всю ширину. */
  colSpan?: 1 | 2;
  /** Значение по умолчанию (для nonNullable-контрола и сброса). */
  default?: string;
  /** Опции для `kind: 'select'`. */
  options?: LeadSelectOption[];
}

/** Либеральный паттерн телефона: `+ ( ) пробел дефис цифры`, минимум 6 символов. */
export const PHONE_PATTERN = Validators.pattern(/^[+()\d\s-]{6,}$/);

/** Фабрика типовых полей — единое место для общих валидаторов и i18n-ключей. */
export const field = {
  name: (colSpan: 1 | 2 = 1): LeadFieldDef => ({
    name: 'name',
    kind: 'text',
    labelKey: 'cta.name',
    required: true,
    errorKey: 'form.required',
    colSpan
  }),
  company: (colSpan: 1 | 2 = 1): LeadFieldDef => ({
    name: 'company',
    kind: 'text',
    labelKey: 'cta.company',
    colSpan
  }),
  phone: (colSpan: 1 | 2 = 1): LeadFieldDef => ({
    name: 'phone',
    kind: 'tel',
    labelKey: 'cta.phone',
    required: true,
    validators: [PHONE_PATTERN],
    errorKey: 'form.phone_invalid',
    colSpan
  }),
  email: (colSpan: 1 | 2 = 1): LeadFieldDef => ({
    name: 'email',
    kind: 'email',
    labelKey: 'cta.email',
    required: true,
    validators: [Validators.email],
    errorKey: 'form.email_invalid',
    colSpan
  }),
  message: (): LeadFieldDef => ({
    name: 'message',
    kind: 'textarea',
    labelKey: 'cta.object',
    placeholderKey: 'cta.object_ph',
    rows: 3,
    colSpan: 2
  }),
  select: (
    name: string,
    labelKey: string,
    options: LeadSelectOption[],
    opts: { default?: string; colSpan?: 1 | 2 } = {}
  ): LeadFieldDef => ({
    name,
    kind: 'select',
    labelKey,
    options,
    default: opts.default,
    colSpan: opts.colSpan ?? 1
  })
};

/** Тема обращения (contacts). */
export const TOPIC_OPTIONS: LeadSelectOption[] = [
  { value: 'quote', labelKey: 'contacts.topics.quote' },
  { value: 'tech', labelKey: 'contacts.topics.tech' },
  { value: 'dealer', labelKey: 'contacts.topics.dealer' },
  { value: 'other', labelKey: 'contacts.topics.other' }
];

/** Формат сотрудничества (dealers). */
export const TERMS_OPTIONS: LeadSelectOption[] = [
  { value: 'sales', labelKey: 'dealers.terms_sales' },
  { value: 'service', labelKey: 'dealers.terms_service' },
  { value: 'both', labelKey: 'dealers.terms_both' }
];

/** Регионы (dealers). Стабильные id — подписи локализуются по `dealers.regions.*`. */
export const REGION_OPTIONS: LeadSelectOption[] = [
  { value: 'moscow', labelKey: 'dealers.regions.moscow' },
  { value: 'spb', labelKey: 'dealers.regions.spb' },
  { value: 'kazan', labelKey: 'dealers.regions.kazan' },
  { value: 'ekb', labelKey: 'dealers.regions.ekb' },
  { value: 'nsk', labelKey: 'dealers.regions.nsk' },
  { value: 'nnov', labelKey: 'dealers.regions.nnov' },
  { value: 'samara', labelKey: 'dealers.regions.samara' },
  { value: 'krasnodar', labelKey: 'dealers.regions.krasnodar' },
  { value: 'vladivostok', labelKey: 'dealers.regions.vladivostok' },
  { value: 'other', labelKey: 'dealers.regions.other' }
];

/** Универсальная заявка (CTA-блок, карточка продукта). */
export const QUOTE_FIELDS: LeadFieldDef[] = [
  field.name(),
  field.company(),
  field.phone(),
  field.email(),
  field.message()
];

/** Форма страницы контактов (+ тема обращения). */
export const CONTACT_FIELDS: LeadFieldDef[] = [
  field.name(),
  field.company(),
  field.phone(),
  field.email(),
  field.select('topic', 'contacts.topic', TOPIC_OPTIONS, { default: 'quote', colSpan: 2 }),
  field.message()
];

/** Форма заявки на партнёрство (без email/сообщения, + регион и формат). */
export const DEALER_FIELDS: LeadFieldDef[] = [
  field.name(2),
  field.company(),
  field.phone(),
  field.select('region', 'dealers.region', REGION_OPTIONS, { default: 'moscow' }),
  field.select('terms', 'dealers.terms', TERMS_OPTIONS, { default: 'sales' })
];

/** Лид-форма конфигуратора (контакт; расчёт добавляется через extraFields). */
export const CONFIGURATOR_FIELDS: LeadFieldDef[] = [
  field.name(2),
  field.phone(2),
  field.email(2)
];

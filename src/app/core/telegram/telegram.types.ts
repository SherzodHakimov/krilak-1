/** A single labelled field rendered into the Telegram message. */
export interface LeadField {
  label: string;
  value: string | number | null | undefined;
}

/** A lead to deliver to Telegram. */
export interface LeadPayload {
  /** Short title shown at the top of the message, e.g. "Заявка с сайта". */
  title: string;
  /** Source page path, included for context. */
  source: string;
  /** Ordered fields to render. Empty values are skipped. */
  fields: LeadField[];
}

/** UI state for a form submission. */
export type SubmitState = 'idle' | 'sending' | 'success' | 'error';

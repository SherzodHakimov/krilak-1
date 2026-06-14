import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats an ISO date string (`YYYY-MM-DD`) as `DD.MM.YYYY`.
 *
 * Pure string transform — no `Date` parsing, so the displayed day never shifts
 * due to timezone interpretation of date-only ISO values.
 */
@Pipe({ name: 'dmy' })
export class DmyDatePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
    return match ? `${match[3]}.${match[2]}.${match[1]}` : value;
  }
}

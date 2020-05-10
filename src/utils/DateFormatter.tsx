import {format} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

interface DateFormatterInterface {
  format(formatStr: string): string;
}

class DateFormatter implements DateFormatterInterface {
  private readonly value: Date;

  constructor(value: Date) {
    this.value = value;
  }

  format(formatStr: string): string {
    return format(this.value, formatStr, {locale: ruLocale});
  }
}

export default DateFormatter;

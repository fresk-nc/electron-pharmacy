import {format} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const formatDate = (value: Date, formatStr: string): string => {
  return format(value, formatStr, {locale: ruLocale});
};

export default formatDate;

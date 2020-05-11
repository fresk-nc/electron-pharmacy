import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import isSameMonth from 'date-fns/isSameMonth';
import getDate from 'date-fns/getDate';

import ChartGainBaseData, {ChartGainDataItem} from './ChartGainBaseData';
import OrderRecord from '../records/OrderRecord';
import DateFormatter from './DateFormatter';

/**
 * OOP pattern - Template Method
 */
class ChartGainByDayData extends ChartGainBaseData {
  protected filterOrderPredicate(
    order: OrderRecord,
    selectedDate: Date
  ): boolean {
    return isSameMonth(new Date(order.datetime), selectedDate);
  }

  protected generateTemplateData(
    selectedDate: Date
  ): ReadonlyArray<ChartGainDataItem> {
    return eachDayOfInterval({
      start: startOfMonth(new Date(selectedDate)),
      end: endOfMonth(new Date(selectedDate)),
    }).map((date) => {
      return {
        name: new DateFormatter(date).format('d MMM'),
        value: 0,
      };
    });
  }

  protected findDataItemPredicate(order: OrderRecord, index: number): boolean {
    return index + 1 === getDate(new Date(order.datetime));
  }
}

export default ChartGainByDayData;

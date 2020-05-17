import isSameYear from 'date-fns/isSameYear';
import getMonth from 'date-fns/getMonth';

import ChartGainBaseData, {ChartGainDataItem} from './ChartGainBaseData';
import OrderRecord from '../records/OrderRecord';

/**
 * OOP pattern - Template Method
 */
class ChartGainByMonthData extends ChartGainBaseData {
  protected getOrdersByPeriod(
    orders: OrderRecord[],
    selectedDate: Date
  ): OrderRecord[] {
    return orders.filter((order) => {
      return isSameYear(new Date(order.datetime), selectedDate);
    });
  }

  protected getInitialData(): ReadonlyArray<ChartGainDataItem> {
    return [
      {name: 'Январь', value: 0},
      {name: 'Февраль', value: 0},
      {name: 'Март', value: 0},
      {name: 'Апрель', value: 0},
      {name: 'Май', value: 0},
      {name: 'Июнь', value: 0},
      {name: 'Июль', value: 0},
      {name: 'Август', value: 0},
      {name: 'Сентябрь', value: 0},
      {name: 'Октябрь', value: 0},
      {name: 'Ноябрь', value: 0},
      {name: 'Декабрь', value: 0},
    ];
  }

  protected findDataItemForOrder(
    data: ReadonlyArray<ChartGainDataItem>,
    order: OrderRecord
  ): ChartGainDataItem | undefined {
    return data.find((_, index) => {
      return index === getMonth(new Date(order.datetime));
    });
  }
}

export default ChartGainByMonthData;

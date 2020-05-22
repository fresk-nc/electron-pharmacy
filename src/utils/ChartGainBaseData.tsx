import {DateRange} from '@material-ui/pickers';

import OrderRecord from '../records/OrderRecord';

export type ChartGainDataItem = {
  name: string;
  value: number;
};

/**
 * OOP pattern - Template Method
 */
abstract class ChartGainBaseData {
  protected abstract getOrdersByPeriod(
    orders: OrderRecord[],
    selectedDate: Date | DateRange
  ): OrderRecord[];

  protected abstract getInitialData(
    selectedDate: Date | DateRange
  ): ReadonlyArray<ChartGainDataItem>;

  protected abstract findDataItemForOrder(
    data: ReadonlyArray<ChartGainDataItem>,
    order: OrderRecord
  ): ChartGainDataItem | undefined;

  getData(
    orders: OrderRecord[],
    selectedDate: Date | DateRange
  ): ReadonlyArray<ChartGainDataItem> {
    const ordersByPeriod = this.getOrdersByPeriod(orders, selectedDate);
    const data = this.getInitialData(selectedDate);

    ordersByPeriod.forEach((order) => {
      const item = this.findDataItemForOrder(data, order);
      item!.value += order.getTotalPrice();
    });

    return data;
  }
}

export default ChartGainBaseData;

import {DateRange} from '@material-ui/pickers';

import OrderRecord from '../records/OrderRecord';

export type ChartGainDataItem = {
  name: string;
  value: number;
};

/**
 * Pattern - Template Method
 */
abstract class ChartGainBaseData {
  protected abstract filterOrderPredicate(
    order: OrderRecord,
    selectedDate: Date | DateRange
  ): boolean;

  protected abstract generateTemplateData(
    selectedDate: Date | DateRange
  ): ReadonlyArray<ChartGainDataItem>;

  protected abstract findDataItemPredicate(
    order: OrderRecord,
    index: number
  ): boolean;

  getData(
    orders: OrderRecord[],
    selectedDate: Date | DateRange
  ): ReadonlyArray<ChartGainDataItem> {
    const ordersByPeriod = orders.filter((order: OrderRecord) =>
      this.filterOrderPredicate(order, selectedDate)
    );
    const data = this.generateTemplateData(selectedDate);

    ordersByPeriod.forEach((order) => {
      const item = data.find((_, index: number) =>
        this.findDataItemPredicate(order, index)
      );

      item!.value += order.totalPrice;
    });

    return data;
  }
}

export default ChartGainBaseData;

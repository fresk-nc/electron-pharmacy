interface OrderItemRecordInterface {
  readonly name: string;
  readonly count: number;
  readonly price: number;
}

class OrderItemRecord implements OrderItemRecordInterface {
  readonly name: string;
  readonly count: number;
  readonly price: number;

  constructor(orderItem: Pick<OrderItemRecord, 'name' | 'count' | 'price'>) {
    this.name = orderItem.name;
    this.count = orderItem.count;
    this.price = orderItem.price;
  }
}

export default OrderItemRecord;

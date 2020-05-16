interface OrderItemRecordInterface {
  name: string;
  count: number;
  price: number;
}

class OrderItemRecord implements OrderItemRecordInterface {
  name: string;
  count: number;
  price: number;

  constructor(orderItem: Pick<OrderItemRecord, 'name' | 'count' | 'price'>) {
    this.name = orderItem.name;
    this.count = orderItem.count;
    this.price = orderItem.price;
  }
}

export default OrderItemRecord;

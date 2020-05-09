interface OrderItemRecordInterface {
  name: string;
  count: number;
  price: number;
}

class OrderItemRecord implements OrderItemRecordInterface {
  name: string;
  count: number;
  price: number;

  constructor(drug: Pick<OrderItemRecord, 'name' | 'count' | 'price'>) {
    this.name = drug.name;
    this.count = drug.count;
    this.price = drug.price;
  }
}

export default OrderItemRecord;

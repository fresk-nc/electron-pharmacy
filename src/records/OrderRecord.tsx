import OrderItemRecord from './OrderItemRecord';

interface OrderRecordInterface {
  readonly id: number;
  readonly datetime: string;
  readonly totalPrice: number;
  readonly status: string;
  readonly phone: string;
  readonly address: string;
  readonly drugs: OrderItemRecord[];
}

class OrderRecord implements OrderRecordInterface {
  readonly id: number;
  readonly datetime: string;
  readonly totalPrice: number;
  readonly status: string;
  readonly phone: string;
  readonly address: string;
  readonly drugs: OrderItemRecord[];

  constructor(
    order: Pick<
      OrderRecord,
      | 'id'
      | 'datetime'
      | 'totalPrice'
      | 'status'
      | 'drugs'
      | 'phone'
      | 'address'
    >
  ) {
    this.id = order.id;
    this.datetime = order.datetime;
    this.totalPrice = order.totalPrice;
    this.status = order.status;
    this.phone = order.phone;
    this.address = order.address;
    this.drugs = order.drugs;
  }
}

export default OrderRecord;

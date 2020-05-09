import OrderItemRecord from './OrderItemRecord';

interface OrderRecordInterface {
  id: number;
  datetime: string;
  totalPrice: number;
  status: string;
  phone: string;
  drugs: OrderItemRecord[];
}

class OrderRecord implements OrderRecordInterface {
  id: number;
  datetime: string;
  totalPrice: number;
  status: string;
  phone: string;
  drugs: OrderItemRecord[];

  constructor(
    order: Pick<
      OrderRecord,
      'id' | 'datetime' | 'totalPrice' | 'status' | 'drugs' | 'phone'
    >
  ) {
    this.id = order.id;
    this.datetime = order.datetime;
    this.totalPrice = order.totalPrice;
    this.status = order.status;
    this.phone = order.phone;
    this.drugs = order.drugs;
  }
}

export default OrderRecord;

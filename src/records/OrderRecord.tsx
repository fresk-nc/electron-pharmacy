import OrderItemRecord from './OrderItemRecord';

interface OrderRecordInterface {
  id: number;
  datetime: string;
  totalPrice: number;
  status: string;
  phone: string;
  address: string;
  drugs: OrderItemRecord[];
}

class OrderRecord implements OrderRecordInterface {
  id: number;
  datetime: string;
  totalPrice: number;
  status: string;
  phone: string;
  address: string;
  drugs: OrderItemRecord[];

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

import OrderItemRecord from './OrderItemRecord';
import pickupPointsStore from '../stores/pickupPointsStore';

interface OrderRecordInterface {
  readonly id: number;
  readonly datetime: string;
  readonly status: string;
  readonly phone: string;
  readonly pickupPoint: string;
  drugs: OrderItemRecord[];
  getTotalPrice(): number;
  addItem(item: OrderItemRecord): void;
  removeItem(item: OrderItemRecord): void;
  updateItem(oldItem: OrderItemRecord, newItem: OrderItemRecord): void;
  isInOurWarehouse(): boolean;
}

class OrderRecord implements OrderRecordInterface {
  readonly id: number;
  readonly datetime: string;
  readonly status: string;
  readonly phone: string;
  readonly pickupPoint: string;
  drugs: OrderItemRecord[];

  constructor(
    order: Pick<
      OrderRecord,
      'id' | 'datetime' | 'status' | 'drugs' | 'phone' | 'pickupPoint'
    >
  ) {
    this.id = order.id;
    this.datetime = order.datetime;
    this.status = order.status;
    this.phone = order.phone;
    this.drugs = order.drugs;
    this.pickupPoint = order.pickupPoint;
  }

  getTotalPrice(): number {
    return this.drugs.reduce((sum, item) => {
      return (sum += item.price * item.count);
    }, this.getDeliveryPrice());
  }

  getDeliveryPrice(): number {
    const pickupPoint = pickupPointsStore
      .getState()
      .find(({address}) => address === this.pickupPoint);

    return pickupPoint ? pickupPoint.deliveryPrice : 0;
  }

  addItem(item: OrderItemRecord): void {
    this.drugs = [...this.drugs, item];
  }

  removeItem(item: OrderItemRecord): void {
    this.drugs = this.drugs.filter(({name}) => name !== item.name);
  }

  updateItem(oldItem: OrderItemRecord, newItem: OrderItemRecord): void {
    const newDrugs = [...this.drugs];
    const index = newDrugs.findIndex((drug) => drug.name === oldItem.name);

    newDrugs[index] = newItem;

    this.drugs = newDrugs;
  }

  isInOurWarehouse(): boolean {
    return this.status !== 'Завершен' && this.status !== 'Доставлен';
  }
}

export default OrderRecord;

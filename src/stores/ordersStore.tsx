import CommonStore from './CommonStore';
import OrderRecord from '../records/OrderRecord';

interface OrdersStoreInterface {
  getUpdateEvent(): string;
  getState(): OrderRecord[];
  setState(orders: OrderRecord[]): void;
}

/**
 * OOP pattern - Singleton
 */
class OrdersStore extends CommonStore implements OrdersStoreInterface {
  private state: OrderRecord[] = [];
  private updateEvent = 'ORDERS_STORE_UPDATED';

  getUpdateEvent(): string {
    return this.updateEvent;
  }

  getState(): OrderRecord[] {
    return this.state;
  }

  setState(orders: OrderRecord[]): void {
    this.state = orders;
  }
}

export default new OrdersStore();

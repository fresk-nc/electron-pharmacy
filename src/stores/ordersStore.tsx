import CommonStore from './CommonStore';
import OrderRecord from '../records/OrderRecord';

/**
 * OOP pattern - Singleton
 */
class OrdersStore extends CommonStore<OrderRecord[]> {
  protected state: OrderRecord[] = [];
  protected updateEvent = 'ORDERS_STORE_UPDATED';
}

export default new OrdersStore();

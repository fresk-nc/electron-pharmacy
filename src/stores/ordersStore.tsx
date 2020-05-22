import {ipcRenderer} from 'electron';

import CommonStore, {CommonStoreInterface} from './CommonStore';
import OrderRecord from '../records/OrderRecord';

interface OrdersStoreInterface extends CommonStoreInterface<OrderRecord[]> {
  insert(order: OrderRecord): Promise<OrderRecord[]>;
  delete(id: number): Promise<OrderRecord[]>;
}

/**
 * OOP pattern - Singleton
 */
class OrdersStore extends CommonStore<OrderRecord[]>
  implements OrdersStoreInterface {
  protected state: OrderRecord[] = [];
  protected updateEvent = 'ORDERS_STORE_UPDATED';

  insert(order: OrderRecord): Promise<OrderRecord[]> {
    return new Promise<OrderRecord[]>((resolve, reject) => {
      ipcRenderer.send('orders-table-insert', order);
      ipcRenderer.once('orders-table-insert-success', () => {
        this.state = [...this.state, order];
        this.emit(this.updateEvent, this.state);
        resolve(this.state);
      });
      ipcRenderer.once('orders-table-insert-failure', reject);
    });
  }

  delete(id: number): Promise<OrderRecord[]> {
    return new Promise<OrderRecord[]>((resolve, reject) => {
      ipcRenderer.send('orders-table-delete', id);
      ipcRenderer.once('orders-table-delete-success', () => {
        this.state = this.state.filter((order) => order.id !== id);
        this.emit(this.updateEvent, this.state);
        resolve(this.state);
      });
      ipcRenderer.once('orders-table-delete-failure', reject);
    });
  }
}

export default new OrdersStore();

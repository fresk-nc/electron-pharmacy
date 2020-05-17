import CommonStore, {CommonStoreInterface} from './CommonStore';
import NotificationRecord from '../records/NotificationRecord';

interface NotificationsStoreInterface
  extends CommonStoreInterface<NotificationRecord[]> {
  insert(notification: NotificationRecord): void;
  delete(notification: NotificationRecord): void;
}

/**
 * OOP pattern - Singleton
 */
class NotificationsStore extends CommonStore<NotificationRecord[]>
  implements NotificationsStoreInterface {
  protected state: NotificationRecord[] = [];
  protected updateEvent = 'NOTIFICATIONS_STORE_UPDATED';

  insert(notification: NotificationRecord): void {
    this.setState([notification, ...this.state]);
    this.emit(this.updateEvent, this.state);
  }

  delete(notification: NotificationRecord): void {
    this.setState(this.state.filter((n) => n !== notification));
    this.emit(this.updateEvent, this.state);
  }
}

export default new NotificationsStore();

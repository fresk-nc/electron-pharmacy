import CommonStore, {CommonStoreInterface} from './CommonStore';
import NotificationRecord from '../records/NotificationRecord';

interface SnackbarStoreInterface
  extends CommonStoreInterface<NotificationRecord[]> {
  addNotification(notification: NotificationRecord): void;
  removeNotification(notification: NotificationRecord): void;
}

/**
 * OOP pattern - Singleton
 */
class SnackbarStore extends CommonStore<NotificationRecord[]>
  implements SnackbarStoreInterface {
  protected state: NotificationRecord[] = [];
  protected updateEvent = 'SNACKBAR_STORE_UPDATED';

  addNotification(notification: NotificationRecord): void {
    this.setState([notification, ...this.state]);
    this.emit(this.updateEvent, this.state);
  }

  removeNotification(notification: NotificationRecord): void {
    this.setState(this.state.filter((n) => n !== notification));
    this.emit(this.updateEvent, this.state);
  }
}

export default new SnackbarStore();

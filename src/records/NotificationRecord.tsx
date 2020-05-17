type NotificationType = 'success' | 'error';

interface NotificationRecordInterface {
  readonly text: string;
  readonly type: NotificationType;
}

class NotificationRecord implements NotificationRecordInterface {
  readonly text: string;
  readonly type: NotificationType;

  constructor(notification: Pick<NotificationRecord, 'text' | 'type'>) {
    this.text = notification.text;
    this.type = notification.type;
  }
}

export default NotificationRecord;

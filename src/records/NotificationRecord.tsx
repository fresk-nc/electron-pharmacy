type NotificationType = 'success' | 'error';

interface NotificationRecordInterface {
  text: string;
  type: NotificationType;
}

class NotificationRecord implements NotificationRecordInterface {
  text: string;
  type: NotificationType;

  constructor(notification: Pick<NotificationRecord, 'text' | 'type'>) {
    this.text = notification.text;
    this.type = notification.type;
  }
}

export default NotificationRecord;

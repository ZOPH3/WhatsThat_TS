export interface INotification {
  message: string;
  type: string;
  severity?: string;
  key?: number;
}

export interface INotificationState {
  notifications: INotification[];
  notificationCount?: number;
  dispatcher?: any;
}

import React, { createContext } from 'react';
import { INotificationState } from './types';

/**
 * @description Initial state for the notification context
 */
export const initialState: INotificationState = {
  notifications: [], // Notification queue
  notificationCount: 0,
};

const NotificationContext = createContext(initialState);

export default NotificationContext;

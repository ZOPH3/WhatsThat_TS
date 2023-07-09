import React, { useReducer } from 'react';
import NotificationReducer from './reducer';
import { INotification } from './types';
import NotificationContext, { initialState } from './context';

/**
 * @description NotificationProvider is a component that wraps the entire application and provides the notification context.
 */
function NotificationProvider({ children }: any) {
  const [state, dispatch] = useReducer(NotificationReducer, initialState);
  const addNotification = (payload: INotification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload });
  };
  const removeNotification = (payload: number) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload });
  };

  const getNotification = (payload: number) => {
    const n = state.notifications.find(
      (notification: INotification) => notification.key === payload
    );
    removeNotification(payload);
    return n;
  };

  const value = {
    notifications: state.notifications,
    notificationCount: state.notificationCount,
    dispatcher: { addNotification, removeNotification, getNotification },
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export default NotificationProvider;

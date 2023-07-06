import React, { createContext, useReducer } from 'react';

interface INotification {
  message: string;
  type: string;
  severity?: string;
  key?: number;
}

interface INotificationState {
  notifications: INotification[];
  notificationCount?: number;
  dispatcher?: any;
}

const initialState: INotificationState = {
  notifications: [], // Notification queue
  notificationCount: 0,
};

const NotificationContext = createContext(initialState);

const NotificationReducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_NOTIFICATION':
      // console.log('ADD_NOTIFICATION', payload);
      return {
        ...state,
        notifications: [...state.notifications, { ...payload, key: state.notificationCount + 1 }],
        notificationCount: state.notificationCount + 1,
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification: INotification) => notification.key !== payload
        ),
      };
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
        notificationCount: 0,
      };
    case 'GET_NOTIFICATION':
      return state.notifications.find(
        (notification: INotification) => notification.key === payload
      );
    default:
      throw new Error(`No case for type ${type} found in NotificationReducer.`);
  }
};

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

const useNotificationContext = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export { NotificationProvider, useNotificationContext };

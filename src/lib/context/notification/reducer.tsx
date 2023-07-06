import { INotification } from './types';

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

export default NotificationReducer;

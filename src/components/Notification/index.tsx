import React, { useEffect } from 'react';
import { useNotificationContext } from '../../lib/context/NotificationContext';
import { Snackbar } from 'react-native-paper';

const NotificationContainer = () => {
  const { notifications, notificationCount, dispatcher } = useNotificationContext();
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [notification, setNotification] = React.useState({} as any);

  useEffect(() => {
    console.log('notifications: ', notifications);
    if (notificationCount && notificationCount > 0) {
      setNotification(dispatcher.getNotification(notificationCount));
      setShowSnackbar(true);
    }
    console.log('notificationCount: ', notificationCount);
  }, [notificationCount]);

  return (
    <Snackbar wrapperStyle={{ bottom: 50 }} visible={showSnackbar} onDismiss={() => setShowSnackbar(false)}>
      {notification.message}
    </Snackbar>
  );
};

export default NotificationContainer;

import React, { useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import { useNotification } from '../../lib/context/notification';
import log from '../../lib/util/LoggerUtil';

function NotificationContainer() {
  const { notifications, notificationCount, dispatcher } = useNotification();
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [notification, setNotification] = React.useState({} as any);

  /**
   * When the notification count changes, we want to show the snackbar,
   * and set the notification message.
   */
  useEffect(() => {
    if (notificationCount && notificationCount > 0) {
      log.debug('[NOTIFICATION] Recieved: ', notifications);
      setNotification(dispatcher.getNotification(notificationCount));
      setShowSnackbar(true);
    }
  }, [notificationCount]);

  return (
    <Snackbar
      elevation={5}
      wrapperStyle={{ bottom: 50 }}
      visible={showSnackbar}
      onDismiss={() => setShowSnackbar(false)}
      action={{
        label: 'Close',
        onPress: () => {
          setShowSnackbar(false);
        },
      }}
    >
      {notification && notification.message ? notification.message : 'Something went wrong...'}
    </Snackbar>
  );
}

export default NotificationContainer;

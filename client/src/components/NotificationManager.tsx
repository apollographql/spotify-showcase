import cx from 'classnames';
import { useReactiveVar } from '@apollo/client';
import { notificationsVar, Notification as NotificationType } from '../vars';
import Notification from './Notification';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { useEffect, useRef } from 'react';

const scheduleRemoval = (
  notification: NotificationType,
  onRemoved: (notification: NotificationType) => void
) => {
  return setTimeout(() => {
    notificationsVar(notificationsVar().filter((n) => n !== notification));
    onRemoved(notification);
  }, 3000);
};

const NotificationManager = () => {
  const ref = useRef<Map<NotificationType, NodeJS.Timeout>>(new Map());
  const notifications = useReactiveVar(notificationsVar);
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    const unset = (notification: NotificationType) => {
      ref.current.delete(notification);
    };

    notifications.forEach((notification) => {
      if (!ref.current.has(notification)) {
        const id = scheduleRemoval(notification, unset);

        ref.current.set(notification, id);
      }
    });
  }, [notifications]);

  return (
    <div
      className={cx(
        'fixed left-1/2 flex max-w-md -translate-x-1/2 flex-col items-center gap-4',
        isLoggedIn ? 'bottom-32' : 'bottom-8',
        {
          hidden: notifications.length === 0,
        }
      )}
    >
      {notifications.map((notification, index) => {
        return <Notification key={index} notification={notification} />;
      })}
    </div>
  );
};

export default NotificationManager;

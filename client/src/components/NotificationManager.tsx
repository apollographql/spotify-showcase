import cx from 'classnames';
import { useReactiveVar } from '@apollo/client';
import { notificationsVar, Notification } from '../vars';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { useEffect, useRef } from 'react';

const scheduleRemoval = (
  notification: Notification,
  onRemoved: (notification: Notification) => void
) => {
  return setTimeout(() => {
    notificationsVar(notificationsVar().filter((n) => n !== notification));
    onRemoved(notification);
  }, 3000);
};

const NotificationManager = () => {
  const ref = useRef<Map<Notification, NodeJS.Timeout>>(new Map());
  const notifications = useReactiveVar(notificationsVar);
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    const unset = (notification: Notification) => {
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
        return (
          <div
            key={index}
            className="bg-blue animate-fade-in w-max rounded p-4 text-center text-white"
          >
            {notification.message}
          </div>
        );
      })}
    </div>
  );
};

export default NotificationManager;

import { Notification, notificationsVar } from './vars';

interface ScheduleRemovalOptions {
  onRemoved?: (notification: Notification) => void;
}

const notificationManager = {
  add: (notification: Notification) => {
    notificationsVar([...notificationsVar(), notification]);
  },
  remove: (notification: Notification) => {
    notificationsVar(notificationsVar().filter((n) => n !== notification));
  },
  scheduleRemoval: (
    notification: Notification,
    delay: number,
    options: ScheduleRemovalOptions = {}
  ) => {
    return setTimeout(() => {
      notificationManager.remove(notification);
      options.onRemoved?.(notification);
    }, delay);
  },
};

export default notificationManager;

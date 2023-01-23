import { Notification as NotificationType } from '../vars';

interface NotificationProps {
  notification: NotificationType;
}

const Notification = ({ notification }: NotificationProps) => {
  return (
    <div className="bg-blue animate-fade-in w-max select-none rounded py-3 px-4 text-center text-white">
      {notification.message}
    </div>
  );
};

export default Notification;

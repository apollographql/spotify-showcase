import { notificationVar } from './vars';

let timeoutId: NodeJS.Timeout;

const DEFAULT_DURATION = 5000;

interface NotifyOptions {
  duration?: number;
}

export const notify = (message: string, options?: NotifyOptions) => {
  clearTimeout(timeoutId);
  notificationVar({ message });

  timeoutId = setTimeout(() => {
    notificationVar(null);
  }, options?.duration ?? DEFAULT_DURATION);
};

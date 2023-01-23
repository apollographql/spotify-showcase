import { makeVar } from '@apollo/client';
import { readAuthToken } from './utils';

export interface Notification {
  message: string;
}

export const isLoggedInVar = makeVar(Boolean(readAuthToken()));
export const notificationVar = makeVar<Notification | null>(null);

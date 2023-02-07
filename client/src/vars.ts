import { makeVar } from '@apollo/client';
import { readToken } from './auth';

export interface Notification {
  message: string;
}

export const isLoggedInVar = makeVar(Boolean(readToken('access')));
export const notificationVar = makeVar<Notification | null>(null);

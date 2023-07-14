import { makeVar } from '@apollo/client';
import { readToken } from './auth';

export interface Notification {
  message: string;
}

export const isLoggedInVar = makeVar(Boolean(readToken()));
export const notificationVar = makeVar<Notification | null>(null);
export const persistedQueryMode = makeVar(false);

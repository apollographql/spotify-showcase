import { makeVar } from '@apollo/client';
import { readToken } from './auth';
import { STORAGE_KEYS } from './constants';

export interface Notification {
  message: string;
}

export const isLoggedInVar = makeVar(Boolean(readToken()));
export const notificationVar = makeVar<Notification | null>(null);
export const persistedQueryModeVar = makeVar(
  JSON.parse(localStorage.getItem(STORAGE_KEYS.PERSISTED_QUERY_MODE) ?? 'false')
);

persistedQueryModeVar.onNextChange((value) => {
  localStorage.setItem(STORAGE_KEYS.PERSISTED_QUERY_MODE, value);
});

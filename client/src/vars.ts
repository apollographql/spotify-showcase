import { makeVar } from '@apollo/client';
import { readToken } from './auth';
import { STORAGE_KEYS } from './constants';
import { readFromStorage, writeToStorage } from './utils/storage';

export interface Notification {
  message: string;
}

export const isLoggedInVar = makeVar(Boolean(readToken()));
export const notificationVar = makeVar<Notification | null>(null);
export const persistedQueryModeVar = makeVar(
  readFromStorage<boolean>(STORAGE_KEYS.PERSISTED_QUERY_MODE) ?? false
);

persistedQueryModeVar.onNextChange((value) => {
  writeToStorage(STORAGE_KEYS.PERSISTED_QUERY_MODE, value);
});

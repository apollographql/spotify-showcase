import { makeVar } from '@apollo/client';
import { readToken } from './auth';
import { STORAGE_KEYS } from './constants';
import {
  readFromStorage,
  writeToStorage,
  removeFromStorage,
} from './utils/storage';

export interface Notification {
  message: string;
}

export const accessTokenVar = makeVar<string | null>(readToken());
export const isLoggedInVar = makeVar(Boolean(accessTokenVar()));
export const notificationVar = makeVar<Notification | null>(null);
export const persistedQueryModeVar = makeVar(
  readFromStorage<boolean>(STORAGE_KEYS.PERSISTED_QUERY_MODE) ?? false
);

accessTokenVar.onNextChange((token) => {
  isLoggedInVar(Boolean(token));

  if (token) {
    return writeToStorage(STORAGE_KEYS.ACCESS_TOKEN, token, String);
  }

  removeFromStorage(STORAGE_KEYS.ACCESS_TOKEN);
});

persistedQueryModeVar.onNextChange((value) => {
  writeToStorage(STORAGE_KEYS.PERSISTED_QUERY_MODE, value);
});

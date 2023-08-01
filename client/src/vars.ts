import { makeVar } from '@apollo/client';
import { readToken } from './auth';
import { STORAGE_KEYS } from './constants';
import { readFromStorage, writeToStorage, StorageKey } from './utils/storage';

export interface Notification {
  message: string;
}

const makePersistedVar = <TValue>(
  storageKey: StorageKey,
  defaultValue: TValue
) => {
  const reactiveVar = makeVar(
    readFromStorage<TValue>(storageKey) ?? defaultValue
  );

  reactiveVar.onNextChange((value) => {
    writeToStorage(storageKey, value);
  });

  return reactiveVar;
};

export const isLoggedInVar = makeVar(Boolean(readToken()));
export const notificationVar = makeVar<Notification | null>(null);

export const highlightSuspenseBoundaries = makePersistedVar(
  STORAGE_KEYS.HIGHLIGHT_SUSPENSE_BOUNDARIES,
  false
);

export const persistedQueryModeVar = makePersistedVar(
  STORAGE_KEYS.PERSISTED_QUERY_MODE,
  false
);

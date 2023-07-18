import { STORAGE_KEYS } from '../constants';

type StorageKey = {
  [K in keyof typeof STORAGE_KEYS]: (typeof STORAGE_KEYS)[K];
}[keyof typeof STORAGE_KEYS];

export function readFromStorage<TValue = unknown>(
  key: StorageKey,
  parse: (rawValue: string) => TValue = JSON.parse
) {
  try {
    return parse(localStorage.getItem(key) ?? '');
  } catch (e) {
    // do nothing
  }
}

export function writeToStorage<TValue = unknown>(
  key: StorageKey,
  value: TValue,
  serialize: (value: TValue) => string = JSON.stringify
) {
  localStorage.setItem(key, serialize(value));
}

export function removeFromStorage(key: StorageKey) {
  localStorage.removeItem(key);
}

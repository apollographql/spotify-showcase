import { makeVar, ReactiveVar } from '@apollo/client';

function readPersisted<T>(
  key: string,
  defaultValue: T,
  shouldUsePersistance = () => true
) {
  if (!shouldUsePersistance()) return defaultValue;
  const read = window.localStorage.getItem(key);
  return read ? (JSON.parse(read) as T) : defaultValue;
}

function subscribeVar<T>(reactive: ReactiveVar<T>, cb: (newVal: T) => void) {
  reactive.onNextChange(function subscription(value) {
    cb(value);
    reactive.onNextChange(subscription);
  });
}

function persistVar<T>(
  reactive: ReactiveVar<T>,
  key: string,
  shouldPersist?: ReactiveVar<boolean>
) {
  subscribeVar(reactive, (value) => {
    if (shouldPersist && !shouldPersist()) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  });
  if (shouldPersist) {
    subscribeVar(shouldPersist, (value) => {
      if (!value) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(reactive()));
      }
    });
  }
}

export function makePersistedVar<T>({
  key,
  defaultValue,
  shouldPersist,
}: {
  key: string;
  defaultValue: T;
  shouldPersist?: ReactiveVar<boolean>;
}) {
  const reactive = makeVar(readPersisted(key, defaultValue, shouldPersist));
  persistVar(reactive, key, shouldPersist);
  return reactive;
}

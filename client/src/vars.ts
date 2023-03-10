import { makeVar } from '@apollo/client';
import { readAuthToken } from './utils';
import { makePersistedVar } from './utils/persistReactive';

export interface Notification {
  message: string;
}

export const isLoggedInVar = makeVar(Boolean(readAuthToken()));
export const notificationVar = makeVar<Notification | null>(null);

export const persistOauth = makePersistedVar({
  key: 'oauth_persist',
  defaultValue: true,
});
export const clientId = makePersistedVar({
  key: 'oauth_client_id',
  defaultValue: '',
  shouldPersist: persistOauth,
});
export const clientSecret = makePersistedVar({
  key: 'oauth_client_secret',
  defaultValue: '',
  shouldPersist: persistOauth,
});
export const redirectUrl = makePersistedVar({
  key: 'oauth_redirect_url',
  defaultValue: `${window.location.origin}/oauth/finalize`,
  shouldPersist: persistOauth,
});
export const defaultCountryCode = makePersistedVar({
  key: 'defaultCountryCode',
  defaultValue: 'US',
});

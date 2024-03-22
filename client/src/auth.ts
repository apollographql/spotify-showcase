import { isLoggedInVar } from './vars';
import client from './apollo/client';
import { STORAGE_KEYS } from './constants';
import {
  AccessTokenResponse,
  RefreshAccessTokenResponse,
  refreshAccessToken,
} from './utils/oauth';

type TokenType = 'access' | 'refresh';

const TOKEN_TO_STORAGE_KEYS = {
  access: STORAGE_KEYS.ACCESS_TOKEN,
  refresh: STORAGE_KEYS.REFRESH_TOKEN,
} as const;

export const readToken = (tokenType: TokenType = 'access') => {
  try {
    // return localStorage.getItem(TOKEN_TO_STORAGE_KEYS[tokenType]);
    // console.log(localStorage.getItem(TOKEN_TO_STORAGE_KEYS[tokenType]));
    // return localStorage.getItem(TOKEN_TO_STORAGE_KEYS[tokenType]);
    // TODO: mock localStorage
    return 'abc';
  } catch (e) {
    return null;
  }
};

const writeToken = (tokenType: TokenType, value: string) => {
  localStorage.setItem(TOKEN_TO_STORAGE_KEYS[tokenType], value);
};

export const login = (response: AccessTokenResponse) => {
  const now = new Date();
  const expiresAt = now.setSeconds(now.getSeconds() + response.expires_in);

  writeToken('access', response.access_token);
  writeToken('refresh', response.refresh_token);
  localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, String(expiresAt));

  isLoggedInVar(true);
};

export const refreshSession = (response: RefreshAccessTokenResponse) => {
  const now = new Date();
  const expiresAt = now.setSeconds(now.getSeconds() + response.expires_in);

  writeToken('access', response.access_token);
  writeToken('refresh', response.refresh_token);
  localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, String(expiresAt));
};

export const getAccessToken = async () => {
  const accessToken = readToken('access');
  const expiresAt = Number(localStorage.getItem(STORAGE_KEYS.EXPIRES_AT));

  if (accessToken && Date.now() < expiresAt) {
    return accessToken;
  }

  const data = await refreshAccessToken();

  refreshSession(data);

  return data.access_token;
};

export const logout = () => {
  localStorage.clear();
  isLoggedInVar(false);
  client.clearStore();
};

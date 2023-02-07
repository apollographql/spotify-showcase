import { isLoggedInVar } from './vars';
import client from './apollo';
import { STORAGE_KEYS } from './constants';

type TokenType = 'access' | 'refresh';

interface AccessTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  refresh_token: string;
  expires_in: number;
  scope: string;
}

const TOKEN_TO_STORAGE_KEYS = {
  access: STORAGE_KEYS.ACCESS_TOKEN,
  refresh: STORAGE_KEYS.REFRESH_TOKEN,
} as const;

export const readToken = (tokenType: TokenType) => {
  try {
    return localStorage.getItem(TOKEN_TO_STORAGE_KEYS[tokenType]);
  } catch (e) {
    return null;
  }
};

const writeToken = (tokenType: TokenType, value: string) => {
  localStorage.setItem(TOKEN_TO_STORAGE_KEYS[tokenType], value);
};

export const login = (response: AccessTokenResponse) => {
  writeToken('access', response.access_token);
  writeToken('refresh', response.refresh_token);
  isLoggedInVar(true);
};

export const logout = () => {
  localStorage.clear();
  client.clearStore();
  isLoggedInVar(false);
};

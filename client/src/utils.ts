import { AUTH_TOKEN_KEY } from './constants';

export const readAuthToken = () => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (e) {
    return null;
  }
};

export const writeAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

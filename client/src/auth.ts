import { isLoggedInVar } from './vars';
import { removeAuthToken, writeAuthToken } from './utils';
import client from './apollo';

export const login = (token: string) => {
  writeAuthToken(token);
  isLoggedInVar(true);
};

export const logout = () => {
  removeAuthToken();
  isLoggedInVar(false);
  client.clearStore();
};

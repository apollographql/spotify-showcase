import client from './apollo';

export const logout = async () => {
  await fetch('/logout');
  client.clearStore();
};

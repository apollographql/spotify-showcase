import { readEnv } from '../utils/env';

const config = {
  get clientId() {
    return readEnv('SPOTIFY_CLIENT_ID');
  },
  get clientSecret() {
    return readEnv('SPOTIFY_CLIENT_SECRET');
  },
  redirectURI: 'http://localhost:3000/oauth/finalize',
};

export default config;

import { readEnv } from '../utils/env';

const config = {
  get clientId() {
    return readEnv('SPOTIFY_CLIENT_ID');
  },
  get clientSecret() {
    return readEnv('SPOTIFY_CLIENT_SECRET');
  },
  redirectURI: 'http://localhost:4000/oauth/finalize',
  clientURI: 'http://localhost:4000',
};

export default config;

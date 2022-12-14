import invariant from 'ts-invariant';

const readEnv = (key: string) => {
  const value = process.env[key];

  invariant(
    value,
    `\`process.env.${key}\` must be defined. To get started, visit the home page at http://localhost:3000.`
  );

  return value;
};

const config = {
  get clientId() {
    return readEnv('SPOTIFY_CLIENT_ID');
  },
  get clientSecret() {
    return readEnv('SPOTIFY_CLIENT_SECRET');
  },
  redirectURI: 'http://localhost:4000/oauth/finalize',
  clientURI: 'http://localhost:3000',
};

export default config;

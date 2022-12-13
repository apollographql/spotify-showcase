import invariant from 'ts-invariant';

const readEnv = (key: string) => {
  const value = process.env[key];

  invariant(value, `Ensure process.env.${key} is defined`);

  return value;
};

export default {
  clientId: readEnv('SPOTIFY_CLIENT_ID'),
  clientSecret: readEnv('SPOTIFY_CLIENT_SECRET'),
  redirectURI: 'http://localhost:4000/oauth/finalize',
  clientURI: 'http://localhost:3000',
};

import express, { Request } from 'express';
import fetch from 'node-fetch';
import config from '../config/spotify';

const router = express.Router();

const SCOPES = [
  'streaming',
  'user-follow-modify',
  'user-follow-read',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'user-modify-playback-state',
  'user-read-email',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-library-read',
  'user-library-modify',
  'user-top-read',
  'user-read-recently-played',
].join(' ');

router.get('/init', (_req, res) => {
  const query = new URLSearchParams();

  query.set('response_type', 'code');
  query.set('client_id', config.clientId);
  query.set('redirect_uri', config.redirectURI);
  query.set('scope', SCOPES);

  res.redirect(`https://accounts.spotify.com/authorize?${query}`);
});

router.get(
  '/finalize',
  async (
    req: Request<{}, {}, {}, Spotify.Response.Path['/authorize']>,
    res
  ) => {
    const body = new URLSearchParams();

    if ('error' in req.query) {
      throw new Error('Could not authenticate with authorize with Spotify');
    }

    body.append('grant_type', 'authorization_code');
    body.append('code', req.query.code);
    body.append('redirect_uri', config.redirectURI);

    const credentials = Buffer.from(
      `${config.clientId}:${config.clientSecret}`
    ).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        authorization: `Basic ${credentials}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    const { access_token } =
      (await response.json()) as Spotify.Response.Path['/api/token'];

    const params = new URLSearchParams();
    params.set('token', access_token);

    res.redirect(`${config.clientURI}/set-token?${params}`);
  }
);

export default router;

import express, { Request } from 'express';
import fetch from 'node-fetch';
import config from '../config/spotify';
import { OAUTH_SCOPES } from '../constants';
import { Spotify } from '../dataSources/spotify.types';

const router = express.Router();

router.get('/init', (_req, res) => {
  const query = new URLSearchParams();

  query.set('response_type', 'code');
  query.set('client_id', config.clientId);
  query.set('redirect_uri', config.redirectURI);
  query.set('scope', OAUTH_SCOPES.join(' '));

  res.redirect(`https://accounts.spotify.com/authorize?${query}`);
});

router.get(
  '/finalize',
  async (req: Request<{}, {}, {}, Spotify.Response.GET['/authorize']>, res) => {
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

    const { access_token } = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          authorization: `Basic ${credentials}`,
          'content-type': 'application/x-www-form-urlencoded',
        },
        body,
      }
    ).then((res) => res.json() as Promise<Spotify.Response.GET['/api/token']>);

    const params = new URLSearchParams();
    params.set('token', access_token);

    res.redirect(`/set-token?${params}`);
  }
);

export default router;

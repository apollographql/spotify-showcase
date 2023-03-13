import express, { Request } from 'express';
import fetch from 'node-fetch';
import config from '../config/spotify';
import {
  OAUTH_SCOPES,
  REFRESH_TOKEN_COOKIE_NAME,
  TOKEN_COOKIE_NAME,
} from '../constants';
import { Spotify } from '../dataSources/spotify.types';
import { getCookieOptions } from '../utils/getCookieOptions';

const router = express.Router();

export interface OauthSessionData {
  clientId?: string;
  clientSecret?: string;
  redirectUrl?: string;
}

/**
 * A helper for allowing the user to enter clientId, clientSecret and redirectUrl on the client.
 * This is only used in CodeSandbox, where the user cannot set ENV variables.
 * In a real application, those would be set in ENV, and not be user-provided.
 */
router.post(
  '/init',
  express.urlencoded(),
  async (
    req: Request<
      unknown,
      unknown,
      OauthSessionData & { defaultCountryCode?: string }
    >,
    res
  ) => {
    await new Promise((resolve) => req.session.regenerate(resolve));
    req.session.oauth ??= {};
    req.session.oauth.clientId = req.body.clientId;
    req.session.oauth.clientSecret = req.body.clientSecret;
    req.session.oauth.redirectUrl = req.body.redirectUrl;
    req.session.defaultCountryCode = req.body.defaultCountryCode;
    await new Promise((resolve) => req.session.save(resolve));
    res.redirect('/oauth/init');
  }
);

router.get('/init', (req, res) => {
  const query = new URLSearchParams();

  query.set('response_type', 'code');
  query.set('client_id', config.clientId);
  query.set('redirect_uri', config.redirectURI);
  query.set('scope', OAUTH_SCOPES.join(' '));

  res.redirect(`https://accounts.spotify.com/authorize?${query}`);
});

router.get('/in_progress', (req, res) => {
  res.json({ in_progress: req.session.oauth !== undefined });
});

router.get(
  '/finalize',
  async (
    req: Request<unknown, unknown, unknown, Spotify.Response.GET['/authorize']>,
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

    const { access_token, refresh_token } = await fetch(
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

    res.cookie(TOKEN_COOKIE_NAME, access_token, getCookieOptions(req));
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
      ...getCookieOptions(req),
      path: '/oauth',
    });
    res.send(
      '<html><body><script type="text/javascript">window.close()</script></html>'
    );
  }
);

router.get('/refresh_token', async function (req, res) {
  const refresh_token = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

  if (!refresh_token) {
    res.status(400).send('No token - could not reauthenticate!');
  }

  const credentials = Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString('base64');

  const body = new URLSearchParams();
  body.append('grant_type', 'refresh_token');
  body.append('refresh_token', refresh_token);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const { access_token } =
    (await response.json()) as Spotify.Response.GET['/api/token'];

  if (access_token) {
    res.cookie(TOKEN_COOKIE_NAME, access_token, getCookieOptions(req));
    res.end();
  } else {
    res.clearCookie(TOKEN_COOKIE_NAME, getCookieOptions(req));
    res.status(400).end();
  }
});


export default router;

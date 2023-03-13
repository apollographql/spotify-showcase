import express, { Request } from 'express';
import fetch from 'node-fetch';
import config from '../config/spotify';
import { OAUTH_SCOPES, TOKEN_COOKIE_NAME } from '../constants';
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
    req.session.oauth = {};
    req.session.oauth.clientId = req.body.clientId;
    req.session.oauth.clientSecret = req.body.clientSecret;
    req.session.oauth.redirectUrl = req.body.redirectUrl;
    req.session.defaultCountryCode = req.body.defaultCountryCode;
    res.redirect('/oauth/init');
  }
);

router.get('/init', (req, res) => {
  req.session.oauth ??= {};
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

    req.session.oauth = undefined;
    res.cookie(TOKEN_COOKIE_NAME, access_token, getCookieOptions(req));
    res.send(
      '<html><body><script type="text/javascript">window.close()</script></html>'
    );
  }
);

export default router;

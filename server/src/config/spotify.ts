import { readEnv } from '../utils/env';
import { getRequest } from '../utils/globalRequestMiddleware';

const config = {
  get clientId() {
    const request = getRequest();
    return request.session.oauth?.clientId || readEnv('SPOTIFY_CLIENT_ID');
  },
  get clientSecret() {
    const request = getRequest();
    return (
      request.session.oauth?.clientSecret || readEnv('SPOTIFY_CLIENT_SECRET')
    );
  },
  get isCodeSandbox() {
    const request = getRequest();
    const forwardedHost = request.headers['x-forwarded-host'] as
      | string
      | undefined;
    const hostname = forwardedHost ?? request.hostname;
    return hostname.endsWith('.csb.app');
  },
  get redirectURI() {
    const request = getRequest();
    return (
      request.session.oauth?.redirectUrl ||
      `http://localhost:3000/oauth/finalize`
    );
  },
};

export default config;

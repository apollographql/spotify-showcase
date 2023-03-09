import { readEnv } from '../utils/env';
import { getRequest } from '../utils/globalRequestMiddleware';

const config = {
  get clientId() {
    const request = getRequest();
    return (
      (request.cookies.SPOTIFY_CLIENT_ID as string) ??
      readEnv('SPOTIFY_CLIENT_ID')
    );
  },
  get clientSecret() {
    const request = getRequest();
    return (
      (request.cookies.SPOTIFY_CLIENT_SECRET as string) ??
      readEnv('SPOTIFY_CLIENT_SECRET')
    );
  },
  get redirectURI() {
    const request = getRequest();
    // handle CodeSandbox
    const forwardedProtocol = request.headers['x-forwarded-proto'] as
      | string
      | undefined;
    const forwardedHost = request.headers['x-forwarded-host'] as
      | string
      | undefined;
    const forwardedPort = request.headers['x-forwarded-port'] as
      | string
      | undefined;

    const protocol = forwardedProtocol ?? request.protocol;
    const hostname = forwardedHost ?? request.hostname;
    const port = forwardedPort
      ? `:${forwardedPort}`
      : hostname.endsWith('.csb.app')
      ? ''
      : ':3000';

    return `${protocol}://${hostname}${port}/oauth/finalize`;
  },
};

export default config;

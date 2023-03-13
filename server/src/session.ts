import { RequestHandler } from 'express';
import session, { MemoryStore, SessionData } from 'express-session';
import { IncomingMessage } from 'http';
import { getCookieOptions } from './utils/getCookieOptions';
import { OauthSessionData } from './routes/oauth';
import { readEnv } from './utils/env';
import { isCodeSandbox } from './config/spotify';

declare module 'express-session' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface SessionData {
    oauth?: OauthSessionData;
    /**
     * Since our sessionStore is recreated every time the server restarts,
     * this value will get lost on server restart as well.
     * That's not a problem for the `oauth` data, because that is very short-lived - but it is for the default country code.
     * TODO: maybe look into `session-file-store`, or move `defaultCountryCode` into a normal Cookie?
     */
    defaultCountryCode?: string;
  }
}

// environment variable
const secret = readEnv('SESSION_SECRET', {
  defaultValue: 'dontUseInProduction',
});
const sessionStore = new MemoryStore();

/**
 * wrap the session handler in another handler, because we need access to the request to figure out if we want a secure cookie
 */
export const sessionHandler: RequestHandler = (req, res, next) => {
  session({
    secret,
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
    proxy: isCodeSandbox(req),
    cookie: getCookieOptions(req),
  })(req, res, next);
};

export async function readSessionForWebSocket(req: IncomingMessage) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrappedReq = { headers: req.headers, originalUrl: '/' } as any;

  await new Promise((resolve) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sessionHandler(wrappedReq, {} as any, resolve)
  );
  return wrappedReq.session as SessionData;
}

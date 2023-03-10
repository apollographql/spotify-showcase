// use a new session secret for every time the service is restarted
// this will invalidate all sessions on server restart,
// so in a real production environment this is probably an

import { randomBytes } from 'crypto';
import { RequestHandler } from 'express';
import session, { MemoryStore } from 'express-session';
import config from './config/spotify';

// environment variable
const secret = randomBytes(48).toString('hex');
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
    cookie: {
      httpOnly: true,
      secure: config.isSecure,
      sameSite: 'lax', // used in CSB iframes
    },
  })(req, res, next);
};

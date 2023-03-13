import express from 'express';
import { REFRESH_TOKEN_COOKIE_NAME, TOKEN_COOKIE_NAME } from '../constants';
import { getCookieOptions } from '../utils/getCookieOptions';

import oauth from './oauth';

const router = express.Router();

router.use('/oauth', oauth);
router.use('/login', (_, res) => {
  return res.redirect(307, '/oauth/init');
});
router.use('/logout', (req, res) => {
  res.clearCookie(TOKEN_COOKIE_NAME, getCookieOptions(req));
  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
    ...getCookieOptions(req),
    path: '/oauth',
  });
  res.end();
});

export default router;

import express from 'express';

import oauth from './oauth';

const router = express.Router();

router.use('/oauth', oauth);
router.use('/login', (_, res) => {
  return res.redirect('/oauth/init');
});

export default router;

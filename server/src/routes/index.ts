import express from 'express';

import oauth from './oauth';

const router = express.Router();

router.use('/oauth', oauth);

export default router;

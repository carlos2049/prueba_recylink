import express from 'express';

import medicals from './medicals.routes'

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'rutaaa',
  });
});

router.use('/medicals', medicals )

export default router;

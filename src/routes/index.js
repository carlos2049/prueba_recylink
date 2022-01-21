import express from 'express';

import medicals from './medicals.routes'
import patients from './patients.routes'

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'rutaaa',
  });
});

router.use('/medicals', medicals )
router.use('/patients', patients )

export default router;

import express from 'express';
// import passport from 'passport';
import {
  getMedicalsAll,
  getMedicalById,
  createMedical
} from '../controllers/MedicalController';

const router = express.Router();

router.get('/', getMedicalsAll);
router.get('/:id', getMedicalById);
router.post('/', createMedical);
// router.put('/:jobId', updateJob);
// router.delete('/:jobId', deleteJob);

export default router;
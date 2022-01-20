import express from 'express';
// import passport from 'passport';
import {
  getMedicalsAll,
  getMedicalById,
  createMedical,
  deleteMedicalById
} from '../controllers/MedicalController';

const router = express.Router();

router.get('/', getMedicalsAll);
router.get('/:id', getMedicalById);
router.post('/', createMedical);
// router.put('/:jobId', updateJob);
router.delete('/:id', deleteMedicalById);

export default router;
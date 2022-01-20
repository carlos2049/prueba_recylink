import express from 'express';
import {
  getMedicalsAll,
  getMedicalById,
  createMedical,
  deleteMedicalById,
  updateMedicalById
} from '../controllers/MedicalController';

const router = express.Router();

router.get('/', getMedicalsAll);
router.get('/:id', getMedicalById);
router.post('/', createMedical);
router.put('/:id', updateMedicalById);
router.delete('/:id', deleteMedicalById);

export default router;
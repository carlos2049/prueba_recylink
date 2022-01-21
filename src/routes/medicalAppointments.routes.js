import express from 'express';
import {
  // getMedicalsAll,
  // getMedicalById,
  createMedicalAppointment,
  // deleteMedicalById,
  // updateMedicalById
} from '../controllers/MedicalAppointmentController';

const router = express.Router();

// router.get('/', getMedicalsAll);
// router.get('/:id', getMedicalById);
router.post('/', createMedicalAppointment);
// router.put('/:id', updateMedicalById);
// router.delete('/:id', deleteMedicalById);

export default router;
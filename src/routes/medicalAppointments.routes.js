import express from 'express';
import {
  // getMedicalsAll,
  findAllAppointmentsByMedical,
  createMedicalAppointment,
  cancelAppointment,
  // updateMedicalById
} from '../controllers/MedicalAppointmentController';

const router = express.Router();

// router.get('/', getMedicalsAll);
router.get('/', findAllAppointmentsByMedical);
router.post('/', createMedicalAppointment);
// router.put('/:id', updateMedicalById);
router.delete('/:id', cancelAppointment);

export default router;
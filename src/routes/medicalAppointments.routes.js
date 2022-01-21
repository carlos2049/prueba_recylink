import express from 'express';
import {
  findAppointmentsByMedicalById,
  findAllAppointmentsByMedical,
  createMedicalAppointment,
  cancelAppointment,
  updateAppointmentsByMedical
} from '../controllers/MedicalAppointmentController';

const router = express.Router();

router.get('/:id', findAppointmentsByMedicalById);
router.get('/', findAllAppointmentsByMedical);
router.post('/', createMedicalAppointment);
router.put('/:id', updateAppointmentsByMedical);
router.delete('/:id', cancelAppointment);

export default router;
import express from 'express';
import {
  getPatientsAll,
  getPatientById,
  createPatient,
  deletePatientById,
  updatePatientById
} from '../controllers/PatientController';

const router = express.Router();

router.get('/', getPatientsAll);
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.put('/:id', updatePatientById);
router.delete('/:id', deletePatientById);

export default router;
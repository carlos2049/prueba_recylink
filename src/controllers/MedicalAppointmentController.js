import models from '../models'
import moment from 'moment'
const { MedicalAppointment, Medical, Patient } = models


export const createMedicalAppointment = async (req, res) =>{
  try {
    const {
      medicalId,
      patientId,
      date,
      hour,
      minutes
    } = req.body
    const findMedicalId = await Medical.findByPk(medicalId);
    const findPatientId = await Patient.findByPk(patientId);

    if(!findMedicalId){
      res.status(400).json({success: false, message: 'no se encuenta medico asociado al id'})
      return
    }
    if(!findPatientId){
      res.status(400).json({success: false, message: 'no se encuenta paciente asociado al id'})
      return
    }

    if(!date){
      res.status(400).json({success: false, message: 'debe contener una fecha de reserva'})
      return
    }
    
    const validate = moment(date, 'YYYY-MM-DD',true).isValid()
    if(!validate){
      res.status(400).json({success: false, message: 'fecha no valida'})
      return
    }

    const today = moment().format('YYYY-MM-DD')

    const isAfer = moment(date, 'YYYY-MM-DD').isAfter(today)
    if(today === date || !isAfer){
      res.status(400).json({success: false, message: 'fecha no debe ser menor a hoy'})
      return
    }

    if(Number(hour) > 19 || Number(hour) < 9 ){
      res.status(400).json({success: false, message: 'la hora debe ser mayor de las 9hr y menor de 19hr'})
      return
    }

    if(minutes !== '15' && minutes !== '00' && minutes !== '30' && minutes !== '45'){
      res.status(400).json({success: false, message: 'la cita debe ser cada 15 min. ejem: 00, 15, 30, 45'})
      return
    }

    const findBookedAppointment = await MedicalAppointment.findAll({
      where:{
        medicalId,
        date: new Date(date),
        hour,
        minutes
      }
    })
    if(findBookedAppointment.length > 0){
      res.status(400).json({success: false, message: 'La cita para el medico ya esta ocupada'})
      return
    }

    const createMedical = await MedicalAppointment.create({
      medicalId,
      patientId,
      date,
      hour,
      minutes
    })

    res.status(200).json({success: true, createMedical})
  } catch (error) {
    console.log(error)
  }
}
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
    const medical = await Medical.findByPk(medicalId);
    const patient = await Patient.findByPk(patientId);

    if(!medical){
      res.status(400).json({success: false, message: 'no se encuenta medico asociado al id'})
      return
    }
    if(!patient){
      res.status(400).json({success: false, message: 'no se encuenta paciente asociado al id'})
      return
    }
    const dateValidated = validateDate(date)
    if(dateValidated){
      res.status(400).json({success: false, message: dateValidated})
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
      res.status(400).json({success: false, message: 'La cita para el medico ya esta ocupada en esta fecha y horario'})
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


const validateDate = (date) =>{
  if(!date){
    return 'debe contener una fecha de reserva'
  }
  
  const validate = moment(date, 'YYYY-MM-DD',true).isValid()
  if(!validate){
    return 'fecha no valida'
  }

  const today = moment().format('YYYY-MM-DD')

  const isAfer = moment(date, 'YYYY-MM-DD').isAfter(today)
  if(today === date || !isAfer){
    return 'fecha no debe ser menor a hoy'
  }
  return false
}

export const cancelAppointment = async (req, res) =>{
  try {
    const {id} = req.params
    const medicalAppointment = await MedicalAppointment.findByPk(id);
    if(medicalAppointment){
      await medicalAppointment.update({
        deletedAt: new Date()
      })
      res.status(200).json({success:true, message: 'Registro eliminado'})
    }else{
      res.status(400).json({success:true, message: 'Registro no encontrado'})
    }
  } catch (error) {
    console.log(error)
    
  }
}

export const findAllAppointmentsByMedical = async (req, res) => {
  try {
    const {medical} = req.query
    
    const medicalAppointmentt = await MedicalAppointment.findAll({
      where:{
        medicalId: medical,
        deletedAt: null
      }
    });
    if(medicalAppointmentt){
      res.status(200).json({success: true, medicalAppointmentt})
    }else{
      res.status(400).json({success: false, message: 'no se encuentra un medico asociado al Id'})
    }
    
  } catch (error) {
    console.log(error)
  }
}
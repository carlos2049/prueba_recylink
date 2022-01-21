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

    if(!medical || (medical && medical.dataValues && medical.dataValues.deletedAt)){
      res.status(400).json({success: false, message: 'no se encuenta medico asociado al id'})
      return
    }
    if(!patient || (patient && patient.dataValues && patient.dataValues.deletedAt)){
      res.status(400).json({success: false, message: 'no se encuenta paciente asociado al id'})
      return
    }
    const dateValidated = validateDate(date)
    if(dateValidated){
      res.status(400).json({success: false, message: dateValidated})
      return
    }
    
    const validated = await fieldValidated(medicalId, date, hour, minutes)
    if(!validated.success){
      return res.status(400).json({success: false, message: validated})
    }

    const medicalAppointment = await MedicalAppointment.create({
      medicalId,
      patientId,
      date,
      hour,
      minutes
    })

    res.status(200).json({success: true, medicalAppointment})
  } catch (error) {
    console.log(error)
  }
}


const validateDate = (date) =>{
  if(!date){
    return 'debe contener una fecha de reserva'
  }
  
  const dateValidated = moment(date, 'YYYY-MM-DD',true).isValid()
  if(!dateValidated){
    return 'fecha no valida'
  }

  const today = moment().format('YYYY-MM-DD')

  const isAfer = moment(date, 'YYYY-MM-DD').isBefore(today)
  if(isAfer){
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

export const findAppointmentsByMedicalById = async (req, res) =>{
  try {
    const {id} = req.params
    
    const medicalAppointment = await MedicalAppointment.findByPk(id)
    if(medicalAppointment){
      res.status(200).json({success: true, medicalAppointment})
  
    }else{
      res.status(400).json({success: false, message: 'no se encuentra la cita asociado al Id'})
    }
    
  } catch (error) {
    console.log(error)
  }
}

export const updateAppointmentsByMedical = async (req, res) => {
  try {
    const {id} = req.params
    const {medicalId, date, hour, minutes} = req.body

    const medicalAppointment = await MedicalAppointment.findByPk(id)
    if(medicalAppointment && medicalAppointment.dataValues && medicalAppointment.dataValues.deletedAt){
      return res.status(400).json({success: false, message: 'Esta cita fue eliminada'})
    }

    const dateValidated = validateDate(date)
    if(dateValidated){
      res.status(400).json({success: false, message: dateValidated})
      return
    }

    const validated = await fieldValidated(medicalId, date, hour, minutes)
    if(!validated.success){
      return res.status(400).json({success: false, message: validated})
    }
    
    if(medicalAppointment){
      await medicalAppointment.update({
        date,
        hour,
        minutes
      })
      res.status(200).json({success: true, message: 'Cita medica actualizada'})
  
    }else{
      res.status(400).json({success: false, message: 'no se encuentra la cita asociado al Id'})
    }
    
  } catch (error) {
    console.log(error)
  }
}

const fieldValidated = async (medicalId,date, hour, minutes) => {
  if(Number(hour) > 19 || Number(hour) < 9 ){
    return {
      success:false,
      message:'la hora debe ser mayor de las 9hr y menor de 19hr'
    }
  }

  if(minutes !== '15' && minutes !== '00' && minutes !== '30' && minutes !== '45'){
    return {
      success:false,
      message:'la cita debe ser cada 15 min. ejem: 00, 15, 30, 45'
    } 
  }

  const medicalAppointmentFound = await MedicalAppointment.findAll({
    where:{
      medicalId,
      date: new Date(date),
      hour,
      minutes,
      deletedAt: null
    }
  })



  if(medicalAppointmentFound.length > 0){
    return {
      success:false,
      message:'La cita para el medico ya esta ocupada en esta fecha y horario'
    } 
  }
  return {success:true}
}
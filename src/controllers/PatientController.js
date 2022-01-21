import models from '../models'

const { Patient } = models

export const getPatientsAll = async (req, res)  => {
  try {
    const patients = await Patient.findAll({
      where:{
        deletedAt: null
      }
    })
    res.status(200).json({success: true, patients})
  } catch (error) {
    console.log(error)
  }
}

export const getPatientById = async (req, res) => {
  try {
    const {id} = req.params
    const patient = await Patient.findByPk(id);
    if(patient){
      res.status(200).json({success: true, patient})
    }else{
      res.status(200).json({success: false, message: 'no se encuentra un paciente asociado al Id'})
    }
    
  } catch (error) {
    console.log(error)
  }
}

export const createPatient = async (req, res) => {
  try {
    const {
      name,
      lastname,
      rut
    } = req.body

    const patientRut = await Patient.findAll({
      where:{
        rut
      }
    })
    if(patientRut.length > 0){
      res.status(400).json({success: false, message: 'Rut paciente ya existe'})
      return
    } 

    const patient = await Patient.create({
      name,
      lastname,
      rut
    })

    res.status(200).json({success: true, patient})
  } catch (error) {
    console.log(error)
  }
}

export const deletePatientById = async (req, res) => {
  try {
    const {id} = req.params
    const patient = await Patient.findByPk(id);
    if(patient){
      await patient.update({
        deletedAt: new Date()
      })
      res.status(200).json({success:true, message: 'Registro del paciente eliminado'})
    }
  } catch (error) {
    console.log(error)
  }
}

export const updatePatientById = async (req, res) => {
  try {
    const {id} = req.params
    const {
      name,
      lastname,
      rut
    } = req.body

    const patient = await Patient.findByPk(id);
    if(patient){
      await patient.update({
        name,
        lastname,
        rut
      })
      res.status(200).json({success:true, message: 'Registro del paciente actualizado'})
    }
  } catch (error) {
    console.log(error)
  }
}
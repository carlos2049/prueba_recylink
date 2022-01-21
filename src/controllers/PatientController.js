import models from '../models'

const { Patient } = models

export const getPatientsAll = async (req, res)  => {
  try {
    const getPatiens = await Patient.findAll({
      where:{
        deletedAt: null
      }
    })
    res.status(200).json({success: true, getPatiens})
  } catch (error) {
    console.log(error)
  }
}

export const getPatientById = async (req, res) => {
  try {
    const {id} = req.params
    const getPatient = await Patient.findByPk(id);
    if(getPatient){
      res.status(200).json({success: true, getPatient})
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

    const createPatient = await Patient.create({
      name,
      lastname,
      rut
    })

    res.status(200).json({success: true, createPatient})
  } catch (error) {
    console.log(error)
  }
}

export const deletePatientById = async (req, res) => {
  try {
    const {id} = req.params
    const findPatient = await Patient.findByPk(id);
    if(findPatient){
      await findPatient.update({
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

    const findPatient = await Patient.findByPk(id);
    if(findPatient){
      await findPatient.update({
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
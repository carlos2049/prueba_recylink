import res from 'express/lib/response'
import cli from 'nodemon/lib/cli'
import models from '../models'

const { Medical } = models

export const getMedicalsAll = async (req, res) => {
  try {

    const getMedicals = await Medical.findAll()
    res.status(200).json({success: true, getMedicals})
  } catch (error) {
    console.log(error)
  }
}

export const getMedicalById = async (req, res) => {
  try {
    const {id} = req.params
    const getmedical = await Medical.findByPk(id);
    if(getmedical){
      res.status(200).json({success: true, getmedical})
    }else{
      res.status(200).json({success: false, message: 'no se encuentra un medico asociado al Id'})
    }
    
  } catch (error) {
    console.log(error)
  }
}

export const createMedical = async (req, res) => {
  try {
    const {
      name,
      lastname,
      rut
    } = req.body

    const createMedical = await Medical.create({
      name,
      lastname : lastname,
      rut
    })

    res.status(200).json({success: true, createMedical})
  } catch (error) {
    console.log(error)
  }
}

export const deleteMedicalById = async (req, res) => {
  try {
    const {id} = req.params
    const findMedical = await Medical.findByPk(id);
    if(findMedical){
      await findMedical.destroy()
      res.status(200).json({success:true, message: 'registro del medico eliminado'})
    }
  } catch (error) {
    console.log(error)
  }
}
import models from '../models'

const { Medical } = models

export const getMedicalsAll = async (req, res) => {
  try {
    const getMedicals = await Medical.findAll({
      where:{
        deletedAt: null
      }
    })
    res.status(200).json({success: true, getMedicals})
  } catch (error) {
    console.log(error)
  }
}

export const getMedicalById = async (req, res) => {
  try {
    const {id} = req.params
    const getMedical = await Medical.findByPk(id);
    if(getMedical){
      res.status(200).json({success: true, getMedical})
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
      await findMedical.update({
        deletedAt: new Date()
      })
      res.status(200).json({success:true, message: 'Registro del medico eliminado'})
    }
  } catch (error) {
    console.log(error)
  }
}
export const updateMedicalById = async (req, res) => {
  try {
    const {id} = req.params
    const {
      name,
      lastname,
      rut
    } = req.body

    const findMedical = await Medical.findByPk(id);
    if(findMedical){
      await findMedical.update({
        name,
        lastname,
        rut
      })
      res.status(200).json({success:true, message: 'Registro del medico actualizado'})
    }
  } catch (error) {
    console.log(error)
  }
}
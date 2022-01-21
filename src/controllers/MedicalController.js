import models from '../models'

const { Medical } = models

export const getMedicalsAll = async (req, res) => {
  try {
    const medicals = await Medical.findAll({
      where:{
        deletedAt: null
      }
    })
    res.status(200).json({success: true, medicals})
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
      res.status(400).json({success: false, message: 'no se encuentra un medico asociado al Id'})
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

    if(!name){
      res.status(400).json({success: false, message: 'Debe ingresar un nombre'})
      return
    }
    if(!lastname){
      res.status(400).json({success: false, message: 'Debe ingresar un apellido'})
      return
    }
    if(!rut){
      res.status(400).json({success: false, message: 'Debe ingresar rut'})
      return
    }

    const medicalRut = await Medical.findAll({
      where:{
        rut
      }
    })

    if(medicalRut.length > 0){
      res.status(400).json({success: false, message: 'Rut medico ya existe'})
      return
    } 
    const medical = await Medical.create({
      name,
      lastname : lastname,
      rut
    })

    res.status(200).json({success: true, medical})
  } catch (error) {
    console.log(error)
  }
}

export const deleteMedicalById = async (req, res) => {
  try {
    const {id} = req.params
    const medical = await Medical.findByPk(id);
    if(medical){
      await medical.update({
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

    const medical = await Medical.findByPk(id);
    if(medical){
      await medical.update({
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
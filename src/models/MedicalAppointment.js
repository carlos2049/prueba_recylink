import Sequelize from 'sequelize';

export default class MedicalAppointment extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      medicalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'medicals',
          key: 'id',
        },
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
      date:{
        allowNull: false,
        type: DataTypes.DATE,
      },
      hour:{
        allowNull: false,
        type: DataTypes.STRING,
      },
      minutes:{
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'medical_appointments',
      modelName: 'medicalAppointment',
      sequelize,
      timestamps: false,
    },
    );
  }
}
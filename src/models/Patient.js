import Sequelize from 'sequelize';

export default class Patient extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type:Sequelize.STRING,
          allowNull: false
        },
        rut: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      {
        tableName: 'patients',
        modelName: 'patient',
        sequelize,
        timestamps: false,
      },
    );
  }
}
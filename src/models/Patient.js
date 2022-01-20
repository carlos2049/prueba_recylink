import Sequelize from 'sequelize';

export default class Patient extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type:DataTypes.STRING,
          allowNull: false
        },
        rut: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
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
        tableName: 'patients',
        modelName: 'patient',
        sequelize,
        timestamps: false,
      },
    );
  }
}
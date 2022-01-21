
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('medical_appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      medicalId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'medicals',
          key: 'id',
        },
      },
      patientId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
      date:{
        allowNull: false,
        type: Sequelize.DATE,
      },
      hour:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      minutes:{
        allowNull: false,
        type: Sequelize.STRING,
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
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('medical_appointments')
};

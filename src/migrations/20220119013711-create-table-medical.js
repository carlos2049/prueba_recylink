'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('medical', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    }),
};

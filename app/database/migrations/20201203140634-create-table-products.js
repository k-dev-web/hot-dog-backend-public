'use strict';

module.exports = {
  up: async (queryInterface, Sequelize,) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    },{


    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products')
  }
};

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      plusMember: {
        type: Sequelize.BOOLEAN
      },
      plusPeriod: {
        type: Sequelize.DATE
      },
      sessionToken: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      isSellerAdmin: {
        type: Sequelize.BOOLEAN
      },
      isSellerCompany: {
        type: Sequelize.BOOLEAN
      },
      cart: {
        type: Sequelize.STRING
      },
      favs: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};

"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          id: 1,
          product: "Redmi",
          Category: "Mobile",
          Price: 5000,
          quantity: 10,
          furl: "",
          url: [],
          fav: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", [
      {
        id: 1
      }
    ]);
  }
};

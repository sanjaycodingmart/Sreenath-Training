"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      combo: DataTypes.STRING
    },
    {}
  );
  Cart.associate = function(models) {
    Cart.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Cart.belongsTo(models.Product, {
      foreignKey: "productId",
      onDelete: "CASCADE"
    });
    // associations can be defined here
  };
  return Cart;
};

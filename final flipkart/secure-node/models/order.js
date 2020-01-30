"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      userId: DataTypes.STRING,
      productId: DataTypes.INTEGER
    },
    {}
  );
  Order.associate = function(models) {
    Order.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Order.belongsTo(models.Product, {
      foreignKey: "productId",
      onDelete: "CASCADE"
    });
    // associations can be defined here
  };
  return Order;
};

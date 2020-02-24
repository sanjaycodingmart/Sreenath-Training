"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      userId: DataTypes.STRING,
      productId: DataTypes.INTEGER,
      rating: DataTypes.STRING,
      transId: DataTypes.STRING,
      tracking: DataTypes.STRING,
      estDD: DataTypes.STRING
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
    Order.belongsTo(models.Payment, {
      foreignKey: "transId",
      onDelete: "CASCADE",
      targetKey: "transId"
    });
    // associations can be defined here
  };
  return Order;
};

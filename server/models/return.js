"use strict";
module.exports = (sequelize, DataTypes) => {
  const Return = sequelize.define(
    "Return",
    {
      userId: DataTypes.STRING,
      productId: DataTypes.INTEGER,
      transId: DataTypes.STRING,
      seller: DataTypes.STRING,
      reason: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Return.associate = function(models) {
    Return.belongsTo(models.Product, {
      foreignKey: "productId",
      onDelete: "CASCADE"
    });
    // associations can be defined here
  };
  return Return;
};

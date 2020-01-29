"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notify = sequelize.define(
    "Notify",
    {
      userId: DataTypes.STRING,
      productId: DataTypes.INTEGER
    },
    {}
  );
  Notify.associate = function(models) {
    Notify.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Notify.belongsTo(models.Product, {
      foreignKey: "productId",
      onDelete: "CASCADE"
    });
    // associations can be defined here
  };
  return Notify;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      transId: DataTypes.STRING,
      transAmount: DataTypes.STRING,
      receipt: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Payment.associate = function(models) {
    Payment.hasMany(models.Order, {
      foreignKey: "transId",
      sourceKey: "transId"
    });
    // associations can be defined here
  };
  return Payment;
};

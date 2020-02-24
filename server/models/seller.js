"use strict";
module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define(
    "Seller",
    {
      companyName: DataTypes.STRING,
      sellerName: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      contact: DataTypes.STRING
    },
    {}
  );
  Seller.associate = function(models) {
    // associations can be defined here
  };
  return Seller;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const advertisement = sequelize.define(
    "advertisement",
    {
      brand: DataTypes.STRING,
      DOP: DataTypes.DATE,
      amount: DataTypes.FLOAT
    },
    {}
  );
  advertisement.associate = function(models) {
    // associations can be defined here
  };
  return advertisement;
};
